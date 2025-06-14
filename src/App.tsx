
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Aprenda from "./pages/Aprenda";
import Ferramentas from "./pages/Ferramentas";
import Artigos from "./pages/Artigos";
import ArtigoIndividual from "./pages/ArtigoIndividual";
import Atualidades from "./pages/Atualidades";
import AtualidadeIndividual from "./pages/AtualidadeIndividual";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/aprenda" element={<Aprenda />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/artigos" element={<Artigos />} />
          <Route path="/artigos/:slug" element={<ArtigoIndividual />} />
          <Route path="/atualidades" element={<Atualidades />} />
          <Route path="/atualidades/:slug" element={<AtualidadeIndividual />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-de-uso" element={<TermosUso />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
