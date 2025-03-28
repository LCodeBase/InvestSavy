/**
 * Script para converter imagens para o formato WebP
 * Este script detecta imagens PNG/JPG e cria versões WebP para melhorar o desempenho
 */

document.addEventListener('DOMContentLoaded', function () {
  // Verifica se o navegador suporta WebP
  function checkWebpSupport() {
    const elem = document.createElement('canvas')
    if (elem.getContext && elem.getContext('2d')) {
      // Foi possível criar um elemento canvas
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
    }
    return false
  }

  const supportsWebp = checkWebpSupport()

  if (supportsWebp) {
    // Encontra todas as imagens que não são SVG
    const images = document.querySelectorAll('img:not([src$=".svg"])')

    images.forEach((img) => {
      const src = img.getAttribute('src')
      if (
        src &&
        (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png'))
      ) {
        // Cria o caminho para a versão WebP
        const webpSrc = src.substring(0, src.lastIndexOf('.')) + '.webp'

        // Cria uma nova imagem para pré-carregar a versão WebP
        const preloadImg = new Image()
        preloadImg.onload = function () {
          // Se a imagem WebP carregou com sucesso, substitui a original
          img.setAttribute('src', webpSrc)
        }
        preloadImg.onerror = function () {
          // Se falhou, mantém a original
          console.log('WebP não disponível para: ' + src)
        }
        preloadImg.src = webpSrc
      }
    })
  }
})
