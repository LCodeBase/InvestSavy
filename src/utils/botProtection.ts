/**
 * Sistema de Proteção Contra Bots e Crawlers Maliciosos
 * Detecta e bloqueia bots maliciosos, scrapers e atividades automatizadas suspeitas
 */

import { securityLogger } from './securityLogger';
import { hash } from './encryption';
import { ENV_CONFIG } from '../config/environment';

// Tipos para proteção contra bots
interface BotDetectionResult {
  isBot: boolean;
  confidence: number;
  botType: BotType;
  reason: string;
  riskScore: number;
  action: BotAction;
  evidence: BotEvidence[];
}

interface BotEvidence {
  type: EvidenceType;
  value: string;
  weight: number;
  description: string;
}

interface BotSignature {
  id: string;
  name: string;
  description: string;
  type: BotType;
  patterns: BotPattern[];
  severity: BotSeverity;
  confidence: number;
  lastUpdated: number;
  active: boolean;
}

interface BotPattern {
  field: PatternField;
  pattern: string;
  weight: number;
  regex: boolean;
  caseSensitive: boolean;
  description: string;
}

interface BehaviorAnalysis {
  requestFrequency: number;
  sessionDuration: number;
  pageViews: number;
  uniquePages: number;
  mouseMovements: number;
  keyboardEvents: number;
  scrollEvents: number;
  clickEvents: number;
  formInteractions: number;
  javascriptEnabled: boolean;
  cookiesEnabled: boolean;
  screenResolution: string;
  timezone: string;
  language: string;
  plugins: string[];
  touchSupport: boolean;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  connectionType?: string;
  suspiciousPatterns: string[];
}

interface ChallengeResponse {
  id: string;
  type: ChallengeType;
  challenge: string;
  expectedResponse: string;
  timestamp: number;
  attempts: number;
  solved: boolean;
  timeToSolve?: number;
}

interface BotStatistics {
  totalRequests: number;
  botRequests: number;
  humanRequests: number;
  blockedBots: number;
  challengesSent: number;
  challengesSolved: number;
  falsePositives: number;
  falseNegatives: number;
  topBotTypes: Array<{ type: BotType; count: number }>;
  topUserAgents: Array<{ userAgent: string; count: number; isBot: boolean }>;
  detectionAccuracy: number;
  avgConfidence: number;
}

interface UserSession {
  id: string;
  ip: string;
  userAgent: string;
  fingerprint: string;
  startTime: number;
  lastActivity: number;
  requestCount: number;
  pageViews: string[];
  behaviorScore: number;
  isBot: boolean;
  botConfidence: number;
  challenges: ChallengeResponse[];
  verified: boolean;
}

type BotType = 'SCRAPER' | 'CRAWLER' | 'SPAM_BOT' | 'ATTACK_BOT' | 'SEO_BOT' | 'SOCIAL_BOT' | 'MONITORING_BOT' | 'LEGITIMATE_BOT' | 'UNKNOWN';
type BotAction = 'ALLOW' | 'BLOCK' | 'CHALLENGE' | 'RATE_LIMIT' | 'MONITOR' | 'CAPTCHA';
type BotSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
type EvidenceType = 'USER_AGENT' | 'BEHAVIOR' | 'FREQUENCY' | 'FINGERPRINT' | 'HEADERS' | 'JAVASCRIPT' | 'CHALLENGE';
type PatternField = 'USER_AGENT' | 'HEADERS' | 'BEHAVIOR' | 'TIMING' | 'FINGERPRINT';
type ChallengeType = 'JAVASCRIPT' | 'CAPTCHA' | 'MATH' | 'INTERACTION' | 'TIMING' | 'PROOF_OF_WORK';

// Configurações de proteção contra bots
const BOT_PROTECTION_CONFIG = {
  enabled: true,
  strictMode: false,
  challengeEnabled: true,
  behaviorAnalysisEnabled: true,
  fingerprintingEnabled: true,
  maxRequestsPerMinute: 60,
  maxRequestsPerHour: 1000,
  sessionTimeout: 30 * 60 * 1000, // 30 minutos
  challengeTimeout: 5 * 60 * 1000, // 5 minutos
  minConfidenceThreshold: 0.7,
  allowLegitimateBotsEnabled: true,
  honeypotEnabled: true,
  jsRequiredPages: ['/admin', '/api/sensitive'],
  protectedEndpoints: ['/api/', '/admin/', '/login', '/register']
};

// User Agents conhecidos de bots legítimos
const LEGITIMATE_BOTS = [
  'Googlebot',
  'Bingbot',
  'Slurp', // Yahoo
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'Applebot',
  'SemrushBot',
  'AhrefsBot',
  'MJ12bot'
];

// User Agents conhecidos de bots maliciosos
const MALICIOUS_BOTS = [
  'sqlmap',
  'nikto',
  'nmap',
  'masscan',
  'zmap',
  'w3af',
  'burp',
  'acunetix',
  'netsparker',
  'webscarab',
  'havij',
  'pangolin',
  'sqlninja',
  'bbqsql'
];

// Padrões suspeitos de comportamento
const SUSPICIOUS_PATTERNS = [
  {
    name: 'Requisições muito rápidas',
    pattern: 'frequency_high',
    threshold: 10, // requisições por segundo
    weight: 0.8
  },
  {
    name: 'Sem JavaScript',
    pattern: 'no_javascript',
    threshold: 1,
    weight: 0.6
  },
  {
    name: 'Sem cookies',
    pattern: 'no_cookies',
    threshold: 1,
    weight: 0.5
  },
  {
    name: 'User Agent suspeito',
    pattern: 'suspicious_ua',
    threshold: 1,
    weight: 0.9
  },
  {
    name: 'Sem interação humana',
    pattern: 'no_interaction',
    threshold: 1,
    weight: 0.7
  },
  {
    name: 'Padrão de acesso linear',
    pattern: 'linear_access',
    threshold: 1,
    weight: 0.6
  }
];

// Assinaturas de bots conhecidos
const BOT_SIGNATURES: BotSignature[] = [
  {
    id: 'scraper_bot',
    name: 'Scraper Bot',
    description: 'Bot de raspagem de dados',
    type: 'SCRAPER',
    patterns: [
      {
        field: 'USER_AGENT',
        pattern: '(scraper|crawler|spider|bot|harvest)',
        weight: 0.8,
        regex: true,
        caseSensitive: false,
        description: 'User agent contém termos de scraping'
      },
      {
        field: 'BEHAVIOR',
        pattern: 'rapid_requests',
        weight: 0.7,
        regex: false,
        caseSensitive: false,
        description: 'Requisições muito rápidas'
      }
    ],
    severity: 'HIGH',
    confidence: 0.85,
    lastUpdated: Date.now(),
    active: true
  },
  {
    id: 'attack_bot',
    name: 'Attack Bot',
    description: 'Bot de ataque automatizado',
    type: 'ATTACK_BOT',
    patterns: [
      {
        field: 'USER_AGENT',
        pattern: '(sqlmap|nikto|nmap|burp|acunetix)',
        weight: 0.95,
        regex: true,
        caseSensitive: false,
        description: 'User agent de ferramenta de ataque'
      },
      {
        field: 'HEADERS',
        pattern: 'X-Forwarded-For.*proxy',
        weight: 0.6,
        regex: true,
        caseSensitive: false,
        description: 'Headers indicando uso de proxy'
      }
    ],
    severity: 'CRITICAL',
    confidence: 0.95,
    lastUpdated: Date.now(),
    active: true
  },
  {
    id: 'seo_bot',
    name: 'SEO Bot',
    description: 'Bot de análise SEO',
    type: 'SEO_BOT',
    patterns: [
      {
        field: 'USER_AGENT',
        pattern: '(semrush|ahrefs|moz|screaming)',
        weight: 0.9,
        regex: true,
        caseSensitive: false,
        description: 'User agent de ferramenta SEO'
      }
    ],
    severity: 'LOW',
    confidence: 0.9,
    lastUpdated: Date.now(),
    active: true
  }
];

// Classe principal de proteção contra bots
export class BotProtection {
  private static instance: BotProtection;
  private sessions: Map<string, UserSession> = new Map();
  private challenges: Map<string, ChallengeResponse> = new Map();
  private statistics: BotStatistics;
  private honeypots: Set<string> = new Set();
  private isEnabled = true;
  
  private constructor() {
    this.statistics = this.initializeStatistics();
    this.setupHoneypots();
    this.startCleanupScheduler();
  }
  
  static getInstance(): BotProtection {
    if (!BotProtection.instance) {
      BotProtection.instance = new BotProtection();
    }
    return BotProtection.instance;
  }
  
  /**
   * Analisa uma requisição para detectar bots
   */
  async analyzeRequest(request: {
    ip: string;
    userAgent: string;
    headers: Record<string, string>;
    url: string;
    method: string;
    timestamp: number;
    fingerprint?: string;
    behavior?: Partial<BehaviorAnalysis>;
  }): Promise<BotDetectionResult> {
    if (!this.isEnabled) {
      return {
        isBot: false,
        confidence: 0,
        botType: 'UNKNOWN',
        reason: 'Proteção contra bots desabilitada',
        riskScore: 0,
        action: 'ALLOW',
        evidence: []
      };
    }
    
    this.statistics.totalRequests++;
    
    const sessionId = await this.generateSessionId(request.ip, request.userAgent);
    let session = this.sessions.get(sessionId);
    
    if (!session) {
      session = this.createSession(sessionId, request);
      this.sessions.set(sessionId, session);
    } else {
      this.updateSession(session, request);
    }
    
    const evidence: BotEvidence[] = [];
    let totalScore = 0;
    let maxScore = 0;
    
    // Verificar se é bot legítimo
    const legitimateCheck = this.checkLegitimateBot(request.userAgent);
    if (legitimateCheck.isLegitimate) {
      this.statistics.humanRequests++; // Considerar como humano para estatísticas
      return {
        isBot: true,
        confidence: 0.95,
        botType: 'LEGITIMATE_BOT',
        reason: legitimateCheck.reason,
        riskScore: 0,
        action: 'ALLOW',
        evidence: [{
          type: 'USER_AGENT',
          value: request.userAgent,
          weight: 0.95,
          description: 'Bot legítimo identificado'
        }]
      };
    }
    
    // Verificar assinaturas de bots conhecidos
    const signatureCheck = await this.checkBotSignatures(request, session);
    evidence.push(...signatureCheck.evidence);
    totalScore += signatureCheck.score;
    maxScore += signatureCheck.maxScore;
    
    // Análise de comportamento
    if (BOT_PROTECTION_CONFIG.behaviorAnalysisEnabled && request.behavior) {
      const behaviorCheck = await this.analyzeBehavior(request.behavior, session);
      evidence.push(...behaviorCheck.evidence);
      totalScore += behaviorCheck.score;
      maxScore += behaviorCheck.maxScore;
    }
    
    // Análise de frequência
    const frequencyCheck = this.analyzeFrequency(session);
    evidence.push(...frequencyCheck.evidence);
    totalScore += frequencyCheck.score;
    maxScore += frequencyCheck.maxScore;
    
    // Análise de headers
    const headerCheck = this.analyzeHeaders(request.headers);
    evidence.push(...headerCheck.evidence);
    totalScore += headerCheck.score;
    maxScore += headerCheck.maxScore;
    
    // Verificar honeypots
    const honeypotCheck = this.checkHoneypot(request.url);
    if (honeypotCheck.triggered) {
      evidence.push(honeypotCheck.evidence);
      totalScore += honeypotCheck.score;
      maxScore += honeypotCheck.maxScore;
    }
    
    // Calcular confiança e risco
    const confidence = maxScore > 0 ? totalScore / maxScore : 0;
    const riskScore = Math.min(confidence * 100, 100);
    
    // Determinar se é bot
    const isBot = confidence >= BOT_PROTECTION_CONFIG.minConfidenceThreshold;
    
    // Determinar tipo de bot
    const botType = this.determineBotType(evidence, request.userAgent);
    
    // Determinar ação
    const action = this.determineAction(isBot, botType, riskScore, session);
    
    // Atualizar sessão
    session.isBot = isBot;
    session.botConfidence = confidence;
    session.behaviorScore = riskScore;
    
    // Atualizar estatísticas
    if (isBot) {
      this.statistics.botRequests++;
      if (action === 'BLOCK') {
        this.statistics.blockedBots++;
      }
    } else {
      this.statistics.humanRequests++;
    }
    
    // Log do evento
    await this.logBotDetection(request, session, {
      isBot,
      confidence,
      botType,
      reason: this.generateReason(evidence, isBot),
      riskScore,
      action,
      evidence
    });
    
    return {
      isBot,
      confidence,
      botType,
      reason: this.generateReason(evidence, isBot),
      riskScore,
      action,
      evidence
    };
  }
  
  /**
   * Cria um desafio para verificar se é humano
   */
  async createChallenge(sessionId: string, type: ChallengeType = 'JAVASCRIPT'): Promise<ChallengeResponse> {
    // Generate a random challenge ID using crypto API
    const challengeId = Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    let challenge: ChallengeResponse;
    
    switch (type) {
      case 'JAVASCRIPT':
        challenge = await this.createJavaScriptChallenge(challengeId);
        break;
      case 'MATH':
        challenge = await this.createMathChallenge(challengeId);
        break;
      case 'INTERACTION':
        challenge = await this.createInteractionChallenge(challengeId);
        break;
      case 'TIMING':
        challenge = await this.createTimingChallenge(challengeId);
        break;
      case 'PROOF_OF_WORK':
        challenge = await this.createProofOfWorkChallenge(challengeId);
        break;
      default:
        challenge = await this.createJavaScriptChallenge(challengeId);
    }
    
    this.challenges.set(challengeId, challenge);
    this.statistics.challengesSent++;
    
    // Adicionar desafio à sessão
    const session = this.sessions.get(sessionId);
    if (session) {
      session.challenges.push(challenge);
    }
    
    await securityLogger.logEvent(
      'BOT_CHALLENGE_CREATED',
      'MEDIUM',
      'Desafio criado para verificação humana',
      {
        sessionId,
        challengeId,
        type,
        timestamp: challenge.timestamp
      }
    );
    
    return challenge;
  }
  
  /**
   * Verifica a resposta de um desafio
   */
  async verifyChallenge(challengeId: string, response: string): Promise<{
    valid: boolean;
    timeToSolve: number;
    attempts: number;
  }> {
    const challenge = this.challenges.get(challengeId);
    
    if (!challenge) {
      return { valid: false, timeToSolve: 0, attempts: 0 };
    }
    
    challenge.attempts++;
    const timeToSolve = Date.now() - challenge.timestamp;
    
    // Verificar se expirou
    if (timeToSolve > BOT_PROTECTION_CONFIG.challengeTimeout) {
      this.challenges.delete(challengeId);
      return { valid: false, timeToSolve, attempts: challenge.attempts };
    }
    
    // Verificar resposta
    const isValid = await this.validateChallengeResponse(challenge, response);
    
    if (isValid) {
      challenge.solved = true;
      challenge.timeToSolve = timeToSolve;
      this.statistics.challengesSolved++;
      
      await securityLogger.logEvent(
        'BOT_CHALLENGE_SOLVED',
        'LOW',
        'Desafio resolvido com sucesso',
        {
          challengeId,
          type: challenge.type,
          timeToSolve,
          attempts: challenge.attempts
        }
      );
    } else {
      await securityLogger.logEvent(
        'BOT_CHALLENGE_FAILED',
        'MEDIUM',
        'Falha na resolução do desafio',
        {
          challengeId,
          type: challenge.type,
          response,
          attempts: challenge.attempts
        }
      );
    }
    
    return { valid: isValid, timeToSolve, attempts: challenge.attempts };
  }
  
  /**
   * Obtém estatísticas da proteção contra bots
   */
  getStatistics(): BotStatistics {
    // Calcular precisão
    const totalDetections = this.statistics.botRequests + this.statistics.humanRequests;
    this.statistics.detectionAccuracy = totalDetections > 0 ? 
      ((this.statistics.botRequests - this.statistics.falsePositives) + 
       (this.statistics.humanRequests - this.statistics.falseNegatives)) / totalDetections : 0;
    
    // Calcular confiança média
    const sessions = Array.from(this.sessions.values());
    this.statistics.avgConfidence = sessions.length > 0 ? 
      sessions.reduce((sum, session) => sum + session.botConfidence, 0) / sessions.length : 0;
    
    return { ...this.statistics };
  }
  
  /**
   * Adiciona um bot à lista de permitidos
   */
  async allowBot(userAgent: string): Promise<void> {
    LEGITIMATE_BOTS.push(userAgent);
    
    await securityLogger.logEvent(
      'BOT_ALLOWED',
      'LOW',
      'Bot adicionado à lista de permitidos',
      { userAgent }
    );
  }
  
  /**
   * Bloqueia um bot específico
   */
  async blockBot(userAgent: string): Promise<void> {
    MALICIOUS_BOTS.push(userAgent);
    
    await securityLogger.logEvent(
      'BOT_BLOCKED',
      'MEDIUM',
      'Bot adicionado à lista de bloqueados',
      { userAgent }
    );
  }
  
  // Métodos privados
  private async generateSessionId(ip: string, userAgent: string): Promise<string> {
    try {
      const result = await hash.sha256(`${ip}:${userAgent}`);
      return result.substring(0, 16);
    } catch {
      return 'fallback';
    }
  }
  
  private createSession(sessionId: string, request: any): UserSession {
    return {
      id: sessionId,
      ip: request.ip,
      userAgent: request.userAgent,
      fingerprint: request.fingerprint || '',
      startTime: request.timestamp,
      lastActivity: request.timestamp,
      requestCount: 1,
      pageViews: [request.url],
      behaviorScore: 0,
      isBot: false,
      botConfidence: 0,
      challenges: [],
      verified: false
    };
  }
  
  private updateSession(session: UserSession, request: any): void {
    session.lastActivity = request.timestamp;
    session.requestCount++;
    
    if (!session.pageViews.includes(request.url)) {
      session.pageViews.push(request.url);
    }
  }
  
  private checkLegitimateBot(userAgent: string): { isLegitimate: boolean; reason: string } {
    if (!BOT_PROTECTION_CONFIG.allowLegitimateBotsEnabled) {
      return { isLegitimate: false, reason: 'Bots legítimos desabilitados' };
    }
    
    const legitimateBot = LEGITIMATE_BOTS.find(bot => 
      userAgent.toLowerCase().includes(bot.toLowerCase())
    );
    
    if (legitimateBot) {
      return {
        isLegitimate: true,
        reason: `Bot legítimo detectado: ${legitimateBot}`
      };
    }
    
    return { isLegitimate: false, reason: 'Não é bot legítimo' };
  }
  
  private async checkBotSignatures(request: any, session: UserSession): Promise<{
    evidence: BotEvidence[];
    score: number;
    maxScore: number;
  }> {
    const evidence: BotEvidence[] = [];
    let score = 0;
    let maxScore = 0;
    
    for (const signature of BOT_SIGNATURES) {
      if (!signature.active) continue;
      
      let signatureScore = 0;
      let signatureMaxScore = 0;
      
      for (const pattern of signature.patterns) {
        signatureMaxScore += pattern.weight;
        
        let content = '';
        switch (pattern.field) {
          case 'USER_AGENT':
            content = request.userAgent;
            break;
          case 'HEADERS':
            content = JSON.stringify(request.headers);
            break;
          case 'BEHAVIOR':
            content = this.getBehaviorString(session);
            break;
          case 'FINGERPRINT':
            content = request.fingerprint || '';
            break;
        }
        
        const isMatch = pattern.regex ? 
          new RegExp(pattern.pattern, pattern.caseSensitive ? '' : 'i').test(content) :
          pattern.caseSensitive ? 
            content.includes(pattern.pattern) :
            content.toLowerCase().includes(pattern.pattern.toLowerCase());
        
        if (isMatch) {
          signatureScore += pattern.weight;
          
          evidence.push({
            type: pattern.field === 'USER_AGENT' ? 'USER_AGENT' : 'FINGERPRINT',
            value: content,
            weight: pattern.weight,
            description: `${signature.name}: ${pattern.description}`
          });
        }
      }
      
      score += signatureScore;
      maxScore += signatureMaxScore;
    }
    
    return { evidence, score, maxScore };
  }
  
  private async analyzeBehavior(behavior: Partial<BehaviorAnalysis>, session: UserSession): Promise<{
    evidence: BotEvidence[];
    score: number;
    maxScore: number;
  }> {
    const evidence: BotEvidence[] = [];
    let score = 0;
    let maxScore = 0;
    
    // Verificar JavaScript
    maxScore += 0.6;
    if (!behavior.javascriptEnabled) {
      score += 0.6;
      evidence.push({
        type: 'JAVASCRIPT',
        value: 'false',
        weight: 0.6,
        description: 'JavaScript desabilitado'
      });
    }
    
    // Verificar cookies
    maxScore += 0.5;
    if (!behavior.cookiesEnabled) {
      score += 0.5;
      evidence.push({
        type: 'BEHAVIOR',
        value: 'no_cookies',
        weight: 0.5,
        description: 'Cookies desabilitados'
      });
    }
    
    // Verificar interações humanas
    maxScore += 0.7;
    const hasHumanInteraction = 
      (behavior.mouseMovements || 0) > 0 ||
      (behavior.keyboardEvents || 0) > 0 ||
      (behavior.clickEvents || 0) > 0 ||
      (behavior.scrollEvents || 0) > 0;
    
    if (!hasHumanInteraction) {
      score += 0.7;
      evidence.push({
        type: 'BEHAVIOR',
        value: 'no_interaction',
        weight: 0.7,
        description: 'Nenhuma interação humana detectada'
      });
    }
    
    // Verificar resolução de tela suspeita
    maxScore += 0.3;
    if (behavior.screenResolution && 
        (behavior.screenResolution === '1024x768' || 
         behavior.screenResolution === '1920x1080' ||
         behavior.screenResolution === '800x600')) {
      score += 0.3;
      evidence.push({
        type: 'FINGERPRINT',
        value: behavior.screenResolution,
        weight: 0.3,
        description: 'Resolução de tela comum em bots'
      });
    }
    
    return { evidence, score, maxScore };
  }
  
  private analyzeFrequency(session: UserSession): {
    evidence: BotEvidence[];
    score: number;
    maxScore: number;
  } {
    const evidence: BotEvidence[] = [];
    let score = 0;
    const maxScore = 0.8;
    
    const now = Date.now();
    const sessionDuration = now - session.startTime;
    const requestsPerMinute = sessionDuration > 0 ? 
      (session.requestCount / (sessionDuration / 60000)) : 0;
    
    if (requestsPerMinute > BOT_PROTECTION_CONFIG.maxRequestsPerMinute) {
      score = 0.8;
      evidence.push({
        type: 'FREQUENCY',
        value: requestsPerMinute.toString(),
        weight: 0.8,
        description: `Frequência muito alta: ${requestsPerMinute.toFixed(2)} req/min`
      });
    }
    
    return { evidence, score, maxScore };
  }
  
  private analyzeHeaders(headers: Record<string, string>): {
    evidence: BotEvidence[];
    score: number;
    maxScore: number;
  } {
    const evidence: BotEvidence[] = [];
    let score = 0;
    let maxScore = 0;
    
    // Verificar headers suspeitos
    const suspiciousHeaders = [
      'x-forwarded-for',
      'x-real-ip',
      'x-originating-ip',
      'x-remote-ip',
      'x-cluster-client-ip'
    ];
    
    maxScore += 0.4;
    const hasSuspiciousHeaders = suspiciousHeaders.some(header => 
      headers[header] || headers[header.toUpperCase()]
    );
    
    if (hasSuspiciousHeaders) {
      score += 0.4;
      evidence.push({
        type: 'HEADERS',
        value: JSON.stringify(headers),
        weight: 0.4,
        description: 'Headers suspeitos detectados'
      });
    }
    
    // Verificar ausência de headers comuns
    maxScore += 0.3;
    const commonHeaders = ['accept', 'accept-language', 'accept-encoding'];
    const missingHeaders = commonHeaders.filter(header => 
      !headers[header] && !headers[header.toUpperCase()]
    );
    
    if (missingHeaders.length > 1) {
      score += 0.3;
      evidence.push({
        type: 'HEADERS',
        value: missingHeaders.join(', '),
        weight: 0.3,
        description: 'Headers comuns ausentes'
      });
    }
    
    return { evidence, score, maxScore };
  }
  
  private checkHoneypot(url: string): {
    triggered: boolean;
    evidence: BotEvidence;
    score: number;
    maxScore: number;
  } {
    const isHoneypot = this.honeypots.has(url);
    
    if (isHoneypot) {
      return {
        triggered: true,
        evidence: {
          type: 'BEHAVIOR',
          value: url,
          weight: 1.0,
          description: 'Acessou honeypot'
        },
        score: 1.0,
        maxScore: 1.0
      };
    }
    
    return {
      triggered: false,
      evidence: {} as BotEvidence,
      score: 0,
      maxScore: 0
    };
  }
  
  private determineBotType(evidence: BotEvidence[], userAgent: string): BotType {
    // Verificar se é bot malicioso
    const isMalicious = MALICIOUS_BOTS.some(bot => 
      userAgent.toLowerCase().includes(bot.toLowerCase())
    );
    
    if (isMalicious) {
      return 'ATTACK_BOT';
    }
    
    // Analisar evidências
    const hasScrapingEvidence = evidence.some(e => 
      e.description.toLowerCase().includes('scraping') ||
      e.description.toLowerCase().includes('crawler')
    );
    
    if (hasScrapingEvidence) {
      return 'SCRAPER';
    }
    
    const hasAttackEvidence = evidence.some(e => 
      e.description.toLowerCase().includes('attack') ||
      e.description.toLowerCase().includes('malicious')
    );
    
    if (hasAttackEvidence) {
      return 'ATTACK_BOT';
    }
    
    const hasSEOEvidence = evidence.some(e => 
      e.description.toLowerCase().includes('seo') ||
      userAgent.toLowerCase().includes('seo')
    );
    
    if (hasSEOEvidence) {
      return 'SEO_BOT';
    }
    
    return 'UNKNOWN';
  }
  
  private determineAction(isBot: boolean, botType: BotType, riskScore: number, session: UserSession): BotAction {
    if (!isBot) {
      return 'ALLOW';
    }
    
    // Bots legítimos são sempre permitidos
    if (botType === 'LEGITIMATE_BOT') {
      return 'ALLOW';
    }
    
    // Bots de ataque são sempre bloqueados
    if (botType === 'ATTACK_BOT') {
      return 'BLOCK';
    }
    
    // Baseado no risco
    if (riskScore >= 90) {
      return 'BLOCK';
    } else if (riskScore >= 70) {
      return BOT_PROTECTION_CONFIG.challengeEnabled ? 'CHALLENGE' : 'BLOCK';
    } else if (riskScore >= 50) {
      return 'RATE_LIMIT';
    } else {
      return 'MONITOR';
    }
  }
  
  private generateReason(evidence: BotEvidence[], isBot: boolean): string {
    if (!isBot) {
      return 'Comportamento humano detectado';
    }
    
    const topEvidence = evidence
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3)
      .map(e => e.description)
      .join(', ');
    
    return `Bot detectado: ${topEvidence}`;
  }
  
  private getBehaviorString(session: UserSession): string {
    const behaviors = [];
    
    if (session.requestCount > BOT_PROTECTION_CONFIG.maxRequestsPerMinute) {
      behaviors.push('rapid_requests');
    }
    
    if (session.pageViews.length === session.requestCount) {
      behaviors.push('linear_access');
    }
    
    return behaviors.join(',');
  }
  
  private async createJavaScriptChallenge(challengeId: string): Promise<ChallengeResponse> {
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;
    const operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    
    let expectedResponse: number;
    switch (operation) {
      case '+':
        expectedResponse = num1 + num2;
        break;
      case '-':
        expectedResponse = num1 - num2;
        break;
      case '*':
        expectedResponse = num1 * num2;
        break;
      default:
        expectedResponse = num1 + num2;
    }
    
    return {
      id: challengeId,
      type: 'JAVASCRIPT',
      challenge: `Math.floor(${num1} ${operation} ${num2})`,
      expectedResponse: expectedResponse.toString(),
      timestamp: Date.now(),
      attempts: 0,
      solved: false
    };
  }
  
  private async createMathChallenge(challengeId: string): Promise<ChallengeResponse> {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const result = num1 + num2;
    
    return {
      id: challengeId,
      type: 'MATH',
      challenge: `Quanto é ${num1} + ${num2}?`,
      expectedResponse: result.toString(),
      timestamp: Date.now(),
      attempts: 0,
      solved: false
    };
  }
  
  private async createInteractionChallenge(challengeId: string): Promise<ChallengeResponse> {
    return {
      id: challengeId,
      type: 'INTERACTION',
      challenge: 'Clique no botão para continuar',
      expectedResponse: 'clicked',
      timestamp: Date.now(),
      attempts: 0,
      solved: false
    };
  }
  
  private async createTimingChallenge(challengeId: string): Promise<ChallengeResponse> {
    return {
      id: challengeId,
      type: 'TIMING',
      challenge: 'Aguarde 3 segundos e clique',
      expectedResponse: 'timing_correct',
      timestamp: Date.now(),
      attempts: 0,
      solved: false
    };
  }
  
  private async createProofOfWorkChallenge(challengeId: string): Promise<ChallengeResponse> {
    const difficulty = 4; // Número de zeros necessários
    const data = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return {
      id: challengeId,
      type: 'PROOF_OF_WORK',
      challenge: JSON.stringify({ data, difficulty }),
      expectedResponse: 'proof_of_work_valid',
      timestamp: Date.now(),
      attempts: 0,
      solved: false
    };
  }
  
  private async validateChallengeResponse(challenge: ChallengeResponse, response: string): Promise<boolean> {
    switch (challenge.type) {
      case 'JAVASCRIPT':
      case 'MATH':
        return response === challenge.expectedResponse;
        
      case 'INTERACTION':
        return response === 'clicked';
        
      case 'TIMING':
        const timeToSolve = Date.now() - challenge.timestamp;
        return response === 'timing_correct' && timeToSolve >= 3000 && timeToSolve <= 10000;
        
      case 'PROOF_OF_WORK':
        return await this.validateProofOfWork(challenge.challenge, response);
        
      default:
        return false;
    }
  }
  
  private async validateProofOfWork(challengeData: string, response: string): Promise<boolean> {
    try {
      const { data, difficulty } = JSON.parse(challengeData);
      const nonce = response;
      const hashInput = data + nonce;
      const hashResult = await hash.sha256(hashInput);
      
      return hashResult.startsWith('0'.repeat(difficulty));
    } catch {
      return false;
    }
  }
  
  private async logBotDetection(request: any, session: UserSession, result: BotDetectionResult): Promise<void> {
    await securityLogger.logEvent(
      'BOT_DETECTION',
      result.isBot ? 'MEDIUM' : 'LOW',
      `Bot detection: ${result.isBot ? 'Bot' : 'Human'} detected`,
      {
        sessionId: session.id,
        ip: request.ip,
        userAgent: request.userAgent,
        url: request.url,
        isBot: result.isBot,
        confidence: result.confidence,
        botType: result.botType,
        riskScore: result.riskScore,
        action: result.action,
        evidenceCount: result.evidence.length,
        requestCount: session.requestCount
      }
    );
  }
  
  private initializeStatistics(): BotStatistics {
    return {
      totalRequests: 0,
      botRequests: 0,
      humanRequests: 0,
      blockedBots: 0,
      challengesSent: 0,
      challengesSolved: 0,
      falsePositives: 0,
      falseNegatives: 0,
      topBotTypes: [],
      topUserAgents: [],
      detectionAccuracy: 0,
      avgConfidence: 0
    };
  }
  
  private setupHoneypots(): void {
    if (!BOT_PROTECTION_CONFIG.honeypotEnabled) {
      return;
    }
    
    // URLs honeypot comuns
    const honeypotUrls = [
      '/admin.php',
      '/wp-admin/',
      '/administrator/',
      '/phpmyadmin/',
      '/robots.txt.bak',
      '/.env',
      '/config.php',
      '/backup.sql',
      '/database.sql',
      '/admin/login.php'
    ];
    
    honeypotUrls.forEach(url => this.honeypots.add(url));
  }
  
  private startCleanupScheduler(): void {
    // Limpeza a cada 30 minutos
    setInterval(() => {
      this.cleanupExpiredData();
    }, 30 * 60 * 1000);
  }
  
  private cleanupExpiredData(): void {
    const now = Date.now();
    
    // Limpar sessões expiradas
    this.sessions.forEach((session, sessionId) => {
      if (now - session.lastActivity > BOT_PROTECTION_CONFIG.sessionTimeout) {
        this.sessions.delete(sessionId);
      }
    });
    
    // Limpar desafios expirados
    this.challenges.forEach((challenge, challengeId) => {
      if (now - challenge.timestamp > BOT_PROTECTION_CONFIG.challengeTimeout) {
        this.challenges.delete(challengeId);
      }
    });
  }
}

// Instância singleton
export const botProtection = BotProtection.getInstance();

// Hook para React
export const useBotProtection = () => {
  const analyzeRequest = async (request: {
    ip?: string;
    userAgent?: string;
    headers?: Record<string, string>;
    url?: string;
    method?: string;
    fingerprint?: string;
    behavior?: Partial<BehaviorAnalysis>;
  }) => {
    const fullRequest = {
      ip: request.ip || 'unknown',
      userAgent: request.userAgent || navigator.userAgent,
      headers: request.headers || {},
      url: request.url || window.location.href,
      method: request.method || 'GET',
      timestamp: Date.now(),
      fingerprint: request.fingerprint,
      behavior: request.behavior
    };
    
    return await botProtection.analyzeRequest(fullRequest);
  };
  
  const createChallenge = async (sessionId: string, type?: ChallengeType) => {
    return await botProtection.createChallenge(sessionId, type);
  };
  
  const verifyChallenge = async (challengeId: string, response: string) => {
    return await botProtection.verifyChallenge(challengeId, response);
  };
  
  const getStatistics = () => {
    return botProtection.getStatistics();
  };
  
  const allowBot = async (userAgent: string) => {
    return await botProtection.allowBot(userAgent);
  };
  
  const blockBot = async (userAgent: string) => {
    return await botProtection.blockBot(userAgent);
  };
  
  return {
    analyzeRequest,
    createChallenge,
    verifyChallenge,
    getStatistics,
    allowBot,
    blockBot
  };
};

console.log('🤖 Sistema de proteção contra bots inicializado');

// Exportar para uso global
(window as any).__botProtection = botProtection;

// Exportar tipos
export type {
  BotDetectionResult,
  BotEvidence,
  BotSignature,
  BehaviorAnalysis,
  ChallengeResponse,
  BotStatistics,
  UserSession
};