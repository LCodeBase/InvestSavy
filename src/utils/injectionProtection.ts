/**
 * Sistema de proteção contra SQL Injection, XSS, Command Injection e outras vulnerabilidades
 * Implementa validação e sanitização avançada de entrada
 */

import { securityLogger } from './securityLogger';
import { hash } from './encryption';

// Tipos para proteção contra injeção
interface ValidationRule {
  name: string;
  pattern: RegExp;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  action: 'LOG' | 'SANITIZE' | 'BLOCK' | 'ALERT';
}

interface SanitizationOptions {
  allowHtml?: boolean;
  allowScripts?: boolean;
  allowSql?: boolean;
  allowCommands?: boolean;
  maxLength?: number;
  encoding?: 'html' | 'url' | 'base64' | 'none';
}

interface InjectionAttempt {
  type: string;
  input: string;
  sanitized: string;
  severity: string;
  timestamp: number;
  ip?: string;
  userAgent?: string;
}

// Padrões de ataque conhecidos
const INJECTION_PATTERNS: ValidationRule[] = [
  // SQL Injection
  {
    name: 'SQL_INJECTION_UNION',
    pattern: /\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\s*\(/i,
    severity: 'CRITICAL',
    description: 'Tentativa de SQL Injection com UNION/SELECT',
    action: 'BLOCK'
  },
  {
    name: 'SQL_INJECTION_COMMENT',
    pattern: /(--|#|\/\*|\*\/)/,
    severity: 'HIGH',
    description: 'Comentários SQL suspeitos',
    action: 'SANITIZE'
  },
  {
    name: 'SQL_INJECTION_QUOTES',
    pattern: /('\s*(or|and)\s*')|('\s*=\s*')/i,
    severity: 'HIGH',
    description: 'Padrão de SQL Injection com aspas',
    action: 'BLOCK'
  },
  {
    name: 'SQL_INJECTION_BOOLEAN',
    pattern: /\b(or|and)\s+(1\s*=\s*1|true|false)\b/i,
    severity: 'CRITICAL',
    description: 'SQL Injection booleana',
    action: 'BLOCK'
  },
  
  // XSS (Cross-Site Scripting)
  {
    name: 'XSS_SCRIPT_TAG',
    pattern: /<script[^>]*>.*?<\/script>/gi,
    severity: 'CRITICAL',
    description: 'Tag script maliciosa',
    action: 'BLOCK'
  },
  {
    name: 'XSS_JAVASCRIPT_PROTOCOL',
    pattern: /javascript\s*:/i,
    severity: 'HIGH',
    description: 'Protocolo JavaScript suspeito',
    action: 'SANITIZE'
  },
  {
    name: 'XSS_EVENT_HANDLERS',
    pattern: /\bon\w+\s*=/i,
    severity: 'HIGH',
    description: 'Event handlers JavaScript',
    action: 'SANITIZE'
  },
  {
    name: 'XSS_IFRAME_EMBED',
    pattern: /<(iframe|embed|object|applet)[^>]*>/i,
    severity: 'MEDIUM',
    description: 'Tags de incorporação suspeitas',
    action: 'SANITIZE'
  },
  
  // Command Injection
  {
    name: 'COMMAND_INJECTION_PIPES',
    pattern: /[|&;`$(){}\[\]]/,
    severity: 'HIGH',
    description: 'Caracteres de command injection',
    action: 'SANITIZE'
  },
  {
    name: 'COMMAND_INJECTION_COMMANDS',
    pattern: /\b(cat|ls|dir|type|copy|move|del|rm|chmod|chown|ps|kill|wget|curl|nc|netcat)\b/i,
    severity: 'CRITICAL',
    description: 'Comandos do sistema suspeitos',
    action: 'BLOCK'
  },
  
  // LDAP Injection
  {
    name: 'LDAP_INJECTION',
    pattern: /[()\*\\\x00]/,
    severity: 'HIGH',
    description: 'Caracteres de LDAP injection',
    action: 'SANITIZE'
  },
  
  // XML Injection
  {
    name: 'XML_INJECTION',
    pattern: /<\?xml|<!\[CDATA\[|<!DOCTYPE/i,
    severity: 'MEDIUM',
    description: 'Estruturas XML suspeitas',
    action: 'SANITIZE'
  },
  
  // Path Traversal
  {
    name: 'PATH_TRAVERSAL',
    pattern: /\.\.[\/\\]|[\/\\]\.\.[\/\\]/,
    severity: 'HIGH',
    description: 'Tentativa de path traversal',
    action: 'BLOCK'
  },
  
  // NoSQL Injection
  {
    name: 'NOSQL_INJECTION',
    pattern: /\$where|\$ne|\$gt|\$lt|\$regex|\$or|\$and/i,
    severity: 'HIGH',
    description: 'Operadores NoSQL suspeitos',
    action: 'SANITIZE'
  },
  
  // Template Injection
  {
    name: 'TEMPLATE_INJECTION',
    pattern: /\{\{.*?\}\}|\{%.*?%\}|\$\{.*?\}/,
    severity: 'MEDIUM',
    description: 'Sintaxe de template injection',
    action: 'SANITIZE'
  },
  
  // Email Header Injection
  {
    name: 'EMAIL_HEADER_INJECTION',
    pattern: /\r\n|\n|\r|%0a|%0d/i,
    severity: 'MEDIUM',
    description: 'Caracteres de quebra de linha em email',
    action: 'SANITIZE'
  }
];

// Listas de palavras perigosas
const DANGEROUS_KEYWORDS = {
  sql: ['union', 'select', 'insert', 'update', 'delete', 'drop', 'create', 'alter', 'exec', 'execute', 'sp_', 'xp_'],
  xss: ['script', 'javascript', 'vbscript', 'onload', 'onerror', 'onclick', 'onmouseover', 'alert', 'confirm', 'prompt'],
  commands: ['cat', 'ls', 'dir', 'type', 'copy', 'move', 'del', 'rm', 'chmod', 'chown', 'ps', 'kill', 'wget', 'curl', 'nc', 'netcat'],
  paths: ['../', '..\\', '/etc/', '/var/', '/usr/', '/bin/', '/sbin/', 'c:\\', 'd:\\'],
  protocols: ['file://', 'ftp://', 'gopher://', 'ldap://', 'dict://']
};

// Classe principal de proteção contra injeção
export class InjectionProtection {
  private static instance: InjectionProtection;
  private injectionAttempts: InjectionAttempt[] = [];
  private customPatterns: ValidationRule[] = [];
  
  private constructor() {
    this.initializeProtection();
  }
  
  static getInstance(): InjectionProtection {
    if (!InjectionProtection.instance) {
      InjectionProtection.instance = new InjectionProtection();
    }
    return InjectionProtection.instance;
  }
  
  /**
   * Valida e sanitiza entrada do usuário
   */
  async validateAndSanitize(
    input: string,
    options: SanitizationOptions = {},
    context?: { ip?: string; userAgent?: string; field?: string }
  ): Promise<{
    isValid: boolean;
    sanitized: string;
    threats: string[];
    severity: string;
  }> {
    if (!input || typeof input !== 'string') {
      return {
        isValid: true,
        sanitized: input || '',
        threats: [],
        severity: 'NONE'
      };
    }
    
    const threats: string[] = [];
    let sanitized = input;
    let maxSeverity = 'NONE';
    
    // Verificar comprimento máximo
    if (options.maxLength && input.length > options.maxLength) {
      sanitized = sanitized.substring(0, options.maxLength);
      threats.push('INPUT_TOO_LONG');
    }
    
    // Verificar padrões de injeção
    const allPatterns = [...INJECTION_PATTERNS, ...this.customPatterns];
    
    for (const pattern of allPatterns) {
      if (pattern.pattern.test(input)) {
        threats.push(pattern.name);
        
        // Atualizar severidade máxima
        if (this.compareSeverity(pattern.severity, maxSeverity) > 0) {
          maxSeverity = pattern.severity;
        }
        
        // Aplicar ação
        switch (pattern.action) {
          case 'BLOCK':
            await this.logInjectionAttempt({
              type: pattern.name,
              input,
              sanitized: '[BLOCKED]',
              severity: pattern.severity,
              timestamp: Date.now(),
              ip: context?.ip,
              userAgent: context?.userAgent
            });
            
            return {
              isValid: false,
              sanitized: '',
              threats,
              severity: maxSeverity
            };
            
          case 'SANITIZE':
            sanitized = this.applySanitization(sanitized, pattern);
            break;
            
          case 'ALERT':
            await this.sendSecurityAlert(pattern, input, context);
            break;
        }
      }
    }
    
    // Aplicar sanitização adicional baseada nas opções
    sanitized = this.applyAdditionalSanitization(sanitized, options);
    
    // Logar tentativa se ameaças foram detectadas
    if (threats.length > 0) {
      await this.logInjectionAttempt({
        type: threats.join(', '),
        input,
        sanitized,
        severity: maxSeverity,
        timestamp: Date.now(),
        ip: context?.ip,
        userAgent: context?.userAgent
      });
    }
    
    return {
      isValid: threats.length === 0 || maxSeverity === 'LOW',
      sanitized,
      threats,
      severity: maxSeverity
    };
  }
  
  /**
   * Sanitiza especificamente para SQL
   */
  sanitizeForSQL(input: string): string {
    if (!input) return input;
    
    return input
      .replace(/'/g, "''")
      .replace(/"/g, '""')
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '')
      .replace(/\bexec\b/gi, '')
      .replace(/\bunion\b/gi, '')
      .replace(/\bselect\b/gi, '')
      .replace(/\binsert\b/gi, '')
      .replace(/\bupdate\b/gi, '')
      .replace(/\bdelete\b/gi, '')
      .replace(/\bdrop\b/gi, '')
      .replace(/\bcreate\b/gi, '')
      .replace(/\balter\b/gi, '');
  }
  
  /**
   * Sanitiza especificamente para HTML/XSS
   */
  sanitizeForHTML(input: string, allowBasicTags: boolean = false): string {
    if (!input) return input;
    
    let sanitized = input;
    
    if (!allowBasicTags) {
      // Remover todas as tags HTML
      sanitized = sanitized.replace(/<[^>]*>/g, '');
    } else {
      // Permitir apenas tags básicas seguras
      const allowedTags = ['b', 'i', 'u', 'strong', 'em', 'p', 'br'];
      sanitized = sanitized.replace(/<(?!\/?(?:${allowedTags.join('|')})\b)[^>]*>/gi, '');
    }
    
    // Escapar caracteres especiais
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
    
    // Remover protocolos perigosos
    sanitized = sanitized.replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/file:/gi, '');
    
    return sanitized;
  }
  
  /**
   * Sanitiza para uso em URLs
   */
  sanitizeForURL(input: string): string {
    if (!input) return input;
    
    return encodeURIComponent(input)
      .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));
  }
  
  /**
   * Valida email contra header injection
   */
  validateEmail(email: string): { isValid: boolean; sanitized: string } {
    if (!email) return { isValid: false, sanitized: '' };
    
    // Remover caracteres de quebra de linha
    const sanitized = email.replace(/[\r\n\x00]/g, '');
    
    // Validar formato básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(sanitized) && sanitized === email;
    
    return { isValid, sanitized };
  }
  
  /**
   * Valida número contra injection
   */
  validateNumber(input: string | number): { isValid: boolean; value: number | null } {
    if (typeof input === 'number') {
      return { isValid: !isNaN(input) && isFinite(input), value: input };
    }
    
    if (typeof input !== 'string') {
      return { isValid: false, value: null };
    }
    
    // Remover caracteres não numéricos (exceto . e -)
    const sanitized = input.replace(/[^0-9.-]/g, '');
    const parsed = parseFloat(sanitized);
    
    return {
      isValid: !isNaN(parsed) && isFinite(parsed) && sanitized === input,
      value: isNaN(parsed) ? null : parsed
    };
  }
  
  /**
   * Adiciona padrão customizado de validação
   */
  addCustomPattern(pattern: ValidationRule): void {
    this.customPatterns.push(pattern);
  }
  
  /**
   * Obtém estatísticas de tentativas de injeção
   */
  getInjectionStatistics(): {
    totalAttempts: number;
    recentAttempts: number;
    topThreats: Array<{ type: string; count: number }>;
    severityDistribution: Record<string, number>;
    recentAttempts24h: InjectionAttempt[];
  } {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const oneHourAgo = now - (60 * 60 * 1000);
    
    const recentAttempts24h = this.injectionAttempts.filter(a => a.timestamp > oneDayAgo);
    const recentAttemptsHour = this.injectionAttempts.filter(a => a.timestamp > oneHourAgo);
    
    // Contar tipos de ameaças
    const threatCounts = new Map<string, number>();
    recentAttempts24h.forEach(attempt => {
      const types = attempt.type.split(', ');
      types.forEach(type => {
        threatCounts.set(type, (threatCounts.get(type) || 0) + 1);
      });
    });
    
    const topThreats = Array.from(threatCounts.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Distribuição por severidade
    const severityDistribution: Record<string, number> = {};
    recentAttempts24h.forEach(attempt => {
      severityDistribution[attempt.severity] = (severityDistribution[attempt.severity] || 0) + 1;
    });
    
    return {
      totalAttempts: this.injectionAttempts.length,
      recentAttempts: recentAttemptsHour.length,
      topThreats,
      severityDistribution,
      recentAttempts24h
    };
  }
  
  // Métodos privados
  private compareSeverity(severity1: string, severity2: string): number {
    const levels = { 'NONE': 0, 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3, 'CRITICAL': 4 };
    return (levels[severity1 as keyof typeof levels] || 0) - (levels[severity2 as keyof typeof levels] || 0);
  }
  
  private applySanitization(input: string, pattern: ValidationRule): string {
    switch (pattern.name) {
      case 'SQL_INJECTION_COMMENT':
        return input.replace(/(--|#|\/\*|\*\/)/g, '');
        
      case 'XSS_SCRIPT_TAG':
        return input.replace(/<script[^>]*>.*?<\/script>/gi, '');
        
      case 'XSS_JAVASCRIPT_PROTOCOL':
        return input.replace(/javascript\s*:/gi, '');
        
      case 'XSS_EVENT_HANDLERS':
        return input.replace(/\bon\w+\s*=/gi, '');
        
      case 'COMMAND_INJECTION_PIPES':
        return input.replace(/[|&;`$(){}\[\]]/g, '');
        
      case 'LDAP_INJECTION':
        return input.replace(/[()\*\\\x00]/g, '');
        
      case 'PATH_TRAVERSAL':
        return input.replace(/\.\.[\/\\]|[\/\\]\.\.[\/\\]/g, '');
        
      case 'EMAIL_HEADER_INJECTION':
        return input.replace(/\r\n|\n|\r|%0a|%0d/gi, '');
        
      default:
        return input.replace(pattern.pattern, '');
    }
  }
  
  private applyAdditionalSanitization(input: string, options: SanitizationOptions): string {
    let sanitized = input;
    
    if (!options.allowHtml) {
      sanitized = this.sanitizeForHTML(sanitized);
    }
    
    if (!options.allowScripts) {
      sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, '');
    }
    
    if (!options.allowSql) {
      sanitized = this.sanitizeForSQL(sanitized);
    }
    
    if (options.encoding) {
      switch (options.encoding) {
        case 'html':
          sanitized = this.sanitizeForHTML(sanitized);
          break;
        case 'url':
          sanitized = this.sanitizeForURL(sanitized);
          break;
        case 'base64':
          sanitized = btoa(sanitized);
          break;
      }
    }
    
    return sanitized;
  }
  
  private async logInjectionAttempt(attempt: InjectionAttempt): Promise<void> {
    this.injectionAttempts.push(attempt);
    
    // Manter apenas os últimos 1000 registros
    if (this.injectionAttempts.length > 1000) {
      this.injectionAttempts = this.injectionAttempts.slice(-1000);
    }
    
    // Logar no sistema de segurança
    await securityLogger.logSuspiciousActivity(
      `Tentativa de injeção detectada: ${attempt.type}`,
      {
        type: attempt.type,
        input: attempt.input.substring(0, 200), // Limitar tamanho do log
        sanitized: attempt.sanitized.substring(0, 200),
        ip: attempt.ip,
        userAgent: attempt.userAgent
      },
      attempt.severity as any
    );
  }
  
  private async sendSecurityAlert(
    pattern: ValidationRule,
    input: string,
    context?: { ip?: string; userAgent?: string; field?: string }
  ): Promise<void> {
    await securityLogger.logEvent(
      'SECURITY_ALERT',
      'HIGH',
      `Alerta de segurança: ${pattern.description}`,
      {
        pattern: pattern.name,
        input: input.substring(0, 100),
        severity: pattern.severity,
        ip: context?.ip,
        userAgent: context?.userAgent,
        field: context?.field
      }
    );
  }
  
  private initializeProtection(): void {
    // Limpar registros antigos periodicamente
    setInterval(() => {
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      this.injectionAttempts = this.injectionAttempts.filter(a => a.timestamp > oneDayAgo);
    }, 60 * 60 * 1000); // A cada hora
  }
}

// Instância singleton
export const injectionProtection = InjectionProtection.getInstance();

// Funções utilitárias
export const sanitizeInput = async (
  input: string,
  options?: SanitizationOptions
): Promise<string> => {
  const result = await injectionProtection.validateAndSanitize(input, options);
  return result.sanitized;
};

export const validateInput = async (
  input: string,
  options?: SanitizationOptions
): Promise<boolean> => {
  const result = await injectionProtection.validateAndSanitize(input, options);
  return result.isValid;
};

export const sanitizeSQL = (input: string): string => {
  return injectionProtection.sanitizeForSQL(input);
};

export const sanitizeHTML = (input: string, allowBasicTags?: boolean): string => {
  return injectionProtection.sanitizeForHTML(input, allowBasicTags);
};

export const sanitizeURL = (input: string): string => {
  return injectionProtection.sanitizeForURL(input);
};

export const validateEmail = (email: string): { isValid: boolean; sanitized: string } => {
  return injectionProtection.validateEmail(email);
};

export const validateNumber = (input: string | number): { isValid: boolean; value: number | null } => {
  return injectionProtection.validateNumber(input);
};

// Middleware para validação de formulários
export const createValidationMiddleware = (options: SanitizationOptions = {}) => {
  return async (req: any, res: any, next: any) => {
    try {
      const ip = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];
      
      // Validar body
      if (req.body && typeof req.body === 'object') {
        for (const [key, value] of Object.entries(req.body)) {
          if (typeof value === 'string') {
            const result = await injectionProtection.validateAndSanitize(
              value,
              options,
              { ip, userAgent, field: key }
            );
            
            if (!result.isValid && result.severity === 'CRITICAL') {
              return res.status(400).json({
                error: 'Invalid input detected',
                field: key,
                threats: result.threats
              });
            }
            
            req.body[key] = result.sanitized;
          }
        }
      }
      
      // Validar query parameters
      if (req.query && typeof req.query === 'object') {
        for (const [key, value] of Object.entries(req.query)) {
          if (typeof value === 'string') {
            const result = await injectionProtection.validateAndSanitize(
              value,
              options,
              { ip, userAgent, field: key }
            );
            
            if (!result.isValid && result.severity === 'CRITICAL') {
              return res.status(400).json({
                error: 'Invalid query parameter',
                field: key,
                threats: result.threats
              });
            }
            
            req.query[key] = result.sanitized;
          }
        }
      }
      
      next();
    } catch (error) {
      console.error('Erro no middleware de validação:', error);
      next(); // Permitir requisição em caso de erro
    }
  };
};

// Hook para React
export const useInjectionProtection = () => {
  const sanitize = async (input: string, options?: SanitizationOptions) => {
    return await sanitizeInput(input, options);
  };
  
  const validate = async (input: string, options?: SanitizationOptions) => {
    return await validateInput(input, options);
  };
  
  const getStatistics = () => {
    return injectionProtection.getInjectionStatistics();
  };
  
  return {
    sanitize,
    validate,
    sanitizeSQL,
    sanitizeHTML,
    sanitizeURL,
    validateEmail,
    validateNumber,
    getStatistics
  };
};

console.log('🛡️ Sistema de proteção contra injeção inicializado');

// Exportar para uso global
(window as any).__injectionProtection = injectionProtection;