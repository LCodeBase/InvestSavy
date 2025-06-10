// Registro e gerenciamento do Service Worker

// Verificar se o Service Worker é suportado
export const isServiceWorkerSupported = (): boolean => {
  return 'serviceWorker' in navigator;
};

// Registrar Service Worker
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!isServiceWorkerSupported()) {
    console.warn('Service Worker não é suportado neste navegador');
    return null;
  }

  try {
    // Aguardar o carregamento completo da página
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }

    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });

    console.log('Service Worker registrado com sucesso:', registration.scope);

    // Configurar listeners para atualizações
    setupUpdateListeners(registration);

    return registration;
  } catch (error) {
    console.error('Falha ao registrar Service Worker:', error);
    return null;
  }
};

// Configurar listeners para atualizações do Service Worker
const setupUpdateListeners = (registration: ServiceWorkerRegistration) => {
  // Verificar atualizações periodicamente
  setInterval(() => {
    registration.update();
  }, 60000); // Verificar a cada minuto

  // Listener para quando uma nova versão está disponível
  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;
    if (!newWorker) return;

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // Nova versão disponível
        showUpdateNotification();
      }
    });
  });

  // Listener para quando o Service Worker assume o controle
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Recarregar a página quando uma nova versão assume o controle
    window.location.reload();
  });
};

// Mostrar notificação de atualização
const showUpdateNotification = () => {
  // Criar notificação personalizada ou usar uma biblioteca de toast
  const updateBanner = document.createElement('div');
  updateBanner.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #1e40af;
      color: white;
      padding: 12px;
      text-align: center;
      z-index: 9999;
      font-family: system-ui, -apple-system, sans-serif;
    ">
      <span>Nova versão disponível!</span>
      <button
        onclick="window.location.reload()"
        style="
          margin-left: 12px;
          background: white;
          color: #1e40af;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        "
      >
        Atualizar
      </button>
      <button
        onclick="this.parentElement.parentElement.remove()"
        style="
          margin-left: 8px;
          background: transparent;
          color: white;
          border: 1px solid white;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        "
      >
        Depois
      </button>
    </div>
  `;

  document.body.appendChild(updateBanner);

  // Remover automaticamente após 10 segundos
  setTimeout(() => {
    if (updateBanner.parentElement) {
      updateBanner.remove();
    }
  }, 10000);
};

// Desregistrar Service Worker (para desenvolvimento)
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (!isServiceWorkerSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const result = await registration.unregister();
      console.log('Service Worker desregistrado:', result);
      return result;
    }
    return false;
  } catch (error) {
    console.error('Erro ao desregistrar Service Worker:', error);
    return false;
  }
};

// Verificar se está online/offline
export const setupNetworkStatusListeners = () => {
  const updateOnlineStatus = () => {
    const isOnline = navigator.onLine;

    // Adicionar classe CSS baseada no status
    document.body.classList.toggle('offline', !isOnline);

    // Disparar evento customizado
    window.dispatchEvent(new CustomEvent('networkstatuschange', {
      detail: { isOnline }
    }));

    // Mostrar notificação de status
    if (!isOnline) {
      showOfflineNotification();
    } else {
      hideOfflineNotification();
    }
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  // Verificar status inicial
  updateOnlineStatus();

  return () => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
  };
};

// Mostrar notificação offline
const showOfflineNotification = () => {
  const existingNotification = document.getElementById('offline-notification');
  if (existingNotification) return;

  const notification = document.createElement('div');
  notification.id = 'offline-notification';
  notification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 12px;
      border-radius: 8px;
      text-align: center;
      z-index: 9999;
      font-family: system-ui, -apple-system, sans-serif;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    ">
      📡 Você está offline. Algumas funcionalidades podem estar limitadas.
    </div>
  `;

  document.body.appendChild(notification);
};

// Esconder notificação offline
const hideOfflineNotification = () => {
  const notification = document.getElementById('offline-notification');
  if (notification) {
    notification.remove();
  }
};

// Limpar cache do Service Worker
export const clearServiceWorkerCache = async (): Promise<void> => {
  if (!isServiceWorkerSupported()) {
    return;
  }

  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );

    console.log('Cache do Service Worker limpo');
  } catch (error) {
    console.error('Erro ao limpar cache:', error);
  }
};

// Enviar mensagem para o Service Worker
export const sendMessageToServiceWorker = (message: unknown): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    if (!navigator.serviceWorker.controller) {
      reject(new Error('Nenhum Service Worker ativo'));
      return;
    }

    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(new Error(event.data.error));
      } else {
        resolve(event.data);
      }
    };

    navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
  });
};