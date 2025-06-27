import React, { useState } from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { seoConfig } from '../config/seo';
import { BookOpen, Lightbulb, TrendingUp, DollarSign, Building, Calculator, PiggyBank, Target, Users, ArrowRight, CheckCircle, Star, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Economes = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Desseleciona se já estiver selecionado
    } else {
      setSelectedCategory(category); // Seleciona a nova categoria
    }
  };

  // SEO and Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Economês Descomplicado: Entenda os Termos Financeiros de Uma Vez por Todas',
    description: 'Guia completo e simples dos principais termos do mundo financeiro. Aprenda economês sem complicação e tome melhores decisões com seu dinheiro.',
    author: {
      '@type': 'Organization',
      name: 'InvestSavy'
    },
    publisher: {
      '@type': 'Organization',
      name: 'InvestSavy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.investsavy.online/logo.png'
      }
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.investsavy.online/aprenda/economes'
    },
    articleSection: 'Educação Financeira',
    keywords: ['economês', 'termos financeiros', 'educação financeira', 'investimentos', 'economia básica']
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

  // Termos organizados por categoria
  const basicTerms = [
    {
      term: 'CDI',
      definition: 'É como se fosse a "nota" que os bancos dão uns para os outros quando emprestam dinheiro entre eles. Quando você vê um investimento que rende "100% do CDI", significa que ele vai render o mesmo que essa taxa.',
      example: 'Se o CDI está em 10% ao ano e seu investimento rende 100% do CDI, você ganha 10% ao ano.',
      icon: Calculator,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      term: 'IPCA',
      definition: 'É o nome chique para inflação. Mede quanto os preços das coisas que você compra no dia a dia subiram. Se o IPCA foi de 5%, significa que as coisas ficaram 5% mais caras.',
      example: 'Se o pão custava R$ 1,00 e o IPCA foi 5%, agora o pão custa R$ 1,05.',
      icon: TrendingUp,
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600'
    },
    {
      term: 'Selic',
      definition: 'É a taxa básica de juros do Brasil. É como se fosse o "preço" do dinheiro no país. Quando ela sobe, fica mais caro pegar empréstimo e melhor investir.',
      example: 'Se a Selic está em 12%, os bancos vão cobrar mais caro nos empréstimos e pagar mais nos investimentos.',
      icon: Building,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      term: 'CDB',
      definition: 'É quando você empresta dinheiro para o banco e ele te paga juros por isso. É um dos investimentos mais seguros que existem.',
      example: 'Você coloca R$ 1.000 no CDB por 1 ano e o banco te devolve R$ 1.100 (ganhou R$ 100 de juros).',
      icon: PiggyBank,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    }
  ];

  const investmentTerms = [
    {
      term: 'Ação',
      definition: 'É como se você comprasse um pedacinho de uma empresa. Se a empresa vai bem, sua ação vale mais. Se vai mal, vale menos.',
      example: 'Você compra uma ação da Petrobras por R$ 30. Se a empresa lucrar mais, pode valer R$ 35. Se lucrar menos, pode valer R$ 25.',
      icon: TrendingUp,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600'
    },
    {
      term: 'Dividendos',
      definition: 'É quando a empresa divide parte do lucro com quem tem ações dela. É como se fosse um "presente" em dinheiro.',
      example: 'Você tem 100 ações de uma empresa. Ela decide dar R$ 2 de dividendo por ação. Você recebe R$ 200.',
      icon: DollarSign,
      color: 'bg-emerald-50 border-emerald-200',
      iconColor: 'text-emerald-600'
    },
    {
      term: 'Tesouro Direto',
      definition: 'É quando você empresta dinheiro para o governo brasileiro. É o investimento mais seguro do país.',
      example: 'Você empresta R$ 1.000 para o governo por 5 anos. Ele te devolve R$ 1.500 no final.',
      icon: Building,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      term: 'Volatilidade',
      definition: 'É o quanto o preço de um investimento "balança". Alta volatilidade = preço muda muito. Baixa volatilidade = preço mais estável.',
      example: 'Bitcoin tem alta volatilidade (pode subir ou descer 10% em um dia). Poupança tem baixa volatilidade.',
      icon: Target,
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600'
    }
  ];

  const bankingTerms = [
    {
      term: 'Spread',
      definition: 'É a diferença entre o que o banco paga para pegar dinheiro emprestado e o que ele cobra para emprestar para você. É o "lucro" do banco.',
      example: 'Banco pega dinheiro a 10% e empresta para você a 15%. O spread é 5%.',
      icon: Calculator,
      color: 'bg-indigo-50 border-indigo-200',
      iconColor: 'text-indigo-600'
    },
    {
      term: 'IOF',
      definition: 'É um imposto que você paga em algumas operações financeiras. Quanto mais rápido você mexer com o dinheiro, mais IOF paga.',
      example: 'Você investe R$ 1.000 e tira no mesmo dia. Pode pagar até R$ 15 de IOF.',
      icon: AlertCircle,
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600'
    },
    {
      term: 'Imposto de Renda',
      definition: 'É o que você paga para o governo sobre o que ganhou nos investimentos. Varia de 15% a 22,5% dependendo do tempo.',
      example: 'Ganhou R$ 1.000 em um investimento de curto prazo? Paga R$ 225 de IR (22,5%).',
      icon: Building,
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-600'
    },
    {
      term: 'Liquidez',
      definition: 'É a facilidade para transformar seu investimento em dinheiro na conta. Alta liquidez = consegue o dinheiro rápido.',
      example: 'Poupança tem alta liquidez (saca a hora que quiser). Imóvel tem baixa liquidez (demora para vender).',
      icon: DollarSign,
      color: 'bg-cyan-50 border-cyan-200',
      iconColor: 'text-cyan-600'
    }
  ];

  const economicTerms = [
    {
      term: 'PIB',
      definition: 'É a soma de tudo que o Brasil produziu em um ano. Se o PIB cresce, a economia vai bem. Se diminui, vai mal.',
      example: 'PIB cresceu 2% = Brasil produziu 2% mais coisas que no ano passado.',
      icon: TrendingUp,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      term: 'Câmbio',
      definition: 'É o preço do dólar em reais. Quando o dólar sobe, as coisas importadas ficam mais caras.',
      example: 'Dólar a R$ 5,00 = para comprar algo de US$ 100, você precisa de R$ 500.',
      icon: DollarSign,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      term: 'Balança Comercial',
      definition: 'É a diferença entre o que o Brasil vende para outros países e o que compra deles.',
      example: 'Brasil vendeu R$ 100 bi e comprou R$ 80 bi = superávit de R$ 20 bi (sobrou dinheiro).',
      icon: Building,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      term: 'Déficit Fiscal',
      definition: 'É quando o governo gasta mais do que arrecada. É como gastar mais do que ganha no orçamento de casa.',
      example: 'Governo arrecadou R$ 100 bi e gastou R$ 120 bi = déficit de R$ 20 bi.',
      icon: AlertCircle,
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600'
    }
  ];

  const tradingTerms = [
    {
      term: 'Day Trade',
      definition: 'É comprar e vender ações no mesmo dia para tentar ganhar dinheiro rápido. É muito arriscado.',
      example: 'Compra uma ação às 10h por R$ 50 e vende às 15h por R$ 52. Ganhou R$ 2 por ação.',
      icon: Target,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600'
    },
    {
      term: 'Stop Loss',
      definition: 'É uma ordem para vender automaticamente se o preço cair muito. É como um "freio de emergência".',
      example: 'Comprou ação por R$ 100 e colocou stop loss em R$ 90. Se cair para R$ 90, vende sozinho.',
      icon: AlertCircle,
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600'
    },
    {
      term: 'Home Broker',
      definition: 'É o aplicativo ou site onde você compra e vende ações. É como o "shopping" da bolsa de valores.',
      example: 'Você abre o app do seu banco, escolhe uma ação e clica em "comprar". Isso é o home broker.',
      icon: Calculator,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      term: 'Alavancagem',
      definition: 'É quando você investe mais dinheiro do que tem, pegando emprestado. Pode multiplicar ganhos, mas também perdas.',
      example: 'Tem R$ 1.000, pega R$ 4.000 emprestado e investe R$ 5.000. Se ganhar 10%, ganha R$ 500. Se perder 10%, perde R$ 500.',
      icon: TrendingUp,
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600'
    }
  ];

  const renderTermSection = (title, terms, description) => (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {terms.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`${item.color} rounded-2xl p-6 border hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-start mb-4">
              <div className="p-3 bg-white rounded-xl shadow-sm mr-4 flex-shrink-0">
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.term}
                </h3>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {item.definition}
            </p>
            
            <div className="bg-white bg-opacity-70 rounded-lg p-3 border-l-4 border-green-400">
              <p className="text-sm text-gray-600">
                <strong>Exemplo:</strong> {item.example}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );

  return (
    <Layout>
      <SEOHead
        title="Economês Descomplicado: Entenda os Termos Financeiros de Uma Vez por Todas"
        description="Guia completo e simples dos principais termos do mundo financeiro. Aprenda economês sem complicação e tome melhores decisões com seu dinheiro."
        keywords="economês, termos financeiros, educação financeira, investimentos, economia básica, dicionário financeiro"
        url="https://www.investsavy.online/aprenda/economes"
        type="article"
        canonical="https://www.investsavy.online/aprenda/economes"
        jsonLd={jsonLd}
      />
      
      <div className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              Dicionário Financeiro
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Economês Descomplicado:
              <span className="text-blue-600"> Fale a Língua do Dinheiro</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Chega de se sentir perdido quando alguém fala sobre investimentos! 
              Aqui você vai aprender todos os termos importantes do mundo financeiro 
              explicados de um jeito que qualquer pessoa entende. Sem complicação, sem economês.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
              <div className="flex items-center text-blue-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Linguagem Simples</span>
              </div>
              <div className="flex items-center text-blue-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Exemplos Práticos</span>
              </div>
              <div className="flex items-center text-blue-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Tudo Explicado</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-3xl mx-auto">
              <div className="flex items-start">
                <Lightbulb className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-bold text-gray-900 mb-2">Por que aprender economês?</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Quando você entende os termos financeiros, consegue tomar melhores decisões com seu dinheiro, 
                    não cai em pegadinhas e fica mais confiante para investir e crescer financeiramente.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navegação rápida */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 rounded-2xl p-6 mb-16"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Navegue pelos temas:</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { name: 'Básico', icon: Calculator, color: 'text-blue-600', category: 'basico' },
                { name: 'Investimentos', icon: TrendingUp, color: 'text-green-600', category: 'investimentos' },
                { name: 'Bancos', icon: Building, color: 'text-purple-600', category: 'bancos' },
                { name: 'Economia', icon: DollarSign, color: 'text-orange-600', category: 'economia' },
                { name: 'Trading', icon: Target, color: 'text-red-600', category: 'trading' }
              ].map((item, index) => {
                const isSelected = selectedCategory === item.category;
                return (
                  <div key={index} className="text-center">
                    <div 
                      onClick={() => handleCategoryClick(item.category)}
                      className={`p-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-600 text-white transform scale-105' 
                          : 'bg-white hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className={`w-6 h-6 mx-auto mb-2 ${
                        isSelected ? 'text-white' : item.color
                      }`} />
                      <span className={`text-sm font-medium ${
                        isSelected ? 'text-white' : 'text-gray-700'
                      }`}>{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedCategory && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Mostrando apenas: <span className="font-semibold text-blue-600">
                    {[
                      { category: 'basico', name: 'Termos Básicos' },
                      { category: 'investimentos', name: 'Investimentos' },
                      { category: 'bancos', name: 'Bancos e Impostos' },
                      { category: 'economia', name: 'Economia do País' },
                      { category: 'trading', name: 'Trading e Bolsa' }
                    ].find(cat => cat.category === selectedCategory)?.name}
                  </span>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    (mostrar todos)
                  </button>
                </p>
              </div>
            )}
          </motion.div>
          {/* Seções de termos */}
          {(!selectedCategory || selectedCategory === 'basico') && renderTermSection(
            "Termos Básicos",
            basicTerms,
            "Comece por aqui! Estes são os termos que você mais vai ouvir no mundo financeiro."
          )}

          {(!selectedCategory || selectedCategory === 'investimentos') && renderTermSection(
            "Investimentos",
            investmentTerms,
            "Tudo sobre ações, fundos e como fazer seu dinheiro crescer."
          )}

          {(!selectedCategory || selectedCategory === 'bancos') && renderTermSection(
            "Bancos e Impostos",
            bankingTerms,
            "Entenda como funcionam as taxas, impostos e operações bancárias."
          )}

          {(!selectedCategory || selectedCategory === 'economia') && renderTermSection(
            "Economia do País",
            economicTerms,
            "Como a economia brasileira funciona e o que isso significa para você."
          )}

          {(!selectedCategory || selectedCategory === 'trading') && renderTermSection(
            "Trading e Bolsa",
            tradingTerms,
            "Para quem quer entender o mundo da bolsa de valores e operações mais avançadas."
          )}

          {/* Dicas importantes */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Dicas para Não Se Perder no Economês
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                    <Lightbulb className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Comece Devagar</h3>
                  <p className="text-gray-600 text-sm">
                    Não tente aprender tudo de uma vez. Foque nos termos básicos primeiro e vá evoluindo.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Pratique no Dia a Dia</h3>
                  <p className="text-gray-600 text-sm">
                    Quando ouvir um termo, lembre da explicação simples. Com o tempo fica automático.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="p-3 bg-yellow-100 rounded-lg w-fit mb-4">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Não Tenha Vergonha</h3>
                  <p className="text-gray-600 text-sm">
                    Todo mundo já foi iniciante. Pergunte sempre que tiver dúvida, é assim que se aprende.
                  </p>
                </div>
              </div>
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
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Agora Você Fala Economês!
              </h2>
              
              <p className="text-gray-600 text-lg mb-6">
                Com estes termos, você já consegue entender a maioria das conversas sobre dinheiro e investimentos. 
                Continue aprendendo e tome melhores decisões financeiras!
              </p>

              <Link 
                to="/aprenda" 
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Ver Mais Conteúdos
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

Economes.displayName = 'Economes';

export default Economes;