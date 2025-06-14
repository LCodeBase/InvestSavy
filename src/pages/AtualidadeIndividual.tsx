
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Clock, Calendar, ArrowLeft, TrendingUp, Share2, User, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const AtualidadeIndividual = () => {
  const { slug } = useParams();

  // Mock data - em um app real, isso viria de uma API baseada no slug
  const atualidades = {
    'banco-central-selic-janeiro-2025': {
      title: 'Banco Central Mantém Selic em 10,75% ao Ano: O Que Isso Significa Para Seus Investimentos',
      category: 'Taxa de Juros',
      author: 'Redação InvestSavy',
      publishDate: '15 de Janeiro de 2025',
      readTime: '6 min',
      coverImage: '/placeholder.svg',
      excerpt: 'Em decisão unânime, o Copom manteve a taxa básica de juros em 10,75%, sinalizando preocupação com a inflação e cenário econômico global. Entenda os impactos práticos para seus investimentos.',
      impact: 'Com a Selic alta, investimentos em renda fixa como Tesouro Selic e CDBs ficam mais atrativos. Se você tem dívidas com juros variáveis, elas podem ficar mais caras.',
      content: [
        {
          type: 'text',
          content: 'O Comitê de Política Monetária (Copom) do Banco Central decidiu por unanimidade manter a taxa Selic em 10,75% ao ano. Esta foi a terceira reunião consecutiva em que a taxa básica de juros permanece inalterada, refletindo a cautela da autoridade monetária diante do cenário inflacionário e das incertezas econômicas globais.'
        },
        {
          type: 'heading',
          content: 'Os Fatores Por Trás da Decisão'
        },
        {
          type: 'text',
          content: 'A manutenção da Selic reflete três principais preocupações do Banco Central: a inflação que ainda persiste acima da meta de 4,5%, a volatilidade do cenário internacional e a necessidade de consolidar as expectativas inflacionárias.'
        },
        {
          type: 'text',
          content: 'Roberto Campos Neto, presidente do BC, destacou em entrevista que "a política monetária continuará vigilante e pronta para agir caso seja necessário". O comunicado oficial menciona que o comitê vê um cenário de "maior incerteza" para os próximos meses.'
        },
        {
          type: 'quote',
          content: 'A política monetária permanecerá vigilante, visando assegurar a convergência da inflação para a meta ao longo do horizonte relevante.',
          author: 'Comunicado do Copom'
        },
        {
          type: 'heading',
          content: 'Impactos Práticos Para Você'
        },
        {
          type: 'text',
          content: 'A manutenção da Selic em patamar elevado traz consequências diretas para diferentes aspectos da sua vida financeira:'
        },
        {
          type: 'list',
          items: [
            'Renda Fixa Atrativa: Investimentos como Tesouro Selic, CDBs e LCIs oferecem rentabilidade real positiva com a inflação atual.',
            'Financiamentos Mais Caros: Empréstimos e financiamentos com taxas pós-fixadas tendem a ficar mais onerosos.',
            'Poupança Menos Competitiva: Com a Selic alta, a poupança rende apenas 70% da taxa básica mais TR, ficando menos atrativa.',
            'Dólar Estabilizado: Juros altos podem ajudar a manter o dólar mais estável, beneficiando importações.'
          ]
        },
        {
          type: 'heading',
          content: 'Perspectivas Para os Próximos Meses'
        },
        {
          type: 'text',
          content: 'O mercado financeiro projeta que a Selic deve permanecer em patamares elevados pelo menos até o segundo semestre de 2025. As próximas decisões dependerão fundamentalmente da evolução dos dados de inflação e do cenário econômico global.'
        },
        {
          type: 'text',
          content: 'Analistas do mercado apontam que uma eventual redução da taxa básica só deve ocorrer quando houver sinais consistentes de arrefecimento da inflação e maior estabilidade no cenário internacional.'
        },
        {
          type: 'highlight',
          content: 'Estratégia Recomendada',
          description: 'Para investidores individuais, o momento é favorável para alocar recursos em renda fixa de qualidade, aproveitando as altas taxas de juros. Mantenha uma reserva de emergência bem remunerada e considere diversificar entre diferentes produtos de renda fixa.'
        }
      ]
    },
    'pix-nova-regra-receita-federal': {
      title: 'Nova Regra do PIX: Transações Acima de R$ 5 mil Serão Informadas à Receita Federal',
      category: 'Regulamentação',
      author: 'Redação InvestSavy',
      publishDate: '12 de Janeiro de 2025',
      readTime: '4 min',
      coverImage: '/placeholder.svg',
      excerpt: 'A Receita Federal implementou nova regra de monitoramento para transações PIX de valores elevados, visando maior controle fiscal. Entenda o que muda na prática.',
      impact: 'Se você faz transferências acima de R$ 5 mil, a Receita será notificada. Não é um imposto novo, mas mantenha seus comprovantes organizados para a declaração do IR.',
      content: [
        {
          type: 'text',
          content: 'A partir de janeiro de 2025, a Receita Federal passou a receber informações automáticas sobre transações PIX que ultrapassem R$ 5.000 para pessoas físicas e R$ 15.000 para pessoas jurídicas. A medida faz parte do esforço de modernização do controle fiscal brasileiro.'
        }
      ]
    }
  };

  const atualidade = atualidades[slug as keyof typeof atualidades];

  if (!atualidade) {
    return (
      <Layout>
        <div className="py-32 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Análise não encontrada</h1>
          <Link to="/atualidades" className="text-green-600 hover:text-green-700 flex items-center justify-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para atualidades</span>
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-lg leading-relaxed text-gray-800 mb-6 font-light"
          >
            {item.content}
          </motion.p>
        );
      
      case 'heading':
        return (
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="border-l-4 border-green-500 pl-8 py-6 my-10 bg-gray-50 rounded-r-lg"
          >
            <p className="text-xl italic text-gray-700 mb-3 font-light leading-relaxed">"{item.content}"</p>
            {item.author && (
              <cite className="text-sm font-medium text-green-700 not-italic">— {item.author}</cite>
            )}
          </motion.blockquote>
        );
      
      case 'list':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="my-8"
          >
            <ul className="space-y-4">
              {item.items.map((listItem: string, listIndex: number) => (
                <li key={listIndex} className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-lg text-gray-800 leading-relaxed font-light">{listItem}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      
      case 'highlight':
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-8 my-10"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-900">{item.content}</h3>
            </div>
            <p className="text-green-800 leading-relaxed font-light">{item.description}</p>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout>
      <article className="bg-white min-h-screen">
        {/* Header do Artigo */}
        <header className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Breadcrumb */}
              <div className="mb-8">
                <Link 
                  to="/atualidades" 
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar para atualidades</span>
                </Link>
              </div>

              {/* Categoria */}
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  <Globe className="w-4 h-4 mr-2" />
                  {atualidade.category}
                </span>
              </div>

              {/* Título */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8 font-serif">
                {atualidade.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl font-light">
                {atualidade.excerpt}
              </p>

              {/* Meta informações */}
              <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-500 mb-8">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{atualidade.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{atualidade.publishDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{atualidade.readTime} de leitura</span>
                </div>
                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Compartilhar</span>
                </button>
              </div>

              {/* Impact Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6" />
                  <h3 className="text-lg font-bold">Impacto no Seu Bolso</h3>
                </div>
                <p className="text-green-50 leading-relaxed font-light">
                  {atualidade.impact}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Conteúdo do Artigo */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Imagem de capa */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <img
                src={atualidade.coverImage}
                alt={atualidade.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>

            {/* Conteúdo */}
            <div className="prose prose-lg max-w-none">
              {atualidade.content.map((item, index) => renderContent(item, index))}
            </div>

            {/* Rodapé do artigo */}
            <motion.footer
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 pt-8 border-t border-gray-200"
            >
              <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Sobre a Redação</h3>
                    <p className="text-gray-600">{atualidade.author}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-light">
                  Nossa equipe de redação é especializada em traduzir notícias econômicas complexas 
                  para uma linguagem simples e acessível, sempre com foco no impacto prático 
                  para o dia a dia financeiro dos brasileiros.
                </p>
              </div>
            </motion.footer>

            {/* Navegação para outras análises */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 text-center"
            >
              <Link
                to="/atualidades"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all duration-300 hover:shadow-lg font-medium"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Ver Mais Análises</span>
              </Link>
            </motion.div>
          </div>
        </main>
      </article>
    </Layout>
  );
};

export default AtualidadeIndividual;
