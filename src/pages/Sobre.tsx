
import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { seoConfig } from '../config/seo';
import { User, BookOpen, Target, Heart, Award, TrendingUp, CheckCircle, Lightbulb, Users, Coffee, Star, Zap, Shield, Sparkles, ArrowRight, Globe, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Sobre = () => {
  // SEO and Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre a InvestSavy',
    description: 'Conheça a história, missão e valores da InvestSavy - plataforma de educação financeira',
    url: 'https://investsavy.online/sobre',
    mainEntity: {
      '@type': 'Organization',
      name: 'InvestSavy',
      url: 'https://investsavy.online',
      description: 'Plataforma de educação financeira e investimentos',
      foundingDate: '2023',
      mission: 'Democratizar a educação financeira e tornar os investimentos acessíveis para todos',
      values: [
        'Simplicidade na educação financeira',
        'Transparência nas informações',
        'Acessibilidade para todos'
      ],
      knowsAbout: [
        'Educação Financeira',
        'Investimentos',
        'Análise de Mercado',
        'Planejamento Financeiro',
        'Certificações Financeiras'
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BR',
        addressLocality: 'São Paulo',
        addressRegion: 'SP'
      }
    },
    inLanguage: 'pt-BR'
  };

  const values = [
    {
      icon: Heart,
      title: 'Simplicidade',
      description: 'Transformamos conceitos complexos em linguagem clara e acessível para todos.',
      color: 'from-rose-500 via-pink-500 to-red-500',
      bgColor: 'from-rose-50/80 via-pink-50/60 to-red-50/40',
      iconBg: 'bg-gradient-to-br from-rose-100 to-pink-100',
      borderColor: 'border-rose-200/50',
      textColor: 'text-rose-700'
    },
    {
      icon: Shield,
      title: 'Transparência',
      description: 'Compartilhamos conhecimento de forma honesta, sem promessas mirabolantes.',
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      bgColor: 'from-blue-50/80 via-indigo-50/60 to-purple-50/40',
      iconBg: 'bg-gradient-to-br from-blue-100 to-indigo-100',
      borderColor: 'border-blue-200/50',
      textColor: 'text-blue-700'
    },
    {
      icon: Users,
      title: 'Acessibilidade',
      description: 'Educação financeira deve ser para todos, independente da renda ou idade.',
      color: 'from-emerald-500 via-green-500 to-teal-500',
      bgColor: 'from-emerald-50/80 via-green-50/60 to-teal-50/40',
      iconBg: 'bg-gradient-to-br from-emerald-100 to-green-100',
      borderColor: 'border-emerald-200/50',
      textColor: 'text-emerald-700'
    }
  ];

  const learningBooks = [
    { title: 'Pai Rico, Pai Pobre', author: 'Robert Kiyosaki', rating: 5, category: 'Mindset' },
    { title: 'O Investidor Inteligente', author: 'Benjamin Graham', rating: 5, category: 'Investimentos' },
    { title: 'Psicologia Financeira', author: 'Morgan Housel', rating: 5, category: 'Comportamento' },
    { title: 'O Jeito Peter Lynch de Investir', author: 'Peter Lynch', rating: 4, category: 'Ações' },
    { title: 'Liar\'s Poker', author: 'Michael Lewis', rating: 4, category: 'Mercados' },
    { title: 'Security Analysis', author: 'Benjamin Graham', rating: 5, category: 'Análise' },
    { title: 'Principles of Corporate Finance', author: 'Brealey, Myers & Allen', rating: 4, category: 'Finanças' }
  ];

  const futureGoals = [
    { 
      goal: 'Aprender mais sobre fundos imobiliários (FIIs)', 
      icon: TrendingUp, 
      priority: 'Alta',
      timeframe: '3 meses',
      color: 'from-orange-500 to-red-500'
    },
    { 
      goal: 'Me familiarizar com conceitos de macroeconomia e ciclos econômicos', 
      icon: Globe, 
      priority: 'Alta',
      timeframe: '6 meses',
      color: 'from-blue-500 to-indigo-500'
    },
    { 
      goal: 'Estudar planejamento financeiro pessoal e familiar', 
      icon: Heart, 
      priority: 'Média',
      timeframe: '4 meses',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      goal: 'No curto prazo, buscar a certificação CPA-20', 
      icon: Award, 
      priority: 'Alta',
      timeframe: '8 meses',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      goal: 'No longo prazo, considerar a preparação para o CFA', 
      icon: Star, 
      priority: 'Média',
      timeframe: '2 anos',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <Layout>
      <SEOHead
        title={seoConfig.pages.sobre.title}
        description={seoConfig.pages.sobre.description}
        keywords={seoConfig.pages.sobre.keywords}
        url="https://investsavy.com.br/sobre"
        type="website"
        section={seoConfig.pages.sobre.section}
        canonical="https://investsavy.com.br/sobre"
        jsonLd={jsonLd}
      />
      
      {/* Background with animated gradients */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-teal-50/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_70%)] bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_70%)]"></div>
          
          <div className="relative py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-8">
                {/* Enhanced Avatar */}
                <div className="relative inline-block group">
                  <div className="relative">
                    {/* Main avatar */}
                    <div className="w-28 h-28 lg:w-36 lg:h-36 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-all duration-700 hover:scale-110">
                      <User className="w-14 h-14 lg:w-18 lg:h-18 text-white drop-shadow-lg" />
                    </div>
                    
                    {/* Floating decorative elements */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-bounce delay-100 shadow-lg"></div>
                    <div className="absolute -bottom-2 -left-3 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full animate-pulse delay-300 shadow-lg"></div>
                    <div className="absolute top-1/2 -right-10 w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full animate-ping delay-500"></div>
                    <div className="absolute -top-6 left-1/2 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-bounce delay-700"></div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-[2rem] lg:rounded-[2.5rem] blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
                
                {/* Enhanced Title */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                      Sobre o{' '}
                      <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent relative">
                        InvestSavy
                        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      </span>
                    </h1>
                    
                    <div className="flex justify-center">
                      <div className="w-32 h-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-full shadow-lg"></div>
                    </div>
                  </div>
                  
                  <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
                    A história por trás da plataforma que está{' '}
                    <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent font-bold">
                      democratizando a educação financeira
                    </span>{' '}
                    no Brasil
                  </p>
                </div>
                
                {/* Enhanced Stats */}
                <div className="flex flex-wrap justify-center gap-8 pt-8">
                  {[
                    { value: '2024', label: 'Fundação', icon: Clock },
                    { value: '15+', label: 'Ferramentas', icon: Zap },
                    { value: '100%', label: 'Gratuito', icon: Heart }
                  ].map((stat, index) => (
                    <div key={index} className="group text-center">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <stat.icon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="text-3xl font-black text-emerald-600 mb-1">{stat.value}</div>
                      <div className="text-gray-600 font-semibold text-base">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 space-y-32">
          
          {/* Founder Section */}
          <section className="relative">
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100">
              
              {/* Simple Header */}
              <div className="bg-gray-50 px-8 lg:px-12 py-8 lg:py-10 border-b border-gray-100">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl">
                    <User className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      Conheça o Fundador
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                      A história por trás do InvestSavy e a jornada de aprendizado financeiro
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                  
                  {/* Photo */}
                  <div className="lg:col-span-2 flex justify-center">
                    <div className="relative">
                      <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-2xl bg-gray-100 shadow-lg overflow-hidden">
                        <img
                          src="/me.png"
                          alt="Leonardo - Fundador do InvestSavy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="lg:col-span-3 space-y-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        Olá, me chamo{' '}
                        <span className="text-emerald-600">
                          Leonardo!
                        </span>{' '}
                        <span>👋</span>
                      </h3>
                    </div>

                    <div className="space-y-6 text-gray-700 text-base lg:text-lg leading-relaxed">
                      <p className="border-l-4 border-emerald-500 pl-4 py-2">
                        <strong className="text-gray-900">Não sou economista ou consultor financeiro</strong> - Sou só um jovem de 18 anos que decidiu levar a sério a própria vida financeira e começar a entender como o dinheiro realmente funciona.
                        <br></br><br></br>Hoje, estou fazendo faculdade e buscando entrar no mercado financeiro. Tenho estudado bastante e, mais do que isso, venho tentando aplicar esse aprendizado no dia a dia — de um jeito prático, direto, e pé no chão.
                        <br></br> <br></br>O InvestSavy nasceu dessa vontade de aprender e de compartilhar esse caminho com quem também quer melhorar de vida, mesmo sem ter muito pra começar. Aqui não tem promessa de fórmula mágica. Tem conteúdo simples, real, feito por alguém que também está começando — mas com vontade de ir longe.
                      </p>
                  
                    </div>

                    {/* Simple Quote */}
                    <div className="bg-gray-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                      <p className="text-lg font-medium text-gray-800 italic">
                        "Meu objetivo é ajudar pessoas como eu a entender melhor como o dinheiro funciona e tomar decisões financeiras mais conscientes."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="space-y-20">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl shadow-xl">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                  Nossa Missão &{' '}
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Propósito
                  </span>
                </h2>
                <p className="text-2xl lg:text-3xl text-gray-600 max-w-5xl mx-auto font-medium leading-relaxed">
                  Entenda o que nos move e por que criamos o InvestSavy
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Problem */}
              <div className="group/problem">
                <Card className="h-full border-0 bg-gradient-to-br from-red-50/80 via-pink-50/60 to-rose-50/40 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover/problem:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="pb-8 relative z-10">
                    <CardTitle className="text-4xl font-black text-red-800 flex items-center space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl group-hover/problem:scale-110 transition-transform duration-500">
                        <span className="text-3xl">❌</span>
                      </div>
                      <span>O Problema</span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 relative z-10">
                    {[
                      'Conteúdo financeiro cheio de jargões técnicos incompreensíveis',
                      'Informações dispersas e difíceis de encontrar',
                      'Falta de ferramentas práticas e gratuitas',
                      'Educação financeira vista como "privilégio de poucos"'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-red-100/50 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 group/item">
                        <div className="w-4 h-4 bg-red-500 rounded-full mt-3 flex-shrink-0 shadow-lg group-hover/item:scale-125 transition-transform duration-300"></div>
                        <span className="text-red-700 font-semibold text-lg leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Solution */}
              <div className="group/solution">
                <Card className="h-full border-0 bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-teal-50/40 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 hover:-rotate-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover/solution:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="pb-8 relative z-10">
                    <CardTitle className="text-4xl font-black text-emerald-800 flex items-center space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center shadow-xl group-hover/solution:scale-110 transition-transform duration-500">
                        <span className="text-3xl">✅</span>
                      </div>
                      <span>Nossa Solução</span>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 relative z-10">
                    {[
                      'Conteúdo simples e em linguagem clara para todos',
                      'Tudo centralizado, organizado e bem estruturado',
                      'Ferramentas práticas e 100% gratuitas',
                      'Educação financeira democrática e acessível'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100/50 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1 group/item">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full mt-3 flex-shrink-0 shadow-lg group-hover/item:scale-125 transition-transform duration-300"></div>
                        <span className="text-emerald-700 font-semibold text-lg leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="space-y-20">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                  Nossos{' '}
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Valores
                  </span>
                </h2>
                <p className="text-2xl lg:text-3xl text-gray-600 font-medium leading-relaxed">
                  Os princípios que guiam nosso trabalho
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
              {values.map((value, index) => (
                <Card key={index} className={`group/value text-center border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-6 bg-gradient-to-br ${value.bgColor} overflow-hidden relative hover:rotate-1`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2250%22%20height%3D%2250%22%20viewBox%3D%220%200%2050%2050%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M25%2025c0-6.9-5.6-12.5-12.5-12.5S0%2018.1%200%2025s5.6%2012.5%2012.5%2012.5S25%2031.9%2025%2025zm25%200c0-6.9-5.6-12.5-12.5-12.5S25%2018.1%2025%2025s5.6%2012.5%2012.5%2012.5S50%2031.9%2050%2025z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  
                  <CardHeader className="relative z-10 pb-8">
                    <div className={`inline-flex items-center justify-center w-24 h-24 ${value.iconBg} rounded-[2rem] mx-auto mb-8 group-hover/value:scale-125 transition-all duration-500 shadow-xl`}>
                      <value.icon className={`w-12 h-12 bg-gradient-to-br ${value.color} bg-clip-text text-transparent`} />
                    </div>
                    <CardTitle className="text-3xl font-black text-gray-900 group-hover/value:scale-105 transition-transform duration-300">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 pb-8">
                    <p className={`${value.textColor} leading-relaxed text-xl font-medium`}>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Learning Journey Section */}
          <section className="space-y-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                  Minha Jornada de{' '}
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    Aprendizado
                  </span>
                </h2>
                <p className="text-lg lg:text-xl text-gray-600 font-medium leading-relaxed">
                  O conhecimento que me formou e continua me inspirando
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Books */}
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/40 hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 overflow-hidden group/books">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover/books:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="text-center pb-6 relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-4 shadow-lg group-hover/books:scale-110 transition-transform duration-500">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-black text-gray-900">
                    Livros que me Formaram
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6 relative z-10">
                  {learningBooks.map((book, index) => (
                    <div key={index} className="group/book flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-100/50 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex space-x-1">
                          {[...Array(book.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current group-hover/book:scale-110 transition-transform duration-300" style={{transitionDelay: `${i * 50}ms`}} />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          {book.category}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-lg mb-1">{book.title}</div>
                        <div className="text-gray-600 font-medium">{book.author}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Goals */}
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-teal-50/40 hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 hover:-rotate-1 overflow-hidden group/goals">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover/goals:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="text-center pb-6 relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl mb-4 shadow-lg group-hover/goals:scale-110 transition-transform duration-500">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-black text-gray-900">
                    Próximos Objetivos
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6 relative z-10">
                  {futureGoals.map((item, index) => (
                    <div key={index} className="group/goal flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-100/50 hover:bg-white/90 transition-all duration-300 hover:-translate-y-1">
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/goal:scale-110 transition-transform duration-300`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-2 text-lg leading-relaxed">{item.goal}</div>
                        <div className="flex items-center space-x-3">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            item.priority === 'Alta' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            Prioridade {item.priority}
                          </div>
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.timeframe}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="relative group/cta">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white overflow-hidden relative hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2">
              {/* Enhanced Background Pattern */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%2240%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
              
              {/* Enhanced Floating Elements */}
              <div className="absolute top-12 left-12 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-12 right-12 w-40 h-40 bg-white/5 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 right-24 w-8 h-8 bg-yellow-400/80 rounded-full animate-ping"></div>
              <div className="absolute top-20 right-1/3 w-6 h-6 bg-pink-400/60 rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-blue-400/70 rounded-full animate-bounce delay-500"></div>
              
              <CardContent className="relative z-10 py-12 lg:py-16 px-6 lg:px-12">
                <div className="text-center space-y-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mb-6 shadow-xl group-hover/cta:scale-110 transition-transform duration-500">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl lg:text-5xl font-black mb-6 tracking-tight">
                      Vamos Aprender{' '}
                      <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                        Juntos?
                      </span>
                    </h2>
                    
                    <p className="text-lg lg:text-xl text-emerald-100 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
                      Esta é uma jornada de aprendizado contínuo. Ainda tenho muito a descobrir,
                      e você pode fazer parte dessa caminhada compartilhando suas dúvidas,
                      experiências e conhecimentos. Juntos, construímos uma comunidade mais
                      consciente financeiramente.
                    </p>
                  </div>
                  
                  {/* Enhanced Stats */}
                  <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[
                      { value: '15+', label: 'Ferramentas Gratuitas', sublabel: 'Calculadoras e recursos', icon: Zap },
                      { value: '100%', label: 'Conteúdo Gratuito', sublabel: 'Sempre será gratuito', icon: Heart },
                      { value: '∞', label: 'Aprendizado Contínuo', sublabel: 'Sempre evoluindo', icon: TrendingUp }
                    ].map((stat, index) => (
                      <div key={index} className="group/stat text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:-translate-y-2">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4 group-hover/stat:scale-110 transition-transform duration-300">
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl lg:text-4xl font-black mb-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">{stat.value}</div>
                        <div className="text-emerald-100 font-bold text-lg mb-1">{stat.label}</div>
                        <div className="text-emerald-200 text-sm">{stat.sublabel}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Call to Action */}
                  <div className="pt-6">
                    <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/25 transition-all duration-300 group/button cursor-pointer">
                      <span className="text-lg font-bold">Explore nossas ferramentas</span>
                      <ArrowRight className="w-5 h-5 group-hover/button:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Sobre;
