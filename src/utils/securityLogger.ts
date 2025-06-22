/**
 * Sistema de auditoria e logging de segurança
 * Monitora e registra atividades de segurança
 */

import { ENV_CONFIG, isDevelopment, isProduction } from '../config/environment';
import { hash, token } from './encryption';

// Tipos para eventos de segurança
type SecurityEventType =
  | 'LOGIN_ATTEMPT'
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'LOGOUT'
  | 'PASSWORD_CHANGE'
  | 'ACCOUNT_LOCKED'
  | 'SUSPICIOUS_ACTIVITY'
  | 'XSS_ATTEMPT'
  | 'CSRF_ATTEMPT'
  | 'SQL_INJECTION_ATTEMPT'
  | 'RATE_LIMIT_EXCEEDED'
  | 'UNAUTHORIZED_ACCESS'
  | 'FILE_UPLOAD'
  | 'DATA_EXPORT'
  | 'PERMISSION_CHANGE'
  | 'SYSTEM_ERROR'
  | 'SECURITY_SCAN'
  | 'IP_BLOCKED'
  | 'SESSION_EXPIRED'
  | 'INVALID_TOKEN'
  | 'FIREWALL_ERROR'
  | 'FIREWALL_RULE_ADDED'
  | 'FIREWALL_RULE_REMOVED'
  | 'IP_BLOCKED_MANUALLY'
  | 'IP_UNBLOCKED'
  | 'IP_ALLOWED'
  | 'EMERGENCY_MODE_ENABLED'
  | 'EMERGENCY_MODE_DISABLED'
  | 'BOT_CHALLENGE_CREATED'
  | 'BOT_CHALLENGE_SOLVED'
  | 'BOT_CHALLENGE_FAILED'
  | 'BOT_ALLOWED'
  | 'BOT_BLOCKED'
  | 'BOT_DETECTION'
  | 'BRUTE_FORCE_RULE_ADDED'
  | 'BRUTE_FORCE_RULE_REMOVED'
  | 'BRUTE_FORCE_IP_BLOCKED'
  | 'BRUTE_FORCE_IP_UNBLOCKED'
  | 'BRUTE_FORCE_BYPASS_TOKEN'
  | 'BRUTE_FORCE_BLOCK_APPLIED'
  | 'SESSION_ANOMALY_DETECTED'
  | 'SESSION_ALERT_GENERATED'
  | 'BRUTE_FORCE_ALERT_GENERATED'
  | 'BRUTE_FORCE_PATTERN_BLOCK'
  | 'BRUTE_FORCE_PATTERN_ALERT'
  | 'BRUTE_FORCE_HONEYPOT_ACCESS'
  | 'BACKUP_STARTED'
  | 'BACKUP_COMPLETED'
  | 'BACKUP_FAILED'
  | 'BACKUP_SKIPPED'
  | 'INCREMENTAL_BACKUP_COMPLETED'
  | 'INCREMENTAL_BACKUP_FAILED'
  | 'RESTORE_STARTED'
  | 'RESTORE_DRY_RUN'
  | 'RESTORE_COMPLETED'
  | 'RESTORE_FAILED'
  | 'RESTORE_POINT_CREATED'
  | 'RESTORE_POINT_FAILED'
  | 'BACKUP_CORRUPTION_DETECTED'
  | 'BACKUP_SIGNATURE_INVALID'
  | 'BACKUP_DECRYPTION_FAILED'
  | 'BACKUP_VERIFICATION_ERROR'
  | 'BACKUP_CLEANUP'
  | 'DISASTER_RECOVERY_STARTED'
  | 'DISASTER_RECOVERY_COMPLETED'
  | 'DISASTER_RECOVERY_FAILED'
  | 'RECOVERY_STEP_STARTED'
  | 'RECOVERY_STEP_COMPLETED'
  | 'RECOVERY_STEP_FAILED'
  | 'PHISHING_ANALYSIS'
  | 'PHISHING_ANALYSIS_ERROR'
  | 'DOMAIN_BLOCKED'
  | 'DOMAIN_UNBLOCKED'
  | 'DOMAIN_ALLOWED'
  | 'DOMAIN_DISALLOWED'
  | 'PHISHING_REPORTED'
  | 'THREAT_DETECTED'
  | 'ATTACK_PATTERN_DETECTED'
  | 'GEO_BLOCKED'
  | 'ASN_BLOCKED'
  | 'HIGH_RISK_IP'
  | 'FIREWALL_RULE_MATCHED'
  | 'SECURITY_POLICY_BLOCKED'
  | 'REQUEST_TOO_LARGE'
  | 'MALWARE_SCAN'
  | 'MALWARE_SCAN_ERROR'
  | 'MALWARE_TEXT_SCAN'
  | 'MALWARE_SIGNATURE_ADDED'
  | 'FILE_REMOVED_FROM_QUARANTINE'
  | 'FILE_QUARANTINED'
  | 'SESSION_CREATED'
  | 'SESSION_VALIDATION_ERROR'
  | 'SESSION_REGENERATED'
  | 'SESSION_INVALIDATED'
  | 'USER_SESSIONS_INVALIDATED'
  | 'SECURITY_EVENT'
  | 'SECURITY_ALERT'
  | 'ALERT_ACKNOWLEDGED'
  | 'EVENT_RESOLVED'
  | 'REGISTRATION_ATTEMPT'
  | 'USER_REGISTERED'
  | 'REGISTRATION_ERROR'
  | 'USER_LOGIN'
  | 'LOGIN_ERROR'
  | 'TWO_FACTOR_ENABLED'
  | 'USER_LOGOUT'
  | 'PASSWORD_CHANGED'
  | 'PHISHING_ALERT_GENERATED'
  | 'THREAT_INTELLIGENCE_UPDATED';

type SecurityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

interface SecurityEvent {
  id: string;
  timestamp: number;
  type: SecurityEventType;
  level: SecurityLevel;
  message: string;
  details: Record<string, any>;
  userAgent?: string;
  ip?: string;
  userId?: string;
  sessionId?: string;
  fingerprint?: string;
  location?: {
    country?: string;
    city?: string;
    timezone?: string;
  };
}

interface SecurityMetrics {
  totalEvents: number;
  eventsByType: Record<SecurityEventType, number>;
  eventsByLevel: Record<SecurityLevel, number>;
  suspiciousIPs: Set<string>;
  blockedIPs: Set<string>;
  failedLoginAttempts: Map<string, number>;
  rateLimitViolations: Map<string, number>;
  lastCleanup: number;
}

// Classe principal do logger de segurança
export class SecurityLogger {
  private static instance: SecurityLogger;
  private events: SecurityEvent[] = [];
  private metrics: SecurityMetrics;
  private maxEvents = 10000;
  private cleanupInterval = 24 * 60 * 60 * 1000; // 24 horas
  private alertThresholds = {
    failedLogins: 5,
    rateLimitViolations: 10,
    suspiciousActivities: 3
  };

  private constructor() {
    this.metrics = {
      totalEvents: 0,
      eventsByType: {} as Record<SecurityEventType, number>,
      eventsByLevel: {} as Record<SecurityLevel, number>,
      suspiciousIPs: new Set(),
      blockedIPs: new Set(),
      failedLoginAttempts: new Map(),
      rateLimitViolations: new Map(),
      lastCleanup: Date.now()
    };
    
    this.initializeMetrics();
    this.startPeriodicCleanup();
    this.loadPersistedData();
  }

  static getInstance(): SecurityLogger {
    if (!SecurityLogger.instance) {
      SecurityLogger.instance = new SecurityLogger();
    }
    return SecurityLogger.instance;
  }

  /**
   * Registra um evento de segurança
   */
  async logEvent(
    type: SecurityEventType,
    level: SecurityLevel,
    message: string,
    details: Record<string, any> = {},
    context?: {
      userId?: string;
      sessionId?: string;
      ip?: string;
    }
  ): Promise<void> {
    try {
      const event: SecurityEvent = {
        id: token.generateUUID(),
        timestamp: Date.now(),
        type,
        level,
        message,
        details: this.sanitizeDetails(details),
        userAgent: navigator.userAgent,
        ip: context?.ip || await this.getClientIP(),
        userId: context?.userId,
        sessionId: context?.sessionId,
        fingerprint: await this.generateFingerprint(),
        location: await this.getLocationInfo()
      };

      this.events.push(event);
      this.updateMetrics(event);
      this.checkAlerts(event);
      
      // Persistir eventos críticos
      if (level === 'CRITICAL' || level === 'HIGH') {
        await this.persistEvent(event);
      }
      
      // Log no console em desenvolvimento
      if (isDevelopment()) {
        this.logToConsole(event);
      }
      
      // Enviar para servidor em produção
      if (isProduction()) {
        await this.sendToServer(event);
      }
      
      // Limpar eventos antigos se necessário
      this.cleanupOldEvents();
      
    } catch (error) {
      console.error('Erro ao registrar evento de segurança:', error);
    }
  }

  /**
   * Registra tentativa de login
   */
  async logLoginAttempt(success: boolean, userId?: string, ip?: string): Promise<void> {
    const type = success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILURE';
    const level = success ? 'LOW' : 'MEDIUM';
    const message = success ? 'Login realizado com sucesso' : 'Tentativa de login falhada';
    
    if (!success && ip) {
      const attempts = this.metrics.failedLoginAttempts.get(ip) || 0;
      this.metrics.failedLoginAttempts.set(ip, attempts + 1);
      
      if (attempts + 1 >= this.alertThresholds.failedLogins) {
        await this.logEvent('SUSPICIOUS_ACTIVITY', 'HIGH', 
          `Múltiplas tentativas de login falhadas do IP ${ip}`, 
          { attempts: attempts + 1, ip }
        );
      }
    }
    
    await this.logEvent(type, level, message, { userId, ip });
  }

  /**
   * Registra atividade suspeita
   */
  async logSuspiciousActivity(
    description: string,
    details: Record<string, any> = {},
    level: SecurityLevel = 'HIGH'
  ): Promise<void> {
    await this.logEvent('SUSPICIOUS_ACTIVITY', level, description, details);
    
    const ip = details.ip || await this.getClientIP();
    if (ip) {
      this.metrics.suspiciousIPs.add(ip);
    }
  }

  /**
   * Registra violação de rate limit
   */
  async logRateLimitViolation(ip: string, endpoint: string): Promise<void> {
    const violations = this.metrics.rateLimitViolations.get(ip) || 0;
    this.metrics.rateLimitViolations.set(ip, violations + 1);
    
    await this.logEvent('RATE_LIMIT_EXCEEDED', 'MEDIUM', 
      `Rate limit excedido para ${endpoint}`, 
      { ip, endpoint, violations: violations + 1 }
    );
  }

  /**
   * Registra tentativa de ataque
   */
  async logAttackAttempt(
    attackType: 'XSS' | 'CSRF' | 'SQL_INJECTION',
    payload: string,
    source: string
  ): Promise<void> {
    const typeMap = {
      XSS: 'XSS_ATTEMPT',
      CSRF: 'CSRF_ATTEMPT',
      SQL_INJECTION: 'SQL_INJECTION_ATTEMPT'
    } as const;
    
    await this.logEvent(
      typeMap[attackType],
      'CRITICAL',
      `Tentativa de ataque ${attackType} detectada`,
      { payload: this.sanitizePayload(payload), source }
    );
  }

  /**
   * Obtém métricas de segurança
   */
  getMetrics(): SecurityMetrics {
    return {
      ...this.metrics,
      suspiciousIPs: new Set(this.metrics.suspiciousIPs),
      blockedIPs: new Set(this.metrics.blockedIPs),
      failedLoginAttempts: new Map(this.metrics.failedLoginAttempts),
      rateLimitViolations: new Map(this.metrics.rateLimitViolations)
    };
  }

  /**
   * Obtém eventos recentes
   */
  getRecentEvents(limit: number = 100, level?: SecurityLevel): SecurityEvent[] {
    let filteredEvents = this.events;
    
    if (level) {
      filteredEvents = this.events.filter(event => event.level === level);
    }
    
    return filteredEvents
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  /**
   * Gera relatório de segurança
   */
  generateSecurityReport(): {
    summary: Record<string, number>;
    topThreats: Array<{ type: string; count: number }>;
    suspiciousIPs: string[];
    recommendations: string[];
  } {
    const summary = {
      totalEvents: this.metrics.totalEvents,
      criticalEvents: this.metrics.eventsByLevel.CRITICAL || 0,
      highEvents: this.metrics.eventsByLevel.HIGH || 0,
      suspiciousIPs: this.metrics.suspiciousIPs.size,
      blockedIPs: this.metrics.blockedIPs.size
    };
    
    const topThreats = Object.entries(this.metrics.eventsByType)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));
    
    const recommendations = this.generateRecommendations();
    
    return {
      summary,
      topThreats,
      suspiciousIPs: Array.from(this.metrics.suspiciousIPs),
      recommendations
    };
  }

  /**
   * Limpa dados antigos
   */
  cleanup(): void {
    const now = Date.now();
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
    
    // Remover eventos antigos
    this.events = this.events.filter(event => event.timestamp > oneWeekAgo);
    
    // Limpar métricas antigas
    this.metrics.failedLoginAttempts.forEach((attempts, ip) => {
      if (attempts === 0) {
        this.metrics.failedLoginAttempts.delete(ip);
      }
    });
    
    this.metrics.lastCleanup = now;
  }

  // Métodos privados
  private initializeMetrics(): void {
    const eventTypes: SecurityEventType[] = [
      'LOGIN_ATTEMPT', 'LOGIN_SUCCESS', 'LOGIN_FAILURE', 'LOGOUT',
      'PASSWORD_CHANGE', 'ACCOUNT_LOCKED', 'SUSPICIOUS_ACTIVITY',
      'XSS_ATTEMPT', 'CSRF_ATTEMPT', 'SQL_INJECTION_ATTEMPT',
      'RATE_LIMIT_EXCEEDED', 'UNAUTHORIZED_ACCESS', 'FILE_UPLOAD',
      'DATA_EXPORT', 'PERMISSION_CHANGE', 'SYSTEM_ERROR',
      'SECURITY_SCAN', 'IP_BLOCKED', 'SESSION_EXPIRED', 'INVALID_TOKEN'
    ];
    
    const levels: SecurityLevel[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    
    eventTypes.forEach(type => {
      this.metrics.eventsByType[type] = 0;
    });
    
    levels.forEach(level => {
      this.metrics.eventsByLevel[level] = 0;
    });
  }

  private updateMetrics(event: SecurityEvent): void {
    this.metrics.totalEvents++;
    this.metrics.eventsByType[event.type]++;
    this.metrics.eventsByLevel[event.level]++;
  }

  private checkAlerts(event: SecurityEvent): void {
    if (event.level === 'CRITICAL') {
      this.triggerAlert('CRITICAL', `Evento crítico detectado: ${event.message}`, event);
    }
    
    if (event.type === 'SUSPICIOUS_ACTIVITY') {
      const recentSuspicious = this.events.filter(
        e => e.type === 'SUSPICIOUS_ACTIVITY' && 
        e.timestamp > Date.now() - (60 * 60 * 1000) // última hora
      ).length;
      
      if (recentSuspicious >= this.alertThresholds.suspiciousActivities) {
        this.triggerAlert('HIGH', 'Múltiplas atividades suspeitas detectadas', event);
      }
    }
  }

  private triggerAlert(level: SecurityLevel, message: string, event: SecurityEvent): void {
    console.warn(`🚨 ALERTA DE SEGURANÇA [${level}]: ${message}`, event);
    
    // Em produção, enviar alerta para sistema de monitoramento
    if (isProduction()) {
      // Implementar integração com sistema de alertas
    }
  }

  private sanitizeDetails(details: Record<string, any>): Record<string, any> {
    const sanitized = { ...details };
    
    // Remover informações sensíveis
    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'authorization'];
    
    Object.keys(sanitized).forEach(key => {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      }
    });
    
    return sanitized;
  }

  private sanitizePayload(payload: string): string {
    // Limitar tamanho do payload e remover caracteres perigosos
    return payload.substring(0, 500).replace(/[<>"'&]/g, '*');
  }

  private async getClientIP(): Promise<string> {
    try {
      // Em um ambiente real, isso seria obtido do servidor
      return 'unknown';
    } catch {
      return 'unknown';
    }
  }

  private async generateFingerprint(): Promise<string> {
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset().toString()
    ];
    
    return await hash.sha256(components.join('|'));
  }

  private async getLocationInfo(): Promise<SecurityEvent['location']> {
    try {
      // Em um ambiente real, isso seria obtido de um serviço de geolocalização
      return {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    } catch {
      return {};
    }
  }

  private logToConsole(event: SecurityEvent): void {
    const emoji = {
      LOW: '🔵',
      MEDIUM: '🟡',
      HIGH: '🟠',
      CRITICAL: '🔴'
    };
    
    console.log(
      `${emoji[event.level]} [${event.type}] ${event.message}`,
      {
        timestamp: new Date(event.timestamp).toISOString(),
        details: event.details
      }
    );
  }

  private async persistEvent(event: SecurityEvent): Promise<void> {
    try {
      const key = `security_event_${event.id}`;
      localStorage.setItem(key, JSON.stringify(event));
    } catch (error) {
      console.error('Erro ao persistir evento:', error);
    }
  }

  private async sendToServer(event: SecurityEvent): Promise<void> {
    try {
      // Em produção, enviar para endpoint de logging
      // await fetch('/api/security/log', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // });
    } catch (error) {
      console.error('Erro ao enviar evento para servidor:', error);
    }
  }

  private loadPersistedData(): void {
    try {
      // Carregar eventos persistidos
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('security_event_')) {
          try {
            const event = JSON.parse(localStorage.getItem(key) || '');
            if (event && Date.now() - event.timestamp < 7 * 24 * 60 * 60 * 1000) {
              this.events.push(event);
              this.updateMetrics(event);
            } else {
              localStorage.removeItem(key);
            }
          } catch {
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.error('Erro ao carregar dados persistidos:', error);
    }
  }

  private cleanupOldEvents(): void {
    if (this.events.length > this.maxEvents) {
      this.events = this.events
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, this.maxEvents);
    }
  }

  private startPeriodicCleanup(): void {
    setInterval(() => {
      this.cleanup();
    }, this.cleanupInterval);
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.metrics.suspiciousIPs.size > 10) {
      recommendations.push('Considere implementar bloqueio automático de IPs suspeitos');
    }
    
    if (this.metrics.eventsByType.LOGIN_FAILURE > 100) {
      recommendations.push('Implemente CAPTCHA após múltiplas tentativas de login');
    }
    
    if (this.metrics.eventsByLevel.CRITICAL > 0) {
      recommendations.push('Revise imediatamente os eventos críticos');
    }
    
    return recommendations;
  }
}

// Instância singleton
export const securityLogger = SecurityLogger.getInstance();

// Funções de conveniência
export const logSecurityEvent = securityLogger.logEvent.bind(securityLogger);
export const logLoginAttempt = securityLogger.logLoginAttempt.bind(securityLogger);
export const logSuspiciousActivity = securityLogger.logSuspiciousActivity.bind(securityLogger);
export const logRateLimitViolation = securityLogger.logRateLimitViolation.bind(securityLogger);
export const logAttackAttempt = securityLogger.logAttackAttempt.bind(securityLogger);

// Exportar tipos
export type { SecurityEventType };

// Inicialização
console.log('🛡️ Sistema de auditoria de segurança inicializado');

// Log de inicialização
logSecurityEvent('SYSTEM_ERROR', 'LOW', 'Sistema de logging de segurança inicializado', {
  timestamp: Date.now(),
  version: ENV_CONFIG.APP_VERSION
});