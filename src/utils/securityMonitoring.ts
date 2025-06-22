/**
 * Sistema de monitoramento de segurança em tempo real
 * Detecta ameaças, analisa padrões e gera alertas automáticos
 */

import { securityLogger } from './securityLogger';
import { ddosProtection } from './ddosProtection';
import { injectionProtection } from './injectionProtection';
import { secureAuth } from './secureAuth';
import { hash, generateSecureToken } from './encryption';

// Tipos para monitoramento
interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  severity: SecuritySeverity;
  timestamp: number;
  source: string;
  description: string;
  metadata: Record<string, any>;
  resolved: boolean;
  resolvedAt?: number;
  resolvedBy?: string;
}

interface ThreatPattern {
  id: string;
  name: string;
  description: string;
  indicators: ThreatIndicator[];
  severity: SecuritySeverity;
  confidence: number;
  lastDetected: number;
  detectionCount: number;
  active: boolean;
}

interface ThreatIndicator {
  type: 'IP' | 'USER_AGENT' | 'PATTERN' | 'FREQUENCY' | 'GEOLOCATION' | 'BEHAVIOR' | 'DEVICE_FINGERPRINT';
  value: string;
  weight: number;
  description: string;
}

interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: SecuritySeverity;
  timestamp: number;
  events: SecurityEvent[];
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: number;
  actions: SecurityAction[];
}

interface SecurityAction {
  id: string;
  type: 'BLOCK_IP' | 'RATE_LIMIT' | 'REQUIRE_2FA' | 'LOCK_ACCOUNT' | 'NOTIFY_ADMIN' | 'AUTO_REMEDIATE';
  description: string;
  executed: boolean;
  executedAt?: number;
  result?: string;
}

interface SecurityMetrics {
  timestamp: number;
  totalEvents: number;
  criticalEvents: number;
  highEvents: number;
  mediumEvents: number;
  lowEvents: number;
  blockedIPs: number;
  activeThreats: number;
  responseTime: number;
  systemLoad: number;
}

interface AnomalyDetection {
  baseline: Map<string, number>;
  thresholds: Map<string, { min: number; max: number }>;
  anomalies: Array<{ metric: string; value: number; expected: number; severity: SecuritySeverity; timestamp: number }>;
}

type SecurityEventType = 
  | 'BRUTE_FORCE_ATTACK'
  | 'SQL_INJECTION_ATTEMPT'
  | 'XSS_ATTEMPT'
  | 'DDOS_ATTACK'
  | 'UNAUTHORIZED_ACCESS'
  | 'SUSPICIOUS_ACTIVITY'
  | 'MALWARE_DETECTED'
  | 'DATA_BREACH_ATTEMPT'
  | 'PRIVILEGE_ESCALATION'
  | 'ACCOUNT_TAKEOVER'
  | 'API_ABUSE'
  | 'CREDENTIAL_STUFFING'
  | 'SESSION_HIJACKING'
  | 'CSRF_ATTACK'
  | 'CLICKJACKING_ATTEMPT'
  | 'FILE_UPLOAD_ATTACK'
  | 'DIRECTORY_TRAVERSAL'
  | 'COMMAND_INJECTION'
  | 'LDAP_INJECTION'
  | 'XML_INJECTION'
  | 'NOSQL_INJECTION'
  | 'TEMPLATE_INJECTION'
  | 'DESERIALIZATION_ATTACK'
  | 'TIMING_ATTACK'
  | 'SIDE_CHANNEL_ATTACK'
  | 'SOCIAL_ENGINEERING'
  | 'PHISHING_ATTEMPT'
  | 'MALICIOUS_BOT'
  | 'SCRAPING_ATTEMPT'
  | 'RATE_LIMIT_VIOLATION'
  | 'GEOLOCATION_ANOMALY'
  | 'DEVICE_FINGERPRINT_MISMATCH'
  | 'SUSPICIOUS_USER_AGENT'
  | 'TOR_ACCESS'
  | 'VPN_ABUSE'
  | 'PROXY_DETECTION'
  | 'HONEYPOT_TRIGGER'
  | 'CANARY_TOKEN_ACCESS'
  | 'SECURITY_SCANNER_DETECTED'
  | 'VULNERABILITY_PROBE'
  | 'EXPLOIT_ATTEMPT'
  | 'BACKDOOR_ACCESS'
  | 'ROOTKIT_ACTIVITY'
  | 'KEYLOGGER_DETECTED'
  | 'SCREEN_CAPTURE_ATTEMPT'
  | 'CLIPBOARD_HIJACKING'
  | 'DNS_TUNNELING'
  | 'COVERT_CHANNEL'
  | 'STEGANOGRAPHY_DETECTED'
  | 'CRYPTOJACKING'
  | 'RANSOMWARE_ACTIVITY'
  | 'DATA_EXFILTRATION'
  | 'INSIDER_THREAT'
  | 'COMPLIANCE_VIOLATION'
  | 'POLICY_VIOLATION'
  | 'CONFIGURATION_DRIFT'
  | 'SECURITY_MISCONFIGURATION'
  | 'WEAK_AUTHENTICATION'
  | 'EXPIRED_CERTIFICATE'
  | 'INSECURE_PROTOCOL'
  | 'UNENCRYPTED_DATA'
  | 'SENSITIVE_DATA_EXPOSURE'
  | 'PII_LEAK'
  | 'CREDIT_CARD_EXPOSURE'
  | 'PASSWORD_LEAK'
  | 'API_KEY_EXPOSURE'
  | 'TOKEN_LEAK'
  | 'DATABASE_EXPOSURE'
  | 'BACKUP_EXPOSURE'
  | 'LOG_INJECTION'
  | 'LOG_TAMPERING'
  | 'AUDIT_TRAIL_MANIPULATION'
  | 'TIMESTAMP_MANIPULATION'
  | 'INTEGRITY_VIOLATION'
  | 'CHECKSUM_MISMATCH'
  | 'DIGITAL_SIGNATURE_INVALID'
  | 'CERTIFICATE_PINNING_FAILURE'
  | 'SSL_STRIPPING'
  | 'MAN_IN_THE_MIDDLE'
  | 'REPLAY_ATTACK'
  | 'REFLECTION_ATTACK'
  | 'AMPLIFICATION_ATTACK'
  | 'RESOURCE_EXHAUSTION'
  | 'MEMORY_CORRUPTION'
  | 'BUFFER_OVERFLOW'
  | 'INTEGER_OVERFLOW'
  | 'FORMAT_STRING_ATTACK'
  | 'RACE_CONDITION'
  | 'USE_AFTER_FREE'
  | 'DOUBLE_FREE'
  | 'NULL_POINTER_DEREFERENCE'
  | 'STACK_OVERFLOW'
  | 'HEAP_OVERFLOW'
  | 'ROP_CHAIN_DETECTED'
  | 'SHELLCODE_DETECTED'
  | 'POLYMORPHIC_CODE'
  | 'OBFUSCATED_CODE'
  | 'PACKED_EXECUTABLE'
  | 'SUSPICIOUS_PROCESS'
  | 'UNUSUAL_NETWORK_TRAFFIC'
  | 'ANOMALOUS_BEHAVIOR'
  | 'MACHINE_LEARNING_ALERT'
  | 'AI_THREAT_DETECTED'
  | 'ZERO_DAY_EXPLOIT'
  | 'APT_ACTIVITY'
  | 'NATION_STATE_ATTACK'
  | 'CYBER_WARFARE'
  | 'CRITICAL_INFRASTRUCTURE_THREAT'
  | 'SUPPLY_CHAIN_ATTACK'
  | 'THIRD_PARTY_BREACH'
  | 'VENDOR_COMPROMISE'
  | 'CLOUD_MISCONFIGURATION'
  | 'CONTAINER_ESCAPE'
  | 'KUBERNETES_ATTACK'
  | 'SERVERLESS_ABUSE'
  | 'MICROSERVICE_COMPROMISE'
  | 'API_GATEWAY_BYPASS'
  | 'OAUTH_ABUSE'
  | 'JWT_MANIPULATION'
  | 'SAML_ATTACK'
  | 'FEDERATION_ABUSE'
  | 'IDENTITY_THEFT'
  | 'ACCOUNT_ENUMERATION'
  | 'PASSWORD_SPRAYING'
  | 'CREDENTIAL_HARVESTING'
  | 'TOKEN_IMPERSONATION'
  | 'PRIVILEGE_ABUSE'
  | 'LATERAL_MOVEMENT'
  | 'PERSISTENCE_MECHANISM'
  | 'COMMAND_AND_CONTROL'
  | 'EXFILTRATION_CHANNEL'
  | 'COVERT_COMMUNICATION'
  | 'STEALTH_TECHNIQUE'
  | 'EVASION_TECHNIQUE'
  | 'ANTI_FORENSICS'
  | 'EVIDENCE_DESTRUCTION'
  | 'LOG_EVASION'
  | 'SANDBOX_EVASION'
  | 'ANTIVIRUS_EVASION'
  | 'FIREWALL_BYPASS'
  | 'IDS_EVASION'
  | 'WAF_BYPASS'
  | 'CAPTCHA_BYPASS'
  | 'RATE_LIMIT_BYPASS'
  | 'AUTHENTICATION_BYPASS'
  | 'AUTHORIZATION_BYPASS'
  | 'ENCRYPTION_BYPASS'
  | 'SIGNATURE_BYPASS'
  | 'VALIDATION_BYPASS'
  | 'SANITIZATION_BYPASS'
  | 'FILTER_BYPASS'
  | 'BLACKLIST_BYPASS'
  | 'WHITELIST_VIOLATION'
  | 'POLICY_BYPASS'
  | 'COMPLIANCE_BYPASS'
  | 'REGULATORY_VIOLATION'
  | 'GDPR_VIOLATION'
  | 'HIPAA_VIOLATION'
  | 'PCI_DSS_VIOLATION'
  | 'SOX_VIOLATION'
  | 'ISO27001_VIOLATION'
  | 'NIST_VIOLATION'
  | 'CIS_VIOLATION'
  | 'OWASP_VIOLATION'
  | 'CUSTOM_RULE_VIOLATION';

type SecuritySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// Padrões de ameaças conhecidas
const THREAT_PATTERNS: ThreatPattern[] = [
  {
    id: 'brute_force_login',
    name: 'Brute Force Login Attack',
    description: 'Múltiplas tentativas de login falhadas do mesmo IP',
    indicators: [
      { type: 'FREQUENCY', value: 'login_failures > 10', weight: 0.8, description: 'Mais de 10 falhas de login' },
      { type: 'PATTERN', value: 'rapid_succession', weight: 0.6, description: 'Tentativas em rápida sucessão' },
      { type: 'USER_AGENT', value: 'automated_tool', weight: 0.4, description: 'User-Agent de ferramenta automatizada' }
    ],
    severity: 'HIGH',
    confidence: 0.85,
    lastDetected: 0,
    detectionCount: 0,
    active: true
  },
  {
    id: 'sql_injection_attack',
    name: 'SQL Injection Attack',
    description: 'Tentativas de injeção SQL detectadas',
    indicators: [
      { type: 'PATTERN', value: 'sql_keywords', weight: 0.9, description: 'Palavras-chave SQL maliciosas' },
      { type: 'PATTERN', value: 'union_select', weight: 0.95, description: 'Padrão UNION SELECT' },
      { type: 'PATTERN', value: 'comment_injection', weight: 0.7, description: 'Comentários SQL suspeitos' }
    ],
    severity: 'CRITICAL',
    confidence: 0.9,
    lastDetected: 0,
    detectionCount: 0,
    active: true
  },
  {
    id: 'xss_attack',
    name: 'Cross-Site Scripting Attack',
    description: 'Tentativas de XSS detectadas',
    indicators: [
      { type: 'PATTERN', value: 'script_tags', weight: 0.9, description: 'Tags script maliciosas' },
      { type: 'PATTERN', value: 'javascript_protocol', weight: 0.8, description: 'Protocolo JavaScript' },
      { type: 'PATTERN', value: 'event_handlers', weight: 0.7, description: 'Event handlers suspeitos' }
    ],
    severity: 'HIGH',
    confidence: 0.85,
    lastDetected: 0,
    detectionCount: 0,
    active: true
  },
  {
    id: 'ddos_attack',
    name: 'Distributed Denial of Service',
    description: 'Ataque DDoS detectado',
    indicators: [
      { type: 'FREQUENCY', value: 'requests_per_minute > 1000', weight: 0.9, description: 'Alto volume de requisições' },
      { type: 'PATTERN', value: 'distributed_sources', weight: 0.8, description: 'Múltiplas fontes' },
      { type: 'BEHAVIOR', value: 'identical_requests', weight: 0.7, description: 'Requisições idênticas' }
    ],
    severity: 'CRITICAL',
    confidence: 0.9,
    lastDetected: 0,
    detectionCount: 0,
    active: true
  },
  {
    id: 'credential_stuffing',
    name: 'Credential Stuffing Attack',
    description: 'Tentativas de reutilização de credenciais vazadas',
    indicators: [
      { type: 'PATTERN', value: 'known_breached_credentials', weight: 0.95, description: 'Credenciais conhecidas vazadas' },
      { type: 'FREQUENCY', value: 'multiple_accounts', weight: 0.8, description: 'Tentativas em múltiplas contas' },
      { type: 'BEHAVIOR', value: 'automated_pattern', weight: 0.7, description: 'Padrão automatizado' }
    ],
    severity: 'HIGH',
    confidence: 0.88,
    lastDetected: 0,
    detectionCount: 0,
    active: true
  },
  {
    id: 'account_takeover',
    name: 'Account Takeover Attempt',
    description: 'Tentativa de comprometimento de conta',
    indicators: [
      { type: 'GEOLOCATION', value: 'unusual_location', weight: 0.8, description: 'Login de localização incomum' },
      { type: 'DEVICE_FINGERPRINT', value: 'new_device', weight: 0.7, description: 'Dispositivo não reconhecido' },
      { type: 'BEHAVIOR', value: 'unusual_activity', weight: 0.6, description: 'Atividade incomum' }
    ],
    severity: 'HIGH',
    confidence: 0.75,
    lastDetected: 0,
    detectionCount: 0,
    active: true
  },
  {
    id: 'api_abuse',
    name: 'API Abuse',
    description: 'Uso abusivo da API detectado',
    indicators: [
      { type: 'FREQUENCY', value: 'api_calls > threshold', weight: 0.8, description: 'Excesso de chamadas API' },
      { type: 'PATTERN', value: 'scraping_behavior', weight: 0.7, description: 'Comportamento de scraping' },
      { type: 'USER_AGENT', value: 'bot_signature', weight: 0.6, description: 'Assinatura de bot' }
    ],
    severity: 'MEDIUM',
    confidence: 0.8,
    lastDetected: 0,
    detectionCount: 0,
    active: true
  },
  {
    id: 'malicious_bot',
    name: 'Malicious Bot Activity',
    description: 'Atividade de bot malicioso detectada',
    indicators: [
      { type: 'USER_AGENT', value: 'known_bad_bot', weight: 0.9, description: 'Bot conhecido malicioso' },
      { type: 'BEHAVIOR', value: 'non_human_pattern', weight: 0.8, description: 'Padrão não humano' },
      { type: 'FREQUENCY', value: 'rapid_requests', weight: 0.7, description: 'Requisições muito rápidas' }
    ],
    severity: 'MEDIUM',
    confidence: 0.85,
    lastDetected: 0,
    detectionCount: 0,
    active: true
  }
];

// Classe principal de monitoramento
export class SecurityMonitoring {
  private static instance: SecurityMonitoring;
  private events: SecurityEvent[] = [];
  private alerts: SecurityAlert[] = [];
  private metrics: SecurityMetrics[] = [];
  private threatPatterns: ThreatPattern[] = [...THREAT_PATTERNS];
  private anomalyDetection: AnomalyDetection;
  private monitoringInterval: NodeJS.Timeout;
  private alertCallbacks: Array<(alert: SecurityAlert) => void> = [];
  
  private constructor() {
    this.anomalyDetection = {
      baseline: new Map(),
      thresholds: new Map(),
      anomalies: []
    };
    
    this.initializeMonitoring();
  }
  
  static getInstance(): SecurityMonitoring {
    if (!SecurityMonitoring.instance) {
      SecurityMonitoring.instance = new SecurityMonitoring();
    }
    return SecurityMonitoring.instance;
  }
  
  /**
   * Registra um evento de segurança
   */
  async recordEvent(
    type: SecurityEventType,
    severity: SecuritySeverity,
    description: string,
    metadata: Record<string, any> = {},
    source: string = 'system'
  ): Promise<string> {
    const eventId = await generateSecureToken(16);
    
    const event: SecurityEvent = {
      id: eventId,
      type,
      severity,
      timestamp: Date.now(),
      source,
      description,
      metadata,
      resolved: false
    };
    
    this.events.push(event);
    
    // Manter apenas os últimos 10000 eventos
    if (this.events.length > 10000) {
      this.events = this.events.slice(-10000);
    }
    
    // Logar evento
    await securityLogger.logEvent(
      'SECURITY_EVENT',
      severity,
      `Evento de segurança: ${type} - ${description}`,
      { eventId, type, source, ...metadata }
    );
    
    // Analisar padrões de ameaças
    await this.analyzeThreats(event);
    
    // Detectar anomalias
    await this.detectAnomalies(event);
    
    // Verificar se deve gerar alerta
    await this.checkForAlerts(event);
    
    return eventId;
  }
  
  /**
   * Cria um alerta de segurança
   */
  async createAlert(
    title: string,
    description: string,
    severity: SecuritySeverity,
    events: SecurityEvent[],
    autoActions: SecurityAction[] = []
  ): Promise<string> {
    const alertId = await generateSecureToken(16);
    
    const alert: SecurityAlert = {
      id: alertId,
      title,
      description,
      severity,
      timestamp: Date.now(),
      events,
      acknowledged: false,
      actions: autoActions
    };
    
    this.alerts.push(alert);
    
    // Executar ações automáticas
    for (const action of autoActions) {
      await this.executeAction(action, alert);
    }
    
    // Notificar callbacks
    this.alertCallbacks.forEach(callback => {
      try {
        callback(alert);
      } catch (error) {
        console.error('Erro ao executar callback de alerta:', error);
      }
    });
    
    await securityLogger.logEvent(
      'SECURITY_ALERT',
      severity,
      `Alerta de segurança criado: ${title}`,
      { alertId, title, description, eventCount: events.length }
    );
    
    return alertId;
  }
  
  /**
   * Reconhece um alerta
   */
  async acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<boolean> {
    const alert = this.alerts.find(a => a.id === alertId);
    
    if (!alert) return false;
    
    alert.acknowledged = true;
    alert.acknowledgedBy = acknowledgedBy;
    alert.acknowledgedAt = Date.now();
    
    await securityLogger.logEvent(
      'ALERT_ACKNOWLEDGED',
      'LOW',
      'Alerta reconhecido',
      { alertId, acknowledgedBy }
    );
    
    return true;
  }
  
  /**
   * Resolve um evento de segurança
   */
  async resolveEvent(eventId: string, resolvedBy: string): Promise<boolean> {
    const event = this.events.find(e => e.id === eventId);
    
    if (!event) return false;
    
    event.resolved = true;
    event.resolvedAt = Date.now();
    event.resolvedBy = resolvedBy;
    
    await securityLogger.logEvent(
      'EVENT_RESOLVED',
      'LOW',
      'Evento de segurança resolvido',
      { eventId, resolvedBy }
    );
    
    return true;
  }
  
  /**
   * Adiciona padrão de ameaça personalizado
   */
  addThreatPattern(pattern: Omit<ThreatPattern, 'id' | 'lastDetected' | 'detectionCount'>): void {
    const threatPattern: ThreatPattern = {
      ...pattern,
      id: `custom_${Date.now()}`,
      lastDetected: 0,
      detectionCount: 0
    };
    
    this.threatPatterns.push(threatPattern);
  }
  
  /**
   * Registra callback para alertas
   */
  onAlert(callback: (alert: SecurityAlert) => void): void {
    this.alertCallbacks.push(callback);
  }
  
  /**
   * Obtém estatísticas de segurança
   */
  getSecurityStatistics(): {
    totalEvents: number;
    eventsBySeverity: Record<SecuritySeverity, number>;
    eventsByType: Record<string, number>;
    activeAlerts: number;
    resolvedEvents: number;
    topThreats: Array<{ type: SecurityEventType; count: number }>;
    recentMetrics: SecurityMetrics[];
    anomalies: number;
    threatPatternsDetected: number;
  } {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    
    const recentEvents = this.events.filter(e => e.timestamp > oneDayAgo);
    
    const eventsBySeverity: Record<SecuritySeverity, number> = {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
      CRITICAL: 0
    };
    
    const eventsByType: Record<string, number> = {};
    
    recentEvents.forEach(event => {
      eventsBySeverity[event.severity]++;
      eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
    });
    
    const topThreats = Object.entries(eventsByType)
      .map(([type, count]) => ({ type: type as SecurityEventType, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    const activeAlerts = this.alerts.filter(a => !a.acknowledged).length;
    const resolvedEvents = this.events.filter(e => e.resolved).length;
    const recentMetrics = this.metrics.slice(-24); // Últimas 24 horas
    const recentAnomalies = this.anomalyDetection.anomalies.filter(a => a.timestamp > oneDayAgo);
    const activeThreatPatterns = this.threatPatterns.filter(p => p.active && p.detectionCount > 0);
    
    return {
      totalEvents: recentEvents.length,
      eventsBySeverity,
      eventsByType,
      activeAlerts,
      resolvedEvents,
      topThreats,
      recentMetrics,
      anomalies: recentAnomalies.length,
      threatPatternsDetected: activeThreatPatterns.length
    };
  }
  
  /**
   * Obtém alertas ativos
   */
  getActiveAlerts(): SecurityAlert[] {
    return this.alerts.filter(a => !a.acknowledged);
  }
  
  /**
   * Obtém eventos recentes
   */
  getRecentEvents(limit: number = 100): SecurityEvent[] {
    return this.events
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }
  
  /**
   * Obtém métricas em tempo real
   */
  getRealTimeMetrics(): SecurityMetrics {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);
    
    const recentEvents = this.events.filter(e => e.timestamp > oneHourAgo);
    
    const criticalEvents = recentEvents.filter(e => e.severity === 'CRITICAL').length;
    const highEvents = recentEvents.filter(e => e.severity === 'HIGH').length;
    const mediumEvents = recentEvents.filter(e => e.severity === 'MEDIUM').length;
    const lowEvents = recentEvents.filter(e => e.severity === 'LOW').length;
    
    const ddosStats = ddosProtection.getStatistics();
    const authStats = secureAuth.getAuthStatistics();
    
    return {
      timestamp: now,
      totalEvents: recentEvents.length,
      criticalEvents,
      highEvents,
      mediumEvents,
      lowEvents,
      blockedIPs: ddosStats.blockedIPs,
      activeThreats: this.threatPatterns.filter(p => p.active && p.detectionCount > 0).length,
      responseTime: this.calculateAverageResponseTime(),
      systemLoad: this.calculateSystemLoad()
    };
  }
  
  // Métodos privados
  private async analyzeThreats(event: SecurityEvent): Promise<void> {
    for (const pattern of this.threatPatterns) {
      if (!pattern.active) continue;
      
      let matchScore = 0;
      let totalWeight = 0;
      
      for (const indicator of pattern.indicators) {
        totalWeight += indicator.weight;
        
        if (this.matchesIndicator(event, indicator)) {
          matchScore += indicator.weight;
        }
      }
      
      const confidence = matchScore / totalWeight;
      
      if (confidence >= pattern.confidence) {
        pattern.lastDetected = Date.now();
        pattern.detectionCount++;
        
        await this.recordEvent(
          'THREAT_PATTERN_DETECTED' as SecurityEventType,
          pattern.severity,
          `Padrão de ameaça detectado: ${pattern.name}`,
          {
            patternId: pattern.id,
            patternName: pattern.name,
            confidence,
            originalEvent: event.id
          },
          'threat_analyzer'
        );
      }
    }
  }
  
  private matchesIndicator(event: SecurityEvent, indicator: ThreatIndicator): boolean {
    switch (indicator.type) {
      case 'PATTERN':
        return this.matchesPattern(event, indicator.value);
      case 'FREQUENCY':
        return this.matchesFrequency(event, indicator.value);
      case 'IP':
        return event.metadata.ip === indicator.value;
      case 'USER_AGENT':
        return this.matchesUserAgent(event, indicator.value);
      case 'GEOLOCATION':
        return this.matchesGeolocation(event, indicator.value);
      case 'BEHAVIOR':
        return this.matchesBehavior(event, indicator.value);
      default:
        return false;
    }
  }
  
  private matchesPattern(event: SecurityEvent, pattern: string): boolean {
    const eventData = JSON.stringify(event).toLowerCase();
    
    switch (pattern) {
      case 'sql_keywords':
        return /\b(union|select|insert|update|delete|drop|create|alter)\b/i.test(eventData);
      case 'script_tags':
        return /<script[^>]*>/i.test(eventData);
      case 'rapid_succession':
        return this.isRapidSuccession(event);
      default:
        return eventData.includes(pattern.toLowerCase());
    }
  }
  
  private matchesFrequency(event: SecurityEvent, condition: string): boolean {
    // Implementação simplificada
    const [metric, operator, threshold] = condition.split(' ');
    const value = this.getMetricValue(event, metric);
    const thresholdNum = parseInt(threshold);
    
    switch (operator) {
      case '>':
        return value > thresholdNum;
      case '<':
        return value < thresholdNum;
      case '=':
        return value === thresholdNum;
      default:
        return false;
    }
  }
  
  private matchesUserAgent(event: SecurityEvent, pattern: string): boolean {
    const userAgent = event.metadata.userAgent?.toLowerCase() || '';
    
    switch (pattern) {
      case 'automated_tool':
        return /bot|crawler|spider|scraper|curl|wget|python|java/i.test(userAgent);
      case 'known_bad_bot':
        return /malicious|attack|hack|exploit/i.test(userAgent);
      default:
        return userAgent.includes(pattern.toLowerCase());
    }
  }
  
  private matchesGeolocation(event: SecurityEvent, pattern: string): boolean {
    // Implementação simplificada
    return pattern === 'unusual_location' && event.metadata.unusualLocation === true;
  }
  
  private matchesBehavior(event: SecurityEvent, pattern: string): boolean {
    switch (pattern) {
      case 'non_human_pattern':
        return event.metadata.isBot === true;
      case 'unusual_activity':
        return event.metadata.unusualActivity === true;
      case 'automated_pattern':
        return event.metadata.automated === true;
      default:
        return false;
    }
  }
  
  private isRapidSuccession(event: SecurityEvent): boolean {
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
    const recentSimilarEvents = this.events.filter(e => 
      e.type === event.type &&
      e.timestamp > fiveMinutesAgo &&
      e.metadata.ip === event.metadata.ip
    );
    
    return recentSimilarEvents.length > 5;
  }
  
  private getMetricValue(event: SecurityEvent, metric: string): number {
    switch (metric) {
      case 'login_failures':
        return this.countRecentLoginFailures(event.metadata.ip);
      case 'requests_per_minute':
        return this.countRequestsPerMinute(event.metadata.ip);
      case 'api_calls':
        return this.countApiCalls(event.metadata.ip);
      default:
        return 0;
    }
  }
  
  private countRecentLoginFailures(ip: string): number {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    return this.events.filter(e => 
      e.type === 'BRUTE_FORCE_ATTACK' &&
      e.metadata.ip === ip &&
      e.timestamp > oneHourAgo
    ).length;
  }
  
  private countRequestsPerMinute(ip: string): number {
    const oneMinuteAgo = Date.now() - (60 * 1000);
    return this.events.filter(e => 
      e.metadata.ip === ip &&
      e.timestamp > oneMinuteAgo
    ).length;
  }
  
  private countApiCalls(ip: string): number {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    return this.events.filter(e => 
      e.type === 'API_ABUSE' &&
      e.metadata.ip === ip &&
      e.timestamp > oneHourAgo
    ).length;
  }
  
  private async detectAnomalies(event: SecurityEvent): Promise<void> {
    // Implementação simplificada de detecção de anomalias
    const metric = event.type;
    const value = 1; // Contagem de eventos
    
    // Atualizar baseline
    const currentBaseline = this.anomalyDetection.baseline.get(metric) || 0;
    const newBaseline = (currentBaseline * 0.9) + (value * 0.1); // Média móvel
    this.anomalyDetection.baseline.set(metric, newBaseline);
    
    // Verificar se é anomalia
    const threshold = this.anomalyDetection.thresholds.get(metric) || { min: 0, max: newBaseline * 3 };
    
    if (value > threshold.max) {
      this.anomalyDetection.anomalies.push({
        metric,
        value,
        expected: newBaseline,
        severity: value > threshold.max * 2 ? 'HIGH' : 'MEDIUM',
        timestamp: Date.now()
      });
      
      await this.recordEvent(
        'ANOMALOUS_BEHAVIOR',
        value > threshold.max * 2 ? 'HIGH' : 'MEDIUM',
        `Anomalia detectada em ${metric}`,
        { metric, value, expected: newBaseline, threshold },
        'anomaly_detector'
      );
    }
  }
  
  private async checkForAlerts(event: SecurityEvent): Promise<void> {
    // Verificar se deve criar alerta baseado na severidade e tipo
    if (event.severity === 'CRITICAL') {
      await this.createAlert(
        `Evento Crítico: ${event.type}`,
        event.description,
        'CRITICAL',
        [event],
        [
          {
            id: await generateSecureToken(8),
            type: 'NOTIFY_ADMIN',
            description: 'Notificar administradores',
            executed: false
          }
        ]
      );
    }
    
    // Verificar padrões que requerem alertas
    const recentSimilarEvents = this.events.filter(e => 
      e.type === event.type &&
      e.timestamp > Date.now() - (60 * 60 * 1000) // Última hora
    );
    
    if (recentSimilarEvents.length >= 5) {
      await this.createAlert(
        `Múltiplos eventos: ${event.type}`,
        `${recentSimilarEvents.length} eventos do tipo ${event.type} na última hora`,
        'HIGH',
        recentSimilarEvents.slice(-5),
        [
          {
            id: await generateSecureToken(8),
            type: 'RATE_LIMIT',
            description: 'Aplicar rate limiting',
            executed: false
          }
        ]
      );
    }
  }
  
  private async executeAction(action: SecurityAction, alert: SecurityAlert): Promise<void> {
    try {
      switch (action.type) {
        case 'BLOCK_IP':
          // Implementar bloqueio de IP
          action.result = 'IP bloqueado com sucesso';
          break;
          
        case 'RATE_LIMIT':
          // Implementar rate limiting
          action.result = 'Rate limiting aplicado';
          break;
          
        case 'NOTIFY_ADMIN':
          // Notificar administradores
          console.log(`🚨 ALERTA DE SEGURANÇA: ${alert.title}`);
          action.result = 'Administradores notificados';
          break;
          
        case 'AUTO_REMEDIATE':
          // Implementar remediação automática
          action.result = 'Remediação automática executada';
          break;
          
        default:
          action.result = 'Ação não implementada';
      }
      
      action.executed = true;
      action.executedAt = Date.now();
      
    } catch (error) {
      action.result = `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`;
      action.executed = false;
    }
  }
  
  private calculateAverageResponseTime(): number {
    // Implementação simplificada
    return Math.random() * 100 + 50; // 50-150ms
  }
  
  private calculateSystemLoad(): number {
    // Implementação simplificada
    return Math.random() * 100; // 0-100%
  }
  
  private initializeMonitoring(): void {
    // Coletar métricas a cada minuto
    this.monitoringInterval = setInterval(() => {
      const metrics = this.getRealTimeMetrics();
      this.metrics.push(metrics);
      
      // Manter apenas últimas 24 horas de métricas
      if (this.metrics.length > 24 * 60) {
        this.metrics = this.metrics.slice(-24 * 60);
      }
    }, 60 * 1000);
    
    // Limpeza periódica
    setInterval(() => {
      this.performCleanup();
    }, 60 * 60 * 1000); // A cada hora
  }
  
  private performCleanup(): void {
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    // Limpar eventos antigos (manter apenas 1 dia)
    this.events = this.events.filter(e => e.timestamp > oneDayAgo);
    
    // Limpar alertas antigos reconhecidos (manter 1 semana)
    this.alerts = this.alerts.filter(a => 
      !a.acknowledged || a.timestamp > oneWeekAgo
    );
    
    // Limpar anomalias antigas
    this.anomalyDetection.anomalies = this.anomalyDetection.anomalies
      .filter(a => a.timestamp > oneDayAgo);
  }
  
  /**
   * Destrói a instância e limpa recursos
   */
  destroy(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    
    this.events = [];
    this.alerts = [];
    this.metrics = [];
    this.alertCallbacks = [];
  }
}

// Instância singleton
export const securityMonitoring = SecurityMonitoring.getInstance();

// Hook para React
export const useSecurityMonitoring = () => {
  const recordEvent = async (
    type: SecurityEventType,
    severity: SecuritySeverity,
    description: string,
    metadata?: Record<string, any>
  ) => {
    return await securityMonitoring.recordEvent(type, severity, description, metadata, 'client');
  };
  
  const getStatistics = () => {
    return securityMonitoring.getSecurityStatistics();
  };
  
  const getActiveAlerts = () => {
    return securityMonitoring.getActiveAlerts();
  };
  
  const getRecentEvents = (limit?: number) => {
    return securityMonitoring.getRecentEvents(limit);
  };
  
  const getRealTimeMetrics = () => {
    return securityMonitoring.getRealTimeMetrics();
  };
  
  const acknowledgeAlert = async (alertId: string, acknowledgedBy: string) => {
    return await securityMonitoring.acknowledgeAlert(alertId, acknowledgedBy);
  };
  
  const onAlert = (callback: (alert: SecurityAlert) => void) => {
    securityMonitoring.onAlert(callback);
  };
  
  return {
    recordEvent,
    getStatistics,
    getActiveAlerts,
    getRecentEvents,
    getRealTimeMetrics,
    acknowledgeAlert,
    onAlert
  };
};

console.log('📊 Sistema de monitoramento de segurança inicializado');

// Exportar para uso global
(window as any).__securityMonitoring = securityMonitoring;

// Exportar tipos para uso externo
export type {
  SecurityEvent,
  SecurityAlert,
  SecurityMetrics,
  ThreatPattern,
  SecurityEventType,
  SecuritySeverity
};