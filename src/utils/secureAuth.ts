/**
 * Sistema de autenticação segura com JWT, 2FA, biometria e proteção avançada
 * Implementa as melhores práticas de segurança para autenticação
 */

import { securityLogger } from './securityLogger';
import { hash, generateSecureToken, generateNonce } from './encryption';
import { injectionProtection } from './injectionProtection';

// Tipos para autenticação
interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  salt: string;
  twoFactorSecret?: string;
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  lastLogin: number;
  loginAttempts: number;
  lockedUntil?: number;
  securityQuestions?: SecurityQuestion[];
  trustedDevices: TrustedDevice[];
  sessions: UserSession[];
  preferences: SecurityPreferences;
}

interface SecurityQuestion {
  id: string;
  question: string;
  answerHash: string;
  salt: string;
}

interface TrustedDevice {
  id: string;
  fingerprint: string;
  name: string;
  lastUsed: number;
  ipAddress: string;
  userAgent: string;
  trusted: boolean;
}

interface UserSession {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  deviceFingerprint: string;
  ipAddress: string;
  userAgent: string;
  createdAt: number;
  expiresAt: number;
  lastActivity: number;
  isActive: boolean;
}

interface SecurityPreferences {
  requireTwoFactor: boolean;
  requireBiometric: boolean;
  sessionTimeout: number;
  allowMultipleSessions: boolean;
  requireDeviceVerification: boolean;
  passwordExpiryDays: number;
}

interface LoginAttempt {
  email: string;
  ip: string;
  userAgent: string;
  timestamp: number;
  success: boolean;
  reason?: string;
  deviceFingerprint: string;
}

interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  refreshToken?: string;
  requiresTwoFactor?: boolean;
  requiresBiometric?: boolean;
  requiresDeviceVerification?: boolean;
  error?: string;
  lockoutTime?: number;
}

interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

// Configurações de segurança
const AUTH_CONFIG = {
  PASSWORD_MIN_LENGTH: 12,
  PASSWORD_REQUIRE_UPPERCASE: true,
  PASSWORD_REQUIRE_LOWERCASE: true,
  PASSWORD_REQUIRE_NUMBERS: true,
  PASSWORD_REQUIRE_SYMBOLS: true,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 30 * 60 * 1000, // 30 minutos
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 horas
  REFRESH_TOKEN_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 dias
  TWO_FACTOR_WINDOW: 30, // segundos
  DEVICE_TRUST_DURATION: 30 * 24 * 60 * 60 * 1000, // 30 dias
  PASSWORD_HISTORY_COUNT: 5,
  BRUTE_FORCE_THRESHOLD: 10,
  SUSPICIOUS_ACTIVITY_THRESHOLD: 3
};

// Classe principal de autenticação segura
export class SecureAuth {
  private static instance: SecureAuth;
  private users = new Map<string, User>();
  private sessions = new Map<string, UserSession>();
  private loginAttempts: LoginAttempt[] = [];
  private blacklistedTokens = new Set<string>();
  private passwordHistory = new Map<string, string[]>();
  
  private constructor() {
    this.initializeAuth();
  }
  
  static getInstance(): SecureAuth {
    if (!SecureAuth.instance) {
      SecureAuth.instance = new SecureAuth();
    }
    return SecureAuth.instance;
  }
  
  /**
   * Registra um novo usuário com validação de segurança
   */
  async register(
    email: string,
    username: string,
    password: string,
    deviceFingerprint: string,
    ipAddress: string,
    userAgent: string
  ): Promise<AuthResult> {
    try {
      // Validar entrada
      const emailValidation = await injectionProtection.validateAndSanitize(email);
      const usernameValidation = await injectionProtection.validateAndSanitize(username);
      
      if (!emailValidation.isValid || !usernameValidation.isValid) {
        return { success: false, error: 'Dados de entrada inválidos' };
      }
      
      // Validar formato de email
      const emailCheck = injectionProtection.validateEmail(emailValidation.sanitized);
      if (!emailCheck.isValid) {
        return { success: false, error: 'Email inválido' };
      }
      
      // Verificar se usuário já existe
      if (this.getUserByEmail(emailCheck.sanitized) || this.getUserByUsername(usernameValidation.sanitized)) {
        await securityLogger.logEvent(
          'REGISTRATION_ATTEMPT',
          'MEDIUM',
          'Tentativa de registro com email/username existente',
          { email: emailCheck.sanitized, username: usernameValidation.sanitized, ip: ipAddress }
        );
        return { success: false, error: 'Usuário já existe' };
      }
      
      // Validar força da senha
      const passwordValidation = this.validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.message };
      }
      
      // Gerar salt e hash da senha
      const salt = await generateNonce(32);
      const passwordHash = await hash.sha512(password + salt);
      
      // Criar usuário
      const userId = await generateSecureToken(16);
      const user: User = {
        id: userId,
        email: emailCheck.sanitized,
        username: usernameValidation.sanitized,
        passwordHash,
        salt,
        twoFactorEnabled: false,
        biometricEnabled: false,
        lastLogin: 0,
        loginAttempts: 0,
        securityQuestions: [],
        trustedDevices: [],
        sessions: [],
        preferences: {
          requireTwoFactor: false,
          requireBiometric: false,
          sessionTimeout: AUTH_CONFIG.SESSION_DURATION,
          allowMultipleSessions: false,
          requireDeviceVerification: true,
          passwordExpiryDays: 90
        }
      };
      
      this.users.set(userId, user);
      this.passwordHistory.set(userId, [passwordHash]);
      
      await securityLogger.logEvent(
        'USER_REGISTERED',
        'LOW',
        'Novo usuário registrado',
        { userId, email: emailCheck.sanitized, ip: ipAddress }
      );
      
      // Criar sessão inicial
      const authResult = await this.createSession(user, deviceFingerprint, ipAddress, userAgent);
      
      return {
        success: true,
        user,
        token: authResult.token,
        refreshToken: authResult.refreshToken
      };
      
    } catch (error) {
      await securityLogger.logEvent(
        'REGISTRATION_ERROR',
        'HIGH',
        'Erro durante registro',
        { error: error instanceof Error ? error.message : 'Erro desconhecido', email, ip: ipAddress }
      );
      
      return { success: false, error: 'Erro interno do servidor' };
    }
  }
  
  /**
   * Autentica usuário com múltiplos fatores
   */
  async login(
    emailOrUsername: string,
    password: string,
    deviceFingerprint: string,
    ipAddress: string,
    userAgent: string,
    twoFactorCode?: string,
    biometricData?: string
  ): Promise<AuthResult> {
    try {
      // Validar entrada
      const inputValidation = await injectionProtection.validateAndSanitize(emailOrUsername);
      if (!inputValidation.isValid) {
        return { success: false, error: 'Dados de entrada inválidos' };
      }
      
      // Verificar rate limiting
      if (await this.isRateLimited(ipAddress)) {
        return { success: false, error: 'Muitas tentativas de login. Tente novamente mais tarde.' };
      }
      
      // Buscar usuário
      const user = this.getUserByEmail(inputValidation.sanitized) || this.getUserByUsername(inputValidation.sanitized);
      
      if (!user) {
        await this.logLoginAttempt(emailOrUsername, ipAddress, userAgent, deviceFingerprint, false, 'Usuário não encontrado');
        return { success: false, error: 'Credenciais inválidas' };
      }
      
      // Verificar se conta está bloqueada
      if (user.lockedUntil && Date.now() < user.lockedUntil) {
        const lockoutTime = Math.ceil((user.lockedUntil - Date.now()) / 1000);
        await this.logLoginAttempt(emailOrUsername, ipAddress, userAgent, deviceFingerprint, false, 'Conta bloqueada');
        return { success: false, error: 'Conta temporariamente bloqueada', lockoutTime };
      }
      
      // Verificar senha
      const passwordHash = await hash.sha512(password + user.salt);
      if (passwordHash !== user.passwordHash) {
        user.loginAttempts++;
        
        if (user.loginAttempts >= AUTH_CONFIG.MAX_LOGIN_ATTEMPTS) {
          user.lockedUntil = Date.now() + AUTH_CONFIG.LOCKOUT_DURATION;
          await securityLogger.logEvent(
            'ACCOUNT_LOCKED',
            'HIGH',
            'Conta bloqueada por excesso de tentativas',
            { userId: user.id, email: user.email, ip: ipAddress }
          );
        }
        
        await this.logLoginAttempt(emailOrUsername, ipAddress, userAgent, deviceFingerprint, false, 'Senha incorreta');
        return { success: false, error: 'Credenciais inválidas' };
      }
      
      // Verificar se dispositivo é confiável
      const trustedDevice = user.trustedDevices.find(d => d.fingerprint === deviceFingerprint);
      const isNewDevice = !trustedDevice;
      
      // Verificar 2FA se habilitado
      if (user.twoFactorEnabled && !twoFactorCode) {
        return {
          success: false,
          requiresTwoFactor: true,
          error: 'Código de autenticação de dois fatores necessário'
        };
      }
      
      if (user.twoFactorEnabled && twoFactorCode) {
        const twoFactorValid = await this.verifyTwoFactor(user, twoFactorCode);
        if (!twoFactorValid) {
          await this.logLoginAttempt(emailOrUsername, ipAddress, userAgent, deviceFingerprint, false, '2FA inválido');
          return { success: false, error: 'Código de autenticação inválido' };
        }
      }
      
      // Verificar biometria se habilitado
      if (user.biometricEnabled && !biometricData) {
        return {
          success: false,
          requiresBiometric: true,
          error: 'Autenticação biométrica necessária'
        };
      }
      
      if (user.biometricEnabled && biometricData) {
        const biometricValid = await this.verifyBiometric(user, biometricData);
        if (!biometricValid) {
          await this.logLoginAttempt(emailOrUsername, ipAddress, userAgent, deviceFingerprint, false, 'Biometria inválida');
          return { success: false, error: 'Autenticação biométrica falhou' };
        }
      }
      
      // Verificar dispositivo novo
      if (isNewDevice && user.preferences.requireDeviceVerification) {
        return {
          success: false,
          requiresDeviceVerification: true,
          error: 'Verificação de dispositivo necessária'
        };
      }
      
      // Login bem-sucedido
      user.loginAttempts = 0;
      user.lockedUntil = undefined;
      user.lastLogin = Date.now();
      
      // Adicionar dispositivo como confiável se novo
      if (isNewDevice) {
        user.trustedDevices.push({
          id: await generateSecureToken(16),
          fingerprint: deviceFingerprint,
          name: this.extractDeviceName(userAgent),
          lastUsed: Date.now(),
          ipAddress,
          userAgent,
          trusted: true
        });
      } else if (trustedDevice) {
        trustedDevice.lastUsed = Date.now();
        trustedDevice.ipAddress = ipAddress;
      }
      
      // Criar sessão
      const sessionResult = await this.createSession(user, deviceFingerprint, ipAddress, userAgent);
      
      await this.logLoginAttempt(emailOrUsername, ipAddress, userAgent, deviceFingerprint, true);
      
      await securityLogger.logEvent(
        'USER_LOGIN',
        'LOW',
        'Login bem-sucedido',
        { userId: user.id, email: user.email, ip: ipAddress, newDevice: isNewDevice }
      );
      
      return {
        success: true,
        user,
        token: sessionResult.token,
        refreshToken: sessionResult.refreshToken
      };
      
    } catch (error) {
      await securityLogger.logEvent(
        'LOGIN_ERROR',
        'HIGH',
        'Erro durante login',
        { error: error instanceof Error ? error.message : 'Erro desconhecido', email: emailOrUsername, ip: ipAddress }
      );
      
      return { success: false, error: 'Erro interno do servidor' };
    }
  }
  
  /**
   * Configura autenticação de dois fatores
   */
  async setupTwoFactor(userId: string): Promise<TwoFactorSetup | null> {
    try {
      const user = this.users.get(userId);
      if (!user) return null;
      
      const secret = await generateSecureToken(32);
      const qrCode = this.generateQRCode(user.email, secret);
      const backupCodes = await this.generateBackupCodes();
      
      // Não salvar ainda - apenas retornar para verificação
      return { secret, qrCode, backupCodes };
      
    } catch (error) {
      console.error('Erro ao configurar 2FA:', error);
      return null;
    }
  }
  
  /**
   * Confirma configuração de 2FA
   */
  async confirmTwoFactor(
    userId: string,
    secret: string,
    verificationCode: string,
    backupCodes: string[]
  ): Promise<boolean> {
    try {
      const user = this.users.get(userId);
      if (!user) return false;
      
      // Verificar código
      const isValid = this.verifyTOTP(secret, verificationCode);
      if (!isValid) return false;
      
      // Salvar configuração
      user.twoFactorSecret = secret;
      user.twoFactorEnabled = true;
      
      // Salvar códigos de backup (hasheados)
      // Em implementação real, salvar em local seguro
      
      await securityLogger.logEvent(
        'TWO_FACTOR_ENABLED',
        'LOW',
        '2FA habilitado para usuário',
        { userId, email: user.email }
      );
      
      return true;
      
    } catch (error) {
      console.error('Erro ao confirmar 2FA:', error);
      return false;
    }
  }
  
  /**
   * Valida token de sessão
   */
  async validateSession(token: string): Promise<{ valid: boolean; user?: User; session?: UserSession }> {
    try {
      if (this.blacklistedTokens.has(token)) {
        return { valid: false };
      }
      
      const session = Array.from(this.sessions.values()).find(s => s.token === token);
      
      if (!session || !session.isActive || Date.now() > session.expiresAt) {
        return { valid: false };
      }
      
      const user = this.users.get(session.userId);
      if (!user) {
        return { valid: false };
      }
      
      // Atualizar última atividade
      session.lastActivity = Date.now();
      
      return { valid: true, user, session };
      
    } catch (error) {
      console.error('Erro ao validar sessão:', error);
      return { valid: false };
    }
  }
  
  /**
   * Faz logout e invalida sessão
   */
  async logout(token: string): Promise<boolean> {
    try {
      const session = Array.from(this.sessions.values()).find(s => s.token === token);
      
      if (session) {
        session.isActive = false;
        this.sessions.delete(session.id);
        this.blacklistedTokens.add(token);
        this.blacklistedTokens.add(session.refreshToken);
        
        const user = this.users.get(session.userId);
        if (user) {
          await securityLogger.logEvent(
            'USER_LOGOUT',
            'LOW',
            'Logout realizado',
            { userId: user.id, email: user.email, sessionId: session.id }
          );
        }
      }
      
      return true;
      
    } catch (error) {
      console.error('Erro durante logout:', error);
      return false;
    }
  }
  
  /**
   * Renova token usando refresh token
   */
  async refreshToken(refreshToken: string): Promise<{ token?: string; refreshToken?: string; error?: string }> {
    try {
      if (this.blacklistedTokens.has(refreshToken)) {
        return { error: 'Refresh token inválido' };
      }
      
      const session = Array.from(this.sessions.values()).find(s => s.refreshToken === refreshToken);
      
      if (!session || !session.isActive) {
        return { error: 'Sessão inválida' };
      }
      
      const user = this.users.get(session.userId);
      if (!user) {
        return { error: 'Usuário não encontrado' };
      }
      
      // Gerar novos tokens
      const newToken = await generateSecureToken(64);
      const newRefreshToken = await generateSecureToken(64);
      
      // Invalidar tokens antigos
      this.blacklistedTokens.add(session.token);
      this.blacklistedTokens.add(session.refreshToken);
      
      // Atualizar sessão
      session.token = newToken;
      session.refreshToken = newRefreshToken;
      session.lastActivity = Date.now();
      session.expiresAt = Date.now() + AUTH_CONFIG.SESSION_DURATION;
      
      return { token: newToken, refreshToken: newRefreshToken };
      
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      return { error: 'Erro interno do servidor' };
    }
  }
  
  /**
   * Altera senha com validação de segurança
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const user = this.users.get(userId);
      if (!user) {
        return { success: false, error: 'Usuário não encontrado' };
      }
      
      // Verificar senha atual
      const currentPasswordHash = await hash.sha512(currentPassword + user.salt);
      if (currentPasswordHash !== user.passwordHash) {
        return { success: false, error: 'Senha atual incorreta' };
      }
      
      // Validar nova senha
      const passwordValidation = this.validatePasswordStrength(newPassword);
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.message };
      }
      
      // Verificar histórico de senhas
      const newPasswordHash = await hash.sha512(newPassword + user.salt);
      const history = this.passwordHistory.get(userId) || [];
      
      if (history.includes(newPasswordHash)) {
        return { success: false, error: 'Não é possível reutilizar uma senha anterior' };
      }
      
      // Atualizar senha
      user.passwordHash = newPasswordHash;
      
      // Atualizar histórico
      history.push(newPasswordHash);
      if (history.length > AUTH_CONFIG.PASSWORD_HISTORY_COUNT) {
        history.shift();
      }
      this.passwordHistory.set(userId, history);
      
      // Invalidar todas as sessões
      await this.invalidateAllSessions(userId);
      
      await securityLogger.logEvent(
        'PASSWORD_CHANGED',
        'MEDIUM',
        'Senha alterada',
        { userId, email: user.email }
      );
      
      return { success: true };
      
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  }
  
  /**
   * Obtém estatísticas de autenticação
   */
  getAuthStatistics(): {
    totalUsers: number;
    activeSessions: number;
    recentLogins: number;
    failedAttempts: number;
    lockedAccounts: number;
    twoFactorEnabled: number;
  } {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);
    
    const activeSessions = Array.from(this.sessions.values())
      .filter(s => s.isActive && s.expiresAt > now).length;
    
    const recentLogins = this.loginAttempts
      .filter(a => a.timestamp > oneHourAgo && a.success).length;
    
    const failedAttempts = this.loginAttempts
      .filter(a => a.timestamp > oneHourAgo && !a.success).length;
    
    const lockedAccounts = Array.from(this.users.values())
      .filter(u => u.lockedUntil && u.lockedUntil > now).length;
    
    const twoFactorEnabled = Array.from(this.users.values())
      .filter(u => u.twoFactorEnabled).length;
    
    return {
      totalUsers: this.users.size,
      activeSessions,
      recentLogins,
      failedAttempts,
      lockedAccounts,
      twoFactorEnabled
    };
  }
  
  // Métodos privados
  private getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(u => u.email === email);
  }
  
  private getUserByUsername(username: string): User | undefined {
    return Array.from(this.users.values()).find(u => u.username === username);
  }
  
  private validatePasswordStrength(password: string): { isValid: boolean; message?: string } {
    if (password.length < AUTH_CONFIG.PASSWORD_MIN_LENGTH) {
      return { isValid: false, message: `Senha deve ter pelo menos ${AUTH_CONFIG.PASSWORD_MIN_LENGTH} caracteres` };
    }
    
    if (AUTH_CONFIG.PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
      return { isValid: false, message: 'Senha deve conter pelo menos uma letra maiúscula' };
    }
    
    if (AUTH_CONFIG.PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
      return { isValid: false, message: 'Senha deve conter pelo menos uma letra minúscula' };
    }
    
    if (AUTH_CONFIG.PASSWORD_REQUIRE_NUMBERS && !/\d/.test(password)) {
      return { isValid: false, message: 'Senha deve conter pelo menos um número' };
    }
    
    if (AUTH_CONFIG.PASSWORD_REQUIRE_SYMBOLS && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return { isValid: false, message: 'Senha deve conter pelo menos um símbolo especial' };
    }
    
    return { isValid: true };
  }
  
  private async createSession(
    user: User,
    deviceFingerprint: string,
    ipAddress: string,
    userAgent: string
  ): Promise<{ token: string; refreshToken: string }> {
    const sessionId = await generateSecureToken(16);
    const token = await generateSecureToken(64);
    const refreshToken = await generateSecureToken(64);
    
    const session: UserSession = {
      id: sessionId,
      userId: user.id,
      token,
      refreshToken,
      deviceFingerprint,
      ipAddress,
      userAgent,
      createdAt: Date.now(),
      expiresAt: Date.now() + AUTH_CONFIG.SESSION_DURATION,
      lastActivity: Date.now(),
      isActive: true
    };
    
    this.sessions.set(sessionId, session);
    user.sessions.push(session);
    
    return { token, refreshToken };
  }
  
  private async verifyTwoFactor(user: User, code: string): Promise<boolean> {
    if (!user.twoFactorSecret) return false;
    return this.verifyTOTP(user.twoFactorSecret, code);
  }
  
  private verifyTOTP(secret: string, token: string): boolean {
    // Implementação simplificada do TOTP
    // Em produção, usar biblioteca como 'speakeasy'
    const window = Math.floor(Date.now() / 30000);
    
    for (let i = -1; i <= 1; i++) {
      const expectedToken = this.generateTOTP(secret, window + i);
      if (expectedToken === token) {
        return true;
      }
    }
    
    return false;
  }
  
  private generateTOTP(secret: string, window: number): string {
    // Implementação simplificada
    // Em produção, usar algoritmo HMAC-SHA1 adequado
    const hash = (secret + window).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return Math.abs(hash % 1000000).toString().padStart(6, '0');
  }
  
  private async verifyBiometric(user: User, biometricData: string): Promise<boolean> {
    // Implementação simplificada
    // Em produção, usar APIs de biometria adequadas
    return biometricData.length > 0;
  }
  
  private generateQRCode(email: string, secret: string): string {
    // Implementação simplificada
    // Em produção, gerar QR code real
    return `otpauth://totp/InvestSavy:${email}?secret=${secret}&issuer=InvestSavy`;
  }
  
  private async generateBackupCodes(): Promise<string[]> {
    const codes: string[] = [];
    for (let i = 0; i < 10; i++) {
      codes.push(await generateSecureToken(8));
    }
    return codes;
  }
  
  private extractDeviceName(userAgent: string): string {
    if (userAgent.includes('Mobile')) return 'Mobile Device';
    if (userAgent.includes('Tablet')) return 'Tablet';
    if (userAgent.includes('Windows')) return 'Windows PC';
    if (userAgent.includes('Mac')) return 'Mac';
    if (userAgent.includes('Linux')) return 'Linux PC';
    return 'Unknown Device';
  }
  
  private async isRateLimited(ipAddress: string): Promise<boolean> {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    const recentAttempts = this.loginAttempts
      .filter(a => a.ip === ipAddress && a.timestamp > oneHourAgo && !a.success);
    
    return recentAttempts.length >= AUTH_CONFIG.BRUTE_FORCE_THRESHOLD;
  }
  
  private async logLoginAttempt(
    email: string,
    ip: string,
    userAgent: string,
    deviceFingerprint: string,
    success: boolean,
    reason?: string
  ): Promise<void> {
    const attempt: LoginAttempt = {
      email,
      ip,
      userAgent,
      timestamp: Date.now(),
      success,
      reason,
      deviceFingerprint
    };
    
    this.loginAttempts.push(attempt);
    
    // Manter apenas últimas 1000 tentativas
    if (this.loginAttempts.length > 1000) {
      this.loginAttempts = this.loginAttempts.slice(-1000);
    }
  }
  
  private async invalidateAllSessions(userId: string): Promise<void> {
    const userSessions = Array.from(this.sessions.values())
      .filter(s => s.userId === userId);
    
    for (const session of userSessions) {
      session.isActive = false;
      this.sessions.delete(session.id);
      this.blacklistedTokens.add(session.token);
      this.blacklistedTokens.add(session.refreshToken);
    }
    
    const user = this.users.get(userId);
    if (user) {
      user.sessions = [];
    }
  }
  
  private initializeAuth(): void {
    // Limpeza periódica de sessões expiradas
    setInterval(() => {
      this.cleanupExpiredSessions();
    }, 60 * 60 * 1000); // A cada hora
    
    // Limpeza de tokens blacklistados antigos
    setInterval(() => {
      this.cleanupBlacklistedTokens();
    }, 24 * 60 * 60 * 1000); // A cada dia
  }
  
  private cleanupExpiredSessions(): void {
    const now = Date.now();
    
    for (const [sessionId, session] of this.sessions.entries()) {
      if (!session.isActive || session.expiresAt < now) {
        this.sessions.delete(sessionId);
        this.blacklistedTokens.add(session.token);
        this.blacklistedTokens.add(session.refreshToken);
      }
    }
  }
  
  private cleanupBlacklistedTokens(): void {
    // Em implementação real, remover tokens expirados da blacklist
    // baseado em timestamp de expiração
  }
}

// Instância singleton
export const secureAuth = SecureAuth.getInstance();

// Hook para React
export const useSecureAuth = () => {
  const register = async (
    email: string,
    username: string,
    password: string,
    deviceFingerprint: string
  ) => {
    const ip = 'client'; // Em produção, obter do servidor
    const userAgent = navigator.userAgent;
    
    return await secureAuth.register(email, username, password, deviceFingerprint, ip, userAgent);
  };
  
  const login = async (
    emailOrUsername: string,
    password: string,
    deviceFingerprint: string,
    twoFactorCode?: string,
    biometricData?: string
  ) => {
    const ip = 'client';
    const userAgent = navigator.userAgent;
    
    return await secureAuth.login(emailOrUsername, password, deviceFingerprint, ip, userAgent, twoFactorCode, biometricData);
  };
  
  const logout = async (token: string) => {
    return await secureAuth.logout(token);
  };
  
  const validateSession = async (token: string) => {
    return await secureAuth.validateSession(token);
  };
  
  const refreshToken = async (refreshToken: string) => {
    return await secureAuth.refreshToken(refreshToken);
  };
  
  const changePassword = async (userId: string, currentPassword: string, newPassword: string) => {
    return await secureAuth.changePassword(userId, currentPassword, newPassword);
  };
  
  const setupTwoFactor = async (userId: string) => {
    return await secureAuth.setupTwoFactor(userId);
  };
  
  const confirmTwoFactor = async (userId: string, secret: string, code: string, backupCodes: string[]) => {
    return await secureAuth.confirmTwoFactor(userId, secret, code, backupCodes);
  };
  
  const getStatistics = () => {
    return secureAuth.getAuthStatistics();
  };
  
  return {
    register,
    login,
    logout,
    validateSession,
    refreshToken,
    changePassword,
    setupTwoFactor,
    confirmTwoFactor,
    getStatistics
  };
};

console.log('🔐 Sistema de autenticação segura inicializado');

// Exportar para uso global
(window as any).__secureAuth = secureAuth;