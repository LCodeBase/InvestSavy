
import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import JurosCalculator from '../components/JurosCalculator';

const CalculadoraJuros = () => {
  // SEO and Structured Data for calculator
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculadora de Juros Compostos',
    description: 'Calculadora gratuita de juros compostos para simular investimentos e planejamento financeiro',
    url: 'https://www.investsavy.online/calculadora-juros',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL'
    },
    provider: {
      '@type': 'Organization',
      name: 'InvestSavy',
      url: 'https://www.investsavy.online/'
    },
    featureList: [
      'Cálculo de juros compostos',
      'Simulação de investimentos',
      'Planejamento financeiro',
      'Análise de rentabilidade',
      'Projeções de crescimento'
    ],
    inLanguage: 'pt-BR'
  };

  return (
    <Layout>
      <SEOHead
        title="Calculadora de Juros Compostos Gratuita | InvestSavy"
        description="Calcule juros compostos de forma simples e gratuita. Simule seus investimentos e planeje seu futuro financeiro com nossa calculadora online."
        keywords="calculadora juros compostos, simulador investimentos, planejamento financeiro, calculadora financeira, juros compostos online"
        url="https://www.investsavy.online/calculadora-juros"
        type="website"
        section="Ferramentas"
        canonical="https://www.investsavy.online/calculadora-juros"
        jsonLd={jsonLd}
      />
      <JurosCalculator />
    </Layout>
  );
};

export default CalculadoraJuros;
