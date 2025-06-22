/**
 * Sistema de criptografia seguro
 * Implementa criptografia AES-GCM e outras funções de segurança
 */

import { SECURITY_CONFIG } from '../config/environment';

// Tipos para operações de criptografia
interface EncryptionResult {
  encryptedData: string;
  iv: string;
  salt: string;
  tag: string;
}

interface DecryptionParams {
  encryptedData: string;
  iv: string;
  salt: string;
  tag: string;
  password: string;
}

// Classe para gerenciamento de criptografia
export class SecureEncryption {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;
  private static readonly SALT_LENGTH = 16;
  private static readonly TAG_LENGTH = 16;
  private static readonly ITERATIONS = 100000;

  /**
   * Gera uma chave criptográfica derivada de uma senha
   */
  private static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    // Importar a senha como chave base
    const baseKey = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveKey']
    );
    
    // Derivar a chave final usando PBKDF2
    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: this.ITERATIONS,
        hash: 'SHA-256'
      },
      baseKey,
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Criptografa dados usando AES-GCM
   */
  static async encrypt(data: string, password: string): Promise<EncryptionResult> {
    try {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      
      // Gerar IV e salt aleatórios
      const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
      const salt = crypto.getRandomValues(new Uint8Array(this.SALT_LENGTH));
      
      // Derivar chave da senha
      const key = await this.deriveKey(password, salt);
      
      // Criptografar os dados
      const encryptedBuffer = await crypto.subtle.encrypt(
        {
          name: this.ALGORITHM,
          iv: iv
        },
        key,
        dataBuffer
      );
      
      // Extrair dados criptografados e tag de autenticação
      const encryptedArray = new Uint8Array(encryptedBuffer);
      const encryptedData = encryptedArray.slice(0, -this.TAG_LENGTH);
      const tag = encryptedArray.slice(-this.TAG_LENGTH);
      
      return {
        encryptedData: this.arrayBufferToBase64(encryptedData),
        iv: this.arrayBufferToBase64(iv),
        salt: this.arrayBufferToBase64(salt),
        tag: this.arrayBufferToBase64(tag)
      };
    } catch (error) {
      console.error('Erro na criptografia:', error);
      throw new Error('Falha na criptografia dos dados');
    }
  }

  /**
   * Descriptografa dados usando AES-GCM
   */
  static async decrypt(params: DecryptionParams): Promise<string> {
    try {
      const { encryptedData, iv, salt, tag, password } = params;
      
      // Converter de base64 para ArrayBuffer
      const encryptedBuffer = this.base64ToArrayBuffer(encryptedData);
      const ivBuffer = this.base64ToArrayBuffer(iv);
      const saltBuffer = this.base64ToArrayBuffer(salt);
      const tagBuffer = this.base64ToArrayBuffer(tag);
      
      // Combinar dados criptografados com tag
      const combinedBuffer = new Uint8Array(encryptedBuffer.byteLength + tagBuffer.byteLength);
      combinedBuffer.set(new Uint8Array(encryptedBuffer));
      combinedBuffer.set(new Uint8Array(tagBuffer), encryptedBuffer.byteLength);
      
      // Derivar chave da senha
      const key = await this.deriveKey(password, new Uint8Array(saltBuffer));
      
      // Descriptografar os dados
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: this.ALGORITHM,
          iv: new Uint8Array(ivBuffer)
        },
        key,
        combinedBuffer
      );
      
      const decoder = new TextDecoder();
      return decoder.decode(decryptedBuffer);
    } catch (error) {
      console.error('Erro na descriptografia:', error);
      throw new Error('Falha na descriptografia dos dados');
    }
  }

  /**
   * Converte ArrayBuffer para Base64
   */
  private static arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Converte Base64 para ArrayBuffer
   */
  private static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
}

// Classe para hash seguro
export class SecureHash {
  /**
   * Gera hash SHA-256 de uma string
   */
  static async sha256(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    return this.arrayBufferToHex(hashBuffer);
  }

  /**
   * Gera hash SHA-512 de uma string
   */
  static async sha512(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-512', dataBuffer);
    return this.arrayBufferToHex(hashBuffer);
  }

  /**
   * Gera hash com salt para senhas
   */
  static async hashPassword(password: string, salt?: string): Promise<{ hash: string; salt: string }> {
    const actualSalt = salt || this.generateSalt();
    const combined = password + actualSalt;
    const hash = await this.sha512(combined);
    return { hash, salt: actualSalt };
  }

  /**
   * Verifica se uma senha corresponde ao hash
   */
  static async verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
    const { hash: newHash } = await this.hashPassword(password, salt);
    return newHash === hash;
  }

  /**
   * Gera um salt aleatório
   */
  private static generateSalt(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return this.arrayBufferToHex(array.buffer);
  }

  /**
   * Converte ArrayBuffer para string hexadecimal
   */
  private static arrayBufferToHex(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }
}

// Classe para geração de tokens seguros
export class SecureToken {
  /**
   * Gera um token aleatório seguro
   */
  static generate(length: number = 32): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Gera um UUID v4 seguro
   */
  static generateUUID(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    
    // Definir versão (4) e variante
    array[6] = (array[6] & 0x0f) | 0x40;
    array[8] = (array[8] & 0x3f) | 0x80;
    
    const hex = Array.from(array)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
    
    return [
      hex.substring(0, 8),
      hex.substring(8, 12),
      hex.substring(12, 16),
      hex.substring(16, 20),
      hex.substring(20, 32)
    ].join('-');
  }

  /**
   * Gera um token JWT-like (apenas para demonstração, use uma biblioteca real em produção)
   */
  static generateJWTLike(payload: object, secret: string): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = btoa(`${encodedHeader}.${encodedPayload}.${secret}`);
    
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
}

// Classe para validação de integridade
export class IntegrityValidator {
  /**
   * Gera checksum para validação de integridade
   */
  static async generateChecksum(data: string): Promise<string> {
    return await SecureHash.sha256(data);
  }

  /**
   * Valida integridade dos dados
   */
  static async validateIntegrity(data: string, expectedChecksum: string): Promise<boolean> {
    const actualChecksum = await this.generateChecksum(data);
    return actualChecksum === expectedChecksum;
  }

  /**
   * Gera assinatura digital simples
   */
  static async signData(data: string, privateKey: string): Promise<string> {
    const combined = data + privateKey;
    return await SecureHash.sha512(combined);
  }

  /**
   * Verifica assinatura digital
   */
  static async verifySignature(data: string, signature: string, privateKey: string): Promise<boolean> {
    const expectedSignature = await this.signData(data, privateKey);
    return expectedSignature === signature;
  }
}

// Utilitários de segurança
export class SecurityUtils {
  /**
   * Gera uma senha segura
   */
  static generateSecurePassword(length: number = 16): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    
    return Array.from(array)
      .map(byte => charset[byte % charset.length])
      .join('');
  }

  /**
   * Valida força da senha
   */
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;
    
    if (password.length < SECURITY_CONFIG.PASSWORD_MIN_LENGTH) {
      feedback.push(`Senha deve ter pelo menos ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} caracteres`);
    } else {
      score += 1;
    }
    
    if (!/[a-z]/.test(password)) {
      feedback.push('Senha deve conter pelo menos uma letra minúscula');
    } else {
      score += 1;
    }
    
    if (!/[A-Z]/.test(password)) {
      feedback.push('Senha deve conter pelo menos uma letra maiúscula');
    } else {
      score += 1;
    }
    
    if (!/\d/.test(password)) {
      feedback.push('Senha deve conter pelo menos um número');
    } else {
      score += 1;
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
      feedback.push('Senha deve conter pelo menos um caractere especial');
    } else {
      score += 1;
    }
    
    return {
      isValid: score >= 4,
      score,
      feedback
    };
  }

  /**
   * Limpa dados sensíveis da memória
   */
  static clearSensitiveData(obj: any): void {
    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string') {
          obj[key] = '';
        } else if (typeof obj[key] === 'object') {
          this.clearSensitiveData(obj[key]);
        }
      });
    }
  }

  /**
   * Gera nonce para CSP
   */
  static generateNonce(): string {
    return this.generateSecurePassword(16);
  }
}

// Exportar instâncias e utilitários
export const encryption = SecureEncryption;
export const hash = SecureHash;
export const token = SecureToken;
export const integrity = IntegrityValidator;
export const security = SecurityUtils;

// Exportar funções de conveniência
export const encrypt = SecureEncryption.encrypt;
export const decrypt = SecureEncryption.decrypt;
export const generateSecureToken = SecureToken.generate;
export const generateNonce = SecureToken.generate;

// Função de conveniência para criptografia rápida
export const quickEncrypt = async (data: string, password: string): Promise<string> => {
  const result = await SecureEncryption.encrypt(data, password);
  return JSON.stringify(result);
};

// Função de conveniência para descriptografia rápida
export const quickDecrypt = async (encryptedJson: string, password: string): Promise<string> => {
  const params = JSON.parse(encryptedJson) as EncryptionResult;
  return await SecureEncryption.decrypt({ ...params, password });
};

// Validar se a API de criptografia está disponível
if (!crypto || !crypto.subtle) {
  console.error('❌ API de criptografia não está disponível neste ambiente');
  throw new Error('Ambiente não suporta criptografia segura');
}

console.log('🔐 Sistema de criptografia inicializado com sucesso');