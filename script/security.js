// Funções de Segurança
const security = {
  // Sanitização de entrada
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  },

  // Validação de email
  validateEmail: (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  },

  // Validação de senha forte
  validatePassword: (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    )
  },

  // Proteção contra CSRF
  generateCSRFToken: () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  },

  // Validação de token CSRF
  validateCSRFToken: (token) => {
    // Implementar validação do token
    return true
  },

  // Proteção contra SQL Injection
  sanitizeSQL: (input) => {
    if (typeof input !== 'string') return input
    return input.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case '\0':
          return '\\0'
        case '\x08':
          return '\\b'
        case '\x09':
          return '\\t'
        case '\x1a':
          return '\\z'
        case '\n':
          return '\\n'
        case '\r':
          return '\\r'
        case '"':
        case "'":
        case '\\':
        case '%':
          return '\\' + char
      }
    })
  },

  // Proteção contra XSS em atributos
  sanitizeAttribute: (value) => {
    return value.replace(/[&<>"']/g, (char) => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }
      return entities[char]
    })
  },

  // Validação de URL
  validateURL: (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  // Proteção contra ataques de timing
  constantTimeComparison: (a, b) => {
    if (typeof a !== 'string' || typeof b !== 'string') {
      return false
    }

    if (a.length !== b.length) {
      return false
    }

    let result = 0
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i)
    }

    return result === 0
  },
}

export default security
