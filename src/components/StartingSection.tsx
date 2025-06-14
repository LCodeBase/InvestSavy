
import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, TrendingUp, BarChart3, ArrowRight, BookOpen, Target, PiggyBank } from 'lucide-react';
import { motion } from 'framer-motion';

const StartingSection = () => {
  const topics = [
    {
      title: 'Finanças Pessoais',
      description: 'Organize seu orçamento, quite dívidas e construa sua reserva de emergência',
      icon: PiggyBank,
      href: '/aprenda#financas-pessoais',
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Investimentos Básicos',
      description: 'Comece a investir com segurança: Tesouro Direto, CDB e primeiros passos na bolsa',
      icon: TrendingUp,
      href: '/aprenda#investimentos',
      gradient: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Entendendo a Economia',
      description: 'Como PIB, inflação e SELIC afetam seu dinheiro no dia a dia',
      icon: BarChart3,
      href: '/aprenda#economia',
      gradient: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Comece Sua Jornada
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Por Onde Começar?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha seu ponto de partida e comece sua jornada rumo à 
            <span className="text-green-600 font-semibold"> independência financeira</span>
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <Link
                to={topic.href}
                className="block h-full"
              >
                <div className={`${topic.bgColor} rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-500 border border-gray-100`}>
                  <div className={`inline-flex p-4 bg-gradient-to-r ${topic.gradient} rounded-2xl mb-6 shadow-lg`}>
                    <topic.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    {topic.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {topic.description}
                  </p>
                  
                  <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                    Começar agora
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-green-100 max-w-2xl mx-auto">
            <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Não sabe por onde começar?
            </h3>
            <p className="text-gray-600 mb-6">
              Recomendamos começar sempre pelas <strong>Finanças Pessoais</strong> - 
              é a base sólida para tudo que vem depois.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/aprenda#financas-pessoais"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300"
              >
                Começar pelas Finanças Pessoais
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StartingSection;
