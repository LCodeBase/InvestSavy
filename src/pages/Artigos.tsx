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
      image: "https://pefmbddiag.blob.core.windows.net/cdn-blog-pi/output/img/materia/Melhores%20investimentos%20renda%20fixa.jpg",
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
      image: "https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "economia",
      author: "Leonardo Figueiredo",
      date: "1 de Junho, 2025",
      readTime: "9 min de leitura",
      featured: true,
    },
    {
      id: "3",
      title: "Por que o Brasil não prospera? O país do futuro que está preso no passado.",
      description: "Uma análise direta e sem ideologias sobre os entraves históricos, institucionais e culturais que limitam o desenvolvimento sustentável do Brasil.",
      image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "economia",
      author: "Leonardo Figueiredo",
      date: "3 de Junho, 2025",
      readTime: "12 min de leitura",
      featured: false,
    },
    {
      id: "4",
      title: "A Regra 50/30/20: O Método Simples para Organizar suas Finanças",
      description: "Descubra como a regra 50/30/20 pode transformar sua vida financeira, dividindo seu orçamento em necessidades, desejos e objetivos financeiros de forma simples e eficaz.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      category: "planejamento",
      author: "Leonardo Figueiredo",
      date: "25 de Junho, 2025",
      readTime: "8 min de leitura",
      featured: true,
    },
    {
      id: "5",
      title: "Como Começar sua Carreira na Área Financeira",
      description: "Um guia completo para quem deseja ingressar no mercado financeiro, com dicas sobre formação, certificações, habilidades necessárias e as profissões mais promissoras do setor.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "carreira",
      author: "Leonardo Figueiredo",
      date: "28 de Junho, 2025",
      readTime: "10 min de leitura",
      featured: false,
    },
    {
      id: "6",
      title: "Como Criar um Orçamento Pessoal: O Primeiro Passo para sua Liberdade Financeira",
      description: "Aprenda a elaborar um orçamento pessoal eficiente, acompanhar seus gastos e criar hábitos financeiros saudáveis que transformarão sua relação com o dinheiro e abrirão caminho para a realização de seus objetivos.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
      category: "iniciantes",
      author: "Leonardo Figueiredo",
      date: "30 de Junho, 2025",
      readTime: "9 min de leitura",
      featured: true,
    },
    {
      id: "7",
      title: "Tesouro Direto vs. CDB: Qual é o Melhor para Você?",
      description: "Uma análise completa comparando Tesouro Direto e CDBs: entenda as diferenças, vantagens, tributação e descubra qual opção se alinha melhor com seus objetivos financeiros.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
      category: "investimentos",
      author: "Leonardo Figueiredo",
      date: "5 de Julho, 2025",
      readTime: "10 min de leitura",
      featured: false,
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