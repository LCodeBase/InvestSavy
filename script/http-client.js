import csrfProtection from './csrf-protection.js'
import security from './security.js'

const httpClient = {
  // Configurações
  config: {
    baseURL: '/api',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },

  // Função para fazer requisição HTTP
  async request(method, url, data = null, options = {}) {
    try {
      // Sanitizar URL
      const sanitizedUrl = security.sanitizeInput(url)

      // Adicionar token CSRF aos headers
      const headers = csrfProtection.addTokenToHeaders({
        ...httpClient.config.headers,
        ...options.headers,
      })

      // Configurar requisição
      const requestOptions = {
        method,
        headers,
        credentials: 'same-origin',
        mode: 'same-origin',
        cache: 'no-cache',
        redirect: 'error',
        referrerPolicy: 'same-origin',
      }

      // Adicionar dados se houver
      if (data) {
        requestOptions.body = JSON.stringify(data)
      }

      // Fazer requisição
      const response = await fetch(
        `${httpClient.config.baseURL}${sanitizedUrl}`,
        requestOptions
      )

      // Verificar status
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Verificar token CSRF na resposta
      const responseToken = response.headers.get('X-CSRF-Token')
      if (responseToken && !csrfProtection.validateToken(responseToken)) {
        throw new Error('Invalid CSRF token in response')
      }

      // Processar resposta
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }
      return await response.text()
    } catch (error) {
      console.error('Erro na requisição:', error)
      throw error
    }
  },

  // Métodos HTTP
  async get(url, options = {}) {
    return httpClient.request('GET', url, null, options)
  },

  async post(url, data, options = {}) {
    return httpClient.request('POST', url, data, options)
  },

  async put(url, data, options = {}) {
    return httpClient.request('PUT', url, data, options)
  },

  async delete(url, options = {}) {
    return httpClient.request('DELETE', url, null, options)
  },

  async patch(url, data, options = {}) {
    return httpClient.request('PATCH', url, data, options)
  },
}

export default httpClient
