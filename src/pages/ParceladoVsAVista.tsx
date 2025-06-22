import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { Calculator, CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle, Info, Lightbulb, ArrowRight, Percent, Calendar, Target, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const ParceladoVsAVista = () => {
  const [valorTotal, setValorTotal] = useState('');
  const [descontoAVista, setDescontoAVista] = useState('');
  const [numeroParcelas, setNumeroParcelas] = useState('');
  const [jurosParcelas, setJurosParcelas] = useState('');
  const [rendimentoInvestimento, setRendimentoInvestimento] = useState('');
  const [resultados, setResultados] = useState(null);

  // SEO and Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculadora Parcelado vs À Vista',
    description: 'Compare matematicamente se é melhor pagar parcelado ou à vista considerando juros e oportunidade de investimento',
    url: 'https://investsavy.com.br/ferramentas/parcelado-vs-avista',
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
      url: 'https://investsavy.com.br'
    },
    featureList: [
      'Comparação parcelado vs à vista',
      'Cálculo de custo de oportunidade',
      'Análise de juros embutidos',
      'Simulação de investimento',
      'Recomendação personalizada'
    ],
    inLanguage: 'pt-BR'
  };

  const calcularComparacao = () => {
    const valor = parseFloat(valorTotal.replace(/[^\d,]/g, '').replace(',', '.'));
    const desconto = parseFloat(descontoAVista.replace(/[^\d,]/g, '').replace(',', '.'));
    const parcelas = parseInt(numeroParcelas);
    const juros = parseFloat(jurosParcelas.replace(/[^\d,]/g, '').replace(',', '.'));
    const rendimento = parseFloat(rendimentoInvestimento.replace(/[^\d,]/g, '').replace(',', '.'));

    if (!valor || valor <= 0) return;

    // Valor à vista
    const valorAVista = valor * (1 - (desconto || 0) / 100);
    
    // Valor parcelado
    let valorParcela;
    let valorTotalParcelado;
    
    if (juros && juros > 0) {
      // Com juros
      const taxaMensal = juros / 100;
      valorParcela = (valor * taxaMensal * Math.pow(1 + taxaMensal, parcelas)) / (Math.pow(1 + taxaMensal, parcelas) - 1);
      valorTotalParcelado = valorParcela * parcelas;
    } else {
      // Sem juros
      valorParcela = valor / parcelas;
      valorTotalParcelado = valor;
    }

    // Custo de oportunidade (se investir o dinheiro)
    const taxaRendimentoMensal = (rendimento || 0) / 100 / 12;
    let valorInvestido = 0;
    
    if (taxaRendimentoMensal > 0) {
      // Simula investimento mensal do valor da parcela
      for (let i = 0; i < parcelas; i++) {
        valorInvestido += valorParcela * Math.pow(1 + taxaRendimentoMensal, parcelas - i);
      }
    } else {
      valorInvestido = valorParcela * parcelas;
    }

    // Diferença se investir o valor à vista
    const valorAVistaInvestido = valorAVista * Math.pow(1 + taxaRendimentoMensal, parcelas);
    
    // Economia real
    const economiaParcelado = valorInvestido - valorTotalParcelado;
    const economiaAVista = valorAVistaInvestido - valorAVista;
    
    // Taxa de juros embutida no parcelamento
    const taxaJurosEmbutida = parcelas > 1 ? (Math.pow(valorTotalParcelado / valor, 1/parcelas) - 1) * 12 * 100 : 0;

    setResultados({
      valorAVista,
      valorParcela,
      valorTotalParcelado,
      valorInvestido,
      valorAVistaInvestido,
      economiaParcelado,
      economiaAVista,
      taxaJurosEmbutida,
      melhorOpcao: economiaParcelado > economiaAVista ? 'parcelado' : 'avista',
      diferencaEconomia: Math.abs(economiaParcelado - economiaAVista)
    });
  };

  useEffect(() => {
    if (valorTotal && numeroParcelas) {
      calcularComparacao();
    }
  }, [valorTotal, descontoAVista, numeroParcelas, jurosParcelas, rendimentoInvestimento]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  };

  const formatPercent = (value) => {
    return `${(value || 0).toFixed(2)}%`;
  };

  const handleCurrencyInput = (value, setter) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numericValue / 100);
    setter(formattedValue);
  };

  const handlePercentInput = (value, setter) => {
    const numericValue = value.replace(/[^\d,]/g, '');
    setter(numericValue + (numericValue && !numericValue.includes('%') ? '%' : ''));
  };

  return (
    <Layout>
      <SEOHead
        title="Parcelado vs À Vista - Calculadora Gratuita | InvestSavy"
        description="Descubra matematicamente se é melhor pagar parcelado ou à vista. Compare juros, descontos e oportunidade de investimento."
        keywords="parcelado vs à vista, calculadora financeira, juros parcelamento, desconto à vista, custo oportunidade"
        url="https://investsavy.com.br/ferramentas/parcelado-vs-avista"
        type="website"
        section="Ferramentas"
        canonical="https://investsavy.com.br/ferramentas/parcelado-vs-avista"
        jsonLd={jsonLd}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6">
              <Calculator className="w-4 h-4 mr-2" />
              Ferramenta de Comparação
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Parcelado vs 
              <span className="text-indigo-600"> À Vista</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Descubra matematicamente qual é a melhor opção para sua compra considerando 
              juros, descontos e oportunidade de investimento.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-100 rounded-xl mr-4">
                  <CreditCard className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Dados da Compra</h2>
                  <p className="text-gray-600">Preencha as informações para comparar</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Valor Total */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Valor Total do Produto
                  </label>
                  <input
                    type="text"
                    value={valorTotal}
                    onChange={(e) => handleCurrencyInput(e.target.value, setValorTotal)}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                  />
                </div>

                {/* Desconto à Vista */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Percent className="w-4 h-4 inline mr-1" />
                    Desconto à Vista (opcional)
                  </label>
                  <input
                    type="text"
                    value={descontoAVista}
                    onChange={(e) => handlePercentInput(e.target.value, setDescontoAVista)}
                    placeholder="0%"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Número de Parcelas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Número de Parcelas
                  </label>
                  <select
                    value={numeroParcelas}
                    onChange={(e) => setNumeroParcelas(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    {[...Array(24)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}x</option>
                    ))}
                  </select>
                </div>

                {/* Juros do Parcelamento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    Juros do Parcelamento (% ao mês)
                  </label>
                  <input
                    type="text"
                    value={jurosParcelas}
                    onChange={(e) => handlePercentInput(e.target.value, setJurosParcelas)}
                    placeholder="0% (sem juros)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Deixe em branco se for parcelamento sem juros</p>
                </div>

                {/* Rendimento do Investimento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Target className="w-4 h-4 inline mr-1" />
                    Rendimento do seu Investimento (% ao ano)
                  </label>
                  <input
                    type="text"
                    value={rendimentoInvestimento}
                    onChange={(e) => handlePercentInput(e.target.value, setRendimentoInvestimento)}
                    placeholder="12% (CDI, poupança, etc.)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Taxa anual do investimento onde você aplicaria o dinheiro</p>
                </div>
              </div>
            </motion.div>

            {/* Resultados */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {resultados ? (
                <>
                  {/* Recomendação Principal */}
                  <div className={`rounded-2xl p-6 border-2 ${
                    resultados.melhorOpcao === 'avista' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-xl mr-4 ${
                        resultados.melhorOpcao === 'avista' 
                          ? 'bg-green-100' 
                          : 'bg-blue-100'
                      }`}>
                        <CheckCircle className={`w-6 h-6 ${
                          resultados.melhorOpcao === 'avista' 
                            ? 'text-green-600' 
                            : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Melhor Opção: {resultados.melhorOpcao === 'avista' ? 'À Vista' : 'Parcelado'}
                        </h3>
                        <p className="text-gray-600">
                          Economia de {formatCurrency(resultados.diferencaEconomia)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Comparação Detalhada */}
                  <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Comparação Detalhada
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* À Vista */}
                      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Pagamento à Vista
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Valor com desconto:</span>
                            <span className="font-medium">{formatCurrency(resultados.valorAVista)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Se investir o valor:</span>
                            <span className="font-medium">{formatCurrency(resultados.valorAVistaInvestido)}</span>
                          </div>
                          <div className="flex justify-between border-t border-green-200 pt-2">
                            <span className="font-medium">Resultado final:</span>
                            <span className="font-bold text-green-700">
                              {formatCurrency(resultados.economiaAVista)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Parcelado */}
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                          <CreditCard className="w-4 h-4 mr-1" />
                          Pagamento Parcelado
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Valor da parcela:</span>
                            <span className="font-medium">{formatCurrency(resultados.valorParcela)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total parcelado:</span>
                            <span className="font-medium">{formatCurrency(resultados.valorTotalParcelado)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Investindo parcelas:</span>
                            <span className="font-medium">{formatCurrency(resultados.valorInvestido)}</span>
                          </div>
                          <div className="flex justify-between border-t border-blue-200 pt-2">
                            <span className="font-medium">Resultado final:</span>
                            <span className="font-bold text-blue-700">
                              {formatCurrency(resultados.economiaParcelado)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Informações Adicionais */}
                    {resultados.taxaJurosEmbutida > 0 && (
                      <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <div className="flex items-center mb-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                          <span className="font-medium text-yellow-800">Taxa de Juros Embutida</span>
                        </div>
                        <p className="text-sm text-yellow-700">
                          O parcelamento tem uma taxa de juros embutida de aproximadamente {formatPercent(resultados.taxaJurosEmbutida)} ao ano.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                  <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-4">
                    <Calculator className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Preencha os Dados</h3>
                  <p className="text-gray-600">
                    Complete as informações ao lado para ver a comparação detalhada
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Dicas e Informações */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="p-3 bg-blue-100 rounded-xl w-fit mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Dica: Custo de Oportunidade</h3>
              <p className="text-sm text-gray-600">
                Sempre considere o que você poderia ganhar investindo o dinheiro em vez de pagar à vista. 
                Mesmo rendimentos baixos podem fazer diferença.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="p-3 bg-green-100 rounded-xl w-fit mb-4">
                <Info className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Parcelamento sem Juros</h3>
              <p className="text-sm text-gray-600">
                Quando o parcelamento é realmente sem juros, geralmente é melhor parcelar e 
                investir o dinheiro que sobra.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="p-3 bg-purple-100 rounded-xl w-fit mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Considere sua Situação</h3>
              <p className="text-sm text-gray-600">
                Além dos números, considere sua situação financeira atual, reserva de emergência 
                e capacidade de pagamento das parcelas.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ParceladoVsAVista;