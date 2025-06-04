import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BookOpen, Play, Headphones, Calculator, ExternalLink,
  Star, Clock, Users, Award, TrendingUp, DollarSign,
  PiggyBank, BarChart3, Lightbulb, FileText, Target,
  CheckCircle, ArrowRight, Globe, AlertCircle, GraduationCap,
  Brain, Zap, Building2
} from "lucide-react";
import { useState } from "react";

const Trilhas = () => {
  const [activeTrail, setActiveTrail] = useState("fundamentos");

  const trails = {
    fundamentos: {
      title: "🟢 Comece por Aqui: Fundamentos de Educação Financeira",
      description: "Ensine os conceitos básicos de finanças pessoais, orçamento, consumo consciente e como lidar com dívidas.",
      icon: GraduationCap,
      color: "bg-green-50 border-green-200",
      level: "Iniciante Total",
      duration: "2-4 semanas",
      resources: [
        {
          title: "Cidadania Financeira – Banco Central",
          description: "Portal oficial do governo com cursos gratuitos sobre educação financeira, planejamento e uso consciente do dinheiro.",
          type: "course",
          provider: "Banco Central do Brasil",
          duration: "Autoestudo",
          rating: 4.9,
          url: "https://www.cidadaniafinanceira.gov.br/educacao",
          highlights: ["Certificado oficial", "Conteúdo atualizado", "Exercícios práticos"]
        },
        {
          title: "Curso de Educação Financeira – CVM",
          description: "Aprenda sobre investimentos, mercado de capitais e proteção ao investidor com a autoridade reguladora.",
          type: "course",
          provider: "Comissão de Valores Mobiliários",
          duration: "20 horas",
          rating: 4.8,
          url: "https://www.gov.br/cvm/pt-br/assuntos/educacao/cursos-e-eventos",
          highlights: ["Gratuito", "Certificado", "Órgão oficial"]
        },
        {
          title: "Educação Financeira para Todos – FGV",
          description: "Curso completo da Fundação Getúlio Vargas sobre planejamento financeiro pessoal e familiar.",
          type: "course",
          provider: "Fundação Getúlio Vargas",
          duration: "40 horas",
          rating: 4.7,
          url: "https://educacao-executiva.fgv.br/cursos/gratuitos/educacao-financeira",
          highlights: ["Universidade renomada", "Metodologia acadêmica", "Casos práticos"]
        },
        {
          title: "Canal Economista Sincero – Série Educação Financeira",
          description: "Vídeos didáticos e descontraídos sobre conceitos básicos de finanças pessoais e investimentos.",
          type: "video",
          provider: "YouTube - Economista Sincero",
          duration: "50+ vídeos",
          rating: 4.6,
          url: "https://www.youtube.com/@EconomistaSincero",
          highlights: ["Linguagem simples", "Exemplos práticos", "Conteúdo atualizado"]
        },
        {
          title: "Canal Investidor Sardinha – Iniciantes",
          description: "Conteúdo introdutório sobre bolsa de valores, investimentos e educação financeira de forma descomplicada.",
          type: "video",
          provider: "YouTube - Investidor Sardinha",
          duration: "100+ vídeos",
          rating: 4.5,
          url: "https://www.youtube.com/@InvestidorSardinhaOficial",
          highlights: ["Didático", "Para iniciantes", "Casos reais"]
        }
      ]
    },
    economia: {
      title: "🔵 Introdução à Economia: Macroeconomia para Todos",
      description: "Entenda como funciona a economia brasileira e mundial, inflação, juros e políticas econômicas.",
      icon: BarChart3,
      color: "bg-blue-50 border-blue-200",
      level: "Intermediário",
      duration: "3-5 semanas",
      resources: [
        {
          title: "Noções de Economia – FGV",
          description: "Curso introdutório sobre princípios econômicos, mercados e políticas públicas.",
          type: "course",
          provider: "Fundação Getúlio Vargas",
          duration: "30 horas",
          rating: 4.8,
          url: "https://educacao-executiva.fgv.br/cursos/gratuitos/nocoes-economia",
          highlights: ["Base acadêmica sólida", "Professores renomados", "Certificado"]
        },
        {
          title: "Curso de Economia – USP (Prof. João Sayad)",
          description: "Aulas completas sobre macroeconomia, crescimento econômico e desenvolvimento.",
          type: "video",
          provider: "Universidade de São Paulo",
          duration: "70+ aulas",
          rating: 4.9,
          url: "https://www.youtube.com/watch?v=yMiWup5SxaU&list=PLAudUnJeNg4vWPm7Au0XhkoS58yHprEvN",
          highlights: ["Professor especialista", "Conteúdo universitário", "Análises atuais"]
        },
        {
          title: "Economia em 10 Lições – UNICAMP",
          description: "Perfeito para quem deseja começar a estudar economia, inclusive o composto por não economistas, estudantes e profissionais de outras carreiras ou que estão começando.",
          type: "video",
          provider: "Ebook",
          duration: "473 páginas",
          rating: 4.9,
          url: "https://www.economia.unicamp.br/images/publicacoes/Livros/geral/Economia%20em%2010%20Licoes.pdf",
          highlights: ["Linguagem acessível", "Análises semanais", "Contexto brasileiro"]
        },
        {
          title: "Metodologia da Economia - Aulas UNIVESP e USP",
          description: "Curso universitário sobre microeconomia, macroeconomia e economia brasileira.",
          type: "video",
          provider: "Universidade Virtual do Estado de São Paulo",
          duration: "60+ aulas",
          rating: 4.7,
          url: "https://www.youtube.com/playlist?list=PLAudUnJeNg4tjKbMfW3FQmQyQ_-p3l0ie",
          highlights: ["Ensino superior público", "Metodologia acadêmica", "Gratuito"]
        }
      ]
    },
    investimentos: {
      title: "🟠 Primeiros Passos em Investimentos",
      description: "Aprenda sobre diferentes tipos de investimentos, renda fixa, ações e como montar sua carteira.",
      icon: TrendingUp,
      color: "bg-orange-50 border-orange-200",
      level: "Intermediário",
      duration: "4-6 semanas",
      resources: [
        {
          title: "Tesouro Direto na Prática – Canal Clube do Valor",
          description: "Aprenda a investir em títulos públicos, simulações e estratégias para diferentes perfis.",
          type: "video",
          provider: "YouTube - Clube do Valor",
          duration: "20+ vídeos",
          rating: 4.8,
          url: "https://www.youtube.com/@ClubedoValor",
          highlights: ["Foco em renda fixa", "Simulações práticas", "Estratégias conservadoras"]
        },
        {
          title: "Curso de Investimentos – XP Educação",
          description: "Playlist completa sobre diferentes tipos de investimentos e análise de mercado.",
          type: "video",
          provider: "XP Investimentos",
          duration: "15+ vídeos",
          rating: 4.7,
          url: "https://www.youtube.com/playlist?list=PLDE7B4AC7F050FAB6",
          highlights: ["Corretora líder", "Análises profissionais", "Mercado atual"]
        },
        {
          title: "Guia do Investidor Iniciante – Economista Sincero",
          description: "Série específica para quem está começando a investir, com dicas práticas e erros comuns.",
          type: "video",
          provider: "YouTube - Economista Sincero",
          duration: "25+ vídeos",
          rating: 4.6,
          url: "https://www.youtube.com/playlist?list=PLS_J2tqGqO8A3gy9fh0TwwODIcm_b1wfk",
          highlights: ["Para iniciantes", "Erros comuns", "Linguagem simples"]
        },
        {
          title: "Curso de Finanças Pessoais e Investimentos – IFSP",
          description: "Curso técnico sobre planejamento financeiro e estratégias de investimento.",
          type: "course",
          provider: "Instituto Federal de São Paulo",
          duration: "60 horas",
          rating: 4.8,
          url: "https://mooc.ifsp.edu.br/course/view.php?id=67",
          highlights: ["Ensino técnico", "Certificado oficial", "Conteúdo aprofundado"]
        }
      ]
    },
    mentalidade: {
      title: "🟣 Mentalidade e Planejamento Financeiro",
      description: "Desenvolva a mentalidade correta para o sucesso financeiro e aprenda técnicas avançadas de planejamento.",
      icon: Brain,
      color: "bg-purple-50 border-purple-200",
      level: "Avançado",
      duration: "3-4 semanas",
      resources: [
        {
          title: "Curso de Planejamento Financeiro – Itaú Educação Financeira",
          description: "Metodologias avançadas de planejamento financeiro pessoal e familiar.",
          type: "course",
          provider: "Itaú Unibanco",
          duration: "+25 horas",
          rating: 4.7,
          url: "https://api.whatsapp.com/send/?phone=551132300145&text=Quero+fazer+a+aTrilha+Viver+Mais%21&type=phone_number&app_absent=0",
          highlights: ["Banco líder", "Metodologia própria", "Casos práticos"]
        },
        {
          title: "Curso de Psicologia Econômica – UNESP",
          description: "Entenda como a psicologia influencia decisões financeiras e de investimento.",
          type: "video",
          provider: "Universidade Estadual Paulista",
          duration: "20+ aulas",
          rating: 4.8,
          url: "https://www.youtube.com/playlist?list=PLFqC5zKkJgzBOvD3spzJ7PytdVAgCQPK_",
          highlights: ["Base científica", "Comportamento financeiro", "Universidade pública"]
        },
        {
          title: "Série Mentalidade do Investidor – Clube do Valor",
          description: "Desenvolva a mentalidade correta para investimentos de longo prazo e disciplina financeira.",
          type: "video",
          provider: "YouTube - Clube do Valor",
          duration: "15+ vídeos",
          rating: 4.6,
          url: "https://www.youtube.com/playlist?list=PLqx3u3gRQn3D_wxzRCoGm9wK9wev8AW9U",
          highlights: ["Mentalidade de longo prazo", "Disciplina financeira", "Casos de sucesso"]
        }
      ]
    }
  };

  interface Resource {
    type: 'video' | 'course' | 'podcast';
    title: string;
    description: string;
    provider: string;
    duration: string;
    rating: number;
    url: string;
    highlights?: string[];
  }

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const typeConfig = {
      video: { icon: Play, label: "Vídeo", color: "bg-red-100 text-red-700" },
      course: { icon: BookOpen, label: "Curso", color: "bg-blue-100 text-blue-700" },
      podcast: { icon: Headphones, label: "Podcast", color: "bg-purple-100 text-purple-700" }
    };

    const config = typeConfig[resource.type as keyof typeof typeConfig] || typeConfig.course;
    const Icon = config.icon;

    return (
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={config.color}>
                  <Icon className="w-3 h-3 mr-1" />
                  {config.label}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{resource.rating}</span>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
                {resource.provider} • {resource.duration}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            {resource.description}
          </p>

          {resource.highlights && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {resource.highlights.map((highlight: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button
            className="w-full"
            onClick={() => window.open(resource.url, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Acessar Conteúdo
          </Button>
        </CardContent>
      </Card>
    );
  };

  interface Trail {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    level: string;
    duration: string;
    resources: Resource[];
  }

  const TrailHeader = ({ trail }: { trail: Trail }) => {
    const Icon = trail.icon;
    return (
      <div className={`p-6 rounded-lg ${trail.color} mb-6`}>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <Icon className="w-8 h-8 text-gray-700" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{trail.title}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{trail.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Nível:</span> {trail.level}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Duração:</span> {trail.duration}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Recursos:</span> {trail.resources.length} conteúdos
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 mt-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 Trilhas de Aprendizado Financeiro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Aprenda sobre finanças, economia e investimentos através de trilhas organizadas e progressivas.
            Todo o conteúdo é <strong>100% gratuito</strong> e de alta qualidade.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">4</div>
            <div className="text-sm text-gray-600">Trilhas Organizadas</div>
          </Card>
          <Card className="text-center p-6">
            <div className="flex items-center justify-center mb-2">
              <Play className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">16</div>
            <div className="text-sm text-gray-600">Recursos Gratuitos</div>
          </Card>
          <Card className="text-center p-6">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">4.7</div>
            <div className="text-sm text-gray-600">Avaliação Média</div>
          </Card>
          <Card className="text-center p-6">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">100+</div>
            <div className="text-sm text-gray-600">Estudantes Ativos</div>
          </Card>
        </div>

        {/* Trail Navigation */}
        <Tabs value={activeTrail} onValueChange={setActiveTrail} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
            {Object.entries(trails).map(([key, trail]) => {
              const Icon = trail.icon;
              return (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2 p-4">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{trail.title.split(':')[0]}</span>
                  <span className="sm:hidden">{key === 'fundamentos' ? 'Início' : key === 'economia' ? 'Economia' : key === 'investimentos' ? 'Investir' : 'Mentalidade'}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(trails).map(([key, trail]) => (
            <TabsContent key={key} value={key}>
              <TrailHeader trail={trail as Trail} />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trail.resources.map((resource, index) => (
                  <ResourceCard key={index} resource={resource as Resource} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Learning Path Guide */}
        <Card className="mt-12 p-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Como Seguir as Trilhas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-green-500" />
                  Sequência Recomendada
                </h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    Comece pelos <strong>Fundamentos</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    Entenda a <strong>Economia</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    Aprenda sobre <strong>Investimentos</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    Desenvolva a <strong>Mentalidade</strong>
                  </li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  Dicas de Estudo
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    Dedique pelo menos 30 minutos por dia
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    Faça anotações dos conceitos principais
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    Pratique com simuladores e planilhas
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    Participe de comunidades online
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Alert className="mt-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Importante:</strong> Todo o conteúdo listado é gratuito e de fontes confiáveis.
            Sempre faça sua própria pesquisa antes de tomar decisões financeiras.
            Este site não oferece consultoria financeira personalizada.
          </AlertDescription>
        </Alert>
      </main>

      <Footer />
    </div >
  );
};

export default Trilhas;