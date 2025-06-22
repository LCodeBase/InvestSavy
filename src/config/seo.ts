export const seoConfig = {
  siteName: 'InvestSavy',
  siteUrl: 'https://investsavy.com.br',
  defaultTitle: 'InvestSavy - Aprenda a Investir com Inteligência',
  defaultDescription: 'Plataforma completa de educação financeira e investimentos. Aprenda sobre ações, fundos, renda fixa e muito mais com ferramentas práticas e conteúdo atualizado.',
  defaultKeywords: 'investimentos, educação financeira, ações, fundos, renda fixa, bolsa de valores, economia, finanças pessoais, calculadora de juros, análise de investimentos, B3, tesouro direto, CDB, LCI, LCA, fundos imobiliários, dividendos, análise fundamentalista, análise técnica, carteira de investimentos',
  defaultImage: 'https://investsavy.com.br/og-image.jpg',
  author: 'InvestSavy',
  twitterSite: '@investsavy',
  twitterCreator: '@investsavy',
  locale: 'pt_BR',
  type: 'website',
  themeColor: '#16a34a',
  
  // Structured data for organization
  organizationSchema: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'InvestSavy',
    url: 'https://investsavy.com.br',
    logo: 'https://investsavy.com.br/logo.png',
    description: 'Plataforma de educação financeira e investimentos',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-11-99999-9999',
      contactType: 'customer service',
      availableLanguage: 'Portuguese'
    },
    sameAs: [
      'https://www.facebook.com/investsavy',
      'https://www.instagram.com/investsavy',
      'https://www.linkedin.com/company/investsavy',
      'https://www.youtube.com/c/investsavy',
      'https://twitter.com/investsavy'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: 'São Paulo',
      addressRegion: 'SP'
    }
  },

  // Website schema
  websiteSchema: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'InvestSavy',
    url: 'https://investsavy.com.br',
    description: 'Plataforma completa de educação financeira e investimentos',
    publisher: {
      '@type': 'Organization',
      name: 'InvestSavy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://investsavy.com.br/logo.png'
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://investsavy.com.br/buscar?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  },

  // Educational organization schema
  educationalOrganizationSchema: {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'InvestSavy',
    url: 'https://investsavy.com.br',
    description: 'Organização educacional especializada em educação financeira e investimentos',
    educationalCredentialAwarded: 'Certificado de Educação Financeira',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Educação Financeira Avançada',
      description: 'Certificação em investimentos e planejamento financeiro'
    }
  },

  // Pages configuration
  pages: {
    home: {
      title: 'InvestSavy - Aprenda a Investir com Inteligência | Educação Financeira',
      description: 'Transforme sua vida financeira com a InvestSavy. Aprenda sobre investimentos, ações, fundos, renda fixa e muito mais. Ferramentas gratuitas e conteúdo atualizado diariamente.',
      keywords: 'investimentos, educação financeira, como investir, ações, fundos, renda fixa, bolsa de valores, B3, tesouro direto, planejamento financeiro, independência financeira',
      type: 'website'
    },
    aprenda: {
      title: 'Aprenda a Investir | Cursos e Guias Completos - InvestSavy',
      description: 'Cursos completos de investimentos do básico ao avançado. Aprenda sobre ações, fundos, renda fixa, análise fundamentalista e técnica com especialistas.',
      keywords: 'cursos de investimento, como investir, educação financeira, análise fundamentalista, análise técnica, investimentos para iniciantes',
      section: 'Educação'
    },
    ferramentas: {
      title: 'Ferramentas de Investimento Gratuitas | Calculadoras - InvestSavy',
      description: 'Ferramentas gratuitas para investidores: calculadora de juros compostos, simuladores de investimento, análise de carteira e muito mais.',
      keywords: 'calculadora de investimentos, simulador de juros compostos, ferramentas financeiras, análise de carteira, calculadora de dividendos',
      section: 'Ferramentas'
    },
    atualidades: {
      title: 'Notícias de Investimentos e Economia | Análises - InvestSavy',
      description: 'Últimas notícias do mercado financeiro, análises econômicas e insights sobre investimentos. Mantenha-se atualizado com o InvestSavy.',
      keywords: 'notícias financeiras, mercado de ações, economia brasileira, análise de mercado, investimentos hoje, bolsa de valores notícias',
      section: 'Notícias'
    },
    sobre: {
      title: 'Sobre a InvestSavy | Nossa Missão e Equipe',
      description: 'Conheça a InvestSavy, nossa missão de democratizar a educação financeira no Brasil e nossa equipe de especialistas em investimentos.',
      keywords: 'sobre investsavy, equipe, missão, educação financeira brasil, especialistas em investimentos',
      section: 'Sobre',
      type: 'about'
    },
    contato: {
      title: 'Contato | Fale Conosco - InvestSavy',
      description: 'Entre em contato com a equipe InvestSavy. Tire suas dúvidas sobre investimentos, sugestões ou parcerias.',
      keywords: 'contato investsavy, suporte, dúvidas investimentos, parcerias, fale conosco',
      section: 'Contato',
      type: 'contact'
    }
  }
};

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  content: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image: string;
  url: string;
  tags?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  author: {
    '@type': 'Person',
    name: article.author
  },
  publisher: {
    '@type': 'Organization',
    name: 'InvestSavy',
    logo: {
      '@type': 'ImageObject',
      url: 'https://investsavy.com.br/logo.png'
    }
  },
  datePublished: article.publishedTime,
  dateModified: article.modifiedTime || article.publishedTime,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url
  },
  keywords: article.tags?.join(', '),
  articleSection: 'Investimentos',
  wordCount: article.content.length,
  inLanguage: 'pt-BR'
});

export const generateNewsSchema = (news: {
  title: string;
  description: string;
  content: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image: string;
  url: string;
  tags?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: news.title,
  description: news.description,
  image: news.image,
  author: {
    '@type': 'Person',
    name: news.author
  },
  publisher: {
    '@type': 'Organization',
    name: 'InvestSavy',
    logo: {
      '@type': 'ImageObject',
      url: 'https://investsavy.com.br/logo.png'
    }
  },
  datePublished: news.publishedTime,
  dateModified: news.modifiedTime || news.publishedTime,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': news.url
  },
  keywords: news.tags?.join(', '),
  articleSection: 'Economia e Finanças',
  wordCount: news.content.length,
  inLanguage: 'pt-BR'
});

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const generateCourseSchema = (course: {
  name: string;
  description: string;
  provider: string;
  url: string;
  image?: string;
  duration?: string;
  level?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: course.name,
  description: course.description,
  provider: {
    '@type': 'Organization',
    name: course.provider
  },
  url: course.url,
  image: course.image,
  timeRequired: course.duration,
  educationalLevel: course.level,
  inLanguage: 'pt-BR',
  teaches: 'Investimentos e Educação Financeira'
});