import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, MapPin, Clock, Users } from "lucide-react";
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
      contact: "contato@investsavy.online",
      action: "Enviar email",
      link: "mailto:contato@investsavy.online",
      color: "bg-blue-500"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telefone",
      description: "Segunda a sexta, 9h às 18h",
      contact: "(11) 93201-2181",
      action: "Ligar agora",
      link: "tel:+5511932012181",
      color: "bg-green-500"
    }
  ];

  const estatisticas = [
    {
      icon: <Users className="h-8 w-8" />,
      numero: "10.000+",
      label: "Usuários atendidos",
      color: "text-blue-600"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      numero: "< 24h",
      label: "Tempo de resposta",
      color: "text-green-600"
    },
    {
      icon: <CheckCircle2 className="h-8 w-8" />,
      numero: "98%",
      label: "Satisfação",
      color: "text-purple-600"
    }
  ];

  const faqItems = [
    {
      pergunta: "Como posso começar a usar a plataforma?",
      resposta: "Basta criar uma conta gratuita e você terá acesso imediato a todas as trilhas e ferramentas básicas. O processo é simples e leva menos de 2 minutos."
    },
    {
      pergunta: "O conteúdo é realmente gratuito?",
      resposta: "Sim! Todo o conteúdo educacional é 100% gratuito. Em breve iremos adicionar ferramentas avançadas que serão desbloqueadas com planos premium."
    },
    {
      pergunta: "Posso sugerir novos conteúdos ou ferramentas?",
      resposta: "Claro! Adoramos receber feedback dos usuários. Use o formulário de contato para enviar suas sugestões ou entre em contato diretamente conosco."
    },
    {
      pergunta: "Vocês oferecem suporte técnico?",
      resposta: "Sim, oferecemos suporte completo através do email e telefone. Nossa equipe está sempre pronta para ajudar com qualquer dúvida técnica."
    },
    {
      pergunta: "Como posso acompanhar meu progresso?",
      resposta: "Através do seu perfil, você pode acompanhar todo seu progresso nas trilhas, ferramentas utilizadas e conquistas alcançadas."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-finance-blue/10 via-white to-finance-green/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-finance-blue/10 rounded-full text-finance-blue text-sm font-medium mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                Estamos aqui para ajudar
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Entre em <span className="text-finance-blue">Contato</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Estamos aqui para ajudar você a alcançar seus objetivos financeiros.
                Entre em contato conosco para tirar dúvidas, dar sugestões ou conhecer mais sobre nossos serviços.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {estatisticas.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.numero}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Informações de Contato */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Como podemos ajudar?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Escolha a forma de contato que preferir. Estamos sempre prontos para atendê-lo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
              {contatoInfo.map((info, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-xl ${info.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900 mb-1">
                          {info.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {info.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-lg font-semibold text-gray-800 bg-gray-50 p-3 rounded-lg">
                      {info.contact}
                    </div>
                    <Button
                      className={`w-full ${info.color} hover:opacity-90 text-white py-3 font-medium transition-all duration-300 hover:shadow-lg`}
                      onClick={() => {
                        if (info.link) {
                          window.open(info.link, '_blank');
                        }
                      }}
                    >
                      {info.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário e FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
              {/* Formulário de Contato */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Envie uma mensagem
                  </h2>
                  <p className="text-lg text-gray-600">
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                  </p>
                </div>

                <Card className="shadow-xl border-0">
                  <CardContent className="p-8">
                    {success && (
                      <Alert className="mb-6 bg-green-50 border-green-200 border-l-4 border-l-green-500">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <AlertDescription className="text-green-700 font-medium">
                          ✨ Mensagem enviada com sucesso! Entraremos em contato em breve.
                        </AlertDescription>
                      </Alert>
                    )}

                    {error && (
                      <Alert className="mb-6 bg-red-50 border-red-200 border-l-4 border-l-red-500">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <AlertDescription className="text-red-700 font-medium">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                  Nome completo *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Seu nome completo"
                                    {...field}
                                    className="h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-finance-blue focus:ring-0 transition-colors duration-200"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                  Email *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="seu@email.com"
                                    type="email"
                                    {...field}
                                    className="h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-finance-blue focus:ring-0 transition-colors duration-200"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="assunto"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Assunto *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Assunto da sua mensagem"
                                  {...field}
                                  className="h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-finance-blue focus:ring-0 transition-colors duration-200"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="mensagem"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Mensagem *
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Digite sua mensagem aqui... Seja específico sobre como podemos ajudá-lo."
                                  {...field}
                                  rows={6}
                                  className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-finance-blue focus:ring-0 transition-colors duration-200 resize-none"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-finance-green to-finance-green-dark hover:from-finance-green-dark hover:to-finance-green text-white py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                          disabled={loading}
                        >
                          <Send className="mr-3 h-5 w-5" />
                          {loading ? "Enviando..." : "Enviar Mensagem"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Perguntas Frequentes
                  </h2>
                  <p className="text-lg text-gray-600">
                    Encontre respostas rápidas para as dúvidas mais comuns.
                  </p>
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-gray-900 mb-3 text-lg leading-relaxed">
                          {item.pergunta}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {item.resposta}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* CTA adicional */}
                <Card className="mt-8 bg-gradient-to-r from-finance-blue to-finance-blue-dark border-0 text-white">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Ainda tem dúvidas?</h3>
                    <p className="mb-4 opacity-90">Nossa equipe está pronta para ajudar você!</p>
                    <Button
                      className="bg-white text-finance-blue hover:bg-gray-100 font-semibold"
                      onClick={() => window.open('mailto:contato@investsavy.online', '_blank')}
                    >
                      Fale Conosco Agora
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contato;