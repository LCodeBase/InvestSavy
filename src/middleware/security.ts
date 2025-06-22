// Middleware de Segurança Avançado para InvestSavy

import { 
  SECURITY_HEADERS, 
  generateCSPString, 
  sanitizeInput, 
  validateNumber, 
  validateEmail,
  generateCSRFToken,
  isIPBlocked,
  RATE_LIMIT_CONFIG,
  INPUT_VALIDATION
} from '../config/security';

// Interface para requisições com informações de segurança
interface SecurityRequest extends Omit<Request, 'body'> {
  ip?: string;
  csrfToken?: string;
  rateLimitInfo?: {
    remaining: number;
    resetTime: Date;
  };
  body?: any;
}

// Classe para gerenciar rate limiting
class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map();

  isAllowed(ip: string): boolean {
    const now = Date.now();
    const key = ip;
    const record = this.requests.get(key);

    if (!record || now > record.resetTime) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + RATE_LIMIT_CONFIG.windowMs
      });
      return true;
    }

    if (record.count >= RATE_LIMIT_CONFIG.max) {
      return false;
    }

    record.count++;
    return true;
  }

  getRemainingRequests(ip: string): number {
    const record = this.requests.get(ip);
    if (!record || Date.now() > record.resetTime) {
      return RATE_LIMIT_CONFIG.max;
    }
    return Math.max(0, RATE_LIMIT_CONFIG.max - record.count);
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.requests.entries()) {
      if (now > record.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}

// Instância global do rate limiter
const rateLimiter = new RateLimiter();

// Cleanup periódico do rate limiter
setInterval(() => rateLimiter.cleanup(), 60000); // A cada minuto

// Middleware principal de segurança
export const securityMiddleware = () => {
  return (req: SecurityRequest, res: Response, next: () => void) => {
    try {
      // 1. Verificar IP bloqueado
      const clientIP = getClientIP(req);
      if (isIPBlocked(clientIP)) {
        console.warn(`Blocked IP attempted access: ${clientIP}`);
        return new Response('Access Denied', { status: 403 });
      }

      // 2. Rate Limiting
      if (!rateLimiter.isAllowed(clientIP)) {
        console.warn(`Rate limit exceeded for IP: ${clientIP}`);
        return new Response(JSON.stringify(RATE_LIMIT_CONFIG.message), {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(RATE_LIMIT_CONFIG.windowMs / 1000).toString()
          }
        });
      }

      // 3. Aplicar headers de segurança
      applySecurityHeaders(res);

      // 4. Gerar e anexar token CSRF
      req.csrfToken = generateCSRFToken();

      // 5. Adicionar informações de rate limit
      req.rateLimitInfo = {
        remaining: rateLimiter.getRemainingRequests(clientIP),
        resetTime: new Date(Date.now() + RATE_LIMIT_CONFIG.windowMs)
      };

      next();
    } catch (error) {
      console.error('Security middleware error:', error);
      return new Response('Internal Security Error', { status: 500 });
    }
  };
};

// Função para obter IP do cliente
function getClientIP(req: SecurityRequest): string {
  // Verifica vários headers para obter o IP real
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  const cfConnectingIP = req.headers.get('cf-connecting-ip');
  
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(',')[0].trim();
  
  return req.ip || '127.0.0.1';
}

// Função para aplicar headers de segurança
function applySecurityHeaders(res: Response): void {
  // Aplicar todos os headers de segurança
  Object.entries(SECURITY_HEADERS).forEach(([header, value]) => {
    res.headers.set(header, value);
  });

  // Aplicar CSP
  res.headers.set('Content-Security-Policy', generateCSPString());
}

// Middleware para validação de entrada
export const inputValidationMiddleware = () => {
  return (req: SecurityRequest, res: Response, next: () => void) => {
    try {
      if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        // Validar e sanitizar dados do corpo da requisição
        req.body = sanitizeRequestBody(req.body);
      }

      // Validar parâmetros da URL
      const url = new URL(req.url || '', 'http://localhost');
      url.searchParams.forEach((value, key) => {
        const sanitized = sanitizeInput(value);
        if (sanitized !== value) {
          url.searchParams.set(key, sanitized);
        }
      });

      next();
    } catch (error) {
      console.error('Input validation error:', error);
      return new Response('Invalid Input', { status: 400 });
    }
  };
};

// Função para sanitizar corpo da requisição
function sanitizeRequestBody(body: any): any {
  if (!body) return body;

  if (typeof body === 'string') {
    return sanitizeInput(body);
  }

  if (Array.isArray(body)) {
    return body.map(item => sanitizeRequestBody(item));
  }

  if (typeof body === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(body)) {
      const sanitizedKey = sanitizeInput(key);
      sanitized[sanitizedKey] = sanitizeRequestBody(value);
    }
    return sanitized;
  }

  return body;
}

// Middleware para proteção CSRF
export const csrfProtectionMiddleware = () => {
  return (req: SecurityRequest, res: Response, next: () => void) => {
    // Aplicar proteção CSRF apenas para métodos que modificam dados
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method || '')) {
      const token = req.headers.get('X-CSRF-Token');
      const sessionToken = req.csrfToken;

      if (!token || !sessionToken || token !== sessionToken) {
        console.warn('CSRF token validation failed');
        return new Response('CSRF Token Invalid', { status: 403 });
      }
    }

    next();
  };
};

// Middleware para logging de segurança
export const securityLoggingMiddleware = () => {
  return (req: SecurityRequest, res: Response, next: () => void) => {
    const startTime = Date.now();
    const clientIP = getClientIP(req);
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const method = req.method || 'GET';
    const url = req.url || '/';

    // Log da requisição
    console.log(`[SECURITY] ${new Date().toISOString()} - ${clientIP} - ${method} ${url} - ${userAgent}`);

    // Detectar atividade suspeita
    if (isSuspiciousRequest(req)) {
      console.warn(`[SUSPICIOUS] ${new Date().toISOString()} - ${clientIP} - ${method} ${url} - ${userAgent}`);
    }

    const originalEnd = (res as any).end;
    (res as any).end = function(...args: any[]) {
      const duration = Date.now() - startTime;
      console.log(`[SECURITY] ${new Date().toISOString()} - ${clientIP} - ${method} ${url} - ${(res as any).status} - ${duration}ms`);
      originalEnd.apply(this, args);
    };

    next();
  };
};

// Função para detectar requisições suspeitas
function isSuspiciousRequest(req: SecurityRequest): boolean {
  const url = req.url || '';
  const userAgent = req.headers.get('user-agent') || '';
  const method = req.method || 'GET';

  // Padrões suspeitos na URL
  const suspiciousPatterns = [
    /\.\.\//, // Path traversal
    /<script/i, // XSS attempts
    /union.*select/i, // SQL injection
    /exec\(/i, // Code injection
    /eval\(/i, // Code injection
    /javascript:/i, // JavaScript injection
    /vbscript:/i, // VBScript injection
    /data:text\/html/i, // Data URL injection
  ];

  // Verificar padrões suspeitos
  if (suspiciousPatterns.some(pattern => pattern.test(url))) {
    return true;
  }

  // User agents suspeitos
  const suspiciousUserAgents = [
    /sqlmap/i,
    /nikto/i,
    /nessus/i,
    /burp/i,
    /nmap/i,
    /masscan/i,
    /zap/i
  ];

  if (suspiciousUserAgents.some(pattern => pattern.test(userAgent))) {
    return true;
  }

  // Métodos HTTP incomuns
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
  if (!allowedMethods.includes(method)) {
    return true;
  }

  return false;
}

// Middleware para validação de arquivos
export const fileValidationMiddleware = () => {
  return (req: SecurityRequest, res: Response, next: () => void) => {
    // Implementar validação de upload de arquivos se necessário
    // Por enquanto, apenas log
    if (req.headers.get('content-type')?.includes('multipart/form-data')) {
      console.log('[FILE_UPLOAD] File upload detected, applying validation...');
      // Aqui você pode adicionar validação específica de arquivos
    }

    next();
  };
};

// Função utilitária para validar dados de formulário
export const validateFormData = (data: Record<string, any>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    // Validar strings
    if (typeof value === 'string') {
      if (value.length > INPUT_VALIDATION.maxStringLength) {
        errors.push(`${key} excede o tamanho máximo permitido`);
      }
      
      const sanitized = sanitizeInput(value);
      if (sanitized !== value) {
        errors.push(`${key} contém conteúdo não permitido`);
      }
    }

    // Validar números
    if (typeof value === 'number') {
      if (validateNumber(value) === null) {
        errors.push(`${key} não é um número válido`);
      }
    }

    // Validar emails
    if (key.toLowerCase().includes('email') && typeof value === 'string') {
      if (!validateEmail(value)) {
        errors.push(`${key} não é um email válido`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Exportar todas as funções de segurança
export {
  sanitizeInput,
  validateNumber,
  validateEmail,
  generateCSRFToken,
  isIPBlocked,
  getClientIP
};

// Configuração de middleware completo
export const setupSecurityMiddleware = () => {
  return [
    securityMiddleware(),
    inputValidationMiddleware(),
    csrfProtectionMiddleware(),
    securityLoggingMiddleware(),
    fileValidationMiddleware()
  ];
};