import security from './security.js'
import sqlInjectionProtection from './sql-injection-protection.js'

const supabaseConfig = {
  // Configurações de segurança
  security: {
    // Configurações de autenticação
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      debug: false,
    },

    // Configurações de CORS
    cors: {
      origin: window.location.origin,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
      exposedHeaders: ['Content-Range', 'X-Content-Range'],
      credentials: true,
      maxAge: 86400,
    },

    // Configurações de rate limiting
    rateLimit: {
      enabled: true,
      maxRequests: 100,
      windowMs: 15 * 60 * 1000, // 15 minutos
    },

    // Configurações de sanitização
    sanitization: {
      enabled: true,
      maxLength: 10000,
      allowedTags: [
        'p',
        'br',
        'strong',
        'em',
        'u',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'ul',
        'ol',
        'li',
        'a',
        'img',
      ],
      allowedAttributes: {
        a: ['href', 'title', 'target'],
        img: ['src', 'alt', 'title', 'width', 'height'],
      },
    },
  },

  // Função para sanitizar dados antes de enviar ao Supabase
  sanitizeData: (data) => {
    if (!data) return null

    // Sanitizar objeto
    if (typeof data === 'object') {
      const sanitized = {}
      for (const [key, value] of Object.entries(data)) {
        // Sanitizar string
        if (typeof value === 'string') {
          sanitized[key] = security.sanitizeInput(value)
        }
        // Sanitizar objeto
        else if (typeof value === 'object') {
          sanitized[key] = supabaseConfig.sanitizeData(value)
        }
        // Manter outros tipos
        else {
          sanitized[key] = value
        }
      }
      return sanitized
    }

    // Sanitizar string
    if (typeof data === 'string') {
      return security.sanitizeInput(data)
    }

    return data
  },

  // Função para validar dados antes de enviar ao Supabase
  validateData: (data, schema) => {
    if (!data || !schema) return false

    // Validar campos obrigatórios
    for (const [field, rules] of Object.entries(schema)) {
      // Verificar campo obrigatório
      if (rules.required && !data[field]) {
        return false
      }

      // Validar tipo
      if (data[field] && typeof data[field] !== rules.type) {
        return false
      }

      // Validar tamanho mínimo
      if (rules.minLength && data[field].length < rules.minLength) {
        return false
      }

      // Validar tamanho máximo
      if (rules.maxLength && data[field].length > rules.maxLength) {
        return false
      }

      // Validar formato
      if (rules.pattern && !rules.pattern.test(data[field])) {
        return false
      }
    }

    return true
  },

  // Função para construir query segura
  buildSafeQuery: (table, conditions = {}, options = {}) => {
    return sqlInjectionProtection.buildSafeQuery(table, conditions, options)
  },

  // Função para validar query
  validateQuery: (query) => {
    return sqlInjectionProtection.validateQuery(query)
  },

  // Função para sanitizar parâmetros
  sanitizeParams: (params) => {
    return sqlInjectionProtection.sanitizeParams(params)
  },
}

export default supabaseConfig
