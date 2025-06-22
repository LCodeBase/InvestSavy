/**
 * Sistema de Proteção de Sessão e Cookies
 * Protege contra sequestro de sessão, fixação de sessão, e ataques relacionados
 */

import { securityLogger } from './securityLogger';
import { generateSecureToken, hash, encrypt, decrypt } from './encryption';
import { ENV_CONFIG, isProduction } from '../config/environment';

// Tipos para proteção de sessão
interface SessionData {
  id: string;
  userId?: string;
  username?: string;
  email?: string;
  ip: string;
  userAgent: string;
  fingerprint: string;
  createdAt: number;
  lastActivity: number;
  expiresAt: number;
  isAuthenticated: boolean;
  permissions: string[];
  metadata: Record<string, any>;
  securityFlags: SessionSecurityFlags;
  riskScore: number;
  deviceInfo: DeviceInfo;
  locationInfo?: LocationInfo;
}

interface SessionSecurityFlags {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  encrypted: boolean;
  signed: boolean;
  regenerated: boolean;
  validated: boolean;
  suspicious: boolean;
  compromised: boolean;
}

interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  os: string;
  browser: string;
  version: string;
  screen: {
    width: number;
    height: number;
    colorDepth: number;
  };
  timezone: string;
  language: string;
  plugins: string[];
  features: {
    cookies: boolean;
    localStorage: boolean;
    sessionStorage: boolean;
    webGL: boolean;
    canvas: boolean;
    webRTC: boolean;
  };
}

interface LocationInfo {
  country?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  isp?: string;
  proxy?: boolean;
  vpn?: boolean;
  tor?: boolean;
}

interface SessionValidationResult {
  valid: boolean;
  reason: string;
  riskScore: number;
  actions: SessionAction[];
  newSessionRequired: boolean;
  additionalVerificationRequired: boolean;
}

interface SessionAnomaly {
  id: string;
  sessionId: string;
  type: AnomalyType;
  severity: SecuritySeverity;
  description: string;
  timestamp: number;
  data: Record<string, any>;
  resolved: boolean;
}

interface SessionAlert {
  id: string;
  sessionId: string;
  userId?: string;
  type: AlertType;
  severity: SecuritySeverity;
  title: string;
  message: string;
  timestamp: number;
  acknowledged: boolean;
  actions: string[];
}

interface CookieConfig {
  name: string;
  domain?: string;
  path: string;
  maxAge: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  signed: boolean;
  encrypted: boolean;
}

interface SessionConfig {
  maxAge: number;
  idleTimeout: number;
  absoluteTimeout: number;
  regenerateInterval: number;
  maxConcurrentSessions: number;
  strictValidation: boolean;
  deviceBinding: boolean;
  locationTracking: boolean;
  anomalyDetection: boolean;
  autoCleanup: boolean;
  encryptionEnabled: boolean;
  signatureValidation: boolean;
}

type SessionAction = 'REGENERATE' | 'INVALIDATE' | 'REQUIRE_2FA' | 'LOG' | 'ALERT' | 'BLOCK';
type AnomalyType = 'IP_CHANGE' | 'DEVICE_CHANGE' | 'LOCATION_CHANGE' | 'TIMING_ANOMALY' | 'BEHAVIOR_ANOMALY' | 'CONCURRENT_SESSION';
type AlertType = 'SESSION_HIJACK' | 'SESSION_FIXATION' | 'ANOMALY_DETECTED' | 'SECURITY_VIOLATION';
type SecuritySeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// Configurações de sessão
const SESSION_CONFIG: SessionConfig = {
  maxAge: 24 * 60 * 60 * 1000, // 24 horas
  idleTimeout: 30 * 60 * 1000, // 30 minutos
  absoluteTimeout: 8 * 60 * 60 * 1000, // 8 horas
  regenerateInterval: 15 * 60 * 1000, // 15 minutos
  maxConcurrentSessions: 3,
  strictValidation: true,
  deviceBinding: true,
  locationTracking: false,
  anomalyDetection: true,
  autoCleanup: true,
  encryptionEnabled: true,
  signatureValidation: true
};

// Configurações de cookies
const COOKIE_CONFIGS: Record<string, CookieConfig> = {
  session: {
    name: 'session_id',
    path: '/',
    maxAge: SESSION_CONFIG.maxAge,
    httpOnly: true,
    secure: isProduction(),
    sameSite: 'strict',
    signed: true,
    encrypted: true
  },
  csrf: {
    name: 'csrf_token',
    path: '/',
    maxAge: SESSION_CONFIG.maxAge,
    httpOnly: false,
    secure: isProduction(),
    sameSite: 'strict',
    signed: true,
    encrypted: false
  },
  preferences: {
    name: 'user_prefs',
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
    httpOnly: false,
    secure: isProduction(),
    sameSite: 'lax',
    signed: false,
    encrypted: true
  }
};

// Classe principal de proteção de sessão
export class SessionProtection {
  private static instance: SessionProtection;
  private sessions: Map<string, SessionData> = new Map();
  private userSessions: Map<string, Set<string>> = new Map(); // userId -> sessionIds
  private anomalies: SessionAnomaly[] = [];
  private alerts: SessionAlert[] = [];
  private secretKey: string;
  private isEnabled = true;
  
  private constructor() {
    this.secretKey = process.env.SESSION_SECRET || 'default-secret-key';
    this.startCleanupScheduler();
    this.startAnomalyDetection();
  }
  
  static getInstance(): SessionProtection {
    if (!SessionProtection.instance) {
      SessionProtection.instance = new SessionProtection();
    }
    return SessionProtection.instance;
  }
  
  /**
   * Cria uma nova sessão segura
   */
  async createSession(data: {
    userId?: string;
    username?: string;
    email?: string;
    ip: string;
    userAgent: string;
    deviceInfo?: Partial<DeviceInfo>;
    locationInfo?: LocationInfo;
    permissions?: string[];
  }): Promise<{
    sessionId: string;
    token: string;
    expiresAt: number;
  }> {
    if (!this.isEnabled) {
      throw new Error('Proteção de sessão desabilitada');
    }
    
    // Verificar limite de sessões concorrentes
    if (data.userId && SESSION_CONFIG.maxConcurrentSessions > 0) {
      await this.enforceConcurrentSessionLimit(data.userId);
    }
    
    // Gerar ID de sessão seguro
    const sessionId = await generateSecureToken(32);
    const fingerprint = await this.generateDeviceFingerprint(data.userAgent, data.deviceInfo);
    
    const now = Date.now();
    const session: SessionData = {
      id: sessionId,
      userId: data.userId,
      username: data.username,
      email: data.email,
      ip: data.ip,
      userAgent: data.userAgent,
      fingerprint,
      createdAt: now,
      lastActivity: now,
      expiresAt: now + SESSION_CONFIG.maxAge,
      isAuthenticated: !!data.userId,
      permissions: data.permissions || [],
      metadata: {},
      securityFlags: {
        httpOnly: true,
        secure: isProduction(),
        sameSite: 'strict',
        encrypted: true,
        signed: true,
        regenerated: false,
        validated: true,
        suspicious: false,
        compromised: false
      },
      riskScore: 0,
      deviceInfo: await this.normalizeDeviceInfo(data.deviceInfo),
      locationInfo: data.locationInfo
    };
    
    // Calcular score de risco inicial
    session.riskScore = await this.calculateRiskScore(session);
    
    // Armazenar sessão
    this.sessions.set(sessionId, session);
    
    // Mapear usuário -> sessões
    if (data.userId) {
      if (!this.userSessions.has(data.userId)) {
        this.userSessions.set(data.userId, new Set());
      }
      this.userSessions.get(data.userId)!.add(sessionId);
    }
    
    // Gerar token assinado e criptografado
    const token = await this.generateSessionToken(sessionId);
    
    await securityLogger.logEvent(
      'SESSION_CREATED',
      'LOW',
      'Nova sessão criada',
      {
        sessionId,
        userId: data.userId,
        ip: data.ip,
        userAgent: data.userAgent,
        riskScore: session.riskScore
      }
    );
    
    return {
      sessionId,
      token,
      expiresAt: session.expiresAt
    };
  }
  
  /**
   * Valida uma sessão existente
   */
  async validateSession(token: string, request: {
    ip: string;
    userAgent: string;
    deviceInfo?: Partial<DeviceInfo>;
    locationInfo?: LocationInfo;
  }): Promise<SessionValidationResult> {
    if (!this.isEnabled) {
      return {
        valid: false,
        reason: 'Proteção de sessão desabilitada',
        riskScore: 0,
        actions: [],
        newSessionRequired: true,
        additionalVerificationRequired: false
      };
    }
    
    try {
      // Verificar e decodificar token
      const sessionId = await this.verifySessionToken(token);
      if (!sessionId) {
        return {
          valid: false,
          reason: 'Token de sessão inválido',
          riskScore: 100,
          actions: ['LOG'],
          newSessionRequired: true,
          additionalVerificationRequired: false
        };
      }
      
      // Buscar sessão
      const session = this.sessions.get(sessionId);
      if (!session) {
        return {
          valid: false,
          reason: 'Sessão não encontrada',
          riskScore: 80,
          actions: ['LOG'],
          newSessionRequired: true,
          additionalVerificationRequired: false
        };
      }
      
      const now = Date.now();
      
      // Verificar expiração
      if (session.expiresAt < now) {
        await this.invalidateSession(sessionId, 'Sessão expirada');
        return {
          valid: false,
          reason: 'Sessão expirada',
          riskScore: 0,
          actions: [],
          newSessionRequired: true,
          additionalVerificationRequired: false
        };
      }
      
      // Verificar timeout de inatividade
      if (now - session.lastActivity > SESSION_CONFIG.idleTimeout) {
        await this.invalidateSession(sessionId, 'Timeout de inatividade');
        return {
          valid: false,
          reason: 'Sessão inativa por muito tempo',
          riskScore: 0,
          actions: [],
          newSessionRequired: true,
          additionalVerificationRequired: false
        };
      }
      
      // Verificar timeout absoluto
      if (now - session.createdAt > SESSION_CONFIG.absoluteTimeout) {
        await this.invalidateSession(sessionId, 'Timeout absoluto');
        return {
          valid: false,
          reason: 'Sessão excedeu tempo máximo',
          riskScore: 0,
          actions: [],
          newSessionRequired: true,
          additionalVerificationRequired: false
        };
      }
      
      // Verificar se sessão está comprometida
      if (session.securityFlags.compromised) {
        return {
          valid: false,
          reason: 'Sessão comprometida',
          riskScore: 100,
          actions: ['INVALIDATE', 'ALERT'],
          newSessionRequired: true,
          additionalVerificationRequired: true
        };
      }
      
      // Detectar anomalias
      const anomalies = await this.detectAnomalies(session, request);
      const actions: SessionAction[] = [];
      let riskScore = session.riskScore;
      let additionalVerificationRequired = false;
      
      for (const anomaly of anomalies) {
        riskScore += this.getAnomalyRiskIncrease(anomaly.type);
        
        switch (anomaly.severity) {
          case 'CRITICAL':
            actions.push('INVALIDATE', 'ALERT', 'REQUIRE_2FA');
            additionalVerificationRequired = true;
            break;
          case 'HIGH':
            actions.push('REGENERATE', 'ALERT');
            additionalVerificationRequired = true;
            break;
          case 'MEDIUM':
            actions.push('REGENERATE', 'LOG');
            break;
          case 'LOW':
            actions.push('LOG');
            break;
        }
      }
      
      // Verificar se precisa regenerar sessão
      const shouldRegenerate = 
        now - session.lastActivity > SESSION_CONFIG.regenerateInterval ||
        actions.includes('REGENERATE');
      
      if (shouldRegenerate && !actions.includes('INVALIDATE')) {
        actions.push('REGENERATE');
      }
      
      // Atualizar atividade da sessão
      session.lastActivity = now;
      session.riskScore = Math.min(riskScore, 100);
      
      // Aplicar ações
      if (actions.includes('INVALIDATE')) {
        await this.invalidateSession(sessionId, 'Anomalia crítica detectada');
        return {
          valid: false,
          reason: 'Sessão invalidada por anomalia',
          riskScore,
          actions,
          newSessionRequired: true,
          additionalVerificationRequired
        };
      }
      
      return {
        valid: true,
        reason: 'Sessão válida',
        riskScore,
        actions,
        newSessionRequired: false,
        additionalVerificationRequired
      };
      
    } catch (error) {
      await securityLogger.logEvent(
        'SESSION_VALIDATION_ERROR',
        'HIGH',
        'Erro na validação de sessão',
        { error: error.message, ip: request.ip }
      );
      
      return {
        valid: false,
        reason: 'Erro na validação',
        riskScore: 100,
        actions: ['LOG', 'ALERT'],
        newSessionRequired: true,
        additionalVerificationRequired: false
      };
    }
  }
  
  /**
   * Regenera uma sessão existente
   */
  async regenerateSession(oldSessionId: string): Promise<{
    sessionId: string;
    token: string;
    expiresAt: number;
  } | null> {
    const oldSession = this.sessions.get(oldSessionId);
    if (!oldSession) {
      return null;
    }
    
    // Criar nova sessão com os mesmos dados
    const newSessionResult = await this.createSession({
      userId: oldSession.userId,
      username: oldSession.username,
      email: oldSession.email,
      ip: oldSession.ip,
      userAgent: oldSession.userAgent,
      deviceInfo: oldSession.deviceInfo,
      locationInfo: oldSession.locationInfo,
      permissions: oldSession.permissions
    });
    
    // Invalidar sessão antiga
    await this.invalidateSession(oldSessionId, 'Sessão regenerada');
    
    await securityLogger.logEvent(
      'SESSION_REGENERATED',
      'MEDIUM',
      'Sessão regenerada',
      {
        oldSessionId,
        newSessionId: newSessionResult.sessionId,
        userId: oldSession.userId
      }
    );
    
    return newSessionResult;
  }
  
  /**
   * Invalida uma sessão
   */
  async invalidateSession(sessionId: string, reason: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return;
    }
    
    // Remover da lista de sessões do usuário
    if (session.userId) {
      const userSessions = this.userSessions.get(session.userId);
      if (userSessions) {
        userSessions.delete(sessionId);
        if (userSessions.size === 0) {
          this.userSessions.delete(session.userId);
        }
      }
    }
    
    // Remover sessão
    this.sessions.delete(sessionId);
    
    await securityLogger.logEvent(
      'SESSION_INVALIDATED',
      'MEDIUM',
      'Sessão invalidada',
      {
        sessionId,
        userId: session.userId,
        reason,
        duration: Date.now() - session.createdAt
      }
    );
  }
  
  /**
   * Invalida todas as sessões de um usuário
   */
  async invalidateUserSessions(userId: string, reason: string, excludeSessionId?: string): Promise<void> {
    const userSessions = this.userSessions.get(userId);
    if (!userSessions) {
      return;
    }
    
    const sessionsToInvalidate = Array.from(userSessions)
      .filter(sessionId => sessionId !== excludeSessionId);
    
    for (const sessionId of sessionsToInvalidate) {
      await this.invalidateSession(sessionId, reason);
    }
    
    await securityLogger.logEvent(
      'USER_SESSIONS_INVALIDATED',
      'HIGH',
      'Todas as sessões do usuário invalidadas',
      {
        userId,
        reason,
        invalidatedSessions: sessionsToInvalidate.length,
        excludedSession: excludeSessionId
      }
    );
  }
  
  /**
   * Obtém informações de uma sessão
   */
  getSession(sessionId: string): SessionData | null {
    return this.sessions.get(sessionId) || null;
  }
  
  /**
   * Obtém todas as sessões de um usuário
   */
  getUserSessions(userId: string): SessionData[] {
    const sessionIds = this.userSessions.get(userId);
    if (!sessionIds) {
      return [];
    }
    
    return Array.from(sessionIds)
      .map(id => this.sessions.get(id))
      .filter(session => session !== undefined) as SessionData[];
  }
  
  /**
   * Obtém estatísticas de sessões
   */
  getStatistics(): {
    totalSessions: number;
    authenticatedSessions: number;
    suspiciousSessions: number;
    compromisedSessions: number;
    averageSessionDuration: number;
    activeAnomalies: number;
    activeAlerts: number;
    topUserAgents: Array<{ userAgent: string; count: number }>;
    topIPs: Array<{ ip: string; count: number }>;
  } {
    const sessions = Array.from(this.sessions.values());
    const now = Date.now();
    
    const totalSessions = sessions.length;
    const authenticatedSessions = sessions.filter(s => s.isAuthenticated).length;
    const suspiciousSessions = sessions.filter(s => s.securityFlags.suspicious).length;
    const compromisedSessions = sessions.filter(s => s.securityFlags.compromised).length;
    
    const sessionDurations = sessions.map(s => now - s.createdAt);
    const averageSessionDuration = sessionDurations.length > 0 ?
      sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length : 0;
    
    const activeAnomalies = this.anomalies.filter(a => !a.resolved).length;
    const activeAlerts = this.alerts.filter(a => !a.acknowledged).length;
    
    // Top User Agents
    const userAgentCounts = new Map<string, number>();
    sessions.forEach(session => {
      const count = userAgentCounts.get(session.userAgent) || 0;
      userAgentCounts.set(session.userAgent, count + 1);
    });
    
    const topUserAgents = Array.from(userAgentCounts.entries())
      .map(([userAgent, count]) => ({ userAgent, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Top IPs
    const ipCounts = new Map<string, number>();
    sessions.forEach(session => {
      const count = ipCounts.get(session.ip) || 0;
      ipCounts.set(session.ip, count + 1);
    });
    
    const topIPs = Array.from(ipCounts.entries())
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    return {
      totalSessions,
      authenticatedSessions,
      suspiciousSessions,
      compromisedSessions,
      averageSessionDuration,
      activeAnomalies,
      activeAlerts,
      topUserAgents,
      topIPs
    };
  }
  
  /**
   * Obtém anomalias ativas
   */
  getAnomalies(resolved = false): SessionAnomaly[] {
    return this.anomalies.filter(anomaly => anomaly.resolved === resolved);
  }
  
  /**
   * Obtém alertas ativos
   */
  getAlerts(acknowledged = false): SessionAlert[] {
    return this.alerts.filter(alert => alert.acknowledged === acknowledged);
  }
  
  /**
   * Marca uma anomalia como resolvida
   */
  resolveAnomaly(anomalyId: string): void {
    const anomaly = this.anomalies.find(a => a.id === anomalyId);
    if (anomaly) {
      anomaly.resolved = true;
    }
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
  private async generateSessionToken(sessionId: string): Promise<string> {
    const payload = {
      sessionId,
      timestamp: Date.now(),
      nonce: await generateSecureToken(16)
    };
    
    const payloadString = JSON.stringify(payload);
    const signature = await hash.sha256(payloadString + this.secretKey);
    
    const tokenData = {
      payload: payloadString,
      signature
    };
    
    if (SESSION_CONFIG.encryptionEnabled) {
      const encryptResult = await encrypt(JSON.stringify(tokenData), this.secretKey);
      return JSON.stringify(encryptResult);
    }
    
    return Buffer.from(JSON.stringify(tokenData)).toString('base64');
  }
  
  private async verifySessionToken(token: string): Promise<string | null> {
    try {
      let tokenDataString: string;
      
      if (SESSION_CONFIG.encryptionEnabled) {
        const encryptedData = JSON.parse(token);
        tokenDataString = await decrypt(encryptedData);
      } else {
        tokenDataString = Buffer.from(token, 'base64').toString();
      }
      
      const tokenData = JSON.parse(tokenDataString);
      const payload = JSON.parse(tokenData.payload);
      
      // Verificar assinatura
      if (SESSION_CONFIG.signatureValidation) {
        const expectedSignature = await hash.sha256(tokenData.payload + this.secretKey);
        if (tokenData.signature !== expectedSignature) {
          return null;
        }
      }
      
      // Verificar timestamp (token não pode ser muito antigo)
      const maxAge = 24 * 60 * 60 * 1000; // 24 horas
      if (Date.now() - payload.timestamp > maxAge) {
        return null;
      }
      
      return payload.sessionId;
    } catch (error) {
      return null;
    }
  }
  
  private async generateDeviceFingerprint(userAgent: string, deviceInfo?: Partial<DeviceInfo>): Promise<string> {
    const fingerprintData = {
      userAgent,
      screen: deviceInfo?.screen || { width: 0, height: 0, colorDepth: 0 },
      timezone: deviceInfo?.timezone || 'UTC',
      language: deviceInfo?.language || 'en',
      plugins: deviceInfo?.plugins || [],
      features: deviceInfo?.features || {}
    };
    
    return await hash.sha256(JSON.stringify(fingerprintData));
  }
  
  private async normalizeDeviceInfo(deviceInfo?: Partial<DeviceInfo>): Promise<DeviceInfo> {
    return {
      type: deviceInfo?.type || 'unknown',
      os: deviceInfo?.os || 'unknown',
      browser: deviceInfo?.browser || 'unknown',
      version: deviceInfo?.version || 'unknown',
      screen: deviceInfo?.screen || { width: 0, height: 0, colorDepth: 0 },
      timezone: deviceInfo?.timezone || 'UTC',
      language: deviceInfo?.language || 'en',
      plugins: deviceInfo?.plugins || [],
      features: deviceInfo?.features || {
        cookies: true,
        localStorage: true,
        sessionStorage: true,
        webGL: false,
        canvas: false,
        webRTC: false
      }
    };
  }
  
  private async calculateRiskScore(session: SessionData): Promise<number> {
    let score = 0;
    
    // Score baseado na localização
    if (session.locationInfo?.proxy || session.locationInfo?.vpn || session.locationInfo?.tor) {
      score += 30;
    }
    
    // Score baseado no dispositivo
    if (session.deviceInfo.type === 'unknown') {
      score += 10;
    }
    
    // Score baseado no User Agent
    if (session.userAgent.includes('bot') || session.userAgent.includes('crawler')) {
      score += 40;
    }
    
    // Score baseado no horário
    const hour = new Date(session.createdAt).getHours();
    if (hour < 6 || hour > 22) {
      score += 5;
    }
    
    return Math.min(score, 100);
  }
  
  private async enforceConcurrentSessionLimit(userId: string): Promise<void> {
    const userSessions = this.userSessions.get(userId);
    if (!userSessions || userSessions.size < SESSION_CONFIG.maxConcurrentSessions) {
      return;
    }
    
    // Encontrar sessão mais antiga para remover
    const sessions = Array.from(userSessions)
      .map(id => this.sessions.get(id))
      .filter(session => session !== undefined) as SessionData[];
    
    sessions.sort((a, b) => a.lastActivity - b.lastActivity);
    
    const sessionsToRemove = sessions.slice(0, sessions.length - SESSION_CONFIG.maxConcurrentSessions + 1);
    
    for (const session of sessionsToRemove) {
      await this.invalidateSession(session.id, 'Limite de sessões concorrentes excedido');
    }
  }
  
  private async detectAnomalies(session: SessionData, request: {
    ip: string;
    userAgent: string;
    deviceInfo?: Partial<DeviceInfo>;
    locationInfo?: LocationInfo;
  }): Promise<SessionAnomaly[]> {
    const anomalies: SessionAnomaly[] = [];
    
    // Detectar mudança de IP
    if (session.ip !== request.ip) {
      const anomaly = await this.createAnomaly(
        session.id,
        'IP_CHANGE',
        'HIGH',
        'Mudança de IP detectada',
        {
          oldIP: session.ip,
          newIP: request.ip,
          timeSinceLastActivity: Date.now() - session.lastActivity
        }
      );
      anomalies.push(anomaly);
    }
    
    // Detectar mudança de User Agent
    if (session.userAgent !== request.userAgent) {
      const anomaly = await this.createAnomaly(
        session.id,
        'DEVICE_CHANGE',
        'MEDIUM',
        'Mudança de User Agent detectada',
        {
          oldUserAgent: session.userAgent,
          newUserAgent: request.userAgent
        }
      );
      anomalies.push(anomaly);
    }
    
    // Detectar mudança de localização
    if (request.locationInfo && session.locationInfo) {
      const distance = this.calculateDistance(
        session.locationInfo,
        request.locationInfo
      );
      
      if (distance > 1000) { // Mais de 1000 km
        const timeDiff = Date.now() - session.lastActivity;
        const maxSpeed = distance / (timeDiff / (1000 * 60 * 60)); // km/h
        
        if (maxSpeed > 1000) { // Velocidade impossível
          const anomaly = await this.createAnomaly(
            session.id,
            'LOCATION_CHANGE',
            'CRITICAL',
            'Mudança de localização impossível',
            {
              oldLocation: session.locationInfo,
              newLocation: request.locationInfo,
              distance,
              timeDiff,
              calculatedSpeed: maxSpeed
            }
          );
          anomalies.push(anomaly);
        }
      }
    }
    
    // Detectar anomalias de timing
    const timeSinceLastActivity = Date.now() - session.lastActivity;
    if (timeSinceLastActivity < 100) { // Menos de 100ms
      const anomaly = await this.createAnomaly(
        session.id,
        'TIMING_ANOMALY',
        'MEDIUM',
        'Atividade muito rápida detectada',
        {
          timeSinceLastActivity,
          suspiciousPattern: true
        }
      );
      anomalies.push(anomaly);
    }
    
    // Detectar sessões concorrentes suspeitas
    if (session.userId) {
      const userSessions = this.getUserSessions(session.userId);
      const concurrentSessions = userSessions.filter(s => 
        s.id !== session.id && 
        Math.abs(s.lastActivity - Date.now()) < 60000 // Ativas nos últimos 60 segundos
      );
      
      if (concurrentSessions.length > 0) {
        const differentIPs = new Set(concurrentSessions.map(s => s.ip));
        if (differentIPs.size > 1) {
          const anomaly = await this.createAnomaly(
            session.id,
            'CONCURRENT_SESSION',
            'HIGH',
            'Sessões concorrentes de IPs diferentes',
            {
              concurrentSessions: concurrentSessions.length,
              differentIPs: Array.from(differentIPs)
            }
          );
          anomalies.push(anomaly);
        }
      }
    }
    
    return anomalies;
  }
  
  private async createAnomaly(
    sessionId: string,
    type: AnomalyType,
    severity: SecuritySeverity,
    description: string,
    data: Record<string, any>
  ): Promise<SessionAnomaly> {
    const anomaly: SessionAnomaly = {
      id: await generateSecureToken(16),
      sessionId,
      type,
      severity,
      description,
      timestamp: Date.now(),
      data,
      resolved: false
    };
    
    this.anomalies.push(anomaly);
    
    // Limitar número de anomalias
    if (this.anomalies.length > 1000) {
      this.anomalies.splice(0, this.anomalies.length - 1000);
    }
    
    await securityLogger.logEvent(
      'SESSION_ANOMALY_DETECTED',
      severity,
      description,
      {
        anomalyId: anomaly.id,
        sessionId,
        type,
        data
      }
    );
    
    return anomaly;
  }
  
  private getAnomalyRiskIncrease(type: AnomalyType): number {
    switch (type) {
      case 'IP_CHANGE': return 20;
      case 'DEVICE_CHANGE': return 15;
      case 'LOCATION_CHANGE': return 30;
      case 'TIMING_ANOMALY': return 10;
      case 'BEHAVIOR_ANOMALY': return 25;
      case 'CONCURRENT_SESSION': return 20;
      default: return 10;
    }
  }
  
  private calculateDistance(loc1: LocationInfo, loc2: LocationInfo): number {
    if (!loc1.latitude || !loc1.longitude || !loc2.latitude || !loc2.longitude) {
      return 0;
    }
    
    const R = 6371; // Raio da Terra em km
    const dLat = this.toRadians(loc2.latitude - loc1.latitude);
    const dLon = this.toRadians(loc2.longitude - loc1.longitude);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(loc1.latitude)) * Math.cos(this.toRadians(loc2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  private startCleanupScheduler(): void {
    // Limpeza a cada hora
    setInterval(() => {
      this.cleanupExpiredSessions();
    }, 60 * 60 * 1000);
  }
  
  private startAnomalyDetection(): void {
    // Detecção de anomalias a cada 5 minutos
    setInterval(() => {
      this.runAnomalyDetection();
    }, 5 * 60 * 1000);
  }
  
  private cleanupExpiredSessions(): void {
    const now = Date.now();
    const expiredSessions: string[] = [];
    
    this.sessions.forEach((session, sessionId) => {
      if (session.expiresAt < now || 
          now - session.lastActivity > SESSION_CONFIG.idleTimeout) {
        expiredSessions.push(sessionId);
      }
    });
    
    expiredSessions.forEach(sessionId => {
      this.invalidateSession(sessionId, 'Limpeza automática');
    });
    
    // Limpar anomalias antigas
    const maxAnomalyAge = 7 * 24 * 60 * 60 * 1000; // 7 dias
    this.anomalies = this.anomalies.filter(anomaly => 
      now - anomaly.timestamp < maxAnomalyAge
    );
    
    // Limpar alertas antigos
    const maxAlertAge = 30 * 24 * 60 * 60 * 1000; // 30 dias
    this.alerts = this.alerts.filter(alert => 
      now - alert.timestamp < maxAlertAge
    );
  }
  
  private async runAnomalyDetection(): Promise<void> {
    // Detectar padrões suspeitos em todas as sessões ativas
    const sessions = Array.from(this.sessions.values());
    
    for (const session of sessions) {
      // Verificar se sessão está suspeita
      if (session.riskScore > 70) {
        session.securityFlags.suspicious = true;
        
        await this.generateAlert(
          session.id,
          'ANOMALY_DETECTED',
          'HIGH',
          'Sessão com alto score de risco',
          `Sessão ${session.id} tem score de risco ${session.riskScore}`,
          session.userId
        );
      }
      
      // Verificar se sessão pode estar comprometida
      if (session.riskScore > 90) {
        session.securityFlags.compromised = true;
        
        await this.generateAlert(
          session.id,
          'SECURITY_VIOLATION',
          'CRITICAL',
          'Sessão possivelmente comprometida',
          `Sessão ${session.id} pode estar comprometida (score: ${session.riskScore})`,
          session.userId
        );
      }
    }
  }
  
  private async generateAlert(
    sessionId: string,
    type: AlertType,
    severity: SecuritySeverity,
    title: string,
    message: string,
    userId?: string
  ): Promise<void> {
    const alert: SessionAlert = {
      id: await generateSecureToken(16),
      sessionId,
      userId,
      type,
      severity,
      title,
      message,
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
      'SESSION_ALERT_GENERATED',
      severity,
      title,
      {
        alertId: alert.id,
        sessionId,
        userId,
        type,
        message
      }
    );
  }
}

// Instância singleton
export const sessionProtection = SessionProtection.getInstance();

// Middleware para Express/Fastify
export const sessionMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies?.session_id || req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      req.session = null;
      return next();
    }
    
    const validation = await sessionProtection.validateSession(token, {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'] || '',
      deviceInfo: req.deviceInfo,
      locationInfo: req.locationInfo
    });
    
    if (validation.valid) {
      const sessionId = await (sessionProtection as any).verifySessionToken(token);
      req.session = sessionProtection.getSession(sessionId!);
      
      // Aplicar ações necessárias
      if (validation.actions.includes('REGENERATE')) {
        const newSession = await sessionProtection.regenerateSession(sessionId!);
        if (newSession) {
          res.cookie('session_id', newSession.token, {
            httpOnly: true,
            secure: isProduction(),
            sameSite: 'strict',
            maxAge: SESSION_CONFIG.maxAge
          });
        }
      }
    } else {
      req.session = null;
      
      if (validation.newSessionRequired) {
        res.clearCookie('session_id');
      }
    }
    
    next();
  } catch (error) {
    console.error('Erro no middleware de sessão:', error);
    req.session = null;
    next();
  }
};

// Utilitários para cookies seguros
export const secureCookieUtils = {
  /**
   * Define um cookie seguro
   */
  set: async (res: any, name: string, value: string, options: Partial<CookieConfig> = {}) => {
    const config = COOKIE_CONFIGS[name] || COOKIE_CONFIGS.session;
    const cookieOptions = {
      ...config,
      ...options
    };
    
    let cookieValue = value;
    
    // Criptografar se necessário
    if (cookieOptions.encrypted) {
      const encryptResult = encrypt(value, sessionProtection['secretKey']);
      cookieValue = JSON.stringify(encryptResult);
    }
    
    // Assinar se necessário
    if (cookieOptions.signed) {
      const signature = await hash.sha256(cookieValue + sessionProtection['secretKey']);
      cookieValue = `${cookieValue}.${signature}`;
    }
    
    res.cookie(cookieOptions.name, cookieValue, {
      domain: cookieOptions.domain,
      path: cookieOptions.path,
      maxAge: cookieOptions.maxAge,
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite
    });
  },
  
  /**
   * Obtém um cookie seguro
   */
  get: async (req: any, name: string): Promise<string | null> => {
    const config = COOKIE_CONFIGS[name] || COOKIE_CONFIGS.session;
    let cookieValue = req.cookies?.[config.name];
    
    if (!cookieValue) {
      return null;
    }
    
    try {
      // Verificar assinatura se necessário
      if (config.signed) {
        const [value, signature] = cookieValue.split('.');
        const expectedSignature = await hash.sha256(value + sessionProtection['secretKey']);
        
        if (signature !== expectedSignature) {
          return null;
        }
        
        cookieValue = value;
      }
      
      // Descriptografar se necessário
      if (config.encrypted) {
        cookieValue = await decrypt(JSON.parse(cookieValue));
      }
      
      return cookieValue;
    } catch (error) {
      return null;
    }
  },
  
  /**
   * Remove um cookie
   */
  clear: (res: any, name: string) => {
    const config = COOKIE_CONFIGS[name] || COOKIE_CONFIGS.session;
    
    res.clearCookie(config.name, {
      domain: config.domain,
      path: config.path
    });
  }
};

// Hook para React
export const useSessionProtection = () => {
  const createSession = async (data: {
    userId?: string;
    username?: string;
    email?: string;
    permissions?: string[];
  }) => {
    const deviceInfo = {
      type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' as const : 'desktop' as const,
      os: navigator.platform,
      browser: navigator.userAgent.split(' ').pop() || 'unknown',
      version: '1.0',
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      plugins: Array.from(navigator.plugins).map(p => p.name),
      features: {
        cookies: navigator.cookieEnabled,
        localStorage: !!window.localStorage,
        sessionStorage: !!window.sessionStorage,
        webGL: !!window.WebGLRenderingContext,
        canvas: !!window.HTMLCanvasElement,
        webRTC: !!window.RTCPeerConnection
      }
    };
    
    return await sessionProtection.createSession({
      ...data,
      ip: 'client', // No frontend, usar identificador genérico
      userAgent: navigator.userAgent,
      deviceInfo
    });
  };
  
  const validateSession = async (token: string) => {
    const deviceInfo = {
      type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' as const : 'desktop' as const,
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    };
    
    return await sessionProtection.validateSession(token, {
      ip: 'client',
      userAgent: navigator.userAgent,
      deviceInfo
    });
  };
  
  const invalidateSession = async (sessionId: string, reason: string) => {
    return await sessionProtection.invalidateSession(sessionId, reason);
  };
  
  const getStatistics = () => {
    return sessionProtection.getStatistics();
  };
  
  const getAnomalies = (resolved = false) => {
    return sessionProtection.getAnomalies(resolved);
  };
  
  const getAlerts = (acknowledged = false) => {
    return sessionProtection.getAlerts(acknowledged);
  };
  
  return {
    createSession,
    validateSession,
    invalidateSession,
    getStatistics,
    getAnomalies,
    getAlerts
  };
};

console.log('🔐 Sistema de proteção de sessão inicializado');

// Exportar para uso global
(window as any).__sessionProtection = sessionProtection;

// Exportar tipos
export type {
  SessionData,
  SessionValidationResult,
  SessionAnomaly,
  SessionAlert,
  DeviceInfo,
  LocationInfo,
  CookieConfig,
  SessionConfig
};