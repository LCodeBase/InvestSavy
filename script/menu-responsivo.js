/**
 * Menu Responsivo - InvestSavy
 * Script para implementar menu fixo e hambúrguer em dispositivos móveis
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar o menu responsivo
  initResponsiveMenu()

  // Inicializar o botão de voltar ao topo
  initBackToTop()

  // Inicializar o menu fixo com ocultação ao rolar
  initFixedHeader()
})

/**
 * Inicializa o menu responsivo com funcionalidade de hambúrguer
 */
function initResponsiveMenu() {
  const menuToggle = document.querySelector('.menu-toggle')
  const navMenu = document.querySelector('.nav-menu')
  const body = document.body
  let isMenuOpen = false

  // Função para alternar o menu
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen
    navMenu.classList.toggle('active')
    menuToggle.classList.toggle('active')
    body.style.overflow = isMenuOpen ? 'hidden' : ''

    // Atualizar o ícone do menu
    const icon = menuToggle.querySelector('i')
    icon.className = isMenuOpen ? 'fas fa-times' : 'fas fa-bars'
  }

  // Event listener para o botão do menu
  menuToggle.addEventListener('click', toggleMenu)

  // Fechar o menu ao clicar em um link
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        toggleMenu()
      }
    })
  })

  // Fechar o menu ao clicar fora
  document.addEventListener('click', (event) => {
    if (
      isMenuOpen &&
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      toggleMenu()
    }
  })

  // Ajustar o menu ao redimensionar a janela
  let resizeTimer
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu()
      }
    }, 250)
  })

  // Adicionar efeito de scroll no header
  const header = document.querySelector('header')
  let lastScroll = 0

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset

    if (currentScroll <= 0) {
      header.classList.remove('scroll-up')
      return
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains('scroll-down')
    ) {
      // Scroll para baixo
      header.classList.remove('scroll-up')
      header.classList.add('scroll-down')
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains('scroll-down')
    ) {
      // Scroll para cima
      header.classList.remove('scroll-down')
      header.classList.add('scroll-up')
    }

    lastScroll = currentScroll
  })

  // Adicionar classe ativa ao item de menu da página atual
  highlightCurrentPage()
}

/**
 * Cria o botão de menu hambúrguer se não existir
 */
function createMenuToggle() {
  const header = document.querySelector('header')
  const navMenu = document.querySelector('.nav-menu, nav ul')

  if (!header || !navMenu) return

  // Criar o botão de menu
  const menuToggle = document.createElement('button')
  menuToggle.className = 'menu-toggle'
  menuToggle.setAttribute('aria-label', 'Abrir menu')
  menuToggle.setAttribute('aria-expanded', 'false')
  menuToggle.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `

  // Adicionar o botão ao header
  const navContainer = navMenu.parentElement
  navContainer.insertBefore(menuToggle, navMenu)

  // Adicionar classe para o menu
  navMenu.classList.add('nav-menu')

  // Recarregar a página para aplicar as alterações
  setTimeout(() => {
    location.reload()
  }, 100)
}

/**
 * Destaca o item de menu da página atual
 */
function highlightCurrentPage() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll('.nav-menu .nav-link')

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href')
    if (linkPath) {
      // Verificar se o caminho do link corresponde à página atual
      if (
        currentPath === linkPath ||
        (currentPath.includes(linkPath) && linkPath !== '/')
      ) {
        // Adicionar classe ativa ao item de menu
        const navItem = link.closest('.nav-item')
        if (navItem) {
          navItem.classList.add('active')
          // Adicionar aria-current para acessibilidade
          link.setAttribute('aria-current', 'page')
        }
      }
    }
  })
}

/**
 * Inicializa o botão de voltar ao topo
 */
function initBackToTop() {
  // Criar o botão se não existir
  let backToTop = document.querySelector('.back-to-top')
  if (!backToTop) {
    backToTop = document.createElement('button')
    backToTop.className = 'back-to-top'
    backToTop.setAttribute('aria-label', 'Voltar ao topo')
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>'
    document.body.appendChild(backToTop)
  }

  // Mostrar/ocultar o botão ao rolar
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible')
    } else {
      backToTop.classList.remove('visible')
    }
  })

  // Rolar para o topo ao clicar no botão
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
}

/**
 * Inicializa o header fixo com ocultação ao rolar para baixo
 */
function initFixedHeader() {
  const header = document.querySelector('header')
  if (!header) return

  // Adicionar classe para o header fixo
  header.classList.add('header-fixed')

  let lastScrollTop = 0
  const scrollThreshold = 50 // Limiar para mostrar/ocultar o header

  window.addEventListener('scroll', () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop

    // Verificar a direção da rolagem
    if (
      currentScrollTop > lastScrollTop &&
      currentScrollTop > scrollThreshold
    ) {
      // Rolando para baixo e além do limiar
      header.classList.add('header-hidden')
    } else {
      // Rolando para cima ou no topo
      header.classList.remove('header-hidden')
    }

    lastScrollTop = currentScrollTop
  })
}
