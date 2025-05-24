/**
 * Menu Responsivo - InvestSavy
 * Script para implementar menu fixo e hambúrguer em dispositivos móveis
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar o menu responsivo
  initResponsiveMenu();

  // Inicializar o botão de voltar ao topo
  initBackToTop();

  // Inicializar o menu fixo com ocultação ao rolar
  initFixedHeader();
});

/**
 * Inicializa o menu responsivo com funcionalidade de hambúrguer
 */
function initResponsiveMenu() {
  // Elementos do DOM
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  // Criar overlay para o menu móvel se não existir
  let menuOverlay = document.querySelector('.menu-overlay');
  if (!menuOverlay) {
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    body.appendChild(menuOverlay);
  }

  // Se não encontrou o botão de menu, criar um
  if (!menuToggle) {
    createMenuToggle();
    return; // Recarregar a página para aplicar as alterações
  }

  // Adicionar evento de clique ao botão do menu
  menuToggle.addEventListener('click', () => {
    // Toggle das classes ativas
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');

    // Acessibilidade - ARIA
    const isExpanded = menuToggle.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);

    // Prevenir rolagem quando o menu está aberto
    if (isExpanded) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });

  // Fechar o menu ao clicar no overlay
  menuOverlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    body.classList.remove('menu-open');
    body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
  });

  // Adicionar funcionalidade de dropdown no menu móvel
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // Apenas no modo móvel
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const dropdownMenu = toggle.nextElementSibling;
        if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
          dropdownMenu.classList.toggle('show');
          toggle.setAttribute('aria-expanded', dropdownMenu.classList.contains('show'));
        }
      }
    });
  });

  // Fechar o menu ao redimensionar a janela para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      body.classList.remove('menu-open');
      body.style.overflow = '';
      menuToggle.setAttribute('aria-expanded', 'false');

      // Resetar dropdowns
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });

  // Adicionar classe ativa ao item de menu da página atual
  highlightCurrentPage();
}

/**
 * Cria o botão de menu hambúrguer se não existir
 */
function createMenuToggle() {
  const header = document.querySelector('header');
  const navMenu = document.querySelector('.nav-menu, nav ul');

  if (!header || !navMenu) return;

  // Criar o botão de menu
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  // Adicionar o botão ao header
  const navContainer = navMenu.parentElement;
  navContainer.insertBefore(menuToggle, navMenu);

  // Adicionar classe para o menu
  navMenu.classList.add('nav-menu');

  // Recarregar a página para aplicar as alterações
  setTimeout(() => {
    location.reload();
  }, 100);
}

/**
 * Destaca o item de menu da página atual
 */
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath) {
      // Verificar se o caminho do link corresponde à página atual
      if (currentPath === linkPath ||
          (currentPath.includes(linkPath) && linkPath !== '/')) {
        // Adicionar classe ativa ao item de menu
        const navItem = link.closest('.nav-item');
        if (navItem) {
          navItem.classList.add('active');
          // Adicionar aria-current para acessibilidade
          link.setAttribute('aria-current', 'page');
        }
      }
    }
  });
}

/**
 * Inicializa o botão de voltar ao topo
 */
function initBackToTop() {
  // Criar o botão se não existir
  let backToTop = document.querySelector('.back-to-top');
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Voltar ao topo');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
  }

  // Mostrar/ocultar o botão ao rolar
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // Rolar para o topo ao clicar no botão
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Inicializa o header fixo com ocultação ao rolar para baixo
 */
function initFixedHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  // Adicionar classe para o header fixo
  header.classList.add('header-fixed');

  let lastScrollTop = 0;
  const scrollThreshold = 50; // Limiar para mostrar/ocultar o header

  window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Verificar a direção da rolagem
    if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
      // Rolando para baixo e além do limiar
      header.classList.add('header-hidden');
    } else {
      // Rolando para cima ou no topo
      header.classList.remove('header-hidden');
    }

    lastScrollTop = currentScrollTop;
  });
}