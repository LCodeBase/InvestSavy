
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, PiggyBank, CreditCard, TrendingUp, Target, Receipt, Zap, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const ToolsSection = () => {
  const tools = [
    {
      title: 'Juros Compostos',
      description: 'Veja como seu dinheiro cresce ao longo do tempo',
      icon: TrendingUp,
      href: '/ferramentas#juros-compostos',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Simulador de Dívidas',
      description: 'Compare formas de quitar suas dívidas',
      icon: CreditCard,
      href: '/ferramentas#dividas',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Meta de Investimento',
      description: 'Calcule quanto investir para atingir seus objetivos',
      icon: Target,
      href: '/ferramentas#meta-investimento',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      title: 'Reserva de Emergência',
      description: 'Descubra o valor ideal para sua reserva',
      icon: PiggyBank,
      href: '/ferramentas#reserva-emergencia',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Parcelamento vs À Vista',
      description: 'Descubra se vale a pena parcelar',
      icon: Receipt,
      href: '/ferramentas#parcelamento',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Conversor CDI/Selic',
      description: 'Entenda os rendimentos dos seus investimentos',
      icon: Calculator,
      href: '/ferramentas#conversor',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
            <Wrench className="w-4 h-4 mr-2" />
            Ferramentas Práticas
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Calculadoras que 
            <span className="text-green-600"> Facilitam sua Vida</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tome decisões financeiras inteligentes com nossas ferramentas práticas e fáceis de usar
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="group"
            >
              <Link
                to={tool.href}
                className="block h-full"
              >
                <div className={`${tool.bgColor} rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-300 border border-gray-100`}>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
                      <tool.icon className={`w-6 h-6 ${tool.color}`} />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Zap className="w-4 h-4 mr-2" />
                    Usar agora
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/ferramentas"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Ver Todas as Ferramentas
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsSection;
