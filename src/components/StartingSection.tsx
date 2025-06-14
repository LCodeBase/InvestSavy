
import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, TrendingUp, BarChart3, ArrowRight } from 'lucide-react';

const StartingSection = () => {
  const topics = [
    {
      title: 'Finanças Pessoais',
      description: 'Organize seu orçamento, quite dívidas e construa sua reserva de emergência',
      icon: DollarSign,
      href: '/aprenda#financas-pessoais',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Investimentos Básicos',
      description: 'Comece a investir com segurança: Tesouro Direto, CDB e primeiros passos na bolsa',
      icon: TrendingUp,
      href: '/aprenda#investimentos',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Entendendo a Economia',
      description: 'Como PIB, inflação e SELIC afetam seu dinheiro no dia a dia',
      icon: BarChart3,
      href: '/aprenda#economia',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por Onde Começar?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha seu ponto de partida e comece sua jornada rumo à independência financeira
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <Link
              key={index}
              to={topic.href}
              className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border hover:border-gray-200"
            >
              <div className={`inline-flex p-3 rounded-lg ${topic.color} mb-4`}>
                <topic.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {topic.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {topic.description}
              </p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                Começar agora
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StartingSection;
