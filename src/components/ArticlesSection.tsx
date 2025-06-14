
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

const ArticlesSection = () => {
  const articles = [
    {
      title: 'Como Montar Sua Primera Carteira de Investimentos',
      excerpt: 'Um guia prático para começar a investir com segurança, mesmo com pouco dinheiro.',
      readTime: '8 min',
      date: '15 Jan 2025',
      category: 'Investimentos'
    },
    {
      title: 'Por Que a Reserva de Emergência É Mais Importante Que Investir',
      excerpt: 'Entenda por que você deve priorizar sua segurança financeira antes de buscar rentabilidade.',
      readTime: '6 min',
      date: '12 Jan 2025',
      category: 'Finanças Pessoais'
    },
    {
      title: 'Reflexão: Como Mudei Minha Relação com o Dinheiro',
      excerpt: 'Uma reflexão pessoal sobre os erros que cometi e as lições que aprendi na minha jornada financeira.',
      readTime: '10 min',
      date: '08 Jan 2025',
      category: 'Reflexões'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Últimos Artigos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Reflexões, aprendizados e análises sobre educação financeira e mercado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article key={index} className="group cursor-pointer">
              <div className="bg-gray-50 rounded-lg p-6 h-full hover:bg-gray-100 transition-colors">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                    {article.category}
                  </span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{article.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/artigos"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Todos os Artigos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
