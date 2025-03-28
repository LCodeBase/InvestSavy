/**
 * Script para otimização de CSS no site InvestSavy
 * Este script ajuda a carregar CSS de forma mais eficiente
 */

document.addEventListener('DOMContentLoaded', function () {
  // Função para carregar CSS de forma assíncrona
  function loadCSSAsync(url) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    link.media = 'print'
    document.getElementsByTagName('head')[0].appendChild(link)

    // Muda para 'all' quando o CSS estiver carregado
    link.onload = function () {
      this.media = 'all'
    }
  }

  // Identifica folhas de estilo não críticas para carregamento assíncrono
  const stylesheets = document.querySelectorAll(
    'link[rel="stylesheet"]:not([href*="optimized-styles.css"])'
  )

  // Carrega folhas de estilo não críticas de forma assíncrona
  stylesheets.forEach((stylesheet) => {
    const href = stylesheet.getAttribute('href')
    if (
      href &&
      !href.includes('optimized-styles.css') &&
      !href.includes('style-main.css')
    ) {
      // Remove a folha de estilo original
      stylesheet.parentNode.removeChild(stylesheet)
      // Carrega de forma assíncrona
      loadCSSAsync(href)
    }
  })
})
