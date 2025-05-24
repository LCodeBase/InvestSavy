/**
 * Melhoria de Acessibilidade para Imagens - InvestSavy
 * Este arquivo contém funções para melhorar a acessibilidade e experiência do usuário com imagens
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configurações
  const CONFIG = {
    lazyLoadThreshold: 0.1,
    imageQuality: 0.8,
    placeholderColor: '#f0f0f0',
  }

  // Funções auxiliares
  const generateAltText = (image) => {
    // Tentar obter o texto alternativo do atributo data-alt
    const dataAlt = image.getAttribute('data-alt')
    if (dataAlt) return dataAlt

    // Tentar obter o texto do título da imagem
    const title = image.getAttribute('title')
    if (title) return title

    // Tentar obter o texto do atributo alt
    const alt = image.getAttribute('alt')
    if (alt) return alt

    // Gerar texto alternativo baseado no contexto
    const context = image.closest('article, .news-card, .featured-article')
    if (context) {
      const title = context.querySelector('h2, h3, .title')?.textContent
      if (title) return `Imagem ilustrativa para: ${title}`
    }

    return 'Imagem ilustrativa'
  }

  const optimizeImage = (image) => {
    // Verificar se a imagem já foi otimizada
    if (image.dataset.optimized === 'true') return

    // Adicionar atributos de acessibilidade
    image.setAttribute('role', 'img')
    image.setAttribute('aria-label', generateAltText(image))
    image.setAttribute('loading', 'lazy')
    image.setAttribute('decoding', 'async')

    // Adicionar fallback para imagens que falham ao carregar
    image.addEventListener('error', () => {
      image.src = '/images/placeholder.jpg'
      image.alt = 'Imagem não disponível'
    })

    // Marcar como otimizada
    image.dataset.optimized = 'true'
  }

  const handleBackgroundImages = () => {
    const elements = document.querySelectorAll('[style*="background-image"]')
    elements.forEach((element) => {
      const bgImage = window.getComputedStyle(element).backgroundImage
      if (bgImage && bgImage !== 'none') {
        const imageUrl = bgImage.replace(/url\(['"]?([^'"]*)['"]?\)/, '$1')

        // Criar elemento de imagem para carregar o background
        const img = new Image()
        img.src = imageUrl

        // Adicionar atributos de acessibilidade
        element.setAttribute('role', 'img')
        element.setAttribute('aria-label', generateAltText(element))

        // Adicionar fallback
        img.onerror = () => {
          element.style.backgroundColor = CONFIG.placeholderColor
          element.setAttribute('aria-label', 'Imagem não disponível')
        }
      }
    })
  }

  const setupLazyLoading = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target

            // Carregar imagem de fundo
            if (image.dataset.bgImage) {
              image.style.backgroundImage = `url(${image.dataset.bgImage})`
              image.removeAttribute('data-bg-image')
            }

            // Carregar imagem normal
            if (image.dataset.src) {
              image.src = image.dataset.src
              image.removeAttribute('data-src')
            }

            observer.unobserve(image)
          }
        })
      },
      {
        threshold: CONFIG.lazyLoadThreshold,
        rootMargin: '50px',
      }
    )

    // Observar imagens com data-src
    document.querySelectorAll('img[data-src]').forEach((img) => {
      observer.observe(img)
    })

    // Observar elementos com data-bg-image
    document.querySelectorAll('[data-bg-image]').forEach((element) => {
      observer.observe(element)
    })
  }

  const setupImageZoom = () => {
    const images = document.querySelectorAll('.news-image, .featured-image')

    images.forEach((image) => {
      image.addEventListener('click', () => {
        const modal = document.createElement('div')
        modal.className = 'image-modal'
        modal.setAttribute('role', 'dialog')
        modal.setAttribute('aria-label', 'Visualização ampliada da imagem')

        const img = document.createElement('img')
        img.src = image.style.backgroundImage.replace(
          /url\(['"]?([^'"]*)['"]?\)/,
          '$1'
        )
        img.alt = image.getAttribute('aria-label')

        const closeBtn = document.createElement('button')
        closeBtn.className = 'modal-close'
        closeBtn.innerHTML = '&times;'
        closeBtn.setAttribute('aria-label', 'Fechar visualização')

        modal.appendChild(img)
        modal.appendChild(closeBtn)
        document.body.appendChild(modal)

        // Fechar modal
        const closeModal = () => {
          modal.remove()
          document.body.style.overflow = ''
        }

        closeBtn.addEventListener('click', closeModal)
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModal()
        })

        // Fechar com tecla ESC
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') closeModal()
        })

        // Prevenir rolagem do body
        document.body.style.overflow = 'hidden'
      })
    })
  }

  // Inicialização
  const init = () => {
    // Otimizar imagens existentes
    document.querySelectorAll('img').forEach(optimizeImage)

    // Configurar imagens de fundo
    handleBackgroundImages()

    // Configurar lazy loading
    setupLazyLoading()

    // Configurar zoom de imagens
    setupImageZoom()

    // Observar novas imagens adicionadas dinamicamente
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'IMG') {
            optimizeImage(node)
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            node.querySelectorAll('img').forEach(optimizeImage)
          }
        })
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
 * Melhora a acessibilidade e experiência do usuário para imagens clicáveis
 */
function enhanceImageAccessibility() {
  // Adicionar atributos de acessibilidade às imagens da página principal
  enhanceFeaturedImage()
  enhanceNewsCardImages()

  // Adicionar atributos de acessibilidade às imagens da página de detalhes
  enhanceNoticiaDetalheImage()
  enhanceContentImages()
}

/**
 * Melhora a acessibilidade da imagem em destaque
 */
function enhanceFeaturedImage() {
  const featuredImage = document.querySelector('.featured-image')
  if (!featuredImage) return

  // Adicionar role e tabindex para acessibilidade
  featuredImage.setAttribute('role', 'button')
  featuredImage.setAttribute('tabindex', '0')

  // Adicionar título para tooltip
  const featuredTitle = document.querySelector('.featured-title a')
  if (featuredTitle) {
    featuredImage.setAttribute(
      'title',
      `Ver notícia: ${featuredTitle.textContent}`
    )
    featuredImage.setAttribute(
      'aria-label',
      `Ver notícia: ${featuredTitle.textContent}`
    )
  }

  // Adicionar evento de teclado para acessibilidade
  featuredImage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const link = document.querySelector('.featured-image-link')
      if (link) {
        window.location.href = link.href
      }
    }
  })
}

/**
 * Melhora a acessibilidade das imagens dos cards de notícias
 */
function enhanceNewsCardImages() {
  const newsCardImages = document.querySelectorAll('.news-card-image')
  if (!newsCardImages.length) return

  newsCardImages.forEach((image) => {
    // Adicionar role e tabindex para acessibilidade
    image.setAttribute('role', 'button')
    image.setAttribute('tabindex', '0')

    // Adicionar título para tooltip
    const cardTitle = image
      .closest('.news-card')
      .querySelector('.news-card-title a')
    if (cardTitle) {
      image.setAttribute('title', `Ver notícia: ${cardTitle.textContent}`)
      image.setAttribute('aria-label', `Ver notícia: ${cardTitle.textContent}`)
    }

    // Adicionar evento de teclado para acessibilidade
    image.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        const link = image.closest('.news-card-image-link')
        if (link) {
          window.location.href = link.href
        }
      }
    })
  })
}

/**
 * Melhora a acessibilidade da imagem principal na página de detalhes da notícia
 */
function enhanceNoticiaDetalheImage() {
  const noticiaImage = document.querySelector('.noticia-featured-image')
  if (!noticiaImage) return

  // Adicionar atributos de acessibilidade
  const noticiaTitle = document.querySelector('.noticia-title')
  if (noticiaTitle) {
    noticiaImage.setAttribute('title', noticiaTitle.textContent)
    noticiaImage.setAttribute(
      'aria-label',
      `Imagem principal: ${noticiaTitle.textContent}`
    )
  }
}

/**
 * Melhora a acessibilidade das imagens dentro do conteúdo da notícia
 */
function enhanceContentImages() {
  const contentImages = document.querySelectorAll('.noticia-content img')
  if (!contentImages.length) return

  contentImages.forEach((img) => {
    // Verificar se já tem alt text
    if (!img.alt || img.alt === '') {
      // Tentar usar o título da notícia como fallback
      const noticiaTitle = document.querySelector('.noticia-title')
      if (noticiaTitle) {
        img.alt = `Imagem relacionada à notícia: ${noticiaTitle.textContent}`
      } else {
        img.alt = 'Imagem relacionada à notícia'
      }
    }

    // Adicionar título para tooltip se não existir
    if (!img.title) {
      img.title = img.alt
    }

    // Adicionar classe para estilização
    img.classList.add('content-image')

    // Envolver a imagem em um link para ampliação, se ainda não estiver em um link
    if (!img.parentElement.tagName === 'A') {
      const imgSrc = img.src
      const wrapper = document.createElement('a')
      wrapper.href = imgSrc
      wrapper.setAttribute('target', '_blank')
      wrapper.setAttribute('rel', 'noopener noreferrer')
      wrapper.setAttribute('aria-label', `Ampliar imagem: ${img.alt}`)
      wrapper.classList.add('image-zoom-link')

      // Substituir a imagem pelo wrapper com a imagem dentro
      img.parentNode.insertBefore(wrapper, img)
      wrapper.appendChild(img)
    }
  })
}
