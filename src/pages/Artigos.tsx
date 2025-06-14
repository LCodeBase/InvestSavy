
import React from 'react';
import Layout from '../components/Layout';
import { FileText, BookOpen, GraduationCap, Heart, Clock } from 'lucide-react';

const Artigos = () => {
  const categories = [
    {
      id: 'livros',
      title: 'Livros Lidos',
      icon: BookOpen,
      description: 'Resenhas e principais aprendizados dos melhores livros de finanças'
    },
    {
      id: 'cursos',
      title: 'Cursos Feitos', 
      icon: GraduationCap,
      description: 'Minha experiência com cursos e certificações na área financeira'
    },
    {
      id: 'reflexoes',
      title: 'Reflexões Pessoais',
      icon: Heart,
      description: 'Pensamentos e experiências da minha jornada financeira pessoal'
    },
    {
      id: 'opinioes',
      title: 'Opiniões sobre Mercado',
      icon: FileText,
      description: 'Análises e opiniões sobre educação financeira e movimentos do mercado'
    }
  ];

  const sampleArticles = [
    {
      title: 'Resenha: "Pai Rico, Pai Pobre" - Lições que Mudaram Minha Mentalidade',
      category: 'Livros Lidos',
      excerpt: 'Uma análise crítica do clássico de Robert Kiyosaki e como aplicar seus ensinamentos no Brasil.',
      readTime: '8 min',
      date: '15 Jan 2025'
    },
    {
      title: 'Por Que Fiz o CPA-20 e Vale a Pena Para Você?',
      category: 'Cursos Feitos',
      excerpt: 'Minha experiência estudando para a certificação CPA-20 e como ela mudou meu entendimento sobre investimentos.',
      readTime: '6 min',
      date: '12 Jan 2025'
    },
    {
      title: 'Como Mudei Minha Relação com o Dinheiro aos 30 Anos',
      category: 'Reflexões Pessoais',
      excerpt: 'Uma reflexão honesta sobre os erros que cometi e as lições que aprendi na minha jornada financeira.',
      readTime: '10 min',
      date: '08 Jan 2025'
    }
  ];

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Artigos do Autor
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compartilho aqui meus aprendizados, reflexões e opiniões sobre finanças pessoais, 
              investimentos e educação financeira. Conteúdo baseado na minha experiência pessoal.
            </p>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map(category => (
              <div
                key={category.id}
                className="p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border hover:border-blue-200 cursor-pointer"
              >
                <div className="p-3 bg-blue-100 rounded-lg inline-block mb-4">
                  <category.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          {/* Sample Articles */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Artigos Recentes</h2>
            <div className="space-y-6">
              {sampleArticles.map((article, index) => (
                <article key={index} className="group cursor-pointer">
                  <div className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{article.readTime}</span>
                      <span className="mx-2">•</span>
                      <span>{article.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Coming Soon */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center">
            <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Conteúdo em Desenvolvimento
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Estou preparando artigos com muito carinho baseados nos livros que li, 
              cursos que fiz e experiências que vivi. Em breve você terá acesso a todo esse conteúdo.
            </p>
            <div className="bg-white p-4 rounded-lg inline-block">
              <p className="text-sm text-gray-500">
                <strong>Próximos artigos:</strong> Resenha do livro "O Investidor Inteligente", 
                Minha experiência com ações, Reflexões sobre consumismo
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Artigos;
