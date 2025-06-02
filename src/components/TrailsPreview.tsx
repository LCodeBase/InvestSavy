
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Users, Calendar, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrailsPreview = () => {
  const navigate = useNavigate();

  const trails = [
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
      level: "Básico",
      icon: <Calendar className="h-6 w-6" />,
      progress: 0,
      color: "finance-green",
      popular: false
    },
    {
      title: "Planejamento para Autônomos",
      description: "Organize suas finanças com renda variável e construa sua reserva",
      modules: 7,
      duration: "3 semanas",
      level: "Intermediário",
      icon: <Users className="h-6 w-6" />,
      progress: 0,
      color: "finance-blue",
      popular: false
    },
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
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Iniciante": return "bg-green-100 text-green-700";
      case "Básico": return "bg-blue-100 text-blue-700";
      case "Intermediário": return "bg-yellow-100 text-yellow-700";
      case "Avançado": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section id="trilhas" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trilhas Educativas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprenda no seu ritmo com nossos cursos práticos organizados por nível de conhecimento
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {trails.map((trail, index) => (
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

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-finance-blue text-finance-blue hover:bg-finance-blue hover:text-white"
            onClick={() => navigate('/trilhas')}
          >
            Ver Todas as Trilhas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrailsPreview;
