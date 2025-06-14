
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Clock, Calendar, ArrowLeft, BookOpen, Share2, User } from 'lucide-react';
import { motion } from 'framer-motion';

const ArtigoIndividual = () => {
  const { slug } = useParams();

  // Mock data - em um app real, isso viria de uma API baseada no slug
  const artigos = {
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

  if (!artigo) {
    return (
      <Layout>
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
