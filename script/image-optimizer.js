/**
 * Script para otimização de imagens no site InvestSavy
 * Este script ajuda a otimizar imagens para melhorar o desempenho do site
 */

document.addEventListener('DOMContentLoaded', function () {
  // Adiciona dimensões explícitas a todas as imagens que não possuem
  const images = document.querySelectorAll('img:not([width]):not([height])')

  images.forEach((img) => {
    // Quando a imagem carregar, definimos suas dimensões explícitas
    img.onload = function () {
      if (!this.hasAttribute('width')) {
        this.setAttribute('width', this.naturalWidth)
      }
      if (!this.hasAttribute('height')) {
        this.setAttribute('height', this.naturalHeight)
      }
      // Adiciona lazy loading para imagens abaixo da dobra
      if (!this.hasAttribute('loading') && !isInViewport(this)) {
        this.setAttribute('loading', 'lazy')
      }
    }

    // Se a imagem já estiver carregada
    if (img.complete) {
      if (!img.hasAttribute('width')) {
        img.setAttribute('width', img.naturalWidth)
      }
      if (!img.hasAttribute('height')) {
        img.setAttribute('height', img.naturalHeight)
      }
      // Adiciona lazy loading para imagens abaixo da dobra
      if (!img.hasAttribute('loading') && !isInViewport(img)) {
        img.setAttribute('loading', 'lazy')
      }
    }
  })

  // Função para verificar se um elemento está na viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }
})
