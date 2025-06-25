import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { seoConfig } from '../config/seo';
import JurosCalculator from '../components/JurosCalculator';
import { Calculator, TrendingUp, CreditCard, Target, PiggyBank, Receipt, DollarSign, BarChart3, Zap, Clock, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Ferramentas = () => {
  // SEO and Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Ferramentas de Investimento InvestSavy',
    description: 'Ferramentas gratuitas para investidores: calculadoras, simuladores e análises financeiras',
    url: 'https://investsavy.com.br/ferramentas',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock'
    },
    provider: {
      '@type': 'Organization',
      name: 'InvestSavy',
      url: 'https://investsavy.com.br'
    },
    featureList: [
      'Calculadora de Juros Compostos',
      'Simulador de Quitação de Dívidas',
      'Comparador de Empréstimos',
      'Calculadora de Aposentadoria',
      'Simulador de Carteira de Investimentos'
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Investors and Financial Planners'
    },
    inLanguage: 'pt-BR',
    isAccessibleForFree: true
  };

  const tools = [
    {
      id: 'juros-compostos',
      title: 'Calculadora de Juros',
      description: 'Descubra o poder dos juros, compostos e simples, e veja como pequenas quantias podem se transformar em grandes valores ao longo do tempo',
      icon: TrendingUp,
      category: 'Calculadoras',
      difficulty: 'Básico',
      time: '2 min',
      popularity: 95,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      href: '/ferramentas/calculadora-juros',
      isActive: true
    },
    {
      id: 'parcelamento',
      title: 'Parcelado vs À Vista',
      description: 'Descubra matematicamente se é mais vantajoso parcelar uma compra ou pagar à vista considerando juros e desconto',
      icon: Receipt,
      category: 'Consumo',
      difficulty: 'Básico',
      time: '2 min',
      popularity: 83,
      color: 'bg-indigo-50 border-indigo-200',
      iconColor: 'text-indigo-600',
      href: '/ferramentas/parcelado-vs-avista',
      isActive: true
    },
    {
      id: 'meta-investimento',
      title: 'Planejador de Metas Financeiras',
      description: 'Calcule quanto você precisa investir mensalmente para atingir seus objetivos financeiros específicos',
      icon: Target,
      category: 'Planejamento',
      difficulty: 'Básico',
      time: '3 min',
      popularity: 91,
      color: 'bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600'
    },
    {
      id: 'ir-investimentos',
      title: 'Calculadora de IR sobre Investimentos',
      description: 'Calcule o imposto de renda incidente sobre seus investimentos em renda fixa, variável e fundos',
      icon: DollarSign,
      category: 'Impostos',
      difficulty: 'Avançado',
      time: '6 min',
      popularity: 64,
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600'
    },
    {
      id: 'dividas',
      title: 'Simulador de Quitação de Dívidas',
      description: 'Compare diferentes estratégias para quitar suas dívidas: método bola de neve, avalanche e pagamento mínimo',
      icon: CreditCard,
      category: 'Planejamento',
      difficulty: 'Intermediário',
      time: '5 min',
      popularity: 89,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600'
    },
    {
      id: 'comparador-emprestimos',
      title: 'Comparador de Empréstimos',
      description: 'Analise e compare taxas, condições e custos totais de diferentes modalidades de crédito disponíveis no mercado',
      icon: BarChart3,
      category: 'Crédito',
      difficulty: 'Intermediário',
      time: '4 min',
      popularity: 72,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      id: 'conversor',
      title: 'Conversor CDI/Selic para Rendimento',
      description: 'Converta percentuais do CDI e Selic para valores reais e entenda quanto seus investimentos realmente rendem',
      icon: Calculator,
      category: 'Investimentos',
      difficulty: 'Intermediário',
      time: '3 min',
      popularity: 76,
      color: 'bg-teal-50 border-teal-200',
      iconColor: 'text-teal-600'
    }
  ];

  // Calcular automaticamente o número de ferramentas por categoria
  const getCategoryCount = (categoryName: string) => {
    return tools.filter(tool => tool.category === categoryName).length;
  };

  const categories = [
    { name: 'Investimentos', count: getCategoryCount('Investimentos'), icon: TrendingUp, description: 'Ferramentas para planejar e calcular seus investimentos' },
    { name: 'Planejamento', count: getCategoryCount('Planejamento'), icon: Target, description: 'Organize suas metas e estratégias financeiras' },
    { name: 'Calculadoras', count: getCategoryCount('Calculadoras'), icon: Calculator, description: 'Cálculos fundamentais para o dia a dia' },
    { name: 'Crédito', count: getCategoryCount('Crédito'), icon: CreditCard, description: 'Análise de empréstimos e financiamentos' },
    { name: 'Impostos', count: getCategoryCount('Impostos'), icon: DollarSign, description: 'Cálculos de tributos sobre investimentos' },
    { name: 'Consumo', count: getCategoryCount('Consumo'), icon: Receipt, description: 'Decisões inteligentes de compra' }
  ];

  const stats = [
    { label: 'Ferramentas Disponíveis', value: '12+', icon: Calculator },
    { label: 'Usuários Ativos', value: '50k+', icon: Users },
    { label: 'Cálculos Realizados', value: '2M+', icon: Zap },
    { label: 'Avaliação Média', value: '4.9', icon: Star }
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'bg-green-100 text-green-700';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-700';
      case 'Avançado': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Layout>
      <SEOHead
        title={seoConfig.pages.ferramentas.title}
        description={seoConfig.pages.ferramentas.description}
        keywords={seoConfig.pages.ferramentas.keywords}
        url="https://investsavy.com.br/ferramentas"
        type="website"
        section={seoConfig.pages.ferramentas.section}
        canonical="https://investsavy.com.br/ferramentas"
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
              <Calculator className="w-4 h-4 mr-2" />
              Ferramentas Financeiras
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Calculadoras que 
              <span className="text-green-600"> Simplificam sua Vida</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Ferramentas práticas e intuitivas para tomar decisões financeiras mais inteligentes. 
              Todas gratuitas, fáceis de usar e com resultados precisos.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Categories Overview */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Explore por Categoria
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Encontre rapidamente as ferramentas que você precisa organizadas por área de interesse
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <category.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.count} ferramentas</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>


          {/* Tools Grid */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Todas as Ferramentas
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Cada ferramenta foi desenvolvida pensando na simplicidade e precisão dos cálculos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, index) => {
                const Component = tool.isActive ? Link : 'div';
                const componentProps = tool.isActive ? { to: tool.href } : {};
                
                return (
                  <motion.div
                    key={tool.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    className={`${tool.color} rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 ${tool.isActive ? 'cursor-pointer' : 'cursor-default'} group`}
                  >
                    <Component {...(componentProps as any)} className={tool.isActive ? 'block h-full' : ''}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-3 bg-white rounded-xl shadow-sm mr-4">
                            <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tool.difficulty)}`}>
                                {tool.difficulty}
                              </span>
                              <div className="flex items-center text-gray-500 text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {tool.time}
                              </div>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <div className="flex items-center mr-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                                {tool.popularity}% de aprovação
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                        {tool.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {tool.description}
                      </p>

                      {/* Tool Preview */}
                      {tool.isActive ? (
                        <div className="bg-white rounded-xl p-4 border-2 border-green-200 mb-4">
                          <div className="text-center text-green-600">
                            <div className="flex items-center justify-center mb-2">
                              <Calculator className="w-6 h-6 mr-2" />
                              <Zap className="w-4 h-4" />
                            </div>
                            <p className="text-sm font-medium">Ferramenta Ativa</p>
                            <p className="text-xs">Clique para usar agora</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-200 mb-4">
                          <div className="text-center text-gray-500">
                            <div className="flex items-center justify-center mb-2">
                              <Calculator className="w-6 h-6 mr-2" />
                              <Zap className="w-4 h-4" />
                            </div>
                            <p className="text-sm font-medium">Ferramenta em Desenvolvimento</p>
                            <p className="text-xs">Interface intuitiva em breve</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-600">
                          {tool.category}
                        </span>
                        {tool.isActive && (
                          <div className="flex items-center text-green-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>Usar ferramenta</span>
                            <Zap className="w-4 h-4 ml-1" />
                          </div>
                        )}
                      </div>
                    </Component>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 border border-green-100"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Por que Usar Nossas Ferramentas?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Desenvolvidas com foco na experiência do usuário e precisão dos cálculos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Rápido e Intuitivo</h3>
                <p className="text-sm text-gray-600">Interface limpa e fácil de usar, com resultados instantâneos</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <Calculator className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Cálculos Precisos</h3>
                <p className="text-sm text-gray-600">Fórmulas validadas e algoritmos testados para máxima precisão</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                  <PiggyBank className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">100% Gratuito</h3>
                <p className="text-sm text-gray-600">Todas as ferramentas são gratuitas e sempre serão</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Ferramentas;
