import bruteForceProtection from './brute-force-protection.js'
import security from './security.js'

const apiProtection = {
  // Configurações
  config: {
    // Configurações de rate limiting
    rateLimit: {
      enabled: true,
      windowMs: 15 * 60 * 1000, // 15 minutos
      maxRequests: 100,
      message: 'Muitas requisições. Tente novamente mais tarde.',
    },

    // Configurações de autenticação
    auth: {
      enabled: true,
      tokenExpiration: 24 * 60 * 60 * 1000, // 24 horas
      refreshTokenExpiration: 7 * 24 * 60 * 60 * 1000, // 7 dias
      maxLoginAttempts: 5,
      lockoutDuration: 30 * 60 * 1000, // 30 minutos
    },

    // Configurações de CORS
    cors: {
      enabled: true,
      origin: window.location.origin,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
      exposedHeaders: ['Content-Range', 'X-Content-Range'],
      credentials: true,
      maxAge: 86400,
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

  // Função para proteger endpoint
  protectEndpoint: (endpoint, options = {}) => {
    return async (req, res, next) => {
      try {
        // Verificar rate limiting
        if (apiProtection.config.rateLimit.enabled) {
          const identifier = req.ip || req.headers['x-forwarded-for']
          const blockStatus = bruteForceProtection.isBlocked(identifier)

          if (blockStatus.blocked) {
            return res.status(429).json({
              error: true,
              message: apiProtection.config.rateLimit.message,
              retryAfter: Math.ceil(blockStatus.remainingTime / 1000),
            })
          }

          bruteForceProtection.recordAttempt(identifier)
        }

        // Verificar autenticação
        if (apiProtection.config.auth.enabled && options.requireAuth) {
          const token = req.headers.authorization?.split(' ')[1]
          if (!token) {
            return res.status(401).json({
              error: true,
              message: 'Token de autenticação não fornecido',
            })
          }

          // Validar token
          try {
            const decoded = security.validateToken(token)
            req.user = decoded
          } catch (error) {
            return res.status(401).json({
              error: true,
              message: 'Token inválido ou expirado',
            })
          }
        }

        // Verificar CORS
        if (apiProtection.config.cors.enabled) {
          const origin = req.headers.origin
          if (origin && origin !== apiProtection.config.cors.origin) {
            return res.status(403).json({
              error: true,
              message: 'Origem não permitida',
            })
          }
        }

        // Sanitizar dados
        if (apiProtection.config.sanitization.enabled) {
          if (req.body) {
            req.body = apiProtection.sanitizeData(req.body)
          }
          if (req.query) {
            req.query = apiProtection.sanitizeData(req.query)
          }
          if (req.params) {
            req.params = apiProtection.sanitizeData(req.params)
          }
        }

        next()
      } catch (error) {
        console.error('Erro na proteção do endpoint:', error)
        res.status(500).json({
          error: true,
          message: 'Erro interno do servidor',
        })
      }
    }
  },

  // Função para sanitizar dados
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
          sanitized[key] = apiProtection.sanitizeData(value)
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

  // Função para validar dados
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

  // Função para gerar token de autenticação
  generateAuthToken: (user) => {
    return security.generateToken(
      user,
      apiProtection.config.auth.tokenExpiration
    )
  },

  // Função para gerar token de atualização
  generateRefreshToken: (user) => {
    return security.generateToken(
      user,
      apiProtection.config.auth.refreshTokenExpiration
    )
  },
}

export default apiProtection
