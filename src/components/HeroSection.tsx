
import { Button } from "@/components/ui/button";
import { Users, Book, Calendar } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transforme sua 
                <span className="text-gradient block">vida financeira</span>
                com educação prática
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Aprenda educação financeira de forma simples e prática. 
                Trilhas interativas, ferramentas úteis e conteúdo voltado 
                para quem está começando do zero.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-finance-green hover:bg-finance-green-dark text-white px-8 py-6 text-lg"
              >
                Comece Agora Grátis
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-finance-blue text-finance-blue hover:bg-finance-blue hover:text-white px-8 py-6 text-lg"
              >
                Ver Trilhas
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-lg bg-finance-blue/10">
                  <Users className="h-6 w-6 text-finance-blue" />
                </div>
                <div className="text-2xl font-bold text-finance-blue">10k+</div>
                <div className="text-sm text-gray-600">Usuários ativos</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-lg bg-finance-green/10">
                  <Book className="h-6 w-6 text-finance-green" />
                </div>
                <div className="text-2xl font-bold text-finance-green">15+</div>
                <div className="text-sm text-gray-600">Trilhas educativas</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-lg bg-finance-blue/10">
                  <Calendar className="h-6 w-6 text-finance-blue" />
                </div>
                <div className="text-2xl font-bold text-finance-blue">100%</div>
                <div className="text-sm text-gray-600">Gratuito</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative animate-slide-in-right">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-finance-green"></div>
                  <div className="text-sm font-medium text-gray-800">Trilha: Comece do Zero</div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-finance-green rounded-full"></div>
                  <div className="h-2 bg-finance-green/60 rounded-full w-4/5"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-3/5"></div>
                </div>
                <div className="text-xs text-gray-600">Progresso: 65% completo</div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-finance-green text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse-gentle">
              Novo!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white shadow-lg rounded-lg p-3">
              <div className="text-xs text-gray-600">Meta do mês</div>
              <div className="text-lg font-bold text-finance-blue">R$ 500</div>
              <div className="text-xs text-finance-green">+12% este mês</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
