import security from './security.js'

const csrfProtection = {
  // Configurações
  config: {
    tokenLength: 32,
    tokenExpiration: 24 * 60 * 60 * 1000, // 24 horas
    cookieName: 'csrf_token',
  },

  // Armazenamento de tokens
  tokens: new Map(),

  // Função para gerar token CSRF
  generateToken: () => {
    const token = security.generateCSRFToken()
    const expiration = Date.now() + csrfProtection.config.tokenExpiration

    csrfProtection.tokens.set(token, {
      expiration,
      used: false,
    })

    // Definir cookie
    document.cookie = `${
      csrfProtection.config.cookieName
    }=${token}; path=/; secure; samesite=strict; max-age=${
      csrfProtection.config.tokenExpiration / 1000
    }`

    return token
  },

  // Função para validar token CSRF
  validateToken: (token) => {
    const tokenData = csrfProtection.tokens.get(token)

    if (!tokenData) {
      return false
    }

    // Verificar expiração
    if (Date.now() > tokenData.expiration) {
      csrfProtection.tokens.delete(token)
      return false
    }

    // Marcar token como usado
    tokenData.used = true
    csrfProtection.tokens.set(token, tokenData)

    return true
  },

  // Função para limpar tokens expirados
  cleanupTokens: () => {
    const now = Date.now()
    for (const [token, data] of csrfProtection.tokens.entries()) {
      if (now > data.expiration) {
        csrfProtection.tokens.delete(token)
      }
    }
  },

  // Função para obter token do cookie
  getTokenFromCookie: () => {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === csrfProtection.config.cookieName) {
        return value
      }
    }
    return null
  },

  // Função para adicionar token aos headers de requisição
  addTokenToHeaders: (headers = {}) => {
    const token =
      csrfProtection.getTokenFromCookie() || csrfProtection.generateToken()
    return {
      ...headers,
      'X-CSRF-Token': token,
    }
  },

  // Função para verificar token nos headers de requisição
  verifyRequestHeaders: (headers) => {
    const token = headers['X-CSRF-Token']
    if (!token) {
      return false
    }
    return csrfProtection.validateToken(token)
  },
}

// Limpar tokens expirados periodicamente
setInterval(() => {
  csrfProtection.cleanupTokens()
}, 60 * 60 * 1000) // A cada hora

export default csrfProtection
