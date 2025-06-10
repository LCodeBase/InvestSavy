// Utilitários para otimização de performance e Core Web Vitals

// Preload de recursos críticos
export const preloadCriticalResources = () => {
  // Preload de fontes críticas
  const fontPreloads = [
    '/fonts/inter-var.woff2',
    '/fonts/inter-var-latin.woff2'
  ];

  fontPreloads.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload de imagens críticas
  const criticalImages = [
    '/images/logo.png',
    '/images/favicon.svg'
  ];

  criticalImages.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = image;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Lazy loading de componentes não críticos
export const lazyLoadComponent = (importFunc: () => Promise<any>) => {
  return React.lazy(() => {
    return new Promise(resolve => {
      // Adicionar delay mínimo para evitar flash
      setTimeout(() => {
        resolve(importFunc());
      }, 100);
    });
  });
};

// Otimização de imagens
export const optimizeImage = (src: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
} = {}) => {
  const { width, height, quality = 80, format = 'webp' } = options;
  
  // Se for SVG, retornar como está
  if (src.includes('.svg')) {
    return src;
  }

  // Construir URL otimizada (assumindo um serviço de otimização)
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  params.append('f', format);

  return `${src}?${params.toString()}`;
};

// Monitoramento de Core Web Vitals
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const observeLCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      // Enviar para analytics
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'LCP',
          value: Math.round(lastEntry.startTime)
        });
      }
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  };

  // First Input Delay (FID)
  const observeFID = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FID',
            value: Math.round(entry.processingStart - entry.startTime)
          });
        }
      });
    });
    
    observer.observe({ entryTypes: ['first-input'] });
  };

  // Cumulative Layout Shift (CLS)
  const observeCLS = () => {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'CLS',
          value: Math.round(clsValue * 1000)
        });
      }
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
  };

  // Inicializar observadores
  try {
    observeLCP();
    observeFID();
    observeCLS();
  } catch (error) {
    console.warn('Web Vitals monitoring not supported:', error);
  }
};

// Otimização de scroll
export const optimizeScroll = () => {
  let ticking = false;

  const updateScrollPosition = () => {
    // Lógica de scroll otimizada
    ticking = false;
  };

  const requestScrollUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });

  return () => {
    window.removeEventListener('scroll', requestScrollUpdate);
  };
};

// Cache de recursos
export const cacheResource = (key: string, data: any, ttl: number = 3600000) => {
  const item = {
    data,
    timestamp: Date.now(),
    ttl
  };
  
  try {
    localStorage.setItem(`cache_${key}`, JSON.stringify(item));
  } catch (error) {
    console.warn('Failed to cache resource:', error);
  }
};

export const getCachedResource = (key: string) => {
  try {
    const item = localStorage.getItem(`cache_${key}`);
    if (!item) return null;
    
    const parsed = JSON.parse(item);
    const now = Date.now();
    
    if (now - parsed.timestamp > parsed.ttl) {
      localStorage.removeItem(`cache_${key}`);
      return null;
    }
    
    return parsed.data;
  } catch (error) {
    console.warn('Failed to get cached resource:', error);
    return null;
  }
};

// Declaração de tipos para TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Importar React para lazy loading
import React from 'react';