import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, HelpCircle, AlertCircle, TrendingUp, DollarSign, Percent } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from "recharts";

// Definição da interface para os dados do financiamento
interface DadosFinanciamento {
  parcela: number;
  amortizacao: number;
  juros: number;
  saldoDevedor: number;
  valorParcela: number;
}

// Definição da interface para os dados de comparação
interface DadosComparacao {
  mes: number;
  parcelaPrice: number;
  parcelaSAC: number;
  amortizacaoPrice: number;
  amortizacaoSAC: number;
  jurosPrice: number;
  jurosSAC: number;
  saldoDevedorPrice: number;
  saldoDevedorSAC: number;
}

const SimuladorFinanciamentoImobiliario = () => {
  // Estados para os inputs do usuário
  const [valorImovel, setValorImovel] = useState<number>(300000);
  const [valorEntrada, setValorEntrada] = useState<number>(60000);
  const [taxaJurosAnual, setTaxaJurosAnual] = useState<number>(10);
  const [prazoAnos, setPrazoAnos] = useState<number>(20);
  const [sistemaAmortizacao, setSistemaAmortizacao] = useState<string>("price");

  // Estados para os resultados calculados
  const [valorFinanciado, setValorFinanciado] = useState<number>(0);
  const [taxaJurosMensal, setTaxaJurosMensal] = useState<number>(0);
  const [prazoMeses, setPrazoMeses] = useState<number>(0);
  const [parcelaInicial, setParcelaInicial] = useState<number>(0);
  const [parcelaFinal, setParcelaFinal] = useState<number>(0);
  const [totalPago, setTotalPago] = useState<number>(0);
  const [totalJuros, setTotalJuros] = useState<number>(0);
  const [dadosPrice, setDadosPrice] = useState<DadosFinanciamento[]>([]);
  const [dadosSAC, setDadosSAC] = useState<DadosFinanciamento[]>([]);
  const [dadosComparacao, setDadosComparacao] = useState<DadosComparacao[]>([]);
  const [economiaTotal, setEconomiaTotal] = useState<number>(0);

  // Função para calcular a taxa de juros mensal a partir da taxa anual
  const calcularTaxaJurosMensal = (taxaAnual: number) => {
    return Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
  };

  // Função para calcular o financiamento pelo sistema Price (parcelas fixas)
  const calcularFinanciamentoPrice = () => {
    const valor = valorImovel - valorEntrada;
    const taxa = calcularTaxaJurosMensal(taxaJurosAnual);
    const prazo = prazoAnos * 12;
    
    // Cálculo da parcela fixa (Price)
    // PMT = PV * [(1 + i)^n * i] / [(1 + i)^n - 1]
    const parcela = valor * (Math.pow(1 + taxa, prazo) * taxa) / (Math.pow(1 + taxa, prazo) - 1);
    
    let saldoDevedor = valor;
    let totalJuros = 0;
    const dados: DadosFinanciamento[] = [];
    
    for (let i = 1; i <= prazo; i++) {
      // Cálculo dos juros do período
      const juros = saldoDevedor * taxa;
      
      // Cálculo da amortização (parcela - juros)
      const amortizacao = parcela - juros;
      
      // Atualização do saldo devedor
      saldoDevedor -= amortizacao;
      
      // Acumulando o total de juros
      totalJuros += juros;
      
      // Armazenando os dados do período
      if (i === 1 || i === prazo || i % 12 === 0) {
        dados.push({
          parcela: i,
          amortizacao: amortizacao,
          juros: juros,
          saldoDevedor: Math.max(0, saldoDevedor),
          valorParcela: parcela
        });
      }
    }
    
    setDadosPrice(dados);
    setParcelaInicial(parcela);
    setParcelaFinal(parcela);
    setTotalPago(parcela * prazo);
    setTotalJuros(totalJuros);
    
    return {
      parcela,
      totalPago: parcela * prazo,
      totalJuros,
      dados
    };
  };

  // Função para calcular o financiamento pelo sistema SAC (amortização constante)
  const calcularFinanciamentoSAC = () => {
    const valor = valorImovel - valorEntrada;
    const taxa = calcularTaxaJurosMensal(taxaJurosAnual);
    const prazo = prazoAnos * 12;
    
    // Cálculo da amortização constante (SAC)
    const amortizacaoConstante = valor / prazo;
    
    let saldoDevedor = valor;
    let totalJuros = 0;
    let primeiraParcelaSAC = 0;
    let ultimaParcelaSAC = 0;
    const dados: DadosFinanciamento[] = [];
    
    for (let i = 1; i <= prazo; i++) {
      // Cálculo dos juros do período
      const juros = saldoDevedor * taxa;
      
      // Cálculo da parcela (amortização + juros)
      const parcela = amortizacaoConstante + juros;
      
      if (i === 1) {
        primeiraParcelaSAC = parcela;
      }
      
      if (i === prazo) {
        ultimaParcelaSAC = parcela;
      }
      
      // Atualização do saldo devedor
      saldoDevedor -= amortizacaoConstante;
      
      // Acumulando o total de juros
      totalJuros += juros;
      
      // Armazenando os dados do período
      if (i === 1 || i === prazo || i % 12 === 0) {
        dados.push({
          parcela: i,
          amortizacao: amortizacaoConstante,
          juros: juros,
          saldoDevedor: Math.max(0, saldoDevedor),
          valorParcela: parcela
        });
      }
    }
    
    setDadosSAC(dados);
    setParcelaInicial(primeiraParcelaSAC);
    setParcelaFinal(ultimaParcelaSAC);
    setTotalPago(totalJuros + valor);
    setTotalJuros(totalJuros);
    
    return {
      parcelaInicial: primeiraParcelaSAC,
      parcelaFinal: ultimaParcelaSAC,
      totalPago: totalJuros + valor,
      totalJuros,
      dados
    };
  };

  // Função para comparar os sistemas de amortização
  const compararSistemas = () => {
    const valor = valorImovel - valorEntrada;
    const taxa = calcularTaxaJurosMensal(taxaJurosAnual);
    const prazo = prazoAnos * 12;
    
    // Cálculo da parcela fixa (Price)
    const parcelaPrice = valor * (Math.pow(1 + taxa, prazo) * taxa) / (Math.pow(1 + taxa, prazo) - 1);
    
    // Cálculo da amortização constante (SAC)
    const amortizacaoConstante = valor / prazo;
    
    let saldoDevedorPrice = valor;
    let saldoDevedorSAC = valor;
    let totalJurosPrice = 0;
    let totalJurosSAC = 0;
    const dadosComparacao: DadosComparacao[] = [];
    
    // Calculando os dados para cada mês, mas armazenando apenas alguns pontos para o gráfico
    for (let i = 1; i <= prazo; i++) {
      // Cálculos para o sistema Price
      const jurosPrice = saldoDevedorPrice * taxa;
      const amortizacaoPrice = parcelaPrice - jurosPrice;
      saldoDevedorPrice -= amortizacaoPrice;
      totalJurosPrice += jurosPrice;
      
      // Cálculos para o sistema SAC
      const jurosSAC = saldoDevedorSAC * taxa;
      const parcelaSAC = amortizacaoConstante + jurosSAC;
      saldoDevedorSAC -= amortizacaoConstante;
      totalJurosSAC += jurosSAC;
      
      // Armazenando os dados para comparação (apenas alguns pontos para não sobrecarregar o gráfico)
      if (i === 1 || i === prazo || i % 12 === 0) {
        dadosComparacao.push({
          mes: i,
          parcelaPrice: parcelaPrice,
          parcelaSAC: parcelaSAC,
          amortizacaoPrice: amortizacaoPrice,
          amortizacaoSAC: amortizacaoConstante,
          jurosPrice: jurosPrice,
          jurosSAC: jurosSAC,
          saldoDevedorPrice: Math.max(0, saldoDevedorPrice),
          saldoDevedorSAC: Math.max(0, saldoDevedorSAC)
        });
      }
    }
    
    setDadosComparacao(dadosComparacao);
    
    // Calculando a economia total (diferença entre os totais pagos)
    const totalPagoPrice = parcelaPrice * prazo;
    const totalPagoSAC = totalJurosSAC + valor;
    
    // A economia depende de qual sistema é mais vantajoso
    const economia = Math.abs(totalPagoPrice - totalPagoSAC);
    setEconomiaTotal(economia);
    
    return {
      dadosComparacao,
      economia,
      melhorSistema: totalPagoSAC < totalPagoPrice ? "SAC" : "Price"
    };
  };

  // Função para formatar valores monetários
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Função para realizar todos os cálculos
  const calcular = () => {
    setValorFinanciado(valorImovel - valorEntrada);
    setTaxaJurosMensal(calcularTaxaJurosMensal(taxaJurosAnual) * 100);
    setPrazoMeses(prazoAnos * 12);
    
    if (sistemaAmortizacao === "price") {
      calcularFinanciamentoPrice();
    } else {
      calcularFinanciamentoSAC();
    }
    
    compararSistemas();
  };

  // Calcula os resultados quando os inputs mudam
  useEffect(() => {
    calcular();
  }, [valorImovel, valorEntrada, taxaJurosAnual, prazoAnos, sistemaAmortizacao]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simulador de Financiamento Imobiliário
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Compare diferentes opções de financiamento e encontre a melhor para seu perfil
              </p>
              <div className="text-sm text-gray-500 mt-2">
                1.2k simulações realizadas
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-12 gap-8">
                {/* Painel de Entrada */}
                <div className="md:col-span-5">
                  <Card>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-finance-blue/10 flex items-center justify-center mb-3">
                        <Home className="h-6 w-6 text-finance-blue" />
                      </div>
                      <CardTitle>Dados do Financiamento</CardTitle>
                      <CardDescription>
                        Preencha as informações abaixo para simular seu financiamento
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Valor do Imóvel */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="valor-imovel">Valor do Imóvel</Label>
                          <span className="text-sm text-gray-500">{formatarMoeda(valorImovel)}</span>
                        </div>
                        <Input
                          id="valor-imovel"
                          type="number"
                          value={valorImovel}
                          onChange={(e) => setValorImovel(Number(e.target.value))}
                          className="w-full"
                        />
                        <Slider
                          value={[valorImovel]}
                          min={100000}
                          max={2000000}
                          step={10000}
                          onValueChange={(value) => setValorImovel(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>R$ 100 mil</span>
                          <span>R$ 2 milhões</span>
                        </div>
                      </div>

                      {/* Valor da Entrada */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="valor-entrada">Valor da Entrada</Label>
                          <span className="text-sm text-gray-500">
                            {formatarMoeda(valorEntrada)} ({Math.round((valorEntrada / valorImovel) * 100)}%)
                          </span>
                        </div>
                        <Input
                          id="valor-entrada"
                          type="number"
                          value={valorEntrada}
                          onChange={(e) => setValorEntrada(Number(e.target.value))}
                          className="w-full"
                        />
                        <Slider
                          value={[valorEntrada]}
                          min={0}
                          max={valorImovel * 0.9}
                          step={5000}
                          onValueChange={(value) => setValorEntrada(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0%</span>
                          <span>90%</span>
                        </div>
                      </div>

                      {/* Taxa de Juros */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="taxa-juros">Taxa de Juros (a.a.)</Label>
                          <span className="text-sm text-gray-500">{taxaJurosAnual.toFixed(2)}% ao ano</span>
                        </div>
                        <Input
                          id="taxa-juros"
                          type="number"
                          value={taxaJurosAnual}
                          onChange={(e) => setTaxaJurosAnual(Number(e.target.value))}
                          className="w-full"
                          step="0.1"
                        />
                        <Slider
                          value={[taxaJurosAnual]}
                          min={5}
                          max={15}
                          step={0.1}
                          onValueChange={(value) => setTaxaJurosAnual(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>5%</span>
                          <span>15%</span>
                        </div>
                      </div>

                      {/* Prazo */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="prazo">Prazo</Label>
                          <span className="text-sm text-gray-500">{prazoAnos} anos ({prazoAnos * 12} meses)</span>
                        </div>
                        <Input
                          id="prazo"
                          type="number"
                          value={prazoAnos}
                          onChange={(e) => setPrazoAnos(Number(e.target.value))}
                          className="w-full"
                        />
                        <Slider
                          value={[prazoAnos]}
                          min={5}
                          max={35}
                          step={1}
                          onValueChange={(value) => setPrazoAnos(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>5 anos</span>
                          <span>35 anos</span>
                        </div>
                      </div>

                      {/* Sistema de Amortização */}
                      <div className="space-y-2">
                        <Label htmlFor="sistema">Sistema de Amortização</Label>
                        <Select
                          value={sistemaAmortizacao}
                          onValueChange={(value) => setSistemaAmortizacao(value)}
                        >
                          <SelectTrigger id="sistema">
                            <SelectValue placeholder="Selecione o sistema" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="price">Price (Parcelas Fixas)</SelectItem>
                            <SelectItem value="sac">SAC (Amortização Constante)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-4">
                        <Button
                          className="w-full bg-finance-blue hover:bg-finance-blue-dark text-white"
                          onClick={calcular}
                        >
                          Simular Financiamento
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Card Informativo */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Entenda os Sistemas de Amortização</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div className="space-y-2">
                        <h3 className="font-semibold">Sistema Price (Parcelas Fixas)</h3>
                        <p className="text-gray-600">
                          No sistema Price, as parcelas são fixas do início ao fim do financiamento. 
                          No começo, a maior parte da parcela é composta por juros, e com o tempo, 
                          a proporção de amortização aumenta.
                        </p>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          <li>Parcelas iguais do início ao fim</li>
                          <li>Bom para quem prefere previsibilidade no orçamento</li>
                          <li>Geralmente resulta em mais juros pagos no total</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold">Sistema SAC (Amortização Constante)</h3>
                        <p className="text-gray-600">
                          No sistema SAC, a amortização é constante, mas as parcelas são decrescentes. 
                          As primeiras parcelas são mais altas, mas diminuem ao longo do tempo, 
                          à medida que os juros sobre o saldo devedor diminuem.
                        </p>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          <li>Parcelas decrescentes ao longo do tempo</li>
                          <li>Amortização constante do saldo devedor</li>
                          <li>Geralmente resulta em menos juros pagos no total</li>
                          <li>Exige maior capacidade de pagamento no início</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Painel de Resultados */}
                <div className="md:col-span-7">
                  <Tabs defaultValue="resumo" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="resumo">Resumo</TabsTrigger>
                      <TabsTrigger value="comparacao">Comparação</TabsTrigger>
                      <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
                    </TabsList>

                    {/* Aba de Resumo */}
                    <TabsContent value="resumo">
                      <Card>
                        <CardHeader>
                          <CardTitle>Resumo do Financiamento</CardTitle>
                          <CardDescription>
                            Visão geral do seu financiamento imobiliário
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium text-gray-500">Valor Financiado</h3>
                              <p className="text-2xl font-semibold">{formatarMoeda(valorFinanciado)}</p>
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium text-gray-500">Taxa de Juros</h3>
                              <p className="text-2xl font-semibold">{taxaJurosAnual.toFixed(2)}% a.a. ({taxaJurosMensal.toFixed(3)}% a.m.)</p>
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium text-gray-500">Sistema de Amortização</h3>
                              <p className="text-2xl font-semibold">{sistemaAmortizacao === "price" ? "Price" : "SAC"}</p>
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium text-gray-500">Prazo</h3>
                              <p className="text-2xl font-semibold">{prazoAnos} anos ({prazoMeses} meses)</p>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-500">Primeira Parcela</h3>
                                <p className="text-2xl font-semibold text-finance-blue">{formatarMoeda(parcelaInicial)}</p>
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-500">Última Parcela</h3>
                                <p className="text-2xl font-semibold text-finance-blue">{formatarMoeda(parcelaFinal)}</p>
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-500">Total de Juros</h3>
                                <p className="text-2xl font-semibold text-finance-blue">{formatarMoeda(totalJuros)}</p>
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-sm font-medium text-gray-500">Total Pago</h3>
                                <p className="text-2xl font-semibold text-finance-blue">{formatarMoeda(totalPago)}</p>
                              </div>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Evolução do Saldo Devedor</h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <AreaChart
                                data={sistemaAmortizacao === "price" ? dadosPrice : dadosSAC}
                                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                  dataKey="parcela" 
                                  label={{ value: 'Mês', position: 'insideBottom', offset: -5 }} 
                                />
                                <YAxis 
                                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                                  label={{ value: 'Saldo (R$)', angle: -90, position: 'insideLeft' }} 
                                />
                                <Tooltip 
                                  formatter={(value) => [formatarMoeda(Number(value)), "Saldo Devedor"]}
                                  labelFormatter={(label) => `Mês ${label}`}
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey="saldoDevedor" 
                                  name="Saldo Devedor" 
                                  stroke="#3b82f6" 
                                  fill="#93c5fd" 
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-700 mb-2">Dica Financeira</h3>
                            <p className="text-blue-600 mb-2">
                              Ao escolher um financiamento imobiliário, considere sua capacidade de pagamento atual e futura. 
                              O sistema SAC geralmente resulta em menos juros pagos no total, mas exige parcelas maiores no início.
                            </p>
                            <p className="text-blue-600">
                              Lembre-se que além das parcelas, existem outros custos como ITBI, registro de imóvel, 
                              seguros obrigatórios e taxa de avaliação do imóvel.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Aba de Comparação */}
                    <TabsContent value="comparacao">
                      <Card>
                        <CardHeader>
                          <CardTitle>Comparação entre Sistemas</CardTitle>
                          <CardDescription>
                            Compare os sistemas Price e SAC para tomar a melhor decisão
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-green-50 p-4 rounded-lg mb-6">
                            <h3 className="text-lg font-semibold text-green-700 mb-2">Economia Potencial</h3>
                            <p className="text-green-600 mb-2">
                              Escolhendo o sistema {dadosSAC[0]?.valorParcela > dadosPrice[0]?.valorParcela ? "Price" : "SAC"}, 
                              você pode economizar até {formatarMoeda(economiaTotal)} ao longo do financiamento.
                            </p>
                            <p className="text-green-600">
                              {dadosSAC[0]?.valorParcela > dadosPrice[0]?.valorParcela 
                                ? "O sistema Price oferece parcelas menores no início, mas você pagará mais juros no total." 
                                : "O sistema SAC tem parcelas maiores no início, mas você pagará menos juros no total."}
                            </p>
                          </div>

                          <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Comparação das Parcelas</h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <LineChart
                                data={dadosComparacao}
                                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                  dataKey="mes" 
                                  label={{ value: 'Mês', position: 'insideBottom', offset: -5 }} 
                                />
                                <YAxis 
                                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                                  label={{ value: 'Valor (R$)', angle: -90, position: 'insideLeft' }} 
                                />
                                <Tooltip 
                                  formatter={(value) => [formatarMoeda(Number(value)), ""]}
                                  labelFormatter={(label) => `Mês ${label}`}
                                />
                                <Legend />
                                <Line 
                                  type="monotone" 
                                  dataKey="parcelaPrice" 
                                  name="Parcela Price" 
                                  stroke="#3b82f6" 
                                  strokeWidth={2} 
                                  dot={{ r: 3 }} 
                                  activeDot={{ r: 5 }} 
                                />
                                <Line 
                                  type="monotone" 
                                  dataKey="parcelaSAC" 
                                  name="Parcela SAC" 
                                  stroke="#10b981" 
                                  strokeWidth={2} 
                                  dot={{ r: 3 }} 
                                  activeDot={{ r: 5 }} 
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Comparação dos Juros</h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <LineChart
                                data={dadosComparacao}
                                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                  dataKey="mes" 
                                  label={{ value: 'Mês', position: 'insideBottom', offset: -5 }} 
                                />
                                <YAxis 
                                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                                  label={{ value: 'Juros (R$)', angle: -90, position: 'insideLeft' }} 
                                />
                                <Tooltip 
                                  formatter={(value) => [formatarMoeda(Number(value)), ""]}
                                  labelFormatter={(label) => `Mês ${label}`}
                                />
                                <Legend />
                                <Line 
                                  type="monotone" 
                                  dataKey="jurosPrice" 
                                  name="Juros Price" 
                                  stroke="#ef4444" 
                                  strokeWidth={2} 
                                  dot={{ r: 3 }} 
                                  activeDot={{ r: 5 }} 
                                />
                                <Line 
                                  type="monotone" 
                                  dataKey="jurosSAC" 
                                  name="Juros SAC" 
                                  stroke="#f97316" 
                                  strokeWidth={2} 
                                  dot={{ r: 3 }} 
                                  activeDot={{ r: 5 }} 
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h3 className="text-lg font-semibold text-blue-700 mb-2">Sistema Price</h3>
                              <ul className="list-disc pl-5 text-blue-600 space-y-2">
                                <li>Parcela inicial: {formatarMoeda(dadosComparacao[0]?.parcelaPrice || 0)}</li>
                                <li>Parcela final: {formatarMoeda(dadosComparacao[dadosComparacao.length - 1]?.parcelaPrice || 0)}</li>
                                <li>Total de juros: {formatarMoeda(dadosComparacao.reduce((acc, item) => acc + item.jurosPrice, 0))}</li>
                                <li>Total pago: {formatarMoeda((dadosComparacao[0]?.parcelaPrice || 0) * prazoMeses)}</li>
                              </ul>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h3 className="text-lg font-semibold text-green-700 mb-2">Sistema SAC</h3>
                              <ul className="list-disc pl-5 text-green-600 space-y-2">
                                <li>Parcela inicial: {formatarMoeda(dadosComparacao[0]?.parcelaSAC || 0)}</li>
                                <li>Parcela final: {formatarMoeda(dadosComparacao[dadosComparacao.length - 1]?.parcelaSAC || 0)}</li>
                                <li>Total de juros: {formatarMoeda(dadosComparacao.reduce((acc, item) => acc + item.jurosSAC, 0))}</li>
                                <li>Total pago: {formatarMoeda(valorFinanciado + dadosComparacao.reduce((acc, item) => acc + item.jurosSAC, 0))}</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Aba de Detalhes */}
                    <TabsContent value="detalhes">
                      <Card>
                        <CardHeader>
                          <CardTitle>Detalhes do Financiamento</CardTitle>
                          <CardDescription>
                            Informações detalhadas sobre a evolução do seu financiamento
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Tabs defaultValue="price" className="w-full">
                            <TabsList className="grid grid-cols-2 mb-6">
                              <TabsTrigger value="price">Sistema Price</TabsTrigger>
                              <TabsTrigger value="sac">Sistema SAC</TabsTrigger>
                            </TabsList>

                            <TabsContent value="price">
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                  <thead>
                                    <tr className="bg-gray-100">
                                      <th className="p-2 text-left">Parcela</th>
                                      <th className="p-2 text-right">Valor da Parcela</th>
                                      <th className="p-2 text-right">Amortização</th>
                                      <th className="p-2 text-right">Juros</th>
                                      <th className="p-2 text-right">Saldo Devedor</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {dadosPrice.map((item, index) => (
                                      <tr key={index} className="border-b border-gray-200">
                                        <td className="p-2">{item.parcela}º</td>
                                        <td className="p-2 text-right">{formatarMoeda(item.valorParcela)}</td>
                                        <td className="p-2 text-right">{formatarMoeda(item.amortizacao)}</td>
                                        <td className="p-2 text-right">{formatarMoeda(item.juros)}</td>
                                        <td className="p-2 text-right">{formatarMoeda(item.saldoDevedor)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <p className="text-sm text-gray-500 mt-4">
                                * Mostrando apenas parcelas selecionadas para simplificar a visualização.
                              </p>
                            </TabsContent>

                            <TabsContent value="sac">
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                  <thead>
                                    <tr className="bg-gray-100">
                                      <th className="p-2 text-left">Parcela</th>
                                      <th className="p-2 text-right">Valor da Parcela</th>
                                      <th className="p-2 text-right">Amortização</th>
                                      <th className="p-2 text-right">Juros</th>
                                      <th className="p-2 text-right">Saldo Devedor</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {dadosSAC.map((item, index) => (
                                      <tr key={index} className="border-b border-gray-200">
                                        <td className="p-2">{item.parcela}º</td>
                                        <td className="p-2 text-right">{formatarMoeda(item.valorParcela)}</td>
                                        <td className="p-2 text-right">{formatarMoeda(item.amortizacao)}</td>
                                        <td className="p-2 text-right">{formatarMoeda(item.juros)}</td>
                                        <td className="p-2 text-right">{formatarMoeda(item.saldoDevedor)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <p className="text-sm text-gray-500 mt-4">
                                * Mostrando apenas parcelas selecionadas para simplificar a visualização.
                              </p>
                            </TabsContent>
                          </Tabs>

                          <div className="bg-yellow-50 p-4 rounded-lg mt-6">
                            <h3 className="text-lg font-semibold text-yellow-700 mb-2">Importante</h3>
                            <p className="text-yellow-600 mb-2">
                              Esta simulação é apenas uma estimativa. As condições reais de financiamento 
                              podem variar de acordo com a instituição financeira, sua análise de crédito 
                              e as condições de mercado no momento da contratação.
                            </p>
                            <p className="text-yellow-600">
                              Consulte sempre um especialista financeiro antes de tomar decisões importantes 
                              sobre financiamento imobiliário.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SimuladorFinanciamentoImobiliario;