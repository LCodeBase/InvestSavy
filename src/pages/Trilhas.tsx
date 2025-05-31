import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Users, Calendar, Home, Award, BarChart, TrendingUp, Briefcase } from "lucide-react";

const Trilhas = () => {
  const categorias = [
    { id: "iniciantes", nome: "Iniciantes" },
    { id: "intermediario", nome: "Intermediário" },
    { id: "avancado", nome: "Avançado" },
    { id: "especializado", nome: "Especializado" }
  ];

  const trilhasIniciantes = [
    {
      title: "Comece do Zero",
      description: "Para quem está endividado, sem reserva ou nunca organizou as finanças",
      modules: 6,
      duration: "2 semanas",
      level: "Iniciante",
      icon: <Home className="h-6 w-6" />,
      progress: 0,
      color: "finance-blue",
      popular: true
    },
    {
      title: "Primeiros Investimentos",
      description: "Entenda Tesouro Direto, CDBs e outros produtos para iniciantes",
      modules: 8,
      duration: "3 semanas",
      level: "Iniciante",
      icon: <Calendar className="h-6 w-6" />,
      progress: 0,
      color: "finance-green",
      popular: false
    },
    {
      title: "Orçamento Familiar",
      description: "Aprenda a organizar as finanças da família e economizar no dia a dia",
      modules: 5,
      duration: "2 semanas",
      level: "Iniciante",
      icon: <Users className="h-6 w-6" />,
      progress: 0,
      color: "finance-blue",
      popular: false
    }
  ];

  const trilhasIntermediario = [
    {
      title: "Planejamento para Autônomos",
      description: "Organize suas finanças com renda variável e construa sua reserva",
      modules: 7,
      duration: "3 semanas",
      level: "Intermediário",
      icon: <Briefcase className="h-6 w-6" />,
      progress: 0,
      color: "finance-blue",
      popular: false
    },
    {
      title: "Renda Fixa Avançada",
      description: "Diversifique sua carteira com diferentes tipos de renda fixa",
      modules: 6,
      duration: "3 semanas",
      level: "Intermediário",
      icon: <BarChart className="h-6 w-6" />,
      progress: 0,
      color: "finance-green",
      popular: false
    },
    {
      title: "Investimentos Internacionais",
      description: "Primeiros passos para investir no exterior de forma segura",
      modules: 8,
      duration: "4 semanas",
      level: "Intermediário",
      icon: <TrendingUp className="h-6 w-6" />,
      progress: 0,
      color: "finance-blue",
      popular: true
    }
  ];

  const trilhasAvancado = [
    {
      title: "Investidor Consistente",
      description: "Fundamentos para criar uma estratégia de investimento sólida",
      modules: 10,
      duration: "4 semanas",
      level: "Avançado",
      icon: <Book className="h-6 w-6" />,
      progress: 0,
      color: "finance-green",
      popular: false
    },
    {
      title: "Renda Variável Profissional",
      description: "Análise fundamentalista e técnica para investir em ações",
      modules: 12,
      duration: "6 semanas",
      level: "Avançado",
      icon: <TrendingUp className="h-6 w-6" />,
      progress: 0,
      color: "finance-blue",
      popular: true
    }
  ];

  const trilhasEspecializado = [
    {
      title: "Planejamento para Aposentadoria",
      description: "Estratégias para garantir uma aposentadoria tranquila e próspera",
      modules: 8,
      duration: "4 semanas",
      level: "Especializado",
      icon: <Award className="h-6 w-6" />,
      progress: 0,
      color: "finance-green",
      popular: false
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Iniciante": return "bg-green-100 text-green-700";
      case "Intermediário": return "bg-blue-100 text-blue-700";
      case "Avançado": return "bg-yellow-100 text-yellow-700";
      case "Especializado": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const renderTrilhas = (trilhas: {
    title: string;
    description: string;
    modules: number;
    duration: string;
    level: string;
    icon: JSX.Element;
    progress: number;
    color: string;
    popular: boolean;
  }[]) => {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {trilhas.map((trail, index) => (
          <Card
            key={index}
            className={`card-hover relative ${trail.popular ? 'ring-2 ring-finance-green' : ''}`}
          >
            {trail.popular && (
              <div className="absolute -top-3 left-4 bg-finance-green text-white px-3 py-1 rounded-full text-sm font-medium">
                Mais Popular
              </div>
            )}

            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-lg bg-${trail.color}/10 flex items-center justify-center`}>
                  <div className={`text-${trail.color}`}>
                    {trail.icon}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(trail.level)}`}>
                  {trail.level}
                </span>
              </div>

              <div className="space-y-2 mt-4">
                <CardTitle className="text-xl text-gray-900">
                  {trail.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {trail.description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{trail.modules} módulos</span>
                <span>{trail.duration}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-${trail.color} h-2 rounded-full`}
                  style={{ width: `${trail.progress}%` }}
                ></div>
              </div>

              <Button
                className={`w-full ${trail.color === 'finance-green'
                  ? 'bg-finance-green hover:bg-finance-green-dark'
                  : 'bg-finance-blue hover:bg-finance-blue-dark'
                  } text-white`}
              >
                {trail.progress > 0 ? 'Continuar' : 'Começar Trilha'}
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
                Trilhas Educativas
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Aprenda no seu ritmo com nossos cursos práticos organizados por nível de conhecimento.
                Cada trilha foi cuidadosamente desenvolvida para guiar seu aprendizado financeiro.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="iniciantes" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  {categorias.map((categoria) => (
                    <TabsTrigger key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="iniciantes">
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg mb-8">
                      <h2 className="text-xl font-semibold text-green-700 mb-2">Trilhas para Iniciantes</h2>
                      <p className="text-green-600">Perfeitas para quem está começando sua jornada financeira. Conceitos básicos e práticas fundamentais.</p>
                    </div>
                    {renderTrilhas(trilhasIniciantes)}
                  </div>
                </TabsContent>
                <TabsContent value="intermediario">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg mb-8">
                      <h2 className="text-xl font-semibold text-blue-700 mb-2">Trilhas Intermediárias</h2>
                      <p className="text-blue-600">Para quem já tem conhecimentos básicos e quer aprofundar em estratégias mais elaboradas.</p>
                    </div>
                    {renderTrilhas(trilhasIntermediario)}
                  </div>
                </TabsContent>
                <TabsContent value="avancado">
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg mb-8">
                      <h2 className="text-xl font-semibold text-yellow-700 mb-2">Trilhas Avançadas</h2>
                      <p className="text-yellow-600">Conteúdo aprofundado para quem já tem experiência e busca estratégias sofisticadas.</p>
                    </div>
                    {renderTrilhas(trilhasAvancado)}
                  </div>
                </TabsContent>
                <TabsContent value="especializado">
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg mb-8">
                      <h2 className="text-xl font-semibold text-purple-700 mb-2">Trilhas Especializadas</h2>
                      <p className="text-purple-600">Conteúdo focado em necessidades específicas e momentos particulares da vida financeira.</p>
                    </div>
                    {renderTrilhas(trilhasEspecializado)}
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

export default Trilhas;