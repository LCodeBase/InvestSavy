
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Book } from "lucide-react";

const WeeklyHighlights = () => {
  const highlights = [
    {
      type: "Trilha em Destaque",
      icon: <Book className="h-5 w-5" />,
      title: "Comece do Zero",
      description: "Aprenda a organizar suas finanças pessoais e sair das dívidas com este guia completo para iniciantes.",
      progress: "68% dos usuários completaram",
      action: "Começar Trilha",
      color: "finance-blue",
      bgColor: "bg-finance-blue/10"
    },
    {
      type: "Ferramenta da Semana",
      icon: <Calendar className="h-5 w-5" />,
      title: "Simulador de Juros Compostos",
      description: "Descubra o poder dos juros compostos e veja como pequenos aportes podem gerar grandes resultados.",
      progress: "Mais de 2.5k simulações esta semana",
      action: "Usar Ferramenta",
      color: "finance-green",
      bgColor: "bg-finance-green/10"
    },
    {
      type: "Artigo Novo",
      icon: <Users className="h-5 w-5" />,
      title: "5 Erros Comuns de Quem Está Começando",
      description: "Evite os principais erros que iniciantes cometem ao organizar suas finanças pessoais.",
      progress: "Publicado há 2 dias",
      action: "Ler Artigo",
      color: "finance-blue",
      bgColor: "bg-finance-blue/10"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Destaques da Semana
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conteúdos em destaque selecionados especialmente para acelerar seu aprendizado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <Card 
              key={index} 
              className="card-hover border-0 shadow-md bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg ${highlight.bgColor} flex items-center justify-center mb-3`}>
                  <div className={`text-${highlight.color}`}>
                    {highlight.icon}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`text-sm font-medium text-${highlight.color} uppercase tracking-wide`}>
                    {highlight.type}
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {highlight.title}
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {highlight.description}
                </CardDescription>
                
                <div className="space-y-3">
                  <div className="text-sm text-gray-500">
                    {highlight.progress}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      highlight.color === 'finance-green' 
                        ? 'bg-finance-green hover:bg-finance-green-dark' 
                        : 'bg-finance-blue hover:bg-finance-blue-dark'
                    } text-white`}
                  >
                    {highlight.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklyHighlights;
