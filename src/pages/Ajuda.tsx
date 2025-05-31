import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, HelpCircle, BookOpen, MessageSquare, FileQuestion, Settings } from "lucide-react";

const Ajuda = () => {
  const faqCategories = [
    { id: "geral", nome: "Geral" },
    { id: "conta", nome: "Conta e Perfil" },
    { id: "trilhas", nome: "Trilhas de Aprendizado" },
    { id: "ferramentas", nome: "Ferramentas" },
    { id: "pagamentos", nome: "Pagamentos" }
  ];

  const faqs = {
    geral: [
      {
        pergunta: "O que é o InvestSavy?",
        resposta: "O InvestSavy é uma plataforma educacional focada em educação financeira e investimentos. Nosso objetivo é democratizar o conhecimento financeiro, oferecendo conteúdo de qualidade de forma acessível para todos."
      },
      {
        pergunta: "Como funciona a plataforma?",
        resposta: "Nossa plataforma oferece trilhas de aprendizado estruturadas, ferramentas práticas para gestão financeira e planejamento de investimentos, além de artigos e conteúdos atualizados sobre o mercado financeiro."
      },
      {
        pergunta: "O conteúdo é gratuito?",
        resposta: "Sim! A maior parte do nosso conteúdo é gratuita. Oferecemos trilhas básicas e ferramentas essenciais sem custo. Para conteúdos avançados e ferramentas premium, temos planos pagos com preços acessíveis."
      },
      {
        pergunta: "Preciso ter conhecimento prévio para começar?",
        resposta: "Não! Nossas trilhas começam do básico e avançam gradualmente. Temos conteúdo para todos os níveis, desde iniciantes absolutos até investidores experientes."
      },
      {
        pergunta: "Vocês oferecem certificados?",
        resposta: "Sim, ao completar nossas trilhas de aprendizado, você recebe um certificado digital que pode ser compartilhado em suas redes profissionais."
      }
    ],
    conta: [
      {
        pergunta: "Como criar uma conta?",
        resposta: "Para criar uma conta, clique no botão 'Começar Agora' no topo da página e preencha o formulário de cadastro com seu email e senha. Você também pode se cadastrar usando sua conta do Google ou Facebook."
      },
      {
        pergunta: "Esqueci minha senha, como recuperá-la?",
        resposta: "Na página de login, clique em 'Esqueceu sua senha?' e siga as instruções enviadas para seu email cadastrado para criar uma nova senha."
      },
      {
        pergunta: "Como atualizar meus dados de perfil?",
        resposta: "Após fazer login, acesse seu perfil clicando no seu nome no canto superior direito. Na página de perfil, você pode atualizar suas informações pessoais, foto e preferências."
      },
      {
        pergunta: "Como excluir minha conta?",
        resposta: "Para excluir sua conta, acesse as configurações do seu perfil e selecione a opção 'Excluir conta'. Lembre-se que esta ação é irreversível e todos os seus dados serão removidos permanentemente."
      }
    ],
    trilhas: [
      {
        pergunta: "Como funcionam as trilhas de aprendizado?",
        resposta: "As trilhas são sequências de conteúdos organizados por temas e níveis de dificuldade. Cada trilha contém módulos com vídeos, textos e exercícios práticos para fixação do conhecimento."
      },
      {
        pergunta: "Posso fazer mais de uma trilha ao mesmo tempo?",
        resposta: "Sim! Você pode se inscrever em quantas trilhas desejar e avançar no seu próprio ritmo. Recomendamos, no entanto, concluir uma trilha antes de iniciar outra para melhor absorção do conteúdo."
      },
      {
        pergunta: "As trilhas têm prazo para conclusão?",
        resposta: "Não, você pode avançar no seu próprio ritmo. Uma vez inscrito em uma trilha, o acesso é permanente e você pode revisitar o conteúdo quando quiser."
      },
      {
        pergunta: "Como sugerir novos temas para trilhas?",
        resposta: "Valorizamos muito o feedback dos usuários! Você pode sugerir novos temas através da página de Contato ou diretamente pelo chat de suporte."
      }
    ],
    ferramentas: [
      {
        pergunta: "Como usar a calculadora de investimentos?",
        resposta: "Nossa calculadora de investimentos permite simular rendimentos de diferentes tipos de aplicações. Basta inserir o valor inicial, aportes mensais, prazo e taxa de juros estimada para visualizar projeções de rendimento."
      },
      {
        pergunta: "O planejador financeiro é seguro?",
        resposta: "Sim! Todos os dados inseridos no planejador financeiro são criptografados e armazenados com segurança. Não compartilhamos suas informações financeiras com terceiros."
      },
      {
        pergunta: "Posso exportar os relatórios das ferramentas?",
        resposta: "Sim, todas as nossas ferramentas permitem exportar relatórios em formato PDF ou planilha Excel para que você possa salvar ou compartilhar os resultados."
      },
      {
        pergunta: "As ferramentas funcionam em dispositivos móveis?",
        resposta: "Sim! Nossa plataforma é totalmente responsiva e as ferramentas foram desenvolvidas para funcionar perfeitamente em smartphones e tablets."
      }
    ],
    pagamentos: [
      {
        pergunta: "Quais formas de pagamento são aceitas?",
        resposta: "Aceitamos cartões de crédito, débito, boleto bancário e PIX para pagamentos de planos premium."
      },
      {
        pergunta: "Como funciona a política de reembolso?",
        resposta: "Oferecemos garantia de satisfação de 7 dias. Se você não estiver satisfeito com o plano premium, pode solicitar reembolso integral dentro deste período."
      },
      {
        pergunta: "Os pagamentos são seguros?",
        resposta: "Sim! Utilizamos gateways de pagamento certificados e criptografia de ponta a ponta para garantir a segurança de todas as transações."
      },
      {
        pergunta: "Como cancelar uma assinatura premium?",
        resposta: "Para cancelar sua assinatura, acesse as configurações do seu perfil, selecione 'Gerenciar assinatura' e clique em 'Cancelar'. Você continuará tendo acesso ao conteúdo premium até o final do período já pago."
      }
    ]
  };

  const recursos = [
    {
      icon: <BookOpen className="h-10 w-10" />,
      title: "Base de Conhecimento",
      description: "Acesse artigos detalhados sobre diversos temas financeiros",
      link: "/artigos"
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      title: "Chat de Suporte",
      description: "Converse em tempo real com nossa equipe de especialistas",
      link: "/contato"
    },
    {
      icon: <FileQuestion className="h-10 w-10" />,
      title: "Perguntas Frequentes",
      description: "Respostas para as dúvidas mais comuns dos usuários",
      link: "/ajuda"
    },
    {
      icon: <Settings className="h-10 w-10" />,
      title: "Tutoriais",
      description: "Guias passo a passo para usar todas as funcionalidades",
      link: "/tutoriais"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Central de Ajuda
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Encontre respostas para suas dúvidas e aprenda a aproveitar ao máximo nossa plataforma.
              </p>
            </div>

            {/* Barra de pesquisa */}
            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar na central de ajuda..."
                  className="w-full px-5 py-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {/* Recursos de Ajuda */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {recursos.map((recurso, index) => (
                <Card key={index} className="text-center card-hover">
                  <CardHeader className="pb-2">
                    <div className="mx-auto w-16 h-16 rounded-full bg-finance-blue/10 flex items-center justify-center mb-4">
                      <div className="text-finance-blue">
                        {recurso.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{recurso.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{recurso.description}</p>
                    <a
                      href={recurso.link}
                      className="text-finance-blue hover:text-finance-blue-dark font-medium inline-flex items-center"
                    >
                      Acessar
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQs */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Perguntas Frequentes
              </h2>

              <Tabs defaultValue="geral" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                  {faqCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.nome}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Object.entries(faqs).map(([category, questions]) => (
                  <TabsContent key={category} value={category} className="space-y-6">
                    {questions.map((faq, index) => (
                      <Card key={index} className="card-hover">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl flex items-start">
                            <HelpCircle className="h-6 w-6 mr-2 text-finance-blue flex-shrink-0 mt-0.5" />
                            <span>{faq.pergunta}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{faq.resposta}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Contato */}
            <div className="text-center mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Não encontrou o que procurava?
              </h2>
              <p className="text-gray-600 mb-6">
                Nossa equipe está pronta para ajudar você com qualquer dúvida ou problema.
              </p>
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-finance-blue hover:bg-finance-blue-dark"
              >
                Entrar em Contato
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Ajuda;