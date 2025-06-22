
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
    url: 'https://investsavy.com.br/atualidades',
    publisher: {
      '@type': 'Organization',
      name: 'InvestSavy',
      url: 'https://investsavy.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://investsavy.com.br/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://investsavy.com.br/atualidades'
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
      title: "Selic sobe para 15% ao ano em decisão esperada pelo Copom",
      summary: "O Banco Central elevou a taxa Selic em 0,25 ponto percentual para 15% ao ano em junho de 2025, maior patamar desde 2006. A decisão visa conter a inflação que permanece acima da meta de 4,5%, com IPCA acumulando alta preocupante nos últimos 12 meses.",
      impact: "Empréstimos pessoais, financiamentos e cartão de crédito ficam mais caros. Por outro lado, investimentos em renda fixa como CDB, LCI e Tesouro Direto tornam-se mais atrativos. Se você tem dívidas, priorize quitá-las. Se tem dinheiro guardado, considere renda fixa.",
      date: "18 de junho de 2025",
      category: "Política Monetária",
      categoryColor: 'bg-blue-100 text-blue-700',
      priority: "high",
      slug: "selic-15-junho-2025",
      readTime: "4 min"
    },
    {
      title: "Fim da isenção fiscal para criptomoedas no Brasil",
      summary: "O governo brasileiro acabou com a isenção de imposto de renda para ganhos até R$ 35 mil mensais com criptomoedas. A partir de 2026, qualquer lucro com Bitcoin e outras moedas digitais será tributado em 17,5%, com apuração trimestral obrigatória.",
      impact: "Se você investe em criptomoedas, prepare-se para pagar mais impostos. Organize seus registros de compra e venda desde já. Para novos investidores, considere esse custo adicional ao calcular a rentabilidade. A tributação pode reduzir significativamente seus ganhos líquidos.",
      date: "15 de junho de 2025",
      category: "Criptomoedas",
      categoryColor: 'bg-purple-100 text-purple-700',
      priority: "high",
      slug: "bitcoin-111mil-junho-2025",
      readTime: "3 min"
    },
    {
      title: "PIB brasileiro cresce 1,4% no primeiro trimestre de 2025",
      summary: "O FMI divulgou que o PIB do Brasil cresceu 1,4% no primeiro trimestre de 2025, impulsionado pela agropecuária (12,2%) e consumo das famílias (1%). Porém, as projeções para o ano completo são mais pessimistas: 2% segundo o FMI, contra 2,4% esperado pelo governo.",
      impact: "Crescimento moderado significa que o mercado de trabalho pode desacelerar e os salários podem subir menos. É hora de fortalecer sua reserva de emergência e investir em qualificação profissional. Evite grandes dívidas e mantenha gastos sob controle.",
      date: "10 de junho de 2025",
      category: "Economia",
      categoryColor: 'bg-orange-100 text-orange-700',
      priority: "medium",
      slug: "fmi-crescimento-brasil-2025",
      readTime: "4 min"
    },
    {
      title: "Conflito Israel-Irã eleva preço do petróleo e afeta mercados",
      summary: "A escalada do conflito entre Israel e Irã em junho de 2025 causou alta significativa nos preços do petróleo. O JPMorgan projeta que o barril pode atingir US$ 120 ou até US$ 150 se a situação se intensificar, impactando a economia global através da inflação.",
      impact: "Combustíveis podem ficar mais caros no Brasil, afetando transporte e produtos em geral. Se você usa muito o carro, considere alternativas como transporte público. Para investimentos, evite exposição excessiva a setores sensíveis ao petróleo e diversifique sua carteira.",
      date: "12 de junho de 2025",
      category: "Geopolítica",
      categoryColor: 'bg-red-100 text-red-700',
      priority: "high",
      slug: "tensoes-geopoliticas-mercados-2025",
      readTime: "5 min"
    },
    {
      title: "Wall Street reavalia projeções para S&P 500 em meio a tensões",
      summary: "As tensões geopolíticas no Oriente Médio causaram queda no S&P 500 e cautela nos mercados globais. Wall Street está reavaliando as projeções para 2025 devido a incertezas geopolíticas e possíveis mudanças nas políticas comerciais americanas.",
      impact: "Mercados internacionais mais voláteis podem afetar seus investimentos em fundos globais ou ações americanas. Mantenha a calma e não tome decisões impulsivas. Se investe no exterior, considere diversificar mais em ativos brasileiros para reduzir riscos.",
      date: "14 de junho de 2025",
      category: "Investimentos",
      categoryColor: 'bg-indigo-100 text-indigo-700',
      priority: "medium",
      slug: "real-depreciacao-2024-2025",
      readTime: "4 min"
    },
    {
      title: "Inteligência Artificial pode impactar 31 milhões de empregos no Brasil",
      summary: "Estudo revela que a IA generativa pode afetar 31,3 milhões de empregos no Brasil, atingindo 13 áreas profissionais. Porém, a tendência é de reestruturação de tarefas, não extinção de funções. 72% das empresas já adotaram IA em 2024, e 54% dos brasileiros já usaram IA generativa.",
      impact: "Invista em qualificação e aprendizado contínuo. Profissões que exigem criatividade, relacionamento humano e pensamento crítico são menos vulneráveis. Considere cursos de tecnologia e desenvolva habilidades que complementem a IA, não que competem com ela.",
      date: "16 de junho de 2025",
      category: "Tecnologia",
      categoryColor: 'bg-cyan-100 text-cyan-700',
      priority: "medium",
      slug: "ia-tokens-cripto-2025",
      readTime: "3 min"
    },
    {
      title: "Governo lança pacote fiscal que pode gerar R$ 40 bilhões anuais",
      summary: "O governo publicou medidas tributárias incluindo aumento da taxação de Juros sobre Capital Próprio de 15% para 20%, regulamentação de apostas online (R$ 20 bi em impostos) e limitação de compensações tributárias. A reforma tributária continua em votação no Congresso.",
      impact: "Se você recebe JCP de ações, seus rendimentos serão mais tributados. Apostas online ficarão mais caras com maior carga tributária. Para investidores, analise como essas mudanças afetam a rentabilidade líquida de seus investimentos em ações que pagam JCP.",
      date: "8 de junho de 2025",
      category: "Fiscal",
      categoryColor: 'bg-yellow-100 text-yellow-700',
      priority: "medium",
      slug: "deficit-fiscal-brasil-2024",
      readTime: "4 min"
    },
    {
      title: "Ouro pode atingir US$ 3.000 com tensões geopolíticas",
      summary: "As tensões geopolíticas, especialmente no Oriente Médio, e a antecipação de cortes nas taxas de juros dos EUA devem manter os preços do ouro elevados. Analistas projetam que o metal pode atingir US$ 3.000 a onça, sendo considerado 'porto seguro' em momentos de instabilidade.",
      impact: "Para brasileiros, a alta do ouro pode favorecer ações de mineradoras como Vale. Se busca proteção contra instabilidade, considere pequena alocação em ouro via fundos ou ETFs. Porém, lembre-se que ouro não paga dividendos e pode ser volátil no curto prazo.",
      date: "11 de junho de 2025",
      category: "Commodities",
      categoryColor: 'bg-amber-100 text-amber-700',
      priority: "medium",
      slug: "commodities-guerra-comercial-2025",
      readTime: "3 min"
    },
    {
      title: "Brasil investe R$ 1,76 bilhão em infraestrutura digital até 2028",
      summary: "O governo lançou a Infraestrutura Nacional de Dados (IND) e o Plano Brasileiro de Inteligência Artificial, prevendo investimento de R$ 1,76 bilhão até 2028. O foco é melhorar serviços públicos digitais, expandir conectividade e estimular P&D em IoT, IA e computação em nuvem.",
      impact: "Melhores serviços públicos digitais podem facilitar sua vida, desde declaração de IR até acesso a benefícios. Para profissionais de tecnologia, surgem novas oportunidades de trabalho. Considere se qualificar em áreas como dados, IA e desenvolvimento de sistemas governamentais.",
      date: "13 de junho de 2025",
      category: "Inovação",
      categoryColor: 'bg-teal-100 text-teal-700',
      priority: "medium",
      slug: "tokenizacao-ativos-reais-2025",
      readTime: "4 min"
    },
    {
      title: "Economia global desacelera com tensões e volatilidade do petróleo",
      summary: "Projeções de crescimento global para 2025 foram revisadas para baixo devido a tensões comerciais e geopolíticas. A volatilidade do dólar e do petróleo torna a política monetária mais difícil de prever, com bancos centrais como Fed e BCE mantendo cautela sobre cortes de juros.",
      impact: "Economia global mais fraca pode afetar exportações brasileiras e crescimento do país. Para seus investimentos, isso significa mais volatilidade e necessidade de diversificação. Evite apostas muito arriscadas e mantenha parte do dinheiro em investimentos mais seguros.",
      date: "17 de junho de 2025",
      category: "Economia Global",
      categoryColor: 'bg-slate-100 text-slate-700',
      priority: "medium",
      slug: "etfs-bitcoin-investimentos-2025",
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
        url="https://investsavy.com.br/atualidades"
        type="website"
        section="Atualidades"
        canonical="https://investsavy.com.br/atualidades"
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
              Análise de
              <span className="block bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Notícias
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
