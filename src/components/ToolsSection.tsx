
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, PiggyBank, CreditCard, TrendingUp, Target, Receipt } from 'lucide-react';

const ToolsSection = () => {
  const tools = [
    {
      title: 'Juros Compostos',
      description: 'Veja como seu dinheiro cresce ao longo do tempo',
      icon: TrendingUp,
      href: '/ferramentas#juros-compostos'
    },
    {
      title: 'Simulador de Dívidas',
      description: 'Compare formas de quitar suas dívidas',
      icon: CreditCard,
      href: '/ferramentas#dividas'
    },
    {
      title: 'Meta de Investimento',
      description: 'Calcule quanto investir para atingir seus objetivos',
      icon: Target,
      href: '/ferramentas#meta-investimento'
    },
    {
      title: 'Reserva de Emergência',
      description: 'Descubra o valor ideal para sua reserva',
      icon: PiggyBank,
      href: '/ferramentas#reserva-emergencia'
    },
    {
      title: 'Parcelamento vs À Vista',
      description: 'Descubra se vale a pena parcelar',
      icon: Receipt,
      href: '/ferramentas#parcelamento'
    },
    {
      title: 'Conversor CDI/Selic',
      description: 'Entenda os rendimentos dos seus investimentos',
      icon: Calculator,
      href: '/ferramentas#conversor'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ferramentas Mais Usadas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculadoras práticas para tomar decisões financeiras inteligentes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link
              key={index}
              to={tool.href}
              className="group p-6 bg-white rounded-lg hover:shadow-md transition-all duration-300 border hover:border-blue-200"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <tool.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">
                  {tool.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/ferramentas"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Todas as Ferramentas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
