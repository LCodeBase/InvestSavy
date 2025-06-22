import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // SEO for 404 page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Página Não Encontrada - 404',
    description: 'A página que você procura não foi encontrada. Explore outros conteúdos sobre investimentos e educação financeira.',
    url: `https://investsavy.com.br${location.pathname}`,
    mainEntity: {
      '@type': 'ErrorPage',
      name: '404 - Página Não Encontrada',
      publisher: {
        '@type': 'Organization',
        name: 'InvestSavy',
        url: 'https://investsavy.com.br'
      }
    },
    inLanguage: 'pt-BR'
  };

  return (
    <Layout>
      <SEOHead
        title="Página Não Encontrada - 404 | InvestSavy"
        description="A página que você procura não foi encontrada. Explore outros conteúdos sobre investimentos e educação financeira na InvestSavy."
        keywords="404, página não encontrada, erro, investimentos, educação financeira"
        url={`https://investsavy.com.br${location.pathname}`}
        type="website"
        canonical="https://investsavy.com.br"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-green-50/30 to-white">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Página Não Encontrada</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Oops! A página que você procura não existe ou foi movida. 
              Que tal explorar nossos conteúdos sobre investimentos?
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 hover:shadow-lg font-medium"
            >
              <Home className="w-5 h-5" />
              <span>Voltar ao Início</span>
            </Link>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/artigos" 
                className="text-green-600 hover:text-green-700 font-medium hover:underline"
              >
                Ver Artigos
              </Link>
              <Link 
                to="/atualidades" 
                className="text-green-600 hover:text-green-700 font-medium hover:underline"
              >
                Ver Notícias
              </Link>
              <Link 
                to="/ferramentas" 
                className="text-green-600 hover:text-green-700 font-medium hover:underline"
              >
                Ver Ferramentas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
