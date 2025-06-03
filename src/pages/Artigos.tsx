import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Book, Clock, Tag, User, Search } from "lucide-react";
import { Link } from "react-router-dom"; // Importar o Link do react-router-dom

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
      id: "0", // Adicionar ID para cada artigo
      title: "O Roubo que Ninguém Liga: O Escândalo Bilionário do INSS",
      description: "Neste artigo, você entende como esse golpe foi possível, quem são os envolvidos, quais os impactos para o país e por que a sociedade precisa acordar agora.",
      image: "https://www.jornalopcao.com.br/assets/2024/07/PREVIDENCIA_INSS-1536x768-1.jpg",
      category: "economia",
      author: "Leonardo Figueiredo",
      date: "02 de Junho, 2025",
      readTime: "10 min de leitura",
      featured: true
    },
    {
      id: "1",
      title: "Investimentos em Renda Fixa: Guia para Iniciantes",
      description: "Descubra como começar a investir em renda fixa, entenda os diferentes tipos de investimentos disponíveis e aprenda estratégias para maximizar seus rendimentos com segurança.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      category: "investimentos",
      author: "Leonardo Figueiredo",
      date: "31 de Maio, 2025",
      readTime: "8 min de leitura",
      featured: true,
    },
    {
      id: "2",
      title: "Entendendo a Taxa Selic e seu Impacto nos Investimentos",
      description: "Descubra o que é a taxa Selic, como ela é definida, por que é considerada a taxa básica de juros da economia brasileira e como suas variações afetam seus investimentos e decisões financeiras.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "economia",
      author: "Leonardo Figueiredo",
      date: "1 de Junho, 2025",
      readTime: "9 min de leitura",
      featured: true,
    },
    {
      id: "3",
      title: "Porque o Brasil não prospera?",
      description: "Uma análise profunda sobre os fatores estruturais que impedem o desenvolvimento econômico e social do Brasil, desde a desigualdade histórica até os problemas institucionais que travam nosso potencial.",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "economia",
      author: "Leonardo Figueiredo",
      date: "2 de Junho, 2025",
      readTime: "12 min de leitura",
      featured: false,
    },
    {
      id: "4",
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
      id: "5",
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
      id: "6",
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
      id: "7",
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
    id: string; // Adicionar ID na interface
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

              {/* Substituir o Button por um Link que redireciona para a página de visualização */}
              <Link to={`/artigos/${artigo.id}`}>
                <Button
                  className="w-full bg-finance-blue hover:bg-finance-blue-dark text-white"
                >
                  Ler Artigo
                </Button>
              </Link>
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