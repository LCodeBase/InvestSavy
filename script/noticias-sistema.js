document.addEventListener('DOMContentLoaded', function() {
  // Elementos DOM
  const newsGrid = document.getElementById('news-grid');
  const singleNewsContainer = document.getElementById('single-news-container');
  const newsListContainer = document.getElementById('news-list-container');
  const loadMoreBtn = document.getElementById('load-more');
  const searchInput = document.getElementById('news-search');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Variáveis de estado
  let allNews = [];
  let filteredNews = [];
  let currentPage = 1;
  let newsPerPage = 6;
  let currentCategory = 'all';
  let searchTerm = '';

  // Função para carregar as notícias do JSON
  async function loadNews() {
    try {
      const response = await fetch('/data/noticias.json');
      if (!response.ok) {
        throw new Error(`Erro ao carregar notícias: ${response.status}`);
      }

      allNews = await response.json();
      // Ordenar notícias por data (mais recentes primeiro)
      allNews.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Aplicar filtros iniciais
      applyFilters();

    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
      newsGrid.innerHTML = `<p class="error-message">Não foi possível carregar as notícias. Por favor, tente novamente mais tarde.</p>`;
    }
  }

  // Função para aplicar filtros (categoria e busca)
  function applyFilters() {
    filteredNews = allNews.filter(news => {
      // Filtro de categoria
      const categoryMatch = currentCategory === 'all' || news.categories.includes(currentCategory);

      // Filtro de busca
      const searchMatch = searchTerm === '' ||
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });

    // Resetar paginação e renderizar
    currentPage = 1;
    renderNewsList();
    updateLoadMoreButton();
  }

  // Função para renderizar a lista de notícias
  function renderNewsList() {
    // Limpar grid
    newsGrid.innerHTML = '';

    // Calcular quais notícias mostrar na página atual
    const startIndex = 0;
    const endIndex = currentPage * newsPerPage;
    const newsToShow = filteredNews.slice(startIndex, endIndex);

    if (newsToShow.length === 0) {
      newsGrid.innerHTML = `<p class="no-results">Nenhuma notícia encontrada.</p>`;
      return;
    }

    // Renderizar cada notícia
    newsToShow.forEach(news => {
      const date = new Date(news.date);
      const formattedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      const newsCard = document.createElement('div');
      newsCard.className = 'news-card';
      newsCard.innerHTML = `
        <img src="${news.image}" alt="${news.alt_image || news.title}" class="news-image">
        <div class="news-content">
          <h3 class="news-title">${news.title}</h3>
          <p class="news-excerpt">${news.excerpt}</p>
          <div class="news-meta">
            <span class="news-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
            <span class="news-author"><i class="far fa-user"></i> ${news.author}</span>
          </div>
          <a href="#${news.id}" class="news-link" data-id="${news.id}">Ler mais</a>
        </div>
      `;

      newsGrid.appendChild(newsCard);
    });

    // Adicionar event listeners para os links "Ler mais"
    document.querySelectorAll('.news-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const newsId = this.getAttribute('data-id');
        showSingleNews(newsId);
        // Atualizar URL com hash
        window.history.pushState(null, null, `#${newsId}`);
      });
    });
  }

  // Função para mostrar uma notícia individual
  function showSingleNews(newsId) {
    const news = allNews.find(item => item.id === newsId);

    if (!news) {
      console.error('Notícia não encontrada:', newsId);
      return;
    }

    const date = new Date(news.date);
    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    singleNewsContainer.innerHTML = `
      <div class="single-news-header">
        <h1 class="single-news-title">${news.title}</h1>
        <div class="single-news-meta">
          <span class="single-news-date"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>
          <span class="single-news-author"><i class="far fa-user"></i> <a href="${news.author_link}">${news.author}</a></span>
        </div>
      </div>
      <img src="${news.image}" alt="${news.alt_image || news.title}" class="single-news-image">
      <div class="single-news-content">
        ${news.content}
      </div>
      <a href="#" class="back-button" id="back-to-news"><i class="fas fa-arrow-left"></i> Voltar para notícias</a>
    `;

    // Mostrar a notícia individual e esconder a lista
    newsListContainer.style.display = 'none';
    singleNewsContainer.style.display = 'block';

    // Adicionar event listener para o botão de voltar
    document.getElementById('back-to-news').addEventListener('click', function(e) {
      e.preventDefault();
      newsListContainer.style.display = 'block';
      singleNewsContainer.style.display = 'none';
      // Atualizar URL removendo o hash
      window.history.pushState(null, null, window.location.pathname);
    });

    // Rolar para o topo
    window.scrollTo(0, 0);
  }

  // Função para atualizar o botão "Carregar mais"
  function updateLoadMoreButton() {
    const totalDisplayed = currentPage * newsPerPage;

    if (totalDisplayed >= filteredNews.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  }

  // Event Listeners

  // Botão "Carregar mais"
  loadMoreBtn.addEventListener('click', function() {
    currentPage++;
    renderNewsList();
    updateLoadMoreButton();
  });

  // Busca
  searchInput.addEventListener('input', function() {
    searchTerm = this.value.trim();
    applyFilters();
  });

  // Filtros de categoria
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remover classe ativa de todos os botões
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Adicionar classe ativa ao botão clicado
      this.classList.add('active');

      currentCategory = this.getAttribute('data-category');
      applyFilters();
    });
  });

  // Verificar se há um hash na URL para mostrar uma notícia específica
  function checkUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      showSingleNews(hash);
    }
  }

  // Inicialização
  loadNews().then(() => {
    checkUrlHash();
  });

  // Lidar com mudanças no histórico do navegador (botões voltar/avançar)
  window.addEventListener('popstate', function() {
    checkUrlHash();

    // Se não houver hash, mostrar a lista de notícias
    if (!window.location.hash) {
      newsListContainer.style.display = 'block';
      singleNewsContainer.style.display = 'none';
    }
  });

  // Função para adicionar nova notícia (para uso futuro)
  window.addNewArticle = function(articleData) {
    // Validar dados mínimos necessários
    if (!articleData.title || !articleData.content) {
      console.error('Dados insuficientes para criar nova notícia');
      return false;
    }

    // Gerar ID a partir do título se não fornecido
    if (!articleData.id) {
      articleData.id = articleData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^\w\s]/g, '') // Remover caracteres especiais
        .replace(/\s+/g, '-'); // Substituir espaços por hífens
    }

    // Definir data atual se não fornecida
    if (!articleData.date) {
      articleData.date = new Date().toISOString();
    }

    // Adicionar a nova notícia ao array
    allNews.unshift(articleData);

    // Salvar no localStorage para persistência temporária
    localStorage.setItem('investSavyNews', JSON.stringify(allNews));

    // Reaplicar filtros e renderizar
    applyFilters();

    return true;
  };

  // Carregar notícias do localStorage se disponível (para persistência temporária)
  const savedNews = localStorage.getItem('investSavyNews');
  if (savedNews) {
    try {
      allNews = JSON.parse(savedNews);
      applyFilters();
    } catch (e) {
      console.error('Erro ao carregar notícias salvas:', e);
      // Se houver erro, carregar do JSON normalmente
      loadNews();
    }
  } else {
    // Carregar do JSON se não houver dados salvos
    loadNews();
  }
});