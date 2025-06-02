import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Trilhas from "@/pages/Trilhas";
import Ferramentas from "@/pages/Ferramentas";
import Artigos from "@/pages/Artigos";
import ArtigoView from "@/pages/ArtigoView";
import Contato from "@/pages/Contato";
import Login from "@/pages/Login";
import Cadastro from "@/pages/Cadastro";
import NotFound from "@/pages/NotFound";
import Ajuda from "@/pages/Ajuda";
import Privacidade from "@/pages/Privacidade";
import Termos from "@/pages/Termos";
import Perfil from "@/pages/Perfil"; // Importar a nova página de Perfil

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trilhas" element={<Trilhas />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/artigos" element={<Artigos />} />
          <Route path="/artigos/:id" element={<ArtigoView />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/perfil" element={<Perfil />} /> {/* Nova rota para a página de Perfil */}
          <Route path="/minhas-trilhas" element={<Trilhas />} /> {/* Rota para Minhas Trilhas que redireciona para Trilhas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
