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
import { Percent, TrendingUp, HelpCircle, AlertCircle, Info, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from "recharts";

// Definição da interface para os dados do gráfico
interface DadosGrafico {
  periodo: number;
  jurosSimples: number;
  jurosCompostos: number;
}

const CalculadoraJuros = () => {
  // Estados para os inputs do usuário
  const [capital, setCapital] = useState<number>(1000);
  const [taxaJuros, setTaxaJuros] = useState<number>(10); // 10% ao ano
  const [periodo, setPeriodo] = useState<number>(5); // em anos
  const [aporteMensal, setAporteMensal] = useState<number>(0); // para juros compostos

  // Estados para os resultados calculados
  const [montanteFinalSimples, setMontanteFinalSimples] = useState<number>(0);
  const [jurosSimplesTotal, setJurosSimplesTotal] = useState<number>(0);
  const [montanteFinalComposto, setMontanteFinalComposto] = useState<number>(0);
  const [jurosCompostosTotal, setJurosCompostosTotal] = useState<number>(0);
  const [dadosGrafico, setDadosGrafico] = useState<DadosGrafico[]>([]);

  // Função para calcular juros simples
  const calcularJurosSimples = () => {
    // Fórmula: J = C * i * t
    // Onde: J = juros, C = capital, i = taxa de juros, t = tempo
    const juros = capital * (taxaJuros / 100) * periodo;
    const montante = capital + juros;
    
    setJurosSimplesTotal(juros);
    setMontanteFinalSimples(montante);
    return { juros, montante };
  };

  // Função para calcular juros compostos
  const calcularJurosCompostos = () => {
    // Fórmula: M = C * (1 + i)^t + PMT * [((1 + i)^t - 1) / i]
    // Onde: M = montante, C = capital, i = taxa de juros, t = tempo, PMT = aporte periódico
    
    const taxaDecimal = taxaJuros / 100;
    const taxaMensal = Math.pow(1 + taxaDecimal, 1/12) - 1;
    const meses = periodo * 12;
    
    let montante = capital;
    let totalAportes = capital;
    
    for (let mes = 1; mes <= meses; mes++) {
      // Rendimento mensal
      const rendimentoMensal = montante * taxaMensal;
      
      // Adiciona o aporte mensal
      if (aporteMensal > 0) {
        montante += aporteMensal;
        totalAportes += aporteMensal;
      }
      
      // Adiciona o rendimento
      montante += rendimentoMensal;
    }
    
    const juros = montante - totalAportes;
    
    setJurosCompostosTotal(juros);
    setMontanteFinalComposto(montante);
    return { juros, montante, totalAportes };
  };

  // Função para gerar dados para o gráfico comparativo
  const gerarDadosGrafico = () => {
    const dados: DadosGrafico[] = [];
    const taxaDecimal = taxaJuros / 100;
    const taxaMensal = Math.pow(1 + taxaDecimal, 1/12) - 1;
    
    // Adiciona o ponto inicial
    dados.push({
      periodo: 0,
      jurosSimples: capital,
      jurosCompostos: capital
    });
    
    let montanteSimples = capital;
    let montanteComposto = capital;
    let totalAportes = capital;
    
    for (let ano = 1; ano <= periodo; ano++) {
      // Cálculo para juros simples
      const jurosSimples = capital * taxaDecimal * ano;
      montanteSimples = capital + jurosSimples;
      
      // Cálculo para juros compostos (mês a mês)
      for (let mes = 1; mes <= 12; mes++) {
        const rendimentoMensal = montanteComposto * taxaMensal;
        
        if (aporteMensal > 0) {
          montanteComposto += aporteMensal;
          totalAportes += aporteMensal;
        }
        
        montanteComposto += rendimentoMensal;
      }
      
      dados.push({
        periodo: ano,
        jurosSimples: Math.round(montanteSimples),
        jurosCompostos: Math.round(montanteComposto)
      });
    }
    
    return dados;
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
    calcularJurosSimples();
    calcularJurosCompostos();
    const dados = gerarDadosGrafico();
    setDadosGrafico(dados);
  };

  // Calcula os resultados quando os inputs mudam
  useEffect(() => {
    calcular();
  }, [capital, taxaJuros, periodo, aporteMensal]);

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
                Calculadora de Juros
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Compare juros simples e compostos e entenda a diferença entre eles na prática
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-12 gap-8">
                {/* Painel de Entrada */}
                <div className="md:col-span-4">
                  <Card>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-finance-blue/10 flex items-center justify-center mb-3">
                        <Percent className="h-6 w-6 text-finance-blue" />
                      </div>
                      <CardTitle>Dados da Simulação</CardTitle>
                      <CardDescription>
                        Configure os parâmetros para comparar os tipos de juros
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Capital Inicial */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="capital">Capital Inicial</Label>
                          <span className="text-sm text-gray-500">{formatarMoeda(capital)}</span>
                        </div>
                        <Input
                          id="capital"
                          type="number"
                          min="100"
                          step="100"
                          value={capital}
                          onChange={(e) => setCapital(Number(e.target.value))}
                        />
                        <Slider
                          value={[capital]}
                          min={100}
                          max={50000}
                          step={100}
                          onValueChange={(value) => setCapital(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>R$ 100</span>
                          <span>R$ 50.000</span>
                        </div>
                      </div>

                      {/* Taxa de Juros */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="taxa-juros">Taxa de Juros (ao ano)</Label>
                          <span className="text-sm text-gray-500">{taxaJuros}%</span>
                        </div>
                        <Input
                          id="taxa-juros"
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={taxaJuros}
                          onChange={(e) => setTaxaJuros(Number(e.target.value))}
                        />
                        <Slider
                          value={[taxaJuros]}
                          min={0.1}
                          max={30}
                          step={0.1}
                          onValueChange={(value) => setTaxaJuros(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0.1%</span>
                          <span>30%</span>
                        </div>
                      </div>

                      {/* Período */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="periodo">Período (em anos)</Label>
                          <span className="text-sm text-gray-500">{periodo} anos</span>
                        </div>
                        <Input
                          id="periodo"
                          type="number"
                          min="1"
                          max="30"
                          value={periodo}
                          onChange={(e) => setPeriodo(Number(e.target.value))}
                        />
                        <Slider
                          value={[periodo]}
                          min={1}
                          max={30}
                          step={1}
                          onValueChange={(value) => setPeriodo(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>1 ano</span>
                          <span>30 anos</span>
                        </div>
                      </div>

                      {/* Aporte Mensal (apenas para juros compostos) */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="aporte-mensal">Aporte Mensal (apenas juros compostos)</Label>
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
                          max={2000}
                          step={50}
                          onValueChange={(value) => setAporteMensal(value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>R$ 0</span>
                          <span>R$ 2.000</span>
                        </div>
                      </div>

                      {/* Botão de Ação */}
                      <div className="pt-4">
                        <Button
                          className="w-full bg-finance-blue hover:bg-finance-blue-dark text-white"
                          onClick={calcular}
                        >
                          Calcular
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Resultados */}
                <div className="md:col-span-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Juros Simples */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Juros Simples</CardTitle>
                        <CardDescription>
                          Cálculo baseado apenas no capital inicial
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">Montante Final</div>
                            <div className="text-2xl font-bold text-gray-900">{formatarMoeda(montanteFinalSimples)}</div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500 mb-1">Capital Inicial</div>
                              <div className="text-xl font-bold text-gray-900">{formatarMoeda(capital)}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500 mb-1">Juros Totais</div>
                              <div className="text-xl font-bold text-gray-900">{formatarMoeda(jurosSimplesTotal)}</div>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                              <div>
                                <h3 className="text-sm font-medium text-blue-700 mb-1">Fórmula dos Juros Simples</h3>
                                <p className="text-sm text-blue-600">
                                  J = C × i × t<br />
                                  M = C + J
                                </p>
                                <ul className="text-xs text-blue-600 mt-2 space-y-1">
                                  <li>J = Juros</li>
                                  <li>C = Capital inicial</li>
                                  <li>i = Taxa de juros</li>
                                  <li>t = Tempo</li>
                                  <li>M = Montante final</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Juros Compostos */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Juros Compostos</CardTitle>
                        <CardDescription>
                          Cálculo com reinvestimento dos juros (juros sobre juros)
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500 mb-1">Montante Final</div>
                            <div className="text-2xl font-bold text-gray-900">{formatarMoeda(montanteFinalComposto)}</div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500 mb-1">Capital + Aportes</div>
                              <div className="text-xl font-bold text-gray-900">{formatarMoeda(capital + (aporteMensal * periodo * 12))}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="text-sm text-gray-500 mb-1">Juros Totais</div>
                              <div className="text-xl font-bold text-gray-900">{formatarMoeda(jurosCompostosTotal)}</div>
                            </div>
                          </div>
                          
                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                              <Info className="h-5 w-5 text-green-500 mt-0.5" />
                              <div>
                                <h3 className="text-sm font-medium text-green-700 mb-1">Fórmula dos Juros Compostos</h3>
                                <p className="text-sm text-green-600">
                                  M = C × (1 + i)^t<br />
                                  Com aportes: M = C × (1 + i)^t + PMT × [((1 + i)^t - 1) / i]
                                </p>
                                <ul className="text-xs text-green-600 mt-2 space-y-1">
                                  <li>M = Montante final</li>
                                  <li>C = Capital inicial</li>
                                  <li>i = Taxa de juros</li>
                                  <li>t = Tempo</li>
                                  <li>PMT = Aporte periódico</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Gráfico Comparativo */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Comparação Visual</CardTitle>
                      <CardDescription>
                        Evolução do montante ao longo do tempo
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={dadosGrafico}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="periodo"
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
                            <Line
                              type="monotone"
                              dataKey="jurosSimples"
                              name="Juros Simples"
                              stroke="#2196F3"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="jurosCompostos"
                              name="Juros Compostos"
                              stroke="#4CAF50"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Diferença entre Juros Simples e Compostos</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-md font-medium text-blue-700 mb-2">Juros Simples</h4>
                            <ul className="text-sm text-gray-600 space-y-2">
                              <li>• Calculados apenas sobre o capital inicial</li>
                              <li>• Os juros de cada período são sempre iguais</li>
                              <li>• Crescimento linear do montante</li>
                              <li>• Mais comum em empréstimos de curto prazo</li>
                              <li>• Fórmula: J = C × i × t</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-md font-medium text-green-700 mb-2">Juros Compostos</h4>
                            <ul className="text-sm text-gray-600 space-y-2">
                              <li>• Calculados sobre o capital acumulado (juros sobre juros)</li>
                              <li>• Os juros aumentam a cada período</li>
                              <li>• Crescimento exponencial do montante</li>
                              <li>• Utilizados em investimentos e financiamentos de longo prazo</li>
                              <li>• Fórmula: M = C × (1 + i)^t</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-yellow-700 mb-1">Exemplo Prático</h3>
                            <p className="text-sm text-yellow-600">
                              Com um capital de R$ 1.000,00 e uma taxa de juros de 10% ao ano, após 10 anos:<br />
                              <strong>Juros Simples:</strong> R$ 1.000,00 + (R$ 1.000,00 × 10% × 10) = R$ 2.000,00<br />
                              <strong>Juros Compostos:</strong> R$ 1.000,00 × (1 + 10%)^10 = R$ 2.593,74<br />
                              <strong>Diferença:</strong> R$ 593,74 (29,7% a mais nos juros compostos)
                            </p>
                          </div>
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

export default CalculadoraJuros;