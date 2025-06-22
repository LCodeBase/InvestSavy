// Hook de Segurança para React - InvestSavy

import { useState, useEffect, useCallback, useRef } from 'react';
import { sanitizeInput, validateEmail, generateCSRFToken } from '../config/security';

// Interface para configurações de segurança
interface SecurityConfig {
  enableCSRF: boolean;
  enableInputSanitization: boolean;
  enableXSSProtection: boolean;
  enableClickjackingProtection: boolean;
  sessionTimeout: number; // em minutos
}

// Interface para estado de segurança
interface SecurityState {
  csrfToken: string | null;
  isSecure: boolean;
  lastActivity: Date;
  sessionExpired: boolean;
  threats: SecurityThreat[];
}

// Interface para ameaças de segurança
interface SecurityThreat {
  id: string;
  type: 'xss' | 'csrf' | 'injection' | 'suspicious_activity';
  description: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  blocked: boolean;
}

// Configuração padrão
const DEFAULT_CONFIG: SecurityConfig = {
  enableCSRF: true,
  enableInputSanitization: true,
  enableXSSProtection: true,
  enableClickjackingProtection: true,
  sessionTimeout: 30 // 30 minutos
};

// Hook principal de segurança
export const useSecurity = (config: Partial<SecurityConfig> = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const [securityState, setSecurityState] = useState<SecurityState>({
    csrfToken: null,
    isSecure: false,
    lastActivity: new Date(),
    sessionExpired: false,
    threats: []
  });

  const sessionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activityListenerRef = useRef<(() => void) | null>(null);

  // Inicializar segurança
  useEffect(() => {
    initializeSecurity();
    return () => cleanup();
  }, []);

  // Monitorar atividade do usuário
  useEffect(() => {
    if (finalConfig.sessionTimeout > 0) {
      setupActivityMonitoring();
    }
    return () => {
      if (activityListenerRef.current) {
        removeActivityListeners();
      }
    };
  }, [finalConfig.sessionTimeout]);

  // Inicializar configurações de segurança
  const initializeSecurity = useCallback(async () => {
    try {
      // Gerar token CSRF
      if (finalConfig.enableCSRF) {
        const token = generateCSRFToken();
        setSecurityState(prev => ({ ...prev, csrfToken: token }));
      }

      // Verificar se está em HTTPS (em produção)
      const isSecureConnection = window.location.protocol === 'https:' || 
                                window.location.hostname === 'localhost';

      // Aplicar proteções do navegador
      if (finalConfig.enableClickjackingProtection) {
        preventClickjacking();
      }

      if (finalConfig.enableXSSProtection) {
        enableXSSProtection();
      }

      setSecurityState(prev => ({
        ...prev,
        isSecure: isSecureConnection,
        lastActivity: new Date()
      }));

      // console.log('[SECURITY] Security initialized successfully');
    } catch (error) {
      console.error('[SECURITY] Failed to initialize security:', error);
      addThreat({
        type: 'suspicious_activity',
        description: 'Failed to initialize security',
        severity: 'high'
      });
    }
  }, [finalConfig]);

  // Configurar monitoramento de atividade
  const setupActivityMonitoring = useCallback(() => {
    const updateActivity = () => {
      setSecurityState(prev => ({ ...prev, lastActivity: new Date() }));
      resetSessionTimeout();
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    activityListenerRef.current = () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };

    resetSessionTimeout();
  }, [finalConfig.sessionTimeout]);

  // Remover listeners de atividade
  const removeActivityListeners = useCallback(() => {
    if (activityListenerRef.current) {
      activityListenerRef.current();
      activityListenerRef.current = null;
    }
  }, []);

  // Resetar timeout da sessão
  const resetSessionTimeout = useCallback(() => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }

    sessionTimeoutRef.current = setTimeout(() => {
      setSecurityState(prev => ({ ...prev, sessionExpired: true }));
      console.warn('[SECURITY] Session expired due to inactivity');
    }, finalConfig.sessionTimeout * 60 * 1000);
  }, [finalConfig.sessionTimeout]);

  // Prevenir clickjacking
  const preventClickjacking = useCallback(() => {
    if (window.self !== window.top) {
      console.warn('[SECURITY] Clickjacking attempt detected');
      addThreat({
        type: 'suspicious_activity',
        description: 'Potential clickjacking attempt detected',
        severity: 'high'
      });
      
      // Redirecionar para a página principal
      window.top!.location.href = window.self.location.href;
    }
  }, []);

  // Habilitar proteção XSS
  const enableXSSProtection = useCallback(() => {
    // Monitorar mudanças no DOM que podem indicar XSS
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Verificar scripts suspeitos
              if (element.tagName === 'SCRIPT') {
                const scriptContent = element.textContent || '';
                if (containsSuspiciousContent(scriptContent)) {
                  console.warn('[SECURITY] Suspicious script detected and blocked');
                  element.remove();
                  addThreat({
                    type: 'xss',
                    description: 'Suspicious script injection attempt',
                    severity: 'critical'
                  });
                }
              }

              // Verificar atributos suspeitos
              Array.from(element.attributes || []).forEach(attr => {
                if (attr.name.startsWith('on') || attr.value.includes('javascript:')) {
                  console.warn('[SECURITY] Suspicious attribute detected:', attr.name);
                  element.removeAttribute(attr.name);
                  addThreat({
                    type: 'xss',
                    description: `Suspicious attribute: ${attr.name}`,
                    severity: 'high'
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
  }, []);

  // Verificar conteúdo suspeito
  const containsSuspiciousContent = (content: string): boolean => {
    const suspiciousPatterns = [
      /eval\s*\(/i,
      /document\.write/i,
      /innerHTML\s*=/i,
      /outerHTML\s*=/i,
      /document\.cookie/i,
      /window\.location/i,
      /alert\s*\(/i,
      /confirm\s*\(/i,
      /prompt\s*\(/i
    ];

    return suspiciousPatterns.some(pattern => pattern.test(content));
  };

  // Adicionar ameaça de segurança
  const addThreat = useCallback((threat: Omit<SecurityThreat, 'id' | 'timestamp' | 'blocked'>) => {
    const newThreat: SecurityThreat = {
      ...threat,
      id: generateThreatId(),
      timestamp: new Date(),
      blocked: true
    };

    setSecurityState(prev => ({
      ...prev,
      threats: [...prev.threats, newThreat].slice(-50) // Manter apenas as últimas 50
    }));
  }, []);

  // Gerar ID único para ameaça
  const generateThreatId = (): string => {
    return `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Sanitizar entrada de dados
  const sanitizeUserInput = useCallback((input: string): string => {
    if (!finalConfig.enableInputSanitization) return input;
    return sanitizeInput(input);
  }, [finalConfig.enableInputSanitization]);

  // Validar formulário
  const validateForm = useCallback((formData: Record<string, any>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const sanitized = sanitizeUserInput(value);
        if (sanitized !== value) {
          errors.push(`Campo ${key} contém conteúdo não permitido`);
        }

        // Validar email se o campo contém 'email'
        if (key.toLowerCase().includes('email') && !validateEmail(value)) {
          errors.push(`Campo ${key} deve ser um email válido`);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [sanitizeUserInput]);

  // Fazer requisição segura
  const secureRequest = useCallback(async (url: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers);

    // Adicionar token CSRF
    if (finalConfig.enableCSRF && securityState.csrfToken) {
      headers.set('X-CSRF-Token', securityState.csrfToken);
    }

    // Adicionar headers de segurança
    headers.set('X-Requested-With', 'XMLHttpRequest');
    headers.set('Cache-Control', 'no-cache');

    const secureOptions: RequestInit = {
      ...options,
      headers,
      credentials: 'same-origin'
    };

    try {
      const response = await fetch(url, secureOptions);
      
      // Verificar se a resposta é segura
      if (!response.ok) {
        console.warn(`[SECURITY] Request failed: ${response.status} ${response.statusText}`);
      }

      return response;
    } catch (error) {
      console.error('[SECURITY] Secure request failed:', error);
      throw error;
    }
  }, [finalConfig.enableCSRF, securityState.csrfToken]);

  // Limpar dados sensíveis
  const clearSensitiveData = useCallback(() => {
    // Limpar localStorage
    const sensitiveKeys = ['token', 'password', 'secret', 'key'];
    Object.keys(localStorage).forEach(key => {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        localStorage.removeItem(key);
      }
    });

    // Limpar sessionStorage
    Object.keys(sessionStorage).forEach(key => {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sessionStorage.removeItem(key);
      }
    });

    // console.log('[SECURITY] Sensitive data cleared');
  }, []);

  // Renovar sessão
  const renewSession = useCallback(() => {
    if (finalConfig.enableCSRF) {
      const newToken = generateCSRFToken();
      setSecurityState(prev => ({
        ...prev,
        csrfToken: newToken,
        sessionExpired: false,
        lastActivity: new Date()
      }));
    }
    resetSessionTimeout();
  }, [finalConfig.enableCSRF, resetSessionTimeout]);

  // Cleanup
  const cleanup = useCallback(() => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }
    removeActivityListeners();
  }, [removeActivityListeners]);

  // Verificar se a sessão está ativa
  const isSessionActive = useCallback((): boolean => {
    return !securityState.sessionExpired && securityState.isSecure;
  }, [securityState.sessionExpired, securityState.isSecure]);

  // Obter estatísticas de segurança
  const getSecurityStats = useCallback(() => {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const recentThreats = securityState.threats.filter(threat => threat.timestamp > last24h);
    const criticalThreats = recentThreats.filter(threat => threat.severity === 'critical');
    const blockedThreats = recentThreats.filter(threat => threat.blocked);

    return {
      totalThreats: securityState.threats.length,
      recentThreats: recentThreats.length,
      criticalThreats: criticalThreats.length,
      blockedThreats: blockedThreats.length,
      securityScore: calculateSecurityScore()
    };
  }, [securityState.threats]);

  // Calcular pontuação de segurança
  const calculateSecurityScore = useCallback((): number => {
    let score = 100;

    // Deduzir pontos por ameaças
    securityState.threats.forEach(threat => {
      switch (threat.severity) {
        case 'critical': score -= 20; break;
        case 'high': score -= 10; break;
        case 'medium': score -= 5; break;
        case 'low': score -= 2; break;
      }
    });

    // Deduzir pontos se não estiver em HTTPS
    if (!securityState.isSecure) {
      score -= 30;
    }

    // Deduzir pontos se a sessão expirou
    if (securityState.sessionExpired) {
      score -= 15;
    }

    return Math.max(0, Math.min(100, score));
  }, [securityState]);

  return {
    // Estado
    securityState,
    isSessionActive: isSessionActive(),
    securityStats: getSecurityStats(),
    
    // Funções
    sanitizeUserInput,
    validateForm,
    secureRequest,
    clearSensitiveData,
    renewSession,
    addThreat,
    
    // Configurações
    config: finalConfig
  };
};

// Hook para monitoramento de segurança em tempo real
export const useSecurityMonitoring = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [alerts, setAlerts] = useState<SecurityThreat[]>([]);

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    // console.log('[SECURITY] Real-time monitoring started');
  }, []);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
    // console.log('[SECURITY] Real-time monitoring stopped');
  }, []);

  const addAlert = useCallback((alert: Omit<SecurityThreat, 'id' | 'timestamp' | 'blocked'>) => {
    const newAlert: SecurityThreat = {
      ...alert,
      id: `alert_${Date.now()}`,
      timestamp: new Date(),
      blocked: false
    };

    setAlerts(prev => [newAlert, ...prev].slice(0, 10)); // Manter apenas os últimos 10
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return {
    isMonitoring,
    alerts,
    startMonitoring,
    stopMonitoring,
    addAlert,
    clearAlerts
  };
};

export default useSecurity;