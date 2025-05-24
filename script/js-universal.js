// Configurações globais
const CONFIG = {
  apiUrl: 'https://api.investsavy.com.br',
  version: '1.0.0',
  debug: false,
}

// Funções de utilidade
const utils = {
  // Formatação de números
  formatNumber: (number, options = {}) => {
    const defaults = {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
    return new Intl.NumberFormat('pt-BR', { ...defaults, ...options }).format(
      number
    )
  },

  // Formatação de moeda
  formatCurrency: (value, currency = 'BRL') => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
    }).format(value)
  },

  // Formatação de data
  formatDate: (date, options = {}) => {
    const defaults = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
    return new Date(date).toLocaleDateString('pt-BR', {
      ...defaults,
      ...options,
    })
  },

  // Formatação de hora
  formatTime: (date, options = {}) => {
    const defaults = {
      hour: '2-digit',
      minute: '2-digit',
    }
    return new Date(date).toLocaleTimeString('pt-BR', {
      ...defaults,
      ...options,
    })
  },

  // Formatação de data e hora
  formatDateTime: (date) => {
    return `${utils.formatDate(date)} ${utils.formatTime(date)}`
  },

  // Truncar texto
  truncateText: (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength).trim() + '...'
  },

  // Sanitizar HTML
  sanitizeHTML: (str) => {
    const temp = document.createElement('div')
    temp.textContent = str
    return temp.innerHTML
  },

  // Debounce
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Throttle
  throttle: (func, limit) => {
    let inThrottle
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },
}

// Funções de manipulação do DOM
const dom = {
  // Criar elemento
  create: (tag, attributes = {}, children = []) => {
    const element = document.createElement(tag)
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue
        })
      } else {
        element.setAttribute(key, value)
      }
    })
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child))
      } else {
        element.appendChild(child)
      }
    })
    return element
  },

  // Remover elemento
  remove: (element) => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element)
    }
  },

  // Adicionar classe
  addClass: (element, className) => {
    if (element) {
      element.classList.add(className)
    }
  },

  // Remover classe
  removeClass: (element, className) => {
    if (element) {
      element.classList.remove(className)
    }
  },

  // Alternar classe
  toggleClass: (element, className) => {
    if (element) {
      element.classList.toggle(className)
    }
  },

  // Verificar se tem classe
  hasClass: (element, className) => {
    return element && element.classList.contains(className)
  },
}

// Funções de manipulação de eventos
const events = {
  // Adicionar evento
  on: (element, event, handler, options = {}) => {
    if (element) {
      element.addEventListener(event, handler, options)
    }
  },

  // Remover evento
  off: (element, event, handler, options = {}) => {
    if (element) {
      element.removeEventListener(event, handler, options)
    }
  },

  // Disparar evento
  trigger: (element, eventName, detail = {}) => {
    if (element) {
      const event = new CustomEvent(eventName, {
        bubbles: true,
        cancelable: true,
        detail,
      })
      element.dispatchEvent(event)
    }
  },
}

// Funções de manipulação de cookies
const cookies = {
  // Definir cookie
  set: (name, value, days = 7) => {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${name}=${value};${expires};path=/`
  },

  // Obter cookie
  get: (name) => {
    const nameEQ = `${name}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },

  // Remover cookie
  remove: (name) => {
    cookies.set(name, '', -1)
  },
}

// Funções de manipulação de localStorage
const storage = {
  // Definir item
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e)
    }
  },

  // Obter item
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (e) {
      console.error('Erro ao ler do localStorage:', e)
      return null
    }
  },

  // Remover item
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error('Erro ao remover do localStorage:', e)
    }
  },

  // Limpar todos os itens
  clear: () => {
    try {
      localStorage.clear()
    } catch (e) {
      console.error('Erro ao limpar localStorage:', e)
    }
  },
}

// Funções de manipulação de requisições
const api = {
  // Requisição GET
  get: async (endpoint, params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString()
      const url = `${CONFIG.apiUrl}${endpoint}${
        queryString ? `?${queryString}` : ''
      }`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`)
      return await response.json()
    } catch (error) {
      console.error('Erro na requisição GET:', error)
      throw error
    }
  },

  // Requisição POST
  post: async (endpoint, data = {}) => {
    try {
      const response = await fetch(`${CONFIG.apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`)
      return await response.json()
    } catch (error) {
      console.error('Erro na requisição POST:', error)
      throw error
    }
  },
}

// Exportar funções
window.InvestSavy = {
  utils,
  dom,
  events,
  cookies,
  storage,
  api,
  CONFIG,
}

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle')
  const navMenu = document.querySelector('.nav-menu')

  // Verificar se os elementos existem antes de adicionar event listeners
  if (menuToggle && navMenu) {
    // Toggle do menu ao clicar no botão
    menuToggle.addEventListener('click', function (e) {
      e.stopPropagation() // Previne que o click se propague
      navMenu.classList.toggle('active')
      menuToggle.classList.toggle('active') // Adiciona/remove classe active no botão também
    })

    // Fechar menu ao clicar fora
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active')
        menuToggle.classList.remove('active')
      }
    })

    // Prevenir que cliques dentro do menu fechem ele
    navMenu.addEventListener('click', function (e) {
      e.stopPropagation()
    })

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active')
        menuToggle.classList.remove('active')
      })
    })
  }

  // Adicionar classe 'scrolled' ao header quando a página é rolada
  const header = document.querySelector('header')
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    })
  }
})
