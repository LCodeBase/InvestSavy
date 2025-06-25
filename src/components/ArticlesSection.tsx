
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, BookOpen, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const ArticlesSection = () => {
  const articles = [
    {
      title: 'Orçamento Pessoal',
      excerpt: 'Um guia prático para começar a cuidar do dinheiro e tentar sair do vermelho.',
      readTime: '11 min',
      date: '15 Jan 2025',
      category: 'Investimentos',
      href: '/aprenda',
      featured: true
    },
    {
      title: 'Por Que a Reserva de Emergência É Mais Importante Que Investir',
      excerpt: 'Entenda por que você deve priorizar sua segurança financeira antes de buscar rentabilidade.',
      readTime: '6 min',
      date: '12 Jan 2025',
      category: 'Finanças Pessoais',
      featured: false
    },
    {
      title: 'Reflexão: Como Mudei Minha Relação com o Dinheiro',
      excerpt: 'Uma reflexão pessoal sobre os erros que cometi e as lições que aprendi na minha jornada financeira.',
      readTime: '10 min',
      date: '08 Jan 2025',
      category: 'Reflexões',
      featured: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Conteúdo de Qualidade
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Últimos Artigos e 
            <span className="text-green-600"> Reflexões</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprendizados, análises e insights sobre educação financeira e mercado
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {articles.map((article, index) => (
            <motion.article 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group cursor-pointer"
            >
              {article.href ? (
                <Link to={article.href} className="block h-full">
                  <div className={`${article.featured ? 'bg-white border-2 border-green-200' : 'bg-white border border-gray-100'} rounded-2xl p-6 h-full hover:shadow-2xl transition-all duration-500`}>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <span className={`${article.featured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'} px-3 py-1 rounded-full text-xs font-medium`}>
                          {article.category}
                        </span>
                        {article.featured && (
                          <Star className="w-4 h-4 text-green-500 ml-2 fill-current" />
                        )}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{article.date}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className={`${article.featured ? 'bg-white border-2 border-green-200' : 'bg-white border border-gray-100'} rounded-2xl p-6 h-full hover:shadow-2xl transition-all duration-500`}>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <span className={`${article.featured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'} px-3 py-1 rounded-full text-xs font-medium`}>
                        {article.category}
                      </span>
                      {article.featured && (
                        <Star className="w-4 h-4 text-green-500 ml-2 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{article.date}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/artigos"
              className="inline-flex items-center px-8 py-4 bg-white border-2 border-green-600 text-green-600 font-semibold rounded-2xl hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Ver Todos os Artigos
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;
