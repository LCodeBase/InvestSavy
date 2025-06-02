import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { securityConfig } from '../config/security'

// Lista de IPs bloqueados (exemplo)
const BLOCKED_IPS = new Set<string>()

// Lista de user agents suspeitos
const SUSPICIOUS_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'nmap',
  'hydra',
  'metasploit',
  'dirbuster',
  'gobuster',
  'wpscan',
]

// Middleware de segurança
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Proteção contra ataques de força bruta
  const ip = request.ip ?? ''
  const userAgent = request.headers.get('user-agent') ?? ''

  // Verificar se o IP está bloqueado
  if (BLOCKED_IPS.has(ip)) {
    return new NextResponse('Acesso bloqueado', { status: 403 })
  }

  // Verificar user agent suspeito
  if (
    SUSPICIOUS_USER_AGENTS.some((ua) => userAgent.toLowerCase().includes(ua))
  ) {
    return new NextResponse('Acesso negado', { status: 403 })
  }

  // Proteção contra ataques de injeção
  const url = request.nextUrl.pathname
  if (url.includes('..') || url.includes('//')) {
    return new NextResponse('URL inválida', { status: 400 })
  }

  // Proteção contra ataques de timing
  const start = Date.now()
  await new Promise((resolve) => setTimeout(resolve, 100))
  const duration = Date.now() - start

  // Proteção contra ataques de timing
  if (duration > 1000) {
    return new NextResponse('Tempo de resposta muito alto', { status: 429 })
  }

  // Proteção contra headers de segurança
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  )
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
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

  // Rate limiting básico
  const rateLimitKey = `rate-limit-${ip}`
  const rateLimit = await request.headers.get(rateLimitKey)
  if (rateLimit && parseInt(rateLimit) > 100) {
    BLOCKED_IPS.add(ip)
    return new NextResponse('Muitas requisições', { status: 429 })
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
