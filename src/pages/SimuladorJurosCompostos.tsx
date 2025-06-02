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
import { Percent, TrendingUp, HelpCircle, AlertCircle, Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from "recharts";

// Definição da interface para os dados do gráfico
interface DadosGrafico {
  ano: number;
  montante: number;
  aportesAcumulados: number;
  jurosAcumulados: number;
}

// Definição da interface para os cenários
interface Cenario {
  nome: string;
  valorInicial: number;
  aporteMensal: number;
  taxaJuros: number;
  periodo: number;
  montanteFinal: number;
  jurosAcumulados: number;
  aportesAcumulados: number;
  dadosGrafico: DadosGrafico[];
}

const SimuladorJurosCompostos = () => {
  // Estados para os inputs do usuário
  const [valorInicial, setValorInicial] = useState<number>(1000);
  const [aporteMensal, setAporteMensal] = useState<number>(200);
  const [taxaJuros, setTaxaJuros] = useState<number>(0.8); // 0.8% ao mês = ~10% ao ano
  const [periodo, setPeriodo] = useState<number>(10); // em anos
  const [tipoTaxa, setTipoTaxa] = useState<string>("mensal");
  const [frequenciaAporte, setFrequenciaAporte] = useState<string>("mensal");

  // Estados para os resultados calculados
  const [montanteFinal, setMontanteFinal] = useState<number>(0);
  const [jurosAcumulados, setJurosAcumulados] = useState<number>(0);
  const [aportesAcumulados, setAportesAcumulados] = useState<number>(0);
  const [dadosGrafico, setDadosGrafico] = useState<DadosGrafico[]>([]);

  // Estado para cenários comparativos
  const [cenarios, setCenarios] = useState<Cenario[]>([]);
  const [cenarioAtual, setCenarioAtual] = useState<Cenario | null>(null);
  const [nomeCenario, setNomeCenario] = useState<string>("");

  // Função para calcular a taxa de juros efetiva mensal
  const calcularTaxaMensal = () => {
    if (tipoTaxa === "anual") {
      // Converter taxa anual para mensal: (1 + taxa anual)^(1/12) - 1
      return Math.pow(1 + taxaJuros / 100, 1 / 12) - 1;
    } else {
      return taxaJuros / 100;
    }
  };

  // Função para calcular o montante final com juros compostos
  const calcularMontanteFinal = () => {
    const taxaMensal = calcularTaxaMensal();
    const meses = periodo * 12;

    let montante = valorInicial;
    let totalAportes = valorInicial;

    // Frequência dos aportes
    const aportePorPeriodo = frequenciaAporte === "mensal" ? aporteMensal :
      frequenciaAporte === "trimestral" ? aporteMensal * 3 :
        frequenciaAporte === "semestral" ? aporteMensal * 6 : aporteMensal * 12;

    const intervaloPeriodos = frequenciaAporte === "mensal" ? 1 :
      frequenciaAporte === "trimestral" ? 3 :
        frequenciaAporte === "semestral" ? 6 : 12;

    const dados: DadosGrafico[] = [];

    // Adiciona o ponto inicial
    dados.push({
      ano: 0,
      montante: montante,
      aportesAcumulados: valorInicial,
      jurosAcumulados: 0
    });

    for (let mes = 1; mes <= meses; mes++) {
      // Rendimento mensal
      const rendimentoMensal = montante * taxaMensal;

      // Adiciona o aporte periódico
      if (mes % intervaloPeriodos === 0) {
        montante += aportePorPeriodo;
        totalAportes += aportePorPeriodo;
      }

      // Adiciona o rendimento
      montante += rendimentoMensal;

      // Adiciona ponto no gráfico a cada ano
      if (mes % 12 === 0) {
        dados.push({
          ano: mes / 12,
          montante: Math.round(montante),
          aportesAcumulados: Math.round(totalAportes),
          jurosAcumulados: Math.round(montante - totalAportes)
        });
      }
    }

    return {
      montanteFinal: montante,
      aportesAcumulados: totalAportes,
      jurosAcumulados: montante - totalAportes,
      dadosGrafico: dados
    };
  };

  // Função para formatar valores monetários
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Função para formatar percentuais
  const formatarPercentual = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Função para realizar todos os cálculos
  const calcular = () => {
    const resultado = calcularMontanteFinal();

    setMontanteFinal(resultado.montanteFinal);
    setJurosAcumulados(resultado.jurosAcumulados);
    setAportesAcumulados(resultado.aportesAcumulados);
    setDadosGrafico(resultado.dadosGrafico);

    // Atualiza o cenário atual
    setCenarioAtual({
      nome: nomeCenario || "Cenário Atual",
      valorInicial,
      aporteMensal,
      taxaJuros,
      periodo,
      montanteFinal: resultado.montanteFinal,
      jurosAcumulados: resultado.jurosAcumulados,
      aportesAcumulados: resultado.aportesAcumulados,
      dadosGrafico: resultado.dadosGrafico
    });
  };

  // Função para salvar um cenário
  const salvarCenario = () => {
    if (!cenarioAtual) return;

    // Verifica se já existe um cenário com o mesmo nome
    const cenarioExistente = cenarios.findIndex(c => c.nome === cenarioAtual.nome);

    if (cenarioExistente >= 0) {
      // Atualiza o cenário existente
      const novosCenarios = [...cenarios];
      novosCenarios[cenarioExistente] = cenarioAtual;
      setCenarios(novosCenarios);
    } else {
      // Adiciona um novo cenário
      setCenarios([...cenarios, cenarioAtual]);
    }

    // Limpa o nome do cenário para o próximo
    setNomeCenario("");
  };

  // Função para carregar um cenário
  const carregarCenario = (cenario: Cenario) => {
    setValorInicial(cenario.valorInicial);
    setAporteMensal(cenario.aporteMensal);
    setTaxaJuros(cenario.taxaJuros);
    setPeriodo(cenario.periodo);
    setNomeCenario(cenario.nome);

    // Atualiza os resultados
    setMontanteFinal(cenario.montanteFinal);
    setJurosAcumulados(cenario.jurosAcumulados);
    setAportesAcumulados(cenario.aportesAcumulados);
    setDadosGrafico(cenario.dadosGrafico);

    setCenarioAtual(cenario);
  };

  // Função para remover um cenário
  const removerCenario = (index: number) => {
    const novosCenarios = [...cenarios];
    novosCenarios.splice(index, 1);
    setCenarios(novosCenarios);
  };

  // Calcula os resultados quando os inputs mudam
  useEffect(() => {
    calcular();
  }, [valorInicial, aporteMensal, taxaJuros, periodo, tipoTaxa, frequenciaAporte]);

  // Formatar o tooltip do gráfico
  const formatarTooltipGrafico = (value: number) => {
    return formatarMoeda(value);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simulador de Juros Compostos
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Veja como seus investimentos podem crescer ao longo do tempo com o poder dos juros compostos
              </p>
              <div className="text-sm text-gray-500 mt-2">
                2.5k simulações esta semana
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-12 gap-8">
                {/* Painel de Entrada */}
                <div className="md:col-span-5">
                  <Card>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-finance-green/10 flex items-center justify-center mb-3">
                        <Percent className="h-6 w-6 text-finance-green" />
                      </div>
                      <CardTitle>Dados da Simulação</CardTitle>
                      <CardDescription>
                        Configure os parâmetros para simular o crescimento do seu investimento
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Nome do Cenário */}
                      <div className="space-y-2">
                        <Label htmlFor="nome-cenario">Nome do Cenário (opcional)</Label>
                        <Input
                          id="nome-cenario"
                          type="text"
                          placeholder="Ex: Investimento em Renda Fixa"
                          value={nomeCenario}
                          onChange={(e) => setNomeCenario(e.target.value)}
                        />
                      </div>

                      {/* Valor Inicial */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="valor-inicial">Valor Inicial</Label>
                          <span className="text-sm text-gray-500">{formatarMoeda(valorInicial)}</span>
                        </div>
                        <Input
                          id="valor-inicial"
                          type="number"
                          min="0"
                          step="100"
                          value={valorInicial}
                          onChange={(e) => setValorInicial(Number(e.target.value))}
                        />
                        <Slider
                          value={[valorInicial]}
                          min={0}
                          max={100000}
                          step={1000}
                          onValueChange={(value) => setValorInicial(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>R$ 0</span>
                          <span>R$ 100.000</span>
                        </div>
                      </div>

                      {/* Aporte Periódico */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="aporte-mensal">Aporte Periódico</Label>
                          <span className="text-sm text-gray-500">{formatarMoeda(aporteMensal)}</span>
                        </div>
                        <Input
                          id="aporte-mensal"
                          type="number"
                          min="0"
                          step="50"
                          value={aporteMensal}
                          onChange={(e) => setAporteMensal(Number(e.target.value))}
                        />
                        <Slider
                          value={[aporteMensal]}
                          min={0}
                          max={5000}
                          step={50}
                          onValueChange={(value) => setAporteMensal(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>R$ 0</span>
                          <span>R$ 5.000</span>
                        </div>
                      </div>

                      {/* Frequência do Aporte */}
                      <div className="space-y-2">
                        <Label htmlFor="frequencia-aporte">Frequência do Aporte</Label>
                        <Select
                          value={frequenciaAporte}
                          onValueChange={(value) => setFrequenciaAporte(value)}
                        >
                          <SelectTrigger id="frequencia-aporte">
                            <SelectValue placeholder="Selecione a frequência" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mensal">Mensal</SelectItem>
                            <SelectItem value="trimestral">Trimestral</SelectItem>
                            <SelectItem value="semestral">Semestral</SelectItem>
                            <SelectItem value="anual">Anual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Taxa de Juros */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="taxa-juros">Taxa de Juros</Label>
                          <span className="text-sm text-gray-500">{taxaJuros}% {tipoTaxa === "mensal" ? "ao mês" : "ao ano"}</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Input
                              id="taxa-juros"
                              type="number"
                              min="0"
                              step="0.1"
                              value={taxaJuros}
                              onChange={(e) => setTaxaJuros(Number(e.target.value))}
                            />
                          </div>
                          <Select
                            value={tipoTaxa}
                            onValueChange={(value) => setTipoTaxa(value)}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mensal">Mensal</SelectItem>
                              <SelectItem value="anual">Anual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Slider
                          value={[taxaJuros]}
                          min={0}
                          max={tipoTaxa === "mensal" ? 3 : 30}
                          step={0.1}
                          onValueChange={(value) => setTaxaJuros(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0%</span>
                          <span>{tipoTaxa === "mensal" ? "3%" : "30%"}</span>
                        </div>
                      </div>

                      {/* Período */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="periodo">Período</Label>
                          <span className="text-sm text-gray-500">{periodo} anos</span>
                        </div>
                        <Input
                          id="periodo"
                          type="number"
                          min="1"
                          max="50"
                          value={periodo}
                          onChange={(e) => setPeriodo(Number(e.target.value))}
                        />
                        <Slider
                          value={[periodo]}
                          min={1}
                          max={50}
                          step={1}
                          onValueChange={(value) => setPeriodo(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>1 ano</span>
                          <span>50 anos</span>
                        </div>
                      </div>

                      {/* Botões de Ação */}
                      <div className="flex gap-2 pt-4">
                        <Button
                          className="flex-1 bg-finance-green hover:bg-finance-green-dark text-white"
                          onClick={calcular}
                        >
                          Calcular
                        </Button>
                        <Button
                          className="flex-1"
                          variant="outline"
                          onClick={salvarCenario}
                        >
                          Salvar Cenário
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Painel de Resultados */}
                <div className="md:col-span-7">
                  <div className="space-y-8">
                    {/* Resultados */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Resultados da Simulação</CardTitle>
                        <CardDescription>
                          {cenarioAtual?.nome || "Cenário Atual"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">Montante Final</div>
                            <div className="text-2xl font-bold text-gray-900">{formatarMoeda(montanteFinal)}</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">Total Investido</div>
                            <div className="text-2xl font-bold text-gray-900">{formatarMoeda(aportesAcumulados)}</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">Juros Acumulados</div>
                            <div className="text-2xl font-bold text-gray-900">{formatarMoeda(jurosAcumulados)}</div>
                          </div>
                        </div>

                        {/* Gráfico */}
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={dadosGrafico}
                              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                dataKey="ano"
                                label={{ value: 'Anos', position: 'insideBottomRight', offset: -10 }}
                              />
                              <YAxis
                                tickFormatter={formatarTooltipGrafico}
                                label={{ value: 'Valor (R$)', angle: -90, position: 'insideLeft' }}
                              />
                              <Tooltip
                                formatter={formatarTooltipGrafico}
                                labelFormatter={(label) => `Ano ${label}`}
                              />
                              <Legend />
                              <Area
                                type="monotone"
                                dataKey="montante"
                                name="Montante Total"
                                stackId="1"
                                stroke="#4CAF50"
                                fill="#4CAF50"
                              />
                              <Area
                                type="monotone"
                                dataKey="aportesAcumulados"
                                name="Total Investido"
                                stackId="2"
                                stroke="#2196F3"
                                fill="#2196F3"
                              />
                              <Area
                                type="monotone"
                                dataKey="jurosAcumulados"
                                name="Juros Acumulados"
                                stackId="2"
                                stroke="#FF9800"
                                fill="#FF9800"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Cenários Salvos */}
                    {cenarios.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Cenários Comparativos</CardTitle>
                          <CardDescription>
                            Compare diferentes estratégias de investimento
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                  <th className="px-4 py-2">Cenário</th>
                                  <th className="px-4 py-2">Valor Inicial</th>
                                  <th className="px-4 py-2">Aporte Mensal</th>
                                  <th className="px-4 py-2">Taxa de Juros</th>
                                  <th className="px-4 py-2">Período</th>
                                  <th className="px-4 py-2">Montante Final</th>
                                  <th className="px-4 py-2">Ações</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cenarios.map((cenario, index) => (
                                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-4 py-2 font-medium text-gray-900">{cenario.nome}</td>
                                    <td className="px-4 py-2">{formatarMoeda(cenario.valorInicial)}</td>
                                    <td className="px-4 py-2">{formatarMoeda(cenario.aporteMensal)}</td>
                                    <td className="px-4 py-2">{cenario.taxaJuros}%</td>
                                    <td className="px-4 py-2">{cenario.periodo} anos</td>
                                    <td className="px-4 py-2 font-medium text-gray-900">{formatarMoeda(cenario.montanteFinal)}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => carregarCenario(cenario)}
                                      >
                                        Carregar
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removerCenario(index)}
                                      >
                                        Remover
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Gráfico Comparativo */}
                          {cenarios.length > 1 && (
                            <div className="mt-6">
                              <h3 className="text-lg font-medium mb-4">Comparação de Cenários</h3>
                              <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart
                                    data={cenarios}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="nome" />
                                    <YAxis tickFormatter={formatarTooltipGrafico} />
                                    <Tooltip formatter={formatarTooltipGrafico} />
                                    <Legend />
                                    <Bar dataKey="montanteFinal" name="Montante Final" fill="#4CAF50" />
                                    <Bar dataKey="aportesAcumulados" name="Total Investido" fill="#2196F3" />
                                    <Bar dataKey="jurosAcumulados" name="Juros Acumulados" fill="#FF9800" />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {/* Seção Educativa */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Entenda os Juros Compostos</CardTitle>
                        <CardDescription>
                          O oitavo milagre do mundo, segundo Albert Einstein
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h3 className="text-sm font-medium text-blue-700 mb-1">O que são juros compostos?</h3>
                              <p className="text-sm text-blue-600">
                                Juros compostos são juros sobre juros. Quando você investe, seus rendimentos são adicionados ao capital inicial,
                                e no próximo período, você ganha juros também sobre esses rendimentos anteriores, criando um efeito exponencial.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Fórmula dos Juros Compostos</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              M = P × (1 + i)^t
                            </p>
                            <ul className="text-xs text-gray-500 space-y-1">
                              <li>M = Montante final</li>
                              <li>P = Principal (valor inicial)</li>
                              <li>i = Taxa de juros (em decimal)</li>
                              <li>t = Tempo (períodos)</li>
                            </ul>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Regra dos 72</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Uma forma rápida de estimar quanto tempo levará para seu dinheiro dobrar.
                            </p>
                            <div className="text-xs text-gray-500">
                              Tempo para dobrar = 72 ÷ Taxa de juros anual
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                              Exemplo: Com uma taxa de 8% ao ano, seu dinheiro dobrará em aproximadamente 9 anos (72 ÷ 8 = 9).
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <h3 className="text-sm font-medium text-green-700 mb-1">Dicas para maximizar o poder dos juros compostos</h3>
                              <ul className="text-sm text-green-600 space-y-2">
                                <li>1. Comece cedo: quanto mais tempo seu dinheiro ficar investido, maior será o efeito dos juros compostos.</li>
                                <li>2. Seja consistente: faça aportes regulares para aumentar a base sobre a qual os juros incidem.</li>
                                <li>3. Reinvista os rendimentos: não saque os juros, deixe-os trabalhar por você.</li>
                                <li>4. Busque as melhores taxas: pequenas diferenças nas taxas de juros podem resultar em grandes diferenças no longo prazo.</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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

export default SimuladorJurosCompostos;