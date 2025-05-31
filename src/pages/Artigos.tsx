import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Book, Clock, Tag, User, Search } from "lucide-react";

const Artigos = () => {
  const categorias = [
    { id: "todos", nome: "Todos" },
    { id: "iniciantes", nome: "Para Iniciantes" },
    { id: "investimentos", nome: "Investimentos" },
    { id: "economia", nome: "Economia" },
    { id: "planejamento", nome: "Planejamento" }
  ];

  const artigos = [
    {
      title: "5 Erros Comuns de Quem Está Começando",
      description: "Evite os principais erros que iniciantes cometem ao organizar suas finanças pessoais.",
      image: "/placeholder.svg",
      category: "iniciantes",
      author: "Ana Silva",
      date: "15 de Maio, 2023",
      readTime: "6 min de leitura",
      featured: true
    },
    {
      title: "Guia Completo sobre Tesouro Direto",
      description: "Tudo o que você precisa saber para começar a investir no Tesouro Direto de forma segura.",
      image: "/placeholder.svg",
      category: "investimentos",
      author: "Carlos Mendes",
      date: "28 de Abril, 2023",
      readTime: "8 min de leitura",
      featured: false
    },
    {
      title: "Como Montar uma Reserva de Emergência",
      description: "Passo a passo para criar sua reserva de emergência e garantir segurança financeira.",
      image: "/placeholder.svg",
      category: "planejamento",
      author: "Mariana Costa",
      date: "10 de Abril, 2023",
      readTime: "5 min de leitura",
      featured: false
    },
    {
      title: "Inflação: Como Proteger seu Dinheiro",
      description: "Estratégias para proteger seu patrimônio em tempos de alta inflação.",
      image: "/placeholder.svg",
      category: "economia",
      author: "Pedro Alves",
      date: "2 de Abril, 2023",
      readTime: "7 min de leitura",
      featured: false
    },
    {
      title: "Investimentos em Renda Fixa: Guia para Iniciantes",
      description: "Conheça as principais opções de renda fixa disponíveis no mercado brasileiro.",
      image: "/placeholder.svg",
      category: "investimentos",
      author: "Juliana Martins",
      date: "25 de Março, 2023",
      readTime: "9 min de leitura",
      featured: false
    },
    {
      title: "Como Organizar as Finanças em Casal",
      description: "Dicas práticas para casais organizarem as finanças juntos e evitarem conflitos.",
      image: "/placeholder.svg",
      category: "planejamento",
      author: "Roberto e Camila",
      date: "18 de Março, 2023",
      readTime: "6 min de leitura",
      featured: false
    },
    {
      title: "Educação Financeira para Crianças",
      description: "Como ensinar conceitos financeiros para crianças de diferentes idades.",
      image: "/placeholder.svg",
      category: "iniciantes",
      author: "Fernanda Lima",
      date: "10 de Março, 2023",
      readTime: "5 min de leitura",
      featured: false
    },
    {
      title: "Entendendo a Taxa Selic e seu Impacto nos Investimentos",
      description: "Como as mudanças na taxa básica de juros afetam seus investimentos.",
      image: "/placeholder.svg",
      category: "economia",
      author: "Ricardo Souza",
      date: "1 de Março, 2023",
      readTime: "7 min de leitura",
      featured: false
    }
  ];

  // Definindo a interface para os artigos
  interface Artigo {
    title: string;
    description: string;
    image: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    featured: boolean;
  }

  const renderArtigos = (artigos: Artigo[], categoria: string = "todos") => {
    const artigosFiltrados = categoria === "todos"
      ? artigos
      : artigos.filter(artigo => artigo.category === categoria);

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {artigosFiltrados.map((artigo, index) => (
          <Card
            key={index}
            className={`card-hover overflow-hidden ${artigo.featured ? 'ring-2 ring-finance-green' : ''}`}
          >
            {artigo.featured && (
              <div className="absolute top-4 right-4 z-10 bg-finance-green text-white px-3 py-1 rounded-full text-xs font-medium">
                Destaque
              </div>
            )}

            <div className="relative h-48 bg-gray-200">
              <img
                src={artigo.image}
                alt={artigo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-finance-blue">
                {artigo.category === "iniciantes" ? "Para Iniciantes" :
                  artigo.category === "investimentos" ? "Investimentos" :
                    artigo.category === "economia" ? "Economia" : "Planejamento"}
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-gray-900 line-clamp-2">
                {artigo.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <CardDescription className="text-gray-600 line-clamp-3">
                {artigo.description}
              </CardDescription>

              <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{artigo.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{artigo.readTime}</span>
                </div>
              </div>

              <Button
                className="w-full bg-finance-blue hover:bg-finance-blue-dark text-white"
              >
                Ler Artigo
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
                Artigos e Conteúdos
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conteúdo educativo atualizado para ajudar você a entender melhor o mundo das finanças
                e tomar decisões mais inteligentes.
              </p>
            </div>

            {/* Barra de pesquisa */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar artigos..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="todos" className="w-full">
                <TabsList className="flex flex-wrap justify-center mb-8 gap-2">
                  {categorias.map((categoria) => (
                    <TabsTrigger key={categoria.id} value={categoria.id} className="px-4">
                      {categoria.nome}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categorias.map((categoria) => (
                  <TabsContent key={categoria.id} value={categoria.id}>
                    {renderArtigos(artigos, categoria.id)}
                  </TabsContent>
                ))}
              </Tabs>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Artigos;