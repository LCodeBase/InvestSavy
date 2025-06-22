/**
 * Sistema de proteção contra DDoS e Rate Limiting avançado
 * Implementa múltiplas camadas de proteção contra ataques
 */

import { SECURITY_CONFIG } from '../config/environment';
import { securityLogger } from './securityLogger';
import { hash } from './encryption';

// Tipos para proteção DDoS
interface RequestInfo {
  timestamp: number;
  ip: string;
  userAgent: string;
  endpoint: string;
  method: string;
  size: number;
  fingerprint: string;
}

interface RateLimitRule {
  windowMs: number;
  maxRequests: number;
  blockDurationMs: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface IPInfo {
  requests: RequestInfo[];
  blocked: boolean;
  blockExpiry: number;
  suspicionLevel: number;
  firstSeen: number;
  lastSeen: number;
  totalRequests: number;
  violations: number;
}

interface DDoSPattern {
  name: string;
  description: string;
  detector: (requests: RequestInfo[]) => boolean;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  action: 'LOG' | 'THROTTLE' | 'BLOCK' | 'CAPTCHA';
}

// Classe principal de proteção DDoS
export class DDoSProtection {
  private static instance: DDoSProtection;
  private ipDatabase = new Map<string, IPInfo>();
  private globalRequestCount = 0;
  private startTime = Date.now();
  private cleanupInterval: NodeJS.Timeout;
  
  // Configurações de rate limiting por endpoint
  private rateLimitRules: Map<string, RateLimitRule> = new Map([
    ['default', { windowMs: 15 * 60 * 1000, maxRequests: 100, blockDurationMs: 60 * 1000 }],
    ['api/auth/login', { windowMs: 15 * 60 * 1000, maxRequests: 5, blockDurationMs: 5 * 60 * 1000 }],
    ['api/auth/register', { windowMs: 60 * 60 * 1000, maxRequests: 3, blockDurationMs: 60 * 60 * 1000 }],
    ['api/upload', { windowMs: 60 * 1000, maxRequests: 10, blockDurationMs: 5 * 60 * 1000 }],
    ['api/search', { windowMs: 60 * 1000, maxRequests: 30, blockDurationMs: 2 * 60 * 1000 }],
    ['api/contact', { windowMs: 60 * 60 * 1000, maxRequests: 5, blockDurationMs: 30 * 60 * 1000 }]
  ]);
  
  // Padrões de ataque DDoS
  private ddosPatterns: DDoSPattern[] = [
    {
      name: 'HIGH_FREQUENCY_REQUESTS',
      description: 'Muitas requisições em pouco tempo',
      detector: (requests) => {
        const lastMinute = requests.filter(r => Date.now() - r.timestamp < 60000);
        return lastMinute.length > 60;
      },
      severity: 'HIGH',
      action: 'BLOCK'
    },
    {
      name: 'IDENTICAL_REQUESTS',
      description: 'Requisições idênticas repetidas',
      detector: (requests) => {
        const lastHour = requests.filter(r => Date.now() - r.timestamp < 3600000);
        const endpoints = lastHour.map(r => r.endpoint);
        const uniqueEndpoints = new Set(endpoints);
        return endpoints.length > 20 && uniqueEndpoints.size === 1;
      },
      severity: 'MEDIUM',
      action: 'THROTTLE'
    },
    {
      name: 'RAPID_USER_AGENT_CHANGE',
      description: 'Mudanças rápidas de User-Agent',
      detector: (requests) => {
        const lastHour = requests.filter(r => Date.now() - r.timestamp < 3600000);
        const userAgents = new Set(lastHour.map(r => r.userAgent));
        return userAgents.size > 10 && lastHour.length > 50;
      },
      severity: 'HIGH',
      action: 'BLOCK'
    },
    {
      name: 'LARGE_PAYLOAD_FLOOD',
      description: 'Flood de requisições com payload grande',
      detector: (requests) => {
        const lastMinute = requests.filter(r => Date.now() - r.timestamp < 60000);
        const totalSize = lastMinute.reduce((sum, r) => sum + r.size, 0);
        return totalSize > 10 * 1024 * 1024; // 10MB em 1 minuto
      },
      severity: 'CRITICAL',
      action: 'BLOCK'
    },
    {
      name: 'DISTRIBUTED_ATTACK',
      description: 'Ataque distribuído coordenado',
      detector: (requests) => {
        // Detectar padrões similares de múltiplos IPs
        const recentRequests = Array.from(this.ipDatabase.values())
          .flatMap(ip => ip.requests.filter(r => Date.now() - r.timestamp < 300000));
        
        const endpointCounts = new Map<string, number>();
        recentRequests.forEach(r => {
          endpointCounts.set(r.endpoint, (endpointCounts.get(r.endpoint) || 0) + 1);
        });
        
        return Array.from(endpointCounts.values()).some(count => count > 200);
      },
      severity: 'CRITICAL',
      action: 'BLOCK'
    }
  ];
  
  private constructor() {
    this.startCleanupInterval();
    this.initializeGlobalProtection();
  }
  
  static getInstance(): DDoSProtection {
    if (!DDoSProtection.instance) {
      DDoSProtection.instance = new DDoSProtection();
    }
    return DDoSProtection.instance;
  }
  
  /**
   * Verifica se uma requisição deve ser permitida
   */
  async checkRequest(
    ip: string,
    endpoint: string,
    method: string,
    userAgent: string,
    contentLength: number = 0
  ): Promise<{
    allowed: boolean;
    reason?: string;
    retryAfter?: number;
    action?: string;
  }> {
    try {
      // Verificar se IP está bloqueado
      const ipInfo = this.getOrCreateIPInfo(ip);
      
      if (ipInfo.blocked && Date.now() < ipInfo.blockExpiry) {
        await securityLogger.logEvent(
          'UNAUTHORIZED_ACCESS',
          'MEDIUM',
          `Requisição bloqueada de IP em blacklist: ${ip}`,
          { ip, endpoint, method }
        );
        
        return {
          allowed: false,
          reason: 'IP bloqueado temporariamente',
          retryAfter: Math.ceil((ipInfo.blockExpiry - Date.now()) / 1000)
        };
      }
      
      // Criar informações da requisição
      const requestInfo: RequestInfo = {
        timestamp: Date.now(),
        ip,
        userAgent,
        endpoint,
        method,
        size: contentLength,
        fingerprint: await this.generateRequestFingerprint(ip, userAgent, endpoint)
      };
      
      // Verificar rate limiting
      const rateLimitResult = this.checkRateLimit(ip, endpoint, requestInfo);
      if (!rateLimitResult.allowed) {
        return rateLimitResult;
      }
      
      // Verificar padrões de DDoS
      const ddosResult = await this.checkDDoSPatterns(ip, requestInfo);
      if (!ddosResult.allowed) {
        return ddosResult;
      }
      
      // Adicionar requisição ao histórico
      ipInfo.requests.push(requestInfo);
      ipInfo.lastSeen = Date.now();
      ipInfo.totalRequests++;
      this.globalRequestCount++;
      
      // Limpar requisições antigas
      this.cleanupOldRequests(ipInfo);
      
      return { allowed: true };
      
    } catch (error) {
      console.error('Erro na verificação de DDoS:', error);
      // Em caso de erro, permitir a requisição mas logar o problema
      await securityLogger.logEvent(
        'SYSTEM_ERROR',
        'HIGH',
        'Erro no sistema de proteção DDoS',
        { error: error instanceof Error ? error.message : 'Erro desconhecido', ip, endpoint }
      );
      
      return { allowed: true };
    }
  }
  
  /**
   * Bloqueia um IP temporariamente
   */
  async blockIP(
    ip: string,
    durationMs: number,
    reason: string
  ): Promise<void> {
    const ipInfo = this.getOrCreateIPInfo(ip);
    ipInfo.blocked = true;
    ipInfo.blockExpiry = Date.now() + durationMs;
    ipInfo.violations++;
    
    await securityLogger.logEvent(
      'IP_BLOCKED',
      'HIGH',
      `IP bloqueado: ${ip}`,
      { ip, duration: durationMs, reason, violations: ipInfo.violations }
    );
  }
  
  /**
   * Remove bloqueio de um IP
   */
  async unblockIP(ip: string): Promise<void> {
    const ipInfo = this.ipDatabase.get(ip);
    if (ipInfo) {
      ipInfo.blocked = false;
      ipInfo.blockExpiry = 0;
      
      await securityLogger.logEvent(
        'IP_BLOCKED',
        'LOW',
        `IP desbloqueado: ${ip}`,
        { ip }
      );
    }
  }
  
  /**
   * Obtém estatísticas de proteção
   */
  getStatistics(): {
    totalIPs: number;
    blockedIPs: number;
    totalRequests: number;
    requestsPerMinute: number;
    topIPs: Array<{ ip: string; requests: number; blocked: boolean }>;
    recentBlocks: Array<{ ip: string; reason: string; expiry: number }>;
  } {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    const blockedIPs = Array.from(this.ipDatabase.values())
      .filter(info => info.blocked && now < info.blockExpiry);
    
    const recentRequests = Array.from(this.ipDatabase.values())
      .flatMap(info => info.requests.filter(r => r.timestamp > oneMinuteAgo));
    
    const topIPs = Array.from(this.ipDatabase.entries())
      .map(([ip, info]) => ({ ip, requests: info.totalRequests, blocked: info.blocked }))
      .sort((a, b) => b.requests - a.requests)
      .slice(0, 10);
    
    const recentBlocks = Array.from(this.ipDatabase.entries())
      .filter(([, info]) => info.blocked && now < info.blockExpiry)
      .map(([ip, info]) => ({ ip, reason: 'Rate limit exceeded', expiry: info.blockExpiry }));
    
    return {
      totalIPs: this.ipDatabase.size,
      blockedIPs: blockedIPs.length,
      totalRequests: this.globalRequestCount,
      requestsPerMinute: recentRequests.length,
      topIPs,
      recentBlocks
    };
  }
  
  /**
   * Configura regra de rate limiting personalizada
   */
  setRateLimitRule(endpoint: string, rule: RateLimitRule): void {
    this.rateLimitRules.set(endpoint, rule);
  }
  
  /**
   * Adiciona padrão de DDoS personalizado
   */
  addDDoSPattern(pattern: DDoSPattern): void {
    this.ddosPatterns.push(pattern);
  }
  
  // Métodos privados
  private getOrCreateIPInfo(ip: string): IPInfo {
    if (!this.ipDatabase.has(ip)) {
      this.ipDatabase.set(ip, {
        requests: [],
        blocked: false,
        blockExpiry: 0,
        suspicionLevel: 0,
        firstSeen: Date.now(),
        lastSeen: Date.now(),
        totalRequests: 0,
        violations: 0
      });
    }
    return this.ipDatabase.get(ip)!;
  }
  
  private checkRateLimit(
    ip: string,
    endpoint: string,
    requestInfo: RequestInfo
  ): { allowed: boolean; reason?: string; retryAfter?: number } {
    const rule = this.rateLimitRules.get(endpoint) || this.rateLimitRules.get('default')!;
    const ipInfo = this.getOrCreateIPInfo(ip);
    
    const windowStart = Date.now() - rule.windowMs;
    const recentRequests = ipInfo.requests.filter(r => r.timestamp > windowStart);
    
    if (recentRequests.length >= rule.maxRequests) {
      // Bloquear IP temporariamente
      this.blockIP(ip, rule.blockDurationMs, `Rate limit exceeded for ${endpoint}`);
      
      securityLogger.logRateLimitViolation(ip, endpoint);
      
      return {
        allowed: false,
        reason: 'Rate limit exceeded',
        retryAfter: Math.ceil(rule.blockDurationMs / 1000)
      };
    }
    
    return { allowed: true };
  }
  
  private async checkDDoSPatterns(
    ip: string,
    requestInfo: RequestInfo
  ): Promise<{ allowed: boolean; reason?: string; action?: string }> {
    const ipInfo = this.getOrCreateIPInfo(ip);
    const allRequests = [...ipInfo.requests, requestInfo];
    
    for (const pattern of this.ddosPatterns) {
      if (pattern.detector(allRequests)) {
        await securityLogger.logSuspiciousActivity(
          `Padrão DDoS detectado: ${pattern.name}`,
          {
            ip,
            pattern: pattern.name,
            description: pattern.description,
            severity: pattern.severity,
            requestCount: allRequests.length
          },
          pattern.severity
        );
        
        // Aplicar ação baseada no padrão
        switch (pattern.action) {
          case 'BLOCK':
            await this.blockIP(ip, this.calculateBlockDuration(pattern.severity), pattern.description);
            return {
              allowed: false,
              reason: `DDoS pattern detected: ${pattern.name}`,
              action: 'BLOCKED'
            };
            
          case 'THROTTLE':
            // Implementar throttling (delay)
            await this.throttleRequest(ip, 2000);
            return { allowed: true, action: 'THROTTLED' };
            
          case 'CAPTCHA':
            return {
              allowed: false,
              reason: 'CAPTCHA verification required',
              action: 'CAPTCHA_REQUIRED'
            };
            
          case 'LOG':
            // Apenas logar, permitir requisição
            break;
        }
      }
    }
    
    return { allowed: true };
  }
  
  private calculateBlockDuration(severity: string): number {
    switch (severity) {
      case 'LOW': return 5 * 60 * 1000; // 5 minutos
      case 'MEDIUM': return 30 * 60 * 1000; // 30 minutos
      case 'HIGH': return 2 * 60 * 60 * 1000; // 2 horas
      case 'CRITICAL': return 24 * 60 * 60 * 1000; // 24 horas
      default: return 15 * 60 * 1000; // 15 minutos
    }
  }
  
  private async throttleRequest(ip: string, delayMs: number): Promise<void> {
    // Implementar delay artificial
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  
  private async generateRequestFingerprint(
    ip: string,
    userAgent: string,
    endpoint: string
  ): Promise<string> {
    const data = `${ip}|${userAgent}|${endpoint}|${Date.now()}`;
    return await hash.sha256(data);
  }
  
  private cleanupOldRequests(ipInfo: IPInfo): void {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    ipInfo.requests = ipInfo.requests.filter(r => r.timestamp > oneHourAgo);
  }
  
  private startCleanupInterval(): void {
    this.cleanupInterval = setInterval(() => {
      this.performCleanup();
    }, 10 * 60 * 1000); // Limpeza a cada 10 minutos
  }
  
  private performCleanup(): void {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    
    // Remover IPs antigos e não bloqueados
    for (const [ip, info] of this.ipDatabase.entries()) {
      // Limpar requisições antigas
      info.requests = info.requests.filter(r => r.timestamp > oneDayAgo);
      
      // Remover bloqueios expirados
      if (info.blocked && now > info.blockExpiry) {
        info.blocked = false;
        info.blockExpiry = 0;
      }
      
      // Remover IPs inativos há mais de 7 dias
      if (!info.blocked && info.lastSeen < now - (7 * 24 * 60 * 60 * 1000)) {
        this.ipDatabase.delete(ip);
      }
    }
  }
  
  private initializeGlobalProtection(): void {
    // Monitorar uso global de recursos
    setInterval(() => {
      const stats = this.getStatistics();
      
      // Alertar se muitas requisições por minuto
      if (stats.requestsPerMinute > 1000) {
        securityLogger.logSuspiciousActivity(
          'Alto volume de requisições detectado',
          { requestsPerMinute: stats.requestsPerMinute },
          'HIGH'
        );
      }
      
      // Alertar se muitos IPs bloqueados
      if (stats.blockedIPs > 50) {
        securityLogger.logSuspiciousActivity(
          'Muitos IPs bloqueados - possível ataque distribuído',
          { blockedIPs: stats.blockedIPs },
          'CRITICAL'
        );
      }
    }, 60 * 1000); // Verificar a cada minuto
  }
  
  /**
   * Limpa todos os dados (para testes)
   */
  reset(): void {
    this.ipDatabase.clear();
    this.globalRequestCount = 0;
    this.startTime = Date.now();
  }
  
  /**
   * Destrói a instância e limpa recursos
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.ipDatabase.clear();
  }
}

// Instância singleton
export const ddosProtection = DDoSProtection.getInstance();

// Middleware para Express/Fastify
export const ddosMiddleware = async (
  req: any,
  res: any,
  next: any
): Promise<void> => {
  try {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const endpoint = req.path || req.url;
    const method = req.method;
    const userAgent = req.headers['user-agent'] || 'unknown';
    const contentLength = parseInt(req.headers['content-length'] || '0');
    
    const result = await ddosProtection.checkRequest(
      ip,
      endpoint,
      method,
      userAgent,
      contentLength
    );
    
    if (!result.allowed) {
      res.status(429).json({
        error: 'Too Many Requests',
        message: result.reason,
        retryAfter: result.retryAfter
      });
      return;
    }
    
    next();
  } catch (error) {
    console.error('Erro no middleware DDoS:', error);
    next(); // Permitir requisição em caso de erro
  }
};

// Hook para React
export const useDDoSProtection = () => {
  const checkRequest = async (
    endpoint: string,
    method: string = 'GET'
  ): Promise<boolean> => {
    const ip = 'client'; // Em um ambiente real, seria obtido do servidor
    const userAgent = navigator.userAgent;
    
    const result = await ddosProtection.checkRequest(
      ip,
      endpoint,
      method,
      userAgent
    );
    
    return result.allowed;
  };
  
  const getStatistics = () => ddosProtection.getStatistics();
  
  return {
    checkRequest,
    getStatistics
  };
};

console.log('🛡️ Sistema de proteção DDoS inicializado');

// Exportar para uso global
(window as any).__ddosProtection = ddosProtection;