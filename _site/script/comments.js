// Sistema de comentários para InvestSavy
document.addEventListener('DOMContentLoaded', function () {
  const commentForm = document.querySelector('.comment-form-container')
  const commentsContainer = document.querySelector('.comments-list')
  const commentsCount = document.querySelector('.comments-section h2')

  // Dados mockados de comentários (em produção viria de uma API)
  let comments = []
  let commentCounter = 37 // Valor inicial mostrado no layout

  // Inicializar comentários
  initializeComments()

  // Event listener para o formulário
  if (commentForm) {
    commentForm.addEventListener('submit', handleCommentSubmit)
  }

  // Inicializar sistema de compartilhamento
  initializeSocialShare()

  // Inicializar newsletter
  initializeNewsletter()

  function initializeComments() {
    // Remover placeholder se existir
    const placeholder = document.querySelector('.comment-placeholder')
    if (placeholder && comments.length > 0) {
      placeholder.remove()
    }

    renderComments()
  }

  function handleCommentSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const commentData = {
      id: Date.now(),
      name: formData.get('name'),
      email: formData.get('email'),
      comment: formData.get('comment'),
      date: new Date(),
      approved: true, // Em produção, comentários podem precisar de aprovação
    }

    // Validação básica
    if (!commentData.name || !commentData.email || !commentData.comment) {
      showMessage('Por favor, preencha todos os campos obrigatórios.', 'error')
      return
    }

    // Validação de email
    if (!isValidEmail(commentData.email)) {
      showMessage('Por favor, insira um e-mail válido.', 'error')
      return
    }

    // Adicionar comentário
    addComment(commentData)

    // Limpar formulário
    e.target.reset()

    // Mostrar mensagem de sucesso
    showMessage('Comentário publicado com sucesso!', 'success')

    // Scroll para o novo comentário
    setTimeout(() => {
      const newComment = document.querySelector(
        `[data-comment-id="${commentData.id}"]`
      )
      if (newComment) {
        newComment.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  function addComment(commentData) {
    comments.unshift(commentData)
    commentCounter++
    updateCommentsCount()
    renderComments()
  }

  function renderComments() {
    if (comments.length === 0) {
      commentsContainer.innerHTML = `
                <div class="comment-placeholder">
                    <p>Seja o primeiro a comentar este artigo!</p>
                </div>
            `
      return
    }

    const commentsHTML = comments
      .map(
        (comment) => `
            <div class="comment" data-comment-id="${comment.id}">
                <div class="comment-header">
                    <div class="comment-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="comment-meta">
                        <span class="comment-author">${escapeHtml(
                          comment.name
                        )}</span>
                        <span class="comment-date">${formatDate(
                          comment.date
                        )}</span>
                    </div>
                </div>
                <div class="comment-content">
                    <p>${escapeHtml(comment.comment)}</p>
                </div>
                <div class="comment-actions">
                    <button class="comment-like" onclick="likeComment(${
                      comment.id
                    })">
                        <i class="far fa-thumbs-up"></i>
                        <span>Curtir</span>
                    </button>
                    <button class="comment-reply" onclick="replyToComment(${
                      comment.id
                    })">
                        <i class="fas fa-reply"></i>
                        <span>Responder</span>
                    </button>
                </div>
            </div>
        `
      )
      .join('')

    commentsContainer.innerHTML = commentsHTML
  }

  function updateCommentsCount() {
    if (commentsCount) {
      commentsCount.textContent = `Comentários (${commentCounter})`
    }
  }

  function showMessage(message, type) {
    // Remover mensagem anterior se existir
    const existingMessage = document.querySelector('.form-message')
    if (existingMessage) {
      existingMessage.remove()
    }

    // Criar nova mensagem
    const messageEl = document.createElement('div')
    messageEl.className = `form-message ${type}`
    messageEl.innerHTML = `
            <i class="fas fa-${
              type === 'success' ? 'check-circle' : 'exclamation-circle'
            }"></i>
            <span>${message}</span>
        `

    // Inserir mensagem
    const formContainer = document.querySelector('.comment-form-container')
    formContainer.insertBefore(messageEl, formContainer.firstChild)

    // Remover mensagem após 5 segundos
    setTimeout(() => {
      messageEl.remove()
    }, 5000)
  }

  function initializeSocialShare() {
    const shareButtons = document.querySelectorAll('.share-icon')
    const currentUrl = window.location.href
    const title = document.querySelector('h1').textContent

    shareButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault()

        const platform = this.classList[1] // facebook, twitter, etc.
        let shareUrl = ''

        switch (platform) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentUrl
            )}`
            break
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent(title)}`
            break
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              currentUrl
            )}`
            break
          case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(
              title + ' ' + currentUrl
            )}`
            break
          case 'copy':
            copyToClipboard(currentUrl)
            showMessage('Link copiado para a área de transferência!', 'success')
            return
          case 'bookmark':
            toggleBookmark()
            return
        }

        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400')
        }
      })
    })
  }

  function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form')

    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault()

        const email = this.querySelector('input[type="email"]').value

        if (!isValidEmail(email)) {
          alert('Por favor, insira um e-mail válido.')
          return
        }

        // Simular envio
        this.innerHTML = `
                    <div style="text-align: center; color: white;">
                        <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                        <p>Obrigado por se inscrever!</p>
                    </div>
                `
      })
    }
  }

  // Funções utilitárias
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
    } else {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  function toggleBookmark() {
    const bookmarkBtn = document.querySelector('.share-icon.bookmark')
    const isBookmarked = bookmarkBtn.classList.contains('bookmarked')

    if (isBookmarked) {
      bookmarkBtn.classList.remove('bookmarked')
      bookmarkBtn.style.background = '#f59e0b'
      showMessage('Artigo removido dos favoritos.', 'success')
    } else {
      bookmarkBtn.classList.add('bookmarked')
      bookmarkBtn.style.background = '#dc2626'
      showMessage('Artigo salvo nos favoritos!', 'success')
    }
  }

  // Funções globais para ações de comentário
  window.likeComment = function (commentId) {
    const comment = comments.find((c) => c.id === commentId)
    if (comment) {
      comment.likes = (comment.likes || 0) + 1
      showMessage('Obrigado pelo seu feedback!', 'success')
    }
  }

  window.replyToComment = function (commentId) {
    const commentEl = document.querySelector(`[data-comment-id="${commentId}"]`)
    const authorName = commentEl.querySelector('.comment-author').textContent
    const commentTextarea = document.querySelector('#comment-text')

    commentTextarea.value = `@${authorName} `
    commentTextarea.focus()
    commentTextarea.scrollIntoView({ behavior: 'smooth' })
  }
})

// CSS adicional para comentários (pode ser adicionado ao arquivo CSS principal)
const additionalCSS = `
.comment {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-left: 4px solid #e5e7eb;
    transition: border-color 0.3s ease;
}

.comment:hover {
    border-left-color: #1e40af;
}

.comment-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.comment-avatar {
    font-size: 2rem;
    color: #666;
}

.comment-meta {
    display: flex;
    flex-direction: column;
}

.comment-author {
    font-weight: 600;
    color: #333;
}

.comment-date {
    font-size: 0.9rem;
    color: #666;
}

.comment-content p {
    margin: 0;
    line-height: 1.6;
    color: #333;
}

.comment-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
}

.comment-like,
.comment-reply {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.comment-like:hover,
.comment-reply:hover {
    color: #1e40af;
    background: #f3f4f6;
}

.form-message {
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.form-message.success {
    background: #dcfce7;
    color: #166534;
    border: 1px solid #bbf7d0;
}

.form-message.error {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
}

@media (max-width: 768px) {
    .comment {
        padding: 1rem;
    }

    .comment-header {
        gap: 0.5rem;
    }

    .comment-actions {
        flex-wrap: wrap;
    }
}
`

// Adicionar CSS adicional ao documento
const style = document.createElement('style')
style.textContent = additionalCSS
document.head.appendChild(style)
