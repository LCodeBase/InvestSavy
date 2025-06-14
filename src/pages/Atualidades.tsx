
import React from 'react';
import Layout from '../components/Layout';
import { TrendingUp, Clock, DollarSign } from 'lucide-react';

const Atualidades = () => {
  const sampleNews = [
    {
      title: 'Banco Central Mantém Selic em 10,75% ao Ano',
      summary: 'Em decisão unânime, o Copom manteve a taxa básica de juros, sinalizando preocupação com a inflação e cenário econômico global.',
      impact: 'Com a Selic alta, investimentos em renda fixa como Tesouro Selic e CDBs ficam mais atrativos. Se você tem dívidas com juros variáveis, elas podem ficar mais caras.',
      date: '15 Jan 2025',
      category: 'Economia'
    },
    {
      title: 'Nova Regra do PIX: Transações Acima de R$ 5 mil Serão Informadas à Receita',
      summary: 'A Receita Federal implementou nova regra de monitoramento para transações PIX de valores elevados, visando maior controle fiscal.',
      impact: 'Se você faz transferências acima de R$ 5 mil, a Receita será notificada. Não é um imposto novo, mas mantenha seus comprovantes organizados para a declaração do IR.',
      date: '12 Jan 2025',
      category: 'Regulamentação'
    },
    {
      title: 'Inflação de Dezembro Fica em 0,21%, Acumulando 4,83% no Ano',
      summary: 'IPCA de dezembro ficou dentro das expectativas, mas inflação anual superou o teto da meta de 4,5% estabelecida pelo governo.',
      impact: 'Inflação acima da meta corrói seu poder de compra. Considere investimentos que protegem contra inflação, como Tesouro IPCA+ ou fundos imobiliários.',
      date: '10 Jan 2025',
      category: 'Inflação'
    }
  ];

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Análise de Atualidades
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traduzo as principais notícias econômicas para uma linguagem simples, 
              explicando como cada acontecimento pode afetar sua vida financeira.
            </p>
          </div>

          {/* News Articles */}
          <div className="space-y-8 mb-16">
            {sampleNews.map((news, index) => (
              <article key={index} className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                    {news.category}
                  </span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{news.date}</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {news.title}
                </h2>

                <div className="space-y-6">
                  {/* Resumo */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                      📰 Resumo da Notícia
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  {/* Impacto */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Como Isso Afeta Seu Bolso?
                    </h3>
                    <p className="text-blue-800 leading-relaxed">
                      {news.impact}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Quer Receber Análises Semanais?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Cadastre-se para receber toda semana um resumo das principais notícias econômicas 
              e como elas podem impactar suas finanças pessoais.
            </p>
            <div className="bg-white p-4 rounded-lg inline-block">
              <p className="text-gray-500 text-sm">
                Em breve: Newsletter semanal "Economia no Seu Bolso"
              </p>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
            <TrendingUp className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Mais Análises em Breve
            </h2>
            <p className="text-gray-600">
              Estou preparando análises regulares sobre decisões do Banco Central, 
              mudanças na economia e novos produtos financeiros. Fique ligado!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Atualidades;
