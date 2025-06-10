import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
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
    // Otimizações para SEO e performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog'],
        },
      },
    },
    // Compressão e otimização de assets
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  },
  // Otimizações de CSS
  css: {
    devSourcemap: mode === 'development',
  },
  // Preload de módulos críticos
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
