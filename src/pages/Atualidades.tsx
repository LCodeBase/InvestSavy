
import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { seoConfig } from '../config/seo';
import { TrendingUp, Clock, DollarSign, BarChart3, Newspaper, Target, AlertCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Link } from 'react-router-dom';

const Atualidades = () => {
  // SEO and Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'InvestSavy Atualidades',
    description: 'Notícias e análises atualizadas sobre mercado financeiro, economia e investimentos',
    url: 'https://investsavy.online/atualidades',
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
      '@id': 'https://investsavy.online/atualidades'
    },
    articleSection: [
      'Política Monetária',
      'Criptomoedas',
      'Economia',
      'Geopolítica',
      'Mercado Financeiro'
    ],
    inLanguage: 'pt-BR',
    audience: {
      '@type': 'Audience',
      audienceType: 'Investors and Financial Market Participants'
    },
    about: {
      '@type': 'Thing',
      name: 'Mercado Financeiro Brasileiro'
    }
  };

  const sampleNews = [
    {
      title: "Galípolo indica que Selic deve permanecer em 15% por mais tempo",
      summary: "O presidente do Banco Central, Gabriel Galípolo, sinalizou que a taxa Selic, atualmente em 15%, deve permanecer estável devido ao processo de desaceleração da inflação. A decisão busca equilibrar o controle inflacionário com o crescimento econômico.",
      impact: "Com a Selic alta por mais tempo, seus investimentos em renda fixa (CDB, Tesouro Direto) continuam rendendo bem. Porém, financiamentos e cartão de crédito ficam mais caros. É hora de quitar dívidas e aproveitar a renda fixa.",
      date: "27 de junho de 2025",
      category: "Política Monetária",
      categoryColor: 'bg-blue-100 text-blue-700',
      priority: "high",
      slug: "politica-monetaria-galipolo-2025",
      readTime: "6 min"
    },
    {
      title: "Bitcoin opera quase estável enquanto stablecoins preocupam autoridades",
      summary: "O Bitcoin teve leve alta semanal de aproximadamente 1%, mantendo relativa estabilidade. Porém, o GAFI (Grupo de Ação Financeira Internacional) alertou sobre o crescente uso de stablecoins por organizações criminosas para lavagem de dinheiro.",
      impact: "Se você investe em Bitcoin, a estabilidade é positiva para planejamento. Porém, fique atento às regulamentações sobre stablecoins que podem afetar todo o mercado cripto. Diversifique seus investimentos e evite concentrar tudo em criptomoedas.",
      date: "26 de junho de 2025",
      category: "Criptomoedas",
      categoryColor: 'bg-orange-100 text-orange-700',
      priority: "medium",
      slug: "bitcoin-estavel-stablecoins-criminosos",
      readTime: "5 min"
    },
    {
      title: "Bitcoin recua com vencimento de US$ 40 bilhões em opções",
      summary: "Apesar da semana relativamente estável, o Bitcoin enfrenta pressão com o vencimento de contratos de opções no valor de US$ 40 bilhões. Especialistas alertam que grandes vencimentos podem gerar volatilidade significativa no mercado.",
      impact: "Grandes vencimentos de opções podem causar movimentos bruscos no preço do Bitcoin. Se você tem posições abertas, considere reduzir a exposição temporariamente. Para quem quer comprar, aguarde a volatilidade passar.",
      date: "25 de junho de 2025",
      category: "Criptomoedas",
      categoryColor: 'bg-orange-100 text-orange-700',
      priority: "high",
      slug: "bitcoin-opcoes-vencimento-40bi",
      readTime: "4 min"
    },
    {
      title: "Mercado reduz projeção de inflação e eleva estimativa do PIB",
      summary: "O Boletim Focus mostrou que o mercado financeiro reduziu a projeção de inflação (IPCA) para 5,24% e elevou a estimativa de crescimento do PIB para 2,21% em 2025. O dólar deve fechar o ano em R$ 5,72.",
      impact: "Inflação menor é boa notícia para seu poder de compra e pode indicar futuros cortes na Selic. PIB maior significa mais empregos e renda. Para investimentos, renda fixa pode ficar menos atrativa se os juros caírem, então considere diversificar.",
      date: "24 de junho de 2025",
      category: "Economia",
      categoryColor: 'bg-green-100 text-green-700',
      priority: "medium",
      slug: "mercado-reduz-projecao-inflacao-eleva-pib",
      readTime: "5 min"
    },
    {
      title: "Banco Central eleva previsão de crescimento do PIB para 2,1%",
      summary: "O Relatório de Política Monetária do Banco Central ajustou a estimativa de crescimento econômico para 2025, elevando de 1,9% para 2,1%. A revisão reflete dados mais positivos da economia brasileira no primeiro semestre.",
      impact: "Crescimento maior significa mais oportunidades de emprego e renda. Para investidores, pode indicar que ações de empresas brasileiras têm potencial de valorização. Considere aumentar exposição ao mercado doméstico.",
      date: "23 de junho de 2025",
      category: "Economia",
      categoryColor: 'bg-green-100 text-green-700',
      priority: "medium",
      slug: "bc-eleva-previsao-crescimento-pib",
      readTime: "4 min"
    },
    {
      title: "Intervenção cambial e derrubada do IOF marcam a semana",
      summary: "O Banco Central vendeu US$ 1 bilhão e utilizou operações de swap para conter a alta do dólar. Paralelamente, o Congresso Nacional derrubou decreto do governo que aumentava o IOF sobre operações financeiras.",
      impact: "Dólar mais controlado é bom para quem viaja ou compra produtos importados. A derrubada do IOF mantém custos menores em operações financeiras. Para investidores, menor volatilidade cambial traz mais previsibilidade.",
      date: "22 de junho de 2025",
      category: "Geopolítica",
      categoryColor: 'bg-red-100 text-red-700',
      priority: "high",
      slug: "intervencao-cambial-corte-iof",
      readTime: "6 min"
    },
    {
      title: "Selic no pico: analistas adiam previsão de cortes para 2026",
      summary: "Analistas da Empiricus afirmam que a taxa Selic chegou ao seu teto atual e que cortes só devem ocorrer no primeiro trimestre de 2026. A decisão depende da consolidação da queda da inflação e do cenário econômico global.",
      impact: "Renda fixa continua atrativa por mais tempo. Se você tem dívidas, o cenário de juros altos persiste, então priorize quitação. Para novos investimentos, CDBs e Tesouro Direto seguem sendo boas opções.",
      date: "21 de junho de 2025",
      category: "Investimentos",
      categoryColor: 'bg-indigo-100 text-indigo-700',
      priority: "medium",
      slug: "selic-pico-cortes-adiados",
      readTime: "5 min"
    },
    {
      title: "Wirex lança nova blockchain com brasileiro no comando",
      summary: "A Wirex, plataforma de pagamentos cripto, lançou sua própria 'appchain' na rede Tanssi para aumentar a capacidade de processamento. O projeto tem um vice-presidente brasileiro no comando, demonstrando o crescimento do Brasil no setor de blockchain.",
      impact: "O crescimento do setor blockchain no Brasil pode gerar mais oportunidades de emprego e investimento na área de tecnologia. Para investidores, acompanhe empresas brasileiras que atuam com blockchain e criptomoedas.",
      date: "20 de junho de 2025",
      category: "Tecnologia",
      categoryColor: 'bg-cyan-100 text-cyan-700',
      priority: "low",
      slug: "wirex-appchain-tanssi-brasileiro",
      readTime: "4 min"
    },
    {
      title: "Fed debate cortes enquanto Banco Central da Noruega já reduz juros",
      summary: "Dirigentes do Federal Reserve americano pedem cortes nos juros, enquanto o Banco Central da Noruega surpreendeu ao reduzir sua taxa básica para 4,25%. As decisões refletem diferentes cenários econômicos entre países desenvolvidos.",
      impact: "Cortes de juros nos EUA podem fortalecer mercados emergentes como o Brasil. Se você investe em fundos internacionais, pode haver valorização. Para o real, possível fortalecimento se capital estrangeiro retornar ao país.",
      date: "19 de junho de 2025",
      category: "Economia Global",
      categoryColor: 'bg-purple-100 text-purple-700',
      priority: "medium",
      slug: "fed-debate-cortes-noruega-age",
      readTime: "5 min"
    },
    {
      title: "Wirex lança 'appchain' na Tanssi com brasileiro no comando",
      summary: "A plataforma de pagamentos Wirex lançou uma nova estrutura blockchain (appchain) na rede Tanssi para aumentar sua capacidade de processamento. O projeto tem um vice-presidente brasileiro liderando a iniciativa.",
      impact: "Inovações em blockchain podem revolucionar pagamentos digitais. Se você investe em criptomoedas ou fintechs, acompanhe essas tecnologias. Para o dia a dia, pode significar pagamentos mais rápidos e baratos no futuro.",
      date: "21 de junho de 2025",
      category: "Tecnologia",
      categoryColor: 'bg-purple-100 text-purple-700',
      priority: "medium",
      slug: "wirex-appchain-tanssi-brasileiro",
      readTime: "4 min"
    }
   ];

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') return <AlertCircle className="w-4 h-4 text-red-500" />;
    return <Target className="w-4 h-4 text-gray-500" />;
  };

  return (
    <Layout>
      <SEOHead
        title="Atualidades do Mercado Financeiro | Notícias de Investimentos - InvestSavy"
        description="Acompanhe as principais notícias do mercado financeiro, análises econômicas e impactos nos investimentos. Informações atualizadas sobre Selic, Bitcoin, economia brasileira e mais."
        keywords="notícias mercado financeiro, selic, bitcoin, economia brasil, investimentos notícias, política monetária, criptomoedas, análise econômica, mercado ações"
        url="https://investsavy.online/atualidades"
        type="website"
        section="Atualidades"
        canonical="https://investsavy.online/atualidades"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-8">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Análise
              <span className="block bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Semanal de Noticias
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Acompanhe as principais notícias econômicas da semana traduzidas para uma linguagem simples. 
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
