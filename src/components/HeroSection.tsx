
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Target, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.2 }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.4 }
  };

  return (
    <section className="min-h-[70vh] bg-gradient-to-br from-white via-green-50 to-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div {...fadeInLeft} className="space-y-8">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium"
              >
                <Award className="w-4 h-4 mr-2" />
                Educação Financeira de Qualidade
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Domine Suas
                <span className="block text-green-600 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Finanças
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl">
                Aprenda a cuidar do seu dinheiro com conteúdo direto, 
                ferramentas práticas e <strong className="text-green-600">sem economês complicado</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/aprenda"
                  className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-2xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/ferramentas"
                  className="inline-flex items-center px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-2xl hover:bg-green-50 transition-all duration-300"
                >
                  Ver Ferramentas
                  <TrendingUp className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">15+</div>
                <div className="text-sm text-gray-600">Ferramentas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Gratuito</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">0</div>
                <div className="text-sm text-gray-600">Economês</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Visual Elements */}
          <motion.div {...fadeInRight} className="relative">
            <div className="relative z-10">
              {/* Main Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-auto"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Seu Progresso</h3>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Reserva de Emergência</span>
                      <span className="text-green-600 font-semibold">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="bg-green-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Meta de Investimento</span>
                      <span className="text-green-600 font-semibold">62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "62%" }}
                        transition={{ duration: 1.5, delay: 1.2 }}
                        className="bg-green-600 h-2 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold">Total Investido</span>
                      <span className="text-2xl font-bold text-green-600">R$ 45.280</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -top-4 -right-4 bg-green-600 text-white p-4 rounded-2xl shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span className="font-semibold">Meta Atingida!</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-4 -left-4 bg-white border border-green-200 p-4 rounded-2xl shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Protegido</span>
                </div>
              </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
