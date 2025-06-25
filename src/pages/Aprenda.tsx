
import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { seoConfig } from '../config/seo';
import { BookOpen, TrendingUp, Calculator, Lightbulb, User, PiggyBank, DollarSign, Building, Target, Zap, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Aprenda = () => {
  // SEO and Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'InvestSavy - Educação Financeira',
    description: 'Cursos completos de investimentos e educação financeira',
    url: 'https://investsavy.com.br/aprenda',
    provider: {
      '@type': 'Organization',
      name: 'InvestSavy',
      url: 'https://investsavy.com.br'
    },
    educationalLevel: 'Beginner to Advanced',
    teaches: [
      'Investimentos em Ações',
      'Fundos de Investimento',
      'Renda Fixa',
      'Análise Fundamentalista',
      'Análise Técnica',
      'Planejamento Financeiro',
      'Educação Financeira'
    ],
    courseMode: 'online',
    availableLanguage: 'pt-BR',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock'
    }
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const financeTopics = [
    {
      title: 'Orçamento Pessoal',
      description: 'Aprenda a controlar suas receitas e despesas de forma simples e eficaz',
      icon: Calculator,
      level: 'Básico',
      time: '15 min',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      available: true
    },
    {
      title: 'Reserva de Emergência',
      description: 'Como formar e manter uma reserva para situações imprevistas',
      icon: PiggyBank,
      level: 'Básico',
      time: '20 min',
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-500',
      available: false
    },
    {
      title: 'Controle de Dívidas',
      description: 'Estratégias para quitar dívidas e não se endividar novamente',
      icon: Target,
      level: 'Intermediário',
      time: '25 min',
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-500',
      available: false
    }
  ];

  const investmentTopics = [
    {
      title: 'Tesouro Direto',
      description: 'Seu primeiro passo no mundo dos investimentos com segurança',
      icon: Building,
      level: 'Básico',
      time: '30 min',
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-500',
      available: false
    },
    {
      title: 'CDB e Renda Fixa',
      description: 'Entenda certificados de depósito e outros investimentos conservadores',
      icon: DollarSign,
      level: 'Básico',
      time: '25 min',
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-500',
      available: false
    },
    {
      title: 'Ações e Bolsa',
      description: 'Primeiros passos na renda variável com consciência de risco',
      icon: TrendingUp,
      level: 'Intermediário',
      time: '45 min',
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-500',
      available: false
    }
  ];

  const economyTopics = [
    {
      title: 'Economês Descomplicado',
      description: 'Dicionário completo dos termos financeiros explicados de forma simples',
      icon: BookOpen,
      level: 'Básico',
      time: '25 min',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      available: true,
      href: '/aprenda/economes'
    },
    {
      title: 'Inflação e IPCA',
      description: 'Como a inflação afeta seu dinheiro e seus investimentos',
      icon: TrendingUp,
      level: 'Básico',
      time: '20 min',
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-500',
      available: false
    },
    {
      title: 'Taxa Selic',
      description: 'A taxa básica de juros e seu impacto na economia',
      icon: Calculator,
      level: 'Básico',
      time: '15 min',
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-500',
      available: false
    },
    {
      title: 'PIB e Indicadores',
      description: 'Principais indicadores econômicos e como interpretá-los',
      icon: Building,
      level: 'Intermediário',
      time: '30 min',
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-500',
      available: false
    }
  ];

  const glossaryTerms = [
    { term: 'CDI', definition: 'Certificado de Depósito Interbancário - taxa de referência do mercado' },
    { term: 'IPCA', definition: 'Índice de Preços ao Consumidor Amplo - medida oficial da inflação' },
    { term: 'Selic', definition: 'Sistema Especial de Liquidação e Custódia - taxa básica de juros' },
    { term: 'CDB', definition: 'Certificado de Depósito Bancário - investimento de renda fixa' },
    { term: 'LCI/LCA', definition: 'Letras de Crédito Imobiliário e do Agronegócio - isentas de IR' },
    { term: 'Volatilidade', definition: 'Medida de oscilação de preços de um ativo financeiro' }
  ];

  return (
    <Layout>
      <SEOHead
        title={seoConfig.pages.aprenda.title}
        description={seoConfig.pages.aprenda.description}
        keywords={seoConfig.pages.aprenda.keywords}
        url="https://investsavy.com.br/aprenda"
        type="website"
        section={seoConfig.pages.aprenda.section}
        canonical="https://investsavy.com.br/aprenda"
        jsonLd={jsonLd}
      />
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Educação Financeira
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Aprenda a Cuidar do 
              <span className="text-green-600"> Seu Dinheiro</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Conteúdo educativo simples, direto e sem economês. Desde o básico até conceitos mais avançados, 
              tudo explicado de forma clara para você tomar melhores decisões financeiras.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Linguagem Simples</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Aplicação Prática</span>
              </div>
            </div>
          </motion.div>

          {/* Finanças Pessoais */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Finanças Pessoais
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                O primeiro passo para uma vida financeira saudável. Aprenda a organizar, controlar e planejar suas finanças.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {financeTopics.map((topic, index) => {
                const isAvailable = topic.available;
                
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={isAvailable ? { y: -5, transition: { duration: 0.3 } } : {}}
                    className={`${topic.color} rounded-2xl border transition-all duration-300 group relative ${
                      isAvailable ? 'hover:shadow-lg cursor-pointer' : 'opacity-75'
                    }`}
                  >
                    {isAvailable ? (
                      <Link
                        to="/aprenda/orcamento-pessoal"
                        className="block p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 bg-white rounded-xl shadow-sm`}>
                            <topic.icon className={`w-6 h-6 ${topic.iconColor}`} />
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600 mb-1">
                              {topic.level}
                            </span>
                            <p className="text-xs text-gray-500">{topic.time}</p>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                          {topic.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {topic.description}
                        </p>

                        <div className="flex items-center text-green-600 font-medium text-sm transition-opacity">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Ler artigo
                        </div>
                      </Link>
                    ) : (
                      <div className="block p-6">
                        <div className="absolute top-4 right-4">
                          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                            Em breve
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 bg-white rounded-xl shadow-sm`}>
                            <topic.icon className={`w-6 h-6 ${topic.iconColor}`} />
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600 mb-1">
                              {topic.level}
                            </span>
                            <p className="text-xs text-gray-500">{topic.time}</p>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-600 mb-3">
                          {topic.title}
                        </h3>
                        
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                          {topic.description}
                        </p>

                        <div className="flex items-center text-gray-400 font-medium text-sm">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Em desenvolvimento
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Investimentos Básicos */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Investimentos Básicos
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Depois de organizar suas finanças, aprenda a fazer seu dinheiro trabalhar para você de forma segura e inteligente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`${topic.color} rounded-2xl p-6 border transition-all duration-300 group relative opacity-75`}
                >
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      Em breve
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-white rounded-xl shadow-sm`}>
                      <topic.icon className={`w-6 h-6 ${topic.iconColor}`} />
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600 mb-1">
                        {topic.level}
                      </span>
                      <p className="text-xs text-gray-500">{topic.time}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-600 mb-3">
                    {topic.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {topic.description}
                  </p>

                  <div className="flex items-center text-gray-400 font-medium text-sm">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Em desenvolvimento
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Economia Básica */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Economia Básica
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Entenda como a economia funciona e como ela impacta diretamente suas decisões financeiras e investimentos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {economyTopics.map((topic, index) => {
                if (topic.available) {
                  return (
                    <motion.div key={index} variants={itemVariants}>
                      <Link to={topic.href || '/aprenda'} className="block">
                        <div className={`${topic.color} rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 group relative`}>
                          <div className="absolute top-4 right-4">

                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow`}>
                              <topic.icon className={`w-6 h-6 ${topic.iconColor}`} />
                            </div>
                            <div className="text-right">
                              <span className="inline-block px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600 mb-1">
                                {topic.level}
                              </span>
                              <p className="text-xs text-gray-500">{topic.time}</p>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {topic.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {topic.description}
                          </p>

                          <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                            <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                            Começar agora
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                } else {
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`${topic.color} rounded-2xl p-6 border transition-all duration-300 group relative opacity-75`}
                    >
                      <div className="absolute top-4 right-4">
                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                          Em breve
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 bg-white rounded-xl shadow-sm`}>
                          <topic.icon className={`w-6 h-6 ${topic.iconColor}`} />
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600 mb-1">
                            {topic.level}
                          </span>
                          <p className="text-xs text-gray-500">{topic.time}</p>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-600 mb-3">
                        {topic.title}
                      </h3>
                      
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        {topic.description}
                      </p>

                      <div className="flex items-center text-gray-400 font-medium text-sm">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Em desenvolvimento
                      </div>
                    </motion.div>
                  );
                }
              })}
            </div>
          </motion.section>

          {/* Glossário Financeiro */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Glossário Financeiro
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Os termos mais importantes do mundo financeiro explicados de forma simples e direta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {glossaryTerms.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="p-2 bg-green-100 rounded-lg mr-4 flex-shrink-0">
                      <Lightbulb className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {item.term}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.definition}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 text-center border border-green-100"
          >
            <div className="max-w-2xl mx-auto">
              <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Pronto para Transformar sua Vida Financeira?
              </h2>
              
              <p className="text-gray-600 text-lg mb-6">
                Comece pelo básico e evolua no seu ritmo. Cada conceito aprendido é um passo em direção à sua independência financeira.
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center text-green-600">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Conteúdo atualizado</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Exemplos práticos</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Suporte contínuo</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

Aprenda.displayName = 'Aprenda';

export default Aprenda;
