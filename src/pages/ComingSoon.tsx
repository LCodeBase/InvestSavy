import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToWaitlist } from '../lib/supabase';

const ComingSoon = () => {
  const [mounted, setMounted] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const words = ['Inovação', 'Conhecimento', 'Investimentos', 'Futuro'];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, insira um email válido.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await subscribeToWaitlist(email);
      
      if (error) {
        if (error.code === '23505') { // Duplicate key error
          setErrorMessage('Este email já está cadastrado em nossa lista!');
        } else {
          setErrorMessage('Erro ao cadastrar. Tente novamente.');
        }
      } else {
        setShowSuccessMessage(true);
        setEmail('');
        // Removido o setTimeout - mensagem permanece até reload da página
      }
    } catch (error) {
      setErrorMessage('Erro ao cadastrar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Partículas flutuantes mais leves
  const particles = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30"
      animate={{
        x: [0, Math.random() * 50 - 25],
        y: [0, Math.random() * 50 - 25],
      }}
      transition={{
        duration: Math.random() * 4 + 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ));

  // Se não estiver montado, retornar loading simples
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">InvestSavy</h1>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100 relative overflow-hidden">
      {/* Partículas de fundo */}
      <div className="absolute inset-0">
        {particles}
      </div>
      
      {/* Efeito de grade animada mais sutil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300/20 to-transparent transform -skew-y-12" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-emerald-300/20 to-transparent transform skew-y-12" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Logo/Título animado */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 mb-4">
              InvestSavy
            </h1>
          </motion.div>

          {/* Subtítulo com animação de digitação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-4xl text-gray-700 mb-4">
              Em breve, uma nova era de
            </h2>
            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600"
                >
                  {words[currentWord]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Descrição */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Estamos criando algo extraordinário para revolucionar sua jornada de investimentos. 
            Prepare-se para uma experiência única em educação financeira.
          </motion.p>

          {/* Barra de progresso animada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mb-12"
          >
            <div className="w-full max-w-md mx-auto">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Progresso</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ delay: 1.2, duration: 2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Botão de notificação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mb-8"
          >
            <AnimatePresence mode="wait">
              {!showEmailForm ? (
                <motion.button
                  key="notify-button"
                  onClick={() => setShowEmailForm(true)}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Notificar-me do lançamento</span>
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="email-form"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="max-w-md mx-auto"
                >
                  {!showSuccessMessage ? (
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Digite seu melhor email"
                          className="w-full px-6 py-4 text-gray-700 bg-white border-2 border-green-200 rounded-full focus:border-green-500 focus:outline-none transition-colors duration-300 text-center"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      {errorMessage && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm text-center"
                        >
                          {errorMessage}
                        </motion.p>
                      )}
                      
                      <div className="flex space-x-3">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Enviando...</span>
                            </span>
                          ) : (
                            'Cadastrar'
                          )}
                        </motion.button>
                        
                        <motion.button
                          type="button"
                          onClick={() => setShowEmailForm(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition-all duration-300"
                        >
                          Cancelar
                        </motion.button>
                      </div>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center p-6 bg-green-50 border-2 border-green-200 rounded-2xl"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                      <h3 className="text-xl font-bold text-green-700 mb-2">
                        Obrigado pela inscrição!
                      </h3>
                      <p className="text-green-600">
                        Quando o InvestSavy estiver disponível, você será o primeiro a saber! 
                        Fique de olho na sua caixa de entrada.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="mt-16 text-gray-500 text-sm"
          >
            <p>© 2025 InvestSavy. Todos os direitos reservados.</p>
            <p className="mt-2">Transformando vidas através da educação financeira.</p>
          </motion.div>
        </div>
      </div>

      {/* Círculos decorativos animados mais suaves */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full blur-xl"
      />
      
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [360, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl"
      />
    </div>
  );
};

export default ComingSoon;
