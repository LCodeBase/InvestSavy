/**
 * Melhoria de Acessibilidade para Imagens - InvestSavy
 * Este arquivo contém funções para melhorar a acessibilidade e experiência do usuário com imagens
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar melhorias de acessibilidade para imagens
  enhanceImageAccessibility();
});

/**
 * Melhora a acessibilidade e experiência do usuário para imagens clicáveis
 */
function enhanceImageAccessibility() {
  // Adicionar atributos de acessibilidade às imagens da página principal
  enhanceFeaturedImage();
  enhanceNewsCardImages();

  // Adicionar atributos de acessibilidade às imagens da página de detalhes
  enhanceNoticiaDetalheImage();
  enhanceContentImages();
}

/**
 * Melhora a acessibilidade da imagem em destaque
 */
function enhanceFeaturedImage() {
  const featuredImage = document.querySelector('.featured-image');
  if (!featuredImage) return;

  // Adicionar role e tabindex para acessibilidade
  featuredImage.setAttribute('role', 'button');
  featuredImage.setAttribute('tabindex', '0');

  // Adicionar título para tooltip
  const featuredTitle = document.querySelector('.featured-title a');
  if (featuredTitle) {
    featuredImage.setAttribute('title', `Ver notícia: ${featuredTitle.textContent}`);
    featuredImage.setAttribute('aria-label', `Ver notícia: ${featuredTitle.textContent}`);
  }

  // Adicionar evento de teclado para acessibilidade
  featuredImage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const link = document.querySelector('.featured-image-link');
      if (link) {
        window.location.href = link.href;
      }
    }
  });
}

/**
 * Melhora a acessibilidade das imagens dos cards de notícias
 */
function enhanceNewsCardImages() {
  const newsCardImages = document.querySelectorAll('.news-card-image');
  if (!newsCardImages.length) return;

  newsCardImages.forEach(image => {
    // Adicionar role e tabindex para acessibilidade
    image.setAttribute('role', 'button');
    image.setAttribute('tabindex', '0');

    // Adicionar título para tooltip
    const cardTitle = image.closest('.news-card').querySelector('.news-card-title a');
    if (cardTitle) {
      image.setAttribute('title', `Ver notícia: ${cardTitle.textContent}`);
      image.setAttribute('aria-label', `Ver notícia: ${cardTitle.textContent}`);
    }

    // Adicionar evento de teclado para acessibilidade
    image.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const link = image.closest('.news-card-image-link');
        if (link) {
          window.location.href = link.href;
        }
      }
    });
  });
}

/**
 * Melhora a acessibilidade da imagem principal na página de detalhes da notícia
 */
function enhanceNoticiaDetalheImage() {
  const noticiaImage = document.querySelector('.noticia-featured-image');
  if (!noticiaImage) return;

  // Adicionar atributos de acessibilidade
  const noticiaTitle = document.querySelector('.noticia-title');
  if (noticiaTitle) {
    noticiaImage.setAttribute('title', noticiaTitle.textContent);
    noticiaImage.setAttribute('aria-label', `Imagem principal: ${noticiaTitle.textContent}`);
  }
}

/**
 * Melhora a acessibilidade das imagens dentro do conteúdo da notícia
 */
function enhanceContentImages() {
  const contentImages = document.querySelectorAll('.noticia-content img');
  if (!contentImages.length) return;

  contentImages.forEach(img => {
    // Verificar se já tem alt text
    if (!img.alt || img.alt === '') {
      // Tentar usar o título da notícia como fallback
      const noticiaTitle = document.querySelector('.noticia-title');
      if (noticiaTitle) {
        img.alt = `Imagem relacionada à notícia: ${noticiaTitle.textContent}`;
      } else {
        img.alt = 'Imagem relacionada à notícia';
      }
    }

    // Adicionar título para tooltip se não existir
    if (!img.title) {
      img.title = img.alt;
    }

    // Adicionar classe para estilização
    img.classList.add('content-image');

    // Envolver a imagem em um link para ampliação, se ainda não estiver em um link
    if (!img.parentElement.tagName === 'A') {
      const imgSrc = img.src;
      const wrapper = document.createElement('a');
      wrapper.href = imgSrc;
      wrapper.setAttribute('target', '_blank');
      wrapper.setAttribute('rel', 'noopener noreferrer');
      wrapper.setAttribute('aria-label', `Ampliar imagem: ${img.alt}`);
      wrapper.classList.add('image-zoom-link');

      // Substituir a imagem pelo wrapper com a imagem dentro
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    }
  });
}