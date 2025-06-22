/**
 * Sistema de Proteção Contra Ataques de Força Bruta
 * Detecta e previne tentativas de força bruta em login, registro e outras operações sensíveis
 */

import { securityLogger } from './securityLogger';
import { hash } from './encryption';
import { generateSecureToken } from './encryption';
// Removed unused import ENV_CONFIG

// Tipos para proteção contra força bruta
interface BruteForceAttempt {
  id: string;
  ip: string;
  username?: string;
  email?: string;
  endpoint: string;
  timestamp: number;
  success: boolean;
  userAgent: string;
  fingerprint?: string;
  sessionId?: string;
  country?: string;
  isp?: string;
  riskScore: number;
}

interface BruteForceRule {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  maxAttempts: number;
  timeWindow: number; // em milissegundos
  blockDuration: number; // em milissegundos
  escalationFactor: number;
  enabled: boolean;
  severity: BruteForceSeverity;
  actions: BruteForceAction[];
  whitelist: string[];
  blacklist: string[];
}

interface BruteForceBlock {
  id: string;
  ip: string;
  username?: string;
  email?: string;
  reason: string;
  startTime: number;
  endTime: number;
  attempts: number;
  ruleId: string;
  escalationLevel: number;
  permanent: boolean;
  bypassToken?: string;
}

interface BruteForcePattern {
  id: string;
  name: string;
  description: string;
  indicators: PatternIndicator[];
  threshold: number;
  timeWindow: number;
  severity: BruteForceSeverity;
  autoBlock: boolean;
}

interface PatternIndicator {
  type: IndicatorType;
  value: string;
  weight: number;
  description: string;
}

interface BruteForceStatistics {
  totalAttempts: number;
  blockedAttempts: number;
  successfulAttempts: number;
  uniqueIPs: number;
  uniqueUsernames: number;
  activeBlocks: number;
  permanentBlocks: number;
  topAttackedEndpoints: Array<{ endpoint: string; attempts: number }>;
  topAttackerIPs: Array<{ ip: string; attempts: number; blocked: boolean }>;
  topTargetedUsers: Array<{ username: string; attempts: number }>;
  attacksByCountry: Array<{ country: string; attempts: number }>;
  attacksByHour: Array<{ hour: number; attempts: number }>;
  preventionRate: number;
  avgAttemptsPerIP: number;
  avgBlockDuration: number;
}

interface BruteForceAlert {
  id: string;
  type: AlertType;
  severity: BruteForceSeverity;
  title: string;
  message: string;
  timestamp: number;
  ip: string;
  username?: string;
  endpoint: string;
  attempts: number;
  riskScore: number;
  acknowledged: boolean;
  actions: string[];
}

interface ProtectionConfig {
  enabled: boolean;
  strictMode: boolean;
  adaptiveLimits: boolean;
  geoBlocking: boolean;
  honeypotEnabled: boolean;
  captchaEnabled: boolean;
  emailNotifications: boolean;
  realTimeBlocking: boolean;
  intelligentThrottling: boolean;
  behaviorAnalysis: boolean;
  ipReputationCheck: boolean;
  deviceFingerprinting: boolean;
}

type BruteForceSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
type BruteForceAction = 'LOG' | 'BLOCK_IP' | 'BLOCK_USER' | 'CAPTCHA' | 'DELAY' | 'ALERT' | 'EMAIL' | 'HONEYPOT';
type IndicatorType = 'IP_PATTERN' | 'USER_AGENT' | 'TIMING' | 'FREQUENCY' | 'GEOGRAPHIC' | 'BEHAVIORAL';
type AlertType = 'ATTACK_DETECTED' | 'THRESHOLD_EXCEEDED' | 'PATTERN_MATCHED' | 'BLOCK_APPLIED' | 'ESCALATION';

// Configurações de proteção
const BRUTE_FORCE_CONFIG: ProtectionConfig = {
  enabled: true,
  strictMode: false,
  adaptiveLimits: true,
  geoBlocking: false,
  honeypotEnabled: true,
  captchaEnabled: true,
  emailNotifications: true,
  realTimeBlocking: true,
  intelligentThrottling: true,
  behaviorAnalysis: true,
  ipReputationCheck: true,
  deviceFingerprinting: true
};

// Regras padrão de proteção
const DEFAULT_RULES: BruteForceRule[] = [
  {
    id: 'login_protection',
    name: 'Proteção de Login',
    description: 'Protege contra ataques de força bruta no login',
    endpoint: '/api/auth/login',
    maxAttempts: 5,
    timeWindow: 15 * 60 * 1000, // 15 minutos
    blockDuration: 30 * 60 * 1000, // 30 minutos
    escalationFactor: 2,
    enabled: true,
    severity: 'HIGH',
    actions: ['LOG', 'BLOCK_IP', 'CAPTCHA', 'ALERT'],
    whitelist: [],
    blacklist: []
  },
  {
    id: 'register_protection',
    name: 'Proteção de Registro',
    description: 'Protege contra spam de registros',
    endpoint: '/api/auth/register',
    maxAttempts: 3,
    timeWindow: 60 * 60 * 1000, // 1 hora
    blockDuration: 2 * 60 * 60 * 1000, // 2 horas
    escalationFactor: 1.5,
    enabled: true,
    severity: 'MEDIUM',
    actions: ['LOG', 'BLOCK_IP', 'CAPTCHA'],
    whitelist: [],
    blacklist: []
  },
  {
    id: 'password_reset_protection',
    name: 'Proteção de Reset de Senha',
    description: 'Protege contra abuso de reset de senha',
    endpoint: '/api/auth/reset-password',
    maxAttempts: 3,
    timeWindow: 60 * 60 * 1000, // 1 hora
    blockDuration: 60 * 60 * 1000, // 1 hora
    escalationFactor: 1,
    enabled: true,
    severity: 'MEDIUM',
    actions: ['LOG', 'DELAY', 'CAPTCHA'],
    whitelist: [],
    blacklist: []
  },
  {
    id: 'api_protection',
    name: 'Proteção de API',
    description: 'Protege endpoints de API contra abuso',
    endpoint: '/api/',
    maxAttempts: 100,
    timeWindow: 60 * 60 * 1000, // 1 hora
    blockDuration: 15 * 60 * 1000, // 15 minutos
    escalationFactor: 1.2,
    enabled: true,
    severity: 'LOW',
    actions: ['LOG', 'DELAY'],
    whitelist: [],
    blacklist: []
  },
  {
    id: 'admin_protection',
    name: 'Proteção de Admin',
    description: 'Proteção máxima para área administrativa',
    endpoint: '/admin/',
    maxAttempts: 2,
    timeWindow: 5 * 60 * 1000, // 5 minutos
    blockDuration: 24 * 60 * 60 * 1000, // 24 horas
    escalationFactor: 3,
    enabled: true,
    severity: 'CRITICAL',
    actions: ['LOG', 'BLOCK_IP', 'BLOCK_USER', 'ALERT', 'EMAIL'],
    whitelist: [],
    blacklist: []
  }
];

// Padrões de ataque conhecidos
const ATTACK_PATTERNS: BruteForcePattern[] = [
  {
    id: 'rapid_fire_attack',
    name: 'Ataque Rápido',
    description: 'Múltiplas tentativas em sequência rápida',
    indicators: [
      {
        type: 'TIMING',
        value: 'rapid_sequence',
        weight: 0.8,
        description: 'Tentativas com intervalo menor que 1 segundo'
      },
      {
        type: 'FREQUENCY',
        value: 'high_frequency',
        weight: 0.7,
        description: 'Mais de 10 tentativas por minuto'
      }
    ],
    threshold: 0.7,
    timeWindow: 5 * 60 * 1000, // 5 minutos
    severity: 'HIGH',
    autoBlock: true
  },
  {
    id: 'distributed_attack',
    name: 'Ataque Distribuído',
    description: 'Ataque coordenado de múltiplos IPs',
    indicators: [
      {
        type: 'IP_PATTERN',
        value: 'multiple_ips',
        weight: 0.6,
        description: 'Múltiplos IPs atacando o mesmo usuário'
      },
      {
        type: 'TIMING',
        value: 'coordinated',
        weight: 0.7,
        description: 'Tentativas coordenadas no tempo'
      }
    ],
    threshold: 0.6,
    timeWindow: 30 * 60 * 1000, // 30 minutos
    severity: 'CRITICAL',
    autoBlock: true
  },
  {
    id: 'credential_stuffing',
    name: 'Credential Stuffing',
    description: 'Uso de credenciais vazadas',
    indicators: [
      {
        type: 'BEHAVIORAL',
        value: 'known_credentials',
        weight: 0.9,
        description: 'Uso de credenciais conhecidas de vazamentos'
      },
      {
        type: 'USER_AGENT',
        value: 'automated_tool',
        weight: 0.8,
        description: 'User agent de ferramenta automatizada'
      }
    ],
    threshold: 0.8,
    timeWindow: 60 * 60 * 1000, // 1 hora
    severity: 'CRITICAL',
    autoBlock: true
  },
  {
    id: 'slow_attack',
    name: 'Ataque Lento',
    description: 'Tentativas espaçadas para evitar detecção',
    indicators: [
      {
        type: 'TIMING',
        value: 'slow_pattern',
        weight: 0.5,
        description: 'Tentativas com intervalos regulares longos'
      },
      {
        type: 'BEHAVIORAL',
        value: 'persistent',
        weight: 0.6,
        description: 'Persistência ao longo de muito tempo'
      }
    ],
    threshold: 0.5,
    timeWindow: 24 * 60 * 60 * 1000, // 24 horas
    severity: 'MEDIUM',
    autoBlock: false
  }
];

// Lista de IPs conhecidos maliciosos
const KNOWN_MALICIOUS_IPS = new Set([
  // Adicionar IPs conhecidos maliciosos aqui
]);

// Lista de User Agents suspeitos
const SUSPICIOUS_USER_AGENTS = [
  'curl',
  'wget',
  'python-requests',
  'python-urllib',
  'java/',
  'go-http-client',
  'okhttp',
  'apache-httpclient',
  'libwww-perl',
  'lwp-trivial'
];

// Classe principal de proteção contra força bruta
export class BruteForceProtection {
  private static instance: BruteForceProtection;
  private attempts: Map<string, BruteForceAttempt[]> = new Map();
  private blocks: Map<string, BruteForceBlock> = new Map();
  private rules: Map<string, BruteForceRule> = new Map();
  private patterns: Map<string, BruteForcePattern> = new Map();
  private statistics: BruteForceStatistics;
  private alerts: BruteForceAlert[] = [];
  private honeypots: Set<string> = new Set();
  private isEnabled = true;
  
  private constructor() {
    this.initializeRules();
    this.initializePatterns();
    this.statistics = this.initializeStatistics();
    this.setupHoneypots();
    this.startCleanupScheduler();
  }
  
  static getInstance(): BruteForceProtection {
    if (!BruteForceProtection.instance) {
      BruteForceProtection.instance = new BruteForceProtection();
    }
    return BruteForceProtection.instance;
  }
  
  /**
   * Verifica se uma tentativa deve ser bloqueada
   */
  async checkAttempt(request: {
    ip: string;
    username?: string;
    email?: string;
    endpoint: string;
    userAgent: string;
    success: boolean;
    fingerprint?: string;
    sessionId?: string;
    timestamp?: number;
  }): Promise<{
    allowed: boolean;
    reason: string;
    blockDuration?: number;
    captchaRequired?: boolean;
    delayRequired?: number;
    riskScore: number;
    alertGenerated?: boolean;
  }> {
    if (!this.isEnabled) {
      return {
        allowed: true,
        reason: 'Proteção contra força bruta desabilitada',
        riskScore: 0
      };
    }
    
    const timestamp = request.timestamp || Date.now();
    
    // Verificar se IP está bloqueado
    const blockCheck = this.checkExistingBlock(request.ip, request.username, request.email);
    if (blockCheck.blocked) {
      this.statistics.blockedAttempts++;
      return {
        allowed: false,
        reason: blockCheck.reason,
        blockDuration: blockCheck.remainingTime,
        riskScore: 100
      };
    }
    
    // Verificar honeypots
    if (this.honeypots.has(request.endpoint)) {
      await this.handleHoneypotAccess(request);
      return {
        allowed: false,
        reason: 'Acesso a honeypot detectado',
        riskScore: 100
      };
    }
    
    // Criar tentativa
    const attempt: BruteForceAttempt = {
      id: await generateSecureToken(16),
      ip: request.ip,
      username: request.username,
      email: request.email,
      endpoint: request.endpoint,
      timestamp,
      success: request.success,
      userAgent: request.userAgent,
      fingerprint: request.fingerprint,
      sessionId: request.sessionId,
      riskScore: 0
    };
    
    // Calcular score de risco
    attempt.riskScore = await this.calculateRiskScore(attempt);
    
    // Registrar tentativa
    this.recordAttempt(attempt);
    
    // Verificar regras aplicáveis
    const applicableRules = this.getApplicableRules(request.endpoint);
    
    for (const rule of applicableRules) {
      const ruleCheck = await this.checkRule(rule, request, attempt);
      
      if (!ruleCheck.allowed) {
        // Aplicar bloqueio se necessário
        if (ruleCheck.shouldBlock) {
          await this.applyBlock(rule, request, ruleCheck.attempts);
        }
        
        // Gerar alerta se necessário
        if (ruleCheck.shouldAlert) {
          await this.generateAlert(rule, request, ruleCheck.attempts, attempt.riskScore);
        }
        
        return {
          allowed: false,
          reason: ruleCheck.reason,
          blockDuration: ruleCheck.blockDuration,
          captchaRequired: ruleCheck.captchaRequired,
          delayRequired: ruleCheck.delayRequired,
          riskScore: attempt.riskScore,
          alertGenerated: ruleCheck.shouldAlert
        };
      }
    }
    
    // Verificar padrões de ataque
    const patternCheck = await this.checkAttackPatterns(request, attempt);
    if (patternCheck.detected) {
      return {
        allowed: false,
        reason: patternCheck.reason,
        riskScore: attempt.riskScore,
        alertGenerated: true
      };
    }
    
    // Atualizar estatísticas
    if (request.success) {
      this.statistics.successfulAttempts++;
    }
    
    return {
      allowed: true,
      reason: 'Tentativa permitida',
      riskScore: attempt.riskScore
    };
  }
  
  /**
   * Adiciona uma nova regra de proteção
   */
  addRule(rule: BruteForceRule): void {
    this.rules.set(rule.id, rule);
    
    securityLogger.logEvent(
      'BRUTE_FORCE_RULE_ADDED',
      'LOW',
      'Nova regra de proteção contra força bruta adicionada',
      { ruleId: rule.id, ruleName: rule.name, endpoint: rule.endpoint }
    );
  }
  
  /**
   * Remove uma regra de proteção
   */
  removeRule(ruleId: string): void {
    this.rules.delete(ruleId);
    
    securityLogger.logEvent(
      'BRUTE_FORCE_RULE_REMOVED',
      'LOW',
      'Regra de proteção contra força bruta removida',
      { ruleId }
    );
  }
  
  /**
   * Bloqueia um IP manualmente
   */
  async blockIP(ip: string, reason: string, duration?: number): Promise<void> {
    const blockId = await generateSecureToken(16);
    const now = Date.now();
    const blockDuration = duration || 24 * 60 * 60 * 1000; // 24 horas padrão
    
    const block: BruteForceBlock = {
      id: blockId,
      ip,
      reason,
      startTime: now,
      endTime: now + blockDuration,
      attempts: 0,
      ruleId: 'manual_block',
      escalationLevel: 0,
      permanent: duration === -1
    };
    
    this.blocks.set(ip, block);
    this.statistics.activeBlocks++;
    
    if (block.permanent) {
      this.statistics.permanentBlocks++;
    }
    
    await securityLogger.logEvent(
      'BRUTE_FORCE_IP_BLOCKED',
      'HIGH',
      'IP bloqueado manualmente',
      { ip, reason, duration: blockDuration, permanent: block.permanent }
    );
  }
  
  /**
   * Desbloqueia um IP
   */
  async unblockIP(ip: string): Promise<void> {
    const block = this.blocks.get(ip);
    
    if (block) {
      this.blocks.delete(ip);
      this.statistics.activeBlocks--;
      
      if (block.permanent) {
        this.statistics.permanentBlocks--;
      }
      
      await securityLogger.logEvent(
        'BRUTE_FORCE_IP_UNBLOCKED',
        'MEDIUM',
        'IP desbloqueado',
        { ip, blockId: block.id, reason: block.reason }
      );
    }
  }
  
  /**
   * Obtém estatísticas da proteção
   */
  getStatistics(): BruteForceStatistics {
    this.updateStatistics();
    return { ...this.statistics };
  }
  
  /**
   * Obtém alertas ativos
   */
  getAlerts(acknowledged = false): BruteForceAlert[] {
    return this.alerts.filter(alert => alert.acknowledged === acknowledged);
  }
  
  /**
   * Marca um alerta como reconhecido
   */
  acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
    }
  }
  
  /**
   * Obtém bloqueios ativos
   */
  getActiveBlocks(): BruteForceBlock[] {
    const now = Date.now();
    return Array.from(this.blocks.values())
      .filter(block => block.permanent || block.endTime > now);
  }
  
  /**
   * Gera token de bypass para emergências
   */
  async generateBypassToken(ip: string, reason: string): Promise<string> {
    const token = await generateSecureToken(32);
    const block = this.blocks.get(ip);
    
    if (block) {
      block.bypassToken = token;
      
      await securityLogger.logEvent(
        'BRUTE_FORCE_BYPASS_TOKEN',
        'HIGH',
        'Token de bypass gerado',
        { ip, reason, token: token.substring(0, 8) + '...' }
      );
    }
    
    return token;
  }
  
  /**
   * Verifica token de bypass
   */
  verifyBypassToken(ip: string, token: string): boolean {
    const block = this.blocks.get(ip);
    return block?.bypassToken === token;
  }
  
  // Métodos privados
  private initializeRules(): void {
    DEFAULT_RULES.forEach(rule => {
      this.rules.set(rule.id, rule);
    });
  }
  
  private initializePatterns(): void {
    ATTACK_PATTERNS.forEach(pattern => {
      this.patterns.set(pattern.id, pattern);
    });
  }
  
  private initializeStatistics(): BruteForceStatistics {
    return {
      totalAttempts: 0,
      blockedAttempts: 0,
      successfulAttempts: 0,
      uniqueIPs: 0,
      uniqueUsernames: 0,
      activeBlocks: 0,
      permanentBlocks: 0,
      topAttackedEndpoints: [],
      topAttackerIPs: [],
      topTargetedUsers: [],
      attacksByCountry: [],
      attacksByHour: [],
      preventionRate: 0,
      avgAttemptsPerIP: 0,
      avgBlockDuration: 0
    };
  }
  
  private setupHoneypots(): void {
    if (!BRUTE_FORCE_CONFIG.honeypotEnabled) {
      return;
    }
    
    const honeypotEndpoints = [
      '/admin/login',
      '/wp-admin/admin-ajax.php',
      '/administrator/index.php',
      '/phpmyadmin/index.php',
      '/cpanel/login',
      '/webmail/login',
      '/ftp/login',
      '/ssh/login',
      '/api/admin/login',
      '/backdoor'
    ];
    
    honeypotEndpoints.forEach(endpoint => {
      this.honeypots.add(endpoint);
    });
  }
  
  private checkExistingBlock(ip: string, username?: string, email?: string): {
    blocked: boolean;
    reason: string;
    remainingTime?: number;
  } {
    const now = Date.now();
    
    // Verificar bloqueio por IP
    const ipBlock = this.blocks.get(ip);
    if (ipBlock && (ipBlock.permanent || ipBlock.endTime > now)) {
      return {
        blocked: true,
        reason: `IP bloqueado: ${ipBlock.reason}`,
        remainingTime: ipBlock.permanent ? -1 : ipBlock.endTime - now
      };
    }
    
    // Verificar bloqueio por usuário
    if (username) {
      const userBlock = Array.from(this.blocks.values())
        .find(block => block.username === username && 
               (block.permanent || block.endTime > now));
      
      if (userBlock) {
        return {
          blocked: true,
          reason: `Usuário bloqueado: ${userBlock.reason}`,
          remainingTime: userBlock.permanent ? -1 : userBlock.endTime - now
        };
      }
    }
    
    // Verificar bloqueio por email
    if (email) {
      const emailBlock = Array.from(this.blocks.values())
        .find(block => block.email === email && 
               (block.permanent || block.endTime > now));
      
      if (emailBlock) {
        return {
          blocked: true,
          reason: `Email bloqueado: ${emailBlock.reason}`,
          remainingTime: emailBlock.permanent ? -1 : emailBlock.endTime - now
        };
      }
    }
    
    return { blocked: false, reason: 'Não bloqueado' };
  }
  
  private async calculateRiskScore(attempt: BruteForceAttempt): Promise<number> {
    let score = 0;
    
    // Score baseado no IP
    if (KNOWN_MALICIOUS_IPS.has(attempt.ip)) {
      score += 50;
    }
    
    // Score baseado no User Agent
    const isSuspiciousUA = SUSPICIOUS_USER_AGENTS.some(ua => 
      attempt.userAgent.toLowerCase().includes(ua.toLowerCase())
    );
    if (isSuspiciousUA) {
      score += 30;
    }
    
    // Score baseado na frequência
    const recentAttempts = this.getRecentAttempts(attempt.ip, 5 * 60 * 1000); // 5 minutos
    if (recentAttempts.length > 10) {
      score += 40;
    } else if (recentAttempts.length > 5) {
      score += 20;
    }
    
    // Score baseado no endpoint
    if (attempt.endpoint.includes('/admin')) {
      score += 20;
    }
    
    // Score baseado no horário (ataques fora do horário comercial)
    const hour = new Date(attempt.timestamp).getHours();
    if (hour < 6 || hour > 22) {
      score += 10;
    }
    
    return Math.min(score, 100);
  }
  
  private recordAttempt(attempt: BruteForceAttempt): void {
    const key = attempt.ip;
    
    if (!this.attempts.has(key)) {
      this.attempts.set(key, []);
    }
    
    this.attempts.get(key)!.push(attempt);
    this.statistics.totalAttempts++;
    
    // Limitar histórico por IP
    const attempts = this.attempts.get(key)!;
    if (attempts.length > 1000) {
      attempts.splice(0, attempts.length - 1000);
    }
  }
  
  private getApplicableRules(endpoint: string): BruteForceRule[] {
    return Array.from(this.rules.values())
      .filter(rule => rule.enabled && endpoint.startsWith(rule.endpoint))
      .sort((a, b) => b.endpoint.length - a.endpoint.length); // Mais específicas primeiro
  }
  
  private async checkRule(rule: BruteForceRule, request: any, attempt: BruteForceAttempt): Promise<{
    allowed: boolean;
    reason: string;
    shouldBlock: boolean;
    shouldAlert: boolean;
    attempts: number;
    blockDuration?: number;
    captchaRequired?: boolean;
    delayRequired?: number;
  }> {
    // Verificar whitelist
    if (rule.whitelist.includes(request.ip)) {
      return {
        allowed: true,
        reason: 'IP na whitelist',
        shouldBlock: false,
        shouldAlert: false,
        attempts: 0
      };
    }
    
    // Verificar blacklist
    if (rule.blacklist.includes(request.ip)) {
      return {
        allowed: false,
        reason: 'IP na blacklist',
        shouldBlock: true,
        shouldAlert: true,
        attempts: 0,
        blockDuration: rule.blockDuration
      };
    }
    
    // Contar tentativas recentes
    const recentAttempts = this.getRecentAttempts(request.ip, rule.timeWindow, rule.endpoint);
    const failedAttempts = recentAttempts.filter(a => !a.success);
    
    // Verificar se excedeu o limite
    if (failedAttempts.length >= rule.maxAttempts) {
      const shouldBlock = rule.actions.includes('BLOCK_IP');
      const shouldAlert = rule.actions.includes('ALERT');
      const captchaRequired = rule.actions.includes('CAPTCHA');
      const delayRequired = rule.actions.includes('DELAY');
      
      return {
        allowed: false,
        reason: `Limite de tentativas excedido: ${failedAttempts.length}/${rule.maxAttempts}`,
        shouldBlock,
        shouldAlert,
        attempts: failedAttempts.length,
        blockDuration: rule.blockDuration,
        captchaRequired,
        delayRequired: delayRequired ? this.calculateDelay(failedAttempts.length) : undefined
      };
    }
    
    return {
      allowed: true,
      reason: 'Dentro do limite',
      shouldBlock: false,
      shouldAlert: false,
      attempts: failedAttempts.length
    };
  }
  
  private getRecentAttempts(ip: string, timeWindow: number, endpoint?: string): BruteForceAttempt[] {
    const attempts = this.attempts.get(ip) || [];
    const cutoff = Date.now() - timeWindow;
    
    return attempts.filter(attempt => {
      const isRecent = attempt.timestamp > cutoff;
      const matchesEndpoint = !endpoint || attempt.endpoint.startsWith(endpoint);
      return isRecent && matchesEndpoint;
    });
  }
  
  private async applyBlock(rule: BruteForceRule, request: any, attemptCount: number): Promise<void> {
    const blockId = await generateSecureToken(16);
    const now = Date.now();
    
    // Calcular duração do bloqueio com escalação
    const escalationLevel = Math.floor(attemptCount / rule.maxAttempts);
    const blockDuration = rule.blockDuration * Math.pow(rule.escalationFactor, escalationLevel);
    
    const block: BruteForceBlock = {
      id: blockId,
      ip: request.ip,
      username: request.username,
      email: request.email,
      reason: `Violação da regra: ${rule.name}`,
      startTime: now,
      endTime: now + blockDuration,
      attempts: attemptCount,
      ruleId: rule.id,
      escalationLevel,
      permanent: false
    };
    
    this.blocks.set(request.ip, block);
    this.statistics.activeBlocks++;
    
    await securityLogger.logEvent(
      'BRUTE_FORCE_BLOCK_APPLIED',
      rule.severity,
      'Bloqueio aplicado por violação de regra',
      {
        blockId,
        ip: request.ip,
        username: request.username,
        ruleId: rule.id,
        ruleName: rule.name,
        attempts: attemptCount,
        duration: blockDuration,
        escalationLevel
      }
    );
  }
  
  private async generateAlert(rule: BruteForceRule, request: any, attempts: number, riskScore: number): Promise<void> {
    const alertId = await generateSecureToken(16);
    
    const alert: BruteForceAlert = {
      id: alertId,
      type: 'THRESHOLD_EXCEEDED',
      severity: rule.severity,
      title: `Limite de tentativas excedido: ${rule.name}`,
      message: `IP ${request.ip} excedeu o limite de ${rule.maxAttempts} tentativas em ${rule.endpoint}`,
      timestamp: Date.now(),
      ip: request.ip,
      username: request.username,
      endpoint: request.endpoint,
      attempts,
      riskScore,
      acknowledged: false,
      actions: rule.actions
    };
    
    this.alerts.push(alert);
    
    // Limitar número de alertas
    if (this.alerts.length > 1000) {
      this.alerts.splice(0, this.alerts.length - 1000);
    }
    
    await securityLogger.logEvent(
      'BRUTE_FORCE_ALERT_GENERATED',
      rule.severity,
      'Alerta de força bruta gerado',
      {
        alertId,
        ip: request.ip,
        username: request.username,
        endpoint: request.endpoint,
        attempts,
        riskScore,
        ruleName: rule.name
      }
    );
  }
  
  private async checkAttackPatterns(request: any, attempt: BruteForceAttempt): Promise<{
    detected: boolean;
    reason: string;
    pattern?: BruteForcePattern;
  }> {
    for (const pattern of this.patterns.values()) {
      const score = await this.calculatePatternScore(pattern, request, attempt);
      
      if (score >= pattern.threshold) {
        if (pattern.autoBlock) {
          await this.applyPatternBlock(pattern, request);
        }
        
        await this.generatePatternAlert(pattern, request, score);
        
        return {
          detected: true,
          reason: `Padrão de ataque detectado: ${pattern.name}`,
          pattern
        };
      }
    }
    
    return { detected: false, reason: 'Nenhum padrão detectado' };
  }
  
  private async calculatePatternScore(pattern: BruteForcePattern, request: any, attempt: BruteForceAttempt): Promise<number> {
    let score = 0;
    let maxScore = 0;
    
    for (const indicator of pattern.indicators) {
      maxScore += indicator.weight;
      
      let matches = false;
      
      switch (indicator.type) {
        case 'TIMING':
          matches = await this.checkTimingIndicator(indicator, request, attempt);
          break;
        case 'FREQUENCY':
          matches = await this.checkFrequencyIndicator(indicator, request, attempt);
          break;
        case 'IP_PATTERN':
          matches = await this.checkIPPatternIndicator(indicator, request, attempt);
          break;
        case 'USER_AGENT':
          matches = await this.checkUserAgentIndicator(indicator, request, attempt);
          break;
        case 'GEOGRAPHIC':
          matches = await this.checkGeographicIndicator(indicator, request, attempt);
          break;
        case 'BEHAVIORAL':
          matches = await this.checkBehavioralIndicator(indicator, request, attempt);
          break;
      }
      
      if (matches) {
        score += indicator.weight;
      }
    }
    
    return maxScore > 0 ? score / maxScore : 0;
  }
  
  private async checkTimingIndicator(indicator: PatternIndicator, request: any, attempt: BruteForceAttempt): Promise<boolean> {
    const recentAttempts = this.getRecentAttempts(request.ip, 60 * 1000); // 1 minuto
    
    switch (indicator.value) {
      case 'rapid_sequence':
        if (recentAttempts.length >= 2) {
          const intervals = [];
          for (let i = 1; i < recentAttempts.length; i++) {
            intervals.push(recentAttempts[i].timestamp - recentAttempts[i-1].timestamp);
          }
          return intervals.some(interval => interval < 1000); // Menos de 1 segundo
        }
        return false;
        
      case 'coordinated':
        // Verificar se múltiplos IPs estão atacando ao mesmo tempo
        const allRecentAttempts = Array.from(this.attempts.values())
          .flat()
          .filter(a => a.timestamp > Date.now() - 5 * 60 * 1000); // 5 minutos
        
        const timeGroups = new Map<number, string[]>();
        allRecentAttempts.forEach(a => {
          const timeSlot = Math.floor(a.timestamp / 10000) * 10000; // Grupos de 10 segundos
          if (!timeGroups.has(timeSlot)) {
            timeGroups.set(timeSlot, []);
          }
          if (!timeGroups.get(timeSlot)!.includes(a.ip)) {
            timeGroups.get(timeSlot)!.push(a.ip);
          }
        });
        
        return Array.from(timeGroups.values()).some(ips => ips.length >= 3);
        
      case 'slow_pattern':
        if (recentAttempts.length >= 3) {
          const intervals = [];
          for (let i = 1; i < recentAttempts.length; i++) {
            intervals.push(recentAttempts[i].timestamp - recentAttempts[i-1].timestamp);
          }
          const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
          const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length;
          return variance < avgInterval * 0.1; // Baixa variância indica padrão regular
        }
        return false;
        
      default:
        return false;
    }
  }
  
  private async checkFrequencyIndicator(indicator: PatternIndicator, request: any, attempt: BruteForceAttempt): Promise<boolean> {
    const recentAttempts = this.getRecentAttempts(request.ip, 60 * 1000); // 1 minuto
    
    switch (indicator.value) {
      case 'high_frequency':
        return recentAttempts.length > 10;
      default:
        return false;
    }
  }
  
  private async checkIPPatternIndicator(indicator: PatternIndicator, request: any, attempt: BruteForceAttempt): Promise<boolean> {
    switch (indicator.value) {
      case 'multiple_ips':
        if (request.username) {
          const userAttempts = Array.from(this.attempts.values())
            .flat()
            .filter(a => a.username === request.username && a.timestamp > Date.now() - 30 * 60 * 1000);
          
          const uniqueIPs = new Set(userAttempts.map(a => a.ip));
          return uniqueIPs.size >= 3;
        }
        return false;
      default:
        return false;
    }
  }
  
  private async checkUserAgentIndicator(indicator: PatternIndicator, request: any, attempt: BruteForceAttempt): Promise<boolean> {
    switch (indicator.value) {
      case 'automated_tool':
        return SUSPICIOUS_USER_AGENTS.some(ua => 
          attempt.userAgent.toLowerCase().includes(ua.toLowerCase())
        );
      default:
        return false;
    }
  }
  
  private async checkGeographicIndicator(indicator: PatternIndicator, request: any, attempt: BruteForceAttempt): Promise<boolean> {
    // Implementar verificação geográfica se necessário
    return false;
  }
  
  private async checkBehavioralIndicator(indicator: PatternIndicator, request: any, attempt: BruteForceAttempt): Promise<boolean> {
    switch (indicator.value) {
      case 'known_credentials':
        // Verificar contra base de credenciais vazadas conhecidas
        // Implementar se necessário
        return false;
        
      case 'persistent':
        const longTermAttempts = this.getRecentAttempts(request.ip, 24 * 60 * 60 * 1000); // 24 horas
        return longTermAttempts.length > 50;
        
      default:
        return false;
    }
  }
  
  private async applyPatternBlock(pattern: BruteForcePattern, request: any): Promise<void> {
    const blockId = await generateSecureToken(16);
    const now = Date.now();
    
    const block: BruteForceBlock = {
      id: blockId,
      ip: request.ip,
      username: request.username,
      email: request.email,
      reason: `Padrão de ataque detectado: ${pattern.name}`,
      startTime: now,
      endTime: now + (pattern.severity === 'CRITICAL' ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000),
      attempts: 0,
      ruleId: pattern.id,
      escalationLevel: 0,
      permanent: false
    };
    
    this.blocks.set(request.ip, block);
    this.statistics.activeBlocks++;
    
    await securityLogger.logEvent(
      'BRUTE_FORCE_PATTERN_BLOCK',
      pattern.severity,
      'Bloqueio aplicado por detecção de padrão',
      {
        blockId,
        ip: request.ip,
        patternId: pattern.id,
        patternName: pattern.name,
        severity: pattern.severity
      }
    );
  }
  
  private async generatePatternAlert(pattern: BruteForcePattern, request: any, score: number): Promise<void> {
    const alertId = await generateSecureToken(16);
    
    const alert: BruteForceAlert = {
      id: alertId,
      type: 'PATTERN_MATCHED',
      severity: pattern.severity,
      title: `Padrão de ataque detectado: ${pattern.name}`,
      message: `Padrão "${pattern.name}" detectado para IP ${request.ip} com score ${(score * 100).toFixed(1)}%`,
      timestamp: Date.now(),
      ip: request.ip,
      username: request.username,
      endpoint: request.endpoint,
      attempts: 0,
      riskScore: score * 100,
      acknowledged: false,
      actions: pattern.autoBlock ? ['BLOCK_IP', 'ALERT'] : ['ALERT']
    };
    
    this.alerts.push(alert);
    
    await securityLogger.logEvent(
      'BRUTE_FORCE_PATTERN_ALERT',
      pattern.severity,
      'Alerta de padrão de ataque gerado',
      {
        alertId,
        ip: request.ip,
        patternId: pattern.id,
        patternName: pattern.name,
        score: score * 100
      }
    );
  }
  
  private calculateDelay(attempts: number): number {
    // Delay exponencial: 2^attempts segundos, máximo 60 segundos
    return Math.min(Math.pow(2, attempts) * 1000, 60000);
  }
  
  private async handleHoneypotAccess(request: any): Promise<void> {
    await this.blockIP(request.ip, 'Acesso a honeypot', 24 * 60 * 60 * 1000); // 24 horas
    
    await securityLogger.logEvent(
      'BRUTE_FORCE_HONEYPOT_ACCESS',
      'CRITICAL',
      'Acesso a honeypot detectado',
      {
        ip: request.ip,
        endpoint: request.endpoint,
        userAgent: request.userAgent
      }
    );
  }
  
  private updateStatistics(): void {
    // Atualizar estatísticas calculadas
    const allAttempts = Array.from(this.attempts.values()).flat();
    
    this.statistics.uniqueIPs = this.attempts.size;
    this.statistics.uniqueUsernames = new Set(
      allAttempts.filter(a => a.username).map(a => a.username)
    ).size;
    
    this.statistics.avgAttemptsPerIP = this.attempts.size > 0 ? 
      allAttempts.length / this.attempts.size : 0;
    
    this.statistics.preventionRate = this.statistics.totalAttempts > 0 ? 
      (this.statistics.blockedAttempts / this.statistics.totalAttempts) * 100 : 0;
    
    // Calcular top endpoints atacados
    const endpointCounts = new Map<string, number>();
    allAttempts.forEach(attempt => {
      const count = endpointCounts.get(attempt.endpoint) || 0;
      endpointCounts.set(attempt.endpoint, count + 1);
    });
    
    this.statistics.topAttackedEndpoints = Array.from(endpointCounts.entries())
      .map(([endpoint, attempts]) => ({ endpoint, attempts }))
      .sort((a, b) => b.attempts - a.attempts)
      .slice(0, 10);
    
    // Calcular top IPs atacantes
    const ipCounts = new Map<string, number>();
    allAttempts.forEach(attempt => {
      const count = ipCounts.get(attempt.ip) || 0;
      ipCounts.set(attempt.ip, count + 1);
    });
    
    this.statistics.topAttackerIPs = Array.from(ipCounts.entries())
      .map(([ip, attempts]) => ({ 
        ip, 
        attempts, 
        blocked: this.blocks.has(ip) 
      }))
      .sort((a, b) => b.attempts - a.attempts)
      .slice(0, 10);
  }
  
  private startCleanupScheduler(): void {
    // Limpeza a cada hora
    setInterval(() => {
      this.cleanupExpiredData();
    }, 60 * 60 * 1000);
  }
  
  private cleanupExpiredData(): void {
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 dias
    
    // Limpar tentativas antigas
    this.attempts.forEach((attempts, ip) => {
      const filteredAttempts = attempts.filter(attempt => 
        now - attempt.timestamp < maxAge
      );
      
      if (filteredAttempts.length === 0) {
        this.attempts.delete(ip);
      } else {
        this.attempts.set(ip, filteredAttempts);
      }
    });
    
    // Limpar bloqueios expirados
    this.blocks.forEach((block, key) => {
      if (!block.permanent && block.endTime < now) {
        this.blocks.delete(key);
        this.statistics.activeBlocks--;
      }
    });
    
    // Limpar alertas antigos
    const maxAlerts = 1000;
    if (this.alerts.length > maxAlerts) {
      this.alerts.splice(0, this.alerts.length - maxAlerts);
    }
  }
}

// Instância singleton
export const bruteForceProtection = BruteForceProtection.getInstance();

// Middleware para Express/Fastify
export const bruteForceMiddleware = async (req: any, res: any, next: any) => {
  try {
    const result = await bruteForceProtection.checkAttempt({
      ip: req.ip || req.connection.remoteAddress,
      username: req.body?.username || req.body?.email,
      email: req.body?.email,
      endpoint: req.path || req.url,
      userAgent: req.headers['user-agent'] || '',
      success: false, // Será atualizado após a tentativa
      fingerprint: req.headers['x-fingerprint'],
      sessionId: req.sessionID
    });
    
    if (!result.allowed) {
      if (result.delayRequired) {
        await new Promise(resolve => setTimeout(resolve, result.delayRequired));
      }
      
      return res.status(429).json({
        error: 'Too Many Requests',
        message: result.reason,
        blockDuration: result.blockDuration,
        captchaRequired: result.captchaRequired
      });
    }
    
    // Adicionar informações ao request para uso posterior
    req.bruteForceInfo = result;
    
    next();
  } catch (error) {
    console.error('Erro no middleware de proteção contra força bruta:', error);
    next(); // Continuar em caso de erro
  }
};

// Hook para React
export const useBruteForceProtection = () => {
  const checkAttempt = async (request: {
    username?: string;
    email?: string;
    endpoint?: string;
    success?: boolean;
  }) => {
    const fullRequest = {
      ip: 'client', // No frontend, usar identificador genérico
      username: request.username,
      email: request.email,
      endpoint: request.endpoint || window.location.pathname,
      userAgent: navigator.userAgent,
      success: request.success || false,
      timestamp: Date.now()
    };
    
    return await bruteForceProtection.checkAttempt(fullRequest);
  };
  
  const getStatistics = () => {
    return bruteForceProtection.getStatistics();
  };
  
  const getAlerts = (acknowledged = false) => {
    return bruteForceProtection.getAlerts(acknowledged);
  };
  
  const acknowledgeAlert = (alertId: string) => {
    bruteForceProtection.acknowledgeAlert(alertId);
  };
  
  const blockIP = async (ip: string, reason: string, duration?: number) => {
    return await bruteForceProtection.blockIP(ip, reason, duration);
  };
  
  const unblockIP = async (ip: string) => {
    return await bruteForceProtection.unblockIP(ip);
  };
  
  return {
    checkAttempt,
    getStatistics,
    getAlerts,
    acknowledgeAlert,
    blockIP,
    unblockIP
  };
};

console.log('🛡️ Sistema de proteção contra força bruta inicializado');

// Exportar para uso global
(window as any).__bruteForceProtection = bruteForceProtection;

// Exportar tipos
export type {
  BruteForceAttempt,
  BruteForceRule,
  BruteForceBlock,
  BruteForcePattern,
  BruteForceStatistics,
  BruteForceAlert,
  ProtectionConfig
};