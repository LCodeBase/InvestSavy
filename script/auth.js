import bruteForceProtection from './brute-force-protection.js'
import security from './security.js'

const auth = {
  // Função para autenticar usuário
  async login(email, password) {
    try {
      // Sanitizar inputs
      const sanitizedEmail = security.sanitizeInput(email)
      const sanitizedPassword = security.sanitizeInput(password)

      // Validar email
      if (!security.validateEmail(sanitizedEmail)) {
        throw new Error('Email inválido')
      }

      // Verificar bloqueio por força bruta
      const blockStatus = bruteForceProtection.isBlocked(sanitizedEmail)
      if (blockStatus.blocked) {
        throw new Error(
          `Conta temporariamente bloqueada. Tente novamente em ${Math.ceil(
            blockStatus.remainingTime / 60000
          )} minutos.`
        )
      }

      // Registrar tentativa
      const attempts = bruteForceProtection.recordAttempt(sanitizedEmail)

      // Simular autenticação
      if (
        sanitizedEmail === 'teste@teste.com' &&
        sanitizedPassword === 'senha123'
      ) {
        // Limpar tentativas em caso de sucesso
        bruteForceProtection.clearAttempts(sanitizedEmail)
        return {
          success: true,
          user: {
            id: 1,
            email: sanitizedEmail,
            name: 'Usuário Teste',
          },
        }
      }

      // Verificar se excedeu tentativas
      if (attempts >= bruteForceProtection.config.maxAttempts) {
        throw new Error(
          'Número máximo de tentativas excedido. Tente novamente mais tarde.'
        )
      }

      throw new Error('Email ou senha inválidos')
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },

  // Função para registrar novo usuário
  async register(email, password, name) {
    try {
      // Sanitizar inputs
      const sanitizedEmail = security.sanitizeInput(email)
      const sanitizedPassword = security.sanitizeInput(password)
      const sanitizedName = security.sanitizeInput(name)

      // Validar email
      if (!security.validateEmail(sanitizedEmail)) {
        throw new Error('Email inválido')
      }

      // Validar senha
      if (!security.validatePassword(sanitizedPassword)) {
        throw new Error(
          'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais'
        )
      }

      // Simular registro
      return {
        success: true,
        user: {
          id: 1,
          email: sanitizedEmail,
          name: sanitizedName,
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },

  // Função para recuperar senha
  async recoverPassword(email) {
    try {
      // Sanitizar email
      const sanitizedEmail = security.sanitizeInput(email)

      // Validar email
      if (!security.validateEmail(sanitizedEmail)) {
        throw new Error('Email inválido')
      }

      // Verificar bloqueio por força bruta
      const blockStatus = bruteForceProtection.isBlocked(sanitizedEmail)
      if (blockStatus.blocked) {
        throw new Error(
          `Conta temporariamente bloqueada. Tente novamente em ${Math.ceil(
            blockStatus.remainingTime / 60000
          )} minutos.`
        )
      }

      // Registrar tentativa
      const attempts = bruteForceProtection.recordAttempt(sanitizedEmail)

      // Verificar se excedeu tentativas
      if (attempts >= bruteForceProtection.config.maxAttempts) {
        throw new Error(
          'Número máximo de tentativas excedido. Tente novamente mais tarde.'
        )
      }

      // Simular envio de email
      return {
        success: true,
        message: 'Email de recuperação enviado com sucesso',
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },
}

export default auth
