/**
 * Manipulador de Notícias - InvestSavy
 * Este arquivo contém as funções para carregar e exibir notícias do Supabase
 */

// Configurações
const CONFIG = {
  itemsPerPage: 6,
  maxFeaturedNews: 1,
  maxLatestUpdates: 5,
  maxMostRead: 5,
  maxTopics: 10,
}

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

// Dados mock para teste
const MOCK_DATA = {
  noticias: [
    {
      id: 1,
      titulo: 'Mercado de ações tem alta expressiva após anúncio do BC',
      resumo:
        'O Ibovespa subiu mais de 2% após o Banco Central anunciar redução na taxa Selic',
      imagem: 'https://picsum.photos/800/400',
      categoria: 'Mercados',
      data: new Date(),
      visualizacoes: 1234,
      autor: 'Equipe InvestSavy',
      link: '#',
      topicos: ['Mercado de Ações', 'Banco Central', 'Selic'],
    },
    {
      id: 2,
      titulo: 'Nova ferramenta de análise técnica disponível',
      resumo:
        'InvestSavy lança nova ferramenta gratuita para análise técnica de ações',
      imagem: 'https://picsum.photos/800/401',
      categoria: 'Tecnologia',
      data: new Date(),
      visualizacoes: 856,
      autor: 'Equipe InvestSavy',
      link: '#',
      topicos: ['Análise Técnica', 'Ferramentas', 'Investimentos'],
    },
    {
      id: 3,
      titulo: 'Guia completo: Como começar a investir em 2024',
      resumo:
        'Aprenda os passos fundamentais para começar sua jornada de investimentos',
      imagem: 'https://picsum.photos/800/402',
      categoria: 'Finanças Pessoais',
      data: new Date(),
      visualizacoes: 2345,
      autor: 'Equipe InvestSavy',
      link: '#',
      topicos: ['Educação Financeira', 'Investimentos', 'Iniciantes'],
    },
  ],
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
    // Usar dados mock temporariamente
    const data = MOCK_DATA.noticias

    if (data.length < CONFIG.itemsPerPage) {
      state.hasMore = false
      elements.loadMoreBtn.style.display = 'none'
    }

    state.news = [...state.news, ...data]
    elements.newsGrid.innerHTML += data.map(createNewsCard).join('')
    elements.newsCount.textContent = `${state.news.length} notícias`

    if (state.currentPage === 1) {
      // Carregar notícia em destaque
      const featured = data[0]
      if (featured) {
        state.featuredNews = featured
        elements.featuredNews.innerHTML = createFeaturedNews(featured)
      }

      // Carregar últimas atualizações
      const latest = data.slice(0, CONFIG.maxLatestUpdates)
      elements.latestUpdates.innerHTML = latest.map(createLatestUpdate).join('')

      // Carregar mais lidas
      const mostRead = data
        .sort((a, b) => b.visualizacoes - a.visualizacoes)
        .slice(0, CONFIG.maxMostRead)
      elements.mostRead.innerHTML = mostRead.map(createMostRead).join('')

      // Carregar tópicos
      const topics = [...new Set(data.flatMap((n) => n.topicos || []))]
        .map((topic) => ({
          nome: topic,
          count: data.filter((n) => (n.topicos || []).includes(topic)).length,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, CONFIG.maxTopics)
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
