
import React from 'react';
import Layout from '../components/Layout';
import { BookOpen, DollarSign, TrendingUp, BarChart3, HelpCircle, ArrowRight, Clock, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Aprenda = () => {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const sections = [
    {
      id: 'financas-pessoais',
      title: 'Finanças Pessoais',
      icon: DollarSign,
      description: 'Domine os fundamentos para organizar sua vida financeira e conquistar seus objetivos',
      color: 'from-green-500 to-emerald-600',
      topics: [
        {
          title: 'Orçamento Pessoal na Prática',
          description: 'Aprenda a criar e manter um orçamento que funciona na vida real',
          time: '15 min'
        },
        {
          title: 'Estratégias para Quitar Dívidas',
          description: 'Métodos comprovados para se livrar das dívidas de forma inteligente',
          time: '20 min'
        },
        {
          title: 'Reserva de Emergência',
          description: 'Como construir sua segurança financeira passo a passo',
          time: '12 min'
        },
        {
          title: 'Controle de Gastos Eficiente',
          description: 'Técnicas para monitorar e otimizar seus gastos mensais',
          time: '18 min'
        },
        {
          title: 'Educação Financeira Familiar',
          description: 'Envolva toda a família no planejamento financeiro',
          time: '25 min'
        }
      ]
    },
    {
      id: 'investimentos',
      title: 'Investimentos Básicos',
      icon: TrendingUp,
      description: 'Seus primeiros passos no mundo dos investimentos, sem complicação',
      color: 'from-blue-500 to-cyan-600',
      topics: [
        {
          title: 'Tesouro Direto Descomplicado',
          description: 'Seu primeiro investimento: seguro, rentável e fácil de entender',
          time: '22 min'
        },
        {
          title: 'CDB e Renda Fixa',
          description: 'Explore outras opções de investimentos conservadores',
          time: '18 min'
        },
        {
          title: 'Introdução à Bolsa de Valores',
          description: 'Primeiros conceitos sobre ações e mercado de capitais',
          time: '30 min'
        },
        {
          title: 'Fundos de Investimento',
          description: 'Como escolher e investir em fundos de forma inteligente',
          time: '25 min'
        },
        {
          title: 'Diversificação de Carteira',
          description: 'A arte de não colocar todos os ovos na mesma cesta',
          time: '20 min'
        }
      ]
    },
    {
      id: 'economia',
      title: 'Economia no Dia a Dia',
      icon: BarChart3,
      description: 'Entenda como a economia brasileira impacta diretamente seu bolso',
      color: 'from-purple-500 to-violet-600',
      topics: [
        {
          title: 'PIB e Você',
          description: 'Como o crescimento do país afeta sua vida financeira',
          time: '16 min'
        },
        {
          title: 'Inflação Descomplicada',
          description: 'Por que os preços sobem e como se proteger',
          time: '20 min'
        },
        {
          title: 'Taxa Selic Explicada',
          description: 'A taxa básica de juros e seu impacto nos investimentos',
          time: '18 min'
        },
        {
          title: 'Dólar e Economia Doméstica',
          description: 'Como a variação cambial afeta seu orçamento',
          time: '14 min'
        },
        {
          title: 'Ciclos Econômicos',
          description: 'Entenda os altos e baixos da economia brasileira',
          time: '22 min'
        }
      ]
    }
  ];

  const glossaryTerms = [
    { term: 'CDI', definition: 'Certificado de Depósito Interbancário', category: 'Indicadores' },
    { term: 'IPCA', definition: 'Índice de Preços ao Consumidor Amplo', category: 'Inflação' },
    { term: 'SELIC', definition: 'Sistema Especial de Liquidação', category: 'Juros' },
    { term: 'CDB', definition: 'Certificado de Depósito Bancário', category: 'Investimentos' },
    { term: 'LCI/LCA', definition: 'Letras de Crédito Imobiliário/Agronegócio', category: 'Investimentos' },
    { term: 'IOF', definition: 'Imposto sobre Operações Financeiras', category: 'Impostos' },
    { term: 'IR', definition: 'Imposto de Renda', category: 'Impostos' },
    { term: 'FGTS', definition: 'Fundo de Garantia por Tempo de Serviço', category: 'Trabalhista' },
    { term: 'INSS', definition: 'Instituto Nacional do Seguro Social', category: 'Previdência' }
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative py-20 lg:py-32 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-blue-600/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full text-green-700 font-medium mb-8"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Centro de Educação Financeira
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Aprenda <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Finanças</span>
                <br />de Forma Simples
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                Transforme sua relação com o dinheiro através de conteúdo prático, 
                direto e sem economês. Aprenda no seu ritmo e mude sua vida financeira.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">50k+</div>
                  <div className="text-gray-600">Pessoas já aprenderam</div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">3h</div>
                  <div className="text-gray-600">Tempo médio de estudo</div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">100%</div>
                  <div className="text-gray-600">Conteúdo gratuito</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Learning Paths */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                Trilhas de Aprendizado
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Conteúdo estruturado em etapas lógicas para você evoluir do básico ao avançado
              </motion.p>
            </motion.div>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={itemVariants}
                  className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="flex items-center mb-6 lg:mb-0">
                      <div className={`p-4 bg-gradient-to-r ${section.color} rounded-2xl mr-6 shadow-lg`}>
                        <section.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                          {section.title}
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                      {section.topics.length} módulos
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.topics.map((topic, topicIndex) => (
                      <motion.div
                        key={topicIndex}
                        whileHover={{ y: -4 }}
                        className="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                            <BookOpen className="w-5 h-5 text-gray-600" />
                          </div>
                          <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-600 shadow-sm">
                            {topic.time}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {topic.description}
                        </p>
                        <div className="flex items-center text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Começar módulo <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl border border-green-100">
                    <div className="flex items-center text-green-700 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                      <span className="font-semibold">Em Desenvolvimento</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      Este conteúdo está sendo preparado com muito carinho. Em breve você terá acesso a 
                      vídeos explicativos, exercícios práticos e materiais complementares.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Glossário */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full text-green-700 font-medium mb-6">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Dicionário Financeiro
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Glossário Completo
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Principais termos financeiros explicados de forma clara e objetiva. 
                  Nunca mais fique perdido com o "economês".
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {glossaryTerms.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{item.term}</h3>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.definition}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="text-center mt-12"
              >
                <div className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors cursor-pointer">
                  Ver glossário completo <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Aprenda;
