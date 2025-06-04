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
  CheckCircle, ArrowRight, Globe, AlertCircle
} from "lucide-react";
import { useState } from "react";

const Trilhas = () => {
  const [activeTab, setActiveTab] = useState("iniciantes");

  const resourceTypes = {
    video: { icon: Play, label: "Vídeo", color: "bg-red-100 text-red-700" },
    podcast: { icon: Headphones, label: "Podcast", color: "bg-purple-100 text-purple-700" },
    course: { icon: BookOpen, label: "Curso", color: "bg-blue-100 text-blue-700" },
    tool: { icon: Calculator, label: "Ferramenta", color: "bg-green-100 text-green-700" },
    article: { icon: FileText, label: "Artigo", color: "bg-orange-100 text-orange-700" },
    book: { icon: BookOpen, label: "Livro", color: "bg-indigo-100 text-indigo-700" }
  };

  const beginnerResources = [
    {
      title: "Economista Sincero - Investimentos e Finanças",
      description: "Canal do Youtube que busca passar a informação sobre a bolsa de valores e investimentos em um geral e, também deixar o clima bem descontraído!.",
      type: "video",
      provider: "YouTube - Economista Sincero",
      duration: "Vídeos diários",
      rating: 5.0,
      students: "1M+",
      url: "https://www.youtube.com/@economistasincero/videos",
      free: true,
      recommended: true
    },
    {
      title: "Investidor sardinha - Bolsa de valores e diversificação",
      description: "Canal do Youtube que ele gosta de passar as informações sobre a bolsa de valores e investimentos em um geral e, também deixar o clima bem descontraído!.",
      type: "video",
      provider: "YouTube - Primo Rico",
      duration: "Vídeos diários",
      rating: 5.0,
      students: "1M+",
      url: "https://www.youtube.com/@investidorsardinha/videos",
      free: true,
      recommended: true
    },
    {
      title: "Planilha de Controle Financeiro",
      description: "Planilha gratuita para organizar receitas, despesas e metas financeiras. Fácil de usar e personalizar.",
      type: "tool",
      provider: "SEBRAE",
      duration: "Download",
      rating: 4.7,
      students: "100k+",
      url: "https://sebraepr.com.br/planilhas/controle-financeiro/",
      free: true,
      recommended: true
    },
    {
      title: "Gustavo Cerbasi - Dinheiro: Os Segredos de Quem Tem",
      description: "Livro digital gratuito com dicas práticas sobre como organizar as finanças e construir patrimônio.",
      type: "book",
      provider: "Gustavo Cerbasi",
      duration: "200 páginas",
      rating: 4.6,
      students: "500k+",
      url: "https://www.gustavocerbasi.com.br/livros-gratuitos/",
      free: true,
      recommended: true
    },
    {
      title: "Serasa - Curso de Educação Financeira",
      description: "Curso online gratuito com certificado sobre planejamento financeiro, controle de gastos e investimentos básicos.",
      type: "course",
      provider: "Serasa",
      duration: "8 horas",
      rating: 4.5,
      students: "300k+",
      url: "https://www.serasa.com.br/ensina/",
      free: true,
      recommended: false
    },
    {
      title: "Calculadora do Cidadão - Banco Central",
      description: "Ferramenta oficial para cálculos financeiros: juros, financiamentos, poupança e correção de valores.",
      type: "tool",
      provider: "Banco Central do Brasil",
      duration: "Online",
      rating: 4.8,
      students: "1M+",
      url: "https://www3.bcb.gov.br/CALCIDADAO/publico/exibirFormCorrecaoValores.do",
      free: true,
      recommended: true
    },
    {
      title: "Fundação Getúlio Vargas - Matemática Financeira",
      description: "Curso gratuito de matemática financeira aplicada com exercícios práticos e certificado.",
      type: "course",
      provider: "FGV",
      duration: "40 horas",
      rating: 4.6,
      students: "80k+",
      url: "https://educacao-executiva.fgv.br/busca?keys=matematica+financeira",
      free: true,
      recommended: true
    },
    {
      title: "Manual de Educação Financeira - Banco Central",
      description: "Guia oficial completo sobre educação financeira, planejamento e uso consciente do dinheiro.",
      type: "book",
      provider: "Banco Central do Brasil",
      duration: "150 páginas",
      rating: 4.9,
      students: "2M+",
      url: "https://www.bcb.gov.br/pre/pef/port/caderno_cidadania_financeira.pdf",
      free: true,
      recommended: true
    }
  ];

  const investmentResources = [
    {
      title: "Primeiros Passos na Bolsa",
      description: "Ebook gratuito da B3 explicando como funciona a bolsa de valores e como começar a investir em ações.",
      type: "book",
      provider: "B3",
      duration: "50 páginas",
      rating: 4.8,
      students: "200k+",
      url: "https://www.b3.com.br/pt_br/educacao/",
      free: true,
      recommended: true
    },
    {
      title: "Simulador Tesouro Direto",
      description: "Ferramenta oficial para simular investimentos em títulos públicos e entender rentabilidade.",
      type: "tool",
      provider: "Tesouro Nacional",
      duration: "Online",
      rating: 4.9,
      students: "500k+",
      url: "https://www.tesourodireto.com.br/simulador/",
      free: true,
      recommended: true
    },
    {
      title: "Tiago Reis - Investimentos para Iniciantes",
      description: "Série completa sobre investimentos básicos: renda fixa, ações, fundos e estratégias para começar.",
      type: "video",
      provider: "YouTube - Suno Research",
      duration: "20+ vídeos",
      rating: 4.7,
      students: "1M+",
      url: "https://youtube.com/c/SunoResearch",
      free: true,
      recommended: true
    },
    {
      title: "Coursera - Financial Markets",
      description: "Curso da Universidade de Yale sobre mercados financeiros, com certificado gratuito disponível.",
      type: "course",
      provider: "Yale University",
      duration: "33 horas",
      rating: 4.8,
      students: "400k+",
      url: "https://www.coursera.org/learn/financial-markets-global",
      free: true,
      recommended: true
    },
    {
      title: "CVM - Investidor Iniciante",
      description: "Portal oficial da CVM com guias completos sobre todos os tipos de investimentos disponíveis no Brasil.",
      type: "article",
      provider: "Comissão de Valores Mobiliários",
      duration: "100+ artigos",
      rating: 4.6,
      students: "800k+",
      url: "https://www.investidor.gov.br/",
      free: true,
      recommended: true
    },
    {
      title: "Bastter.com - Investimentos de Longo Prazo",
      description: "Comunidade gratuita focada em investimentos de longo prazo com filosofia buy and hold.",
      type: "article",
      provider: "Bastter.com",
      duration: "Acesso livre",
      rating: 4.5,
      students: "200k+",
      url: "https://www.bastter.com/",
      free: true,
      recommended: false
    },
    {
      title: "Anbima - Como Investir",
      description: "Portal educativo da Anbima com guias sobre fundos de investimento, renda fixa e mercado de capitais.",
      type: "article",
      provider: "Anbima",
      duration: "50+ guias",
      rating: 4.7,
      students: "300k+",
      url: "https://comoinvestir.anbima.com.br/",
      free: true,
      recommended: true
    },
    {
      title: "Simulador de Investimentos - CVM",
      description: "Ferramenta oficial para simular diferentes tipos de investimentos e comparar rentabilidades.",
      type: "tool",
      provider: "Comissão de Valores Mobiliários",
      duration: "Online",
      rating: 4.6,
      students: "150k+",
      url: "https://simulador.investidor.gov.br/",
      free: true,
      recommended: true
    }
  ];

  const economyResources = [
    {
      title: "PrimoCast",
      description: "Podcast semanal com conversas sobre economia, negócios e investimentos com especialistas do mercado.",
      type: "podcast",
      provider: "Primo Rico",
      duration: "Episódios 1h",
      rating: 4.8,
      students: "500k+",
      url: "https://open.spotify.com/show/primocast",
      free: true,
      recommended: true
    },
    {
      title: "Ideias Radicais",
      description: "Canal com explicações sobre economia, política econômica e análises de mercado com viés liberal.",
      type: "video",
      provider: "YouTube - Rafael Lima",
      duration: "200+ vídeos",
      rating: 4.6,
      students: "800k+",
      url: "https://youtube.com/c/IdeiasRadicais",
      free: true,
      recommended: true
    },
    {
      title: "Instituto Mises - Política Econômica",
      description: "Playlist sobre fundamentos da economia austríaca e análises da política econômica brasileira.",
      type: "video",
      provider: "Instituto Mises Brasil",
      duration: "50+ vídeos",
      rating: 4.7,
      students: "300k+",
      url: "https://youtube.com/c/InstitutoMisesBrasil",
      free: true,
      recommended: true
    },
    {
      title: "Banco Central - Relatórios e Estudos",
      description: "Acesso gratuito a relatórios econômicos, estudos e análises oficiais sobre a economia brasileira.",
      type: "article",
      provider: "Banco Central do Brasil",
      duration: "Acesso livre",
      rating: 4.8,
      students: "100k+",
      url: "https://www.bcb.gov.br/publicacoes",
      free: true,
      recommended: true
    },
    {
      title: "FEA-USP - Aulas Abertas de Economia",
      description: "Aulas gratuitas de professores da USP sobre macroeconomia, microeconomia e economia brasileira.",
      type: "video",
      provider: "Universidade de São Paulo",
      duration: "30+ aulas",
      rating: 4.9,
      students: "150k+",
      url: "https://www.youtube.com/c/FEAUSP",
      free: true,
      recommended: true
    },
    {
      title: "Mises Podcast",
      description: "Podcast semanal com discussões sobre economia austríaca, liberdade econômica e análises de mercado.",
      type: "podcast",
      provider: "Instituto Mises Brasil",
      duration: "Episódios 45min",
      rating: 4.6,
      students: "200k+",
      url: "https://open.spotify.com/show/mises-podcast",
      free: true,
      recommended: false
    },
    {
      title: "IBGE - Estatísticas Econômicas",
      description: "Dados oficiais sobre economia brasileira: PIB, inflação, emprego e indicadores econômicos.",
      type: "article",
      provider: "Instituto Brasileiro de Geografia e Estatística",
      duration: "Acesso livre",
      rating: 4.8,
      students: "500k+",
      url: "https://www.ibge.gov.br/estatisticas/economicas.html",
      free: true,
      recommended: true
    },
    {
      title: "Manual de Economia - USP",
      description: "Material didático gratuito da USP sobre princípios de economia, micro e macroeconomia.",
      type: "book",
      provider: "Universidade de São Paulo",
      duration: "300 páginas",
      rating: 4.7,
      students: "80k+",
      url: "https://www.fea.usp.br/economia/graduacao/disciplinas",
      free: true,
      recommended: true
    }
  ];

  const ResourceCard = ({ resource }) => {
    const typeConfig = resourceTypes[resource.type];
    const IconComponent = typeConfig.icon;

    return (
      <Card className="h-full hover:shadow-lg transition-all duration-200 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Badge className={typeConfig.color}>
                <IconComponent className="h-3 w-3 mr-1" />
                {typeConfig.label}
              </Badge>
              <Badge className="bg-green-100 text-green-700">100% Gratuito</Badge>
              {resource.recommended && (
                <Badge className="bg-yellow-100 text-yellow-700">
                  <Star className="h-3 w-3 mr-1" />
                  Recomendado
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="text-lg group-hover:text-finance-blue transition-colors">
            {resource.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {resource.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Provedor:</span>
              <span className="font-medium">{resource.provider}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Duração:</span>
              <span className="font-medium">{resource.duration}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Avaliação:</span>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                <span className="font-medium">{resource.rating}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Estudantes:</span>
              <span className="font-medium">{resource.students}</span>
            </div>
            <Button
              className="w-full mt-4"
              onClick={() => window.open(resource.url, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Acessar Conteúdo
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            {/* Header da página */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Recursos Educativos Gratuitos
              </h1>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-6">
                Uma curadoria especial de conteúdos 100% gratuitos e de alta qualidade para você
                aprender sobre finanças, investimentos e economia. Acreditamos que educação financeira
                deve ser acessível a todos, independente da condição financeira.
              </p>

              <Alert className="max-w-3xl mx-auto border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Compromisso:</strong> Todos os recursos desta página são 100% gratuitos.
                  Nosso objetivo é democratizar o acesso à educação financeira de qualidade.
                </AlertDescription>
              </Alert>
            </div>

            {/* Estatísticas */}
            <div className="grid md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">70+ Recursos</div>
                <div className="text-sm text-gray-600">Curados pela equipe</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">100% Gratuitos</div>
                <div className="text-sm text-gray-600">Acesso totalmente livre</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">10M+ Alunos</div>
                <div className="text-sm text-gray-600">Já aprenderam</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Atualizado</div>
                <div className="text-sm text-gray-600">Semanalmente</div>
              </div>
            </div>

            {/* Conteúdo por categorias */}
            <div className="max-w-7xl mx-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="iniciantes" className="flex items-center">
                    <PiggyBank className="h-4 w-4 mr-2" />
                    Para Iniciantes
                  </TabsTrigger>
                  <TabsTrigger value="investimentos" className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Investimentos
                  </TabsTrigger>
                  <TabsTrigger value="economia" className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Economia & Mercado
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="iniciantes" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <PiggyBank className="h-6 w-6 mr-3 text-green-600" />
                      Para Iniciantes
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Recursos fundamentais para quem está começando a jornada de educação financeira.
                      Aprenda sobre orçamento, controle de gastos e primeiros passos - tudo gratuito!
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {beginnerResources.map((resource, index) => (
                        <ResourceCard key={index} resource={resource} />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="investimentos" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="h-6 w-6 mr-3 text-blue-600" />
                      Investimentos Básicos
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Conteúdos para quem já tem o básico organizado e quer começar a investir.
                      Renda fixa, ações, fundos e estratégias - tudo sem custo algum!
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {investmentResources.map((resource, index) => (
                        <ResourceCard key={index} resource={resource} />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="economia" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="h-6 w-6 mr-3 text-purple-600" />
                      Economia e Mercado
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Aprofunde seus conhecimentos em economia, política econômica e análise de mercado.
                      Conteúdos com viés liberal e foco em pensamento crítico - totalmente gratuitos!
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {economyResources.map((resource, index) => (
                        <ResourceCard key={index} resource={resource} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Seção de sugestões */}
            <div className="max-w-4xl mx-auto mt-16">
              <Card className="p-8 bg-gradient-to-r from-finance-blue/5 to-finance-green/5 border border-finance-blue/20">
                <div className="text-center">
                  <Globe className="h-12 w-12 text-finance-blue mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Conhece algum recurso gratuito incrível?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ajude nossa comunidade! Envie sugestões de conteúdos educativos gratuitos e de qualidade
                    que você conhece. Juntos, podemos democratizar ainda mais o acesso à educação financeira.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => window.open('/contato', '_blank')}
                      className="bg-finance-blue hover:bg-finance-blue/90"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Enviar Sugestão
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open('https://instagram.com/investsavy', '_blank')}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Seguir no Instagram
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Disclaimer */}
            <div className="max-w-4xl mx-auto mt-8">
              <Alert className="border-gray-200 bg-gray-50">
                <AlertCircle className="h-4 w-4 text-gray-600" />
                <AlertDescription className="text-gray-700 text-sm">
                  <strong>Aviso:</strong> Todos os recursos externos são de propriedade de seus respectivos criadores.
                  Não nos responsabilizamos pelo conteúdo de sites terceiros. Esta é uma curadoria educativa
                  que visa facilitar o acesso a conteúdos gratuitos de qualidade.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Trilhas;