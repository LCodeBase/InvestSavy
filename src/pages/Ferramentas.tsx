
import React from 'react';
import Layout from '../components/Layout';
import { Calculator, TrendingUp, CreditCard, Target, PiggyBank, Receipt, DollarSign, BarChart3 } from 'lucide-react';

const Ferramentas = () => {
  const tools = [
    {
      id: 'juros-compostos',
      title: 'Calculadora de Juros Compostos',
      description: 'Veja como seu dinheiro cresce ao longo do tempo com o poder dos juros compostos',
      icon: TrendingUp,
      category: 'Investimentos'
    },
    {
      id: 'juros-simples', 
      title: 'Calculadora de Juros Simples',
      description: 'Calcule rendimentos com juros simples para empréstimos e aplicações básicas',
      icon: Calculator,
      category: 'Básico'
    },
    {
      id: 'dividas',
      title: 'Simulador de Dívidas',
      description: 'Compare diferentes estratégias para quitar suas dívidas mais rapidamente',
      icon: CreditCard,
      category: 'Planejamento'
    },
    {
      id: 'comparador-emprestimos',
      title: 'Comparador de Empréstimos',
      description: 'Compare taxas e condições de diferentes modalidades de crédito',
      icon: BarChart3,
      category: 'Crédito'
    },
    {
      id: 'meta-investimento',
      title: 'Meta de Investimento',
      description: 'Calcule quanto você precisa investir mensalmente para atingir seus objetivos',
      icon: Target,
      category: 'Planejamento'
    },
    {
      id: 'ir-investimentos',
      title: 'IR sobre Investimentos',
      description: 'Calcule o imposto de renda sobre seus investimentos em renda fixa e variável',
      icon: DollarSign,
      category: 'Impostos'
    },
    {
      id: 'parcelamento',
      title: 'Parcelamento de Compras',
      description: 'Descubra se vale mais a pena parcelar ou pagar à vista',
      icon: Receipt,
      category: 'Consumo'
    },
    {
      id: 'conversor',
      title: 'Conversor CDI/Selic',
      description: 'Entenda quanto seus investimentos rendem em relação aos índices de referência',
      icon: Calculator,
      category: 'Investimentos'
    }
  ];

  const categories = [...new Set(tools.map(tool => tool.category))];

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Calculator className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calculadoras e Simuladores
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ferramentas práticas para tomar decisões financeiras mais inteligentes. 
              Todas as calculadoras são gratuitas e fáceis de usar.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="space-y-12">
            {categories.map(category => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-3">
                    {category}
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tools.filter(tool => tool.category === category).map(tool => (
                    <div
                      key={tool.id}
                      id={tool.id}
                      className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border hover:border-blue-200 cursor-pointer scroll-mt-20"
                    >
                      <div className="flex items-start">
                        <div className="p-3 bg-blue-100 rounded-lg mr-4 flex-shrink-0">
                          <tool.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {tool.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {tool.description}
                          </p>
                          <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-200">
                            <div className="text-center text-gray-500">
                              <Calculator className="w-8 h-8 mx-auto mb-2" />
                              <p className="text-sm font-medium">Calculadora em Desenvolvimento</p>
                              <p className="text-xs">Em breve você poderá usar esta ferramenta</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Sugestões de Novas Ferramentas?
            </h2>
            <p className="text-blue-100 mb-6">
              Tem alguma calculadora que gostaria de ver aqui? Envie sua sugestão!
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Enviar Sugestão
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ferramentas;
