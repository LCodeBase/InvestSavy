/**
 * Sistema de Firewall Avançado
 * Proteção contra ataques de rede, tráfego malicioso e controle de acesso
 */

import { securityLogger, SecurityEventType } from './securityLogger';
import { hash, generateSecureToken } from './encryption';
import { ENV_CONFIG } from '../config/environment';

// Tipos para firewall
interface FirewallRule {
  id: string;
  name: string;
  description: string;
  type: RuleType;
  action: RuleAction;
  priority: number;
  enabled: boolean;
  conditions: RuleCondition[];
  metadata: RuleMetadata;
  statistics: RuleStatistics;
  created: number;
  lastModified: number;
  expiresAt?: number;
}

interface RuleCondition {
  field: ConditionField;
  operator: ConditionOperator;
  value: string | number | string[];
  caseSensitive?: boolean;
  regex?: boolean;
}

interface RuleMetadata {
  tags: string[];
  category: string;
  severity: SecuritySeverity;
  source: string;
  references: string[];
  lastUpdated: number;
  version: string;
}

interface RuleStatistics {
  matchCount: number;
  blockCount: number;
  allowCount: number;
  lastMatch: number;
  avgResponseTime: number;
  falsePositives: number;
}

interface NetworkRequest {
  id: string;
  timestamp: number;
  method: string;
  url: string;
  origin: string;
  userAgent: string;
  ip: string;
  headers: Record<string, string>;
  body?: string;
  size: number;
  duration?: number;
  response?: {
    status: number;
    headers: Record<string, string>;
    size: number;
  };
}

interface ThreatIntelligence {
  id: string;
  type: ThreatType;
  indicator: string;
  severity: SecuritySeverity;
  confidence: number;
  source: string;
  description: string;
  tags: string[];
  firstSeen: number;
  lastSeen: number;
  count: number;
  active: boolean;
  expiresAt?: number;
}

interface GeolocationInfo {
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  organization: string;
  asn: string;
  isProxy: boolean;
  isTor: boolean;
  isVpn: boolean;
  riskScore: number;
}

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (req: NetworkRequest) => string;
  onLimitReached?: (req: NetworkRequest) => void;
}

interface FirewallStatistics {
  totalRequests: number;
  blockedRequests: number;
  allowedRequests: number;
  suspiciousRequests: number;
  maliciousRequests: number;
  ruleMatches: number;
  avgResponseTime: number;
  topBlockedIPs: Array<{ ip: string; count: number }>;
  topBlockedCountries: Array<{ country: string; count: number }>;
  topAttackTypes: Array<{ type: string; count: number }>;
  bandwidthUsage: number;
  activeConnections: number;
  threatLevel: SecuritySeverity;
}

interface AttackPattern {
  id: string;
  name: string;
  description: string;
  type: AttackType;
  patterns: string[];
  severity: SecuritySeverity;
  confidence: number;
  indicators: AttackIndicator[];
  countermeasures: string[];
  lastUpdated: number;
}

interface AttackIndicator {
  type: 'HEADER' | 'URL' | 'BODY' | 'BEHAVIOR' | 'FREQUENCY';
  pattern: string;
  weight: number;
  description: string;
}

interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  rules: string[]; // IDs das regras
  enabled: boolean;
  priority: number;
  schedule?: {
    startTime: string;
    endTime: string;
    days: number[];
    timezone: string;
  };
  conditions: {
    threatLevel?: SecuritySeverity;
    geolocation?: string[];
    timeRange?: { start: string; end: string };
    userAgent?: string[];
  };
  actions: {
    block?: boolean;
    log?: boolean;
    alert?: boolean;
    rateLimit?: RateLimitConfig;
    redirect?: string;
  };
}

type RuleType = 'ALLOW' | 'BLOCK' | 'LOG' | 'RATE_LIMIT' | 'REDIRECT' | 'CHALLENGE';
type RuleAction = 'ALLOW' | 'BLOCK' | 'LOG' | 'RATE_LIMIT' | 'REDIRECT' | 'CAPTCHA' | 'DELAY';
type ConditionField = 'IP' | 'URL' | 'METHOD' | 'HEADER' | 'USER_AGENT' | 'ORIGIN' | 'COUNTRY' | 'ASN' | 'BODY' | 'SIZE';
type ConditionOperator = 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'NOT_CONTAINS' | 'STARTS_WITH' | 'ENDS_WITH' | 'REGEX' | 'IN' | 'NOT_IN' | 'GREATER_THAN' | 'LESS_THAN';
type SecuritySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
type ThreatType = 'MALICIOUS_IP' | 'BOT' | 'SCANNER' | 'BRUTE_FORCE' | 'DDoS' | 'MALWARE' | 'PHISHING' | 'SPAM';
type AttackType = 'SQL_INJECTION' | 'XSS' | 'CSRF' | 'LFI' | 'RFI' | 'COMMAND_INJECTION' | 'XXE' | 'SSRF' | 'DIRECTORY_TRAVERSAL' | 'BRUTE_FORCE' | 'DDoS' | 'BOT_ATTACK';

// Configurações do firewall
const FIREWALL_CONFIG = {
  maxRules: 1000,
  maxRequestsPerSecond: 100,
  maxRequestSize: 10 * 1024 * 1024, // 10MB
  defaultBlockDuration: 24 * 60 * 60 * 1000, // 24 horas
  geoBlockEnabled: true,
  botProtectionEnabled: true,
  ddosProtectionEnabled: true,
  threatIntelligenceEnabled: true,
  logRetentionDays: 30,
  autoUpdateRules: true,
  emergencyMode: false
};

// Listas de países e ASNs bloqueados
const BLOCKED_COUNTRIES = [
  // Países com alto risco de ataques
  'CN', 'RU', 'KP', 'IR'
];

const BLOCKED_ASNS = [
  // ASNs conhecidos por atividades maliciosas
  'AS13335', // Cloudflare (exemplo)
  'AS15169'  // Google (exemplo)
];

// Padrões de ataques conhecidos
const ATTACK_PATTERNS: AttackPattern[] = [
  {
    id: 'sql_injection',
    name: 'SQL Injection',
    description: 'Tentativas de injeção SQL',
    type: 'SQL_INJECTION',
    patterns: [
      "(?i)(union|select|insert|update|delete|drop|create|alter|exec|execute)",
      "(?i)('|(\\x27)|(\\x2D)|(\\x2D)|(\\x23)|(\\x3B)|(\\x0A)|(\\x0D)|(\\x00)|(\\x1A))",
      "(?i)(or|and)\\s+\\d+\\s*=\\s*\\d+",
      "(?i)(or|and)\\s+['\"]\\w+['\"]\\s*=\\s*['\"]\\w+['\"]"  
    ],
    severity: 'HIGH',
    confidence: 0.9,
    indicators: [
      {
        type: 'URL',
        pattern: "(?i)(union|select|insert|update|delete)",
        weight: 0.8,
        description: 'SQL keywords in URL'
      },
      {
        type: 'BODY',
        pattern: "(?i)('|(\\x27))",
        weight: 0.6,
        description: 'SQL injection characters in body'
      }
    ],
    countermeasures: ['BLOCK', 'LOG', 'ALERT'],
    lastUpdated: Date.now()
  },
  {
    id: 'xss_attack',
    name: 'Cross-Site Scripting (XSS)',
    description: 'Tentativas de XSS',
    type: 'XSS',
    patterns: [
      "(?i)<script[^>]*>.*?</script>",
      "(?i)javascript:\\s*[^\\s]",
      "(?i)on(load|error|click|mouseover)\\s*=",
      "(?i)<iframe[^>]*src\\s*=\\s*['\"]?javascript:"
    ],
    severity: 'HIGH',
    confidence: 0.85,
    indicators: [
      {
        type: 'URL',
        pattern: "(?i)<script",
        weight: 0.9,
        description: 'Script tags in URL'
      },
      {
        type: 'HEADER',
        pattern: "(?i)javascript:",
        weight: 0.7,
        description: 'JavaScript protocol in headers'
      }
    ],
    countermeasures: ['BLOCK', 'LOG', 'ALERT'],
    lastUpdated: Date.now()
  },
  {
    id: 'directory_traversal',
    name: 'Directory Traversal',
    description: 'Tentativas de traversal de diretório',
    type: 'DIRECTORY_TRAVERSAL',
    patterns: [
      "(?i)(\\.\\./|\\.\\.\\\\\\\|%2e%2e%2f|%2e%2e%5c)",
      "(?i)(etc/passwd|boot\\.ini|windows/system32)",
      "(?i)\\.\\.[\\/\\\\].*[\\/\\\\]\\.\\.[\\/\\\\]"
    ],
    severity: 'MEDIUM',
    confidence: 0.8,
    indicators: [
      {
        type: 'URL',
        pattern: "(?i)\\.\\./",
        weight: 0.8,
        description: 'Directory traversal patterns'
      }
    ],
    countermeasures: ['BLOCK', 'LOG'],
    lastUpdated: Date.now()
  }
];

// Classe principal do firewall
export class AdvancedFirewall {
  private static instance: AdvancedFirewall;
  private rules: Map<string, FirewallRule> = new Map();
  private policies: Map<string, SecurityPolicy> = new Map();
  private threatIntelligence: Map<string, ThreatIntelligence> = new Map();
  private rateLimiters: Map<string, Map<string, { count: number; resetTime: number }>> = new Map();
  private blockedIPs: Set<string> = new Set();
  private allowedIPs: Set<string> = new Set();
  private requestHistory: NetworkRequest[] = [];
  private statistics: FirewallStatistics;
  private isEnabled = true;
  private emergencyMode = false;
  
  private constructor() {
    this.statistics = this.initializeStatistics();
    this.initializeDefaultRules();
    this.initializeDefaultPolicies();
    this.loadThreatIntelligence();
    this.startCleanupScheduler();
  }
  
  static getInstance(): AdvancedFirewall {
    if (!AdvancedFirewall.instance) {
      AdvancedFirewall.instance = new AdvancedFirewall();
    }
    return AdvancedFirewall.instance;
  }
  
  /**
   * Processa uma requisição através do firewall
   */
  async processRequest(request: NetworkRequest): Promise<{
    allowed: boolean;
    action: RuleAction;
    reason: string;
    ruleId?: string;
    delay?: number;
    redirect?: string;
  }> {
    const startTime = Date.now();
    
    try {
      // Incrementar estatísticas
      this.statistics.totalRequests++;
      
      // Verificar se firewall está habilitado
      if (!this.isEnabled && !this.emergencyMode) {
        this.statistics.allowedRequests++;
        return {
          allowed: true,
          action: 'ALLOW',
          reason: 'Firewall desabilitado'
        };
      }
      
      // Verificar lista de IPs permitidos
      if (this.allowedIPs.has(request.ip)) {
        this.statistics.allowedRequests++;
        return {
          allowed: true,
          action: 'ALLOW',
          reason: 'IP na lista de permitidos'
        };
      }
      
      // Verificar lista de IPs bloqueados
      if (this.blockedIPs.has(request.ip)) {
        this.statistics.blockedRequests++;
        await this.logSecurityEvent('IP_BLOCKED', 'MEDIUM', request);
        return {
          allowed: false,
          action: 'BLOCK',
          reason: 'IP bloqueado'
        };
      }
      
      // Verificar threat intelligence
      const threatCheck = await this.checkThreatIntelligence(request);
      if (!threatCheck.allowed) {
        this.statistics.blockedRequests++;
        this.statistics.maliciousRequests++;
        return threatCheck;
      }
      
      // Verificar padrões de ataques
      const attackCheck = await this.checkAttackPatterns(request);
      if (!attackCheck.allowed) {
        this.statistics.blockedRequests++;
        this.statistics.maliciousRequests++;
        return attackCheck;
      }
      
      // Verificar geolocalização
      const geoCheck = await this.checkGeolocation(request);
      if (!geoCheck.allowed) {
        this.statistics.blockedRequests++;
        return geoCheck;
      }
      
      // Verificar rate limiting
      const rateLimitCheck = await this.checkRateLimit(request);
      if (!rateLimitCheck.allowed) {
        this.statistics.blockedRequests++;
        return rateLimitCheck;
      }
      
      // Verificar regras personalizadas
      const rulesCheck = await this.checkCustomRules(request);
      if (!rulesCheck.allowed) {
        this.statistics.blockedRequests++;
        return rulesCheck;
      }
      
      // Verificar políticas de segurança
      const policyCheck = await this.checkSecurityPolicies(request);
      if (!policyCheck.allowed) {
        this.statistics.blockedRequests++;
        return policyCheck;
      }
      
      // Verificar tamanho da requisição
      if (request.size > FIREWALL_CONFIG.maxRequestSize) {
        this.statistics.blockedRequests++;
        await this.logSecurityEvent('REQUEST_TOO_LARGE', 'MEDIUM', request);
        return {
          allowed: false,
          action: 'BLOCK',
          reason: 'Requisição muito grande'
        };
      }
      
      // Adicionar à história de requisições
      this.addToRequestHistory(request);
      
      // Atualizar estatísticas
      this.statistics.allowedRequests++;
      this.statistics.avgResponseTime = 
        (this.statistics.avgResponseTime + (Date.now() - startTime)) / 2;
      
      return {
        allowed: true,
        action: 'ALLOW',
        reason: 'Requisição aprovada'
      };
      
    } catch (error) {
      await securityLogger.logEvent(
        'FIREWALL_ERROR',
        'HIGH',
        'Erro no processamento do firewall',
        {
          requestId: request.id,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        }
      );
      
      // Em caso de erro, permitir por padrão (fail-open)
      // Em produção, considerar fail-closed para maior segurança
      return {
        allowed: true,
        action: 'ALLOW',
        reason: 'Erro no firewall - permitindo por padrão'
      };
    }
  }
  
  /**
   * Adiciona uma regra personalizada
   */
  async addRule(rule: Omit<FirewallRule, 'id' | 'created' | 'lastModified' | 'statistics'>): Promise<string> {
    const ruleId = await generateSecureToken(16);
    
    const newRule: FirewallRule = {
      ...rule,
      id: ruleId,
      created: Date.now(),
      lastModified: Date.now(),
      statistics: {
        matchCount: 0,
        blockCount: 0,
        allowCount: 0,
        lastMatch: 0,
        avgResponseTime: 0,
        falsePositives: 0
      }
    };
    
    this.rules.set(ruleId, newRule);
    
    await securityLogger.logEvent(
      'FIREWALL_RULE_ADDED',
      'LOW',
      'Nova regra de firewall adicionada',
      { ruleId, ruleName: rule.name, ruleType: rule.type }
    );
    
    return ruleId;
  }
  
  /**
   * Remove uma regra
   */
  async removeRule(ruleId: string): Promise<boolean> {
    const rule = this.rules.get(ruleId);
    
    if (!rule) {
      return false;
    }
    
    this.rules.delete(ruleId);
    
    await securityLogger.logEvent(
      'FIREWALL_RULE_REMOVED',
      'LOW',
      'Regra de firewall removida',
      { ruleId, ruleName: rule.name }
    );
    
    return true;
  }
  
  /**
   * Bloqueia um IP
   */
  async blockIP(ip: string, duration?: number): Promise<void> {
    this.blockedIPs.add(ip);
    
    if (duration) {
      setTimeout(() => {
        this.blockedIPs.delete(ip);
      }, duration);
    }
    
    await securityLogger.logEvent(
      'IP_BLOCKED_MANUALLY',
      'MEDIUM',
      'IP bloqueado manualmente',
      { ip, duration }
    );
  }
  
  /**
   * Desbloqueia um IP
   */
  async unblockIP(ip: string): Promise<void> {
    this.blockedIPs.delete(ip);
    
    await securityLogger.logEvent(
      'IP_UNBLOCKED',
      'LOW',
      'IP desbloqueado',
      { ip }
    );
  }
  
  /**
   * Adiciona IP à lista de permitidos
   */
  async allowIP(ip: string): Promise<void> {
    this.allowedIPs.add(ip);
    
    await securityLogger.logEvent(
      'IP_ALLOWED',
      'LOW',
      'IP adicionado à lista de permitidos',
      { ip }
    );
  }
  
  /**
   * Ativa modo de emergência
   */
  async enableEmergencyMode(): Promise<void> {
    this.emergencyMode = true;
    this.isEnabled = true;
    
    await securityLogger.logEvent(
      'EMERGENCY_MODE_ENABLED',
      'CRITICAL',
      'Modo de emergência ativado',
      { timestamp: Date.now() }
    );
  }
  
  /**
   * Desativa modo de emergência
   */
  async disableEmergencyMode(): Promise<void> {
    this.emergencyMode = false;
    
    await securityLogger.logEvent(
      'EMERGENCY_MODE_DISABLED',
      'MEDIUM',
      'Modo de emergência desativado',
      { timestamp: Date.now() }
    );
  }
  
  /**
   * Obtém estatísticas do firewall
   */
  getStatistics(): FirewallStatistics {
    // Calcular top IPs bloqueados
    const ipCounts: Record<string, number> = {};
    this.requestHistory.forEach(req => {
      if (this.blockedIPs.has(req.ip)) {
        ipCounts[req.ip] = (ipCounts[req.ip] || 0) + 1;
      }
    });
    
    this.statistics.topBlockedIPs = Object.entries(ipCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([ip, count]) => ({ ip, count }));
    
    // Calcular nível de ameaça
    const threatRatio = this.statistics.totalRequests > 0 
      ? this.statistics.maliciousRequests / this.statistics.totalRequests 
      : 0;
    
    if (threatRatio > 0.1) {
      this.statistics.threatLevel = 'CRITICAL';
    } else if (threatRatio > 0.05) {
      this.statistics.threatLevel = 'HIGH';
    } else if (threatRatio > 0.01) {
      this.statistics.threatLevel = 'MEDIUM';
    } else {
      this.statistics.threatLevel = 'LOW';
    }
    
    return { ...this.statistics };
  }
  
  /**
   * Obtém regras ativas
   */
  getActiveRules(): FirewallRule[] {
    return Array.from(this.rules.values())
      .filter(rule => rule.enabled)
      .sort((a, b) => b.priority - a.priority);
  }
  
  /**
   * Obtém políticas ativas
   */
  getActivePolicies(): SecurityPolicy[] {
    return Array.from(this.policies.values())
      .filter(policy => policy.enabled)
      .sort((a, b) => b.priority - a.priority);
  }
  
  // Métodos privados
  private async checkThreatIntelligence(request: NetworkRequest): Promise<{
    allowed: boolean;
    action: RuleAction;
    reason: string;
  }> {
    if (!FIREWALL_CONFIG.threatIntelligenceEnabled) {
      return { allowed: true, action: 'ALLOW', reason: 'Threat intelligence desabilitado' };
    }
    
    const threat = this.threatIntelligence.get(request.ip);
    
    if (threat && threat.active) {
      await this.logSecurityEvent('THREAT_DETECTED', threat.severity, request, {
        threatType: threat.type,
        confidence: threat.confidence,
        source: threat.source
      });
      
      return {
        allowed: false,
        action: 'BLOCK',
        reason: `Threat intelligence: ${threat.description}`
      };
    }
    
    return { allowed: true, action: 'ALLOW', reason: 'Não encontrado em threat intelligence' };
  }
  
  private async checkAttackPatterns(request: NetworkRequest): Promise<{
    allowed: boolean;
    action: RuleAction;
    reason: string;
  }> {
    for (const pattern of ATTACK_PATTERNS) {
      const isMatch = await this.matchAttackPattern(request, pattern);
      
      if (isMatch) {
        await this.logSecurityEvent('ATTACK_PATTERN_DETECTED', pattern.severity, request, {
          attackType: pattern.type,
          patternName: pattern.name,
          confidence: pattern.confidence
        });
        
        return {
          allowed: false,
          action: 'BLOCK',
          reason: `Padrão de ataque detectado: ${pattern.name}`
        };
      }
    }
    
    return { allowed: true, action: 'ALLOW', reason: 'Nenhum padrão de ataque detectado' };
  }
  
  private async matchAttackPattern(request: NetworkRequest, pattern: AttackPattern): Promise<boolean> {
    let score = 0;
    let maxScore = 0;
    
    for (const indicator of pattern.indicators) {
      maxScore += indicator.weight;
      
      let content = '';
      
      switch (indicator.type) {
        case 'URL':
          content = request.url;
          break;
        case 'HEADER':
          content = JSON.stringify(request.headers);
          break;
        case 'BODY':
          content = request.body || '';
          break;
        case 'BEHAVIOR':
          // Implementar análise comportamental
          continue;
        case 'FREQUENCY':
          // Implementar análise de frequência
          continue;
      }
      
      try {
        const regex = new RegExp(indicator.pattern, 'i');
        if (regex.test(content)) {
          score += indicator.weight;
        }
      } catch (error) {
        console.warn('Erro ao processar padrão regex:', indicator.pattern, error);
      }
    }
    
    const confidence = maxScore > 0 ? score / maxScore : 0;
    return confidence >= pattern.confidence;
  }
  
  private async checkGeolocation(request: NetworkRequest): Promise<{
    allowed: boolean;
    action: RuleAction;
    reason: string;
  }> {
    if (!FIREWALL_CONFIG.geoBlockEnabled) {
      return { allowed: true, action: 'ALLOW', reason: 'Geo-blocking desabilitado' };
    }
    
    try {
      const geoInfo = await this.getGeolocationInfo(request.ip);
      
      if (BLOCKED_COUNTRIES.includes(geoInfo.country)) {
        await this.logSecurityEvent('GEO_BLOCKED', 'MEDIUM', request, {
          country: geoInfo.country,
          city: geoInfo.city
        });
        
        return {
          allowed: false,
          action: 'BLOCK',
          reason: `País bloqueado: ${geoInfo.country}`
        };
      }
      
      if (BLOCKED_ASNS.includes(geoInfo.asn)) {
        await this.logSecurityEvent('ASN_BLOCKED', 'MEDIUM', request, {
          asn: geoInfo.asn,
          organization: geoInfo.organization
        });
        
        return {
          allowed: false,
          action: 'BLOCK',
          reason: `ASN bloqueado: ${geoInfo.asn}`
        };
      }
      
      if (geoInfo.riskScore > 80) {
        await this.logSecurityEvent('HIGH_RISK_IP', 'HIGH', request, {
          riskScore: geoInfo.riskScore,
          isProxy: geoInfo.isProxy,
          isTor: geoInfo.isTor,
          isVpn: geoInfo.isVpn
        });
        
        return {
          allowed: false,
          action: 'BLOCK',
          reason: `IP de alto risco: ${geoInfo.riskScore}%`
        };
      }
      
    } catch (error) {
      console.warn('Erro ao verificar geolocalização:', error);
    }
    
    return { allowed: true, action: 'ALLOW', reason: 'Geolocalização aprovada' };
  }
  
  private async checkRateLimit(request: NetworkRequest): Promise<{
    allowed: boolean;
    action: RuleAction;
    reason: string;
    delay?: number;
  }> {
    const key = this.generateRateLimitKey(request);
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minuto
    const maxRequests = FIREWALL_CONFIG.maxRequestsPerSecond * 60;
    
    if (!this.rateLimiters.has('default')) {
      this.rateLimiters.set('default', new Map());
    }
    
    const limiter = this.rateLimiters.get('default')!;
    const entry = limiter.get(key);
    
    if (!entry || now > entry.resetTime) {
      limiter.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      
      return { allowed: true, action: 'ALLOW', reason: 'Rate limit OK' };
    }
    
    entry.count++;
    
    if (entry.count > maxRequests) {
      await this.logSecurityEvent('RATE_LIMIT_EXCEEDED', 'MEDIUM', request, {
        key,
        count: entry.count,
        limit: maxRequests
      });
      
      return {
        allowed: false,
        action: 'RATE_LIMIT',
        reason: 'Rate limit excedido',
        delay: Math.min(entry.count * 1000, 30000) // Máximo 30 segundos
      };
    }
    
    return { allowed: true, action: 'ALLOW', reason: 'Rate limit OK' };
  }
  
  private async checkCustomRules(request: NetworkRequest): Promise<{
    allowed: boolean;
    action: RuleAction;
    reason: string;
    ruleId?: string;
  }> {
    const activeRules = this.getActiveRules();
    
    for (const rule of activeRules) {
      const isMatch = await this.evaluateRule(request, rule);
      
      if (isMatch) {
        // Atualizar estatísticas da regra
        rule.statistics.matchCount++;
        rule.statistics.lastMatch = Date.now();
        
        if (rule.action === 'BLOCK') {
          rule.statistics.blockCount++;
        } else if (rule.action === 'ALLOW') {
          rule.statistics.allowCount++;
        }
        
        await this.logSecurityEvent('FIREWALL_RULE_MATCHED', rule.metadata.severity, request, {
          ruleId: rule.id,
          ruleName: rule.name,
          action: rule.action
        });
        
        if (rule.action === 'BLOCK') {
          return {
            allowed: false,
            action: rule.action,
            reason: `Regra bloqueou: ${rule.name}`,
            ruleId: rule.id
          };
        } else if (rule.action === 'ALLOW') {
          return {
            allowed: true,
            action: rule.action,
            reason: `Regra permitiu: ${rule.name}`,
            ruleId: rule.id
          };
        }
      }
    }
    
    return { allowed: true, action: 'ALLOW', reason: 'Nenhuma regra aplicada' };
  }
  
  private async checkSecurityPolicies(request: NetworkRequest): Promise<{
    allowed: boolean;
    action: RuleAction;
    reason: string;
  }> {
    const activePolicies = this.getActivePolicies();
    
    for (const policy of activePolicies) {
      const isApplicable = await this.evaluatePolicy(request, policy);
      
      if (isApplicable) {
        if (policy.actions.block) {
          await this.logSecurityEvent('SECURITY_POLICY_BLOCKED', 'MEDIUM', request, {
            policyId: policy.id,
            policyName: policy.name
          });
          
          return {
            allowed: false,
            action: 'BLOCK',
            reason: `Política de segurança: ${policy.name}`
          };
        }
        
        if (policy.actions.rateLimit) {
          // Aplicar rate limit específico da política
          const rateLimitResult = await this.applyPolicyRateLimit(request, policy.actions.rateLimit);
          if (!rateLimitResult.allowed) {
            return rateLimitResult;
          }
        }
      }
    }
    
    return { allowed: true, action: 'ALLOW', reason: 'Políticas de segurança aprovadas' };
  }
  
  private async evaluateRule(request: NetworkRequest, rule: FirewallRule): Promise<boolean> {
    for (const condition of rule.conditions) {
      const isMatch = await this.evaluateCondition(request, condition);
      if (!isMatch) {
        return false; // Todas as condições devem ser verdadeiras
      }
    }
    
    return true;
  }
  
  private async evaluateCondition(request: NetworkRequest, condition: RuleCondition): Promise<boolean> {
    let fieldValue: string | number = '';
    
    switch (condition.field) {
      case 'IP':
        fieldValue = request.ip;
        break;
      case 'URL':
        fieldValue = request.url;
        break;
      case 'METHOD':
        fieldValue = request.method;
        break;
      case 'USER_AGENT':
        fieldValue = request.userAgent;
        break;
      case 'ORIGIN':
        fieldValue = request.origin;
        break;
      case 'SIZE':
        fieldValue = request.size;
        break;
      case 'HEADER':
        fieldValue = JSON.stringify(request.headers);
        break;
      case 'BODY':
        fieldValue = request.body || '';
        break;
      default:
        return false;
    }
    
    return this.compareValues(fieldValue, condition.operator, condition.value, condition);
  }
  
  private compareValues(
    fieldValue: string | number,
    operator: ConditionOperator,
    conditionValue: string | number | string[],
    condition: RuleCondition
  ): boolean {
    const fieldStr = String(fieldValue);
    const conditionStr = String(conditionValue);
    
    const compareStr = condition.caseSensitive ? fieldStr : fieldStr.toLowerCase();
    const targetStr = condition.caseSensitive ? conditionStr : conditionStr.toLowerCase();
    
    switch (operator) {
      case 'EQUALS':
        return compareStr === targetStr;
        
      case 'NOT_EQUALS':
        return compareStr !== targetStr;
        
      case 'CONTAINS':
        return compareStr.includes(targetStr);
        
      case 'NOT_CONTAINS':
        return !compareStr.includes(targetStr);
        
      case 'STARTS_WITH':
        return compareStr.startsWith(targetStr);
        
      case 'ENDS_WITH':
        return compareStr.endsWith(targetStr);
        
      case 'REGEX':
        try {
          const regex = new RegExp(targetStr, condition.caseSensitive ? '' : 'i');
          return regex.test(compareStr);
        } catch {
          return false;
        }
        
      case 'IN':
        if (Array.isArray(conditionValue)) {
          return conditionValue.some(val => 
            condition.caseSensitive ? 
              String(val) === fieldStr : 
              String(val).toLowerCase() === compareStr
          );
        }
        return false;
        
      case 'NOT_IN':
        if (Array.isArray(conditionValue)) {
          return !conditionValue.some(val => 
            condition.caseSensitive ? 
              String(val) === fieldStr : 
              String(val).toLowerCase() === compareStr
          );
        }
        return true;
        
      case 'GREATER_THAN':
        return Number(fieldValue) > Number(conditionValue);
        
      case 'LESS_THAN':
        return Number(fieldValue) < Number(conditionValue);
        
      default:
        return false;
    }
  }
  
  private async evaluatePolicy(request: NetworkRequest, policy: SecurityPolicy): Promise<boolean> {
    // Verificar condições da política
    if (policy.conditions.geolocation) {
      try {
        const geoInfo = await this.getGeolocationInfo(request.ip);
        if (!policy.conditions.geolocation.includes(geoInfo.country)) {
          return false;
        }
      } catch {
        return false;
      }
    }
    
    if (policy.conditions.userAgent) {
      const userAgentMatch = policy.conditions.userAgent.some(ua => 
        request.userAgent.toLowerCase().includes(ua.toLowerCase())
      );
      if (!userAgentMatch) {
        return false;
      }
    }
    
    // Verificar horário se especificado
    if (policy.schedule) {
      const now = new Date();
      const currentDay = now.getDay();
      const currentTime = now.getHours() * 100 + now.getMinutes();
      
      if (!policy.schedule.days.includes(currentDay)) {
        return false;
      }
      
      const startTime = parseInt(policy.schedule.startTime.replace(':', ''));
      const endTime = parseInt(policy.schedule.endTime.replace(':', ''));
      
      if (currentTime < startTime || currentTime > endTime) {
        return false;
      }
    }
    
    return true;
  }
  
  private async applyPolicyRateLimit(
    request: NetworkRequest,
    rateLimitConfig: RateLimitConfig
  ): Promise<{
    allowed: boolean;
    action: RuleAction;
    reason: string;
  }> {
    const key = rateLimitConfig.keyGenerator ? 
      rateLimitConfig.keyGenerator(request) : 
      this.generateRateLimitKey(request);
    
    const now = Date.now();
    
    if (!this.rateLimiters.has('policy')) {
      this.rateLimiters.set('policy', new Map());
    }
    
    const limiter = this.rateLimiters.get('policy')!;
    const entry = limiter.get(key);
    
    if (!entry || now > entry.resetTime) {
      limiter.set(key, {
        count: 1,
        resetTime: now + rateLimitConfig.windowMs
      });
      
      return { allowed: true, action: 'ALLOW', reason: 'Policy rate limit OK' };
    }
    
    entry.count++;
    
    if (entry.count > rateLimitConfig.maxRequests) {
      if (rateLimitConfig.onLimitReached) {
        rateLimitConfig.onLimitReached(request);
      }
      
      return {
        allowed: false,
        action: 'RATE_LIMIT',
        reason: 'Policy rate limit excedido'
      };
    }
    
    return { allowed: true, action: 'ALLOW', reason: 'Policy rate limit OK' };
  }
  
  private generateRateLimitKey(request: NetworkRequest): string {
    return `${request.ip}:${request.method}:${new URL(request.url).pathname}`;
  }
  
  private async getGeolocationInfo(ip: string): Promise<GeolocationInfo> {
    // Implementação simplificada - em produção usar serviço real
    return {
      country: 'BR',
      region: 'SP',
      city: 'São Paulo',
      latitude: -23.5505,
      longitude: -46.6333,
      timezone: 'America/Sao_Paulo',
      isp: 'Example ISP',
      organization: 'Example Org',
      asn: 'AS12345',
      isProxy: false,
      isTor: false,
      isVpn: false,
      riskScore: Math.random() * 100
    };
  }
  
  private addToRequestHistory(request: NetworkRequest): void {
    this.requestHistory.push(request);
    
    // Manter apenas os últimos 1000 requests
    if (this.requestHistory.length > 1000) {
      this.requestHistory = this.requestHistory.slice(-1000);
    }
  }
  
  private async logSecurityEvent(
    eventType: string,
    severity: SecuritySeverity,
    request: NetworkRequest,
    additionalData?: Record<string, any>
  ): Promise<void> {
    await securityLogger.logEvent(
      eventType as SecurityEventType,
      severity,
      `Firewall: ${eventType}`,
      {
        requestId: request.id,
        ip: request.ip,
        url: request.url,
        method: request.method,
        userAgent: request.userAgent,
        ...additionalData
      }
    );
  }
  
  private initializeStatistics(): FirewallStatistics {
    return {
      totalRequests: 0,
      blockedRequests: 0,
      allowedRequests: 0,
      suspiciousRequests: 0,
      maliciousRequests: 0,
      ruleMatches: 0,
      avgResponseTime: 0,
      topBlockedIPs: [],
      topBlockedCountries: [],
      topAttackTypes: [],
      bandwidthUsage: 0,
      activeConnections: 0,
      threatLevel: 'LOW'
    };
  }
  
  private initializeDefaultRules(): void {
    // Regra para bloquear IPs suspeitos
    const suspiciousIPRule: Omit<FirewallRule, 'id' | 'created' | 'lastModified' | 'statistics'> = {
      name: 'Bloquear IPs Suspeitos',
      description: 'Bloqueia IPs com atividade suspeita',
      type: 'BLOCK',
      action: 'BLOCK',
      priority: 100,
      enabled: true,
      conditions: [
        {
          field: 'IP',
          operator: 'IN',
          value: ['127.0.0.1'] // Lista será atualizada dinamicamente
        }
      ],
      metadata: {
        tags: ['security', 'ip-blocking'],
        category: 'Security',
        severity: 'HIGH',
        source: 'system',
        references: [],
        lastUpdated: Date.now(),
        version: '1.0.0'
      }
    };
    
    // Regra para rate limiting agressivo
    const rateLimitRule: Omit<FirewallRule, 'id' | 'created' | 'lastModified' | 'statistics'> = {
      name: 'Rate Limiting Agressivo',
      description: 'Rate limiting para endpoints sensíveis',
      type: 'RATE_LIMIT',
      action: 'RATE_LIMIT',
      priority: 90,
      enabled: true,
      conditions: [
        {
          field: 'URL',
          operator: 'CONTAINS',
          value: '/api/auth/'
        }
      ],
      metadata: {
        tags: ['rate-limiting', 'auth'],
        category: 'Performance',
        severity: 'MEDIUM',
        source: 'system',
        references: [],
        lastUpdated: Date.now(),
        version: '1.0.0'
      }
    };
    
    this.addRule(suspiciousIPRule);
    this.addRule(rateLimitRule);
  }
  
  private initializeDefaultPolicies(): void {
    const emergencyPolicy: SecurityPolicy = {
      id: 'emergency_lockdown',
      name: 'Bloqueio de Emergência',
      description: 'Política de bloqueio em situações de emergência',
      rules: [],
      enabled: false,
      priority: 1000,
      conditions: {
        threatLevel: 'CRITICAL'
      },
      actions: {
        block: true,
        log: true,
        alert: true
      }
    };
    
    this.policies.set(emergencyPolicy.id, emergencyPolicy);
  }
  
  private loadThreatIntelligence(): void {
    // Carregar threat intelligence de fontes externas
    // Em produção, integrar com feeds de threat intelligence
    
    const maliciousIPs = [
      '192.168.1.100',
      '10.0.0.50'
    ];
    
    maliciousIPs.forEach(ip => {
      const threat: ThreatIntelligence = {
        id: `threat_${ip}`,
        type: 'MALICIOUS_IP',
        indicator: ip,
        severity: 'HIGH',
        confidence: 0.9,
        source: 'internal',
        description: 'IP identificado como malicioso',
        tags: ['malicious', 'blocked'],
        firstSeen: Date.now(),
        lastSeen: Date.now(),
        count: 1,
        active: true
      };
      
      this.threatIntelligence.set(ip, threat);
    });
  }
  
  private startCleanupScheduler(): void {
    // Limpeza a cada hora
    setInterval(() => {
      this.cleanupExpiredData();
    }, 60 * 60 * 1000);
  }
  
  private cleanupExpiredData(): void {
    const now = Date.now();
    
    // Limpar rate limiters expirados
    this.rateLimiters.forEach(limiter => {
      limiter.forEach((entry, key) => {
        if (now > entry.resetTime) {
          limiter.delete(key);
        }
      });
    });
    
    // Limpar threat intelligence expirado
    this.threatIntelligence.forEach((threat, key) => {
      if (threat.expiresAt && now > threat.expiresAt) {
        this.threatIntelligence.delete(key);
      }
    });
    
    // Limpar histórico antigo
    const cutoff = now - (FIREWALL_CONFIG.logRetentionDays * 24 * 60 * 60 * 1000);
    this.requestHistory = this.requestHistory.filter(req => req.timestamp > cutoff);
  }
}

// Instância singleton
export const firewall = AdvancedFirewall.getInstance();

// Hook para React
export const useFirewall = () => {
  const processRequest = async (request: Partial<NetworkRequest>) => {
    const fullRequest: NetworkRequest = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      method: request.method || 'GET',
      url: request.url || window.location.href,
      origin: request.origin || window.location.origin,
      userAgent: request.userAgent || navigator.userAgent,
      ip: request.ip || 'unknown',
      headers: request.headers || {},
      size: request.size || 0
    };
    
    return await firewall.processRequest(fullRequest);
  };
  
  const addRule = async (rule: Omit<FirewallRule, 'id' | 'created' | 'lastModified' | 'statistics'>) => {
    return await firewall.addRule(rule);
  };
  
  const blockIP = async (ip: string, duration?: number) => {
    return await firewall.blockIP(ip, duration);
  };
  
  const unblockIP = async (ip: string) => {
    return await firewall.unblockIP(ip);
  };
  
  const getStatistics = () => {
    return firewall.getStatistics();
  };
  
  const enableEmergencyMode = async () => {
    return await firewall.enableEmergencyMode();
  };
  
  const disableEmergencyMode = async () => {
    return await firewall.disableEmergencyMode();
  };
  
  return {
    processRequest,
    addRule,
    blockIP,
    unblockIP,
    getStatistics,
    enableEmergencyMode,
    disableEmergencyMode
  };
};

console.log('🔥 Sistema de firewall avançado inicializado');

// Exportar para uso global
(window as any).__firewall = firewall;

// Exportar tipos
export type {
  FirewallRule,
  NetworkRequest,
  ThreatIntelligence,
  SecurityPolicy,
  FirewallStatistics,
  AttackPattern
};