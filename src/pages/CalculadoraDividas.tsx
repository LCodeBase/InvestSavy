import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, HelpCircle, AlertCircle, TrendingUp, Plus, Trash2, ArrowDown, ArrowUp, CheckCircle, DollarSign, Clock, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";

// Interface para os dados de cada dívida
interface Divida {
  id: string;
  nome: string;
  valor: number;
  taxaJuros: number;
  pagamentoMinimo: number;
}

// Interface para os dados do gráfico
interface DadosGrafico {
  mes: number;
  saldoRestante: number;
  jurosPagos: number;
  totalPago: number;
}

// Interface para os resultados da simulação
interface ResultadoSimulacao {
  tempoQuitacao: number;
  totalJuros: number;
  totalPago: number;
  economiaVsMinimo: number;
  dadosGrafico: DadosGrafico[];
  ordemPagamento: string[];
}

const CalculadoraDividas = () => {
  // Estados para os inputs do usuário - INICIANDO ZERADOS
  const [dividas, setDividas] = useState<Divida[]>([
    { id: "1", nome: "", valor: 0, taxaJuros: 0, pagamentoMinimo: 0 }
  ]);
  const [orcamentoMensal, setOrcamentoMensal] = useState<number>(0);
  const [estrategia, setEstrategia] = useState<string>("bola-de-neve");
  const [mostrarResultados, setMostrarResultados] = useState<boolean>(false);

  // Estados para os resultados calculados
  const [resultado, setResultado] = useState<ResultadoSimulacao>({
    tempoQuitacao: 0,
    totalJuros: 0,
    totalPago: 0,
    economiaVsMinimo: 0,
    dadosGrafico: [],
    ordemPagamento: []
  });

  // Estado para comparação de estratégias
  const [resultadoComparativo, setResultadoComparativo] = useState<{
    bolaDeNeve: ResultadoSimulacao;
    avalanche: ResultadoSimulacao;
  }>({
    bolaDeNeve: {
      tempoQuitacao: 0,
      totalJuros: 0,
      totalPago: 0,
      economiaVsMinimo: 0,
      dadosGrafico: [],
      ordemPagamento: []
    },
    avalanche: {
      tempoQuitacao: 0,
      totalJuros: 0,
      totalPago: 0,
      economiaVsMinimo: 0,
      dadosGrafico: [],
      ordemPagamento: []
    }
  });

  // Função para adicionar uma nova dívida
  const adicionarDivida = () => {
    const novaDivida: Divida = {
      id: Date.now().toString(),
      nome: "",
      valor: 0,
      taxaJuros: 0,
      pagamentoMinimo: 0
    };
    setDividas([...dividas, novaDivida]);
  };

  // Função para remover uma dívida
  const removerDivida = (id: string) => {
    if (dividas.length > 1) {
      setDividas(dividas.filter(divida => divida.id !== id));
    }
  };

  // Função para atualizar uma dívida
  const atualizarDivida = (id: string, campo: keyof Divida, valor: string | number) => {
    setDividas(dividas.map(divida => {
      if (divida.id === id) {
        return { ...divida, [campo]: valor };
      }
      return divida;
    }));
  };

  // Função para validar se os dados estão completos
  const validarDados = (): boolean => {
    if (orcamentoMensal <= 0) return false;

    const dividasValidas = dividas.filter(d =>
      d.nome.trim() !== "" &&
      d.valor > 0 &&
      d.taxaJuros >= 0 &&
      d.pagamentoMinimo > 0
    );

    return dividasValidas.length > 0;
  };

  // Função para calcular pagamento apenas com mínimos
  const calcularPagamentoMinimo = (dividasInput: Divida[]): ResultadoSimulacao => {
    const dividasSimulacao = JSON.parse(JSON.stringify(dividasInput)) as Divida[];
    let mes = 0;
    let totalJuros = 0;
    let totalPago = 0;
    const dadosGrafico: DadosGrafico[] = [];

    while (dividasSimulacao.some(d => d.valor > 0.01) && mes < 600) {
      mes++;
      let jurosMes = 0;
      let pagamentoMes = 0;

      dividasSimulacao.forEach(divida => {
        if (divida.valor > 0) {
          const juros = divida.valor * (divida.taxaJuros / 100);
          divida.valor += juros;
          jurosMes += juros;
          totalJuros += juros;

          const pagamento = Math.min(divida.pagamentoMinimo, divida.valor);
          divida.valor -= pagamento;
          pagamentoMes += pagamento;
          totalPago += pagamento;
        }
      });

      const saldoTotal = dividasSimulacao.reduce((sum, d) => sum + Math.max(0, d.valor), 0);

      dadosGrafico.push({
        mes,
        saldoRestante: saldoTotal,
        jurosPagos: jurosMes,
        totalPago: pagamentoMes
      });
    }

    return {
      tempoQuitacao: mes,
      totalJuros,
      totalPago,
      economiaVsMinimo: 0,
      dadosGrafico,
      ordemPagamento: []
    };
  };

  // Função para calcular a simulação usando o método bola de neve
  const calcularBolaDeNeve = (dividasInput: Divida[], orcamento: number): ResultadoSimulacao => {
    const dividasSimulacao = JSON.parse(JSON.stringify(dividasInput)) as Divida[];
    dividasSimulacao.sort((a, b) => a.valor - b.valor);
    return simularPagamento(dividasSimulacao, orcamento);
  };

  // Função para calcular a simulação usando o método avalanche
  const calcularAvalanche = (dividasInput: Divida[], orcamento: number): ResultadoSimulacao => {
    const dividasSimulacao = JSON.parse(JSON.stringify(dividasInput)) as Divida[];
    dividasSimulacao.sort((a, b) => b.taxaJuros - a.taxaJuros);
    return simularPagamento(dividasSimulacao, orcamento);
  };

  // Função para simular o pagamento das dívidas
  const simularPagamento = (dividasOrdenadas: Divida[], orcamento: number): ResultadoSimulacao => {
    let mes = 0;
    let totalJuros = 0;
    let totalPago = 0;
    const dividasRestantes = [...dividasOrdenadas];
    const dadosGrafico: DadosGrafico[] = [];
    const ordemPagamento: string[] = dividasOrdenadas.map(d => d.nome);

    // Verificar se o orçamento é suficiente para os pagamentos mínimos
    const totalMinimo = dividasRestantes.reduce((sum, d) => sum + d.pagamentoMinimo, 0);
    if (orcamento < totalMinimo) {
      return {
        tempoQuitacao: 0,
        totalJuros: 0,
        totalPago: 0,
        economiaVsMinimo: 0,
        dadosGrafico: [],
        ordemPagamento: []
      };
    }

    while (dividasRestantes.length > 0 && mes < 600) {
      mes++;
      let orcamentoDisponivel = orcamento;
      let jurosMes = 0;
      let pagamentoMes = 0;

      // Aplicar juros
      dividasRestantes.forEach(divida => {
        const juros = divida.valor * (divida.taxaJuros / 100);
        divida.valor += juros;
        totalJuros += juros;
        jurosMes += juros;
      });

      // Pagar mínimos
      for (let i = dividasRestantes.length - 1; i >= 0; i--) {
        const pagamento = Math.min(dividasRestantes[i].pagamentoMinimo, dividasRestantes[i].valor, orcamentoDisponivel);
        dividasRestantes[i].valor -= pagamento;
        orcamentoDisponivel -= pagamento;
        totalPago += pagamento;
        pagamentoMes += pagamento;

        if (dividasRestantes[i].valor <= 0.01) {
          dividasRestantes.splice(i, 1);
        }
      }

      // Usar orçamento extra na primeira dívida (estratégia)
      if (orcamentoDisponivel > 0 && dividasRestantes.length > 0) {
        const pagamentoExtra = Math.min(orcamentoDisponivel, dividasRestantes[0].valor);
        dividasRestantes[0].valor -= pagamentoExtra;
        totalPago += pagamentoExtra;
        pagamentoMes += pagamentoExtra;

        if (dividasRestantes[0].valor <= 0.01) {
          dividasRestantes.splice(0, 1);
        }
      }

      const saldoTotal = dividasRestantes.reduce((sum, d) => sum + d.valor, 0);

      dadosGrafico.push({
        mes,
        saldoRestante: saldoTotal,
        jurosPagos: jurosMes,
        totalPago: pagamentoMes
      });
    }

    // Calcular economia vs pagamento mínimo
    const resultadoMinimo = calcularPagamentoMinimo(dividasOrdenadas);
    const economiaVsMinimo = resultadoMinimo.totalJuros - totalJuros;

    return {
      tempoQuitacao: mes,
      totalJuros,
      totalPago,
      economiaVsMinimo,
      dadosGrafico,
      ordemPagamento
    };
  };

  // Função para realizar todos os cálculos
  const calcular = useCallback(() => {
    if (!validarDados()) {
      setMostrarResultados(false);
      return;
    }

    const dividasValidas = dividas.filter(d =>
      d.nome.trim() !== "" &&
      d.valor > 0 &&
      d.taxaJuros >= 0 &&
      d.pagamentoMinimo > 0
    );

    const resultadoBolaDeNeve = calcularBolaDeNeve(dividasValidas, orcamentoMensal);
    const resultadoAvalanche = calcularAvalanche(dividasValidas, orcamentoMensal);

    setResultadoComparativo({
      bolaDeNeve: resultadoBolaDeNeve,
      avalanche: resultadoAvalanche
    });

    if (estrategia === "bola-de-neve") {
      setResultado(resultadoBolaDeNeve);
    } else {
      setResultado(resultadoAvalanche);
    }

    setMostrarResultados(true);
  }, [dividas, orcamentoMensal, estrategia]);

  // Calcular automaticamente quando os dados mudam
  useEffect(() => {
    if (validarDados()) {
      calcular();
    } else {
      setMostrarResultados(false);
    }
  }, [dividas, orcamentoMensal, estrategia, calcular]);

  // Função para formatar valores monetários
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Função para formatar tempo
  const formatarTempo = (meses: number) => {
    if (meses === 0) return "Dados insuficientes";
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;

    if (anos === 0) {
      return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    } else if (mesesRestantes === 0) {
      return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    } else {
      return `${anos} ${anos === 1 ? 'ano' : 'anos'} e ${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`;
    }
  };

  // Verificar se orçamento é suficiente
  const orcamentoInsuficiente = () => {
    const totalMinimo = dividas.reduce((sum, d) => sum + (d.pagamentoMinimo || 0), 0);
    return orcamentoMensal > 0 && orcamentoMensal < totalMinimo;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-12 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-finance-green/10 rounded-full mb-4">
                <Calculator className="h-6 w-6 text-finance-green" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculadora de Quitação de Dívidas</h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                Descubra a melhor estratégia para quitar suas dívidas mais rapidamente e economizar milhares em juros.
              </p>
            </div>

            {/* Seção Educativa */}
            <div className="max-w-4xl mx-auto mb-8">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-800">
                    <HelpCircle className="mr-2 h-5 w-5" />
                    Como Funciona?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Método Bola de Neve
                      </h4>
                      <p className="text-blue-600 text-sm">
                        Pague primeiro as dívidas menores. Gera motivação psicológica ao ver dívidas sendo eliminadas rapidamente.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Método Avalanche
                      </h4>
                      <p className="text-blue-600 text-sm">
                        Pague primeiro as dívidas com maiores juros. Matematicamente mais eficiente, economiza mais dinheiro.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Coluna 1: Formulário de entrada */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Suas Dívidas
                    </CardTitle>
                    <CardDescription>
                      Adicione suas dívidas para calcular a melhor estratégia de pagamento.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Lista de dívidas */}
                      {dividas.map((divida, index) => (
                        <div key={divida.id} className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex-1">
                              <Input
                                type="text"
                                placeholder={`Dívida ${index + 1} (ex: Cartão de Crédito)`}
                                value={divida.nome}
                                onChange={(e) => atualizarDivida(divida.id, "nome", e.target.value)}
                                className="font-medium"
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removerDivida(divida.id)}
                              disabled={dividas.length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <Label htmlFor={`valor-${divida.id}`}>Valor total da dívida</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                <Input
                                  id={`valor-${divida.id}`}
                                  type="number"
                                  placeholder="0,00"
                                  value={divida.valor || ""}
                                  onChange={(e) => atualizarDivida(divida.id, "valor", parseFloat(e.target.value) || 0)}
                                  className="pl-10"
                                  min="0"
                                  step="100"
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor={`juros-${divida.id}`}>Taxa de juros mensal (%)</Label>
                              <Input
                                id={`juros-${divida.id}`}
                                type="number"
                                placeholder="0,0"
                                value={divida.taxaJuros || ""}
                                onChange={(e) => atualizarDivida(divida.id, "taxaJuros", parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.1"
                                max="30"
                              />
                            </div>

                            <div>
                              <Label htmlFor={`pagamento-${divida.id}`}>Pagamento mínimo mensal</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                <Input
                                  id={`pagamento-${divida.id}`}
                                  type="number"
                                  placeholder="0,00"
                                  value={divida.pagamentoMinimo || ""}
                                  onChange={(e) => atualizarDivida(divida.id, "pagamentoMinimo", parseFloat(e.target.value) || 0)}
                                  className="pl-10"
                                  min="0"
                                  step="50"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button onClick={adicionarDivida} className="w-full" variant="outline">
                        <Plus className="mr-2 h-4 w-4" /> Adicionar Dívida
                      </Button>

                      <div className="pt-4 border-t mt-6">
                        <div className="mb-6">
                          <Label htmlFor="orcamento">Orçamento mensal total para dívidas</Label>
                          <div className="relative mt-2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                            <Input
                              id="orcamento"
                              type="number"
                              placeholder="0,00"
                              value={orcamentoMensal || ""}
                              onChange={(e) => setOrcamentoMensal(parseFloat(e.target.value) || 0)}
                              className="pl-10"
                              min="0"
                              step="100"
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Quanto você pode destinar mensalmente para pagar suas dívidas?
                          </p>
                        </div>

                        {orcamentoInsuficiente() && (
                          <Alert className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              Seu orçamento é menor que a soma dos pagamentos mínimos ({formatarMoeda(dividas.reduce((sum, d) => sum + (d.pagamentoMinimo || 0), 0))}).
                              Aumente o orçamento ou renegocie suas dívidas.
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="mb-6">
                          <Label htmlFor="estrategia">Estratégia de pagamento</Label>
                          <Select value={estrategia} onValueChange={setEstrategia}>
                            <SelectTrigger id="estrategia" className="mt-2">
                              <SelectValue placeholder="Selecione uma estratégia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bola-de-neve">
                                <div className="flex items-center">
                                  <ArrowDown className="mr-2 h-4 w-4" />
                                  Bola de Neve (motivação)
                                </div>
                              </SelectItem>
                              <SelectItem value="avalanche">
                                <div className="flex items-center">
                                  <ArrowUp className="mr-2 h-4 w-4" />
                                  Avalanche (economia)
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Coluna 2: Resultados e Gráficos */}
              <div className="lg:col-span-2">
                {!mostrarResultados ? (
                  <Card className="h-full flex items-center justify-center">
                    <CardContent className="text-center py-12">
                      <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-500 mb-2">Preencha seus dados</h3>
                      <p className="text-gray-400">
                        Complete as informações das suas dívidas e orçamento para ver os resultados da simulação.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-8">
                    {/* Resultados principais */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="mr-2 h-5 w-5" />
                          Resultado da Estratégia: {estrategia === "bola-de-neve" ? "Bola de Neve" : "Avalanche"}
                        </CardTitle>
                        <CardDescription>
                          Simulação baseada no seu orçamento e estratégia selecionada
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Clock className="h-5 w-5 text-blue-600 mr-2" />
                              <p className="text-sm font-medium text-blue-600">Tempo para quitar</p>
                            </div>
                            <p className="text-2xl font-bold text-blue-800">
                              {formatarTempo(resultado.tempoQuitacao)}
                            </p>
                          </div>

                          <div className="p-4 bg-red-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                              <p className="text-sm font-medium text-red-600">Total de juros</p>
                            </div>
                            <p className="text-2xl font-bold text-red-800">
                              {formatarMoeda(resultado.totalJuros)}
                            </p>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <DollarSign className="h-5 w-5 text-gray-600 mr-2" />
                              <p className="text-sm font-medium text-gray-600">Total pago</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">
                              {formatarMoeda(resultado.totalPago)}
                            </p>
                          </div>

                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                              <p className="text-sm font-medium text-green-600">Economia vs mínimo</p>
                            </div>
                            <p className="text-2xl font-bold text-green-800">
                              {formatarMoeda(resultado.economiaVsMinimo)}
                            </p>
                          </div>
                        </div>

                        {/* Ordem de pagamento */}
                        {resultado.ordemPagamento.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-semibold mb-3">Ordem recomendada de pagamento:</h4>
                            <div className="flex flex-wrap gap-2">
                              {resultado.ordemPagamento.map((nome, index) => (
                                <div key={index} className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">
                                    {index + 1}
                                  </span>
                                  <span className="text-blue-800 text-sm">{nome}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Comparação de estratégias */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Comparação de Estratégias</CardTitle>
                        <CardDescription>
                          Veja qual estratégia é melhor para o seu caso
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center mb-3">
                              <ArrowDown className="h-5 w-5 mr-2 text-blue-500" />
                              <h4 className="font-semibold">Bola de Neve</h4>
                              {estrategia === "bola-de-neve" && (
                                <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Selecionada</span>
                              )}
                            </div>
                            <div className="space-y-2 text-sm">
                              <p><strong>Tempo:</strong> {formatarTempo(resultadoComparativo.bolaDeNeve.tempoQuitacao)}</p>
                              <p><strong>Juros:</strong> {formatarMoeda(resultadoComparativo.bolaDeNeve.totalJuros)}</p>
                              <p><strong>Economia:</strong> {formatarMoeda(resultadoComparativo.bolaDeNeve.economiaVsMinimo)}</p>
                            </div>
                          </div>

                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center mb-3">
                              <ArrowUp className="h-5 w-5 mr-2 text-red-500" />
                              <h4 className="font-semibold">Avalanche</h4>
                              {estrategia === "avalanche" && (
                                <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Selecionada</span>
                              )}
                            </div>
                            <div className="space-y-2 text-sm">
                              <p><strong>Tempo:</strong> {formatarTempo(resultadoComparativo.avalanche.tempoQuitacao)}</p>
                              <p><strong>Juros:</strong> {formatarMoeda(resultadoComparativo.avalanche.totalJuros)}</p>
                              <p><strong>Economia:</strong> {formatarMoeda(resultadoComparativo.avalanche.economiaVsMinimo)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Recomendação */}
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h4 className="font-semibold text-yellow-800 mb-2">💡 Recomendação:</h4>
                          <p className="text-yellow-700 text-sm">
                            {resultadoComparativo.avalanche.totalJuros < resultadoComparativo.bolaDeNeve.totalJuros
                              ? "O método Avalanche economiza mais dinheiro em juros. Recomendado se você tem disciplina financeira."
                              : "O método Bola de Neve oferece mais motivação psicológica. Recomendado se você precisa de vitórias rápidas."}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Gráfico de evolução */}
                    {resultado.dadosGrafico.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Evolução do Pagamento</CardTitle>
                          <CardDescription>
                            Acompanhe como suas dívidas diminuem ao longo do tempo
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={resultado.dadosGrafico}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                  dataKey="mes"
                                  label={{ value: 'Meses', position: 'insideBottom', offset: -5 }}
                                />
                                <YAxis
                                  tickFormatter={(value) => formatarMoeda(value).replace('R$\u00A0', 'R$ ')}
                                />
                                <Tooltip
                                  formatter={(value: number, name: string) => [
                                    formatarMoeda(value),
                                    name === 'saldoRestante' ? 'Saldo Restante' :
                                      name === 'jurosPagos' ? 'Juros do Mês' : 'Pagamento do Mês'
                                  ]}
                                  labelFormatter={(label) => `Mês ${label}`}
                                />
                                <Legend />
                                <Area
                                  type="monotone"
                                  dataKey="saldoRestante"
                                  stackId="1"
                                  stroke="#ef4444"
                                  fill="#fecaca"
                                  name="Saldo Restante"
                                />
                                <Area
                                  type="monotone"
                                  dataKey="jurosPagos"
                                  stackId="2"
                                  stroke="#f59e0b"
                                  fill="#fed7aa"
                                  name="Juros do Mês"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Seção educativa final */}
            <div className="max-w-4xl mx-auto mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5" />
                    Dicas para o Sucesso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">✅ Faça:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Mantenha disciplina no orçamento</li>
                        <li>• Evite contrair novas dívidas</li>
                        <li>• Renegocie taxas quando possível</li>
                        <li>• Comemore cada dívida quitada</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">❌ Evite:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Pagar apenas o mínimo</li>
                        <li>• Usar o cartão de crédito</li>
                        <li>• Desistir no meio do caminho</li>
                        <li>• Não ter uma reserva de emergência</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CalculadoraDividas;