
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Calculator, FileText, TrendingUp, User, Mail, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll para o topo sempre que a rota mudar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { href: '/', label: 'Início', icon: BookOpen },
    { href: '/aprenda', label: 'Aprenda', icon: BookOpen },
    { href: '/ferramentas', label: 'Ferramentas', icon: Calculator },
    { href: '/atualidades', label: 'Notícias', icon: TrendingUp },
    { href: '/sobre', label: 'Sobre', icon: User },
    { href: '/contato', label: 'Contato', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/" className="flex items-center space-x-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  InvestSavy
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-green-600 bg-green-50 shadow-sm'
                        : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden py-4 border-t border-gray-100"
              >
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-green-600 bg-green-50'
                          : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-50 to-green-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  InvestSavy
                </span>
              </Link>
              <p className="text-gray-600 mb-6 leading-relaxed max-w-md">
                Educação financeira simples, direta e sem economês. Aprenda a cuidar melhor do seu dinheiro 
                com conteúdo de qualidade e ferramentas práticas.
              </p>
              <div className="flex space-x-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <span className="text-2xl font-bold text-green-600">15+</span>
                  <p className="text-xs text-gray-600">Ferramentas</p>
                </div>
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <span className="text-2xl font-bold text-green-600">100%</span>
                  <p className="text-xs text-gray-600">Gratuito</p>
                </div>
              </div>
            </div>

            {/* Links Rápidos */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Links Rápidos</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-600 hover:text-green-600 transition-colors flex items-center space-x-2"><span>•</span><span>Início</span></Link></li>
                <li><Link to="/aprenda" className="text-gray-600 hover:text-green-600 transition-colors flex items-center space-x-2"><span>•</span><span>Aprenda</span></Link></li>
                <li><Link to="/ferramentas" className="text-gray-600 hover:text-green-600 transition-colors flex items-center space-x-2"><span>•</span><span>Ferramentas</span></Link></li>
                <li><Link to="/sobre" className="text-gray-600 hover:text-green-600 transition-colors flex items-center space-x-2"><span>•</span><span>Sobre</span></Link></li>
                <li><Link to="/contato" className="text-gray-600 hover:text-green-600 transition-colors flex items-center space-x-2"><span>•</span><span>Contato</span></Link></li>
              </ul>
            </div>

            {/* Informações */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Informações</h3>
              <ul className="space-y-3">
                <li><Link to="/politica-privacidade" className="text-gray-600 hover:text-green-600 transition-colors flex items-center space-x-2"><span>•</span><span>Política de Privacidade</span></Link></li>
                <li><Link to="/termos-uso" className="text-gray-600 hover:text-green-600 transition-colors flex items-center space-x-2"><span>•</span><span>Termos de Uso</span></Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-12 text-center">
            <p className="text-gray-500">
              &copy; 2025 InvestSavy. Todos os direitos reservados. 
              <span className="text-green-600 font-medium"> Educação financeira acessível para todos.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
