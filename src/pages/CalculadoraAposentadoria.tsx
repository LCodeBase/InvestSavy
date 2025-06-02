import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, HelpCircle, AlertCircle, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

// Definição da interface para os dados do gráfico
interface DadosGrafico {
  idade: number;
  patrimonio: number;
  contribuicaoAcumulada: number;
  rendimentoAcumulado: number;
}

const CalculadoraAposentadoria = () => {
  // Estados para os inputs do usuário
  const [idadeAtual, setIdadeAtual] = useState<number>(30);
  const [idadeAposentadoria, setIdadeAposentadoria] = useState<number>(65);
  const [rendaMensal, setRendaMensal] = useState<number>(5000);
  const [rendaDesejada, setRendaDesejada] = useState<number>(5000);
  const [patrimonioAtual, setPatrimonioAtual] = useState<number>(0);
  const [contribuicaoMensal, setContribuicaoMensal] = useState<number>(500);
  const [taxaRetorno, setTaxaRetorno] = useState<number>(0.5); // 0.5% ao mês = ~6.17% ao ano
  const [inflacao, setInflacao] = useState<number>(0.32); // 0.32% ao mês = ~3.9% ao ano
  const [perfilInvestimento, setPerfilInvestimento] = useState<string>("moderado");

  // Estados para os resultados calculados
  const [patrimonioFinal, setPatrimonioFinal] = useState<number>(0);
  const [contribuicaoNecessaria, setContribuicaoNecessaria] = useState<number>(0);
  // Substituir any[] por DadosGrafico[]
  const [dadosGrafico, setDadosGrafico] = useState<DadosGrafico[]>([]);
  const [rendaMensalAposentadoria, setRendaMensalAposentadoria] = useState<number>(0);

  // Taxas de retorno reais baseadas no perfil de investimento
  const taxasRetorno = {
    conservador: 0.4, // ~4.91% ao ano (acima da inflação)
    moderado: 0.5,    // ~6.17% ao ano (acima da inflação)
    agressivo: 0.65   // ~8.11% ao ano (acima da inflação)
  };

  // Atualiza a taxa de retorno quando o perfil de investimento muda
  useEffect(() => {
    setTaxaRetorno(taxasRetorno[perfilInvestimento as keyof typeof taxasRetorno]);
  }, [perfilInvestimento, taxasRetorno]);

  // Função para calcular o patrimônio necessário para a aposentadoria
  const calcularPatrimonioNecessario = () => {
    // Fórmula: Renda Mensal Desejada / Taxa de Retorno Mensal Real
    // Considerando a regra dos 4% (taxa de retirada segura anual)
    const taxaRetornoReal = (taxaRetorno - inflacao) / 100;
    const taxaRetiradaMensal = 0.0033; // ~4% ao ano
    return rendaDesejada / taxaRetiradaMensal;
  };

  // Função para calcular a contribuição mensal necessária
  const calcularContribuicaoNecessaria = () => {
    const anosAteAposentadoria = idadeAposentadoria - idadeAtual;
    const mesesAteAposentadoria = anosAteAposentadoria * 12;
    const patrimonioNecessario = calcularPatrimonioNecessario();
    const taxaRetornoReal = (taxaRetorno - inflacao) / 100;

    // Fórmula para calcular a contribuição mensal necessária
    // PMT = [FV - PV(1+r)^n] / [(1+r)^n - 1] / r
    // Onde: PMT = contribuição mensal, FV = valor futuro (patrimônio necessário),
    // PV = valor presente (patrimônio atual), r = taxa de juros, n = número de períodos

    const fatorJuros = Math.pow(1 + taxaRetornoReal, mesesAteAposentadoria);
    const contribuicao = (patrimonioNecessario - patrimonioAtual * fatorJuros) /
      ((fatorJuros - 1) / taxaRetornoReal);

    return Math.max(0, contribuicao);
  };

  // Função para calcular a projeção do patrimônio ao longo do tempo
  const calcularProjecaoPatrimonio = () => {
    const anosAteAposentadoria = idadeAposentadoria - idadeAtual;
    const mesesAteAposentadoria = anosAteAposentadoria * 12;
    const taxaRetornoReal = (taxaRetorno - inflacao) / 100;

    let patrimonioProjetado = patrimonioAtual;
    const dados = [];

    // Adiciona o ponto inicial
    dados.push({
      idade: idadeAtual,
      patrimonio: patrimonioProjetado,
      contribuicaoAcumulada: 0,
      rendimentoAcumulado: 0
    });

    let contribuicaoAcumulada = 0;
    let rendimentoAcumulado = 0;

    // Calcula o patrimônio para cada ano até a aposentadoria
    for (let ano = 1; ano <= anosAteAposentadoria; ano++) {
      const idadeAtual = dados[ano - 1].idade + 1;

      // Calcula o patrimônio mês a mês durante o ano
      for (let mes = 1; mes <= 12; mes++) {
        // Rendimento mensal
        const rendimentoMensal = patrimonioProjetado * taxaRetornoReal;
        rendimentoAcumulado += rendimentoMensal;

        // Adiciona a contribuição mensal
        patrimonioProjetado += contribuicaoMensal + rendimentoMensal;
        contribuicaoAcumulada += contribuicaoMensal;
      }

      // Adiciona o ponto para o ano atual
      dados.push({
        idade: idadeAtual,
        patrimonio: Math.round(patrimonioProjetado),
        contribuicaoAcumulada: Math.round(contribuicaoAcumulada),
        rendimentoAcumulado: Math.round(rendimentoAcumulado)
      });
    }

    return dados;
  };

  // Função para calcular a renda mensal na aposentadoria
  const calcularRendaMensalAposentadoria = (patrimonioFinal: number) => {
    // Usando a regra dos 4% (taxa de retirada segura anual)
    const taxaRetiradaMensal = 0.0033; // ~4% ao ano
    return patrimonioFinal * taxaRetiradaMensal;
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
    const patrimonioNecessario = calcularPatrimonioNecessario();
    setPatrimonioFinal(patrimonioNecessario);

    const contribuicao = calcularContribuicaoNecessaria();
    setContribuicaoNecessaria(contribuicao);

    const dados = calcularProjecaoPatrimonio();
    setDadosGrafico(dados);

    const rendaMensal = calcularRendaMensalAposentadoria(dados[dados.length - 1].patrimonio);
    setRendaMensalAposentadoria(rendaMensal);
  };

  // Calcula os resultados quando os inputs mudam
  useEffect(() => {
    calcular();
  }, [idadeAtual, idadeAposentadoria, rendaMensal, rendaDesejada, patrimonioAtual,
    contribuicaoMensal, taxaRetorno, inflacao, perfilInvestimento]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Calculadora de Aposentadoria
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Descubra quanto você precisa poupar mensalmente para atingir sua meta de aposentadoria
              </p>
              <div className="text-sm text-gray-500 mt-2">
                950 cálculos realizados
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-12 gap-8">
                {/* Painel de Entrada */}
                <div className="md:col-span-5">
                  <Card>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-finance-green/10 flex items-center justify-center mb-3">
                        <Users className="h-6 w-6 text-finance-green" />
                      </div>
                      <CardTitle>Seus Dados</CardTitle>
                      <CardDescription>
                        Preencha as informações abaixo para calcular sua aposentadoria
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Idade Atual */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="idade-atual">Idade Atual</Label>
                          <span className="text-sm text-gray-500">{idadeAtual} anos</span>
                        </div>
                        <Slider
                          id="idade-atual"
                          min={18}
                          max={70}
                          step={1}
                          value={[idadeAtual]}
                          onValueChange={(value) => setIdadeAtual(value[0])}
                          className="cursor-pointer"
                        />
                      </div>

                      {/* Idade de Aposentadoria */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="idade-aposentadoria">Idade de Aposentadoria</Label>
                          <span className="text-sm text-gray-500">{idadeAposentadoria} anos</span>
                        </div>
                        <Slider
                          id="idade-aposentadoria"
                          min={Math.max(idadeAtual + 1, 45)}
                          max={90}
                          step={1}
                          value={[idadeAposentadoria]}
                          onValueChange={(value) => setIdadeAposentadoria(value[0])}
                          className="cursor-pointer"
                        />
                      </div>

                      {/* Renda Mensal Atual */}
                      <div className="space-y-2">
                        <Label htmlFor="renda-mensal">Renda Mensal Atual</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                          <Input
                            id="renda-mensal"
                            type="number"
                            min={0}
                            value={rendaMensal}
                            onChange={(e) => setRendaMensal(Number(e.target.value))}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      {/* Renda Desejada na Aposentadoria */}
                      <div className="space-y-2">
                        <Label htmlFor="renda-desejada">Renda Desejada na Aposentadoria</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                          <Input
                            id="renda-desejada"
                            type="number"
                            min={0}
                            value={rendaDesejada}
                            onChange={(e) => setRendaDesejada(Number(e.target.value))}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      {/* Patrimônio Atual */}
                      <div className="space-y-2">
                        <Label htmlFor="patrimonio-atual">Patrimônio Atual</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                          <Input
                            id="patrimonio-atual"
                            type="number"
                            min={0}
                            value={patrimonioAtual}
                            onChange={(e) => setPatrimonioAtual(Number(e.target.value))}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      {/* Contribuição Mensal */}
                      <div className="space-y-2">
                        <Label htmlFor="contribuicao-mensal">Contribuição Mensal</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                          <Input
                            id="contribuicao-mensal"
                            type="number"
                            min={0}
                            value={contribuicaoMensal}
                            onChange={(e) => setContribuicaoMensal(Number(e.target.value))}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      {/* Perfil de Investimento */}
                      <div className="space-y-2">
                        <Label htmlFor="perfil-investimento">Perfil de Investimento</Label>
                        <Select
                          value={perfilInvestimento}
                          onValueChange={setPerfilInvestimento}
                        >
                          <SelectTrigger id="perfil-investimento">
                            <SelectValue placeholder="Selecione seu perfil" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conservador">Conservador (4,91% a.a.)</SelectItem>
                            <SelectItem value="moderado">Moderado (6,17% a.a.)</SelectItem>
                            <SelectItem value="agressivo">Agressivo (8,11% a.a.)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Inflação */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="inflacao">Inflação Anual</Label>
                          <span className="text-sm text-gray-500">{(inflacao * 12).toFixed(2)}%</span>
                        </div>
                        <Slider
                          id="inflacao"
                          min={0.2}
                          max={0.6}
                          step={0.01}
                          value={[inflacao]}
                          onValueChange={(value) => setInflacao(value[0])}
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          A inflação média no Brasil nos últimos anos tem sido em torno de 3,9% ao ano.
                        </p>
                      </div>

                      <Button
                        onClick={calcular}
                        className="w-full bg-finance-green hover:bg-finance-green-dark text-white"
                      >
                        Recalcular
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Painel de Resultados */}
                <div className="md:col-span-7">
                  <div className="space-y-6">
                    {/* Resultados Principais */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Resultados da Simulação</CardTitle>
                        <CardDescription>
                          Com base nos dados informados, veja os resultados da sua simulação
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">Contribuição Mensal Necessária</p>
                            <p className="text-3xl font-bold text-finance-green">
                              {formatarMoeda(contribuicaoNecessaria)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Valor mensal necessário para atingir sua meta
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">Patrimônio Projetado</p>
                            <p className="text-3xl font-bold text-finance-blue">
                              {formatarMoeda(dadosGrafico[dadosGrafico.length - 1]?.patrimonio || 0)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Patrimônio estimado aos {idadeAposentadoria} anos
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">Renda Mensal na Aposentadoria</p>
                            <p className="text-3xl font-bold text-finance-green">
                              {formatarMoeda(rendaMensalAposentadoria)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Baseado na regra de retirada segura de 4% ao ano
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">Tempo até a Aposentadoria</p>
                            <p className="text-3xl font-bold text-finance-blue">
                              {idadeAposentadoria - idadeAtual} anos
                            </p>
                            <p className="text-xs text-gray-500">
                              Período de acumulação de patrimônio
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Gráfico */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Projeção do Patrimônio</CardTitle>
                        <CardDescription>
                          Evolução do seu patrimônio ao longo do tempo até a aposentadoria
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={dadosGrafico}
                              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                dataKey="idade"
                                label={{ value: 'Idade', position: 'insideBottomRight', offset: -10 }}
                              />
                              <YAxis
                                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                                label={{ value: 'Patrimônio (R$)', angle: -90, position: 'insideLeft' }}
                              />
                              <Tooltip
                                formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']}
                                labelFormatter={(label) => `Idade: ${label} anos`}
                              />
                              <Legend />
                              <Area
                                type="monotone"
                                dataKey="patrimonio"
                                name="Patrimônio Total"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.3}
                              />
                              <Area
                                type="monotone"
                                dataKey="contribuicaoAcumulada"
                                name="Contribuições"
                                stroke="#3b82f6"
                                fill="#3b82f6"
                                fillOpacity={0.3}
                              />
                              <Area
                                type="monotone"
                                dataKey="rendimentoAcumulado"
                                name="Rendimentos"
                                stroke="#f59e0b"
                                fill="#f59e0b"
                                fillOpacity={0.3}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Informações Adicionais */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Informações Importantes</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-finance-blue" />
                            Sobre os Cálculos
                          </h3>
                          <p className="text-sm text-gray-600">
                            Esta calculadora utiliza a regra de retirada segura de 4% ao ano, que sugere que você pode retirar 4% do seu patrimônio total no primeiro ano de aposentadoria e ajustar esse valor pela inflação nos anos seguintes, com baixo risco de esgotar seus recursos durante a aposentadoria.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-finance-green" />
                            Taxas de Retorno
                          </h3>
                          <p className="text-sm text-gray-600">
                            As taxas de retorno utilizadas são baseadas em dados históricos do mercado brasileiro, considerando diferentes perfis de investimento:
                          </p>
                          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                            <li><span className="font-medium">Conservador:</span> 4,91% ao ano (acima da inflação) - Títulos públicos, CDBs e fundos de renda fixa</li>
                            <li><span className="font-medium">Moderado:</span> 6,17% ao ano (acima da inflação) - Mix de renda fixa e variável</li>
                            <li><span className="font-medium">Agressivo:</span> 8,11% ao ano (acima da inflação) - Maior alocação em renda variável</li>
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-finance-blue" />
                            Dicas para Melhorar sua Aposentadoria
                          </h3>
                          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                            <li>Comece a poupar o quanto antes para aproveitar o poder dos juros compostos</li>
                            <li>Aumente gradualmente suas contribuições mensais, especialmente após aumentos salariais</li>
                            <li>Diversifique seus investimentos para equilibrar risco e retorno</li>
                            <li>Considere a inflação em seu planejamento, pois ela reduz o poder de compra ao longo do tempo</li>
                            <li>Reavalie seu plano periodicamente e ajuste conforme necessário</li>
                          </ul>
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

export default CalculadoraAposentadoria;