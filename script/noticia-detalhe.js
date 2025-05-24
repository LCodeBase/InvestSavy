/**
 * Manipulador de Detalhes de Notícia - InvestSavy
 * Este arquivo contém as funções para carregar e exibir os detalhes de uma notícia específica
 */

// Elementos DOM
let noticiaDetalhe
let noticiasRelacionadas
let ultimasAtualizacoes
let maisLidas
let topicos
let newsletterForm

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
  // Inicializar elementos DOM
  initDOMElements()

  // Obter ID da notícia da URL
  const noticiaId = getNoticiaIdFromURL()

  if (noticiaId) {
    // Carregar detalhes da notícia
    await loadNoticiaDetalhes(noticiaId)

    // Incrementar visualizações
    incrementarVisualizacoes(noticiaId)
  } else {
    // Exibir mensagem de erro
    showError('Notícia não encontrada')
  }

  // Configurar eventos
  setupEventListeners()
})

// Inicializar elementos DOM
function initDOMElements() {
  noticiaDetalhe = document.getElementById('noticiaDetalhe')
  noticiasRelacionadas = document.getElementById('noticiasRelacionadas')
  ultimasAtualizacoes = document.getElementById('ultimasAtualizacoes')
  maisLidas = document.getElementById('maisLidas')
  topicos = document.getElementById('topicos')
  newsletterForm = document.getElementById('newsletterForm')
}

// Obter ID da notícia da URL
function getNoticiaIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('id')
}

// Carregar detalhes da notícia
async function loadNoticiaDetalhes(id) {
  try {
    // Verificar se o cliente Supabase está disponível
    if (!window.supabaseClient) {
      console.error('Cliente Supabase não encontrado')
      showError('Erro ao carregar notícia. Tente novamente mais tarde.')
      return
    }

    // Buscar notícia pelo ID
    const noticia = await window.supabaseClient.fetchNoticiaById(id)

    if (!noticia) {
      showError('Notícia não encontrada')
      return
    }

    // Renderizar detalhes da notícia
    renderNoticiaDetalhes(noticia)

    // Carregar notícias relacionadas
    await loadNoticiasRelacionadas(noticia)

    // Carregar sidebar
    await loadSidebar()

    // Atualizar título da página
    document.title = `${noticia.title} - InvestSavy`
  } catch (error) {
    console.error('Erro ao carregar detalhes da notícia:', error)
    showError('Erro ao carregar notícia. Tente novamente mais tarde.')
  }
}

// Renderizar detalhes da notícia
function renderNoticiaDetalhes(noticia) {
  if (!noticia || !noticiaDetalhe) return

  // Limpar conteúdo existente
  noticiaDetalhe.innerHTML = ''

  // Criar elementos
  const header = document.createElement('header')
  header.className = 'noticia-header'

  // Categoria
  if (noticia.categories && noticia.categories.length > 0) {
    const category = document.createElement('div')
    category.className = 'noticia-category'
    category.textContent =
      noticia.categories[0].charAt(0).toUpperCase() +
      noticia.categories[0].slice(1)
    header.appendChild(category)
  }

  // Título
  const title = document.createElement('h1')
  title.className = 'noticia-title'
  title.textContent = noticia.title
  header.appendChild(title)

  // Metadados
  const meta = document.createElement('div')
  meta.className = 'noticia-meta'

  // Autor
  const author = document.createElement('span')
  author.className = 'noticia-author'
  author.innerHTML = `<i class="fas fa-user"></i> ${
    noticia.author || 'Equipe InvestSavy'
  }`
  meta.appendChild(author)

  // Data
  const date = document.createElement('span')
  date.className = 'noticia-date'
  date.innerHTML = `<i class="far fa-calendar"></i> ${formatDate(
    noticia.created_at
  )}`
  meta.appendChild(date)

  // Tempo de leitura
  const readingTime = document.createElement('span')
  readingTime.className = 'noticia-reading-time'
  readingTime.innerHTML = `<i class="far fa-clock"></i> ${
    noticia.reading_time || '5 min de leitura'
  }`
  meta.appendChild(readingTime)

  // Visualizações
  const views = document.createElement('span')
  views.className = 'noticia-views'
  views.innerHTML = `<i class="far fa-eye"></i> ${
    noticia.views || '0'
  } visualizações`
  meta.appendChild(views)

  header.appendChild(meta)

  // Imagem principal
  const featuredImage = document.createElement('div')
  featuredImage.className = 'noticia-featured-image'
  featuredImage.style.backgroundImage = `url('${
    noticia.image || '/images/default-news.jpg'
  }')`

  // Conteúdo
  const content = document.createElement('div')
  content.className = 'noticia-content'
  content.innerHTML = noticia.content

  // Tags
  const tags = document.createElement('div')
  tags.className = 'noticia-tags'

  if (noticia.tags && noticia.tags.length > 0) {
    const tagsTitle = document.createElement('span')
    tagsTitle.className = 'tags-title'
    tagsTitle.textContent = 'Tags:'
    tags.appendChild(tagsTitle)

    noticia.tags.forEach((tag) => {
      const tagLink = document.createElement('a')
      tagLink.href = `/noticia.html?tag=${tag.toLowerCase()}`
      tagLink.className = 'noticia-tag'
      tagLink.textContent = tag
      tags.appendChild(tagLink)
    })
  }

  // Compartilhamento
  const share = document.createElement('div')
  share.className = 'noticia-share'

  const shareTitle = document.createElement('span')
  shareTitle.className = 'share-title'
  shareTitle.textContent = 'Compartilhar:'
  share.appendChild(shareTitle)

  const shareLinks = document.createElement('div')
  shareLinks.className = 'share-links'

  // Facebook
  const facebookLink = document.createElement('a')
  facebookLink.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    window.location.href
  )}`
  facebookLink.target = '_blank'
  facebookLink.rel = 'noopener noreferrer'
  facebookLink.className = 'share-link facebook'
  facebookLink.innerHTML = '<i class="fab fa-facebook-f"></i>'
  shareLinks.appendChild(facebookLink)

  // Twitter
  const twitterLink = document.createElement('a')
  twitterLink.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    window.location.href
  )}&text=${encodeURIComponent(noticia.title)}`
  twitterLink.target = '_blank'
  twitterLink.rel = 'noopener noreferrer'
  twitterLink.className = 'share-link twitter'
  twitterLink.innerHTML = '<i class="fab fa-twitter"></i>'
  shareLinks.appendChild(twitterLink)

  // LinkedIn
  const linkedinLink = document.createElement('a')
  linkedinLink.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    window.location.href
  )}`
  linkedinLink.target = '_blank'
  linkedinLink.rel = 'noopener noreferrer'
  linkedinLink.className = 'share-link linkedin'
  linkedinLink.innerHTML = '<i class="fab fa-linkedin-in"></i>'
  shareLinks.appendChild(linkedinLink)

  // WhatsApp
  const whatsappLink = document.createElement('a')
  whatsappLink.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    noticia.title + ' ' + window.location.href
  )}`
  whatsappLink.target = '_blank'
  whatsappLink.rel = 'noopener noreferrer'
  whatsappLink.className = 'share-link whatsapp'
  whatsappLink.innerHTML = '<i class="fab fa-whatsapp"></i>'
  shareLinks.appendChild(whatsappLink)

  share.appendChild(shareLinks)

  // Adicionar elementos ao artigo
  noticiaDetalhe.appendChild(header)
  noticiaDetalhe.appendChild(featuredImage)
  noticiaDetalhe.appendChild(content)
  noticiaDetalhe.appendChild(tags)
  noticiaDetalhe.appendChild(share)
}

// Carregar notícias relacionadas
async function loadNoticiasRelacionadas(noticia) {
  try {
    if (!window.supabaseClient || !noticiasRelacionadas) return

    // Buscar todas as notícias
    const allNoticias = await window.supabaseClient.fetchNoticias()

    if (!allNoticias || allNoticias.length === 0) return

    // Filtrar notícias relacionadas (mesma categoria, excluindo a atual)
    let relacionadas = []

    if (noticia.categories && noticia.categories.length > 0) {
      relacionadas = allNoticias.filter(
        (item) =>
          item.id !== noticia.id &&
          item.categories &&
          item.categories.some((cat) => noticia.categories.includes(cat))
      )
    }

    // Se não houver notícias relacionadas por categoria, pegar as mais recentes
    if (relacionadas.length < 3) {
      const outrasNoticias = allNoticias.filter(
        (item) =>
          item.id !== noticia.id &&
          !relacionadas.some((rel) => rel.id === item.id)
      )

      relacionadas = [...relacionadas, ...outrasNoticias].slice(0, 3)
    } else {
      relacionadas = relacionadas.slice(0, 3)
    }

    // Renderizar notícias relacionadas
    renderNoticiasRelacionadas(relacionadas)
  } catch (error) {
    console.error('Erro ao carregar notícias relacionadas:', error)
  }
}

// Renderizar notícias relacionadas
function renderNoticiasRelacionadas(noticias) {
  if (!noticias || !noticiasRelacionadas) return

  // Limpar conteúdo existente
  noticiasRelacionadas.innerHTML = ''

  // Renderizar cada notícia
  noticias.forEach((noticia) => {
    const article = document.createElement('article')
    article.className = 'news-card'

    // Criar elemento de link para envolver a imagem
    const imageLink = document.createElement('a')
    imageLink.href = `/noticia-detalhe.html?id=${noticia.id}`
    imageLink.classList.add('news-card-image-link')

    // Criar div da imagem
    const imageDiv = document.createElement('div')
    imageDiv.className = 'news-card-image'
    imageDiv.style.backgroundImage = `url('${
      noticia.image || '/images/default-news.jpg'
    }')`

    // Adicionar categoria se existir
    if (noticia.categories && noticia.categories.length > 0) {
      const categorySpan = document.createElement('span')
      categorySpan.className = 'news-category'
      categorySpan.textContent =
        noticia.categories[0].charAt(0).toUpperCase() +
        noticia.categories[0].slice(1)
      imageDiv.appendChild(categorySpan)
    }

    // Adicionar imagem ao link
    imageLink.appendChild(imageDiv)

    // Criar div do conteúdo
    const contentDiv = document.createElement('div')
    contentDiv.className = 'news-card-content'

    // Título
    const title = document.createElement('h3')
    title.className = 'news-card-title'
    const titleLink = document.createElement('a')
    titleLink.href = `/noticia-detalhe.html?id=${noticia.id}`
    titleLink.textContent = noticia.title
    title.appendChild(titleLink)

    // Resumo
    const excerpt = document.createElement('p')
    excerpt.className = 'news-card-excerpt'
    excerpt.textContent =
      noticia.excerpt || noticia.content.substring(0, 120) + '...'

    // Metadados
    const meta = document.createElement('div')
    meta.className = 'article-meta'

    // Data
    const dateSpan = document.createElement('span')
    dateSpan.innerHTML = `<i class="far fa-calendar"></i> ${formatDate(
      noticia.created_at
    )}`

    // Tempo de leitura
    const timeSpan = document.createElement('span')
    timeSpan.innerHTML = `<i class="far fa-clock"></i> ${
      noticia.reading_time || '5 min'
    }`

    // Visualizações
    const viewsSpan = document.createElement('span')
    viewsSpan.innerHTML = `<i class="far fa-eye"></i> ${noticia.views || '0'}`

    // Adicionar metadados
    meta.appendChild(dateSpan)
    meta.appendChild(timeSpan)
    meta.appendChild(viewsSpan)

    // Montar conteúdo
    contentDiv.appendChild(title)
    contentDiv.appendChild(excerpt)
    contentDiv.appendChild(meta)

    // Montar artigo
    article.appendChild(imageLink)
    article.appendChild(contentDiv)

    // Adicionar à grade
    noticiasRelacionadas.appendChild(article)
  })
}

// Carregar sidebar
async function loadSidebar() {
  try {
    if (!window.supabaseClient) return

    // Buscar todas as notícias
    const allNoticias = await window.supabaseClient.fetchNoticias()

    if (!allNoticias || allNoticias.length === 0) return

    // Renderizar últimas atualizações
    renderUltimasAtualizacoes(allNoticias.slice(0, 5))

    // Buscar notícias mais lidas
    const maisLidasNoticias =
      await window.supabaseClient.fetchNoticiasMaisLidas(5)

    // Renderizar mais lidas
    renderMaisLidas(maisLidasNoticias)

    // Renderizar tópicos
    renderTopicos(allNoticias)
  } catch (error) {
    console.error('Erro ao carregar sidebar:', error)
  }
}

// Renderizar últimas atualizações
function renderUltimasAtualizacoes(noticias) {
  if (!noticias || !ultimasAtualizacoes) return

  // Limpar conteúdo existente
  ultimasAtualizacoes.innerHTML = ''

  // Renderizar cada notícia
  noticias.forEach((noticia) => {
    const li = document.createElement('li')

    const a = document.createElement('a')
    a.href = `/noticia-detalhe.html?id=${noticia.id}`
    a.textContent = noticia.title

    const meta = document.createElement('div')
    meta.className = 'sidebar-meta'
    meta.textContent = `${
      noticia.categories ? noticia.categories[0] + ' • ' : ''
    }${formatTime(noticia.created_at)}`

    li.appendChild(a)
    li.appendChild(meta)

    ultimasAtualizacoes.appendChild(li)
  })
}

// Renderizar mais lidas
function renderMaisLidas(noticias) {
  if (!noticias || !maisLidas) return

  // Limpar conteúdo existente
  maisLidas.innerHTML = ''

  // Renderizar cada notícia
  noticias.forEach((noticia) => {
    const li = document.createElement('li')

    const a = document.createElement('a')
    a.href = `/noticia-detalhe.html?id=${noticia.id}`
    a.textContent = noticia.title

    li.appendChild(a)

    maisLidas.appendChild(li)
  })
}

// Renderizar tópicos
function renderTopicos(noticias) {
  if (!noticias || !topicos) return

  // Limpar conteúdo existente
  topicos.innerHTML = ''

  // Extrair todas as categorias únicas
  const categories = new Set()

  noticias.forEach((noticia) => {
    if (noticia.categories) {
      noticia.categories.forEach((category) => categories.add(category))
    }
  })

  // Criar tags para cada categoria
  categories.forEach((category) => {
    const a = document.createElement('a')
    a.href = `/noticia.html?categoria=${category.toLowerCase()}`
    a.className = 'topic-tag'
    a.textContent = category.charAt(0).toUpperCase() + category.slice(1)

    topicos.appendChild(a)
  })
}

// Incrementar visualizações
async function incrementarVisualizacoes(id) {
  try {
    if (!window.supabaseClient) return

    await window.supabaseClient.incrementarVisualizacoes(id)
  } catch (error) {
    console.error('Erro ao incrementar visualizações:', error)
  }
}

// Configurar ouvintes de eventos
function setupEventListeners() {
  // Formulário de newsletter
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function (e) {
      e.preventDefault()
      const email = this.querySelector('.newsletter-input').value

      if (email) {
        try {
          const result = await window.supabaseClient.inscreverNewsletter(email)
          alert(result.message)
          if (result.success) {
            this.reset()
          }
        } catch (error) {
          console.error('Erro ao inscrever no newsletter:', error)
          alert('Erro ao processar inscrição. Tente novamente.')
        }
      }
    })
  }
}

// Exibir mensagem de erro
function showError(message) {
  if (!noticiaDetalhe) return

  noticiaDetalhe.innerHTML = `
    <div class="noticia-error">
      <i class="fas fa-exclamation-circle"></i>
      <h2>Ops! Algo deu errado</h2>
      <p>${message}</p>
      <a href="/noticia.html" class="btn-voltar">Voltar para Notícias</a>
    </div>
  `
}

// Formatar data
function formatDate(dateString) {
  if (!dateString) return ''

  const date = new Date(dateString)
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  return date.toLocaleDateString('pt-BR', options)
}

// Formatar hora
function formatTime(dateString) {
  if (!dateString) return ''

  const date = new Date(dateString)
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
