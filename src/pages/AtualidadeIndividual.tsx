import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { ArrowLeft, Clock, Calendar, TrendingUp, DollarSign, AlertCircle, Target, BarChart3, Lightbulb, CheckCircle, XCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';

const AtualidadeIndividual = () => {
  const { slug } = useParams<{ slug: string }>();

  // Base de dados das notícias (em um projeto real, isso viria de uma API)
  const newsDatabase = {
    'selic-15-junho-2025': {
      title: "Selic sobe para 15% ao ano em decisão esperada pelo Copom",
      summary: "O Banco Central elevou a taxa Selic em 0,25 ponto percentual para 15% ao ano em junho de 2025, maior patamar desde 2006. A decisão visa conter a inflação que permanece acima da meta de 4,5%, com IPCA acumulando alta preocupante nos últimos 12 meses.",
      impact: "Empréstimos pessoais, financiamentos e cartão de crédito ficam mais caros. Por outro lado, investimentos em renda fixa como CDB, LCI e Tesouro Direto tornam-se mais atrativos. Se você tem dívidas, priorize quitá-las. Se tem dinheiro guardado, considere renda fixa.",
      date: "18 de junho de 2025",
      category: "Política Monetária",
      categoryColor: 'bg-blue-100 text-blue-700',
      priority: "high",
      readTime: "8 min",
      author: "Equipe InvestSavy",
      fullContent: {
        context: "O Comitê de Política Monetária (Copom) do Banco Central do Brasil decidiu elevar a taxa Selic de 14,75% para 15% ao ano, em uma decisão unânime que marca o maior patamar da taxa básica de juros desde 2006. Esta foi a terceira alta consecutiva em 2025, totalizando um aumento de 1,25 ponto percentual desde março.",
        details: [
          {
            subtitle: "Por que a Selic subiu?",
            content: "A decisão foi motivada principalmente pela persistência da inflação acima da meta. O IPCA (Índice Nacional de Preços ao Consumidor Amplo) acumula alta de 6,8% nos últimos 12 meses, bem acima da meta de 4,5% estabelecida pelo governo. Os principais vilões têm sido os preços de alimentos, energia elétrica e combustíveis, que pressionaram os índices de inflação."
          },
          {
            subtitle: "Contexto econômico atual",
            content: "O Brasil enfrenta um cenário desafiador com crescimento econômico moderado (PIB de 1,4% no primeiro trimestre) e inflação persistente. O mercado de trabalho aquecido, com taxa de desemprego em mínimas históricas, contribui para a pressão inflacionária através do aumento do consumo e da massa salarial."
          },
          {
            subtitle: "Comparação histórica",
            content: "A última vez que a Selic esteve em 15% foi em 2006, durante o governo Lula. Desde então, o Brasil passou por diferentes ciclos econômicos, incluindo a crise de 2008, o período de juros baixos entre 2012-2015, e a recessão de 2015-2016. O atual patamar reflete a necessidade de combater uma inflação que se mostrou mais resistente do que o esperado."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Investimentos em renda fixa ficam mais atrativos, com CDBs podendo render acima de 16% ao ano",
            "Tesouro Direto oferece rentabilidade real positiva para quem consegue aplicar",
            "Poupança, mesmo com regra antiga, oferece retorno real positivo",
            "Controle da inflação no médio prazo protege o poder de compra"
          ],
          negativeImpacts: [
            "Empréstimos pessoais podem ultrapassar 200% ao ano em algumas instituições",
            "Financiamentos imobiliários ficam mais caros, reduzindo demanda por imóveis",
            "Cartão de crédito rotativo pode chegar a 400% ao ano",
            "Empresas enfrentam maior custo de capital, podendo reduzir investimentos e empregos"
          ],
          recommendations: [
            "Quite dívidas de cartão de crédito e empréstimos pessoais imediatamente",
            "Considere antecipar parcelas de financiamentos se tiver recursos",
            "Aplique dinheiro parado em CDBs de bancos médios que oferecem 110-120% do CDI",
            "Evite novos financiamentos até a Selic começar a cair",
            "Mantenha reserva de emergência em investimentos líquidos como Tesouro Selic"
          ]
        },
        futureOutlook: "O Banco Central sinalizou que pode manter a Selic em patamar elevado por mais tempo do que inicialmente previsto. As próximas decisões dependerão da evolução da inflação, especialmente dos preços de alimentos e energia. Economistas projetam que a Selic pode permanecer acima de 14% até o final de 2025, com possibilidade de novos aumentos se a inflação não ceder."
      }
    },
    'bitcoin-111mil-junho-2025': {
      title: "Fim da isenção fiscal para criptomoedas no Brasil",
      summary: "O governo brasileiro acabou com a isenção de imposto de renda para ganhos até R$ 35 mil mensais com criptomoedas. A partir de 2026, qualquer lucro com Bitcoin e outras moedas digitais será tributado em 17,5%, com apuração trimestral obrigatória.",
      impact: "Se você investe em criptomoedas, prepare-se para pagar mais impostos. Organize seus registros de compra e venda desde já. Para novos investidores, considere esse custo adicional ao calcular a rentabilidade. A tributação pode reduzir significativamente seus ganhos líquidos.",
      date: "15 de junho de 2025",
      category: "Criptomoedas",
      categoryColor: 'bg-purple-100 text-purple-700',
      priority: "high",
      readTime: "6 min",
      author: "Equipe InvestSavy",
      fullContent: {
        context: "Em uma decisão que impacta milhões de brasileiros investidores em criptomoedas, o governo federal publicou nova regulamentação que elimina a isenção de imposto de renda para ganhos mensais de até R$ 35 mil com moedas digitais. A medida, que entra em vigor em janeiro de 2026, representa uma mudança significativa no tratamento fiscal das criptomoedas no país.",
        details: [
          {
            subtitle: "Como funcionava antes",
            content: "Até dezembro de 2025, investidores em criptomoedas não pagavam imposto de renda sobre ganhos de capital quando as vendas mensais não ultrapassavam R$ 35 mil. Essa isenção, similar à aplicada em ações na bolsa, tornava o investimento em Bitcoin e outras moedas digitais mais atrativo para pequenos investidores."
          },
          {
            subtitle: "As novas regras",
            content: "A partir de 2026, qualquer ganho com criptomoedas será tributado em 17,5%, independentemente do valor. A apuração será trimestral, e os investidores deverão manter registros detalhados de todas as transações. Perdas poderão ser compensadas com ganhos, mas apenas dentro da categoria de criptomoedas."
          },
          {
            subtitle: "Justificativa do governo",
            content: "O governo argumenta que a medida visa aumentar a arrecadação e equalizar o tratamento tributário entre diferentes classes de ativos. Estima-se que a nova tributação possa gerar R$ 8 bilhões anuais em receita adicional, considerando o crescimento do mercado de criptomoedas no Brasil."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Maior regulamentação pode trazer mais segurança jurídica ao setor",
            "Equalização tributária entre diferentes investimentos",
            "Possível redução da volatilidade especulativa no mercado",
            "Maior controle sobre lavagem de dinheiro e evasão fiscal"
          ],
          negativeImpacts: [
            "Redução significativa da rentabilidade líquida dos investimentos",
            "Maior complexidade na declaração de imposto de renda",
            "Possível migração de investidores para exchanges internacionais",
            "Impacto negativo no desenvolvimento do setor de blockchain no Brasil"
          ],
          recommendations: [
            "Organize todos os registros de transações desde o início dos investimentos",
            "Considere realizar ganhos ainda em 2025 para aproveitar a isenção",
            "Avalie se vale a pena manter investimentos em criptomoedas com a nova tributação",
            "Procure orientação de contador especializado em criptomoedas",
            "Compare a rentabilidade líquida com outros investimentos após os impostos"
          ]
        },
        futureOutlook: "A nova tributação pode levar a uma consolidação do mercado brasileiro de criptomoedas, com maior participação de investidores institucionais e redução do interesse de pequenos investidores. O governo também estuda a criação de uma moeda digital do Banco Central (CBDC), que pode ter tratamento tributário diferenciado."
      }
    },
    'fmi-crescimento-brasil-2025': {
      title: "PIB brasileiro cresce 1,4% no primeiro trimestre de 2025",
      summary: "O FMI divulgou que o PIB do Brasil cresceu 1,4% no primeiro trimestre de 2025, impulsionado pela agropecuária (12,2%) e consumo das famílias (1%). Porém, as projeções para o ano completo são mais pessimistas: 2% segundo o FMI, contra 2,4% esperado pelo governo.",
      impact: "Crescimento moderado significa que o mercado de trabalho pode desacelerar e os salários podem subir menos. É hora de fortalecer sua reserva de emergência e investir em qualificação profissional. Evite grandes dívidas e mantenha gastos sob controle.",
      date: "10 de junho de 2025",
      category: "Economia",
      categoryColor: 'bg-orange-100 text-orange-700',
      priority: "medium",
      readTime: "5 min",
      author: "Equipe InvestSavy",
      fullContent: {
        context: "O Fundo Monetário Internacional (FMI) divulgou dados que mostram crescimento de 1,4% do PIB brasileiro no primeiro trimestre de 2025, resultado que ficou dentro das expectativas mas revela desafios para o restante do ano.",
        details: [
          {
            subtitle: "Setores que puxaram o crescimento",
            content: "A agropecuária foi o grande destaque com crescimento de 12,2%, beneficiada por condições climáticas favoráveis e alta nos preços das commodities. O consumo das famílias cresceu 1%, sustentado pelo mercado de trabalho aquecido."
          },
          {
            subtitle: "Desafios para o restante do ano",
            content: "Apesar do resultado positivo, o FMI revisou para baixo as projeções para 2025, estimando crescimento de apenas 2% contra os 2,4% esperados pelo governo brasileiro."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Agronegócio continua forte, beneficiando exportações",
            "Mercado de trabalho ainda aquecido",
            "Consumo das famílias resistente"
          ],
          negativeImpacts: [
            "Crescimento abaixo do potencial do país",
            "Possível desaceleração do mercado de trabalho",
            "Pressão sobre as contas públicas"
          ],
          recommendations: [
            "Fortaleça sua reserva de emergência",
            "Invista em qualificação profissional",
            "Evite grandes dívidas",
            "Mantenha gastos sob controle"
          ]
        },
        futureOutlook: "O crescimento moderado exige cautela dos investidores e trabalhadores. É importante manter reservas e investir em qualificação."
      }
    },
    'tensoes-geopoliticas-mercados-2025': {
      title: "Conflito Israel-Irã eleva preço do petróleo e afeta mercados",
      summary: "A escalada do conflito entre Israel e Irã em junho de 2025 causou alta significativa nos preços do petróleo. O JPMorgan projeta que o barril pode atingir US$ 120 ou até US$ 150 se a situação se intensificar, impactando a economia global através da inflação.",
      impact: "Combustíveis podem ficar mais caros no Brasil, afetando transporte e produtos em geral. Se você usa muito o carro, considere alternativas como transporte público. Para investimentos, evite exposição excessiva a setores sensíveis ao petróleo e diversifique sua carteira.",
      date: "12 de junho de 2025",
      category: "Geopolítica",
      categoryColor: 'bg-red-100 text-red-700',
      priority: "high",
      readTime: "6 min",
      author: "Equipe InvestSavy",
      fullContent: {
        context: "As tensões geopolíticas no Oriente Médio se intensificaram em junho de 2025, com impactos diretos nos mercados globais de energia e commodities.",
        details: [
          {
            subtitle: "Impacto nos preços do petróleo",
            content: "O barril de petróleo subiu mais de 15% em uma semana, com analistas do JPMorgan projetando possível alta para US$ 120-150 se o conflito se intensificar."
          },
          {
            subtitle: "Efeitos na economia global",
            content: "O aumento dos preços de energia pode acelerar a inflação mundial, forçando bancos centrais a manter juros altos por mais tempo."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Petrobras pode se beneficiar da alta do petróleo",
            "Brasil como produtor de energia pode ganhar competitividade"
          ],
          negativeImpacts: [
            "Combustíveis mais caros no Brasil",
            "Pressão inflacionária adicional",
            "Volatilidade nos mercados financeiros"
          ],
          recommendations: [
            "Diversifique investimentos",
            "Considere transporte público",
            "Evite setores sensíveis ao petróleo",
            "Mantenha reservas em moeda forte"
          ]
        },
        futureOutlook: "A situação geopolítica permanece volátil, exigindo acompanhamento constante dos investidores."
      }
    },
    'real-depreciacao-2024-2025': {
      title: "Wall Street reavalia projeções para S&P 500 em meio a tensões",
      summary: "As tensões geopolíticas no Oriente Médio causaram queda no S&P 500 e cautela nos mercados globais. Wall Street está reavaliando as projeções para 2025 devido a incertezas geopolíticas e possíveis mudanças nas políticas comerciais americanas.",
      impact: "Mercados internacionais mais voláteis podem afetar seus investimentos em fundos globais ou ações americanas. Mantenha a calma e não tome decisões impulsivas. Se investe no exterior, considere diversificar mais em ativos brasileiros para reduzir riscos.",
      date: "14 de junho de 2025",
      category: "Investimentos",
      categoryColor: 'bg-indigo-100 text-indigo-700',
      priority: "medium",
      readTime: "5 min",
      author: "Equipe InvestSavy",
      fullContent: {
        context: "Os mercados americanos enfrentam período de incerteza com reavaliação das projeções para 2025 em meio a tensões geopolíticas crescentes.",
        details: [
          {
            subtitle: "Impacto no S&P 500",
            content: "O índice S&P 500 registrou quedas significativas, com investidores buscando ativos mais seguros em meio às incertezas."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Oportunidades de compra em ativos descontados",
            "Fortalecimento de ativos brasileiros"
          ],
          negativeImpacts: [
            "Volatilidade em investimentos internacionais",
            "Incerteza sobre retornos futuros"
          ],
          recommendations: [
            "Mantenha a calma",
            "Diversifique geograficamente",
            "Considere ativos brasileiros",
            "Evite decisões impulsivas"
          ]
        },
        futureOutlook: "A volatilidade deve persistir enquanto as tensões geopolíticas não se resolverem."
      }
    },
    'ia-tokens-cripto-2025': {
      title: "Inteligência Artificial pode impactar 31 milhões de empregos no Brasil",
      summary: "Estudo revela que a IA generativa pode afetar 31,3 milhões de empregos no Brasil, atingindo 13 áreas profissionais. Porém, a tendência é de reestruturação de tarefas, não extinção de funções. 72% das empresas já adotaram IA em 2024, e 54% dos brasileiros já usaram IA generativa.",
      impact: "Invista em qualificação e aprendizado contínuo. Profissões que exigem criatividade, relacionamento humano e pensamento crítico são menos vulneráveis. Considere cursos de tecnologia e desenvolva habilidades que complementem a IA, não que competem com ela.",
      date: "16 de junho de 2025",
      category: "Tecnologia",
      categoryColor: 'bg-cyan-100 text-cyan-700',
      priority: "medium",
      readTime: "4 min",
      author: "Equipe InvestSavy",
      fullContent: {
        context: "Estudo abrangente revela o impacto da inteligência artificial no mercado de trabalho brasileiro, mostrando tanto desafios quanto oportunidades.",
        details: [
          {
            subtitle: "Áreas mais afetadas",
            content: "13 áreas profissionais podem ser impactadas, incluindo atendimento ao cliente, análise de dados e produção de conteúdo."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Automatização de tarefas repetitivas",
            "Criação de novas oportunidades",
            "Aumento da produtividade"
          ],
          negativeImpacts: [
            "Necessidade de requalificação",
            "Possível desemprego temporário",
            "Mudanças nas estruturas de trabalho"
          ],
          recommendations: [
            "Invista em qualificação contínua",
            "Desenvolva habilidades humanas",
            "Aprenda a usar IA como ferramenta",
            "Foque em criatividade e relacionamento"
          ]
        },
        futureOutlook: "A adaptação será fundamental para profissionais em todas as áreas."
      }
    },
    'deficit-fiscal-brasil-2024': {
      title: "Governo lança pacote fiscal que pode gerar R$ 40 bilhões anuais",
      summary: "O governo publicou medidas tributárias incluindo aumento da taxação de Juros sobre Capital Próprio de 15% para 20%, regulamentação de apostas online (R$ 20 bi em impostos) e limitação de compensações tributárias. A reforma tributária continua em votação no Congresso.",
      impact: "Se você recebe JCP de ações, seus rendimentos serão mais tributados. Apostas online ficarão mais caras com maior carga tributária. Para investidores, analise como essas mudanças afetam a rentabilidade líquida de seus investimentos em ações que pagam JCP.",
      date: "8 de junho de 2025",
      category: "Fiscal",
      categoryColor: 'bg-yellow-100 text-yellow-700',
      priority: "medium",
      readTime: "5 min",
      author: "Equipe InvestSavy",
      fullContent: {
        context: "O governo federal lançou um amplo pacote de medidas fiscais visando aumentar a arrecadação e equilibrar as contas públicas.",
        details: [
          {
            subtitle: "Principais medidas",
            content: "Aumento da tributação sobre JCP, regulamentação de apostas online e limitação de compensações tributárias são os pilares do pacote."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Melhoria das contas públicas",
            "Maior controle sobre apostas",
            "Arrecadação adicional para investimentos"
          ],
          negativeImpacts: [
            "Menor rentabilidade líquida de JCP",
            "Apostas online mais caras",
            "Pressão sobre investidores"
          ],
          recommendations: [
            "Reavalie investimentos em ações com JCP",
            "Considere outros tipos de dividendos",
            "Analise impacto na rentabilidade",
            "Diversifique estratégias de investimento"
          ]
        },
        futureOutlook: "As mudanças fiscais devem impactar estratégias de investimento no médio prazo."
      }
    },
    'commodities-guerra-comercial-2025': {
      title: "Ouro pode atingir US$ 3.000 com tensões geopolíticas",
      summary: "As tensões geopolíticas, especialmente no Oriente Médio, e a antecipação de cortes nas taxas de juros dos EUA devem manter os preços do ouro elevados. Analistas projetam que o metal pode atingir US$ 3.000 a onça, sendo considerado 'porto seguro' em momentos de instabilidade.",
      impact: "Para brasileiros, a alta do ouro pode favorecer ações de mineradoras como Vale. Se busca proteção contra instabilidade, considere pequena alocação em ouro via fundos ou ETFs. Porém, lembre-se que ouro não paga dividendos e pode ser volátil no curto prazo.",
      date: "11 de junho de 2025",
      category: "Commodities",
      categoryColor: 'bg-amber-100 text-amber-700',
      priority: "medium",
      readTime: "4 min",
      author: "Equipe InvestSavy",
      fullContent: {
        context: "O ouro continua sendo visto como ativo de proteção em períodos de incerteza, com projeções otimistas para os próximos meses.",
        details: [
          {
            subtitle: "Fatores de alta",
            content: "Tensões geopolíticas e expectativa de cortes de juros nos EUA impulsionam a demanda pelo metal precioso."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Proteção contra instabilidade",
            "Benefício para mineradoras brasileiras",
            "Diversificação de portfólio"
          ],
          negativeImpacts: [
            "Não paga dividendos",
            "Volatilidade no curto prazo",
            "Custos de armazenamento"
          ],
          recommendations: [
            "Considere pequena alocação",
            "Use fundos ou ETFs",
            "Avalie ações de mineradoras",
            "Mantenha como proteção, não especulação"
          ]
        },
        futureOutlook: "O ouro deve manter relevância como ativo de proteção enquanto persistirem as incertezas globais."
      }
    },
    'tokenizacao-ativos-reais-2025': {
      title: "Brasil investe R$ 1,76 bilhão em infraestrutura digital até 2028",
      summary: "O governo lançou a Infraestrutura Nacional de Dados (IND) e o Plano Brasileiro de Inteligência Artificial, prevendo investimento de R$ 1,76 bilhão até 2028. O foco é melhorar serviços públicos digitais, expandir conectividade e estimular P&D em IoT, IA e computação em nuvem.",
      impact: "Melhores serviços públicos digitais podem facilitar sua vida, desde declaração de IR até acesso a benefícios. Para profissionais de tecnologia, surgem novas oportunidades de trabalho. Considere se qualificar em áreas como dados, IA e desenvolvimento de sistemas governamentais.",
      date: "13 de junho de 2025",
      category: "Inovação",
      categoryColor: 'bg-teal-100 text-teal-700',
      priority: "medium",
      readTime: "5 min",
      author: "Equipe InvestSavy",
      fullContent: {
        context: "O governo brasileiro anuncia investimentos significativos em infraestrutura digital, visando modernizar serviços públicos e estimular inovação.",
        details: [
          {
            subtitle: "Áreas de investimento",
            content: "Os recursos serão direcionados para IoT, IA, computação em nuvem e melhoria de serviços públicos digitais."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Melhoria dos serviços públicos",
            "Oportunidades para profissionais de TI",
            "Modernização da infraestrutura"
          ],
          negativeImpacts: [
            "Necessidade de qualificação",
            "Possível exclusão digital",
            "Custos de implementação"
          ],
          recommendations: [
            "Qualifique-se em tecnologia",
            "Acompanhe oportunidades no setor público",
            "Invista em educação digital",
            "Considere carreiras em dados e IA"
          ]
        },
        futureOutlook: "A digitalização do governo deve criar novas oportunidades profissionais e melhorar a eficiência dos serviços públicos."
      }
    },
    'etfs-bitcoin-investimentos-2025': {
      title: "Economia global desacelera com tensões e volatilidade do petróleo",
      summary: "Projeções de crescimento global para 2025 foram revisadas para baixo devido a tensões comerciais e geopolíticas. A volatilidade do dólar e do petróleo torna a política monetária mais difícil de prever, com bancos centrais como Fed e BCE mantendo cautela sobre cortes de juros.",
      impact: "Economia global mais fraca pode afetar exportações brasileiras e crescimento do país. Para seus investimentos, isso significa mais volatilidade e necessidade de diversificação. Evite apostas muito arriscadas e mantenha parte do dinheiro em investimentos mais seguros.",
      date: "17 de junho de 2025",
      category: "Economia Global",
      categoryColor: 'bg-slate-100 text-slate-700',
      priority: "medium",
      readTime: "5 min",
      author: "Equipe InvestSavy",
      fullContent: {
        context: "A economia global enfrenta desafios crescentes com revisões para baixo nas projeções de crescimento para 2025.",
        details: [
          {
            subtitle: "Fatores de desaceleração",
            content: "Tensões comerciais, volatilidade do petróleo e incertezas geopolíticas contribuem para o cenário mais cauteloso."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Possíveis cortes de juros futuros",
            "Oportunidades em ativos descontados"
          ],
          negativeImpacts: [
            "Menor crescimento global",
            "Impacto nas exportações brasileiras",
            "Maior volatilidade nos mercados"
          ],
          recommendations: [
            "Diversifique investimentos",
            "Evite apostas muito arriscadas",
            "Mantenha reservas em ativos seguros",
            "Acompanhe indicadores globais"
          ]
        },
        futureOutlook: "A cautela deve prevalecer enquanto as incertezas globais não se resolverem."
      }
    }
  };

  const news = newsDatabase[slug as keyof typeof newsDatabase];

  if (!news) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Notícia não encontrada</h1>
            <p className="text-gray-600 mb-8">A notícia que você está procurando não existe ou foi removida.</p>
            <Link 
              to="/atualidades" 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar para Atualidades
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    description: news.summary,
    author: {
      '@type': 'Organization',
      name: news.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'InvestSavy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.investsavy.online/logo.png'
      }
    },
    datePublished: news.date,
    dateModified: news.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.investsavy.online/atualidades/${slug}`
    },
    articleSection: news.category,
    inLanguage: 'pt-BR'
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') return <AlertCircle className="w-5 h-5 text-red-500" />;
    return <Target className="w-5 h-5 text-gray-500" />;
  };

  return (
    <Layout>
      <SEOHead
        title={`${news.title} | InvestSavy`}
        description={news.summary}
        keywords={`${news.category.toLowerCase()}, mercado financeiro, investimentos, economia brasil`}
        url={`https://www.investsavy.online/atualidades/${slug}`}
        type="article"
        section="Atualidades"
        canonical={`https://www.investsavy.online/atualidades/${slug}`}
        jsonLd={jsonLd}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
        {/* Header */}
        <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/atualidades" 
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-8 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Voltar para Atualidades
            </Link>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${news.categoryColor}`}>
                  {news.category}
                </span>
                {getPriorityIcon(news.priority)}
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {news.date}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  {news.readTime}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {news.title}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {news.summary}
              </p>

              <div className="flex items-center text-gray-500 text-sm">
                <span>Por {news.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Impact Summary */}
            <Card className="bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-900">
                    Como isso afeta seu bolso?
                  </h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 text-lg leading-relaxed font-medium">
                  {news.impact}
                </p>
              </CardContent>
            </Card>

            {/* Context */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Contexto da Notícia
                  </h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {news.fullContent.context}
                </p>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-green-600" />
                Análise Detalhada
              </h2>
              
              {news.fullContent.details.map((detail, index) => (
                <Card key={index} className="shadow-lg">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-gray-900">
                      {detail.subtitle}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {detail.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Impact Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Positive Impacts */}
              <Card className="shadow-lg border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-bold text-green-900">
                      Impactos Positivos
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {news.fullContent.analysis.positiveImpacts.map((impact, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{impact}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Negative Impacts */}
              <Card className="shadow-lg border-red-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-bold text-red-900">
                      Impactos Negativos
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {news.fullContent.analysis.negativeImpacts.map((impact, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{impact}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-900">
                    Nossas Recomendações
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {news.fullContent.analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-yellow-800 font-medium">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Future Outlook */}
            <Card className="shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900">
                    Perspectivas Futuras
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800 text-lg leading-relaxed">
                  {news.fullContent.futureOutlook}
                </p>
              </CardContent>
            </Card>

            {/* Back to News */}
            <div className="text-center pt-8">
              <Link 
                to="/atualidades" 
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-3" />
                Ver Mais Notícias
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AtualidadeIndividual;