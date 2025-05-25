// Sistema de proteção contra ataques de força bruta
const bruteForceProtection = {
  // Configurações
  config: {
    maxAttempts: 5, // Número máximo de tentativas
    windowMs: 15 * 60 * 1000, // Janela de tempo (15 minutos)
    blockDuration: 30 * 60 * 1000, // Duração do bloqueio (30 minutos)
  },

  // Armazenamento de tentativas
  attempts: new Map(),

  // Função para registrar uma tentativa
  recordAttempt: (identifier) => {
    const now = Date.now()
    const attempts = bruteForceProtection.attempts.get(identifier) || []

    // Remover tentativas antigas
    const recentAttempts = attempts.filter(
      (attempt) => now - attempt < bruteForceProtection.config.windowMs
    )

    // Adicionar nova tentativa
    recentAttempts.push(now)
    bruteForceProtection.attempts.set(identifier, recentAttempts)

    return recentAttempts.length
  },

  // Função para verificar se está bloqueado
  isBlocked: (identifier) => {
    const attempts = bruteForceProtection.attempts.get(identifier) || []
    const now = Date.now()

    // Verificar se excedeu o número máximo de tentativas
    if (attempts.length >= bruteForceProtection.config.maxAttempts) {
      const oldestAttempt = attempts[0]
      const blockEndTime =
        oldestAttempt + bruteForceProtection.config.blockDuration

      if (now < blockEndTime) {
        return {
          blocked: true,
          remainingTime: blockEndTime - now,
        }
      }

      // Resetar tentativas se o período de bloqueio expirou
      bruteForceProtection.attempts.delete(identifier)
    }

    return { blocked: false }
  },

  // Função para limpar tentativas
  clearAttempts: (identifier) => {
    bruteForceProtection.attempts.delete(identifier)
  },

  // Função para obter estatísticas
  getStats: (identifier) => {
    const attempts = bruteForceProtection.attempts.get(identifier) || []
    const now = Date.now()

    return {
      totalAttempts: attempts.length,
      remainingAttempts: Math.max(
        0,
        bruteForceProtection.config.maxAttempts - attempts.length
      ),
      nextReset:
        attempts.length > 0
          ? attempts[0] + bruteForceProtection.config.windowMs
          : null,
    }
  },
}

export default bruteForceProtection
