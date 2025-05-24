/**
 * Feedback Visual para Ferramentas - InvestSavy
 * Este arquivo contém funções para adicionar feedback visual nas ferramentas do site
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar feedback visual para ferramentas
  initFeedbackSystem();
});

/**
 * Inicializa o sistema de feedback visual para as ferramentas
 */
function initFeedbackSystem() {
  // Criar o contêiner de notificações se não existir
  createNotificationContainer();

  // Adicionar feedback visual aos formulários
  addFormFeedback();

  // Adicionar feedback visual às ferramentas
  addToolsFeedback();

  // Adicionar feedback visual ao conversor de moedas
  addCurrencyConverterFeedback();
}

/**
 * Cria o contêiner de notificações no DOM
 */
function createNotificationContainer() {
  // Verificar se o contêiner já existe
  if (document.getElementById('notification-container')) return;

  // Criar o contêiner de notificações
  const container = document.createElement('div');
  container.id = 'notification-container';
  container.className = 'notification-container';
  document.body.appendChild(container);

  // Adicionar estilos para o contêiner de notificações
  const style = document.createElement('style');
  style.textContent = `
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 350px;
    }

    .notification {
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: space-between;
      animation: slideIn 0.3s ease, fadeOut 0.5s ease 4.5s forwards;
      color: white;
      font-weight: 500;
    }

    .notification-success {
      background-color: #10b981;
    }

    .notification-error {
      background-color: #ef4444;
    }

    .notification-info {
      background-color: #3b82f6;
    }

    .notification-warning {
      background-color: #f59e0b;
    }

    .notification-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .notification-icon {
      font-size: 1.2rem;
    }

    .notification-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .notification-close:hover {
      opacity: 1;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Exibe uma notificação na tela
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo de notificação (success, error, info, warning)
 * @param {number} duration - Duração em milissegundos (padrão: 5000ms)
 */
function showNotification(message, type = 'info', duration = 5000) {
  const container = document.getElementById('notification-container');
  if (!container) return;

  // Criar a notificação
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;

  // Ícone baseado no tipo
  let icon = '';
  switch (type) {
    case 'success':
      icon = '<i class="fas fa-check-circle notification-icon"></i>';
      break;
    case 'error':
      icon = '<i class="fas fa-exclamation-circle notification-icon"></i>';
      break;
    case 'warning':
      icon = '<i class="fas fa-exclamation-triangle notification-icon"></i>';
      break;
    case 'info':
    default:
      icon = '<i class="fas fa-info-circle notification-icon"></i>';
      break;
  }

  // Conteúdo da notificação
  notification.innerHTML = `
    <div class="notification-content">
      ${icon}
      <span>${message}</span>
    </div>
    <button class="notification-close" aria-label="Fechar notificação">
      <i class="fas fa-times"></i>
    </button>
  `;

  // Adicionar ao contêiner
  container.appendChild(notification);

  // Configurar botão de fechar
  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', () => {
    notification.remove();
  });

  // Remover após a duração especificada
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, duration);
}

/**
 * Adiciona feedback visual aos formulários do site
 */
function addFormFeedback() {
  // Adicionar feedback ao formulário de newsletter
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // O evento já é tratado no arquivo original, apenas adicionamos o feedback visual
      const email = this.querySelector('.newsletter-input').value;
      if (email) {
        showNotification('Processando sua inscrição...', 'info', 2000);
      }
    });
  });

  // Adicionar feedback a outros formulários quando encontrados
  const forms = document.querySelectorAll('form:not(.newsletter-form)');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Verificar se o formulário tem validação HTML5
      if (form.checkValidity()) {
        showNotification('Enviando dados...', 'info', 2000);
      }
    });
  });
}

/**
 * Adiciona feedback visual às ferramentas do site
 */
function addToolsFeedback() {
  // Monitorar botões de cálculo e simulação
  const actionButtons = document.querySelectorAll('button[type="submit"], .calculate-btn, .simulate-btn, .convert-btn, .compare-btn');
  actionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Verificar se o botão está dentro de um formulário
      const form = button.closest('form');
      if (form && !form.checkValidity()) return;

      // Obter o texto do botão para personalizar a mensagem
      const buttonText = button.textContent.trim().toLowerCase();
      let actionType = 'Processando';

      if (buttonText.includes('calcul')) {
        actionType = 'Calculando';
      } else if (buttonText.includes('simul')) {
        actionType = 'Simulando';
      } else if (buttonText.includes('convert')) {
        actionType = 'Convertendo';
      } else if (buttonText.includes('compar')) {
        actionType = 'Comparando';
      }

      showNotification(`${actionType}...`, 'info', 1500);
    });
  });

  // Monitorar resultados de cálculos
  const resultContainers = document.querySelectorAll('.result-container, .results, .calculation-result');
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        // Verificar se o conteúdo foi alterado (resultado calculado)
        if (mutation.target.offsetHeight > 0 && mutation.target.textContent.trim() !== '') {
          showNotification('Cálculo realizado com sucesso!', 'success');
        }
      }
    });
  });

  resultContainers.forEach(container => {
    observer.observe(container, { childList: true, attributes: true, subtree: true });
  });
}

/**
 * Adiciona feedback visual específico ao conversor de moedas
 */
function addCurrencyConverterFeedback() {
  // Verificar se estamos na página do conversor de moedas
  const conversorMoedas = document.querySelector('.currency-converter, #currencyConverter');
  if (!conversorMoedas) return;

  // Adicionar elemento para exibir a data e hora da última atualização
  const lastUpdateContainer = document.createElement('div');
  lastUpdateContainer.className = 'last-update-container';
  lastUpdateContainer.innerHTML = `
    <div class="last-update">
      <i class="fas fa-sync-alt"></i>
      <span>Última atualização: <span id="lastUpdateTime">Carregando...</span></span>
    </div>
  `;

  // Adicionar estilos para o contêiner de última atualização
  const style = document.createElement('style');
  style.textContent = `
    .last-update-container {
      margin-top: 15px;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 8px;
      font-size: 0.9rem;
      color: #6b7280;
    }

    .last-update {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .last-update i {
      color: #3b82f6;
    }
  `;
  document.head.appendChild(style);

  // Inserir após o formulário de conversão
  const converterForm = conversorMoedas.querySelector('form');
  if (converterForm) {
    converterForm.parentNode.insertBefore(lastUpdateContainer, converterForm.nextSibling);
  } else {
    conversorMoedas.appendChild(lastUpdateContainer);
  }

  // Atualizar a data e hora da última atualização
  updateLastUpdateTime();
}

/**
 * Atualiza a data e hora da última atualização das taxas de câmbio
 */
function updateLastUpdateTime() {
  const lastUpdateElement = document.getElementById('lastUpdateTime');
  if (!lastUpdateElement) return;

  // Obter a data e hora atual (simulando a última atualização)
  const now = new Date();
  const formattedDate = now.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const formattedTime = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  lastUpdateElement.textContent = `${formattedDate} às ${formattedTime}`;

  // Adicionar tooltip com informações adicionais
  lastUpdateElement.parentElement.setAttribute('title', `Taxas de câmbio atualizadas em ${formattedDate} às ${formattedTime}. As taxas são atualizadas a cada hora.`);
}

// Exportar funções para uso em outros arquivos
window.feedbackVisual = {
  showNotification,
  updateLastUpdateTime
};