// Service Worker para cache e performance
const CACHE_NAME = 'investsavy-v1';
const STATIC_CACHE = 'investsavy-static-v1';
const DYNAMIC_CACHE = 'investsavy-dynamic-v1';

// Recursos para cache estático
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png'
];

// Recursos para cache dinâmico
const CACHE_STRATEGIES = {
  // Cache First - para assets estáticos
  cacheFirst: [/\.(css|js|woff2?|png|jpg|jpeg|svg|ico)$/],
  // Network First - para HTML e dados da API
  networkFirst: [/\.(html)$/, /\/api\//],
  // Stale While Revalidate - para outros recursos
  staleWhileRevalidate: [/\.(json)$/]
};

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requisições não-HTTP
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Ignorar requisições para outros domínios (exceto APIs conhecidas)
  if (url.origin !== location.origin && !isAllowedExternalDomain(url.origin)) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// Função para verificar domínios externos permitidos
function isAllowedExternalDomain(origin) {
  const allowedDomains = [
    'https://www.google-analytics.com',
    'https://www.clarity.ms',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  return allowedDomains.some(domain => origin.startsWith(domain));
}

// Manipulação de requisições com diferentes estratégias
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Cache First Strategy
    if (shouldUseCacheFirst(pathname)) {
      return await cacheFirst(request);
    }
    
    // Network First Strategy
    if (shouldUseNetworkFirst(pathname)) {
      return await networkFirst(request);
    }
    
    // Stale While Revalidate Strategy
    if (shouldUseStaleWhileRevalidate(pathname)) {
      return await staleWhileRevalidate(request);
    }
    
    // Default: Network First
    return await networkFirst(request);
    
  } catch (error) {
    console.error('Service Worker: Request handling failed', error);
    return await handleOfflineFallback(request);
  }
}

// Estratégia Cache First
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Estratégia Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  const networkResponsePromise = fetch(request)
    .then(async (networkResponse) => {
      if (networkResponse.ok) {
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => null);
  
  return cachedResponse || await networkResponsePromise;
}

// Fallback para quando offline
async function handleOfflineFallback(request) {
  if (request.destination === 'document') {
    const cachedResponse = await caches.match('/');
    if (cachedResponse) {
      return cachedResponse;
    }
  }
  
  // Retornar resposta de erro personalizada
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: 'Você está offline. Verifique sua conexão com a internet.'
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// Funções auxiliares para determinar estratégia
function shouldUseCacheFirst(pathname) {
  return CACHE_STRATEGIES.cacheFirst.some(pattern => pattern.test(pathname));
}

function shouldUseNetworkFirst(pathname) {
  return CACHE_STRATEGIES.networkFirst.some(pattern => pattern.test(pathname));
}

function shouldUseStaleWhileRevalidate(pathname) {
  return CACHE_STRATEGIES.staleWhileRevalidate.some(pattern => pattern.test(pathname));
}

// Limpeza periódica do cache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    cleanOldCacheEntries();
  }
});

async function cleanOldCacheEntries() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  const now = Date.now();
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 dias
  
  for (const request of requests) {
    const response = await cache.match(request);
    const dateHeader = response?.headers.get('date');
    
    if (dateHeader) {
      const responseDate = new Date(dateHeader).getTime();
      if (now - responseDate > maxAge) {
        await cache.delete(request);
      }
    }
  }
}