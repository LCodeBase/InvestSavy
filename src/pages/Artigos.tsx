import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { seoConfig } from '../config/seo';
import { FileText, BookOpen, GraduationCap, Heart, Clock, Calendar, ArrowRight, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Artigos = () => {
  // SEO and Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Artigos InvestSavy',
    description: 'Blog com artigos sobre educação financeira, investimentos e análises de mercado',
    url: 'https://investsavy.online/artigos',
    publisher: {
      '@type': 'Organization',
      name: 'InvestSavy',
      url: 'https://investsavy.online',
      logo: {
        '@type': 'ImageObject',
        url: 'https://investsavy.online/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://investsavy.online/artigos'
    },
    blogPost: [
      {
        '@type': 'BlogPosting',
        headline: 'Resenha Completa: "Pai Rico, Pai Pobre" - Lições que Transformam a Mentalidade Financeira',
        description: 'Uma análise crítica e honesta do clássico de Robert Kiyosaki',
        url: 'https://investsavy.online/artigos/resenha-pai-rico-pai-pobre',
        datePublished: '2025-01-15',
        author: {
          '@type': 'Person',
          name: 'InvestSavy'
        }
      }
    ],
    inLanguage: 'pt-BR',
    audience: {
      '@type': 'Audience',
      audienceType: 'Investors and Financial Education Seekers'
    }
  };

  const categories = [
    {
      id: 'livros',
      title: 'Livros Lidos',
      icon: BookOpen,
      description: 'Resenhas detalhadas e principais aprendizados dos melhores livros de educação financeira',
      count: '12+ artigos'
    },
    {
      id: 'cursos',
      title: 'Cursos Feitos', 
      icon: GraduationCap,
      description: 'Experiências práticas com cursos e certificações na área financeira e de investimentos',
      count: '8+ artigos'
    },
    {
      id: 'reflexoes',
      title: 'Reflexões Pessoais',
      icon: Heart,
      description: 'Pensamentos e experiências da minha jornada de educação financeira pessoal',
      count: '15+ artigos'
    },
    {
      id: 'opinioes',
      title: 'Análises de Mercado',
      icon: Lightbulb,
      description: 'Análises fundamentadas sobre movimentos do mercado e tendências de investimento',
      count: '10+ artigos'
    }
  ];

  const featuredArticles = [
    {
      title: 'Resenha Completa: "Pai Rico, Pai Pobre" - Lições que Transformam a Mentalidade Financeira',
      slug: 'resenha-pai-rico-pai-pobre',
      category: 'Livros Lidos',
      excerpt: 'Uma análise crítica e honesta do clássico de Robert Kiyosaki, explorando como aplicar seus ensinamentos práticos no contexto brasileiro atual.',
      readTime: '12 min',
      date: '15 Jan 2025',
      featured: true
    },
    {
      title: 'Minha Jornada com a Certificação CPA-20: Vale a Pena o Investimento?',
      slug: 'certificacao-cpa-20',
      category: 'Cursos Feitos',
      excerpt: 'Compartilho minha experiência completa estudando para o CPA-20, incluindo custos, tempo dedicado e como isso mudou minha visão sobre investimentos.',
      readTime: '8 min',
      date: '12 Jan 2025',
      featured: false
    },
    {
      title: 'Como Transformei Minha Relação com Dinheiro aos 30 Anos',
      slug: 'transformacao-relacao-dinheiro',
      category: 'Reflexões Pessoais',
      excerpt: 'Uma reflexão profunda e sincera sobre os erros financeiros que cometi na juventude e as lições valiosas que aprendi ao longo do caminho.',
      readTime: '15 min',
      date: '08 Jan 2025',
      featured: false
    }
  ];

  const recentArticles = [
    {
      title: 'Análise: "O Investidor Inteligente" de Benjamin Graham - Guia Definitivo',
      slug: 'investidor-inteligente-graham',
      category: 'Livros Lidos',
      excerpt: 'Desvendando os conceitos fundamentais do value investing através da obra-prima de Benjamin Graham.',
      readTime: '10 min',
      date: '05 Jan 2025'
    },
    {
      title: 'Reflexões sobre Consumismo: Como Mudei Meus Hábitos de Compra',
      slug: 'reflexoes-consumismo',
      category: 'Reflexões Pessoais',
      excerpt: 'Estratégias práticas que usei para reduzir gastos desnecessários e focar no que realmente importa.',
      readTime: '7 min',
      date: '02 Jan 2025'
    },
    {
      title: 'Minha Experiência com Ações: Primeiros Passos na Bolsa de Valores',
      slug: 'experiencia-acoes-bolsa',
      category: 'Análises de Mercado',
      excerpt: 'Compartilho minha jornada inicial no mercado de ações, incluindo acertos, erros e lições aprendidas.',
      readTime: '9 min',
      date: '28 Dez 2024'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Artigos sobre Investimentos e Educação Financeira | InvestSavy"
        description="Artigos completos sobre educação financeira, resenhas de livros, análises de cursos e reflexões sobre investimentos. Conteúdo prático e fundamentado."
        keywords="artigos investimentos, educação financeira, resenhas livros financeiros, análises mercado, blog investimentos, pai rico pai pobre, cursos investimento"
        url="https://investsavy.com.br/artigos"
        type="website"
        section="Artigos"
        canonical="https://investsavy.com.br/artigos"
        jsonLd={jsonLd}
      />
      <div className="py-16 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
              <FileText className="w-4 h-4 mr-2" />
              Conteúdo Exclusivo
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Artigos e <span className="text-green-600">Reflexões</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Compartilho aqui meus aprendizados, experiências e reflexões sobre finanças pessoais, 
              investimentos e educação financeira. Conteúdo baseado em vivências reais e estudos aprofundados.
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group cursor-pointer"
              >
                <div className="p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-green-200 h-full">
                  <div className="p-4 bg-green-100 rounded-xl inline-block mb-6 group-hover:bg-green-200 transition-colors">
                    <category.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                    <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Articles */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Artigos em <span className="text-green-600">Destaque</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.article 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group cursor-pointer"
                >
                  <Link to={`/artigos/${article.slug}`}>
                    <div className={`${article.featured ? 'bg-gradient-to-br from-green-50 to-white border-2 border-green-200' : 'bg-white border border-gray-100'} rounded-2xl p-8 h-full hover:shadow-2xl transition-all duration-500`}>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center space-x-3">
                          <span className={`${article.featured ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-600'} px-3 py-1 rounded-full text-xs font-medium`}>
                            {article.category}
                          </span>
                          {article.featured && (
                            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                              DESTAQUE
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors leading-tight">
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
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Recent Articles */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Publicações <span className="text-green-600">Recentes</span>
            </h2>
            
            <div className="space-y-6">
              {recentArticles.map((article, index) => (
                <motion.article 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 8, transition: { duration: 0.3 } }}
                  className="group cursor-pointer"
                >
                  <Link to={`/artigos/${article.slug}`}>
                    <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-500 border border-gray-100 hover:border-green-200">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Coming Soon */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-green-50 to-white rounded-3xl p-12 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Novos Conteúdos em <span className="text-green-600">Desenvolvimento</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Estou preparando novos artigos com muito cuidado e dedicação, baseados em experiências reais, 
                livros estudados e cursos realizados. Todo conteúdo é criado com foco em agregar valor real 
                à sua jornada de educação financeira.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <BookOpen className="w-8 h-8 text-green-600 mb-3 mx-auto" />
                  <h3 className="font-semibold text-gray-900 mb-2">Próximas Resenhas</h3>
                  <p className="text-sm text-gray-600">
                    "O Investidor Inteligente", "Ações Comuns, Lucros Extraordinários"
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <Heart className="w-8 h-8 text-green-600 mb-3 mx-auto" />
                  <h3 className="font-semibold text-gray-900 mb-2">Novas Reflexões</h3>
                  <p className="text-sm text-gray-600">
                    Minimalismo financeiro, Estratégias de poupança, Mindset de crescimento
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <Lightbulb className="w-8 h-8 text-green-600 mb-3 mx-auto" />
                  <h3 className="font-semibold text-gray-900 mb-2">Análises de Mercado</h3>
                  <p className="text-sm text-gray-600">
                    Tendências 2025, Fundos imobiliários, Renda fixa vs. variável
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Artigos;
