
import { Button } from "@/components/ui/button";
import { Users, Book, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Domine suas
                <span className="text-gradient block">finanças</span>
                com conhecimento prático
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Artigos especializados, ferramentas interativas e guias práticos
                para transformar sua relação com o dinheiro. Sem cursos complexos,
                apenas conhecimento direto ao ponto.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-finance-green hover:bg-finance-green-dark text-white px-8 py-6 text-lg"
                asChild
              >
                <Link to="/trilhas">Explorar Conteúdo Gratuito</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-finance-blue text-finance-blue hover:bg-finance-blue hover:text-white px-8 py-6 text-lg"
                asChild
              >
                <Link to="/ferramentas">Usar Ferramentas Grátis</Link>
              </Button>
            </div>

            {/* Stats Atualizadas */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <Link to="/trilhas" className="text-center hover:opacity-80 transition-opacity">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-lg bg-finance-blue/10">
                  <Book className="h-6 w-6 text-finance-blue" />
                </div>
                <div className="text-2xl font-bold text-finance-blue">50+</div>
                <div className="text-sm text-gray-600">Artigos práticos</div>
              </Link>
              <Link to="/ferramentas" className="text-center hover:opacity-80 transition-opacity">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-lg bg-finance-green/10">
                  <Calendar className="h-6 w-6 text-finance-green" />
                </div>
                <div className="text-2xl font-bold text-finance-green">5+</div>
                <div className="text-sm text-gray-600">Ferramentas úteis</div>
              </Link>
              <Link to="/trilhas" className="text-center hover:opacity-80 transition-opacity">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-lg bg-finance-blue/10">
                  <Users className="h-6 w-6 text-finance-blue" />
                </div>
                <div className="text-2xl font-bold text-finance-blue">100%</div>
                <div className="text-sm text-gray-600">Gratuito</div>
              </Link>
            </div>
          </div>

          {/* Visual Atualizado */}
          <div className="relative animate-slide-in-right">
            <Link to="/trilhas" className="block">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-finance-green"></div>
                    <div className="text-sm font-medium text-gray-800">Guia: Primeiros Passos</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-finance-green rounded-full"></div>
                    <div className="h-2 bg-finance-green/60 rounded-full w-4/5"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-3/5"></div>
                  </div>
                  <div className="text-xs text-gray-600">Leitura: 5 min</div>
                </div>
              </div>
            </Link>

            {/* Floating elements atualizados */}
            <Link to="/trilhas" className="absolute -top-4 -right-4 bg-finance-green text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse-gentle">
              Novo Artigo!
            </Link>
            <Link to="/ferramentas" className="absolute -bottom-4 -left-4 bg-white shadow-lg rounded-lg p-3">
              <div className="text-xs text-gray-600">Simulação</div>
              <div className="text-lg font-bold text-finance-blue">R$ 50.000</div>
              <div className="text-xs text-finance-green">em 5 anos</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
