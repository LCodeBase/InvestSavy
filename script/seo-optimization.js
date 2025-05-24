/**
 * SEO Optimization - InvestSavy
 * Script para melhorar o SEO e performance do site
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configurações
  const CONFIG = {
    titlePrefix: 'InvestSavy | ',
    descriptionMaxLength: 160,
    imageWidth: 1200,
    imageHeight: 630,
  }

  // Funções auxiliares
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength).trim() + '...'
  }

  const updateMetaTags = (data) => {
    // Atualizar título
    document.title = CONFIG.titlePrefix + data.title

    // Atualizar meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.content = truncateText(
        data.description,
        CONFIG.descriptionMaxLength
      )
    }

    // Atualizar Open Graph tags
    const ogTags = {
      'og:title': data.title,
      'og:description': truncateText(
        data.description,
        CONFIG.descriptionMaxLength
      ),
      'og:image': data.image,
      'og:url': window.location.href,
      'og:type': 'article',
    }

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.content = content
    })

    // Atualizar Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': data.title,
      'twitter:description': truncateText(
        data.description,
        CONFIG.descriptionMaxLength
      ),
      'twitter:image': data.image,
    }

    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.content = content
    })
  }

  const updateStructuredData = (data) => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: data.title,
      description: data.description,
      image: data.image,
      datePublished: data.publishedDate,
      dateModified: data.modifiedDate || data.publishedDate,
      author: {
        '@type': 'Organization',
        name: 'InvestSavy',
        url: 'https://investsavy.com.br',
      },
      publisher: {
        '@type': 'Organization',
        name: 'InvestSavy',
        logo: {
          '@type': 'ImageObject',
          url: 'https://investsavy.com.br/images/logo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': window.location.href,
      },
    }

    // Remover script de dados estruturados existente
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]'
    )
    if (existingScript) {
      existingScript.remove()
    }

    // Adicionar novo script de dados estruturados
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)
  }

  const updateCanonicalUrl = () => {
    const canonicalUrl = window.location.href.split('?')[0]
    let canonicalLink = document.querySelector('link[rel="canonical"]')

    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }

    canonicalLink.href = canonicalUrl
  }

  const updateBreadcrumbs = (data) => {
    const breadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://investsavy.com.br',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Notícias',
          item: 'https://investsavy.com.br/noticia.html',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: data.title,
          item: window.location.href,
        },
      ],
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(breadcrumbs)
    document.head.appendChild(script)
  }

  // Função principal para atualizar SEO
  const updateSEO = (data) => {
    updateMetaTags(data)
    updateStructuredData(data)
    updateCanonicalUrl()
    updateBreadcrumbs(data)
  }

  // Inicialização
  const init = () => {
    // Atualizar SEO com dados da página atual
    const pageData = {
      title:
        document.querySelector('.featured-title')?.textContent ||
        'Notícias | InvestSavy',
      description:
        document.querySelector('.featured-excerpt')?.textContent ||
        'As notícias mais importantes do mercado financeiro, economia e negócios para você tomar as melhores decisões.',
      image:
        document
          .querySelector('.featured-image')
          ?.style.backgroundImage?.replace(/url\(['"](.+)['"]\)/, '$1') ||
        'https://investsavy.com.br/images/default-og.jpg',
      publishedDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
    }

    updateSEO(pageData)

    // Observar mudanças no conteúdo dinâmico
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const featuredTitle = document.querySelector('.featured-title')
          const featuredExcerpt = document.querySelector('.featured-excerpt')
          const featuredImage = document.querySelector('.featured-image')

          if (featuredTitle || featuredExcerpt || featuredImage) {
            const newData = {
              title: featuredTitle?.textContent || pageData.title,
              description: featuredExcerpt?.textContent || pageData.description,
              image:
                featuredImage?.style.backgroundImage?.replace(
                  /url\(['"](.+)['"]\)/,
                  '$1'
                ) || pageData.image,
              publishedDate: pageData.publishedDate,
              modifiedDate: new Date().toISOString(),
            }

            updateSEO(newData)
          }
        }
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  // Iniciar
  init()
})

/**
 * Inicializa otimizações de SEO
 */
function initSEOOptimizations() {
  // Adicionar meta tags dinâmicas
  addDynamicMetaTags()

  // Melhorar URLs canônicas
  addCanonicalURL()

  // Adicionar atributos alt às imagens que não possuem
  addMissingAltAttributes()

  // Melhorar a estrutura de cabeçalhos
  improveHeadingStructure()
}

/**
 * Adiciona meta tags dinâmicas com base no conteúdo da página
 */
function addDynamicMetaTags() {
  const head = document.head
  const pageTitle = document.title || 'InvestSavy - Educação Financeira'

  // Obter descrição da página
  let pageDescription = ''
  const metaDescription = document.querySelector('meta[name="description"]')

  if (metaDescription) {
    pageDescription = metaDescription.getAttribute('content')
  } else {
    // Gerar descrição com base no conteúdo da página
    const mainContent = document.querySelector('main, .main-content, article')
    if (mainContent) {
      const paragraphs = mainContent.querySelectorAll('p')
      if (paragraphs.length > 0) {
        // Usar o primeiro parágrafo como descrição
        pageDescription = paragraphs[0].textContent.trim()
        // Limitar a 160 caracteres
        if (pageDescription.length > 160) {
          pageDescription = pageDescription.substring(0, 157) + '...'
        }
      }
    }

    // Se ainda não tiver descrição, usar uma padrão
    if (!pageDescription) {
      pageDescription =
        'InvestSavy - Portal de educação financeira com notícias, ferramentas e conteúdos educativos para ajudar você a tomar melhores decisões financeiras.'
    }

    // Adicionar meta description se não existir
    const newMetaDescription = document.createElement('meta')
    newMetaDescription.setAttribute('name', 'description')
    newMetaDescription.setAttribute('content', pageDescription)
    head.appendChild(newMetaDescription)
  }

  // Adicionar Open Graph meta tags se não existirem
  if (!document.querySelector('meta[property="og:title"]')) {
    const ogTitle = document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    ogTitle.setAttribute('content', pageTitle)
    head.appendChild(ogTitle)
  }

  if (!document.querySelector('meta[property="og:description"]')) {
    const ogDescription = document.createElement('meta')
    ogDescription.setAttribute('property', 'og:description')
    ogDescription.setAttribute('content', pageDescription)
    head.appendChild(ogDescription)
  }

  if (!document.querySelector('meta[property="og:type"]')) {
    const ogType = document.createElement('meta')
    ogType.setAttribute('property', 'og:type')
    ogType.setAttribute('content', 'website')
    head.appendChild(ogType)
  }

  // Adicionar URL da página atual para og:url
  if (!document.querySelector('meta[property="og:url"]')) {
    const ogUrl = document.createElement('meta')
    ogUrl.setAttribute('property', 'og:url')
    ogUrl.setAttribute('content', window.location.href)
    head.appendChild(ogUrl)
  }

  // Adicionar imagem para compartilhamento
  if (!document.querySelector('meta[property="og:image"]')) {
    // Tentar encontrar uma imagem na página
    let imageUrl = ''
    const featuredImage = document.querySelector(
      '.featured-image, .noticia-featured-image'
    )
    if (featuredImage) {
      const bgImage = window.getComputedStyle(featuredImage).backgroundImage
      if (bgImage && bgImage !== 'none') {
        imageUrl = bgImage.replace(/url\(['"]?([^'"]*)['"]/g, '$1')
      }
    }

    // Se não encontrar, usar uma imagem padrão
    if (!imageUrl) {
      const firstImage = document.querySelector('img')
      if (firstImage && firstImage.src) {
        imageUrl = firstImage.src
      } else {
        // Imagem padrão do site
        imageUrl = '/images/hero-photo.webp'
      }
    }

    // Converter para URL absoluta se for relativa
    if (imageUrl && !imageUrl.startsWith('http')) {
      const baseUrl = window.location.origin
      imageUrl = new URL(imageUrl, baseUrl).href
    }

    if (imageUrl) {
      const ogImage = document.createElement('meta')
      ogImage.setAttribute('property', 'og:image')
      ogImage.setAttribute('content', imageUrl)
      head.appendChild(ogImage)
    }
  }

  // Adicionar Twitter Card meta tags
  if (!document.querySelector('meta[name="twitter:card"]')) {
    const twitterCard = document.createElement('meta')
    twitterCard.setAttribute('name', 'twitter:card')
    twitterCard.setAttribute('content', 'summary_large_image')
    head.appendChild(twitterCard)
  }

  // Adicionar palavras-chave relevantes
  if (!document.querySelector('meta[name="keywords"]')) {
    // Determinar palavras-chave com base no conteúdo
    let keywords = 'educação financeira, investimentos, finanças pessoais'

    // Adicionar categorias de notícias como palavras-chave, se disponíveis
    const categories = document.querySelectorAll(
      '.news-category, .category-tag'
    )
    if (categories.length > 0) {
      const categoryKeywords = Array.from(categories)
        .map((cat) => cat.textContent.trim().toLowerCase())
        .filter((value, index, self) => self.indexOf(value) === index) // Remover duplicatas
        .join(', ')

      if (categoryKeywords) {
        keywords += ', ' + categoryKeywords
      }
    }

    const metaKeywords = document.createElement('meta')
    metaKeywords.setAttribute('name', 'keywords')
    metaKeywords.setAttribute('content', keywords)
    head.appendChild(metaKeywords)
  }
}

/**
 * Adiciona URL canônica para evitar conteúdo duplicado
 */
function addCanonicalURL() {
  if (!document.querySelector('link[rel="canonical"]')) {
    const canonicalUrl = document.createElement('link')
    canonicalUrl.setAttribute('rel', 'canonical')
    canonicalUrl.setAttribute('href', window.location.href.split('?')[0]) // Remover parâmetros de consulta
    document.head.appendChild(canonicalUrl)
  }
}

/**
 * Adiciona atributos alt às imagens que não possuem
 */
function addMissingAltAttributes() {
  const images = document.querySelectorAll('img:not([alt]), img[alt=""]')

  images.forEach((img) => {
    // Tentar gerar um alt baseado no contexto
    let altText = ''

    // Verificar se a imagem está dentro de um artigo ou card de notícia
    const newsCard = img.closest('.news-card, article, .noticia-content')
    if (newsCard) {
      // Tentar usar o título da notícia
      const title = newsCard.querySelector('h2, h3, .news-title')
      if (title) {
        altText = 'Imagem ilustrativa: ' + title.textContent.trim()
      }
    }

    // Se não encontrou um contexto específico, usar um genérico
    if (!altText) {
      // Verificar se o nome do arquivo pode dar alguma pista
      const filename = img.src.split('/').pop().split('?')[0]
      if (filename) {
        // Converter nome do arquivo para texto legível
        const filenameText = filename
          .replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
          .replace(/[-_]/g, ' ')
          .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase para espaços
          .trim()

        if (filenameText && !/^[0-9]+$/.test(filenameText)) {
          // Evitar nomes que são apenas números
          altText =
            'Imagem: ' +
            filenameText.charAt(0).toUpperCase() +
            filenameText.slice(1)
        } else {
          altText = 'Imagem ilustrativa do InvestSavy'
        }
      } else {
        altText = 'Imagem ilustrativa do InvestSavy'
      }
    }

    // Definir o atributo alt
    img.setAttribute('alt', altText)
  })
}

/**
 * Melhora a estrutura de cabeçalhos para SEO
 */
function improveHeadingStructure() {
  // Verificar se há um h1 na página
  const h1Elements = document.querySelectorAll('h1')

  // Se não houver h1, tentar promover o primeiro h2 para h1
  if (h1Elements.length === 0) {
    const firstH2 = document.querySelector('h2')
    if (firstH2) {
      // Criar um novo h1 com o mesmo conteúdo
      const newH1 = document.createElement('h1')
      newH1.innerHTML = firstH2.innerHTML
      newH1.className = firstH2.className

      // Substituir o h2 pelo h1
      firstH2.parentNode.replaceChild(newH1, firstH2)
    }
  }
}

/**
 * Inicializa otimizações de performance
 */
function initPerformanceOptimizations() {
  // Lazy loading para imagens
  addLazyLoading()

  // Otimizar carregamento de fontes
  optimizeFontLoading()

  // Adiar carregamento de scripts não críticos
  deferNonCriticalScripts()
}

/**
 * Adiciona lazy loading para imagens
 */
function addLazyLoading() {
  // Verificar se o navegador suporta lazy loading nativo
  if ('loading' in HTMLImageElement.prototype) {
    // Adicionar atributo loading="lazy" a todas as imagens que não são críticas
    const images = document.querySelectorAll('img:not([loading])')
    images.forEach((img) => {
      // Não aplicar lazy loading à imagem principal/hero
      const isHeroImage = img.closest('.hero-section, .featured-image, header')
      if (!isHeroImage) {
        img.setAttribute('loading', 'lazy')
      }
    })
  } else {
    // Para navegadores que não suportam lazy loading nativo,
    // poderíamos implementar uma solução baseada em Intersection Observer
    // Mas isso seria mais complexo e não é necessário para a maioria dos navegadores modernos
  }

  // Adicionar lazy loading para imagens de fundo via CSS
  const elementsWithBgImage = document.querySelectorAll(
    '.news-card-image, .featured-image:not(.hero-featured-image)'
  )
  elementsWithBgImage.forEach((el) => {
    // Verificar se o elemento está fora da viewport inicial
    const rect = el.getBoundingClientRect()
    const isInViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    if (!isInViewport) {
      // Armazenar o estilo original
      const originalBgImage = window.getComputedStyle(el).backgroundImage
      if (originalBgImage && originalBgImage !== 'none') {
        el.setAttribute('data-bg', originalBgImage)
        el.style.backgroundImage = 'none'

        // Usar Intersection Observer para carregar quando visível
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const target = entry.target
                const bgImage = target.getAttribute('data-bg')
                if (bgImage) {
                  target.style.backgroundImage = bgImage
                  target.removeAttribute('data-bg')
                  observer.unobserve(target)
                }
              }
            })
          },
          { rootMargin: '200px' }
        ) // Carregar um pouco antes de entrar na viewport

        observer.observe(el)
      }
    }
  })
}

/**
 * Otimiza o carregamento de fontes
 */
function optimizeFontLoading() {
  // Adicionar preconnect para Google Fonts se estiver sendo usado
  const googleFontsLinks = document.querySelectorAll(
    'link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"]'
  )
  if (
    googleFontsLinks.length > 0 &&
    !document.querySelector(
      'link[rel="preconnect"][href*="fonts.googleapis.com"]'
    )
  ) {
    const preconnectGoogle = document.createElement('link')
    preconnectGoogle.rel = 'preconnect'
    preconnectGoogle.href = 'https://fonts.googleapis.com'

    const preconnectGstatic = document.createElement('link')
    preconnectGstatic.rel = 'preconnect'
    preconnectGstatic.href = 'https://fonts.gstatic.com'
    preconnectGstatic.setAttribute('crossorigin', '')

    // Inserir no início do head para estabelecer a conexão o mais cedo possível
    document.head.insertBefore(preconnectGstatic, document.head.firstChild)
    document.head.insertBefore(preconnectGoogle, document.head.firstChild)
  }

  // Adicionar font-display: swap para fontes personalizadas
  const style = document.createElement('style')
  style.textContent = `
    @font-face {
      font-display: swap;
    }
  `
  document.head.appendChild(style)
}

/**
 * Adia o carregamento de scripts não críticos
 */
function deferNonCriticalScripts() {
  // Lista de padrões de scripts que não são críticos para o carregamento inicial
  const nonCriticalPatterns = [
    'analytics',
    'tracking',
    'social-media',
    'facebook',
    'twitter',
    'instagram',
    'chat',
    'feedback',
  ]

  // Encontrar scripts que correspondem aos padrões
  const scripts = document.querySelectorAll('script[src]')
  scripts.forEach((script) => {
    const src = script.getAttribute('src').toLowerCase()
    const isNonCritical = nonCriticalPatterns.some((pattern) =>
      src.includes(pattern)
    )

    if (
      isNonCritical &&
      !script.hasAttribute('defer') &&
      !script.hasAttribute('async')
    ) {
      // Criar um novo script com defer
      const deferredScript = document.createElement('script')
      deferredScript.src = script.src
      deferredScript.defer = true

      // Copiar outros atributos
      Array.from(script.attributes).forEach((attr) => {
        if (
          attr.name !== 'src' &&
          attr.name !== 'defer' &&
          attr.name !== 'async'
        ) {
          deferredScript.setAttribute(attr.name, attr.value)
        }
      })

      // Substituir o script original
      script.parentNode.replaceChild(deferredScript, script)
    }
  })
}

// Exportar funções para uso em outros arquivos
window.seoOptimization = {
  addDynamicMetaTags,
  addMissingAltAttributes,
  addLazyLoading,
}
