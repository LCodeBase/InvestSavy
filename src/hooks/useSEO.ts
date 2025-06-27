import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  canonical?: string;
  robots?: string;
  jsonLd?: object;
}

const useSEO = ({
  title = 'InvestSavy - Aprenda a Investir com Inteligência',
  description = 'Plataforma completa de educação financeira e investimentos. Aprenda sobre ações, fundos, renda fixa e muito mais com ferramentas práticas e conteúdo atualizado.',
  keywords = 'investimentos, educação financeira, ações, fundos, renda fixa, bolsa de valores, economia, finanças pessoais, calculadora de juros, análise de investimentos',
  image = 'https://www.investsavy.online/og-image.jpg',
  url,
  type = 'website',
  author = 'InvestSavy',
  publishedTime,
  modifiedTime,
  section,
  tags,
  locale = 'pt_BR',
  siteName = 'InvestSavy',
  twitterCard = 'summary_large_image',
  twitterSite = '@investsavy',
  twitterCreator = '@investsavy',
  canonical,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  jsonLd
}: SEOProps = {}) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set meta tag
    const setMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Helper function to set link tag
    const setLinkTag = (rel: string, href: string, type?: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      
      link.setAttribute('href', href);
      if (type) {
        link.setAttribute('type', type);
      }
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', author);
    setMetaTag('robots', robots);
    setMetaTag('language', 'Portuguese');
    setMetaTag('revisit-after', '7 days');
    setMetaTag('rating', 'general');
    setMetaTag('distribution', 'global');
    setMetaTag('theme-color', '#16a34a');
    setMetaTag('msapplication-TileColor', '#16a34a');
    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    setMetaTag('format-detection', 'telephone=no');

    // Open Graph meta tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:locale', locale, true);
    setMetaTag('og:site_name', siteName, true);
    
    if (url) {
      setMetaTag('og:url', url, true);
    }
    
    if (publishedTime) {
      setMetaTag('article:published_time', publishedTime, true);
    }
    
    if (modifiedTime) {
      setMetaTag('article:modified_time', modifiedTime, true);
    }
    
    if (section) {
      setMetaTag('article:section', section, true);
    }
    
    if (tags && tags.length > 0) {
      tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.setAttribute('content', tag);
        document.head.appendChild(meta);
      });
    }

    // Twitter Card meta tags
    setMetaTag('twitter:card', twitterCard);
    setMetaTag('twitter:site', twitterSite);
    setMetaTag('twitter:creator', twitterCreator);
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);

    // Canonical URL
    if (canonical || url) {
      setLinkTag('canonical', canonical || url || window.location.href);
    }

    // JSON-LD structured data
    if (jsonLd) {
      let script = document.querySelector('script[type="application/ld+json"]');
      
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      
      script.textContent = JSON.stringify(jsonLd);
    }

    // Additional SEO optimizations
    setLinkTag('preconnect', 'https://fonts.googleapis.com');
    setLinkTag('preconnect', 'https://fonts.gstatic.com');
    setLinkTag('dns-prefetch', 'https://www.google-analytics.com');
    setLinkTag('dns-prefetch', 'https://www.googletagmanager.com');

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags, locale, siteName, twitterCard, twitterSite, twitterCreator, canonical, robots, jsonLd]);
};

export default useSEO;