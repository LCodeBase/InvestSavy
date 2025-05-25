/**
 * Manipulador de Notícias - InvestSavy
 * Este arquivo contém as funções para carregar e exibir notícias
 */

import httpClient from './http-client.js'
import xssProtection from './xss-protection.js'
import security from './security.js'

// Estado da aplicação
let state = {
  currentPage: 1,
  currentFilter: 'all',
  isLoading: false,
  hasMore: true,
  news: [],
  featuredNews: null,
}

// Elementos DOM
const elements = {
  newsGrid: document.querySelector('.news-grid'),
  loadMoreBtn: document.getElementById('loadMoreBtn'),
  filterBtns: document.querySelectorAll('.filter-btn'),
  featuredNews: document.querySelector('.featured-article'),
  latestUpdates: document.getElementById('ultimasAtualizacoes'),
  mostRead: document.getElementById('maisLidas'),
  topics: document.getElementById('topicos'),
  newsCount: document.querySelector('.news-count'),
}

// Funções auxiliares
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const createNewsCard = (news) => {
  return `
    <article class="news-card" data-category="${news.categoria}">
      <a href="${news.link}" class="news-image-link">
        <div class="news-image" style="background-image: url('${
          news.imagem
        }')" role="img" aria-label="${news.titulo}"></div>
      </a>
      <div class="news-content">
        <span class="news-category">${news.categoria}</span>
        <h3 class="news-title">
          <a href="${news.link}">${news.titulo}</a>
        </h3>
        <p class="news-excerpt">${news.resumo}</p>
        <div class="article-meta">
          <span><i class="far fa-calendar"></i> ${formatDate(news.data)}</span>
          <span><i class="far fa-clock"></i> ${formatTime(news.data)}</span>
          <span><i class="far fa-eye"></i> ${news.visualizacoes}</span>
          <span>${news.autor}</span>
        </div>
      </div>
    </article>
  `
}

const createFeaturedNews = (news) => {
  return `
    <a href="${news.link}" class="featured-image-link">
      <div class="featured-image" style="background-image: url('${
        news.imagem
      }')" role="img" aria-label="${news.titulo}"></div>
    </a>
    <div class="featured-content">
      <h2 class="featured-title">
        <a href="${news.link}">${news.titulo}</a>
      </h2>
      <p class="featured-excerpt">${news.resumo}</p>
      <div class="article-meta">
        <span><i class="far fa-calendar"></i> ${formatDate(news.data)}</span>
        <span><i class="far fa-clock"></i> ${formatTime(news.data)}</span>
        <span><i class="far fa-eye"></i> ${news.visualizacoes}</span>
        <span>${news.autor}</span>
      </div>
    </div>
  `
}

const createLatestUpdate = (news) => {
  return `
    <li>
      <a href="${news.link}">
        <span class="update-time">${formatTime(news.data)}</span>
        <span class="update-title">${news.titulo}</span>
      </a>
    </li>
  `
}

const createMostRead = (news) => {
  return `
    <li>
      <a href="${news.link}">
        <span class="read-count"><i class="far fa-eye"></i> ${news.visualizacoes}</span>
        <span class="read-title">${news.titulo}</span>
      </a>
    </li>
  `
}

const createTopic = (topic) => {
  return `
    <a href="/noticia.html?topico=${encodeURIComponent(
      topic.nome
    )}" class="topic-tag">
      ${topic.nome}
      <span class="topic-count">${topic.count}</span>
    </a>
  `
}

// Funções principais
const loadNews = async () => {
  if (state.isLoading || !state.hasMore) return

  state.isLoading = true
  elements.loadMoreBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Carregando...'

  try {
    // Usar o cliente Supabase mock
    const data = await supabaseClient.db.getNews({
      categoria: state.currentFilter === 'all' ? null : state.currentFilter,
      limit: 6,
      offset: (state.currentPage - 1) * 6,
    })

    if (data.length < 6) {
      state.hasMore = false
      elements.loadMoreBtn.style.display = 'none'
    }

    state.news = [...state.news, ...data]
    elements.newsGrid.innerHTML += data.map(createNewsCard).join('')
    elements.newsCount.textContent = `${state.news.length} notícias`

    if (state.currentPage === 1) {
      // Carregar notícia em destaque
      const featured = await supabaseClient.db.getFeaturedNews(1)
      if (featured && featured.length > 0) {
        state.featuredNews = featured[0]
        elements.featuredNews.innerHTML = createFeaturedNews(featured[0])
      }

      // Carregar mais lidas
      const mostRead = await supabaseClient.db.getMostReadNews(5)
      elements.mostRead.innerHTML = mostRead.map(createMostRead).join('')

      // Carregar últimas atualizações (usando as mesmas notícias)
      elements.latestUpdates.innerHTML = data
        .slice(0, 5)
        .map(createLatestUpdate)
        .join('')

      // Carregar tópicos
      const topics = [...new Set(data.flatMap((n) => n.topicos || []))]
        .map((topic) => ({
          nome: topic,
          count: data.filter((n) => (n.topicos || []).includes(topic)).length,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
      elements.topics.innerHTML = topics.map(createTopic).join('')
    }

    state.currentPage++
  } catch (error) {
    console.error('Erro ao carregar notícias:', error)
    elements.newsGrid.innerHTML += `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        Erro ao carregar notícias. Por favor, tente novamente.
      </div>
    `
  } finally {
    state.isLoading = false
    elements.loadMoreBtn.innerHTML =
      '<i class="fas fa-plus"></i> Carregar mais notícias'
  }
}

const handleFilter = (filter) => {
  if (filter === state.currentFilter) return

  state.currentFilter = filter
  state.currentPage = 1
  state.hasMore = true
  state.news = []
  elements.newsGrid.innerHTML = ''
  elements.loadMoreBtn.style.display = 'block'

  elements.filterBtns.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.filter === filter)
  })

  loadNews()
}

// Event Listeners
elements.loadMoreBtn.addEventListener('click', loadNews)

elements.filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => handleFilter(btn.dataset.filter))
})

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadNews()

  // Adicionar animação de fade-in aos cards
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.news-card').forEach((card) => {
    observer.observe(card)
  })
})

const noticiasHandler = {
  // Função para carregar notícias
  async loadNoticias(params = {}) {
    try {
      // Sanitizar parâmetros
      const sanitizedParams = xssProtection.sanitizeObject(params)

      // Fazer requisição
      const noticias = await httpClient.get('/noticias', {
        params: sanitizedParams,
      })

      // Sanitizar resposta
      return noticias.map((noticia) => ({
        ...noticia,
        titulo: xssProtection.sanitizeText(noticia.titulo),
        conteudo: xssProtection.sanitizeHTML(noticia.conteudo),
        imagem: xssProtection.sanitizeURL(noticia.imagem),
      }))
    } catch (error) {
      console.error('Erro ao carregar notícias:', error)
      throw error
    }
  },

  // Função para carregar notícia por ID
  async loadNoticiaById(id) {
    try {
      // Sanitizar ID
      const sanitizedId = security.sanitizeInput(id)

      // Fazer requisição
      const noticia = await httpClient.get(`/noticias/${sanitizedId}`)

      // Sanitizar resposta
      return {
        ...noticia,
        titulo: xssProtection.sanitizeText(noticia.titulo),
        conteudo: xssProtection.sanitizeHTML(noticia.conteudo),
        imagem: xssProtection.sanitizeURL(noticia.imagem),
      }
    } catch (error) {
      console.error('Erro ao carregar notícia:', error)
      throw error
    }
  },

  // Função para criar notícia
  async createNoticia(noticia) {
    try {
      // Sanitizar dados
      const sanitizedNoticia = {
        ...noticia,
        titulo: xssProtection.sanitizeText(noticia.titulo),
        conteudo: xssProtection.sanitizeHTML(noticia.conteudo),
        imagem: xssProtection.sanitizeURL(noticia.imagem),
      }

      // Validar dados
      if (!sanitizedNoticia.titulo || !sanitizedNoticia.conteudo) {
        throw new Error('Título e conteúdo são obrigatórios')
      }

      // Fazer requisição
      return await httpClient.post('/noticias', sanitizedNoticia)
    } catch (error) {
      console.error('Erro ao criar notícia:', error)
      throw error
    }
  },

  // Função para atualizar notícia
  async updateNoticia(id, noticia) {
    try {
      // Sanitizar ID e dados
      const sanitizedId = security.sanitizeInput(id)
      const sanitizedNoticia = {
        ...noticia,
        titulo: xssProtection.sanitizeText(noticia.titulo),
        conteudo: xssProtection.sanitizeHTML(noticia.conteudo),
        imagem: xssProtection.sanitizeURL(noticia.imagem),
      }

      // Validar dados
      if (!sanitizedNoticia.titulo || !sanitizedNoticia.conteudo) {
        throw new Error('Título e conteúdo são obrigatórios')
      }

      // Fazer requisição
      return await httpClient.put(`/noticias/${sanitizedId}`, sanitizedNoticia)
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error)
      throw error
    }
  },

  // Função para deletar notícia
  async deleteNoticia(id) {
    try {
      // Sanitizar ID
      const sanitizedId = security.sanitizeInput(id)

      // Fazer requisição
      return await httpClient.delete(`/noticias/${sanitizedId}`)
    } catch (error) {
      console.error('Erro ao deletar notícia:', error)
      throw error
    }
  },

  // Função para incrementar visualizações
  async incrementViews(id) {
    try {
      // Sanitizar ID
      const sanitizedId = security.sanitizeInput(id)

      // Fazer requisição
      return await httpClient.post(`/noticias/${sanitizedId}/views`)
    } catch (error) {
      console.error('Erro ao incrementar visualizações:', error)
      throw error
    }
  },
}

export default noticiasHandler
