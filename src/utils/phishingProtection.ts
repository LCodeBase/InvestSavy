/**
 * Sistema de Proteção contra Phishing e Engenharia Social
 * Detecta e previne ataques de phishing, engenharia social e sites maliciosos
 */

import { securityLogger } from './securityLogger';
import { generateSecureToken, hash } from './encryption';
import { ENV_CONFIG } from '../config/environment';

// Tipos para proteção contra phishing
interface PhishingThreat {
  id: string;
  type: ThreatType;
  severity: ThreatSeverity;
  url: string;
  domain: string;
  description: string;
  indicators: ThreatIndicator[];
  timestamp: number;
  source: string;
  confidence: number;
  blocked: boolean;
  reportedBy?: string;
}

interface ThreatIndicator {
  type: IndicatorType;
  value: string;
  confidence: number;
  description: string;
}

interface DomainAnalysis {
  domain: string;
  isLegitimate: boolean;
  riskScore: number;
  indicators: {
    suspiciousTLD: boolean;
    homographAttack: boolean;
    typosquatting: boolean;
    newDomain: boolean;
    shortUrl: boolean;
    ipAddress: boolean;
    suspiciousKeywords: string[];
    certificateIssues: boolean;
    reputationScore: number;
  };
  similarDomains: string[];
  category: DomainCategory;
  lastChecked: number;
}

interface URLAnalysis {
  url: string;
  domain: string;
  isPhishing: boolean;
  riskScore: number;
  indicators: {
    suspiciousPath: boolean;
    hiddenRedirects: boolean;
    shortUrl: boolean;
    suspiciousParameters: string[];
    encodedContent: boolean;
    mixedContent: boolean;
    fakeSSL: boolean;
  };
  category: URLCategory;
  lastChecked: number;
}

interface SocialEngineeringPattern {
  id: string;
  type: SocialEngineeringType;
  pattern: RegExp;
  description: string;
  severity: ThreatSeverity;
  keywords: string[];
  confidence: number;
  active: boolean;
}

interface PhishingAlert {
  id: string;
  type: AlertType;
  severity: ThreatSeverity;
  title: string;
  message: string;
  url?: string;
  domain?: string;
  timestamp: number;
  acknowledged: boolean;
  actions: string[];
  userAgent?: string;
  ip?: string;
}

interface PhishingStatistics {
  totalThreats: number;
  blockedThreats: number;
  phishingAttempts: number;
  socialEngineeringAttempts: number;
  maliciousDomains: number;
  suspiciousURLs: number;
  alertsGenerated: number;
  topThreatTypes: Array<{ type: string; count: number }>;
  topDomains: Array<{ domain: string; count: number }>;
  detectionAccuracy: number;
}

type ThreatType = 'PHISHING' | 'MALWARE' | 'SCAM' | 'SOCIAL_ENGINEERING' | 'TYPOSQUATTING' | 'HOMOGRAPH' | 'SUSPICIOUS';
type ThreatSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
type IndicatorType = 'DOMAIN' | 'URL' | 'IP' | 'HASH' | 'KEYWORD' | 'PATTERN';
type DomainCategory = 'LEGITIMATE' | 'SUSPICIOUS' | 'MALICIOUS' | 'UNKNOWN';
type URLCategory = 'SAFE' | 'SUSPICIOUS' | 'PHISHING' | 'MALWARE' | 'BLOCKED';
type SocialEngineeringType = 'URGENCY' | 'AUTHORITY' | 'FEAR' | 'GREED' | 'CURIOSITY' | 'TRUST' | 'IMPERSONATION';
type AlertType = 'PHISHING_DETECTED' | 'MALICIOUS_DOMAIN' | 'SOCIAL_ENGINEERING' | 'SUSPICIOUS_ACTIVITY';

// Listas de domínios e padrões conhecidos
const LEGITIMATE_DOMAINS = new Set([
  'google.com', 'microsoft.com', 'apple.com', 'amazon.com', 'facebook.com',
  'twitter.com', 'linkedin.com', 'github.com', 'stackoverflow.com',
  'wikipedia.org', 'mozilla.org', 'w3.org', 'ietf.org'
]);

const SUSPICIOUS_TLDS = new Set([
  '.tk', '.ml', '.ga', '.cf', '.click', '.download', '.loan', '.win',
  '.bid', '.racing', '.party', '.review', '.trade', '.date', '.stream'
]);

const PHISHING_KEYWORDS = [
  'verify', 'suspend', 'urgent', 'immediate', 'action', 'required',
  'click', 'here', 'update', 'confirm', 'secure', 'account',
  'login', 'password', 'expired', 'limited', 'time', 'offer',
  'winner', 'congratulations', 'prize', 'free', 'bonus'
];

const SOCIAL_ENGINEERING_PATTERNS: SocialEngineeringPattern[] = [
  {
    id: 'urgency-1',
    type: 'URGENCY',
    pattern: /urgent|immediate|asap|expires?|deadline|limited time/i,
    description: 'Criação de senso de urgência',
    severity: 'HIGH',
    keywords: ['urgent', 'immediate', 'expires', 'deadline'],
    confidence: 85,
    active: true
  },
  {
    id: 'authority-1',
    type: 'AUTHORITY',
    pattern: /bank|government|police|fbi|irs|microsoft|apple|google/i,
    description: 'Impersonação de autoridade',
    severity: 'HIGH',
    keywords: ['bank', 'government', 'police', 'microsoft'],
    confidence: 90,
    active: true
  },
  {
    id: 'fear-1',
    type: 'FEAR',
    pattern: /suspend|block|close|terminate|legal action|arrest/i,
    description: 'Uso de medo e intimidação',
    severity: 'HIGH',
    keywords: ['suspend', 'block', 'legal action', 'arrest'],
    confidence: 80,
    active: true
  },
  {
    id: 'greed-1',
    type: 'GREED',
    pattern: /free|bonus|prize|winner|lottery|million|inheritance/i,
    description: 'Exploração de ganância',
    severity: 'MEDIUM',
    keywords: ['free', 'prize', 'lottery', 'million'],
    confidence: 75,
    active: true
  }
];

// Classe principal de proteção contra phishing
export class PhishingProtection {
  private static instance: PhishingProtection;
  private threats: Map<string, PhishingThreat> = new Map();
  private domainCache: Map<string, DomainAnalysis> = new Map();
  private urlCache: Map<string, URLAnalysis> = new Map();
  private alerts: PhishingAlert[] = [];
  private blockedDomains: Set<string> = new Set();
  private allowedDomains: Set<string> = new Set(LEGITIMATE_DOMAINS);
  private isEnabled = true;
  
  private constructor() {
    this.loadThreatIntelligence();
    this.startPeriodicUpdates();
  }
  
  static getInstance(): PhishingProtection {
    if (!PhishingProtection.instance) {
      PhishingProtection.instance = new PhishingProtection();
    }
    return PhishingProtection.instance;
  }
  
  /**
   * Analisa uma URL para detectar phishing
   */
  async analyzeURL(url: string, context?: {
    userAgent?: string;
    ip?: string;
    referrer?: string;
  }): Promise<{
    isPhishing: boolean;
    riskScore: number;
    threats: PhishingThreat[];
    recommendations: string[];
    shouldBlock: boolean;
  }> {
    if (!this.isEnabled) {
      return {
        isPhishing: false,
        riskScore: 0,
        threats: [],
        recommendations: [],
        shouldBlock: false
      };
    }
    
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.toLowerCase();
      
      // Verificar cache
      const cached = this.urlCache.get(url);
      if (cached && Date.now() - cached.lastChecked < 300000) { // 5 minutos
        return this.formatAnalysisResult(cached, []);
      }
      
      // Verificar se domínio está bloqueado
      if (this.blockedDomains.has(domain)) {
        const threat = await this.createThreat(
          'PHISHING',
          'HIGH',
          url,
          domain,
          'Domínio bloqueado por atividade maliciosa',
          [{ type: 'DOMAIN', value: domain, confidence: 100, description: 'Domínio na lista negra' }],
          'BLOCKLIST'
        );
        
        return {
          isPhishing: true,
          riskScore: 100,
          threats: [threat],
          recommendations: ['Não acesse este site', 'Reporte como phishing'],
          shouldBlock: true
        };
      }
      
      // Verificar se domínio é confiável
      if (this.allowedDomains.has(domain)) {
        const analysis: URLAnalysis = {
          url,
          domain,
          isPhishing: false,
          riskScore: 0,
          indicators: {
            suspiciousPath: false,
            hiddenRedirects: false,
            shortUrl: false,
            suspiciousParameters: [],
            encodedContent: false,
            mixedContent: false,
            fakeSSL: false
          },
          category: 'SAFE',
          lastChecked: Date.now()
        };
        
        this.urlCache.set(url, analysis);
        return this.formatAnalysisResult(analysis, []);
      }
      
      // Análise completa
      const domainAnalysis = await this.analyzeDomain(domain);
      const urlAnalysis = await this.performURLAnalysis(url, urlObj);
      const socialEngineering = await this.detectSocialEngineering(url);
      
      const threats: PhishingThreat[] = [];
      let riskScore = 0;
      
      // Avaliar domínio
      if (domainAnalysis.riskScore > 70) {
        const threat = await this.createThreat(
          domainAnalysis.riskScore > 90 ? 'PHISHING' : 'SUSPICIOUS',
          domainAnalysis.riskScore > 90 ? 'HIGH' : 'MEDIUM',
          url,
          domain,
          'Domínio suspeito detectado',
          [{ type: 'DOMAIN', value: domain, confidence: domainAnalysis.riskScore, description: 'Análise de domínio' }],
          'DOMAIN_ANALYSIS'
        );
        threats.push(threat);
        riskScore = Math.max(riskScore, domainAnalysis.riskScore);
      }
      
      // Avaliar URL
      if (urlAnalysis.riskScore > 60) {
        const threat = await this.createThreat(
          urlAnalysis.riskScore > 80 ? 'PHISHING' : 'SUSPICIOUS',
          urlAnalysis.riskScore > 80 ? 'HIGH' : 'MEDIUM',
          url,
          domain,
          'URL suspeita detectada',
          [{ type: 'URL', value: url, confidence: urlAnalysis.riskScore, description: 'Análise de URL' }],
          'URL_ANALYSIS'
        );
        threats.push(threat);
        riskScore = Math.max(riskScore, urlAnalysis.riskScore);
      }
      
      // Avaliar engenharia social
      for (const pattern of socialEngineering) {
        const threat = await this.createThreat(
          'SOCIAL_ENGINEERING',
          pattern.severity,
          url,
          domain,
          pattern.description,
          [{ type: 'PATTERN', value: pattern.pattern.toString(), confidence: pattern.confidence, description: pattern.description }],
          'SOCIAL_ENGINEERING'
        );
        threats.push(threat);
        riskScore = Math.max(riskScore, pattern.confidence);
      }
      
      const finalAnalysis: URLAnalysis = {
        url,
        domain,
        isPhishing: riskScore > 70,
        riskScore,
        indicators: urlAnalysis.indicators,
        category: riskScore > 80 ? 'PHISHING' : riskScore > 60 ? 'SUSPICIOUS' : 'SAFE',
        lastChecked: Date.now()
      };
      
      this.urlCache.set(url, finalAnalysis);
      
      // Log da análise
      await securityLogger.logEvent(
        'PHISHING_ANALYSIS',
        riskScore > 70 ? 'HIGH' : 'LOW',
        'Análise de phishing realizada',
        {
          url,
          domain,
          riskScore,
          threatsFound: threats.length,
          userAgent: context?.userAgent,
          ip: context?.ip
        }
      );
      
      return this.formatAnalysisResult(finalAnalysis, threats);
      
    } catch (error) {
      await securityLogger.logEvent(
        'PHISHING_ANALYSIS_ERROR',
        'MEDIUM',
        'Erro na análise de phishing',
        { url, error: error.message }
      );
      
      return {
        isPhishing: false,
        riskScore: 0,
        threats: [],
        recommendations: ['Erro na análise - proceda com cautela'],
        shouldBlock: false
      };
    }
  }
  
  /**
   * Analisa um domínio para detectar indicadores suspeitos
   */
  async analyzeDomain(domain: string): Promise<DomainAnalysis> {
    // Verificar cache
    const cached = this.domainCache.get(domain);
    if (cached && Date.now() - cached.lastChecked < 3600000) { // 1 hora
      return cached;
    }
    
    let riskScore = 0;
    const indicators = {
      suspiciousTLD: false,
      homographAttack: false,
      typosquatting: false,
      newDomain: false,
      shortUrl: false,
      ipAddress: false,
      suspiciousKeywords: [] as string[],
      certificateIssues: false,
      reputationScore: 50
    };
    
    // Verificar TLD suspeito
    const tld = '.' + domain.split('.').pop();
    if (SUSPICIOUS_TLDS.has(tld)) {
      indicators.suspiciousTLD = true;
      riskScore += 30;
    }
    
    // Verificar se é endereço IP
    if (/^\d+\.\d+\.\d+\.\d+$/.test(domain)) {
      indicators.ipAddress = true;
      riskScore += 40;
    }
    
    // Verificar homograph attack
    if (this.detectHomographAttack(domain)) {
      indicators.homographAttack = true;
      riskScore += 50;
    }
    
    // Verificar typosquatting
    const typosquatting = this.detectTyposquatting(domain);
    if (typosquatting.length > 0) {
      indicators.typosquatting = true;
      riskScore += 40;
    }
    
    // Verificar palavras-chave suspeitas
    const suspiciousKeywords = PHISHING_KEYWORDS.filter(keyword => 
      domain.toLowerCase().includes(keyword)
    );
    if (suspiciousKeywords.length > 0) {
      indicators.suspiciousKeywords = suspiciousKeywords;
      riskScore += suspiciousKeywords.length * 10;
    }
    
    // Verificar comprimento suspeito
    if (domain.length > 50) {
      riskScore += 20;
    }
    
    // Verificar número de subdomínios
    const subdomains = domain.split('.').length - 2;
    if (subdomains > 3) {
      riskScore += subdomains * 5;
    }
    
    // Verificar caracteres suspeitos
    if (/[0-9]{3,}/.test(domain) || /-{2,}/.test(domain)) {
      riskScore += 15;
    }
    
    const analysis: DomainAnalysis = {
      domain,
      isLegitimate: riskScore < 30,
      riskScore: Math.min(riskScore, 100),
      indicators,
      similarDomains: typosquatting,
      category: riskScore > 70 ? 'MALICIOUS' : riskScore > 40 ? 'SUSPICIOUS' : 'LEGITIMATE',
      lastChecked: Date.now()
    };
    
    this.domainCache.set(domain, analysis);
    return analysis;
  }
  
  /**
   * Detecta padrões de engenharia social
   */
  async detectSocialEngineering(content: string): Promise<SocialEngineeringPattern[]> {
    const detectedPatterns: SocialEngineeringPattern[] = [];
    
    for (const pattern of SOCIAL_ENGINEERING_PATTERNS) {
      if (pattern.active && pattern.pattern.test(content)) {
        detectedPatterns.push(pattern);
      }
    }
    
    return detectedPatterns;
  }
  
  /**
   * Bloqueia um domínio
   */
  async blockDomain(domain: string, reason: string): Promise<void> {
    this.blockedDomains.add(domain.toLowerCase());
    
    await securityLogger.logEvent(
      'DOMAIN_BLOCKED',
      'HIGH',
      'Domínio bloqueado',
      { domain, reason }
    );
    
    // Gerar alerta
    await this.generateAlert(
      'MALICIOUS_DOMAIN',
      'HIGH',
      'Domínio Bloqueado',
      `O domínio ${domain} foi bloqueado: ${reason}`,
      domain
    );
  }
  
  /**
   * Desbloqueia um domínio
   */
  async unblockDomain(domain: string, reason: string): Promise<void> {
    this.blockedDomains.delete(domain.toLowerCase());
    
    await securityLogger.logEvent(
      'DOMAIN_UNBLOCKED',
      'MEDIUM',
      'Domínio desbloqueado',
      { domain, reason }
    );
  }
  
  /**
   * Adiciona um domínio à lista de confiança
   */
  async allowDomain(domain: string): Promise<void> {
    this.allowedDomains.add(domain.toLowerCase());
    
    await securityLogger.logEvent(
      'DOMAIN_ALLOWED',
      'LOW',
      'Domínio adicionado à lista de confiança',
      { domain }
    );
  }
  
  /**
   * Remove um domínio da lista de confiança
   */
  async disallowDomain(domain: string): Promise<void> {
    this.allowedDomains.delete(domain.toLowerCase());
    
    await securityLogger.logEvent(
      'DOMAIN_DISALLOWED',
      'MEDIUM',
      'Domínio removido da lista de confiança',
      { domain }
    );
  }
  
  /**
   * Reporta uma URL como phishing
   */
  async reportPhishing(url: string, reportedBy: string, description?: string): Promise<void> {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.toLowerCase();
    
    const threat = await this.createThreat(
      'PHISHING',
      'HIGH',
      url,
      domain,
      description || 'Reportado como phishing pelo usuário',
      [{ type: 'URL', value: url, confidence: 90, description: 'Reporte de usuário' }],
      'USER_REPORT'
    );
    
    threat.reportedBy = reportedBy;
    
    // Bloquear automaticamente se confiança for alta
    if (threat.confidence > 85) {
      await this.blockDomain(domain, 'Reportado como phishing');
    }
    
    await securityLogger.logEvent(
      'PHISHING_REPORTED',
      'HIGH',
      'Phishing reportado por usuário',
      {
        url,
        domain,
        reportedBy,
        description,
        threatId: threat.id
      }
    );
  }
  
  /**
   * Obtém estatísticas de proteção
   */
  getStatistics(): PhishingStatistics {
    const threats = Array.from(this.threats.values());
    
    const totalThreats = threats.length;
    const blockedThreats = threats.filter(t => t.blocked).length;
    const phishingAttempts = threats.filter(t => t.type === 'PHISHING').length;
    const socialEngineeringAttempts = threats.filter(t => t.type === 'SOCIAL_ENGINEERING').length;
    const maliciousDomains = this.blockedDomains.size;
    const suspiciousURLs = this.urlCache.size;
    const alertsGenerated = this.alerts.length;
    
    // Top tipos de ameaça
    const threatTypeCounts = new Map<string, number>();
    threats.forEach(threat => {
      const count = threatTypeCounts.get(threat.type) || 0;
      threatTypeCounts.set(threat.type, count + 1);
    });
    
    const topThreatTypes = Array.from(threatTypeCounts.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Top domínios
    const domainCounts = new Map<string, number>();
    threats.forEach(threat => {
      const count = domainCounts.get(threat.domain) || 0;
      domainCounts.set(threat.domain, count + 1);
    });
    
    const topDomains = Array.from(domainCounts.entries())
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Precisão da detecção (simulada)
    const detectionAccuracy = 95.5;
    
    return {
      totalThreats,
      blockedThreats,
      phishingAttempts,
      socialEngineeringAttempts,
      maliciousDomains,
      suspiciousURLs,
      alertsGenerated,
      topThreatTypes,
      topDomains,
      detectionAccuracy
    };
  }
  
  /**
   * Obtém ameaças detectadas
   */
  getThreats(type?: ThreatType, severity?: ThreatSeverity): PhishingThreat[] {
    let threats = Array.from(this.threats.values());
    
    if (type) {
      threats = threats.filter(t => t.type === type);
    }
    
    if (severity) {
      threats = threats.filter(t => t.severity === severity);
    }
    
    return threats.sort((a, b) => b.timestamp - a.timestamp);
  }
  
  /**
   * Obtém alertas
   */
  getAlerts(acknowledged = false): PhishingAlert[] {
    return this.alerts
      .filter(alert => alert.acknowledged === acknowledged)
      .sort((a, b) => b.timestamp - a.timestamp);
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
  
  // Métodos privados
  private async performURLAnalysis(url: string, urlObj: URL): Promise<URLAnalysis> {
    let riskScore = 0;
    const indicators = {
      suspiciousPath: false,
      hiddenRedirects: false,
      shortUrl: false,
      suspiciousParameters: [] as string[],
      encodedContent: false,
      mixedContent: false,
      fakeSSL: false
    };
    
    // Verificar path suspeito
    const suspiciousPaths = ['/login', '/signin', '/verify', '/update', '/secure'];
    if (suspiciousPaths.some(path => urlObj.pathname.includes(path))) {
      indicators.suspiciousPath = true;
      riskScore += 20;
    }
    
    // Verificar URL encurtada
    const shortUrlDomains = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly'];
    if (shortUrlDomains.includes(urlObj.hostname)) {
      indicators.shortUrl = true;
      riskScore += 30;
    }
    
    // Verificar parâmetros suspeitos
    const suspiciousParams = ['redirect', 'url', 'goto', 'next', 'return'];
    const urlParams = Array.from(urlObj.searchParams.keys());
    const foundSuspiciousParams = urlParams.filter(param => 
      suspiciousParams.includes(param.toLowerCase())
    );
    
    if (foundSuspiciousParams.length > 0) {
      indicators.suspiciousParameters = foundSuspiciousParams;
      riskScore += foundSuspiciousParams.length * 15;
    }
    
    // Verificar conteúdo codificado
    if (url.includes('%') && decodeURIComponent(url) !== url) {
      indicators.encodedContent = true;
      riskScore += 10;
    }
    
    // Verificar protocolo
    if (urlObj.protocol === 'http:' && urlObj.hostname !== 'localhost') {
      indicators.mixedContent = true;
      riskScore += 25;
    }
    
    return {
      url,
      domain: urlObj.hostname,
      isPhishing: riskScore > 60,
      riskScore: Math.min(riskScore, 100),
      indicators,
      category: riskScore > 80 ? 'PHISHING' : riskScore > 60 ? 'SUSPICIOUS' : 'SAFE',
      lastChecked: Date.now()
    };
  }
  
  private detectHomographAttack(domain: string): boolean {
    // Detectar caracteres que podem ser confundidos
    const homographs = {
      'a': ['а', 'α'],
      'e': ['е', 'ε'],
      'o': ['о', 'ο'],
      'p': ['р', 'ρ'],
      'c': ['с', 'ϲ'],
      'x': ['х', 'χ'],
      'y': ['у', 'γ']
    };
    
    for (const [latin, cyrillic] of Object.entries(homographs)) {
      for (const char of cyrillic) {
        if (domain.includes(char)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  private detectTyposquatting(domain: string): string[] {
    const similarDomains: string[] = [];
    
    // Verificar contra domínios legítimos conhecidos
    for (const legitimateDomain of LEGITIMATE_DOMAINS) {
      const distance = this.calculateLevenshteinDistance(domain, legitimateDomain);
      
      // Se a distância for pequena, pode ser typosquatting
      if (distance > 0 && distance <= 3 && Math.abs(domain.length - legitimateDomain.length) <= 2) {
        similarDomains.push(legitimateDomain);
      }
    }
    
    return similarDomains;
  }
  
  private calculateLevenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) {
      matrix[0][i] = i;
    }
    
    for (let j = 0; j <= str2.length; j++) {
      matrix[j][0] = j;
    }
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }
  
  private async createThreat(
    type: ThreatType,
    severity: ThreatSeverity,
    url: string,
    domain: string,
    description: string,
    indicators: ThreatIndicator[],
    source: string
  ): Promise<PhishingThreat> {
    const threat: PhishingThreat = {
      id: await generateSecureToken(16),
      type,
      severity,
      url,
      domain,
      description,
      indicators,
      timestamp: Date.now(),
      source,
      confidence: indicators.reduce((sum, ind) => sum + ind.confidence, 0) / indicators.length,
      blocked: false
    };
    
    this.threats.set(threat.id, threat);
    
    // Limitar número de ameaças
    if (this.threats.size > 10000) {
      const oldestThreat = Array.from(this.threats.values())
        .sort((a, b) => a.timestamp - b.timestamp)[0];
      this.threats.delete(oldestThreat.id);
    }
    
    return threat;
  }
  
  private formatAnalysisResult(analysis: URLAnalysis, threats: PhishingThreat[]): {
    isPhishing: boolean;
    riskScore: number;
    threats: PhishingThreat[];
    recommendations: string[];
    shouldBlock: boolean;
  } {
    const recommendations: string[] = [];
    
    if (analysis.riskScore > 80) {
      recommendations.push('NÃO acesse este site - alto risco de phishing');
      recommendations.push('Reporte como site malicioso');
      recommendations.push('Verifique se digitou o endereço corretamente');
    } else if (analysis.riskScore > 60) {
      recommendations.push('Proceda com extrema cautela');
      recommendations.push('Verifique a legitimidade do site');
      recommendations.push('Não forneça informações pessoais');
    } else if (analysis.riskScore > 30) {
      recommendations.push('Verifique a URL cuidadosamente');
      recommendations.push('Confirme se é o site oficial');
    } else {
      recommendations.push('Site aparenta ser seguro');
    }
    
    return {
      isPhishing: analysis.isPhishing,
      riskScore: analysis.riskScore,
      threats,
      recommendations,
      shouldBlock: analysis.riskScore > 80
    };
  }
  
  private async generateAlert(
    type: AlertType,
    severity: ThreatSeverity,
    title: string,
    message: string,
    url?: string,
    domain?: string
  ): Promise<void> {
    const alert: PhishingAlert = {
      id: await generateSecureToken(16),
      type,
      severity,
      title,
      message,
      url,
      domain,
      timestamp: Date.now(),
      acknowledged: false,
      actions: []
    };
    
    this.alerts.push(alert);
    
    // Limitar número de alertas
    if (this.alerts.length > 1000) {
      this.alerts.splice(0, this.alerts.length - 1000);
    }
    
    await securityLogger.logEvent(
      'PHISHING_ALERT_GENERATED',
      severity,
      title,
      {
        alertId: alert.id,
        type,
        message,
        url,
        domain
      }
    );
  }
  
  private async loadThreatIntelligence(): Promise<void> {
    // Carregar listas de ameaças conhecidas
    // Em produção, isso seria carregado de APIs de threat intelligence
    
    const knownPhishingDomains = [
      'phishing-example.com',
      'fake-bank.net',
      'malicious-site.org'
    ];
    
    for (const domain of knownPhishingDomains) {
      this.blockedDomains.add(domain);
    }
  }
  
  private startPeriodicUpdates(): void {
    // Atualizar threat intelligence a cada hora
    setInterval(() => {
      this.updateThreatIntelligence();
    }, 60 * 60 * 1000);
    
    // Limpar cache a cada 6 horas
    setInterval(() => {
      this.cleanupCache();
    }, 6 * 60 * 60 * 1000);
  }
  
  private async updateThreatIntelligence(): Promise<void> {
    // Atualizar listas de ameaças
    // Em produção, isso faria requisições para APIs de threat intelligence
    
    await securityLogger.logEvent(
      'THREAT_INTELLIGENCE_UPDATED',
      'LOW',
      'Threat intelligence atualizada',
      {
        blockedDomains: this.blockedDomains.size,
        allowedDomains: this.allowedDomains.size,
        threats: this.threats.size
      }
    );
  }
  
  private cleanupCache(): void {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas
    
    // Limpar cache de domínios
    for (const [domain, analysis] of this.domainCache.entries()) {
      if (now - analysis.lastChecked > maxAge) {
        this.domainCache.delete(domain);
      }
    }
    
    // Limpar cache de URLs
    for (const [url, analysis] of this.urlCache.entries()) {
      if (now - analysis.lastChecked > maxAge) {
        this.urlCache.delete(url);
      }
    }
    
    // Limpar ameaças antigas
    const maxThreatAge = 30 * 24 * 60 * 60 * 1000; // 30 dias
    for (const [id, threat] of this.threats.entries()) {
      if (now - threat.timestamp > maxThreatAge) {
        this.threats.delete(id);
      }
    }
    
    // Limpar alertas antigos
    const maxAlertAge = 7 * 24 * 60 * 60 * 1000; // 7 dias
    this.alerts = this.alerts.filter(alert => 
      now - alert.timestamp < maxAlertAge
    );
  }
}

// Instância singleton
export const phishingProtection = PhishingProtection.getInstance();

// Middleware para verificação de URLs
export const phishingMiddleware = async (req: any, res: any, next: any) => {
  try {
    const referer = req.headers.referer;
    const userAgent = req.headers['user-agent'];
    const ip = req.ip || req.connection.remoteAddress;
    
    if (referer) {
      const analysis = await phishingProtection.analyzeURL(referer, {
        userAgent,
        ip
      });
      
      if (analysis.shouldBlock) {
        return res.status(403).json({
          error: 'Acesso bloqueado',
          reason: 'Referer suspeito detectado',
          riskScore: analysis.riskScore
        });
      }
      
      req.phishingAnalysis = analysis;
    }
    
    next();
  } catch (error) {
    console.error('Erro no middleware de phishing:', error);
    next();
  }
};

// Hook para React
export const usePhishingProtection = () => {
  const analyzeURL = async (url: string) => {
    return await phishingProtection.analyzeURL(url, {
      userAgent: navigator.userAgent,
      ip: 'client'
    });
  };
  
  const reportPhishing = async (url: string, description?: string) => {
    return await phishingProtection.reportPhishing(url, 'user', description);
  };
  
  const getStatistics = () => {
    return phishingProtection.getStatistics();
  };
  
  const getThreats = (type?: ThreatType, severity?: ThreatSeverity) => {
    return phishingProtection.getThreats(type, severity);
  };
  
  const getAlerts = (acknowledged = false) => {
    return phishingProtection.getAlerts(acknowledged);
  };
  
  const acknowledgeAlert = (alertId: string) => {
    return phishingProtection.acknowledgeAlert(alertId);
  };
  
  return {
    analyzeURL,
    reportPhishing,
    getStatistics,
    getThreats,
    getAlerts,
    acknowledgeAlert
  };
};

console.log('🎣 Sistema de proteção contra phishing inicializado');

// Exportar para uso global
(window as any).__phishingProtection = phishingProtection;

// Exportar tipos
export type {
  PhishingThreat,
  DomainAnalysis,
  URLAnalysis,
  SocialEngineeringPattern,
  PhishingAlert,
  PhishingStatistics,
  ThreatType,
  ThreatSeverity,
  AlertType
};