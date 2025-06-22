import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { SECURITY_HEADERS, generateCSPString } from "./src/config/security";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    https: mode === 'production' ? {
      // Configurar certificados SSL em produção
      // cert: fs.readFileSync('path/to/cert.pem'),
      // key: fs.readFileSync('path/to/key.pem')
    } : false,
    headers: {
      // Aplicar headers de segurança em desenvolvimento
      ...SECURITY_HEADERS,
      'Content-Security-Policy': generateCSPString(),
      // Permitir conexões locais em desenvolvimento
      'Access-Control-Allow-Origin': mode === 'development' ? '*' : 'https://investsavy.com.br',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token'
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Configurações de segurança para build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Remove console.log em produção
        drop_debugger: true, // Remove debugger statements
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : []
      },
      mangle: {
        // Ofuscar nomes de variáveis em produção
        toplevel: mode === 'production'
      }
    },
    rollupOptions: {
      output: {
        // Configurar nomes de arquivos para dificultar engenharia reversa
        entryFileNames: mode === 'production' ? 'assets/[name]-[hash].js' : 'assets/[name].js',
        chunkFileNames: mode === 'production' ? 'assets/[name]-[hash].js' : 'assets/[name].js',
        assetFileNames: mode === 'production' ? 'assets/[name]-[hash].[ext]' : 'assets/[name].[ext]'
      }
    },
    // Configurar source maps apenas para desenvolvimento
    sourcemap: mode === 'development'
  },
  define: {
    // Definir variáveis de ambiente seguras
    __DEV__: mode === 'development',
    __PROD__: mode === 'production',
    // Remover informações sensíveis em produção
    'process.env.NODE_ENV': JSON.stringify(mode),
    'import.meta.env.DEV': mode === 'development',
    'import.meta.env.PROD': mode === 'production'
  },
  // Configurações de preview para produção
  preview: {
    port: 4173,
    host: true,
    headers: {
      ...SECURITY_HEADERS,
      'Content-Security-Policy': generateCSPString()
    }
  }
}));
