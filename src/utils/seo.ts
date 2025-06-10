// Utilitários para SEO dinâmico
import { useEffect } from 'react';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export const updatePageSEO = (config: SEOConfig) => {
  // Atualizar título
  document.title = config.title;

  // Atualizar meta description
  updateMetaTag('description', config.description);

  // Atualizar keywords se fornecidas
  if (config.keywords) {
    updateMetaTag('keywords', config.keywords);
  }

  // Atualizar canonical URL
  if (config.canonical) {
    updateCanonicalLink(config.canonical);
  }

  // Atualizar Open Graph
  updateMetaProperty('og:title', config.title);
  updateMetaProperty('og:description', config.description);
  updateMetaProperty('og:url', config.canonical || window.location.href);
  
  if (config.ogImage) {
    updateMetaProperty('og:image', config.ogImage);
  }

  // Atualizar Twitter Cards
  updateMetaTag('twitter:title', config.title);
  updateMetaTag('twitter:description', config.description);
  
  if (config.ogImage) {
    updateMetaTag('twitter:image', config.ogImage);
  }

  // Controle de indexação
  if (config.noindex) {
    updateMetaTag('robots', 'noindex, nofollow');
  } else {
    updateMetaTag('robots', 'index, follow');
  }
};

const updateMetaTag = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const updateMetaProperty = (property: string, content: string) => {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const updateCanonicalLink = (href: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
};

// Configurações SEO pré-definidas para páginas principais
export const seoConfigs = {
  home: {
    title: 'InvestSavy - Educação Financeira Prática | Aprenda a Investir do Zero',
    description: 'Aprenda educação financeira e investimentos do zero com trilhas interativas, calculadoras gratuitas e guias práticos. Ideal para iniciantes, estudantes e endividados. 100% gratuito.',
    keywords: 'educação financeira, investimentos, calculadora financeira, juros compostos, aposentadoria, dívidas, planejamento financeiro, iniciantes, gratuito',
    canonical: 'https://www.investsavy.online/',
    ogImage: 'https://www.investsavy.online/images/logo.png'
  },
  trilhas: {
    title: 'Trilhas de Educação Financeira Gratuitas | InvestSavy',
    description: 'Trilhas completas de educação financeira para iniciantes. Aprenda sobre orçamento, investimentos, aposentadoria e muito mais. Conteúdo 100% gratuito.',
    keywords: 'trilhas educação financeira, curso gratuito investimentos, aprender finanças, orçamento pessoal, investimentos iniciantes',
    canonical: 'https://www.investsavy.online/trilhas'
  },
  ferramentas: {
    title: 'Calculadoras e Simuladores Financeiros Gratuitos | InvestSavy',
    description: 'Use nossas calculadoras gratuitas: simulador de juros compostos, calculadora de aposentadoria, quitação de dívidas e financiamento imobiliário.',
    keywords: 'calculadora financeira, simulador juros compostos, calculadora aposentadoria, simulador financiamento, calculadora dívidas',
    canonical: 'https://www.investsavy.online/ferramentas'
  },
  artigos: {
    title: 'Artigos sobre Educação Financeira e Investimentos | InvestSavy',
    description: 'Artigos práticos sobre educação financeira, investimentos, economia e planejamento financeiro. Conteúdo atualizado para iniciantes e intermediários.',
    keywords: 'artigos educação financeira, dicas investimento, planejamento financeiro, economia pessoal, finanças iniciantes',
    canonical: 'https://www.investsavy.online/artigos'
  }
};

// Hook para usar SEO em componentes React
export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    updatePageSEO(config);
  }, [config]);
};

// Função para gerar breadcrumbs estruturados
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  // Adicionar ao head
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(breadcrumbList);
  document.head.appendChild(script);

  return breadcrumbList;
};