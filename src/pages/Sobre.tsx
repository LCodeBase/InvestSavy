
import React from 'react';
import Layout from '../components/Layout';
import { User, BookOpen, Target, Heart, Award, TrendingUp, CheckCircle, Lightbulb, Users, Coffee } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Sobre = () => {
  const values = [
    {
      icon: Heart,
      title: 'Simplicidade',
      description: 'Transformamos conceitos complexos em linguagem clara e acessível para todos.'
    },
    {
      icon: CheckCircle,
      title: 'Transparência',
      description: 'Compartilhamos conhecimento de forma honesta, sem promessas mirabolantes.'
    },
    {
      icon: Users,
      title: 'Acessibilidade',
      description: 'Educação financeira deve ser para todos, independente da renda ou idade.'
    }
  ];

  const learningBooks = [
    'Pai Rico, Pai Pobre - Robert Kiyosaki',
    'O Investidor Inteligente - Benjamin Graham', 
    'Psicologia Financeira - Morgan Housel',
    'O Jeito Peter Lynch de Investir',
    'Dinheiro: Os Segredos de Quem Tem - Gustavo Cerbasi'
  ];

  const certifications = [
    'CPA-20 - Certificação ANBIMA',
    'Curso de Análise de Investimentos',
    'Especialização em Planejamento Financeiro',
    'Curso de Educação Financeira',
    'Workshops sobre Comportamento Financeiro'
  ];

  const futureGoals = [
    'CFA - Chartered Financial Analyst',
    'Análise Técnica Avançada',
    'Fundos Imobiliários e REITs',
    'Criptomoedas e Blockchain',
    'Planejamento Sucessório'
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
        {/* Hero Section */}
        <div className="relative py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-8 shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Sobre o <span className="text-green-600">InvestSavy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A história por trás da plataforma que está democratizando a educação financeira no Brasil
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Quem Sou Section */}
          <div className="mb-20">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="text-center pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Coffee className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Olá, eu sou o Leo!
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg mx-auto max-w-4xl">
                <div className="text-gray-700 space-y-6 text-lg leading-relaxed">
                  <p>
                    Criador do InvestSavy e apaixonado por educação financeira. Não sou economista, 
                    consultor financeiro ou influenciador — sou apenas uma pessoa comum que decidiu 
                    levar a sério sua relação com o dinheiro.
                  </p>
                  <p>
                    Minha jornada começou aos 25 anos, quando percebi que não sabia absolutamente 
                    nada sobre investimentos, planejamento financeiro ou como fazer o dinheiro trabalhar a meu favor. 
                    Desde então, tenho me dedicado intensamente a aprender e aplicar conceitos financeiros na vida real.
                  </p>
                  <p>
                    Acredito profundamente que educação financeira deve ser acessível a todas as pessoas, 
                    por isso criei este espaço para compartilhar conhecimento de forma simples, clara e sem complicação.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Missão e Propósito */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nossa Missão & Propósito
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Entenda o que nos move e por que criamos o InvestSavy
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Problema */}
              <Card className="border-red-100 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-800 flex items-center">
                    <span className="text-3xl mr-3">❌</span>
                    O Problema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-red-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Conteúdo financeiro cheio de jargões técnicos incompreensíveis
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Informações dispersas e difíceis de encontrar
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Falta de ferramentas práticas e gratuitas
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Educação financeira vista como "privilégio de poucos"
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Solução */}
              <Card className="border-green-100 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-800 flex items-center">
                    <span className="text-3xl mr-3">✅</span>
                    Nossa Solução
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-green-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Conteúdo simples e em linguagem clara para todos
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Tudo centralizado, organizado e bem estruturado
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Ferramentas práticas e 100% gratuitas
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Educação financeira democrática e acessível
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Valores */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nossos Valores
              </h2>
              <p className="text-xl text-gray-600">
                Os princípios que guiam nosso trabalho
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Jornada de Aprendizado */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-green-600 mr-4" />
                Minha Jornada de Aprendizado
              </h2>
              <p className="text-xl text-gray-600">
                O conhecimento que me formou e continua me inspirando
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Livros */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Livros que me Formaram
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {learningBooks.map((book, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm leading-relaxed">{book}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Certificações */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Certificações & Cursos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm leading-relaxed">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Próximos Objetivos */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Próximos Objetivos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {futureGoals.map((goal, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm leading-relaxed">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Convite Final */}
          <div className="text-center">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Vamos Aprender Juntos?
                </h2>
                <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Esta é uma jornada de aprendizado contínuo. Ainda tenho muito a descobrir, 
                  e você pode fazer parte dessa caminhada compartilhando suas dúvidas, 
                  experiências e conhecimentos. Juntos, construímos uma comunidade mais 
                  consciente financeiramente.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">15+</div>
                    <div className="text-green-100 text-sm">Ferramentas Gratuitas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">100%</div>
                    <div className="text-green-100 text-sm">Conteúdo Gratuito</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">∞</div>
                    <div className="text-green-100 text-sm">Aprendizado Contínuo</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sobre;
