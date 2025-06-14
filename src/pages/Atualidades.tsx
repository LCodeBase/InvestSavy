
import React from 'react';
import Layout from '../components/Layout';
import { TrendingUp, Clock, DollarSign, BarChart3, Newspaper, Target, AlertCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Link } from 'react-router-dom';

const Atualidades = () => {
  const sampleNews = [
    {
      title: 'Banco Central Mantém Selic em 10,75% ao Ano',
      summary: 'Em decisão unânime, o Copom manteve a taxa básica de juros, sinalizando preocupação com a inflação e cenário econômico global.',
      impact: 'Com a Selic alta, investimentos em renda fixa como Tesouro Selic e CDBs ficam mais atrativos. Se você tem dívidas com juros variáveis, elas podem ficar mais caras.',
      date: '15 Jan 2025',
      category: 'Taxa de Juros',
      categoryColor: 'bg-blue-100 text-blue-700',
      priority: 'high',
      slug: 'banco-central-selic-janeiro-2025',
      readTime: '6 min'
    },
    {
      title: 'Nova Regra do PIX: Transações Acima de R$ 5 mil Serão Informadas à Receita',
      summary: 'A Receita Federal implementou nova regra de monitoramento para transações PIX de valores elevados, visando maior controle fiscal.',
      impact: 'Se você faz transferências acima de R$ 5 mil, a Receita será notificada. Não é um imposto novo, mas mantenha seus comprovantes organizados para a declaração do IR.',
      date: '12 Jan 2025',
      category: 'Regulamentação',
      categoryColor: 'bg-purple-100 text-purple-700',
      priority: 'medium',
      slug: 'pix-nova-regra-receita-federal',
      readTime: '4 min'
    },
    {
      title: 'Inflação de Dezembro Fica em 0,21%, Acumulando 4,83% no Ano',
      summary: 'IPCA de dezembro ficou dentro das expectativas, mas inflação anual superou o teto da meta de 4,5% estabelecida pelo governo.',
      impact: 'Inflação acima da meta corrói seu poder de compra. Considere investimentos que protegem contra inflação, como Tesouro IPCA+ ou fundos imobiliários.',
      date: '10 Jan 2025',
      category: 'Inflação',
      categoryColor: 'bg-orange-100 text-orange-700',
      priority: 'high',
      slug: 'inflacao-dezembro-2024',
      readTime: '5 min'
    }
  ];

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') return <AlertCircle className="w-4 h-4 text-red-500" />;
    return <Target className="w-4 h-4 text-gray-500" />;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-8">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Análise de
              <span className="block bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                Atualidades
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Acompanhe as principais notícias econômicas traduzidas para uma linguagem simples. 
              Entenda como cada acontecimento pode impactar diretamente sua vida financeira.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-green-600" />
                <span>Análises Semanais</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span>Impacto no Bolso</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                <span>Linguagem Simples</span>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Últimas Análises
                </h2>
                <p className="text-lg text-gray-600">
                  Principais acontecimentos econômicos e seus impactos práticos
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {sampleNews.map((news, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${news.categoryColor}`}>
                          {news.category}
                        </span>
                        {getPriorityIcon(news.priority)}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{news.readTime}</span>
                        </div>
                        <div className="flex items-center">
                          <span>{news.date}</span>
                        </div>
                      </div>
                    </div>

                    <Link to={`/atualidades/${news.slug}`}>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight group-hover:text-green-700 transition-colors cursor-pointer">
                        {news.title}
                      </h3>
                    </Link>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Summary Section */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Newspaper className="w-5 h-5 text-gray-600" />
                        <h4 className="text-lg font-semibold text-gray-900">
                          O que aconteceu?
                        </h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-base">
                        {news.summary}
                      </p>
                    </div>

                    {/* Impact Section */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl p-6 border border-green-100">
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <h4 className="text-lg font-semibold text-green-900">
                          Como isso afeta seu bolso?
                        </h4>
                      </div>
                      <p className="text-green-800 leading-relaxed text-base font-medium">
                        {news.impact}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <div className="pt-4">
                      <Link
                        to={`/atualidades/${news.slug}`}
                        className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors group"
                      >
                        <span>Ler análise completa</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Por que acompanhar atualidades?
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                O mercado financeiro muda constantemente. Decisões do governo, 
                mudanças na economia e novas regulamentações podem impactar 
                diretamente seus investimentos e planejamento financeiro.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Decisões Informadas
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Tome decisões financeiras baseadas em informações atualizadas sobre o mercado.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Proteção Patrimonial
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Proteja seu dinheiro entendendo como mudanças econômicas afetam seus investimentos.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Oportunidades
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Identifique oportunidades de investimento e momentos ideais para agir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="text-center p-8 bg-gradient-to-br from-gray-50 to-green-50/30 border-0 shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl shadow-lg mb-6">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Mais Conteúdo em Breve
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Estamos preparando análises regulares sobre decisões do Banco Central, 
                mudanças na economia e novos produtos financeiros. 
              </p>
              
              <p className="text-sm text-gray-500 font-medium">
                🚀 Newsletter semanal "Economia no Seu Bolso" em desenvolvimento
              </p>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Atualidades;
