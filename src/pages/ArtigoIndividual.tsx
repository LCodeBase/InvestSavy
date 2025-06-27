
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { generateArticleSchema } from '../config/seo';
import { Clock, Calendar, ArrowLeft, BookOpen, Share2, User } from 'lucide-react';
import { motion } from 'framer-motion';

const ArtigoIndividual = () => {
  const { slug } = useParams();

  // Mock data - em um app real, isso viria de uma API baseada no slug
  const artigos = {
    'selic-15-junho-2025': {
      title: 'Selic sobe para 15% ao ano em decisão histórica do Copom',
      category: 'Política Monetária',
      author: 'InvestSavy',
      publishDate: '18 de junho de 2025',
      readTime: '4 min',
      coverImage: '/placeholder.svg',
      excerpt: 'O Banco Central elevou a taxa Selic para 15% ao ano, maior patamar desde 2006. Entenda o que isso significa para seu dinheiro.',
      content: [
        {
          type: 'text',
          content: 'O Comitê de Política Monetária (Copom) do Banco Central decidiu elevar a taxa Selic em 0,25 ponto percentual, levando-a para 15% ao ano. Esta é a sétima alta consecutiva e representa o maior patamar da taxa básica de juros desde julho de 2006.'
        },
        {
          type: 'heading',
          content: 'Por que o Banco Central subiu os juros?'
        },
        {
          type: 'text',
          content: 'A decisão foi tomada para combater a inflação persistente. O IPCA (Índice de Preços ao Consumidor Amplo) acumula alta preocupante nos últimos 12 meses, permanecendo acima da meta de 4,5% estabelecida pelo governo. O BC utiliza a Selic como principal ferramenta para controlar a inflação.'
        },
        {
          type: 'heading',
          content: 'O que muda na prática para você?'
        },
        {
          type: 'list',
          items: [
            'Empréstimos e financiamentos ficam mais caros: Se você estava pensando em fazer um financiamento imobiliário ou pegar um empréstimo pessoal, os juros serão maiores.',
            'Cartão de crédito e cheque especial encarecem ainda mais: Estes produtos já têm juros altos e tendem a subir junto com a Selic.',
            'Investimentos em renda fixa ficam mais atrativos: CDB, LCI, LCA e Tesouro Direto passam a oferecer rendimentos maiores.',
            'Poupança rende mais: Com Selic acima de 8,5%, a poupança rende 0,5% ao mês + TR.'
          ]
        },
        {
          type: 'heading',
          content: 'Estratégias para aproveitar o cenário'
        },
        {
          type: 'text',
          content: 'Se você tem dívidas, especialmente no cartão de crédito ou cheque especial, priorize quitá-las. Com juros altos, essas dívidas podem crescer rapidamente e comprometer seu orçamento.'
        },
        {
          type: 'text',
          content: 'Para quem tem dinheiro guardado, este é um bom momento para investir em renda fixa. Produtos como CDB, Tesouro Selic e fundos DI oferecem rentabilidade atrativa com baixo risco.'
        },
        {
          type: 'heading',
          content: 'Próximos passos do Banco Central'
        },
        {
          type: 'text',
          content: 'O BC sinalizou que pode pausar o ciclo de alta dos juros nas próximas reuniões para avaliar os impactos acumulados das medidas já tomadas. A decisão dependerá da evolução da inflação e das expectativas do mercado.'
        }
      ]
    },
    'fim-isencao-cripto-brasil-2025': {
      title: 'Fim da isenção fiscal para criptomoedas no Brasil',
      category: 'Criptomoedas',
      author: 'InvestSavy',
      publishDate: '15 de junho de 2025',
      readTime: '3 min',
      coverImage: '/placeholder.svg',
      excerpt: 'Governo acaba com isenção de IR para ganhos até R$ 35 mil mensais. Qualquer lucro com cripto será tributado em 17,5% a partir de 2026.',
      content: [
        {
          type: 'text',
          content: 'Uma Medida Provisória publicada pelo governo brasileiro pôs fim à isenção de Imposto de Renda sobre lucros de até R$ 35 mil mensais com criptomoedas. A partir de 2026, qualquer ganho de capital com Bitcoin e outras moedas digitais será tributado com alíquota única de 17,5%.'
        },
        {
          type: 'heading',
          content: 'O que muda na prática?'
        },
        {
          type: 'list',
          items: [
            'Fim da isenção: Antes, vendas até R$ 35 mil por mês eram isentas de IR. Agora, qualquer lucro será tributado.',
            'Alíquota única: Taxa de 17,5% sobre todos os ganhos de capital, independentemente do valor.',
            'Apuração trimestral: O imposto deve ser calculado e pago a cada três meses, não mais anualmente.',
            'Compensação de prejuízos: Perdas podem ser abatidas dos ganhos no mesmo período.'
          ]
        },
        {
          type: 'heading',
          content: 'Como se preparar?'
        },
        {
          type: 'text',
          content: 'Se você investe em criptomoedas, comece a organizar seus registros desde já. Mantenha controle detalhado de todas as compras e vendas, incluindo datas, valores e taxas. Isso será essencial para calcular corretamente os impostos devidos.'
        },
        {
          type: 'text',
          content: 'Para novos investidores, considere esse custo adicional ao calcular a rentabilidade esperada. A tributação de 17,5% pode reduzir significativamente seus ganhos líquidos, especialmente em operações de curto prazo.'
        },
        {
          type: 'heading',
          content: 'Impacto no mercado'
        },
        {
          type: 'text',
          content: 'A medida pode reduzir a especulação de curto prazo no mercado de criptomoedas brasileiro, favorecendo investidores de longo prazo. Exchanges e plataformas de negociação terão que se adaptar para fornecer relatórios mais detalhados aos usuários.'
        }
      ]
    },
    'pib-brasil-crescimento-2025': {
      title: 'PIB brasileiro cresce 1,4% no primeiro trimestre de 2025',
      category: 'Economia',
      author: 'InvestSavy',
      publishDate: '10 de junho de 2025',
      readTime: '4 min',
      coverImage: '/placeholder.svg',
      excerpt: 'FMI divulga crescimento moderado do PIB brasileiro, impulsionado pela agropecuária. Projeções para o ano são mais pessimistas.',
      content: [
        {
          type: 'text',
          content: 'O Fundo Monetário Internacional (FMI) divulgou que o Produto Interno Bruto (PIB) do Brasil cresceu 1,4% no primeiro trimestre de 2025 em relação ao trimestre anterior. O crescimento foi impulsionado principalmente pela agropecuária, que registrou expansão de 12,2%, e pelo consumo das famílias, que avançou 1%.'
        },
        {
          type: 'heading',
          content: 'Setores que puxaram o crescimento'
        },
        {
          type: 'list',
          items: [
            'Agropecuária: +12,2% - Safra recorde de soja e milho impulsionou o setor',
            'Consumo das famílias: +1% - Melhora no mercado de trabalho sustentou o consumo',
            'Serviços: Crescimento moderado, mas ainda positivo',
            'Indústria: Desempenho misto, com alguns segmentos em retração'
          ]
        },
        {
          type: 'heading',
          content: 'Projeções para 2025 são mais pessimistas'
        },
        {
          type: 'text',
          content: 'Apesar do resultado positivo no primeiro trimestre, as projeções para o ano completo são menos otimistas. O FMI projeta crescimento de 2% para 2025, enquanto o governo brasileiro mantém expectativa de 2,4%. A diferença reflete preocupações com juros altos e incertezas globais.'
        },
        {
          type: 'heading',
          content: 'O que isso significa para você?'
        },
        {
          type: 'text',
          content: 'Crescimento moderado da economia pode significar que o mercado de trabalho desacelere e os salários subam menos. É um momento importante para fortalecer sua reserva de emergência e investir em qualificação profissional.'
        },
        {
          type: 'text',
          content: 'Evite assumir grandes dívidas neste período e mantenha seus gastos sob controle. Se possível, aproveite para quitar dívidas pendentes antes que os juros subam ainda mais.'
        },
        {
          type: 'heading',
          content: 'Perspectivas para os próximos trimestres'
        },
        {
          type: 'text',
          content: 'Economistas apontam que o crescimento pode desacelerar nos próximos trimestres devido aos efeitos dos juros altos na economia. O consumo das famílias, principal motor do crescimento brasileiro, pode perder força com o encarecimento do crédito.'
        }
      ]
    },
    'conflito-israel-ira-petroleo-2025': {
      title: 'Conflito Israel-Irã eleva preço do petróleo e afeta mercados',
      category: 'Geopolítica',
      author: 'InvestSavy',
      publishDate: '12 de junho de 2025',
      readTime: '5 min',
      coverImage: '/placeholder.svg',
      excerpt: 'Escalada do conflito no Oriente Médio causa alta do petróleo. JPMorgan projeta barril a US$ 150 em cenário de intensificação.',
      content: [
        {
          type: 'text',
          content: 'A escalada do conflito entre Israel e Irã em junho de 2025 provocou uma alta significativa nos preços do petróleo, gerando preocupações sobre os impactos na economia global. O JPMorgan projeta que o barril pode atingir US$ 120 ou até US$ 150 se a situação se intensificar.'
        },
        {
          type: 'heading',
          content: 'Por que o petróleo sobe com conflitos?'
        },
        {
          type: 'text',
          content: 'O Oriente Médio concentra grande parte da produção mundial de petróleo. Conflitos na região geram temores de interrupção no fornecimento, levando os preços a subir mesmo que a produção não seja efetivamente afetada. É o que os economistas chamam de "prêmio de risco geopolítico".'
        },
        {
          type: 'heading',
          content: 'Impactos diretos no Brasil'
        },
        {
          type: 'list',
          items: [
            'Combustíveis mais caros: Gasolina e diesel tendem a subir nos postos',
            'Transporte encarece: Fretes e passagens podem ficar mais caros',
            'Inflação sobe: Produtos que dependem de transporte ficam mais caros',
            'Pressão sobre o Real: Moedas emergentes sofrem com instabilidade global'
          ]
        },
        {
          type: 'heading',
          content: 'Como se proteger dos impactos?'
        },
        {
          type: 'text',
          content: 'Se você usa muito o carro, considere alternativas como transporte público ou caronas compartilhadas. Para compras, tente antecipar itens essenciais antes que os preços subam mais.'
        },
        {
          type: 'text',
          content: 'Nos investimentos, evite exposição excessiva a setores sensíveis ao preço do petróleo, como companhias aéreas. Considere diversificar sua carteira com ativos que se beneficiem da alta do petróleo, como ações da Petrobras.'
        },
        {
          type: 'heading',
          content: 'Perspectivas para os mercados'
        },
        {
          type: 'text',
          content: 'Mercados globais tendem a ficar mais voláteis durante crises geopolíticas. Investidores buscam ativos considerados "porto seguro", como ouro e títulos do governo americano. Para o Brasil, a situação pode pressionar ainda mais a inflação, dificultando cortes futuros na Selic.'
        }
      ]
    },
    'wall-street-sp500-tensoes-2025': {
      title: 'Wall Street reavalia projeções para S&P 500 em meio a tensões',
      category: 'Investimentos',
      author: 'InvestSavy',
      publishDate: '14 de junho de 2025',
      readTime: '4 min',
      coverImage: '/placeholder.svg',
      excerpt: 'Tensões geopolíticas causam cautela em Wall Street. Mercados reavaliam projeções para 2025 devido a incertezas.',
      content: [
        {
          type: 'text',
          content: 'As tensões geopolíticas no Oriente Médio causaram queda no índice S&P 500 e aumentaram a cautela nos mercados globais. Wall Street está reavaliando as projeções para 2025 devido a incertezas geopolíticas e possíveis mudanças nas políticas comerciais americanas.'
        },
        {
          type: 'heading',
          content: 'Setores mais afetados'
        },
        {
          type: 'list',
          items: [
            'Energia: Empresas petrolíferas sobem com alta do petróleo',
            'Aviação: Companhias aéreas sofrem com combustível mais caro',
            'Tecnologia: Setor defensivo, mas sensível a mudanças de humor',
            'Bancos: Beneficiam-se de juros altos, mas sofrem com instabilidade'
          ]
        },
        {
          type: 'heading',
          content: 'Impacto nos seus investimentos'
        },
        {
          type: 'text',
          content: 'Se você tem investimentos em fundos internacionais ou ações americanas, pode ver mais volatilidade na sua carteira. O importante é manter a calma e não tomar decisões impulsivas baseadas em movimentos de curto prazo.'
        },
        {
          type: 'text',
          content: 'Para quem investe no exterior através de fundos ou BDRs, considere diversificar mais em ativos brasileiros para reduzir a exposição a riscos geopolíticos internacionais.'
        },
        {
          type: 'heading',
          content: 'Estratégias para momentos de incerteza'
        },
        {
          type: 'list',
          items: [
            'Mantenha disciplina: Não altere sua estratégia por volatilidade temporária',
            'Diversifique: Tenha ativos em diferentes países e setores',
            'Reserve de emergência: Mantenha dinheiro em renda fixa para oportunidades',
            'Foco no longo prazo: Crises passam, mas bons investimentos se valorizam'
          ]
        },
        {
          type: 'heading',
          content: 'Oportunidades em meio à crise'
        },
        {
          type: 'text',
          content: 'Períodos de volatilidade podem criar oportunidades para investidores pacientes. Ações de qualidade podem ficar temporariamente descontadas, oferecendo bons pontos de entrada para quem tem reservas e estratégia de longo prazo.'
        }
      ]
    },
    'google-ia-brasil-mercado-trabalho-2025': {
      title: 'Google investe em IA no Brasil: impacto no mercado de trabalho',
      category: 'Tecnologia',
      author: 'InvestSavy',
      publishDate: '8 de junho de 2025',
      readTime: '5 min',
      coverImage: '/placeholder.svg',
      excerpt: 'IA pode impactar 31,3 milhões de empregos no Brasil, mas tendência é de reestruturação, não extinção de funções.',
      content: [
        {
          type: 'text',
          content: 'O Google anunciou novos investimentos em iniciativas de inteligência artificial no Brasil, enquanto estudos revelam que a IA generativa pode impactar 31,3 milhões de empregos no país. Contrariando temores iniciais, a tendência é de reestruturação de tarefas, não extinção de funções.'
        },
        {
          type: 'heading',
          content: 'Setores mais impactados pela IA'
        },
        {
          type: 'list',
          items: [
            'Atendimento ao cliente: Chatbots assumem consultas básicas',
            'Contabilidade: Automação de lançamentos e relatórios',
            'Marketing: Criação de conteúdo e análise de dados',
            'Programação: Assistência na escrita e revisão de código',
            'Design: Geração automática de layouts e imagens',
            'Educação: Personalização do ensino e correção automática',
            'Saúde: Diagnósticos assistidos e análise de exames'
          ]
        },
        {
          type: 'heading',
          content: 'O que muda na prática?'
        },
        {
          type: 'text',
          content: 'Segundo pesquisas, 72% das empresas brasileiras já adotaram IA em 2024, e 54% dos brasileiros utilizaram IA generativa. O otimismo sobre os benefícios da tecnologia no mercado de trabalho está crescendo, com a IA assumindo atividades rotineiras e liberando tempo para tarefas mais complexas.'
        },
        {
          type: 'heading',
          content: 'Como se preparar para o futuro?'
        },
        {
          type: 'list',
          items: [
            'Desenvolva habilidades complementares à IA: criatividade, pensamento crítico, inteligência emocional',
            'Aprenda a usar ferramentas de IA: ChatGPT, Copilot, Midjourney e outras',
            'Invista em educação continuada: cursos online, certificações, workshops',
            'Foque em soft skills: comunicação, liderança, resolução de problemas'
          ]
        },
        {
          type: 'heading',
          content: 'Oportunidades de carreira'
        },
        {
          type: 'text',
          content: 'A IA está criando novas profissões: prompt engineers, especialistas em ética de IA, analistas de dados de IA. Para quem trabalha em áreas tradicionais, o segredo é se tornar um "colaborador da IA", usando a tecnologia para ser mais produtivo.'
        },
        {
          type: 'text',
          content: 'Profissionais que abraçarem a IA como ferramenta de trabalho terão vantagem competitiva significativa no mercado. O importante é ver a IA como aliada, não como ameaça.'
        }
      ]
    },
    'reformas-tributarias-brasil-40-bilhoes-2025': {
      title: 'Pacote fiscal pode gerar R$ 40 bilhões por ano com novas medidas',
      category: 'Tributação',
      author: 'InvestSavy',
      publishDate: '5 de junho de 2025',
      readTime: '4 min',
      coverImage: '/placeholder.svg',
      excerpt: 'Governo espera arrecadar R$ 40 bilhões anuais com taxação de apostas online, aumento do JCP e limitação de compensações.',
      content: [
        {
          type: 'text',
          content: 'O governo brasileiro publicou um novo pacote de medidas tributárias que deve gerar R$ 40 bilhões por ano em arrecadação adicional. As principais mudanças incluem regulamentação de apostas online, aumento da taxação de Juros sobre Capital Próprio (JCP) e limitação de compensações tributárias.'
        },
        {
          type: 'heading',
          content: 'Principais mudanças do pacote'
        },
        {
          type: 'list',
          items: [
            'Apostas online: Regulamentação deve gerar R$ 20 bilhões com carga tributária de 36%',
            'JCP: Aumento da taxação de 15% para 20% sobre Juros sobre Capital Próprio',
            'Compensações: Limitação para arrecadar R$ 10 bilhões adicionais',
            'Reforma tributária: Continuidade da votação do PLP 108/2024 em 2025'
          ]
        },
        {
          type: 'heading',
          content: 'Impacto nas apostas online'
        },
        {
          type: 'text',
          content: 'A regulamentação do mercado de apostas online representa a maior fonte de receita do pacote. Com uma carga tributária de cerca de 36%, o setor deve contribuir com R$ 20 bilhões anuais para os cofres públicos a partir de 2025.'
        },
        {
          type: 'heading',
          content: 'O que muda para investidores?'
        },
        {
          type: 'text',
          content: 'O aumento da taxação do JCP de 15% para 20% afeta diretamente quem investe em ações que distribuem esse tipo de provento. Empresas podem repensar suas estratégias de distribuição, priorizando dividendos (isentos de IR para pessoa física) em vez de JCP.'
        },
        {
          type: 'text',
          content: 'Para o investidor pessoa física, isso pode significar menor atratividade de algumas ações que tradicionalmente distribuíam JCP. É importante revisar sua carteira e considerar o impacto tributário nas decisões de investimento.'
        },
        {
          type: 'heading',
          content: 'Estratégias para se adaptar'
        },
        {
          type: 'list',
          items: [
            'Revise sua carteira de ações: Priorize empresas que distribuem dividendos',
            'Considere FIIs: Fundos imobiliários mantêm isenção de IR nos rendimentos',
            'Planejamento tributário: Busque orientação profissional para otimizar impostos',
            'Diversificação: Não concentre investimentos em uma única classe de ativos'
          ]
        }
      ]
    },
    'ouro-alta-tensoes-geopoliticas-2025': {
      title: 'Ouro dispara com tensões no Oriente Médio: porto seguro em alta',
      category: 'Commodities',
      author: 'InvestSavy',
      publishDate: '16 de junho de 2025',
      readTime: '3 min',
      coverImage: '/placeholder.svg',
      excerpt: 'Instabilidade geopolítica e expectativa de cortes nos juros americanos elevam ouro a US$ 3.371/oz. Analistas projetam US$ 3.000.',
      content: [
        {
          type: 'text',
          content: 'O preço do ouro disparou para cerca de US$ 3.371 por onça devido à instabilidade no Oriente Médio e expectativas de cortes nas taxas de juros dos Estados Unidos. Analistas projetam que o metal pode atingir US$ 3.000 a onça, consolidando sua posição como "porto seguro" em momentos de crise.'
        },
        {
          type: 'heading',
          content: 'Por que o ouro sobe em crises?'
        },
        {
          type: 'text',
          content: 'O ouro é tradicionalmente visto como reserva de valor em períodos de instabilidade econômica e política. Quando há incertezas geopolíticas, inflação alta ou desvalorização de moedas, investidores migram para o metal precioso como forma de proteção patrimonial.'
        },
        {
          type: 'heading',
          content: 'Fatores que impulsionam a alta'
        },
        {
          type: 'list',
          items: [
            'Tensões geopolíticas: Conflitos no Oriente Médio aumentam busca por segurança',
            'Expectativa de cortes de juros: Juros menores tornam o ouro mais atrativo',
            'Inflação persistente: Metal protege contra perda de poder de compra',
            'Enfraquecimento do dólar: Ouro fica mais barato para outras moedas'
          ]
        },
        {
          type: 'heading',
          content: 'Como investir em ouro no Brasil?'
        },
        {
          type: 'list',
          items: [
            'ETFs de ouro: Fundos que replicam o preço do metal (como GOLD11)',
            'Ouro físico: Compra de barras ou moedas em instituições autorizadas',
            'Ações de mineradoras: Empresas como Kinross Gold e AngloGold',
            'Fundos multimercado: Alguns fundos têm exposição a commodities'
          ]
        },
        {
          type: 'heading',
          content: 'Riscos e considerações'
        },
        {
          type: 'text',
          content: 'Embora seja considerado seguro, o ouro não paga dividendos ou juros, e seu preço pode ser volátil no curto prazo. Para brasileiros, há ainda o risco cambial, já que o metal é cotado em dólar.'
        },
        {
          type: 'text',
          content: 'O ideal é ter uma pequena parcela da carteira (5% a 10%) em ouro como proteção, não como investimento principal. É uma forma de diversificação e proteção contra cenários extremos.'
        }
      ]
    },
    'infraestrutura-digital-brasil-govtech-2025': {
      title: 'Brasil investe pesado em transformação digital e GovTech',
      category: 'Inovação',
      author: 'InvestSavy',
      publishDate: '3 de junho de 2025',
      readTime: '5 min',
      coverImage: '/placeholder.svg',
      excerpt: 'Governo lança Infraestrutura Nacional de Dados e Plano de IA com R$ 1,76 bilhão. Investimentos em TIC devem superar R$ 660 bilhões.',
      content: [
        {
          type: 'text',
          content: 'O Brasil está investindo massivamente em transformação digital. O governo lançou a Infraestrutura Nacional de Dados (IND) e o Plano Brasileiro de Inteligência Artificial (PBIA) com investimento de R$ 1,76 bilhão até 2028. Os investimentos totais em TIC devem ultrapassar R$ 660 bilhões até 2025.'
        },
        {
          type: 'heading',
          content: 'Principais iniciativas do governo'
        },
        {
          type: 'list',
          items: [
            'Infraestrutura Nacional de Dados (IND): Promove uso estratégico de dados e interoperabilidade',
            'Plano Brasileiro de IA: R$ 1,76 bilhão para melhorar serviços públicos com IA',
            'Governo Digital: Declaração assinada em março de 2025 foca em transparência e eficiência',
            'Startup GOV.BR: Programa apoia projetos estratégicos a partir de 2025'
          ]
        },
        {
          type: 'heading',
          content: 'Estratégia de Transformação Digital (2022-2026)'
        },
        {
          type: 'text',
          content: 'A estratégia brasileira visa ampliar o acesso à internet, fortalecer provedores de pequeno porte, expandir a conectividade e estimular P&D em tecnologias como IoT, IA e computação em nuvem. Já são 25 órgãos federais com planos de transformação digital assinados.'
        },
        {
          type: 'heading',
          content: 'Oportunidades para profissionais'
        },
        {
          type: 'list',
          items: [
            'Desenvolvimento de software: Demanda crescente por desenvolvedores',
            'Análise de dados: Profissionais para trabalhar com big data governamental',
            'Cibersegurança: Proteção de dados e sistemas críticos',
            'UX/UI Design: Melhoria da experiência do usuário em serviços públicos',
            'Gestão de projetos: Coordenação de iniciativas de transformação digital'
          ]
        },
        {
          type: 'heading',
          content: 'Impacto nos investimentos'
        },
        {
          type: 'text',
          content: 'O setor de tecnologia brasileiro deve se beneficiar desses investimentos. Empresas de software, telecomunicações, centros de dados e serviços digitais podem ver crescimento acelerado. Para investidores, é uma oportunidade de exposição a um setor em expansão.'
        },
        {
          type: 'text',
          content: 'Considere ETFs de tecnologia, ações de empresas do setor ou fundos setoriais para aproveitar essa tendência de digitalização do país.'
        },
        {
          type: 'heading',
          content: 'Benefícios para a população'
        },
        {
          type: 'text',
          content: 'A transformação digital promete serviços públicos mais eficientes, transparentes e acessíveis. Isso pode significar menos filas, processos mais rápidos e melhor atendimento ao cidadão, gerando economia de tempo e dinheiro para todos.'
        }
      ]
    },
    'economia-global-tensoes-petroleo-juros-2025': {
      title: 'Tensões globais dificultam cortes de juros e elevam petróleo',
      category: 'Economia Global',
      author: 'InvestSavy',
      publishDate: '20 de junho de 2025',
      readTime: '4 min',
      coverImage: '/placeholder.svg',
      excerpt: 'Conflitos no Oriente Médio elevaram petróleo 18% desde junho. Fed e BCE mantêm cautela sobre cortes de juros.',
      content: [
        {
          type: 'text',
          content: 'As tensões geopolíticas elevaram o preço do petróleo em cerca de 18% desde 10 de junho, dificultando a redução de juros por bancos centrais como o Federal Reserve (Fed) e o Banco Central Europeu (BCE). As projeções de crescimento global para 2025 foram revisadas para baixo.'
        },
        {
          type: 'heading',
          content: 'Cenário econômico global em 2025'
        },
        {
          type: 'list',
          items: [
            'Crescimento desacelerado: Projeções revisadas para baixo devido a tensões comerciais',
            'Inflação persistente: Alta do petróleo pressiona preços globalmente',
            'Juros altos: Bancos centrais mantêm cautela sobre cortes',
            'Volatilidade cambial: Dólar e outras moedas sofrem com incertezas'
          ]
        },
        {
          type: 'heading',
          content: 'Impacto nos países emergentes'
        },
        {
          type: 'text',
          content: 'Países emergentes como o Brasil sofrem mais com a instabilidade global. Moedas se desvalorizam, inflação sobe e bancos centrais precisam manter juros altos para atrair capital estrangeiro e controlar a inflação importada.'
        },
        {
          type: 'heading',
          content: 'Estratégias para investidores brasileiros'
        },
        {
          type: 'list',
          items: [
            'Diversificação geográfica: Tenha ativos em diferentes países',
            'Proteção cambial: Considere hedge cambial em parte da carteira',
            'Renda fixa: Aproveite juros altos no Brasil',
            'Commodities: Petróleo e ouro podem se beneficiar das tensões'
          ]
        },
        {
          type: 'heading',
          content: 'Perspectivas para o segundo semestre'
        },
        {
          type: 'text',
          content: 'O segundo semestre de 2025 promete ser desafiador, com eleições em países importantes, possíveis mudanças na política comercial americana e continuidade das tensões no Oriente Médio. Investidores devem manter cautela e diversificação.'
        },
        {
          type: 'text',
          content: 'Para o Brasil, o cenário externo dificulta cortes na Selic e pode pressionar ainda mais a inflação. É importante acompanhar de perto as decisões do Copom e ajustar a estratégia de investimentos conforme necessário.'
        },
        {
          type: 'heading',
          content: 'Dicas práticas'
        },
        {
          type: 'text',
          content: 'Mantenha uma reserva de emergência robusta, evite dívidas desnecessárias e considere investimentos que se beneficiem de juros altos. Em momentos de incerteza, a prudência é a melhor estratégia.'
        }
      ]
    },
    'resenha-pai-rico-pai-pobre': {
      title: 'Resenha Completa: "Pai Rico, Pai Pobre" - Lições que Transformam a Mentalidade Financeira',
      category: 'Livros Lidos',
      author: 'InvestSavy',
      publishDate: '15 de Janeiro de 2025',
      readTime: '12 min',
      coverImage: '/placeholder.svg',
      excerpt: 'Uma análise crítica e honesta do clássico de Robert Kiyosaki, explorando como aplicar seus ensinamentos práticos no contexto brasileiro atual.',
      content: [
        {
          type: 'text',
          content: 'Robert Kiyosaki revolucionou a forma como milhões de pessoas pensam sobre dinheiro com "Pai Rico, Pai Pobre". Publicado em 1997, o livro continua sendo uma das obras mais influentes sobre educação financeira, vendendo mais de 32 milhões de cópias mundialmente.'
        },
        {
          type: 'heading',
          content: 'A Premissa Central do Livro'
        },
        {
          type: 'text',
          content: 'O livro contrasta duas filosofias financeiras através de duas figuras paternas: o "pai pobre" (o pai biológico de Kiyosaki, altamente educado mas com dificuldades financeiras) e o "pai rico" (o pai de seu melhor amigo, empresário bem-sucedido que se tornou seu mentor financeiro).'
        },
        {
          type: 'quote',
          content: 'Os ricos não trabalham por dinheiro. Eles fazem o dinheiro trabalhar para eles.',
          author: 'Robert Kiyosaki'
        },
        {
          type: 'text',
          content: 'Esta diferença fundamental de mentalidade permeia todo o livro, demonstrando como nossa educação tradicional nos prepara para ser empregados, mas não para ser investidores ou empreendedores.'
        },
        {
          type: 'heading',
          content: 'As Principais Lições Aplicadas ao Brasil'
        },
        {
          type: 'text',
          content: 'Adaptando os ensinamentos de Kiyosaki para a realidade brasileira, identifiquei cinco lições fundamentais que podem transformar sua relação com o dinheiro:'
        },
        {
          type: 'list',
          items: [
            'Diferenciação entre ativos e passivos: No Brasil, muitos consideram a casa própria um ativo, mas Kiyosaki nos ensina que só é ativo aquilo que coloca dinheiro no seu bolso mensalmente.',
            'A importância da educação financeira: O sistema educacional brasileiro, assim como o americano, não ensina sobre dinheiro. É nossa responsabilidade buscar esse conhecimento.',
            'Construção de renda passiva: Com as opções de investimento disponíveis no Brasil (FIIs, dividendos, renda fixa), é possível aplicar os conceitos do livro em nossa realidade.',
            'Mentalidade empreendedora: Kiyosaki incentiva a criação de sistemas que gerem renda, não apenas trabalhar mais horas.',
            'Impostos e proteção patrimonial: Compreender como os impostos afetam diferentes classes sociais e como os ricos utilizam estruturas legais para otimizar sua carga tributária.'
          ]
        },
        {
          type: 'text',
          content: 'Uma das críticas mais válidas ao livro é sua falta de especificidade em relação a estratégias concretas de investimento. Kiyosaki foca muito na mentalidade, mas deixa o leitor sem um plano de ação claro.'
        },
        {
          type: 'heading',
          content: 'Críticas Construtivas à Obra'
        },
        {
          type: 'text',
          content: 'Embora seja um livro transformador, "Pai Rico, Pai Pobre" não está livre de limitações. Algumas críticas importantes incluem:'
        },
        {
          type: 'text',
          content: 'O livro pode criar uma visão excessivamente polarizada entre "ricos" e "pobres", quando a realidade financeira é muito mais nuançada. Além disso, alguns exemplos são datados e específicos do mercado americano dos anos 90.'
        },
        {
          type: 'text',
          content: 'No contexto brasileiro atual, é importante adaptar os conceitos considerando nossa legislação tributária, opções de investimento disponíveis e realidade socioeconômica.'
        },
        {
          type: 'heading',
          content: 'Minha Experiência Pessoal'
        },
        {
          type: 'text',
          content: 'Li "Pai Rico, Pai Pobre" pela primeira vez aos 25 anos, e posso afirmar que foi um divisor de águas na minha relação com o dinheiro. O livro me fez questionar crenças limitantes que havia herdado sobre trabalho, dinheiro e sucesso.'
        },
        {
          type: 'text',
          content: 'O conceito de "corrida dos ratos" – trabalhar cada vez mais para manter um padrão de vida cada vez mais caro – me fez repensar minhas prioridades financeiras e focar na construção de ativos que gerassem renda passiva.'
        },
        {
          type: 'heading',
          content: 'Conclusão e Recomendação'
        },
        {
          type: 'text',
          content: '"Pai Rico, Pai Pobre" é uma leitura essencial para quem está começando sua jornada de educação financeira. Apesar de suas limitações, o livro oferece uma mudança de perspectiva fundamental sobre como pensar sobre dinheiro e riqueza.'
        },
        {
          type: 'text',
          content: 'Recomendo especialmente para jovens adultos que estão entrando no mercado de trabalho e precisam desenvolver uma mentalidade financeira saudável desde cedo. Para quem já tem conhecimento avançado em finanças, o livro pode parecer básico, mas ainda assim oferece reflexões valiosas sobre mentalidade e comportamento.'
        },
        {
          type: 'rating',
          score: 4.5,
          maxScore: 5,
          content: 'Uma obra transformadora que deve ser lida com senso crítico, adaptando seus ensinamentos à realidade brasileira atual.'
        }
      ]
    },
    'certificacao-cpa-20': {
      title: 'Minha Jornada com a Certificação CPA-20: Vale a Pena o Investimento?',
      category: 'Cursos Feitos',
      author: 'InvestSavy',
      publishDate: '12 de Janeiro de 2025',
      readTime: '8 min',
      coverImage: '/placeholder.svg',
      excerpt: 'Compartilho minha experiência completa estudando para o CPA-20, incluindo custos, tempo dedicado e como isso mudou minha visão sobre investimentos.',
      content: [
        {
          type: 'text',
          content: 'A certificação CPA-20 (Certificação Profissional ANBIMA Série 20) é uma das credenciais mais respeitadas no mercado financeiro brasileiro. Após meses de estudo e preparação, decidi compartilhar minha experiência completa com quem está considerando fazer essa jornada.'
        },
        {
          type: 'heading',
          content: 'Por Que Decidi Fazer o CPA-20?'
        },
        {
          type: 'text',
          content: 'Minha motivação não era necessariamente profissional – trabalho em uma área diferente do mercado financeiro. O que me levou a buscar a certificação foi o desejo de aprofundar meus conhecimentos sobre investimentos e ter uma base sólida para tomar decisões mais informadas com meu próprio dinheiro.'
        }
      ]
    }
  };

  const artigo = artigos[slug as keyof typeof artigos];

  // SEO and Structured Data for individual article
  const generateSEOData = () => {
    if (!artigo) return null;
    
    const articleContent = artigo.content.map(item => {
      if (item.type === 'text') return item.content;
      if (item.type === 'heading') return item.content;
      if (item.type === 'quote') return `"${item.content}" - ${item.author}`;
      if (item.type === 'list') return item.items.join(' ');
      return '';
    }).join(' ');

    const jsonLd = generateArticleSchema({
      title: artigo.title,
      description: artigo.excerpt,
      content: articleContent,
      author: artigo.author,
      publishedTime: new Date(artigo.publishDate).toISOString(),
      image: `https://www.investsavy.online${artigo.coverImage}`,
      url: `https://www.investsavy.online/artigos/${slug}`,
      tags: [artigo.category, 'Investimentos', 'Educação Financeira']
    });

    return {
      title: `${artigo.title} | InvestSavy`,
      description: artigo.excerpt,
      keywords: `${artigo.category.toLowerCase()}, investimentos, educação financeira, ${artigo.title.toLowerCase()}`,
      url: `https://www.investsavy.online/artigos/${slug}`,
      image: `https://www.investsavy.online${artigo.coverImage}`,
      type: 'article',
      section: artigo.category,
      publishedTime: new Date(artigo.publishDate).toISOString(),
      author: artigo.author,
      jsonLd
    };
  };

  const seoData = generateSEOData();

  if (!artigo) {
    return (
      <Layout>
        <SEOHead
          title="Artigo não encontrado | InvestSavy"
          description="O artigo que você procura não foi encontrado. Explore outros conteúdos sobre investimentos e educação financeira."
          keywords="artigo não encontrado, investimentos, educação financeira"
          url={`https://www.investsavy.online/artigos/${slug}`}
          type="website"
          canonical="https://www.investsavy.online/artigos"
        />
        <div className="py-32 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
          <Link to="/artigos" className="text-green-600 hover:text-green-700 flex items-center justify-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para artigos</span>
          </Link>
        </div>
      </Layout>
    );
  }

  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case 'text':
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-lg leading-relaxed text-gray-800 mb-6"
          >
            {item.content}
          </motion.p>
        );
      
      case 'heading':
        return (
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 leading-tight"
          >
            {item.content}
          </motion.h2>
        );
      
      case 'quote':
        return (
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="border-l-4 border-green-500 pl-6 py-4 my-8 bg-green-50 rounded-r-lg"
          >
            <p className="text-xl italic text-gray-800 mb-2">"{item.content}"</p>
            {item.author && (
              <cite className="text-sm font-medium text-green-700">— {item.author}</cite>
            )}
          </motion.blockquote>
        );
      
      case 'list':
        return (
          <motion.ul
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="space-y-3 mb-8"
          >
            {item.items.map((listItem: string, listIndex: number) => (
              <li key={listIndex} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg text-gray-800 leading-relaxed">{listItem}</span>
              </li>
            ))}
          </motion.ul>
        );
      
      case 'rating':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gradient-to-r from-green-50 to-white p-8 rounded-2xl border border-green-100 my-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-lg font-semibold text-gray-900">Avaliação:</span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(item.score) 
                        ? 'text-green-500' 
                        : i < item.score 
                        ? 'text-green-300' 
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </div>
                ))}
              </div>
              <span className="text-lg font-bold text-green-600">{item.score}/{item.maxScore}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{item.content}</p>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      {seoData && (
        <SEOHead
          title={seoData.title}
          description={seoData.description}
          keywords={seoData.keywords}
          url={seoData.url}
          image={seoData.image}
          type={seoData.type}
          section={seoData.section}
          canonical={seoData.url}
          publishedTime={seoData.publishedTime}
          author={seoData.author}
          jsonLd={seoData.jsonLd}
        />
      )}
      <article className="bg-white">
        {/* Header do Artigo */}
        <div className="bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Breadcrumb */}
              <div className="mb-8">
                <Link 
                  to="/artigos" 
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Voltar para artigos</span>
                </Link>
              </div>

              {/* Categoria */}
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {artigo.category}
                </span>
              </div>

              {/* Título */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                {artigo.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
                {artigo.excerpt}
              </p>

              {/* Meta informações */}
              <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-500 mb-8">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{artigo.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{artigo.publishDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{artigo.readTime} de leitura</span>
                </div>
                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Conteúdo do Artigo */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Imagem de capa */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <img
                src={artigo.coverImage}
                alt={artigo.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>

            {/* Conteúdo */}
            <div className="prose prose-lg max-w-none">
              {artigo.content.map((item, index) => renderContent(item, index))}
            </div>

            {/* Rodapé do artigo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 pt-8 border-t border-gray-200"
            >
              <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Sobre o Autor</h3>
                    <p className="text-gray-600">{artigo.author}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Apaixonado por educação financeira e compartilhamento de conhecimento. 
                  Escrevo sobre finanças pessoais, investimentos e desenvolvimento de mentalidade 
                  financeira baseado em experiências práticas e estudos aprofundados.
                </p>
              </div>
            </motion.div>

            {/* Navegação para outros artigos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <Link
                to="/artigos"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all duration-300 hover:shadow-lg"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Ver Mais Artigos</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ArtigoIndividual;
