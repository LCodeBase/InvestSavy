/**
 * Configurações de ambiente seguras
 * Este arquivo gerencia variáveis de ambiente de forma segura
 */

// Tipos para configurações de ambiente
interface EnvironmentConfig {
  API_BASE_URL: string;
  APP_NAME: string;
  APP_VERSION: string;
  ENVIRONMENT: 'development' | 'staging' | 'production';
  ENABLE_ANALYTICS: boolean;
  ENABLE_ERROR_REPORTING: boolean;
  SESSION_TIMEOUT: number;
  MAX_FILE_SIZE: number;
  ALLOWED_FILE_TYPES: string[];
  RATE_LIMIT_REQUESTS: number;
  RATE_LIMIT_WINDOW: number;
  ENCRYPTION_KEY_LENGTH: number;
  PASSWORD_MIN_LENGTH: number;
  SECURITY_HEADERS_ENABLED: boolean;
  CSP_ENABLED: boolean;
  HTTPS_ONLY: boolean;
}

// Função para validar variáveis de ambiente
function validateEnvironmentVariable(key: string, value: string | undefined, required: boolean = true): string {
  if (required && (!value || value.trim() === '')) {
    console.warn(`⚠️ Variável de ambiente obrigatória não encontrada: ${key}`);
    return '';
  }
  return value || '';
}

// Função para sanitizar URLs
function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    // Garantir que apenas protocolos seguros sejam aceitos
    if (!['https:', 'http:'].includes(parsedUrl.protocol)) {
      throw new Error('Protocolo não permitido');
    }
    return parsedUrl.toString();
  } catch (error) {
    console.error('URL inválida:', url);
    return 'https://localhost:8080';
  }
}

// Configurações padrão seguras
const DEFAULT_CONFIG: EnvironmentConfig = {
  API_BASE_URL: 'https://api.investsavy.online',
  APP_NAME: 'InvestSavy',
  APP_VERSION: '1.0.0',
  ENVIRONMENT: 'development',
  ENABLE_ANALYTICS: false,
  ENABLE_ERROR_REPORTING: false,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  RATE_LIMIT_REQUESTS: 100,
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutos
  ENCRYPTION_KEY_LENGTH: 32,
  PASSWORD_MIN_LENGTH: 8,
  SECURITY_HEADERS_ENABLED: true,
  CSP_ENABLED: true,
  HTTPS_ONLY: true
};

// Função para carregar configurações do ambiente
function loadEnvironmentConfig(): EnvironmentConfig {
  const env = import.meta.env;
  
  return {
    API_BASE_URL: sanitizeUrl(
      validateEnvironmentVariable('VITE_API_BASE_URL', env.VITE_API_BASE_URL, false) || 
      DEFAULT_CONFIG.API_BASE_URL
    ),
    APP_NAME: validateEnvironmentVariable('VITE_APP_NAME', env.VITE_APP_NAME, false) || DEFAULT_CONFIG.APP_NAME,
    APP_VERSION: validateEnvironmentVariable('VITE_APP_VERSION', env.VITE_APP_VERSION, false) || DEFAULT_CONFIG.APP_VERSION,
    ENVIRONMENT: (env.MODE as 'development' | 'staging' | 'production') || DEFAULT_CONFIG.ENVIRONMENT,
    ENABLE_ANALYTICS: env.VITE_ENABLE_ANALYTICS === 'true' || DEFAULT_CONFIG.ENABLE_ANALYTICS,
    ENABLE_ERROR_REPORTING: env.VITE_ENABLE_ERROR_REPORTING === 'true' || DEFAULT_CONFIG.ENABLE_ERROR_REPORTING,
    SESSION_TIMEOUT: parseInt(env.VITE_SESSION_TIMEOUT || String(DEFAULT_CONFIG.SESSION_TIMEOUT)),
    MAX_FILE_SIZE: parseInt(env.VITE_MAX_FILE_SIZE || String(DEFAULT_CONFIG.MAX_FILE_SIZE)),
    ALLOWED_FILE_TYPES: env.VITE_ALLOWED_FILE_TYPES?.split(',') || DEFAULT_CONFIG.ALLOWED_FILE_TYPES,
    RATE_LIMIT_REQUESTS: parseInt(env.VITE_RATE_LIMIT_REQUESTS || String(DEFAULT_CONFIG.RATE_LIMIT_REQUESTS)),
    RATE_LIMIT_WINDOW: parseInt(env.VITE_RATE_LIMIT_WINDOW || String(DEFAULT_CONFIG.RATE_LIMIT_WINDOW)),
    ENCRYPTION_KEY_LENGTH: parseInt(env.VITE_ENCRYPTION_KEY_LENGTH || String(DEFAULT_CONFIG.ENCRYPTION_KEY_LENGTH)),
    PASSWORD_MIN_LENGTH: parseInt(env.VITE_PASSWORD_MIN_LENGTH || String(DEFAULT_CONFIG.PASSWORD_MIN_LENGTH)),
    SECURITY_HEADERS_ENABLED: env.VITE_SECURITY_HEADERS_ENABLED !== 'false',
    CSP_ENABLED: env.VITE_CSP_ENABLED !== 'false',
    HTTPS_ONLY: env.VITE_HTTPS_ONLY !== 'false'
  };
}

// Configuração global da aplicação
export const ENV_CONFIG = loadEnvironmentConfig();

// Função para verificar se estamos em produção
export const isProduction = (): boolean => ENV_CONFIG.ENVIRONMENT === 'production';

// Função para verificar se estamos em desenvolvimento
export const isDevelopment = (): boolean => ENV_CONFIG.ENVIRONMENT === 'development';

// Função para verificar se estamos em staging
export const isStaging = (): boolean => ENV_CONFIG.ENVIRONMENT === 'staging';

// Função para obter URL da API de forma segura
export const getApiUrl = (endpoint: string = ''): string => {
  const baseUrl = ENV_CONFIG.API_BASE_URL.replace(/\/$/, '');
  const cleanEndpoint = endpoint.replace(/^\//, '');
  return `${baseUrl}/${cleanEndpoint}`;
};

// Função para validar configurações críticas
export const validateCriticalConfig = (): boolean => {
  const criticalChecks = [
    ENV_CONFIG.API_BASE_URL.length > 0,
    ENV_CONFIG.SESSION_TIMEOUT > 0,
    ENV_CONFIG.MAX_FILE_SIZE > 0,
    ENV_CONFIG.RATE_LIMIT_REQUESTS > 0,
    ENV_CONFIG.PASSWORD_MIN_LENGTH >= 6
  ];
  
  const isValid = criticalChecks.every(check => check);
  
  if (!isValid) {
    console.error('❌ Configurações críticas inválidas detectadas!');
  }
  
  return isValid;
};

// Função para mascarar informações sensíveis nos logs
export const maskSensitiveData = (data: string): string => {
  if (data.length <= 4) return '****';
  return data.substring(0, 2) + '*'.repeat(data.length - 4) + data.substring(data.length - 2);
};

// Função para log seguro (remove informações sensíveis)
export const secureLog = (message: string, data?: any): void => {
  if (isDevelopment()) {
    console.log(`🔒 [SECURE LOG] ${message}`, data);
  }
};

// Exportar configurações específicas (somente leitura)
export const SECURITY_CONFIG = {
  SESSION_TIMEOUT: ENV_CONFIG.SESSION_TIMEOUT,
  MAX_FILE_SIZE: ENV_CONFIG.MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES: [...ENV_CONFIG.ALLOWED_FILE_TYPES],
  RATE_LIMIT_REQUESTS: ENV_CONFIG.RATE_LIMIT_REQUESTS,
  RATE_LIMIT_WINDOW: ENV_CONFIG.RATE_LIMIT_WINDOW,
  PASSWORD_MIN_LENGTH: ENV_CONFIG.PASSWORD_MIN_LENGTH,
  ENCRYPTION_KEY_LENGTH: ENV_CONFIG.ENCRYPTION_KEY_LENGTH
} as const;

// Validar configurações na inicialização
if (!validateCriticalConfig()) {
  console.warn('⚠️ Algumas configurações podem não estar otimizadas para segurança');
}

// Log de inicialização (apenas em desenvolvimento)
if (isDevelopment()) {
  secureLog('Configurações de ambiente carregadas', {
    environment: ENV_CONFIG.ENVIRONMENT,
    apiUrl: maskSensitiveData(ENV_CONFIG.API_BASE_URL),
    securityEnabled: ENV_CONFIG.SECURITY_HEADERS_ENABLED,
    cspEnabled: ENV_CONFIG.CSP_ENABLED
  });
}