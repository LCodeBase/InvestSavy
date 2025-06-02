import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, HelpCircle, AlertCircle, TrendingUp, Plus, Trash2, ArrowDown, ArrowUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from "recharts";

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
  dividas: number;
  juros: number;
  amortizacao: number;
}

// Interface para os resultados da simulação
interface ResultadoSimulacao {
  tempoQuitacao: number;
  totalJuros: number;
  totalPago: number;
  economiaProjetada: number;
  dadosGrafico: DadosGrafico[];
}

const CalculadoraDividas = () => {
  // Estados para os inputs do usuário
  const [dividas, setDividas] = useState<Divida[]>([
    { id: "1", nome: "Cartão de Crédito", valor: 5000, taxaJuros: 12, pagamentoMinimo: 200 },
    { id: "2", nome: "Empréstimo Pessoal", valor: 10000, taxaJuros: 3.5, pagamentoMinimo: 500 }
  ]);
  const [orcamentoMensal, setOrcamentoMensal] = useState<number>(1000);
  const [estrategia, setEstrategia] = useState<string>("bola-de-neve");

  // Estados para os resultados calculados
  const [resultado, setResultado] = useState<ResultadoSimulacao>({
    tempoQuitacao: 0,
    totalJuros: 0,
    totalPago: 0,
    economiaProjetada: 0,
    dadosGrafico: []
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
      economiaProjetada: 0,
      dadosGrafico: []
    },
    avalanche: {
      tempoQuitacao: 0,
      totalJuros: 0,
      totalPago: 0,
      economiaProjetada: 0,
      dadosGrafico: []
    }
  });

  // Função para adicionar uma nova dívida
  const adicionarDivida = () => {
    const novaDivida: Divida = {
      id: Date.now().toString(),
      nome: "Nova Dívida",
      valor: 1000,
      taxaJuros: 5,
      pagamentoMinimo: 100
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

  // Função para calcular a simulação usando o método bola de neve (menor valor primeiro)
  const calcularBolaDeNeve = (dividasInput: Divida[], orcamento: number): ResultadoSimulacao => {
    // Clonar as dívidas para não modificar o estado original
    const dividasSimulacao = JSON.parse(JSON.stringify(dividasInput)) as Divida[];

    // Ordenar por valor (menor para maior)
    dividasSimulacao.sort((a, b) => a.valor - b.valor);

    return simularPagamento(dividasSimulacao, orcamento);
  };

  // Função para calcular a simulação usando o método avalanche (maior taxa de juros primeiro)
  const calcularAvalanche = (dividasInput: Divida[], orcamento: number): ResultadoSimulacao => {
    // Clonar as dívidas para não modificar o estado original
    const dividasSimulacao = JSON.parse(JSON.stringify(dividasInput)) as Divida[];

    // Ordenar por taxa de juros (maior para menor)
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

    // Adicionar ponto inicial ao gráfico
    dadosGrafico.push({
      mes: 0,
      dividas: dividasOrdenadas.reduce((sum, divida) => sum + divida.valor, 0),
      juros: 0,
      amortizacao: 0
    });

    // Simular mês a mês até que todas as dívidas sejam pagas
    while (dividasRestantes.length > 0 && mes < 240) { // Limite de 20 anos (240 meses)
      mes++;
      let orcamentoDisponivel = orcamento;
      let jurosDoMes = 0;
      let amortizacaoDoMes = 0;

      // Calcular juros do mês para cada dívida
      dividasRestantes.forEach(divida => {
        const jurosMensal = divida.valor * (divida.taxaJuros / 100);
        divida.valor += jurosMensal;
        totalJuros += jurosMensal;
        jurosDoMes += jurosMensal;
      });

      // Pagar o mínimo de cada dívida
      for (let i = 0; i < dividasRestantes.length; i++) {
        const pagamento = Math.min(dividasRestantes[i].pagamentoMinimo, dividasRestantes[i].valor);
        dividasRestantes[i].valor -= pagamento;
        orcamentoDisponivel -= pagamento;
        totalPago += pagamento;
        amortizacaoDoMes += pagamento;

        // Se a dívida foi paga completamente
        if (dividasRestantes[i].valor <= 0.01) {
          dividasRestantes.splice(i, 1);
          i--;
        }
      }

      // Usar o orçamento restante para pagar a dívida prioritária
      if (orcamentoDisponivel > 0 && dividasRestantes.length > 0) {
        const pagamentoExtra = Math.min(orcamentoDisponivel, dividasRestantes[0].valor);
        dividasRestantes[0].valor -= pagamentoExtra;
        totalPago += pagamentoExtra;
        amortizacaoDoMes += pagamentoExtra;

        // Se a dívida prioritária foi paga completamente
        if (dividasRestantes[0].valor <= 0.01) {
          dividasRestantes.splice(0, 1);
        }
      }

      // Adicionar dados ao gráfico
      dadosGrafico.push({
        mes,
        dividas: dividasRestantes.reduce((sum, divida) => sum + divida.valor, 0),
        juros: jurosDoMes,
        amortizacao: amortizacaoDoMes
      });
    }

    // Calcular economia projetada (diferença entre o total pago e o valor inicial das dívidas)
    const valorInicialDividas = dividasOrdenadas.reduce((sum, divida) => sum + divida.valor, 0);
    const economiaProjetada = valorInicialDividas + totalJuros - totalPago;

    return {
      tempoQuitacao: mes,
      totalJuros,
      totalPago,
      economiaProjetada,
      dadosGrafico
    };
  };

  // Função para realizar todos os cálculos
  const calcular = useCallback(() => {
    // Calcular resultados para ambas as estratégias para comparação
    const resultadoBolaDeNeve = calcularBolaDeNeve(dividas, orcamentoMensal);
    const resultadoAvalanche = calcularAvalanche(dividas, orcamentoMensal);

    setResultadoComparativo({
      bolaDeNeve: resultadoBolaDeNeve,
      avalanche: resultadoAvalanche
    });

    // Definir o resultado atual com base na estratégia selecionada
    if (estrategia === "bola-de-neve") {
      setResultado(resultadoBolaDeNeve);
    } else {
      setResultado(resultadoAvalanche);
    }
  }, [dividas, orcamentoMensal, estrategia]);

  // Calcular os resultados quando os inputs mudam
  useEffect(() => {
    calcular();
  }, [dividas, orcamentoMensal, estrategia, calcular]);

  // Função para formatar valores monetários
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculadora de Dívidas</h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                Planeje a melhor estratégia para quitar suas dívidas mais rapidamente e economizar nos juros.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Coluna 1: Formulário de entrada */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Suas Dívidas
                    </CardTitle>
                    <CardDescription>
                      Adicione todas as suas dívidas para obter uma simulação precisa.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Lista de dívidas */}
                      {dividas.map((divida) => (
                        <div key={divida.id} className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex-1">
                              <Input
                                type="text"
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
                              <Label htmlFor={`valor-${divida.id}`}>Valor da dívida</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                                <Input
                                  id={`valor-${divida.id}`}
                                  type="number"
                                  value={divida.valor}
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
                                value={divida.taxaJuros}
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
                                  value={divida.pagamentoMinimo}
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
                          <Label htmlFor="orcamento">Orçamento mensal para pagamento de dívidas</Label>
                          <div className="relative mt-2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                            <Input
                              id="orcamento"
                              type="number"
                              value={orcamentoMensal}
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
                                  Bola de Neve (menor valor primeiro)
                                </div>
                              </SelectItem>
                              <SelectItem value="avalanche">
                                <div className="flex items-center">
                                  <ArrowUp className="mr-2 h-4 w-4" />
                                  Avalanche (maior juros primeiro)
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-gray-500 mt-2">
                            {estrategia === "bola-de-neve"
                              ? "Método Bola de Neve: Pague primeiro as dívidas de menor valor para ganhar motivação."
                              : "Método Avalanche: Pague primeiro as dívidas com maiores taxas de juros para economizar mais."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Coluna 2: Resultados e Gráficos */}
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {/* Resultados da simulação */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Resultados da Simulação</CardTitle>
                      <CardDescription>
                        Baseado na estratégia {estrategia === "bola-de-neve" ? "Bola de Neve" : "Avalanche"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">Tempo para quitar todas as dívidas</p>
                          <div className="mt-1 flex items-baseline">
                            <p className="text-3xl font-semibold text-gray-900">
                              {resultado.tempoQuitacao} {resultado.tempoQuitacao === 1 ? "mês" : "meses"}
                            </p>
                            <p className="ml-2 text-sm text-gray-500">
                              ({Math.floor(resultado.tempoQuitacao / 12)} anos e {resultado.tempoQuitacao % 12} meses)
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">Total de juros pagos</p>
                          <p className="mt-1 text-3xl font-semibold text-gray-900">
                            {formatarMoeda(resultado.totalJuros)}
                          </p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">Total pago</p>
                          <p className="mt-1 text-3xl font-semibold text-gray-900">
                            {formatarMoeda(resultado.totalPago)}
                          </p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">Economia projetada</p>
                          <p className="mt-1 text-3xl font-semibold text-finance-green">
                            {formatarMoeda(Math.abs(resultado.economiaProjetada))}
                          </p>
                        </div>
                      </div>

                      {/* Comparação de estratégias */}
                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Comparação de Estratégias</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center mb-2">
                              <ArrowDown className="h-4 w-4 mr-2 text-blue-500" />
                              <h4 className="font-medium">Bola de Neve</h4>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">Tempo: {resultadoComparativo.bolaDeNeve.tempoQuitacao} meses</p>
                            <p className="text-sm text-gray-500">Juros: {formatarMoeda(resultadoComparativo.bolaDeNeve.totalJuros)}</p>
                          </div>

                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center mb-2">
                              <ArrowUp className="h-4 w-4 mr-2 text-red-500" />
                              <h4 className="font-medium">Avalanche</h4>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">Tempo: {resultadoComparativo.avalanche.tempoQuitacao} meses</p>
                            <p className="text-sm text-gray-500">Juros: {formatarMoeda(resultadoComparativo.avalanche.totalJuros)}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                          {resultadoComparativo.avalanche.totalJuros < resultadoComparativo.bolaDeNeve.totalJuros
                            ? `A estratégia Avalanche economiza ${formatarMoeda(resultadoComparativo.bolaDeNeve.totalJuros - resultadoComparativo.avalanche.totalJuros)} em juros.`
                            : `A estratégia Bola de Neve economiza ${formatarMoeda(resultadoComparativo.avalanche.totalJuros - resultadoComparativo.bolaDeNeve.totalJuros)} em juros.`}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Gráfico de projeção */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Projeção de Pagamento</CardTitle>
                      <CardDescription>
                        Acompanhe a evolução do pagamento das suas dívidas ao longo do tempo
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={resultado.dadosGrafico.filter((_, index) => index % Math.max(1, Math.floor(resultado.dadosGrafico.length / 30)) === 0)}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="mes"
                              label={{ value: 'Meses', position: 'insideBottomRight', offset: -10 }}
                            />
                            <YAxis
                              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                              label={{ value: 'Valor (R$)', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                              formatter={(value) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, undefined]}
                              labelFormatter={(label) => `Mês ${label}`}
                            />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="dividas"
                              name="Saldo Devedor"
                              stackId="1"
                              stroke="#f43f5e"
                              fill="#f43f5e"
                              fillOpacity={0.5}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Gráfico de composição */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Composição do Pagamento</CardTitle>
                      <CardDescription>
                        Veja como seus pagamentos são distribuídos entre juros e amortização
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={resultado.dadosGrafico.filter((_, index) => index % Math.max(1, Math.floor(resultado.dadosGrafico.length / 12)) === 0)}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" label={{ value: 'Meses', position: 'insideBottomRight', offset: -10 }} />
                            <YAxis tickFormatter={(value) => `R$ ${(value).toFixed(0)}`} />
                            <Tooltip
                              formatter={(value) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, undefined]}
                              labelFormatter={(label) => `Mês ${label}`}
                            />
                            <Legend />
                            <Bar dataKey="juros" name="Juros" stackId="a" fill="#f43f5e" />
                            <Bar dataKey="amortizacao" name="Amortização" stackId="a" fill="#10b981" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Informações adicionais */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <HelpCircle className="mr-2 h-5 w-5" />
                        Informações Adicionais
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Estratégias de Pagamento</h3>
                          <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <h4 className="font-medium flex items-center">
                                <ArrowDown className="h-4 w-4 mr-2 text-blue-500" />
                                Método Bola de Neve
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Prioriza o pagamento das dívidas com menor valor total primeiro. Esta estratégia proporciona vitórias rápidas e motivação psicológica ao eliminar dívidas mais rapidamente.
                              </p>
                            </div>

                            <div className="p-3 bg-red-50 rounded-lg">
                              <h4 className="font-medium flex items-center">
                                <ArrowUp className="h-4 w-4 mr-2 text-red-500" />
                                Método Avalanche
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Prioriza o pagamento das dívidas com maiores taxas de juros primeiro. Esta estratégia é matematicamente mais eficiente e geralmente resulta em menos juros pagos no total.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-2">Dicas para Quitar Dívidas</h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                              <span>Sempre pague pelo menos o valor mínimo de todas as dívidas para evitar multas e danos ao seu crédito.</span>
                            </li>
                            <li className="flex items-start">
                              <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                              <span>Considere renegociar dívidas com altas taxas de juros para obter melhores condições.</span>
                            </li>
                            <li className="flex items-start">
                              <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                              <span>Crie um fundo de emergência para evitar novas dívidas em situações inesperadas.</span>
                            </li>
                            <li className="flex items-start">
                              <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                              <span>Após quitar uma dívida, redirecione o valor que você pagava para a próxima dívida da sua lista.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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

export default CalculadoraDividas;