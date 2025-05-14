// Nota: As funções de Header Scroll Effect e Menu Mobile foram movidas para js-universal.js
// para centralizar o comportamento e evitar duplicação de código

// Mantendo apenas as funções específicas desta página que não estão em js-universal.js

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
