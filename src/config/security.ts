import { createClient } from '@supabase/supabase-js'
import { AuthFlowType } from '@supabase/supabase-js'

// Configurações de segurança
export const securityConfig = {
  // Configurações do Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options: {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce' as AuthFlowType, // Corrigindo o tipo do flowType
      },
    },
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
    maxAge: 24 * 60 * 60, // 24 horas em segundos
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  },

  // Configurações de CORS
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },

  // Configurações de rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por janela
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
