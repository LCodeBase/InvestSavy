import Index from "./pages/Index";
import Aprenda from "./pages/Aprenda";
import Artigos from "./pages/Artigos";
import ArtigoIndividual from "./pages/ArtigoIndividual";
import Atualidades from "./pages/Atualidades";
import AtualidadeIndividual from "./pages/AtualidadeIndividual";
import CalculadoraJuros from "./pages/CalculadoraJuros";
import ParceladoVsAVista from './pages/ParceladoVsAVista';
import OrcamentoPessoal from './pages/OrcamentoPessoal';
import Contato from "./pages/Contato";
import Ferramentas from "./pages/Ferramentas";
import NotFound from "./pages/NotFound";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import Sobre from "./pages/Sobre";
import TermosUso from "./pages/TermosUso";

export const navItems = [
  {
    title: "Início",
    to: "/",
    component: Index,
  },
  {
    title: "Aprenda",
    to: "/aprenda",
    component: Aprenda,
  },
  {
    title: "Artigos",
    to: "/artigos",
    component: Artigos,
  },
  {
    title: "Artigo Individual",
    to: "/artigos/:id",
    component: ArtigoIndividual,
  },
  {
    title: "Atualidades",
    to: "/atualidades",
    component: Atualidades,
  },
  {
    title: "Atualidade Individual",
    to: "/atualidades/:slug",
    component: AtualidadeIndividual,
  },
  {
    title: "Calculadora de Juros",
    to: "/ferramentas/calculadora-juros",
    component: CalculadoraJuros,
  },
  {
    title: "Parcelado vs À Vista",
    to: "/ferramentas/parcelado-vs-avista",
    component: ParceladoVsAVista,
  },
  {
    title: "Orçamento Pessoal",
    to: "/aprenda/orcamento-pessoal",
    component: OrcamentoPessoal,
  },
  {
    title: "Contato",
    to: "/contato",
    component: Contato,
  },
  {
    title: "Ferramentas",
    to: "/ferramentas",
    component: Ferramentas,
  },
  {
    title: "Sobre",
    to: "/sobre",
    component: Sobre,
  },
  {
    title: "Política de Privacidade",
    to: "/politica-privacidade",
    component: PoliticaPrivacidade,
  },
  {
    title: "Termos de Uso",
    to: "/termos-uso",
    component: TermosUso,
  },
  {
    title: "Página Não Encontrada",
    to: "*",
    component: NotFound,
  },
];
