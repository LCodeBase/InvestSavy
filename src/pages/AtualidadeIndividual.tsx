import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { ArrowLeft, Clock, Calendar, TrendingUp, TrendingDown, DollarSign, AlertCircle, AlertTriangle, Target, BarChart3, Lightbulb, CheckCircle, XCircle, Info, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { seoConfig } from '../config/seo';

const AtualidadeIndividual = () => {
  const { slug } = useParams<{ slug: string }>();

  // Base de dados das notícias (em um projeto real, isso viria de uma API)
  const newsDatabase = {
    'politica-monetaria-galipolo-2025': {
      title: "Galípolo indica que Selic deve permanecer em 15% por mais tempo",
      summary: "O presidente do Banco Central, Gabriel Galípolo, sinalizou que a taxa Selic, atualmente em 15%, deve permanecer estável devido ao processo de desaceleração da inflação. A decisão busca equilibrar o controle inflacionário com o crescimento econômico.",
      impact: "Com a Selic alta por mais tempo, seus investimentos em renda fixa (CDB, Tesouro Direto) continuam rendendo bem. Porém, financiamentos e cartão de crédito ficam mais caros. É hora de quitar dívidas e aproveitar a renda fixa.",
      date: "27 de junho de 2025",
      category: "Política Monetária",
      categoryColor: 'bg-blue-100 text-blue-700',
      priority: "high",
      readTime: "6 min",
      author: "Redação InvestSavy",
      fullContent: {
        context: "Em entrevista coletiva, o presidente do Banco Central, Gabriel Galípolo, indicou que a taxa Selic deve permanecer em 15% por um período mais longo do que inicialmente previsto. A decisão reflete a estratégia do BC de garantir que a inflação converja de forma sustentável para a meta de 3%, mesmo que isso signifique manter os juros elevados por mais tempo.",
        details: [
          {
            subtitle: "Estratégia de manutenção da Selic",
            content: "Galípolo enfatizou que a desaceleração da inflação precisa ser consistente e duradoura antes de qualquer movimento de redução dos juros. O BC monitora de perto as expectativas de inflação, que ainda estão acima da meta de 3% para 2025."
          },
          {
            subtitle: "Fatores que influenciam a decisão",
            content: "A autoridade monetária quer evitar cortes prematuros que possam comprometer o controle inflacionário. O cenário internacional, com incertezas geopolíticas e volatilidade nos mercados, também influencia a decisão de manter a cautela."
          },
          {
            subtitle: "Impacto no mercado financeiro",
            content: "A sinalização de que os juros permanecerão altos por mais tempo fortalece a renda fixa brasileira e pode atrair capital estrangeiro, mas também pressiona setores sensíveis aos juros como o imobiliário e de consumo."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Renda fixa continua oferecendo rentabilidade atrativa por mais tempo",
            "CDBs de bancos médios podem render mais de 16% ao ano",
            "Tesouro Direto Selic oferece segurança com boa rentabilidade",
            "Controle inflacionário preserva poder de compra no longo prazo"
          ],
          negativeImpacts: [
            "Financiamentos continuam caros, dificultando compra de imóveis e veículos",
            "Cartão de crédito mantém juros elevadíssimos, podendo superar 400% ao ano",
            "Empresas enfrentam dificuldades para investir devido ao alto custo do capital",
            "Consumo pode permanecer fraco, afetando o crescimento econômico"
          ],
          recommendations: [
            "Mantenha foco na quitação de dívidas caras como cartão e cheque especial",
            "Aproveite os juros altos para investir em renda fixa de qualidade",
            "Considere CDBs com liquidez diária que rendem mais que a poupança",
            "Evite novos financiamentos, especialmente para consumo",
            "Monte uma reserva de emergência robusta em Tesouro Selic"
          ]
        },
        futureOutlook: "A sinalização de Galípolo indica que os juros altos devem persistir até pelo menos o final de 2025. Isso é positivo para quem investe em renda fixa, mas desafiador para quem tem dívidas. O BC só deve considerar cortes quando houver sinais claros de que a inflação está sob controle de forma duradoura."
      }
    },
    'bitcoin-estavel-stablecoins-criminosos': {
      title: "Bitcoin opera quase estável enquanto stablecoins preocupam autoridades",
      summary: "O Bitcoin teve leve alta semanal de aproximadamente 1%, mantendo relativa estabilidade. Porém, o GAFI (Grupo de Ação Financeira Internacional) alertou sobre o crescente uso de stablecoins por organizações criminosas para lavagem de dinheiro.",
      impact: "Se você investe em Bitcoin, a estabilidade é positiva para planejamento. Porém, fique atento às regulamentações sobre stablecoins que podem afetar todo o mercado cripto. Diversifique seus investimentos e evite concentrar tudo em criptomoedas.",
      date: "26 de junho de 2025",
      category: "Criptomoedas",
      categoryColor: 'bg-orange-100 text-orange-700',
      priority: "medium",
      readTime: "5 min",
      author: "Redação InvestSavy",
      fullContent: {
        context: "O mercado de criptomoedas apresentou relativa estabilidade na semana, com o Bitcoin registrando leve alta de 1%. Paralelamente, o GAFI divulgou relatório alertando sobre o aumento significativo do uso de stablecoins por organizações criminosas, levantando preocupações sobre a necessidade de maior regulamentação no setor.",
        details: [
          {
            subtitle: "Estabilidade do Bitcoin",
            content: "O Bitcoin manteve-se próximo aos US$ 65.000, com volatilidade reduzida em comparação às semanas anteriores. A estabilidade reflete maior maturidade do mercado e crescente adoção institucional, mas também pode indicar consolidação antes de movimentos mais significativos."
          },
          {
            subtitle: "Alerta sobre stablecoins",
            content: "O GAFI identificou aumento de 60% no uso de stablecoins para atividades ilícitas em 2025. Essas moedas digitais, que mantêm valor atrelado ao dólar, são preferidas por criminosos devido à facilidade de transferência e menor rastreabilidade em algumas redes."
          },
          {
            subtitle: "Impacto regulatório",
            content: "O relatório do GAFI pode acelerar regulamentações mais rígidas para stablecoins globalmente. Países como Estados Unidos e União Europeia já estudam regras específicas para esses ativos, o que pode afetar sua disponibilidade e uso."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Estabilidade do Bitcoin oferece maior previsibilidade para investidores",
            "Menor volatilidade pode atrair investidores mais conservadores",
            "Regulamentação adequada pode trazer mais segurança ao mercado",
            "Combate ao uso criminoso fortalece a legitimidade das criptomoedas"
          ],
          negativeImpacts: [
            "Regulamentações rígidas podem limitar o acesso a stablecoins",
            "Possível redução da liquidez em alguns mercados",
            "Maior burocracia para uso de criptomoedas",
            "Risco de proibição de certas stablecoins em alguns países"
          ],
          recommendations: [
            "Diversifique entre diferentes criptomoedas, não concentre apenas em Bitcoin",
            "Use apenas exchanges regulamentadas e confiáveis",
            "Mantenha registros detalhados de todas as transações",
            "Evite stablecoins de origem duvidosa ou não regulamentadas",
            "Considere também investimentos tradicionais para equilibrar o portfólio"
          ]
        },
        futureOutlook: "A tendência é de maior regulamentação do mercado de stablecoins, o que pode trazer mais segurança mas também limitar algumas funcionalidades. O Bitcoin deve continuar se beneficiando de sua posição como 'ouro digital', especialmente se regulamentações forem favoráveis às criptomoedas estabelecidas."
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
    'mercado-focus-inflacao-pib': {
      title: "Mercado reduz projeção de inflação e eleva PIB para 2025",
      summary: "O Boletim Focus desta semana trouxe revisões importantes: inflação estimada em 5,24% e PIB em 2,21% para 2025. O dólar deve fechar o ano em R$ 5,72, segundo analistas do mercado financeiro.",
      impact: "Inflação mais baixa é boa notícia para seu dinheiro render mais. PIB maior significa economia crescendo e mais oportunidades de emprego. Para investimentos, ações brasileiras podem se beneficiar do crescimento.",
      date: "26 de junho de 2025",
      category: "Economia",
      categoryColor: 'bg-green-100 text-green-700',
      priority: "high",
      readTime: "5 min",
      author: "Redação InvestSavy",
      fullContent: {
        context: "O Boletim Focus desta semana apresentou revisões significativas nas projeções econômicas para 2025. Os analistas do mercado financeiro reduziram a estimativa de inflação (IPCA) de 5,31% para 5,24% e elevaram a projeção de crescimento do PIB de 2,15% para 2,21%. A estimativa para o dólar no final do ano permaneceu em R$ 5,72.",
        details: [
          {
            subtitle: "Inflação em trajetória de melhora",
            content: "A redução na projeção de inflação reflete a eficácia das medidas do Banco Central e a desaceleração de alguns preços importantes. Combustíveis e alimentos têm mostrado estabilidade, enquanto serviços ainda pressionam o índice. A meta do BC é de 3% com tolerância até 4,5%."
          },
          {
            subtitle: "PIB com perspectivas otimistas",
            content: "O aumento na projeção do PIB para 2,21% indica confiança na recuperação econômica. Setores como serviços, construção civil e agronegócio têm mostrado sinais positivos. O consumo das famílias e os investimentos empresariais são os principais motores do crescimento."
          },
          {
            subtitle: "Dólar estável em cenário desafiador",
            content: "A manutenção da projeção do dólar em R$ 5,72 sugere expectativa de estabilidade cambial. Isso depende da continuidade das políticas econômicas atuais e do cenário internacional, especialmente as decisões do Federal Reserve americano."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Inflação menor preserva poder de compra das famílias",
            "PIB maior indica mais empregos e oportunidades",
            "Ambiente favorável para investimentos em ações brasileiras",
            "Possibilidade de cortes futuros na taxa Selic"
          ],
          negativeImpacts: [
            "Inflação ainda acima da meta do Banco Central",
            "Crescimento do PIB pode pressionar preços",
            "Incertezas sobre sustentabilidade do crescimento",
            "Dependência de fatores externos para manter projeções"
          ],
          recommendations: [
            "Considere aumentar exposição a ações de empresas brasileiras",
            "Avalie fundos de ações focados no mercado doméstico",
            "Mantenha parte da carteira em renda fixa para proteção",
            "Acompanhe setores beneficiados pelo crescimento (varejo, bancos)",
            "Diversifique entre diferentes classes de ativos"
          ]
        },
        futureOutlook: "As projeções do Focus indicam um cenário moderadamente otimista para a economia brasileira. O desafio será manter o crescimento sem pressionar demais a inflação. O Banco Central deve continuar vigilante, e cortes na Selic só devem ocorrer se a inflação convergir consistentemente para a meta."
      }
    },
    'bc-eleva-previsao-pib-2025': {
      title: "Banco Central eleva previsão de crescimento do PIB para 2,1%",
      summary: "O Relatório de Política Monetária do Banco Central ajustou a estimativa de crescimento econômico para 2025, elevando de 1,9% para 2,1%. A revisão reflete sinais positivos da economia brasileira.",
      impact: "PIB maior significa economia mais forte e mais oportunidades de trabalho. Para seus investimentos, isso é positivo para ações de empresas brasileiras. Bancos e varejo podem se beneficiar especialmente.",
      date: "24 de junho de 2025",
      category: "Economia",
      categoryColor: 'bg-green-100 text-green-700',
      priority: "medium",
      readTime: "4 min",
      author: "Redação InvestSavy",
      fullContent: {
        context: "O Banco Central do Brasil divulgou seu Relatório de Política Monetária (RPM) com revisão para cima na projeção de crescimento do PIB em 2025. A estimativa passou de 1,9% para 2,1%, refletindo dados econômicos mais positivos que o esperado e maior confiança na recuperação da economia brasileira.",
        details: [
          {
            subtitle: "Fatores que motivaram a revisão",
            content: "A elevação da projeção se baseia em dados recentes que mostram maior dinamismo do consumo das famílias, recuperação do mercado de trabalho e aumento dos investimentos empresariais. O setor de serviços tem mostrado especial vigor, contribuindo para o otimismo."
          },
          {
            subtitle: "Setores em destaque",
            content: "Serviços, construção civil e agronegócio são os setores que mais contribuem para a revisão positiva. O consumo das famílias, impulsionado pela melhora do emprego e renda, é um dos principais motores do crescimento esperado."
          },
          {
            subtitle: "Comparação com outros países",
            content: "A projeção de 2,1% coloca o Brasil em linha com outras economias emergentes da região. Argentina projeta 1,8%, México 2,3% e Chile 2,0%. O crescimento brasileiro está dentro da média regional, mas acima das expectativas iniciais."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Maior geração de empregos e oportunidades",
            "Aumento da renda e consumo das famílias",
            "Ambiente favorável para investimentos em ações",
            "Maior arrecadação de impostos para investimentos públicos"
          ],
          negativeImpacts: [
            "Possível pressão inflacionária com aquecimento da economia",
            "Risco de Banco Central manter juros altos por mais tempo",
            "Aumento da demanda pode pressionar preços",
            "Dependência de fatores externos para sustentar crescimento"
          ],
          recommendations: [
            "Considere aumentar exposição a ações de empresas brasileiras",
            "Avalie setores beneficiados: bancos, varejo, construção",
            "Mantenha diversificação entre renda fixa e variável",
            "Acompanhe indicadores de inflação para ajustar estratégia",
            "Considere fundos de ações focados no mercado doméstico"
          ]
        },
        futureOutlook: "A revisão para cima é um sinal positivo, mas o BC mantém cautela. O crescimento sustentável depende do controle da inflação e da continuidade das reformas estruturais. A política monetária seguirá vigilante para equilibrar crescimento e estabilidade de preços."
      }
    },
    'intervencao-cambial-corte-iof': {
      title: "Intervenção cambial e corte de IOF marcam a semana",
      summary: "Banco Central vendeu US$ 1 bilhão e usou swaps cambiais para conter a alta do dólar, enquanto o Congresso derrubou decreto do governo sobre IOF. As medidas visam estabilizar o câmbio e reduzir custos para empresas.",
      impact: "Dólar mais estável é bom para controlar a inflação e seus investimentos. Corte do IOF reduz custos para empresas que fazem negócios no exterior. Para você, pode significar produtos importados mais baratos.",
      date: "23 de junho de 2025",
      category: "Política Monetária",
      categoryColor: 'bg-blue-100 text-blue-700',
      priority: "high",
      readTime: "5 min",
      author: "Redação InvestSavy",
      fullContent: {
        context: "O Banco Central intensificou suas intervenções no mercado cambial vendendo US$ 1 bilhão à vista e realizando leilões de swaps cambiais para conter a pressão sobre o dólar. Paralelamente, o Congresso Nacional derrubou decreto do governo que aumentava o IOF (Imposto sobre Operações Financeiras) para determinadas operações.",
        details: [
          {
            subtitle: "Estratégia do Banco Central",
            content: "O BC vendeu US$ 1 bilhão no mercado à vista e ofereceu mais US$ 2 bilhões em swaps cambiais. A estratégia visa sinalizar ao mercado que a autoridade monetária está disposta a intervir para evitar volatilidade excessiva do câmbio, especialmente em momentos de stress."
          },
          {
            subtitle: "Derrubada do decreto do IOF",
            content: "O Congresso rejeitou decreto que aumentava o IOF sobre operações de câmbio de 0,38% para 1,1%. A medida era vista como prejudicial à competitividade das empresas brasileiras no comércio exterior e foi amplamente criticada pelo setor produtivo."
          },
          {
            subtitle: "Impacto no mercado",
            content: "As intervenções ajudaram a estabilizar o dólar em torno de R$ 5,45, evitando que a moeda americana ultrapassasse R$ 5,50. A derrubada do IOF foi bem recebida por exportadores e importadores, que viam a medida como um custo adicional desnecessário."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Maior estabilidade cambial reduz incertezas",
            "Corte do IOF diminui custos para empresas",
            "Controle da inflação via câmbio mais estável",
            "Melhora do ambiente de negócios para comércio exterior"
          ],
          negativeImpacts: [
            "Uso de reservas internacionais para intervenção",
            "Possível pressão sobre contas públicas sem o IOF",
            "Dependência de intervenções para estabilizar câmbio",
            "Incerteza sobre sustentabilidade das medidas"
          ],
          recommendations: [
            "Aproveite câmbio mais estável para planejar investimentos",
            "Considere empresas exportadoras beneficiadas pelo corte do IOF",
            "Monitore reservas internacionais do país",
            "Avalie impacto em setores dependentes de importação",
            "Mantenha diversificação cambial na carteira"
          ]
        },
        futureOutlook: "As intervenções mostram o compromisso do BC com a estabilidade cambial, mas o uso frequente pode pressionar as reservas. O corte do IOF é positivo para a competitividade, mas o governo precisará encontrar outras fontes de receita para compensar a perda arrecadatória."
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
    'selic-pico-cortes-adiados': {
      title: "Selic no pico: início de cortes adiado para 2026",
      summary: "Analistas da Empiricus afirmam que a taxa Selic chegou ao seu teto atual de 15%, mas os cortes só devem começar no primeiro trimestre de 2026. A inflação persistente e o cenário global mantêm o Banco Central cauteloso.",
      impact: "Juros altos por mais tempo significa que renda fixa continua atrativa. Se você tem dívidas, tente quitá-las. Para investimentos, CDBs e Tesouro Direto ainda oferecem bons retornos, mas ações podem ficar pressionadas.",
      date: "22 de junho de 2025",
      category: "Política Monetária",
      categoryColor: 'bg-red-100 text-red-700',
      priority: "high",
      readTime: "6 min",
      author: "Redação InvestSavy",
      fullContent: {
        context: "Analistas da Empiricus Research divulgaram relatório indicando que a taxa Selic atingiu seu pico no ciclo atual em 15%, mas os cortes só devem começar no primeiro trimestre de 2026. A avaliação considera a persistência da inflação acima da meta e o cenário internacional desafiador.",
        details: [
          {
            subtitle: "Razões para manter juros altos",
            content: "A inflação ainda está em 5,2%, bem acima da meta de 3%. Serviços continuam pressionando os preços, e o mercado de trabalho aquecido sustenta a demanda. Além disso, incertezas sobre política fiscal e cenário externo recomendam cautela do Banco Central."
          },
          {
            subtitle: "Comparação internacional",
            content: "Enquanto alguns bancos centrais já iniciaram cortes, o Brasil mantém postura mais conservadora. O Federal Reserve americano sinaliza possíveis cortes, mas ainda há incertezas. A diferença de juros entre Brasil e exterior permanece elevada."
          },
          {
            subtitle: "Impacto nos investimentos",
            content: "Juros altos por mais tempo favorecem renda fixa, com CDBs e Tesouro oferecendo retornos atrativos. Ações de empresas endividadas podem sofrer pressão, enquanto bancos se beneficiam das margens elevadas de spread."
          }
        ],
        analysis: {
          positiveImpacts: [
            "Renda fixa continua oferecendo retornos atrativos",
            "Controle mais efetivo da inflação no médio prazo",
            "Bancos se beneficiam de margens elevadas",
            "Maior estabilidade macroeconômica"
          ],
          negativeImpacts: [
            "Pressão sobre empresas endividadas",
            "Menor atratividade de ações no curto prazo",
            "Custo de crédito elevado para consumidores",
            "Possível desaceleração do crescimento econômico"
          ],
          recommendations: [
            "Mantenha boa exposição à renda fixa de qualidade",
            "Evite empresas com alta alavancagem financeira",
            "Considere bancos que se beneficiam de juros altos",
            "Quite dívidas caras enquanto juros estão altos",
            "Para ações, foque em empresas com baixo endividamento"
          ]
        },
        futureOutlook: "A manutenção de juros altos por mais tempo é uma estratégia prudente do Banco Central para garantir convergência da inflação à meta. Quando os cortes começarem em 2026, devem ser graduais e dependentes de dados econômicos consistentes."
       }
     },
     'wirex-appchain-tanssi-brasileiro': {
       title: "Wirex lança 'appchain' na Tanssi com brasileiro no comando",
       summary: "A plataforma de pagamentos Wirex lançou uma nova estrutura blockchain (appchain) na rede Tanssi para aumentar sua capacidade de processamento. O projeto tem um vice-presidente brasileiro liderando a iniciativa.",
       impact: "Inovações em blockchain podem revolucionar pagamentos digitais. Se você investe em criptomoedas ou fintechs, acompanhe essas tecnologias. Para o dia a dia, pode significar pagamentos mais rápidos e baratos no futuro.",
       date: "21 de junho de 2025",
       category: "Tecnologia",
       categoryColor: 'bg-purple-100 text-purple-700',
       priority: "medium",
       readTime: "4 min",
       author: "Redação InvestSavy",
       fullContent: {
         context: "A Wirex, uma das principais plataformas de pagamentos digitais do mundo, anunciou o lançamento de sua própria 'appchain' (blockchain de aplicação) na rede Tanssi. A iniciativa é liderada por um vice-presidente brasileiro e visa aumentar significativamente a capacidade de processamento da plataforma.",
         details: [
           {
             subtitle: "O que é uma appchain",
             content: "Uma appchain é uma blockchain dedicada a uma aplicação específica, oferecendo maior controle, personalização e escalabilidade. No caso da Wirex, permitirá processar milhões de transações por segundo com custos muito baixos, melhorando a experiência do usuário."
           },
           {
             subtitle: "Liderança brasileira",
             content: "O projeto é comandado por um vice-presidente brasileiro da Wirex, destacando o crescente papel do Brasil no cenário global de inovação em blockchain e fintechs. Isso reforça a posição do país como hub de tecnologia financeira na América Latina."
           },
           {
             subtitle: "Impacto na indústria",
             content: "A iniciativa representa um avanço significativo na infraestrutura de pagamentos digitais, podendo influenciar outras empresas a adotarem soluções similares. A escalabilidade melhorada pode acelerar a adoção de criptomoedas no dia a dia."
           }
         ],
         analysis: {
           positiveImpacts: [
             "Maior velocidade e menor custo em transações",
             "Avanço da tecnologia blockchain no Brasil",
             "Oportunidades para desenvolvedores brasileiros",
             "Melhoria na infraestrutura de pagamentos digitais"
           ],
           negativeImpacts: [
             "Complexidade técnica pode limitar adoção inicial",
             "Necessidade de regulamentação adequada",
             "Competição acirrada no setor de pagamentos",
             "Riscos tecnológicos inerentes a novas soluções"
           ],
           recommendations: [
             "Acompanhe desenvolvimentos em blockchain e fintechs",
             "Considere investimentos em empresas de tecnologia financeira",
             "Mantenha-se informado sobre regulamentações de criptomoedas",
             "Avalie oportunidades em startups brasileiras do setor",
             "Diversifique entre tecnologias tradicionais e emergentes"
           ]
         },
         futureOutlook: "O lançamento da appchain da Wirex pode ser um marco na evolução dos pagamentos digitais. Com liderança brasileira, o projeto pode abrir portas para mais inovações nacionais no setor blockchain e fortalecer a posição do Brasil no cenário global de fintechs."
       }
     },
     'fed-debate-cortes-noruega-age': {
       title: "Fed debate cortes de juros enquanto Banco Central da Noruega já age",
       summary: "Dirigentes do Federal Reserve americano pedem cortes nas taxas de juros, enquanto o Banco Central da Noruega surpreendeu ao reduzir sua taxa básica para 4,25%. As decisões refletem diferentes cenários econômicos globais.",
       impact: "Cortes de juros nos EUA podem fortalecer mercados emergentes como o Brasil. Dólar mais fraco é bom para nossas exportações e pode atrair investimento estrangeiro. Para seus investimentos, ações podem se beneficiar.",
       date: "20 de junho de 2025",
       category: "Economia Global",
       categoryColor: 'bg-blue-100 text-blue-700',
       priority: "high",
       readTime: "5 min",
       author: "Redação InvestSavy",
       fullContent: {
         context: "O cenário de política monetária global apresenta movimentos divergentes: enquanto dirigentes do Federal Reserve americano sinalizam possíveis cortes nas taxas de juros, o Banco Central da Noruega surpreendeu o mercado ao reduzir sua taxa básica de 4,5% para 4,25%, contrariando expectativas de manutenção.",
         details: [
           {
             subtitle: "Sinalizações do Federal Reserve",
             content: "Membros do Fed têm indicado que cortes podem ser necessários se a inflação continuar desacelerando e o mercado de trabalho mostrar sinais de enfraquecimento. A decisão final dependerá dos dados econômicos dos próximos meses, especialmente inflação e emprego."
           },
           {
             subtitle: "Surpresa norueguesa",
             content: "O Banco Central da Noruega cortou juros citando menor pressão inflacionária e preocupações com o crescimento econômico. A decisão foi unânime e marca o início de um ciclo de flexibilização monetária no país nórdico."
           },
           {
             subtitle: "Impactos globais",
             content: "Cortes de juros em economias desenvolvidas tendem a beneficiar mercados emergentes, incluindo o Brasil. Menor diferencial de juros pode reduzir a pressão sobre o real e atrair fluxos de capital para ativos brasileiros."
           }
         ],
         analysis: {
           positiveImpacts: [
             "Possível fortalecimento de moedas emergentes",
             "Maior fluxo de capital para mercados emergentes",
             "Ambiente mais favorável para ações brasileiras",
             "Redução da pressão sobre commodities"
           ],
           negativeImpacts: [
             "Incerteza sobre timing dos cortes americanos",
             "Possível volatilidade cambial no curto prazo",
             "Dependência de fatores externos para benefícios",
             "Risco de reversão rápida das políticas"
           ],
           recommendations: [
             "Considere aumentar exposição a ativos brasileiros",
             "Monitore comunicações do Federal Reserve",
             "Avalie oportunidades em ações de exportadoras",
             "Mantenha diversificação geográfica na carteira",
             "Acompanhe fluxos de capital estrangeiro"
           ]
         },
         futureOutlook: "As divergências nas políticas monetárias globais criam oportunidades e riscos. O Brasil pode se beneficiar de um ambiente externo mais favorável se os cortes americanos se materializarem, mas é importante manter cautela até que as tendências se confirmem."
       }
     }
   };

  if (!slug) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Notícia não encontrada</h1>
            <Link to="/atualidades" className="text-blue-600 hover:text-blue-800">
              Voltar para Atualidades
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const news = newsDatabase[slug as keyof typeof newsDatabase];

  if (!news) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Notícia não encontrada</h1>
            <Link to="/atualidades" className="text-blue-600 hover:text-blue-800">
              Voltar para Atualidades
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": news.title,
    "description": news.summary,
    "author": {
      "@type": "Organization",
      "name": news.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "InvestSavy",
      "logo": {
        "@type": "ImageObject",
        "url": `${seoConfig.siteUrl}/logo.png`
      }
    },
    "datePublished": news.date,
    "dateModified": news.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${seoConfig.siteUrl}/atualidades/${slug}`
    },
    "image": `${seoConfig.siteUrl}/news-default.jpg`,
    "articleSection": news.category,
    "keywords": `${news.category}, investimentos, economia, Brasil`
  };

  return (
    <Layout>
      <SEOHead 
        title={`${news.title} | InvestSavy`}
        description={news.summary}
        canonical={`${seoConfig.siteUrl}/atualidades/${slug}`}
        jsonLd={jsonLd}
      />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link 
              to="/atualidades" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Atualidades
            </Link>
          </div>

          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              {/* Category and Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${news.categoryColor}`}>
                  {news.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {news.date}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {news.readTime}
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <User className="h-4 w-4 mr-1" />
                  {news.author}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {news.title}
              </h1>

              {/* Summary */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {news.summary}
                </p>
              </div>

              {/* Impact Section */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                  O que isso significa para você?
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {news.impact}
                </p>
              </div>

              {/* Context */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contexto</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {news.fullContent.context}
                </p>
              </div>

              {/* Details */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detalhes</h2>
                <div className="space-y-6">
                  {news.fullContent.details.map((detail, index) => (
                    <div key={index} className="border-l-4 border-gray-200 pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {detail.subtitle}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {detail.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analysis */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Análise</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Positive Impacts */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Impactos Positivos
                    </h3>
                    <ul className="space-y-2">
                      {news.fullContent.analysis.positiveImpacts.map((impact, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-green-700">{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Negative Impacts */}
                  <div className="bg-red-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                      <TrendingDown className="h-5 w-5 mr-2" />
                      Impactos Negativos
                    </h3>
                    <ul className="space-y-2">
                      {news.fullContent.analysis.negativeImpacts.map((impact, index) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-red-700">{impact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Recomendações</h3>
                  <ul className="space-y-2">
                    {news.fullContent.analysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-blue-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Future Outlook */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Perspectivas Futuras</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {news.fullContent.futureOutlook}
                </p>
              </div>
            </div>
          </article>

          {/* Back to News */}
          <div className="mt-8 text-center">
            <Link 
              to="/atualidades" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ver mais notícias
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AtualidadeIndividual;