
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const JurosCalculator = () => {
  // Estados para Juros Simples
  const [simplesForm, setSimplesForm] = useState({
    principal: '',
    taxa: '',
    periodo: '',
    unidade: 'anos'
  });
  const [simplesResult, setSimplesResult] = useState(null);

  // Estados para Juros Compostos
  const [compostosForm, setCompostosForm] = useState({
    principal: '',
    taxa: '',
    periodo: '',
    unidade: 'anos'
  });
  const [compostosResult, setCompostosResult] = useState(null);

  // Função para calcular Juros Simples
  const calcularJurosSimples = () => {
    const P = parseFloat(simplesForm.principal);
    const i = parseFloat(simplesForm.taxa) / 100;
    const t = parseFloat(simplesForm.periodo);

    if (!P || !i || !t || P <= 0 || i <= 0 || t <= 0) {
      alert('Por favor, preencha todos os campos com valores válidos');
      return;
    }

    const juros = P * i * t;
    const montante = P + juros;
    const crescimento = (juros / P) * 100;

    setSimplesResult({
      valorFinal: montante,
      valorJuros: juros,
      crescimentoPercentual: crescimento,
      principal: P
    });
  };

  // Função para calcular Juros Compostos
  const calcularJurosCompostos = () => {
    const P = parseFloat(compostosForm.principal);
    const i = parseFloat(compostosForm.taxa) / 100;
    const t = parseFloat(compostosForm.periodo);

    if (!P || !i || !t || P <= 0 || i <= 0 || t <= 0) {
      alert('Por favor, preencha todos os campos com valores válidos');
      return;
    }

    const montante = P * Math.pow((1 + i), t);
    const juros = montante - P;
    const crescimento = (juros / P) * 100;

    setCompostosResult({
      valorFinal: montante,
      valorJuros: juros,
      crescimentoPercentual: crescimento,
      principal: P
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const ResultCard = ({ result, type }) => {
    if (!result) return null;

    const progressValue = Math.min((result.valorJuros / result.principal) * 100, 100);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 space-y-4"
      >
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Resultado - {type}
          </h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Valor Final</span>
                <span className="text-lg font-bold text-gray-900">{formatCurrency(result.valorFinal)}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Juros Ganhos</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(result.valorJuros)}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Crescimento Total</span>
                <span className="text-lg font-bold text-blue-600">{result.crescimentoPercentual.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progresso dos Juros</span>
              <span className="text-sm text-green-600">{Math.min(progressValue, 100).toFixed(1)}%</span>
            </div>
            <Progress value={progressValue} className="h-3" />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
            <Calculator className="w-4 h-4 mr-2" />
            Calculadora Funcional
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Juros: 
            <span className="text-green-600"> Simples x Compostos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare o poder dos juros simples e compostos. Veja como pequenas diferenças nas taxas podem gerar grandes impactos no longo prazo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculadora de Juros Simples */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-fit">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-blue-600">
                  <DollarSign className="w-6 h-6 mr-2" />
                  Juros Simples
                </CardTitle>
                <p className="text-sm text-gray-600">Juros calculados apenas sobre o valor inicial</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor Inicial (R$)</label>
                  <Input
                    type="number"
                    placeholder="Ex: 1000"
                    value={simplesForm.principal}
                    onChange={(e) => setSimplesForm(prev => ({ ...prev, principal: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taxa de Juros (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 5.5"
                    value={simplesForm.taxa}
                    onChange={(e) => setSimplesForm(prev => ({ ...prev, taxa: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                    <Input
                      type="number"
                      placeholder="Ex: 12"
                      value={simplesForm.periodo}
                      onChange={(e) => setSimplesForm(prev => ({ ...prev, periodo: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unidade</label>
                    <Select value={simplesForm.unidade} onValueChange={(value) => setSimplesForm(prev => ({ ...prev, unidade: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meses">Meses</SelectItem>
                        <SelectItem value="anos">Anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={calcularJurosSimples} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calcular Juros Simples
                </Button>

                <ResultCard result={simplesResult} type="Juros Simples" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Calculadora de Juros Compostos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-fit">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center text-green-600">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  Juros Compostos
                </CardTitle>
                <p className="text-sm text-gray-600">Juros calculados sobre o valor + juros acumulados</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor Inicial (R$)</label>
                  <Input
                    type="number"
                    placeholder="Ex: 1000"
                    value={compostosForm.principal}
                    onChange={(e) => setCompostosForm(prev => ({ ...prev, principal: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taxa de Juros (%)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 5.5"
                    value={compostosForm.taxa}
                    onChange={(e) => setCompostosForm(prev => ({ ...prev, taxa: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                    <Input
                      type="number"
                      placeholder="Ex: 12"
                      value={compostosForm.periodo}
                      onChange={(e) => setCompostosForm(prev => ({ ...prev, periodo: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unidade</label>
                    <Select value={compostosForm.unidade} onValueChange={(value) => setCompostosForm(prev => ({ ...prev, unidade: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meses">Meses</SelectItem>
                        <SelectItem value="anos">Anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={calcularJurosCompostos} className="w-full bg-green-600 hover:bg-green-700">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Calcular Juros Compostos
                </Button>

                <ResultCard result={compostosResult} type="Juros Compostos" />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Explicação sobre a diferença */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-2xl p-8 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Entenda a Diferença</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Juros Simples</h4>
              <p className="text-sm text-gray-600">
                Os juros são calculados sempre sobre o valor inicial. Crescimento linear ao longo do tempo.
                Fórmula: M = P + (P × i × t)
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Juros Compostos</h4>
              <p className="text-sm text-gray-600">
                Os juros são calculados sobre o valor inicial + juros acumulados. Crescimento exponencial.
                Fórmula: M = P × (1 + i)^t
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JurosCalculator;
