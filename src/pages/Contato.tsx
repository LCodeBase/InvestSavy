
import React, { useState } from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { seoConfig } from '../config/seo';
import { Mail, MessageCircle, Send, Check, Clock, Heart, Users, Lightbulb, Calculator, BookOpen, HelpCircle, Handshake } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';

const Contato = () => {
  // SEO and Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contato InvestSavy',
    description: 'Entre em contato com a InvestSavy para dúvidas, sugestões e parcerias',
    url: 'https://www.investsavy.online/contato',
    mainEntity: {
      '@type': 'Organization',
      name: 'InvestSavy',
      url: 'https://www.investsavy.online/',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: 'Portuguese',
        areaServed: 'BR',
        serviceType: [
          'Educação Financeira',
          'Consultoria em Investimentos',
          'Ferramentas Financeiras',
          'Suporte Técnico'
        ]
      }
    },
    potentialAction: {
      '@type': 'CommunicateAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.investsavy.online/contato',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      }
    },
    inLanguage: 'pt-BR'
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactReasons = [
    {
      icon: Lightbulb,
      title: "Sugestões de Conteúdo",
      description: "Ideias para novos artigos e temas"
    },
    {
      icon: Calculator,
      title: "Novas Calculadoras",
      description: "Propostas de ferramentas financeiras"
    },
    {
      icon: HelpCircle,
      title: "Dúvidas Financeiras",
      description: "Questões sobre educação financeira"
    },
    {
      icon: BookOpen,
      title: "Recursos Educacionais",
      description: "Sugestões de livros e cursos"
    },
    {
      icon: Handshake,
      title: "Parcerias",
      description: "Colaborações e oportunidades"
    },
    {
      icon: Heart,
      title: "Feedback",
      description: "Sua experiência com o InvestSavy"
    }
  ];

  return (
    <Layout>
      <SEOHead
        title={seoConfig.pages.contato.title}
        description={seoConfig.pages.contato.description}
        keywords={seoConfig.pages.contato.keywords}
        url="https://www.investsavy.online/contato"
        type="website"
        section={seoConfig.pages.contato.section}
        canonical="https://www.investsavy.online/contato"
        jsonLd={jsonLd}
      />
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50/30 to-white">
        {/* Hero Section */}
        <div className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl mb-8 shadow-lg">
                <Mail className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Vamos <span className="text-green-600">Conversar</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Sua opinião é fundamental para construirmos juntos uma educação financeira cada vez melhor
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <MessageCircle className="w-7 h-7 text-green-600" />
                    Envie sua Mensagem
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    Preencha o formulário abaixo e retornaremos em breve
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                          Seu Nome *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Como posso te chamar?"
                          className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                          Seu E-mail *
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                          className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                        Sua Mensagem *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Conte sua dúvida, sugestão ou experiência..."
                        className="border-gray-200 focus:border-green-500 focus:ring-green-500 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitted}
                      className={`w-full h-12 font-semibold text-base transition-all duration-300 ${
                        isSubmitted 
                          ? 'bg-green-600 hover:bg-green-600' 
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {isSubmitted ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Mensagem Enviada!
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Contact Reasons */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100/50">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-bold text-green-900 flex items-center gap-3">
                    <Users className="w-6 h-6" />
                    Sobre o que Conversar?
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-4">
                    {contactReasons.map((reason, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-white/60 rounded-xl">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <reason.icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-900 text-sm">
                            {reason.title}
                          </h4>
                          <p className="text-green-700 text-xs mt-1">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="shadow-lg border-0 bg-white/80">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                      <Clock className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Tempo de Resposta
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Respondemos pessoalmente em até <strong className="text-green-600">24 horas</strong> nos dias úteis. 
                      Sua mensagem é importante para nós!
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Preview */}
              <Card className="shadow-lg border-0 bg-gray-50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Redes Sociais
                  </CardTitle>
                  <p className="text-gray-600 text-sm">
                    Em breve estaremos nas principais plataformas
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-white rounded-lg opacity-60">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold text-xs">in</span>
                      </div>
                      <span className="text-gray-500 text-sm">LinkedIn - Em breve</span>
                    </div>
                    <div className="flex items-center p-3 bg-white rounded-lg opacity-60">
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-pink-600 font-bold text-xs">📱</span>
                      </div>
                      <span className="text-gray-500 text-sm">Instagram - Em breve</span>
                    </div>
                    <div className="flex items-center p-3 bg-white rounded-lg opacity-60">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-red-600 font-bold text-xs">YT</span>
                      </div>
                      <span className="text-gray-500 text-sm">YouTube - Em breve</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contato;
