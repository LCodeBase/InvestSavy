
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Book, Home } from "lucide-react";

const ToolsPreview = () => {
  const tools = [
    {
      title: "Simulador de Juros Compostos",
      description: "Veja como seus investimentos podem crescer ao longo do tempo com o poder dos juros compostos",
      icon: <Calendar className="h-6 w-6" />,
      usage: "2.5k simulações esta semana",
      color: "finance-green",
      features: ["Cálculo em tempo real", "Gráfico interativo", "Múltiplos cenários"]
    },
    {
      title: "Calculadora de Dívidas",
      description: "Planeje o pagamento das suas dívidas e compare diferentes estratégias de quitação",
      icon: <Users className="h-6 w-6" />,
      usage: "1.8k cálculos realizados",
      color: "finance-blue",
      features: ["Múltiplas dívidas", "Estratégias de pagamento", "Economia projetada"]
    },
    {
      title: "Planejador de Orçamento",
      description: "Organize suas receitas e despesas de forma simples e visual",
      icon: <Home className="h-6 w-6" />,
      usage: "Em breve",
      color: "finance-green",
      features: ["Categorias personalizáveis", "Relatórios mensais", "Metas automáticas"],
      comingSoon: true
    },
    {
      title: "Comparador de Investimentos",
      description: "Compare diferentes produtos de investimento e escolha o melhor para seu perfil",
      icon: <Book className="h-6 w-6" />,
      usage: "Em desenvolvimento",
      color: "finance-blue",
      features: ["Base de dados atualizada", "Análise de risco", "Recomendações personalizadas"],
      comingSoon: true
    }
  ];

  return (
    <section id="ferramentas" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ferramentas Práticas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculadoras e simuladores para aplicar seus conhecimentos no dia a dia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {tools.map((tool, index) => (
            <Card 
              key={index} 
              className={`card-hover relative ${tool.comingSoon ? 'opacity-75' : ''}`}
            >
              {tool.comingSoon && (
                <div className="absolute -top-3 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Em Breve
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-${tool.color}/10 flex items-center justify-center mb-3`}>
                  <div className={`text-${tool.color}`}>
                    {tool.icon}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <CardTitle className="text-xl text-gray-900">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {tool.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-500">
                  {tool.usage}
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Recursos:</div>
                  <ul className="space-y-1">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${tool.color} mr-2`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className={`w-full ${
                    tool.comingSoon 
                      ? 'bg-gray-400 cursor-not-allowed'
                      : tool.color === 'finance-green' 
                        ? 'bg-finance-green hover:bg-finance-green-dark' 
                        : 'bg-finance-blue hover:bg-finance-blue-dark'
                  } text-white`}
                  disabled={tool.comingSoon}
                >
                  {tool.comingSoon ? 'Em Breve' : 'Usar Ferramenta'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-finance-blue text-finance-blue hover:bg-finance-blue hover:text-white"
          >
            Ver Todas as Ferramentas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsPreview;
