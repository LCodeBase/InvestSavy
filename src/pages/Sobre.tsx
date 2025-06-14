
import React from 'react';
import Layout from '../components/Layout';
import { User, BookOpen, Target, Heart, Award, TrendingUp } from 'lucide-react';

const Sobre = () => {
  const journey = [
    {
      category: 'Livros que me Formaram',
      items: [
        'Pai Rico, Pai Pobre - Robert Kiyosaki',
        'O Investidor Inteligente - Benjamin Graham', 
        'Psicologia Financeira - Morgan Housel',
        'O Jeito Peter Lynch de Investir',
        'Dinheiro: Os Segredos de Quem Tem - Gustavo Cerbasi'
      ]
    },
    {
      category: 'Certificações e Cursos',
      items: [
        'CPA-20 - Certificação ANBIMA',
        'Curso de Análise de Investimentos',
        'Especialização em Planejamento Financeiro',
        'Curso de Educação Financeira',
        'Workshops sobre Comportamento Financeiro'
      ]
    },
    {
      category: 'O que Ainda Quero Aprender',
      items: [
        'CFA - Chartered Financial Analyst',
        'Análise Técnica Avançada',
        'Fundos Imobiliários e REITs',
        'Criptomoedas e Blockchain',
        'Planejamento Sucessório'
      ]
    }
  ];

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <User className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sobre o InvestSavy
            </h1>
            <p className="text-xl text-gray-600">
              Conheça a história por trás do projeto e quem está compartilhando conhecimento com você.
            </p>
          </div>

          {/* Quem Sou Eu */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="w-8 h-8 text-red-500 mr-3" />
                Quem Sou Eu
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                  Oi! Eu sou o <strong>Leo</strong>, criador do InvestSavy. Não sou economista, 
                  consultor financeiro ou influenciador. Sou apenas uma pessoa comum que decidiu 
                  levar a sério sua educação financeira e agora quer compartilhar esse conhecimento.
                </p>
                <p className="mb-4">
                  Minha jornada começou aos 25 anos, quando percebi que não sabia absolutamente 
                  nada sobre dinheiro, investimentos ou planejamento financeiro. Desde então, 
                  tenho me dedicado a aprender e aplicar conceitos de finanças pessoais na prática.
                </p>
                <p>
                  Acredito que educação financeira deve ser acessível a todos, por isso criei 
                  este espaço para compartilhar o que aprendo de forma simples e sem complicação.
                </p>
              </div>
            </div>
          </section>

          {/* Por Que Criei */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              Por Que Criei o InvestSavy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">❌ O Problema</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Conteúdo financeiro cheio de jargões técnicos</li>
                  <li>• Informações dispersas e difíceis de encontrar</li>
                  <li>• Falta de ferramentas práticas gratuitas</li>
                  <li>• Educação financeira vista como "coisa de rico"</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">✅ A Solução</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• Conteúdo simples e em linguagem clara</li>
                  <li>• Tudo em um só lugar, organizado e estruturado</li>
                  <li>• Ferramentas práticas e totalmente gratuitas</li>
                  <li>• Educação financeira para todos os públicos</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Missão e Valores */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              Missão, Valores e Público
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="p-4 bg-blue-100 rounded-full inline-block mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Nossa Missão</h3>
                <p className="text-gray-600">
                  Democratizar a educação financeira no Brasil, tornando-a acessível e 
                  aplicável para pessoas de todas as idades e rendas.
                </p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-full inline-block mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Nossos Valores</h3>
                <p className="text-gray-600">
                  Simplicidade, transparência e praticidade. Nada de promessas mirabolantes 
                  ou fórmulas mágicas - apenas conhecimento sólido.
                </p>
              </div>
              <div className="text-center">
                <div className="p-4 bg-purple-100 rounded-full inline-block mb-4">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Nosso Público</h3>
                <p className="text-gray-600">
                  Pessoas iniciantes ou intermediárias que querem entender melhor sua 
                  vida financeira e tomar decisões mais conscientes.
                </p>
              </div>
            </div>
          </section>

          {/* Minha Jornada */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <BookOpen className="w-8 h-8 text-purple-600 mr-3" />
              Minha Jornada de Aprendizado
            </h2>
            <div className="space-y-8">
              {journey.map((section, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 text-yellow-500 mr-2" />
                    {section.category}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Vamos Aprender Juntos?
            </h2>
            <p className="text-blue-100 mb-6">
              Esta é uma jornada de aprendizado contínuo. Tenho muito a aprender ainda, 
              e você pode fazer parte dessa caminhada compartilhando suas dúvidas e experiências.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Entre em Contato
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sobre;
