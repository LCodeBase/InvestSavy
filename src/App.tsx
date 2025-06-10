import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useEffect } from "react";
import { preloadCriticalResources, measureWebVitals, optimizeScroll } from "@/utils/performance";
import { registerServiceWorker, setupNetworkStatusListeners } from "@/utils/serviceWorker";
import Index from "@/pages/Index";
import Trilhas from "@/pages/Trilhas";
import Ferramentas from "@/pages/Ferramentas";
import Artigos from "@/pages/Artigos";
import ArtigoView from "@/pages/ArtigoView";
import Contato from "@/pages/Contato";
import Sobre from "@/pages/Sobre";
import Login from "@/pages/Login";
import Cadastro from "@/pages/Cadastro";
import NotFound from "@/pages/NotFound";
import Ajuda from "@/pages/Ajuda";
import Privacidade from "@/pages/Privacidade";
import Termos from "@/pages/Termos";
import Perfil from "@/pages/Perfil";
import CalculadoraAposentadoria from "@/pages/CalculadoraAposentadoria";
import CalculadoraDividas from "@/pages/CalculadoraDividas";
import SimuladorJurosCompostos from "@/pages/SimuladorJurosCompostos";
import SimuladorFinanciamentoImobiliario from "@/pages/SimuladorFinanciamentoImobiliario";
import CalculadoraJuros from "@/pages/CalculadoraJuros";

function App() {
  useEffect(() => {
    // Inicializar otimizações de performance
    preloadCriticalResources();
    measureWebVitals();
    const cleanupScroll = optimizeScroll();
    
    // Registrar Service Worker
    registerServiceWorker();
    
    // Configurar listeners de status de rede
    const cleanupNetwork = setupNetworkStatusListeners();

    return () => {
      cleanupScroll?.();
      cleanupNetwork?.();
    };
   }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trilhas" element={<Trilhas />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/artigos" element={<Artigos />} />
          <Route path="/artigos/:id" element={<ArtigoView />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/minhas-trilhas" element={<Trilhas />} />
          <Route path="/calculadora-aposentadoria" element={<CalculadoraAposentadoria />} />
          <Route path="/calculadora-dividas" element={<CalculadoraDividas />} />
          <Route path="/calculadora-juros" element={<CalculadoraJuros />} />
          <Route path="/simulador-juros-compostos" element={<SimuladorJurosCompostos />} />
          <Route path="/simulador-financiamento-imobiliario" element={<SimuladorFinanciamentoImobiliario />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
