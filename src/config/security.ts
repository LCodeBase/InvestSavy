import { createClient } from '@supabase/supabase-js'
import { AuthFlowType } from '@supabase/supabase-js'

// Configurações de segurança
export const securityConfig = {
  // Configurações de rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por janela
  },

  // Configurações de senha
  password: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },

  // Configurações de sessão
  session: {
    maxAge: 24 * 60 * 60, // 24 horas
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  },

  // Configurações de CORS
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },

  // Configurações de CSP
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:', 'https:'],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'none'"],
    frameSrc: ["'none'"],
  },

  // Configurações de headers de segurança
  headers: {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'X-XSS-Protection': '1; mode=block',
  },
}

// Cliente Supabase com configurações de segurança
export const supabase = createClient(
  securityConfig.supabase.url!,
  securityConfig.supabase.anonKey!,
  securityConfig.supabase.options
)

// Função para validar força da senha
export const validatePassword = (password: string): boolean => {
  const {
    minLength,
    requireUppercase,
    requireLowercase,
    requireNumbers,
    requireSpecialChars,
  } = securityConfig.password

  if (password.length < minLength) return false
  if (requireUppercase && !/[A-Z]/.test(password)) return false
  if (requireLowercase && !/[a-z]/.test(password)) return false
  if (requireNumbers && !/\d/.test(password)) return false
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return false

  return true
}

// Função para sanitizar inputs
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove caracteres HTML
    .replace(/javascript:/gi, '') // Remove protocolos javascript
    .trim()
}

// Função para gerar token CSRF
export const generateCSRFToken = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}
