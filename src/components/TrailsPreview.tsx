
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Users, Calendar, Home, Target, BarChart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrailsPreview = () => {
  const navigate = useNavigate();

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Iniciante": return "bg-green-100 text-green-700";
      case "Básico": return "bg-blue-100 text-blue-700";
      case "Intermediário": return "bg-yellow-100 text-yellow-700";
      case "Avançado": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const contentCategories = [
    {
      title: "Primeiros Passos",
      description: "Artigos essenciais para quem está começando a organizar as finanças",
      articles: 12,
      readTime: "3-5 min cada",
      level: "Iniciante",
      icon: <Home className="h-6 w-6" />,
      color: "finance-blue",
      popular: true,
      topics: ["Orçamento pessoal", "Controle de gastos", "Reserva de emergência"]
    },
    {
      title: "Investimentos Básicos",
      description: "Guias práticos sobre Tesouro Direto, CDBs e primeiros investimentos",
      articles: 15,
      readTime: "5-8 min cada",
      level: "Básico",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "finance-green",
      popular: false,
      topics: ["Tesouro Direto", "CDBs", "Fundos de investimento"]
    },
    {
      title: "Planejamento Avançado",
      description: "Estratégias para objetivos de longo prazo e otimização fiscal",
      articles: 10,
      readTime: "8-12 min cada",
      level: "Intermediário",
      icon: <Target className="h-6 w-6" />,
      color: "finance-blue",
      popular: false,
      topics: ["Aposentadoria", "Imposto de renda", "Diversificação"]
    },
    {
      title: "Análises de Mercado",
      description: "Insights sobre economia, mercado financeiro e oportunidades",
      articles: 8,
      readTime: "6-10 min cada",
      level: "Avançado",
      icon: <BarChart className="h-6 w-6" />,
      color: "finance-green",
      popular: false,
      topics: ["Análise econômica", "Tendências", "Oportunidades"]
    }
  ];

  return (
    <section id="conteudo" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Guias Práticos de Educação Financeira
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Artigos especializados e guias práticos organizados por tema.
            Conhecimento direto ao ponto, sem enrolação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {contentCategories.map((category, index) => (
            <Card
              key={index}
              className={`card-hover relative ${category.popular ? 'ring-2 ring-finance-green' : ''}`}
            >
              {category.popular && (
                <div className="absolute -top-3 left-4 bg-finance-green text-white px-3 py-1 rounded-full text-sm font-medium">
                  Mais Lidos
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-lg bg-${category.color}/10 flex items-center justify-center`}>
                    <div className={`text-${category.color}`}>
                      {category.icon}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(category.level)}`}>
                    {category.level}
                  </span>
                </div>

                <div className="space-y-2 mt-4">
                  <CardTitle className="text-xl text-gray-900">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {category.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{category.articles} artigos</span>
                  <span>{category.readTime}</span>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Temas abordados:</div>
                  <div className="flex flex-wrap gap-1">
                    {category.topics.map((topic, topicIndex) => (
                      <span key={topicIndex} className={`px-2 py-1 text-xs rounded-full bg-${category.color}/10 text-${category.color}`}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  className={`w-full ${category.color === 'finance-green'
                    ? 'bg-finance-green hover:bg-finance-green-dark'
                    : 'bg-finance-blue hover:bg-finance-blue-dark'
                    } text-white`}
                  onClick={() => navigate('/trilhas')}
                >
                  Explorar Artigos
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
            Ver Todo o Conteúdo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrailsPreview;
