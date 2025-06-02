import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, MessageSquare, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Definindo o schema de validação com Zod
const formSchema = z.object({
  nome: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  assunto: z.string().min(3, { message: "Assunto deve ter pelo menos 3 caracteres" }),
  mensagem: z.string().min(10, { message: "Mensagem deve ter pelo menos 10 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contato = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializando o formulário com react-hook-form e zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      assunto: "",
      mensagem: "",
    },
  });

  // Função para enviar os dados para o Supabase
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Inserindo os dados na tabela 'contatos'
      const { error } = await supabase
        .from('contatos')
        .insert([
          {
            nome: data.nome,
            email: data.email,
            assunto: data.assunto,
            mensagem: data.mensagem,
            data_envio: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      // Sucesso
      setSuccess(true);
      form.reset(); // Limpa o formulário
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar mensagem");
    } finally {
      setLoading(false);
    }
  };

  const contatoInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      description: "Nossa equipe responde em até 24h",
      contact: "contato@investsavy.com.br",
      action: "Enviar email",
      link: "mailto:contato@investsavy.com.br"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telefone",
      description: "Segunda a sexta, 9h às 18h",
      contact: "(11) 93201-2181",
      action: "Ligar agora",
      link: "tel:+5511932012181"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Chat ao vivo",
      description: "Disponível todos os dias",
      contact: "Tempo médio de resposta: 5 min",
      action: "Iniciar chat",
      link: "#chat"
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
                Entre em Contato
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Estamos aqui para ajudar. Entre em contato conosco para tirar dúvidas,
                dar sugestões ou conhecer mais sobre nossos serviços.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contatoInfo.map((info, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-finance-blue/10 flex items-center justify-center mb-3">
                      <div className="text-finance-blue">
                        {info.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl text-gray-900">
                      {info.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {info.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-lg font-medium text-gray-800">
                      {info.contact}
                    </div>
                    <Button
                      className="w-full bg-finance-blue hover:bg-finance-blue-dark text-white"
                      onClick={() => window.open(info.link, '_blank')}
                    >
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              {/* Formulário de Contato */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">
                    Envie uma mensagem
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {success && (
                    <Alert className="mb-6 bg-green-50 border-green-200">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <AlertDescription className="text-green-700">
                        Mensagem enviada com sucesso! Entraremos em contato em breve.
                      </AlertDescription>
                    </Alert>
                  )}

                  {error && (
                    <Alert className="mb-6 bg-red-50 border-red-200">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <AlertDescription className="text-red-700">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="nome"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Nome completo
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Seu nome"
                                  {...field}
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="seu@email.com"
                                  type="email"
                                  {...field}
                                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="assunto"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Assunto
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Assunto da mensagem"
                                {...field}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mensagem"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Mensagem
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Digite sua mensagem aqui..."
                                {...field}
                                rows={5}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 text-xs" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-finance-green hover:bg-finance-green-dark text-white py-6"
                        disabled={loading}
                      >
                        <Send className="mr-2 h-5 w-5" />
                        {loading ? "Enviando..." : "Enviar Mensagem"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Informações adicionais */}

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Perguntas Frequentes
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="font-medium text-gray-900 mb-2">Como posso começar a usar a plataforma?</h4>
                    <p className="text-gray-600">
                      Basta criar uma conta gratuita e você terá acesso imediato a todas as trilhas e ferramentas básicas.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="font-medium text-gray-900 mb-2">O conteúdo é realmente gratuito?</h4>
                    <p className="text-gray-600">
                      Sim! Todo o conteúdo educacional é 100% gratuito. Em breve iremos adicionar ferramentas avançadas que vão ser desbloqueadas com planos premium.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="font-medium text-gray-900 mb-2">Posso sugerir novos conteúdos ou ferramentas?</h4>
                    <p className="text-gray-600">
                      Claro! Adoramos receber feedback dos usuários. Use o formulário de contato para enviar suas sugestões.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </div >
  );
};

export default Contato;