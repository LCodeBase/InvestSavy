/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de segurança
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              block-all-mixed-content;
              upgrade-insecure-requests;
              connect-src 'self';
              media-src 'none';
              worker-src 'none';
              manifest-src 'self';
            `
              .replace(/\s+/g, ' ')
              .trim(),
          },
        ],
      },
    ]
  },

  // Configurações de segurança adicionais
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,

  // Configurações de CORS mais restritivas
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
        has: [
          {
            type: 'header',
            key: 'origin',
            value: '(.*)',
          },
        ],
      },
    ]
  },

  // Configurações de imagens com domínios específicos
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Configurações de compilação com otimizações de segurança
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configurações de cache mais restritivas
  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
    pagesBufferLength: 1,
  },

  // Configurações de compressão
  compress: true,
}

module.exports = nextConfig
