import security from './security.js'

const xssProtection = {
  // Configurações
  config: {
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
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    maxLength: 10000,
  },

  // Função para sanitizar HTML
  sanitizeHTML: (html) => {
    if (!html) return ''

    // Verificar tamanho máximo
    if (html.length > xssProtection.config.maxLength) {
      throw new Error('Conteúdo muito longo')
    }

    // Criar elemento temporário
    const temp = document.createElement('div')
    temp.innerHTML = html

    // Função para sanitizar atributos
    const sanitizeAttributes = (element) => {
      const attributes = element.attributes
      for (let i = attributes.length - 1; i >= 0; i--) {
        const attr = attributes[i]
        const tagName = element.tagName.toLowerCase()

        // Verificar se o atributo é permitido para a tag
        if (
          !xssProtection.config.allowedAttributes[tagName]?.includes(attr.name)
        ) {
          element.removeAttribute(attr.name)
          continue
        }

        // Sanitizar URLs em atributos href e src
        if (attr.name === 'href' || attr.name === 'src') {
          const url = attr.value
          if (!security.validateURL(url)) {
            element.removeAttribute(attr.name)
            continue
          }

          // Verificar esquema permitido
          const scheme = url.split(':')[0]
          if (!xssProtection.config.allowedSchemes.includes(scheme)) {
            element.removeAttribute(attr.name)
          }
        }
      }
    }

    // Função para sanitizar elementos
    const sanitizeElement = (element) => {
      // Verificar se a tag é permitida
      const tagName = element.tagName.toLowerCase()
      if (!xssProtection.config.allowedTags.includes(tagName)) {
        // Substituir por texto se a tag não for permitida
        const text = element.textContent
        element.parentNode.replaceChild(document.createTextNode(text), element)
        return
      }

      // Sanitizar atributos
      sanitizeAttributes(element)

      // Sanitizar elementos filhos
      const children = element.children
      for (let i = children.length - 1; i >= 0; i--) {
        sanitizeElement(children[i])
      }
    }

    // Sanitizar todo o conteúdo
    sanitizeElement(temp)

    return temp.innerHTML
  },

  // Função para sanitizar texto
  sanitizeText: (text) => {
    if (!text) return ''

    // Verificar tamanho máximo
    if (text.length > xssProtection.config.maxLength) {
      throw new Error('Texto muito longo')
    }

    // Escapar caracteres especiais
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  },

  // Função para sanitizar URL
  sanitizeURL: (url) => {
    if (!url) return ''

    // Verificar se é uma URL válida
    if (!security.validateURL(url)) {
      throw new Error('URL inválida')
    }

    // Verificar esquema permitido
    const scheme = url.split(':')[0]
    if (!xssProtection.config.allowedSchemes.includes(scheme)) {
      throw new Error('Esquema de URL não permitido')
    }

    return url
  },

  // Função para sanitizar objeto
  sanitizeObject: (obj) => {
    if (!obj) return {}

    const sanitized = {}
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = xssProtection.sanitizeText(value)
      } else if (typeof value === 'object') {
        sanitized[key] = xssProtection.sanitizeObject(value)
      } else {
        sanitized[key] = value
      }
    }
    return sanitized
  },
}

export default xssProtection
