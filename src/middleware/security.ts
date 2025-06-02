import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { securityConfig } from '../config/security'

// Middleware de segurança
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Configuração de headers de segurança
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  )
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )
  response.headers.set(
    'Content-Security-Policy',
    `
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
  `
      .replace(/\s+/g, ' ')
      .trim()
  )

  // Proteção contra clickjacking
  response.headers.set('X-Frame-Options', 'DENY')

  // Proteção contra XSS
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Configuração de CORS
  const origin = request.headers.get('origin')
  if (origin && securityConfig.cors.origin === origin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set(
      'Access-Control-Allow-Methods',
      securityConfig.cors.methods.join(',')
    )
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  return response
}

// Configuração de quais rotas o middleware deve ser aplicado
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
