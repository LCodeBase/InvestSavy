// Header Scroll Effect
const header = document.querySelector('header')
let lastScroll = 0

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 50) {
    header.classList.add('scrolled')
  } else {
    header.classList.remove('scrolled')
  }

  lastScroll = currentScroll
})

// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle')
const navMenu = document.querySelector('.nav-menu')

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active')
  menuToggle.classList.toggle('active')
})

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active')
    menuToggle.classList.remove('active')
  })
})

// Animação suave ao rolar para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  })
})

// Animação de entrada dos elementos
const observerOptions = {
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate')
    }
  })
}, observerOptions)

// Observar elementos para animação
document
  .querySelectorAll('.feature-item, .card, .cta-content')
  .forEach((element) => {
    observer.observe(element)
  })

// Newsletter Form
const newsletterForm = document.querySelector('.form-sub form')
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = newsletterForm.querySelector('input[type="email"]').value

    // Aqui você pode adicionar a lógica para enviar o email para sua API
    console.log('Email para newsletter:', email)

    // Feedback visual
    const button = newsletterForm.querySelector('button')
    const originalText = button.textContent
    button.textContent = 'Inscrito!'
    button.style.backgroundColor = '#0d6e4a'

    setTimeout(() => {
      button.textContent = originalText
      button.style.backgroundColor = ''
      newsletterForm.reset()
    }, 2000)
  })
}
