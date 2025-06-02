import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar, Tag, ArrowLeft } from "lucide-react";

// Interface para os artigos
interface Artigo {
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  content?: string; // Conteúdo completo do artigo
}

const ArtigoView = () => {
  const { id } = useParams<{ id: string }>();
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando busca de dados do artigo
    // Em um ambiente real, você buscaria esses dados de uma API ou banco de dados
    const artigos = [
      {
        id: "0",
        title: "5 Erros Comuns de Quem Está Começando",
        description: "Evite os principais erros que iniciantes cometem ao organizar suas finanças pessoais.",
        image: "/placeholder.svg",
        category: "iniciantes",
        author: "Ana Silva",
        date: "15 de Maio, 2023",
        readTime: "6 min de leitura",
        featured: true,
        content: `
          <h2>Introdução</h2>
          <p>Organizar as finanças pessoais pode parecer uma tarefa assustadora para quem está começando. Muitas pessoas cometem erros que podem comprometer sua saúde financeira a longo prazo.</p>

          <h2>1. Não ter um orçamento</h2>
          <p>Um dos erros mais comuns é não ter um orçamento claro. Sem saber exatamente quanto você ganha e gasta, é impossível planejar adequadamente suas finanças.</p>
          <p>A solução é simples: crie uma planilha ou use um aplicativo para registrar todas as suas receitas e despesas. Categorize seus gastos e revise mensalmente.</p>

          <h2>2. Não ter uma reserva de emergência</h2>
          <p>Muitas pessoas ignoram a importância de ter uma reserva para emergências. Isso pode levar a endividamento quando surgem gastos inesperados.</p>
          <p>O ideal é ter pelo menos 6 meses de despesas guardados em investimentos de alta liquidez, como um CDB de liquidez diária ou um fundo DI.</p>

          <h2>3. Usar o cartão de crédito sem controle</h2>
          <p>O cartão de crédito pode ser uma ferramenta útil, mas também pode se tornar uma armadilha. Muitos iniciantes acabam gastando mais do que podem pagar.</p>
          <p>Use o cartão de crédito apenas para compras planejadas e nunca gaste mais do que você teria disponível em sua conta corrente.</p>

          <h2>4. Não investir por medo ou falta de conhecimento</h2>
          <p>Deixar o dinheiro parado na conta corrente é um erro comum. Com o tempo, a inflação corrói o poder de compra do seu dinheiro.</p>
          <p>Comece com investimentos simples e de baixo risco, como Tesouro Direto ou CDBs. À medida que seu conhecimento aumenta, você pode diversificar.</p>

          <h2>5. Não estabelecer metas financeiras</h2>
          <p>Sem metas claras, é difícil manter a motivação para economizar e investir. Muitos iniciantes acabam gastando todo o dinheiro que sobra no fim do mês.</p>
          <p>Defina metas de curto, médio e longo prazo. Isso dará propósito ao seu planejamento financeiro e ajudará a manter o foco.</p>

          <h2>Conclusão</h2>
          <p>Evitar esses erros comuns pode fazer uma grande diferença na sua jornada financeira. Lembre-se que educação financeira é um processo contínuo, e pequenas mudanças de hábito podem trazer grandes resultados ao longo do tempo.</p>
        `
      },
      {
        id: "1",
        title: "Guia Completo sobre Tesouro Direto",
        description: "Tudo o que você precisa saber para começar a investir no Tesouro Direto de forma segura.",
        image: "/placeholder.svg",
        category: "investimentos",
        author: "Carlos Mendes",
        date: "28 de Abril, 2023",
        readTime: "8 min de leitura",
        featured: false,
        content: `
          <h2>O que é o Tesouro Direto?</h2>
          <p>O Tesouro Direto é um programa do Governo Federal que permite a pessoas físicas comprarem títulos públicos diretamente, sem intermediários. É uma forma segura e acessível de investir, com valores iniciais a partir de R$ 30.</p>

          <h2>Tipos de Títulos</h2>
          <p>Existem três categorias principais de títulos no Tesouro Direto:</p>

          <h3>Tesouro Prefixado</h3>
          <p>Neste tipo de título, você sabe exatamente quanto vai receber no vencimento. A rentabilidade é definida no momento da compra.</p>

          <h3>Tesouro IPCA+</h3>
          <p>Oferece proteção contra a inflação, pois sua rentabilidade é composta por uma taxa fixa mais a variação do IPCA (Índice Nacional de Preços ao Consumidor Amplo).</p>

          <h3>Tesouro Selic</h3>
          <p>Acompanha a variação da taxa Selic, a taxa básica de juros da economia. É considerado o mais conservador dos títulos.</p>

          <h2>Como Investir</h2>
          <p>Para investir no Tesouro Direto, você precisa:</p>
          <ol>
            <li>Ter CPF e ser maior de 18 anos (ou menor, desde que representado por responsável legal)</li>
            <li>Abrir uma conta em uma corretora ou banco que ofereça acesso ao programa</li>
            <li>Fazer um cadastro no site do Tesouro Direto</li>
            <li>Escolher os títulos e valores que deseja investir</li>
          </ol>

          <h2>Tributação</h2>
          <p>Os rendimentos do Tesouro Direto estão sujeitos ao Imposto de Renda, com alíquotas regressivas conforme o tempo de aplicação:</p>
          <ul>
            <li>Até 180 dias: 22,5%</li>
            <li>De 181 a 360 dias: 20%</li>
            <li>De 361 a 720 dias: 17,5%</li>
            <li>Acima de 720 dias: 15%</li>
          </ul>

          <h2>Taxas</h2>
          <p>Existem duas taxas principais no Tesouro Direto:</p>
          <ul>
            <li>Taxa de custódia da B3: 0,25% ao ano sobre o valor dos títulos</li>
            <li>Taxa da instituição financeira: varia conforme a corretora ou banco escolhido</li>
          </ul>

          <h2>Conclusão</h2>
          <p>O Tesouro Direto é uma excelente porta de entrada para o mundo dos investimentos. Oferece segurança, liquidez e rentabilidade superior à da poupança, sendo ideal para diversos objetivos financeiros, desde a reserva de emergência até a aposentadoria.</p>
        `
      },
      // Adicione o conteúdo para os demais artigos seguindo o mesmo padrão
      {
        id: "2",
        title: "Como Montar uma Reserva de Emergência",
        description: "Passo a passo para criar sua reserva de emergência e garantir segurança financeira.",
        image: "/placeholder.svg",
        category: "planejamento",
        author: "Mariana Costa",
        date: "10 de Abril, 2023",
        readTime: "5 min de leitura",
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre reserva de emergência...</p>`
      },
      {
        id: "3",
        title: "Inflação: Como Proteger seu Dinheiro",
        description: "Estratégias para proteger seu patrimônio em tempos de alta inflação.",
        image: "/placeholder.svg",
        category: "economia",
        author: "Pedro Alves",
        date: "2 de Abril, 2023",
        readTime: "7 min de leitura",
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre inflação...</p>`
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
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre renda fixa...</p>`
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
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre finanças em casal...</p>`
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
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre educação financeira para crianças...</p>`
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
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre taxa Selic...</p>`
      }
    ];

    const artigoEncontrado = artigos.find(a => a.id === id);

    if (artigoEncontrado) {
      setArtigo(artigoEncontrado);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <p className="text-lg">Carregando artigo...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!artigo) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
              <p className="text-lg text-gray-600 mb-8">O artigo que você está procurando não existe ou foi removido.</p>
              <Link to="/artigos">
                <Button className="bg-finance-blue hover:bg-finance-blue-dark text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para Artigos
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "iniciantes": return "Para Iniciantes";
      case "investimentos": return "Investimentos";
      case "economia": return "Economia";
      case "planejamento": return "Planejamento";
      default: return category;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <article className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <div className="mb-8">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link to="/" className="text-sm text-gray-500 hover:text-finance-blue">
                      Home
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="mx-2 text-gray-400">/</span>
                      <Link to="/artigos" className="text-sm text-gray-500 hover:text-finance-blue">
                        Artigos
                      </Link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <span className="mx-2 text-gray-400">/</span>
                      <span className="text-sm text-gray-700 truncate max-w-[200px]">{artigo.title}</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            {/* Cabeçalho do artigo */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-finance-blue/10 text-finance-blue px-3 py-1 rounded-full text-sm font-medium">
                  {getCategoryName(artigo.category)}
                </span>
                {artigo.featured && (
                  <span className="bg-finance-green/10 text-finance-green px-3 py-1 rounded-full text-sm font-medium">
                    Destaque
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {artigo.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{artigo.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{artigo.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{artigo.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span>{getCategoryName(artigo.category)}</span>
                </div>
              </div>

              {/* Imagem principal */}
              <div className="relative h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden mb-8">
                <img
                  src={artigo.image}
                  alt={artigo.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Conteúdo do artigo */}
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: artigo.content || '' }}
              />

              {/* Compartilhar e voltar */}
              <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <Link to="/artigos">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para Artigos
                  </Button>
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Compartilhar:</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArtigoView;