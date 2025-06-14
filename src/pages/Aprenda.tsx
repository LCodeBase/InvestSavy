
import React from 'react';
import Layout from '../components/Layout';
import { BookOpen, DollarSign, TrendingUp, BarChart3, HelpCircle } from 'lucide-react';

const Aprenda = () => {
  const sections = [
    {
      id: 'financas-pessoais',
      title: 'Finanças Pessoais',
      icon: DollarSign,
      description: 'Fundamentos para organizar sua vida financeira',
      topics: [
        'Como fazer um orçamento pessoal',
        'Estratégias para quitar dívidas',
        'Construindo sua reserva de emergência',
        'Controle de gastos e planejamento',
        'Educação financeira para a família'
      ]
    },
    {
      id: 'investimentos',
      title: 'Investimentos Básicos',
      icon: TrendingUp,  
      description: 'Primeiros passos no mundo dos investimentos',
      topics: [
        'Tesouro Direto: Seu primeiro investimento',
        'CDB e outros investimentos de renda fixa',
        'Introdução à Bolsa de Valores',
        'Fundos de investimento explicados',
        'Diversificação de carteira'
      ]
    },
    {
      id: 'economia',
      title: 'Economia Básica',
      icon: BarChart3,
      description: 'Como a economia afeta seu bolso',
      topics: [
        'PIB: O que é e como te afeta',
        'Inflação e seu impacto no dia a dia',
        'Taxa Selic e seus investimentos', 
        'Câmbio e economia doméstica',
        'Ciclos econômicos básicos'
      ]
    }
  ];

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Área Educacional
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aprenda os fundamentos das finanças pessoais, investimentos e economia 
              de forma simples e prática. Conteúdo pensado para quem está começando.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-16">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-20">
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4">
                      <section.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.topics.map((topic, topicIndex) => (
                      <div
                        key={topicIndex}
                        className="flex items-center p-4 bg-white rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                      >
                        <BookOpen className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-800">{topic}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      📚 Em Desenvolvimento
                    </h3>
                    <p className="text-blue-800">
                      Este conteúdo está sendo preparado com muito carinho. 
                      Em breve você terá acesso a artigos detalhados, exemplos práticos e exercícios.
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Glossário */}
          <section className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <div className="flex items-center mb-6">
              <HelpCircle className="w-8 h-8 text-green-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">
                Glossário Financeiro
              </h2>
            </div>
            <p className="text-gray-600 mb-8">
              Principais termos que você precisa conhecer para navegar no mundo das finanças.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'CDI - Certificado de Depósito Interbancário',
                'IPCA - Índice de Preços ao Consumidor Amplo',
                'SELIC - Sistema Especial de Liquidação',
                'CDB - Certificado de Depósito Bancário',  
                'LCI/LCA - Letras de Crédito',
                'IOF - Imposto sobre Operações Financeiras'
              ].map((term, index) => (
                <div key={index} className="p-4 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-800">{term}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Aprenda;
