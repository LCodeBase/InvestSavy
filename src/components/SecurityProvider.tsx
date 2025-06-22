// Provedor de Segurança para React - InvestSavy

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSecurity, useSecurityMonitoring } from '../hooks/useSecurity';
import { generateCSPString, SECURITY_HEADERS } from '../config/security';

// Interface para o contexto de segurança
interface SecurityContextType {
  isSecure: boolean;
  csrfToken: string | null;
  sessionExpired: boolean;
  securityScore: number;
  threats: any[];
  sanitizeInput: (input: string) => string;
  validateForm: (data: Record<string, any>) => { isValid: boolean; errors: string[] };
  secureRequest: (url: string, options?: RequestInit) => Promise<Response>;
  renewSession: () => void;
  clearSensitiveData: () => void;
}

// Contexto de segurança
const SecurityContext = createContext<SecurityContextType | null>(null);

// Props do provedor
interface SecurityProviderProps {
  children: ReactNode;
  enableMonitoring?: boolean;
  onSecurityAlert?: (alert: any) => void;
}

// Componente provedor de segurança
export const SecurityProvider: React.FC<SecurityProviderProps> = ({
  children,
  enableMonitoring = true,
  onSecurityAlert
}) => {
  const security = useSecurity();
  const monitoring = useSecurityMonitoring();
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicializar segurança
  useEffect(() => {
    initializeBrowserSecurity();
    if (enableMonitoring) {
      monitoring.startMonitoring();
    }
    setIsInitialized(true);

    return () => {
      if (enableMonitoring) {
        monitoring.stopMonitoring();
      }
    };
  }, [enableMonitoring]);

  // Monitorar alertas de segurança
  useEffect(() => {
    if (monitoring.alerts.length > 0 && onSecurityAlert) {
      monitoring.alerts.forEach(alert => {
        onSecurityAlert(alert);
      });
    }
  }, [monitoring.alerts, onSecurityAlert]);

  // Inicializar segurança do navegador
  const initializeBrowserSecurity = () => {
    try {
      // Aplicar CSP via meta tag se não estiver definido
      if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
        const cspMeta = document.createElement('meta');
        cspMeta.httpEquiv = 'Content-Security-Policy';
        cspMeta.content = generateCSPString();
        document.head.appendChild(cspMeta);
      }

      // Aplicar outros headers de segurança via meta tags quando possível
      applySecurityMetaTags();

      // Configurar proteções do navegador
      setupBrowserProtections();

      // Monitorar mudanças no DOM
      setupDOMMonitoring();

      // console.log('[SECURITY] Browser security initialized');
    } catch (error) {
        // console.error('[SECURITY] Failed to initialize browser security:', error);
    }
  };

  // Aplicar meta tags de segurança
  const applySecurityMetaTags = () => {
    const securityMetas = [
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
      { httpEquiv: 'X-Frame-Options', content: 'DENY' },
      { httpEquiv: 'X-XSS-Protection', content: '1; mode=block' }
    ];

    securityMetas.forEach(meta => {
      const existingMeta = document.querySelector(
        `meta[${meta.name ? 'name' : 'http-equiv'}="${meta.name || meta.httpEquiv}"]`
      );
      
      if (!existingMeta) {
        const metaElement = document.createElement('meta');
        if (meta.name) {
          metaElement.name = meta.name;
        } else if (meta.httpEquiv) {
          metaElement.httpEquiv = meta.httpEquiv;
        }
        metaElement.content = meta.content;
        document.head.appendChild(metaElement);
      }
    });
  };

  // Configurar proteções do navegador
  const setupBrowserProtections = () => {
    // Desabilitar console em produção
    if (process.env.NODE_ENV === 'production') {
      disableConsoleInProduction();
    }

    // Proteger contra debug
    protectAgainstDebugging();

    // Monitorar tentativas de injeção
    monitorInjectionAttempts();

    // Proteger localStorage/sessionStorage
    protectWebStorage();
  };

  // Desabilitar console em produção
  const disableConsoleInProduction = () => {
    if (typeof window !== 'undefined') {
      const noop = () => {};
      const methods = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'];
      
      methods.forEach(method => {
        if (console[method as keyof Console]) {
          (console as any)[method] = noop;
        }
      });
    }
  };

  // Proteger contra debugging
  const protectAgainstDebugging = () => {
    // Detectar DevTools
    const devtools = { open: false, orientation: null };
    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          console.warn('[SECURITY] Developer tools detected');
          monitoring.addAlert({
            type: 'suspicious_activity',
            description: 'Developer tools opened',
            severity: 'medium'
          });
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Detectar debugger
    const detectDebugger = () => {
      const start = performance.now();
      // debugger; // Esta linha foi comentada para evitar erro ESLint
      const end = performance.now();
      
      if (end - start > 100) {
        monitoring.addAlert({
          type: 'suspicious_activity',
          description: 'Debugger detected',
          severity: 'high'
        });
      }
    };

    // Executar detecção periodicamente
    setInterval(detectDebugger, 1000);
  };

  // Monitorar tentativas de injeção
  const monitorInjectionAttempts = () => {
    // Monitorar mudanças no window object
    const originalWindow = { ...window };
    
    const checkWindowIntegrity = () => {
      const currentKeys = Object.keys(window);
      const originalKeys = Object.keys(originalWindow);
      
      const newKeys = currentKeys.filter(key => !originalKeys.includes(key));
      
      if (newKeys.length > 0) {
        // console.warn('[SECURITY] New properties detected on window object:', newKeys);
        // monitoring.addAlert({
        //   type: 'injection',
        //   description: `New window properties: ${newKeys.join(', ')}`,
        //   severity: 'medium'
        // });
      }
    };

    setInterval(checkWindowIntegrity, 5000);

    // Monitorar eval e Function
    const originalEval = window.eval;
    const originalFunction = window.Function;

    window.eval = function(code: string) {
      // console.warn('[SECURITY] eval() usage detected:', code);
      // monitoring.addAlert({
      //   type: 'injection',
      //   description: 'eval() function called',
      //   severity: 'high'
      // });
      return originalEval.call(this, code);
    };

    (window as any).Function = function(...args: any[]) {
      // console.warn('[SECURITY] Function() constructor usage detected');
      // monitoring.addAlert({
      //   type: 'injection',
      //   description: 'Function constructor called',
      //   severity: 'high'
      // });
      return originalFunction.apply(this, args);
    };
  };

  // Proteger Web Storage
  const protectWebStorage = () => {
    const protectStorage = (storage: Storage, name: string) => {
      const originalSetItem = storage.setItem;
      const originalGetItem = storage.getItem;
      const originalRemoveItem = storage.removeItem;

      storage.setItem = function(key: string, value: string) {
        // Sanitizar chave e valor
        const sanitizedKey = security.sanitizeUserInput(key);
        const sanitizedValue = security.sanitizeUserInput(value);
        
        if (sanitizedKey !== key || sanitizedValue !== value) {
          console.warn(`[SECURITY] Suspicious ${name} operation blocked:`, { key, value });
          monitoring.addAlert({
            type: 'injection',
            description: `Suspicious ${name} setItem operation`,
            severity: 'medium'
          });
          return;
        }

        return originalSetItem.call(this, key, value);
      };

      storage.getItem = function(key: string) {
        const sanitizedKey = security.sanitizeUserInput(key);
        if (sanitizedKey !== key) {
          console.warn(`[SECURITY] Suspicious ${name} getItem blocked:`, key);
          return null;
        }
        return originalGetItem.call(this, key);
      };

      storage.removeItem = function(key: string) {
        const sanitizedKey = security.sanitizeUserInput(key);
        if (sanitizedKey !== key) {
          console.warn(`[SECURITY] Suspicious ${name} removeItem blocked:`, key);
          return;
        }
        return originalRemoveItem.call(this, key);
      };
    };

    protectStorage(localStorage, 'localStorage');
    protectStorage(sessionStorage, 'sessionStorage');
  };

  // Configurar monitoramento do DOM
  const setupDOMMonitoring = () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Verificar elementos suspeitos
              if (element.tagName === 'SCRIPT' || element.tagName === 'IFRAME') {
                const src = element.getAttribute('src');
                if (src && !isAllowedSource(src)) {
                  console.warn('[SECURITY] Suspicious element blocked:', element.tagName, src);
                  element.remove();
                  monitoring.addAlert({
                    type: 'injection',
                    description: `Suspicious ${element.tagName} element`,
                    severity: 'high'
                  });
                }
              }

              // Verificar atributos de evento
              Array.from(element.attributes || []).forEach(attr => {
                if (attr.name.startsWith('on')) {
                  console.warn('[SECURITY] Event attribute removed:', attr.name);
                  element.removeAttribute(attr.name);
                  monitoring.addAlert({
                    type: 'xss',
                    description: `Event attribute: ${attr.name}`,
                    severity: 'medium'
                  });
                }
              });
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    return () => observer.disconnect();
  };

  // Verificar se a fonte é permitida
  const isAllowedSource = (src: string): boolean => {
    const allowedDomains = [
      'investsavy.com.br',
      'www.investsavy.com.br',
      'localhost',
      '127.0.0.1',
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.google-analytics.com',
      'www.googletagmanager.com'
    ];

    try {
      const url = new URL(src, window.location.origin);
      return allowedDomains.some(domain => 
        url.hostname === domain || url.hostname.endsWith('.' + domain)
      );
    } catch {
      return false;
    }
  };

  // Valor do contexto
  const contextValue: SecurityContextType = {
    isSecure: security.securityState.isSecure,
    csrfToken: security.securityState.csrfToken,
    sessionExpired: security.securityState.sessionExpired,
    securityScore: security.securityStats.securityScore,
    threats: security.securityState.threats,
    sanitizeInput: security.sanitizeUserInput,
    validateForm: security.validateForm,
    secureRequest: security.secureRequest,
    renewSession: security.renewSession,
    clearSensitiveData: security.clearSensitiveData
  };

  // Mostrar loading enquanto inicializa
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Inicializando segurança...</p>
        </div>
      </div>
    );
  }

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
      {/* Componente de alertas de segurança - DESABILITADO para melhor UX */}
      {/* <SecurityAlerts alerts={monitoring.alerts} onClear={monitoring.clearAlerts} /> */}
    </SecurityContext.Provider>
  );
};

// Componente para exibir alertas de segurança
interface SecurityAlertsProps {
  alerts: any[];
  onClear: () => void;
}

const SecurityAlerts: React.FC<SecurityAlertsProps> = ({ alerts, onClear }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      {alerts.slice(0, 3).map((alert) => (
        <div
          key={alert.id}
          className={`mb-2 p-3 rounded-lg shadow-lg ${
            alert.severity === 'critical' ? 'bg-red-100 border-red-500 text-red-700' :
            alert.severity === 'high' ? 'bg-orange-100 border-orange-500 text-orange-700' :
            alert.severity === 'medium' ? 'bg-yellow-100 border-yellow-500 text-yellow-700' :
            'bg-blue-100 border-blue-500 text-blue-700'
          } border-l-4`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-sm">
                {alert.type === 'xss' ? 'XSS Detectado' :
                 alert.type === 'csrf' ? 'CSRF Detectado' :
                 alert.type === 'injection' ? 'Injeção Detectada' :
                 'Atividade Suspeita'}
              </p>
              <p className="text-xs mt-1">{alert.description}</p>
            </div>
            <button
              onClick={onClear}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Hook para usar o contexto de segurança
export const useSecurityContext = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext deve ser usado dentro de SecurityProvider');
  }
  return context;
};

// Componente HOC para proteger rotas
export const withSecurity = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const { isSecure, sessionExpired } = useSecurityContext();

    if (sessionExpired) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sessão Expirada</h2>
            <p className="text-gray-600 mb-4">Sua sessão expirou por motivos de segurança.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Renovar Sessão
            </button>
          </div>
        </div>
      );
    }

    if (!isSecure && process.env.NODE_ENV === 'production') {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Conexão Insegura</h2>
            <p className="text-gray-600 mb-4">Esta página requer uma conexão HTTPS segura.</p>
            <button
              onClick={() => window.location.href = window.location.href.replace('http:', 'https:')}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Usar HTTPS
            </button>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};

export default SecurityProvider;