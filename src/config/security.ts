// Configurações de Segurança Avançadas para InvestSavy

// Content Security Policy (CSP) - Proteção contra XSS
export const CSP_POLICY = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Necessário para React em desenvolvimento
    "'unsafe-eval'", // Necessário para desenvolvimento
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
    'https://connect.facebook.net',
    'https://www.facebook.com',
    'https://apis.google.com',
    'https://accounts.google.com'
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
    'https://cdnjs.cloudflare.com'
  ],
  'img-src': [
    "'self'",
    'data:',
    'blob:',
    'https:',
    'http:' // Para desenvolvimento local
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com',
    'https://cdnjs.cloudflare.com'
  ],
  'connect-src': [
    "'self'",
    'https://api.investsavy.com.br',
    'https://www.google-analytics.com',
    'https://analytics.google.com',
    'https://stats.g.doubleclick.net',
    'wss://localhost:*', // Para desenvolvimento
    'ws://localhost:*' // Para desenvolvimento
  ],
  'frame-src': [
    "'self'",
    'https://www.youtube.com',
    'https://www.facebook.com',
    'https://accounts.google.com'
  ],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': []
};

// Headers de Segurança
export const SECURITY_HEADERS = {
  // Proteção contra clickjacking
  'X-Frame-Options': 'DENY',
  
  // Proteção contra MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Proteção XSS do navegador
  'X-XSS-Protection': '1; mode=block',
  
  // Força HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Controla informações do referrer
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Política de permissões
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'accelerometer=()',
    'gyroscope=()'
  ].join(', '),
  
  // Cross-Origin policies
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin'
};

// Configurações de CORS
export const CORS_CONFIG = {
  origin: [
    'https://investsavy.online',
    'https://www.investsavy.online',
    'http://localhost:8080', // Para desenvolvimento
    'http://localhost:3000', // Para desenvolvimento
    'http://127.0.0.1:8080' // Para desenvolvimento
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'X-CSRF-Token'
  ],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400 // 24 horas
};

// Configurações de Rate Limiting
export const RATE_LIMIT_CONFIG = {
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 requests por IP por janela
  message: {
    error: 'Muitas tentativas. Tente novamente em 15 minutos.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
};

// Configurações de validação de entrada
export const INPUT_VALIDATION = {
  maxStringLength: 1000,
  maxNumberValue: 999999999,
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  maxFileSize: 5 * 1024 * 1024, // 5MB
  sanitizeHtml: true,
  stripScripts: true
};

// Configurações de sessão segura
export const SESSION_CONFIG = {
  name: 'investsavy_session',
  secret: process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
    httpOnly: true, // Previne acesso via JavaScript
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    sameSite: 'strict' as const // Proteção CSRF
  }
};

// Lista de IPs bloqueados (exemplo)
export const BLOCKED_IPS = [
  // Adicione IPs maliciosos conhecidos aqui
];

// Configurações de logging de segurança
export const SECURITY_LOGGING = {
  logFailedLogins: true,
  logSuspiciousActivity: true,
  logRateLimitViolations: true,
  logCSPViolations: true,
  maxLogSize: 100 * 1024 * 1024, // 100MB
  logRetentionDays: 30
};

// Função para gerar CSP string
export const generateCSPString = (): string => {
  return Object.entries(CSP_POLICY)
    .map(([directive, sources]) => {
      if (Array.isArray(sources) && sources.length > 0) {
        return `${directive} ${sources.join(' ')}`;
      } else if (sources.length === 0) {
        return directive;
      }
      return '';
    })
    .filter(Boolean)
    .join('; ');
};

// Função para validar entrada de dados
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove scripts maliciosos
  let sanitized = input.replace(/<script[^>]*>.*?<\/script>/gi, '');
  
  // Remove eventos JavaScript
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // Remove javascript: URLs
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Remove data: URLs suspeitas
  sanitized = sanitized.replace(/data:(?!image\/)/gi, '');
  
  // Limita o tamanho
  if (sanitized.length > INPUT_VALIDATION.maxStringLength) {
    sanitized = sanitized.substring(0, INPUT_VALIDATION.maxStringLength);
  }
  
  return sanitized.trim();
};

// Função para validar números
export const validateNumber = (value: any): number | null => {
  const num = Number(value);
  if (isNaN(num) || !isFinite(num)) return null;
  if (Math.abs(num) > INPUT_VALIDATION.maxNumberValue) return null;
  return num;
};

// Função para validar email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Função para gerar token CSRF
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Função para verificar se IP está bloqueado
export const isIPBlocked = (ip: string): boolean => {
  return BLOCKED_IPS.includes(ip);
};

// Configurações de backup de segurança
export const BACKUP_CONFIG = {
  enabled: true,
  frequency: 'daily',
  retention: 30, // dias
  encryption: true,
  location: 'secure-cloud-storage'
};