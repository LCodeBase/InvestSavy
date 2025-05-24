/**
 * Manipulador de Notícias - InvestSavy
 * Este arquivo contém as funções para carregar e exibir notícias do Supabase
 */

// Elementos DOM
let featuredArticle;
let newsGrid;
let filterButtons;
let topicTags;
let loadMoreBtn;
let sidebarLatest;
let sidebarMostRead;
let sidebarTopics;
let newsletterForm;

// Estado da aplicação
let currentFilter = 'all';
let currentPage = 1;
let postsPerPage = 8;
let allPosts = [];

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
  // Inicializar elementos DOM
  initDOMElements();

  // Carregar notícias do Supabase
  await loadNoticias();

  // Configurar eventos
  setupEventListeners();
});

// Inicializar elementos DOM
function initDOMElements() {
  featuredArticle = document.querySelector('.featured-article');
  newsGrid = document.querySelector('.news-grid');
  filterButtons = document.querySelectorAll('.filter-btn');
  topicTags = document.querySelectorAll('.topic-tag');
  loadMoreBtn = document.getElementById('loadMoreBtn');
  sidebarLatest = document.querySelector('.sidebar-section:nth-child(1) .sidebar-list');
  sidebarMostRead = document.querySelector('.sidebar-section:nth-child(2) .sidebar-list');
  sidebarTopics = document.querySelector('.topics-tags');
  newsletterForm = document.getElementById('newsletterForm');
}

// Carregar notícias do Supabase
async function loadNoticias() {
  try {
    // Verificar se o cliente Supabase está disponível
    if (!window.supabaseClient) {
      console.error('Cliente Supabase não encontrado');
      return;
    }

    // Buscar todas as notícias
    allPosts = await window.supabaseClient.fetchNoticias();

    if (allPosts.length === 0) {
      console.warn('Nenhuma notícia encontrada');
      return;
    }

    // Renderizar notícias
    renderFeaturedArticle(allPosts[0]);
    renderNewsGrid(allPosts.slice(1, postsPerPage + 1));
    renderSidebar(allPosts);
    updatePostCount(allPosts.length);

    // Atualizar botão "Carregar mais"
    updateLoadMoreButton();

  } catch (error) {
    console.error('Erro ao carregar notícias:', error);
  }
}

// Renderizar artigo em destaque
function renderFeaturedArticle(post) {
  if (!post || !featuredArticle) return;

  // Criar elemento de link para envolver a imagem
  const imageLink = document.createElement('a');
  imageLink.href = `/noticia-detalhe.html?id=${post.id}`;
  imageLink.classList.add('featured-image-link');

  // Obter o elemento da imagem em destaque
  const featuredImage = featuredArticle.querySelector('.featured-image');

  // Definir a imagem de fundo
  featuredImage.style.backgroundImage = `url('${post.image || '/images/default-news.jpg'}')`;

  // Substituir o elemento da imagem pelo link com a imagem
  featuredImage.parentNode.replaceChild(imageLink, featuredImage);
  imageLink.appendChild(featuredImage);

  // Atualizar o título e o link
  const titleElement = featuredArticle.querySelector('.featured-title a');
  titleElement.href = `/noticia-detalhe.html?id=${post.id}`;
  titleElement.textContent = post.title;

  // Atualizar o resumo
  const excerptElement = featuredArticle.querySelector('.featured-excerpt');
  excerptElement.textContent = post.excerpt || post.content.substring(0, 200) + '...';

  // Atualizar os metadados
  const metaElements = featuredArticle.querySelectorAll('.article-meta span');
  if (metaElements.length >= 4) {
    // Data
    metaElements[0].innerHTML = `<i class="far fa-calendar"></i> ${formatDate(post.created_at)}`;
    // Tempo de leitura
    metaElements[1].innerHTML = `<i class="far fa-clock"></i> ${post.reading_time || '5 min de leitura'}`;
    // Visualizações
    metaElements[2].innerHTML = `<i class="far fa-eye"></i> ${post.views || '0'}`;
    // Autor
    metaElements[3].textContent = `Por ${post.author || 'Equipe InvestSavy'}`;
  }
}

// Renderizar grade de notícias
function renderNewsGrid(posts) {
  if (!posts || !newsGrid) return;

  // Limpar grade existente
  newsGrid.innerHTML = '';

  // Renderizar cada notícia
  posts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'news-card';
    article.setAttribute('data-category', post.categories ? post.categories.map(c => c.toLowerCase()).join(' ') : '');

    // Criar elemento de link para envolver a imagem
    const imageLink = document.createElement('a');
    imageLink.href = `/noticia-detalhe.html?id=${post.id}`;
    imageLink.classList.add('news-card-image-link');

    // Criar div da imagem
    const imageDiv = document.createElement('div');
    imageDiv.className = 'news-card-image';
    imageDiv.style.backgroundImage = `url('${post.image || '/images/default-news.jpg'}')`;

    // Adicionar categoria se existir
    if (post.categories && post.categories.length > 0) {
      const categorySpan = document.createElement('span');
      categorySpan.className = 'news-category';
      categorySpan.textContent = post.categories[0].charAt(0).toUpperCase() + post.categories[0].slice(1);
      imageDiv.appendChild(categorySpan);
    }

    // Adicionar imagem ao link
    imageLink.appendChild(imageDiv);

    // Criar div do conteúdo
    const contentDiv = document.createElement('div');
    contentDiv.className = 'news-card-content';

    // Título
    const title = document.createElement('h3');
    title.className = 'news-card-title';
    const titleLink = document.createElement('a');
    titleLink.href = `/noticia-detalhe.html?id=${post.id}`;
    titleLink.textContent = post.title;
    title.appendChild(titleLink);

    // Resumo
    const excerpt = document.createElement('p');
    excerpt.className = 'news-card-excerpt';
    excerpt.textContent = post.excerpt || post.content.substring(0, 120) + '...';

    // Metadados
    const meta = document.createElement('div');
    meta.className = 'article-meta';

    // Data
    const dateSpan = document.createElement('span');
    dateSpan.innerHTML = `<i class="far fa-calendar"></i> ${formatDate(post.created_at)}`;

    // Tempo de leitura
    const timeSpan = document.createElement('span');
    timeSpan.innerHTML = `<i class="far fa-clock"></i> ${post.reading_time || '5 min'}`;

    // Visualizações
    const viewsSpan = document.createElement('span');
    viewsSpan.innerHTML = `<i class="far fa-eye"></i> ${post.views || '0'}`;

    // Adicionar metadados
    meta.appendChild(dateSpan);
    meta.appendChild(timeSpan);
    meta.appendChild(viewsSpan);

    // Montar conteúdo
    contentDiv.appendChild(title);
    contentDiv.appendChild(excerpt);
    contentDiv.appendChild(meta);

    // Montar artigo
    article.appendChild(imageLink);
    article.appendChild(contentDiv);

    // Adicionar à grade
    newsGrid.appendChild(article);
  });
}

// Renderizar barra lateral
function renderSidebar(posts) {
  if (!posts) return;

  // Últimas atualizações
  if (sidebarLatest) {
    sidebarLatest.innerHTML = '';
    posts.slice(0, 5).forEach(post => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `/noticia-detalhe.html?id=${post.id}`;
      a.textContent = post.title;

      const meta = document.createElement('div');
      meta.className = 'sidebar-meta';
      meta.textContent = `${post.categories ? post.categories[0] + ' • ' : ''}${formatTime(post.created_at)}`;

      li.appendChild(a);
      li.appendChild(meta);
      sidebarLatest.appendChild(li);
    });
  }

  // Mais lidas
  if (sidebarMostRead) {
    sidebarMostRead.innerHTML = '';

    // Ordenar por visualizações
    const sortedPosts = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0));

    sortedPosts.slice(0, 5).forEach(post => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `/noticia-detalhe.html?id=${post.id}`;
      a.textContent = post.title;

      li.appendChild(a);
      sidebarMostRead.appendChild(li);
    });
  }

  // Tópicos
  if (sidebarTopics) {
    sidebarTopics.innerHTML = '';

    // Extrair todas as categorias únicas
    const categories = new Set();
    posts.forEach(post => {
      if (post.categories) {
        post.categories.forEach(category => categories.add(category));
      }
    });

    // Criar tags para cada categoria
    categories.forEach(category => {
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'topic-tag';
      a.setAttribute('data-filter', category.toLowerCase());
      a.textContent = category.charAt(0).toUpperCase() + category.slice(1);

      sidebarTopics.appendChild(a);
    });

    // Adicionar eventos aos novos tópicos
    document.querySelectorAll('.topic-tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        const filterValue = tag.getAttribute('data-filter');

        // Encontrar e clicar no botão de filtro correspondente
        const matchingBtn = document.querySelector(`[data-filter="${filterValue}"]`);
        if (matchingBtn) {
          matchingBtn.click();
        }
      });
    });
  }
}

// Configurar ouvintes de eventos
function setupEventListeners() {
  // Filtros de notícias
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover classe ativa de todos os botões
      filterButtons.forEach(b => b.classList.remove('active'));
      // Adicionar classe ativa ao botão clicado
      btn.classList.add('active');

      // Obter valor do filtro
      currentFilter = btn.getAttribute('data-filter');

      // Filtrar notícias
      filterNews();
    });
  });

  // Botão "Carregar mais"
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreNews);
  }

  // Formulário de newsletter
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = this.querySelector('.newsletter-input').value;

      if (email) {
        try {
          const result = await window.supabaseClient.inscreverNewsletter(email);
          alert(result.message);
          if (result.success) {
            this.reset();
          }
        } catch (error) {
          console.error('Erro ao inscrever no newsletter:', error);
          alert('Erro ao processar inscrição. Tente novamente.');
        }
      }
    });
  }
}

// Filtrar notícias
function filterNews() {
  // Resetar página atual
  currentPage = 1;

  // Filtrar posts
  let filteredPosts = allPosts;

  if (currentFilter !== 'all') {
    filteredPosts = allPosts.filter(post => {
      return post.categories && post.categories.some(category =>
        category.toLowerCase() === currentFilter.toLowerCase()
      );
    });
  }

  // Renderizar posts filtrados
  renderNewsGrid(filteredPosts.slice(1, postsPerPage + 1));

  // Atualizar contagem de posts
  updatePostCount(filteredPosts.length);

  // Atualizar botão "Carregar mais"
  updateLoadMoreButton(filteredPosts.length);
}

// Carregar mais notícias
function loadMoreNews() {
  currentPage++;

  // Filtrar posts
  let filteredPosts = allPosts;

  if (currentFilter !== 'all') {
    filteredPosts = allPosts.filter(post => {
      return post.categories && post.categories.some(category =>
        category.toLowerCase() === currentFilter.toLowerCase()
      );
    });
  }

  // Calcular índices
  const startIndex = 1 + (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  // Obter posts para a página atual
  const postsToAdd = filteredPosts.slice(startIndex, endIndex);

  // Adicionar posts à grade
  postsToAdd.forEach(post => {
    const article = document.createElement('article');
    article.className = 'news-card';
    article.setAttribute('data-category', post.categories ? post.categories.map(c => c.toLowerCase()).join(' ') : '');

    // Criar elemento de link para envolver a imagem
    const imageLink = document.createElement('a');
    imageLink.href = `/noticia-detalhe.html?id=${post.id}`;
    imageLink.classList.add('news-card-image-link');

    // Criar div da imagem
    const imageDiv = document.createElement('div');
    imageDiv.className = 'news-card-image';
    imageDiv.style.backgroundImage = `url('${post.image || '/images/default-news.jpg'}')`;

    // Adicionar categoria se existir
    if (post.categories && post.categories.length > 0) {
      const categorySpan = document.createElement('span');
      categorySpan.className = 'news-category';
      categorySpan.textContent = post.categories[0].charAt(0).toUpperCase() + post.categories[0].slice(1);
      imageDiv.appendChild(categorySpan);
    }

    // Adicionar imagem ao link
    imageLink.appendChild(imageDiv);

    // Criar div do conteúdo
    const contentDiv = document.createElement('div');
    contentDiv.className = 'news-card-content';

    // Título
    const title = document.createElement('h3');
    title.className = 'news-card-title';
    const titleLink = document.createElement('a');
    titleLink.href = `/noticia-detalhe.html?id=${post.id}`;
    titleLink.textContent = post.title;
    title.appendChild(titleLink);

    // Resumo
    const excerpt = document.createElement('p');
    excerpt.className = 'news-card-excerpt';
    excerpt.textContent = post.excerpt || post.content.substring(0, 120) + '...';

    // Metadados
    const meta = document.createElement('div');
    meta.className = 'article-meta';

    // Data
    const dateSpan = document.createElement('span');
    dateSpan.innerHTML = `<i class="far fa-calendar"></i> ${formatDate(post.created_at)}`;

    // Tempo de leitura
    const timeSpan = document.createElement('span');
    timeSpan.innerHTML = `<i class="far fa-clock"></i> ${post.reading_time || '5 min'}`;

    // Visualizações
    const viewsSpan = document.createElement('span');
    viewsSpan.innerHTML = `<i class="far fa-eye"></i> ${post.views || '0'}`;

    // Adicionar metadados
    meta.appendChild(dateSpan);
    meta.appendChild(timeSpan);
    meta.appendChild(viewsSpan);

    // Montar conteúdo
    contentDiv.appendChild(title);
    contentDiv.appendChild(excerpt);
    contentDiv.appendChild(meta);

    // Montar artigo
    article.appendChild(imageLink);
    article.appendChild(contentDiv);

    // Adicionar à grade
    newsGrid.appendChild(article);
  });

  // Atualizar botão "Carregar mais"
  updateLoadMoreButton(filteredPosts.length);
}

// Atualizar contagem de posts
function updatePostCount(count) {
  const countElement = document.querySelector('.recent-news h2 span');
  if (countElement) {
    countElement.textContent = `${count} artigos encontrados`;
  }
}

// Atualizar botão "Carregar mais"
function updateLoadMoreButton(totalPosts = allPosts.length) {
  if (!loadMoreBtn) return;

  const displayedPosts = 1 + currentPage * postsPerPage; // +1 para o artigo em destaque

  if (displayedPosts >= totalPosts) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

// Formatar data
function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

// Formatar hora
function formatTime(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}