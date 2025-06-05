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
          title: "Educação Financeira - Fundação Bradesco",
          description: "Curso gratuito e online que ensina noções básicas de finanças pessoais, com certificado autenticado grátis! Oferecido pela Fundação Bradesco, instituição filantrópica que promove educação de qualidade e inclusão social.",
          type: "course",
          provider: "Fundação Bradesco",
          duration: "4 horas",
          rating: 5.0,
          url: "https://www.ev.org.br/cursos/educacao-financeira",
          highlights: ["Certificado oficial", "Conteúdo atualizado", "100% Qualidade"]
        },
        {
          title: "Como fazer investimentos - FGV",
          description: "Curso gratuito e online da FGV que ensina conceitos básicos de investimentos, ideal para quem está começando agora, nesse mundo. Oferecido pela Fundação Getulio Vargas, referência em educação de qualidade no Brasil.",
          type: "course",
          provider: "Fundação Getúlio Vargas",
          duration: "12 horas",
          rating: 5.0,
          url: "https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online/como-fazer-investimentos-1",
          highlights: ["Gratuito", "100% Qualidade", "Declaração de Conclusão"]
        },
        {
          title: "Assistente Administrativo - SENAC",
          description: "Curso que capacita o aluno para atuar em atividades administrativas, como organização de documentos, atendimento ao público e apoio à gestão. Oferecido pelo Senac, referência nacional em educação profissional e inclusão no mercado de trabalho.",
          type: "course",
          provider: "Senac",
          duration: "160 horas",
          rating: 5.0,
          url: "https://www.ead.senac.br/gratuito/assistente-administrativo/",
          highlights: ["Universidade renomada", "Metodologia acadêmica", "Certificado Oficial"]
        },

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
          description: "Curso introdutório sobre princípios econômicos e matemáticos do  mercado financeiro.",
          type: "course",
          provider: "Fundação Getúlio Vargas",
          duration: "30 horas",
          rating: 4.8,
          url: "https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online/matematica-conceitos-gerais-sobre-funcoes",
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
          duration: "2200+ vídeos",
          rating: 4.9,
          url: "https://www.youtube.com/watch?v=x1btXV3OnwE",
          highlights: ["Foco em renda fixa", "Simulações práticas", "Estratégias conservadoras"]
        },
        {
          title: "Livro de introdução à Economia – PNAP",
          description: "Aborda os principais conceitos da economia, desde o básico ao avançado.",
          type: "ebook",
          provider: "PNAP",
          duration: "180+ páginas",
          rating: 4.3,
          url: "https://educapes.capes.gov.br/bitstream/capes/145347/1/PNAP%20-%20Bacharelado%20-%20Introducao%20a%20Economia.pdf",
          highlights: ["Básico", "Análises profissionais", "Mercado atual"]
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
        },

        {
          title: "Canal Investidor Sardinha - Bolsa de valores e investimentos.",
          description: "Os vídeos explicam de forma direta e bem-humorada os principais conceitos da bolsa de valores, tipos de ativos, e estratégias simples para investir com segurança. O canal também traz análises de casos reais e situações do cotidiano financeiro.",
          type: "video",
          provider: "YouTube - Investidor Sardinha",
          duration: "2500+ vídeos",
          rating: 5.0,
          url: "https://www.youtube.com/@investidorsardinha/videos",
          highlights: ["Didático", "Exemplos práticos", "linguagem acessível", "Conteúdo atualizado"]
        },
        {
          title: "Canal Economista Sincero – Série Educação Financeira",
          description: "Com uma abordagem clara e objetiva, o canal cobre temas essenciais como orçamento pessoal, investimentos, dívidas e politica, sempre com uma pitada de humor e crítica construtiva.",
          type: "video",
          provider: "YouTube - Economista Sincero",
          duration: "3200+ vídeos",
          rating: 5.0,
          url: "https://www.youtube.com/@EconomistaSincero",
          highlights: ["Didático", "Exemplos práticos", "linguagem acessível", "Conteúdo atualizado"]
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
      <div className={`p-4 sm:p-6 rounded-lg ${trail.color} mb-4 sm:mb-6`}>
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-white rounded-lg shadow-sm flex-shrink-0 self-center sm:self-start">
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
          </div>
          <div className="flex-1 w-full text-center sm:text-left">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 leading-tight">
              {trail.title}
            </h2>
            <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
              {trail.description}
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center justify-center sm:justify-start gap-1">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                <span className="font-medium">Nível:</span>
                <span className="text-gray-800">{trail.level}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                <span className="font-medium">Duração:</span>
                <span className="text-gray-800">{trail.duration}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
                <span className="font-medium">Recursos:</span>
                <span className="text-gray-800">{trail.resources.length} conteúdos</span>
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
            <div className="text-2xl font-bold text-gray-800">4.8</div>
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
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8 h-auto gap-1 p-1">
            {Object.entries(trails).map(([key, trail]) => {
              const Icon = trail.icon;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex flex-col items-center justify-center gap-1 p-2 sm:p-3 h-auto min-h-[60px] sm:min-h-[50px] text-xs sm:text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-center leading-tight break-words max-w-full">
                    {key === 'fundamentos' ? 'Fundamentos' :
                      key === 'economia' ? 'Economia' :
                        key === 'investimentos' ? 'Investimentos' : 'Mentalidade'}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(trails).map(([key, trail]) => (
            <TabsContent key={key} value={key} className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
              <TrailHeader trail={trail as Trail} />

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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