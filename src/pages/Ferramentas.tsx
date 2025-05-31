import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Book, Home, Calculator, PieChart, TrendingUp, DollarSign, Percent } from "lucide-react";

const Ferramentas = () => {
  const categorias = [
    { id: "calculadoras", nome: "Calculadoras" },
    { id: "simuladores", nome: "Simuladores" },
    { id: "planejadores", nome: "Planejadores" }
  ];

  const calculadoras = [
    {
      title: "Calculadora de Dívidas",
      description: "Planeje o pagamento das suas dívidas e compare diferentes estratégias de quitação",
      icon: <Calculator className="h-6 w-6" />,
      usage: "1.8k cálculos realizados",
      color: "finance-blue",
      features: ["Múltiplas dívidas", "Estratégias de pagamento", "Economia projetada"],
      comingSoon: false
    },
    {
      title: "Calculadora de Aposentadoria",
      description: "Descubra quanto você precisa poupar mensalmente para atingir sua meta de aposentadoria",
      icon: <Users className="h-6 w-6" />,
      usage: "950 cálculos realizados",
      color: "finance-green",
      features: ["Projeção personalizada", "Ajuste para inflação", "Diferentes cenários"],
      comingSoon: false
    },
    {
      title: "Calculadora de Imposto de Renda",
      description: "Estime quanto você pagará de imposto de renda sobre seus investimentos e rendimentos",
      icon: <DollarSign className="h-6 w-6" />,
      usage: "Em desenvolvimento",
      color: "finance-blue",
      features: ["Diferentes tipos de rendimentos", "Deduções automáticas", "Relatório detalhado"],
      comingSoon: true
    }
  ];

  const simuladores = [
    {
      title: "Simulador de Juros Compostos",
      description: "Veja como seus investimentos podem crescer ao longo do tempo com o poder dos juros compostos",
      icon: <Percent className="h-6 w-6" />,
      usage: "2.5k simulações esta semana",
      color: "finance-green",
      features: ["Cálculo em tempo real", "Gráfico interativo", "Múltiplos cenários"],
      comingSoon: false
    },
    {
      title: "Simulador de Financiamento Imobiliário",
      description: "Compare diferentes opções de financiamento e encontre a melhor para seu perfil",
      icon: <Home className="h-6 w-6" />,
      usage: "1.2k simulações realizadas",
      color: "finance-blue",
      features: ["Diferentes sistemas de amortização", "Comparação visual", "Economia total"],
      comingSoon: false
    },
    {
      title: "Simulador de Carteira de Investimentos",
      description: "Teste diferentes alocações de ativos e veja o desempenho histórico",
      icon: <TrendingUp className="h-6 w-6" />,
      usage: "Em breve",
      color: "finance-green",
      features: ["Dados históricos reais", "Análise de risco", "Rebalanceamento automático"],
      comingSoon: true
    }
  ];

  const planejadores = [
    {
      title: "Planejador de Orçamento",
      description: "Organize suas receitas e despesas de forma simples e visual",
      icon: <PieChart className="h-6 w-6" />,
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

  // Definindo a interface para as ferramentas
  interface Ferramenta {
    title: string;
    description: string;
    icon: React.ReactNode;
    usage: string;
    color: string;
    features: string[];
    comingSoon?: boolean;
  }

  const renderFerramentas = (ferramentas: Ferramenta[]) => {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {ferramentas.map((tool, index) => (
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
                  {tool.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${tool.color} mr-2`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className={`w-full ${tool.comingSoon
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
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Ferramentas Práticas
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Calculadoras, simuladores e planejadores para aplicar seus conhecimentos financeiros
                no dia a dia e tomar decisões mais inteligentes.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="calculadoras" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  {categorias.map((categoria) => (
                    <TabsTrigger key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="calculadoras">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg mb-8">
                      <h2 className="text-xl font-semibold text-blue-700 mb-2">Calculadoras Financeiras</h2>
                      <p className="text-blue-600">Ferramentas para cálculos precisos que ajudam a tomar decisões financeiras informadas.</p>
                    </div>
                    {renderFerramentas(calculadoras)}
                  </div>
                </TabsContent>
                <TabsContent value="simuladores">
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg mb-8">
                      <h2 className="text-xl font-semibold text-green-700 mb-2">Simuladores Interativos</h2>
                      <p className="text-green-600">Teste diferentes cenários e visualize resultados antes de tomar decisões importantes.</p>
                    </div>
                    {renderFerramentas(simuladores)}
                  </div>
                </TabsContent>
                <TabsContent value="planejadores">
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg mb-8">
                      <h2 className="text-xl font-semibold text-purple-700 mb-2">Planejadores Financeiros</h2>
                      <p className="text-purple-600">Organize suas finanças e crie estratégias de longo prazo com estas ferramentas.</p>
                    </div>
                    {renderFerramentas(planejadores)}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Ferramentas;