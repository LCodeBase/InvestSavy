import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Trilhas = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Trilhas Educativas
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Aprenda no seu ritmo com nossos cursos práticos organizados por nível de conhecimento.
                Cada trilha foi cuidadosamente desenvolvida para guiar seu aprendizado financeiro.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="p-12 text-center bg-white shadow-md border border-gray-100">
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="w-24 h-24 rounded-full bg-finance-blue/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-finance-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Página em Desenvolvimento</h2>
                  <p className="text-gray-600 max-w-lg">
                    Estamos trabalhando para trazer as melhores trilhas educativas para você.
                    O conteúdo será implementado em breve com trilhas para todos os níveis de conhecimento financeiro.
                  </p>
                  <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-finance-blue" style={{ width: '70%' }}></div>
                  </div>
                  <p className="text-sm text-gray-500">70% concluído</p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Trilhas;