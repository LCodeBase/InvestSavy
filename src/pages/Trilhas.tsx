import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Construction, Clock, BookOpen, Star } from "lucide-react";

const Trilhas = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            {/* Header da página */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Trilhas Educativas
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                Transforme sua vida financeira com nossos cursos práticos e didáticos.
              </p>
            </div>

            {/* Mensagem de Construção */}
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white shadow-lg border border-gray-100 text-center">
                <CardHeader className="pb-6">
                  <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                    <Construction className="h-12 w-12 text-orange-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                    Página em Construção
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Estamos trabalhando duro para trazer a você uma experiência incrível de aprendizado financeiro!
                    Nossa equipe está desenvolvendo trilhas educativas completas e interativas.
                  </p>

                  <Alert className="max-w-2xl mx-auto border-blue-200 bg-blue-50">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Em breve:</strong> Trilhas estruturadas, exercícios práticos,
                      certificados e muito mais conteúdo educativo estará disponível!
                    </AlertDescription>
                  </Alert>

                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Trilhas Completas</h3>
                      <p className="text-sm text-gray-600">Conteúdo estruturado do básico ao avançado</p>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <Star className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Exercícios Práticos</h3>
                      <p className="text-sm text-gray-600">Atividades para fixar o aprendizado</p>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                      <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Acompanhamento</h3>
                      <p className="text-sm text-gray-600">Progresso personalizado e certificados</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-500 text-sm">
                      Enquanto isso, explore nossas
                      <a href="/ferramentas" className="text-finance-blue hover:underline font-medium mx-1">
                        ferramentas financeiras
                      </a>
                      e
                      <a href="/artigos" className="text-finance-blue hover:underline font-medium mx-1">
                        artigos educativos
                      </a>
                      disponíveis!
                    </p>
                  </div>
                </CardContent>
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