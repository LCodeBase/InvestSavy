
import React from 'react';
import { CheckCircle, Heart, Users, Lightbulb, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const InstitutionalSection = () => {
  const values = [
    {
      icon: Zap,
      title: 'Simples',
      description: 'Sem economês complicado ou jargões técnicos desnecessários'
    },
    {
      icon: Heart,
      title: 'Direto',
      description: 'Informação prática que você pode aplicar hoje mesmo'
    },
    {
      icon: Users,
      title: 'Acessível',
      description: 'Educação financeira para todos, independente da renda'
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
    <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-emerald-700 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white opacity-5 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full text-white text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4 mr-2" />
            Nossa Filosofia
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simples, Direto e Sem Economês
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Acreditamos que educação financeira deve ser para todos. Por isso, criamos conteúdo 
            que qualquer pessoa pode entender e aplicar na sua vida financeira.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {values.map((value, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex p-6 bg-white bg-opacity-20 rounded-2xl mb-6 group-hover:bg-opacity-30 transition-all duration-300"
              >
                <value.icon className="w-10 h-10" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
              <p className="text-green-100 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-4xl mx-auto border border-white border-opacity-20">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex p-4 bg-white bg-opacity-20 rounded-2xl mb-6"
            >
              <Shield className="w-8 h-8" />
            </motion.div>
            
            <h3 className="text-3xl font-bold mb-6">Nossa Missão</h3>
            <p className="text-lg text-green-100 leading-relaxed mb-8">
              Democratizar a educação financeira no Brasil, oferecendo conteúdo de qualidade, 
              ferramentas práticas e uma comunidade que apoia o crescimento financeiro de todos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-green-200 text-sm">Gratuito</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-white mb-2">0</div>
                <div className="text-green-200 text-sm">Pegadinhas</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-white mb-2">∞</div>
                <div className="text-green-200 text-sm">Aprendizado</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstitutionalSection;
