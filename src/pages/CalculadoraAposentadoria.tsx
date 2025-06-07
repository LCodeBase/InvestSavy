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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  HelpCircle,
  AlertCircle,
  TrendingUp,
  Calculator,
  Target,
  Clock,
  DollarSign,
  PiggyBank,
  Lightbulb,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Interfaces
interface DadosGrafico {
  idade: number;
  patrimonio: number;
  contribuicaoAcumulada: number;
  rendimentoAcumulado: number;
  metaPatrimonio?: number;
}

interface Cenario {
  nome: string;
  contribuicao: number;
  patrimonio: number;
  tempo: number;
  cor: string;
}

interface DicaPersonalizada {
  tipo: 'sucesso' | 'alerta' | 'info';
  titulo: string;
  descricao: string;
  acao?: string;
}

const CalculadoraAposentadoria = () => {
  // Estados básicos - INICIANDO ZERADOS
  const [idadeAtual, setIdadeAtual] = useState<number>(25);
  const [idadeAposentadoria, setIdadeAposentadoria] = useState<number>(60);
  const [rendaMensal, setRendaMensal] = useState<number>(0);
  const [rendaDesejada, setRendaDesejada] = useState<number>(0);
  const [patrimonioAtual, setPatrimonioAtual] = useState<number>(0);
  const [contribuicaoMensal, setContribuicaoMensal] = useState<number>(0);
  const [perfilInvestimento, setPerfilInvestimento] = useState<string>("moderado");
  const [inflacao, setInflacao] = useState<number>(4); // 4% ao ano

  // Estados calculados
  const [patrimonioNecessario, setPatrimonioNecessario] = useState<number>(0);
  const [contribuicaoNecessaria, setContribuicaoNecessaria] = useState<number>(0);
  const [dadosGrafico, setDadosGrafico] = useState<DadosGrafico[]>([]);
  const [rendaMensalProjetada, setRendaMensalProjetada] = useState<number>(0);
  const [dicasPersonalizadas, setDicasPersonalizadas] = useState<DicaPersonalizada[]>([]);
  const [cenarios, setCenarios] = useState<Cenario[]>([]);
  const [progressoMeta, setProgressoMeta] = useState<number>(0);

  // Estados de controle
  const [mostrarResultados, setMostrarResultados] = useState<boolean>(false);
  const [tabAtiva, setTabAtiva] = useState<string>("basico");

  // Configurações de perfis de investimento
  const perfisInvestimento = {
    conservador: {
      nome: "Conservador",
      retorno: 6.5, // % ao ano
      risco: "Baixo",
      descricao: "Foco em renda fixa e preservação de capital",
      exemplos: "CDB, Tesouro Direto, LCI/LCA"
    },
    moderado: {
      nome: "Moderado",
      retorno: 9.0, // % ao ano
      risco: "Médio",
      descricao: "Equilibrio entre renda fixa e variável",
      exemplos: "Fundos multimercado, ações blue chips"
    },
    agressivo: {
      nome: "Agressivo",
      retorno: 12.0, // % ao ano
      risco: "Alto",
      descricao: "Foco em renda variável e crescimento",
      exemplos: "Ações, fundos de ações, REITs"
    }
  };

  // Função para validar se todos os campos essenciais estão preenchidos
  const validarCampos = () => {
    return rendaMensal > 0 && rendaDesejada > 0 && contribuicaoMensal > 0;
  };

  // Função para calcular patrimônio necessário
  const calcularPatrimonioNecessario = () => {
    if (rendaDesejada <= 0) return 0;
    // Regra dos 4% - patrimônio necessário = renda anual desejada / 0.04
    const rendaAnualDesejada = rendaDesejada * 12;
    return rendaAnualDesejada / 0.04;
  };

  // Função para calcular contribuição necessária
  const calcularContribuicaoNecessaria = () => {
    const anosInvestimento = idadeAposentadoria - idadeAtual;
    if (anosInvestimento <= 0) return 0;

    const taxaAnual = perfisInvestimento[perfilInvestimento as keyof typeof perfisInvestimento].retorno / 100;
    const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
    const meses = anosInvestimento * 12;
    const patrimonioNecessario = calcularPatrimonioNecessario();

    if (patrimonioNecessario <= 0) return 0;

    // Fórmula PMT considerando valor presente
    const valorFuturoPatrimonioAtual = patrimonioAtual * Math.pow(1 + taxaMensal, meses);
    const patrimonioRestante = Math.max(0, patrimonioNecessario - valorFuturoPatrimonioAtual);

    if (patrimonioRestante <= 0) return 0;

    const contribuicao = (patrimonioRestante * taxaMensal) / (Math.pow(1 + taxaMensal, meses) - 1);
    return Math.max(0, contribuicao);
  };

  // Função para gerar dados do gráfico
  const gerarDadosGrafico = () => {
    const anosInvestimento = idadeAposentadoria - idadeAtual;
    if (anosInvestimento <= 0) return [];

    const taxaAnual = perfisInvestimento[perfilInvestimento as keyof typeof perfisInvestimento].retorno / 100;
    const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
    const patrimonioMeta = calcularPatrimonioNecessario();

    let patrimonio = patrimonioAtual;
    let contribuicaoAcumulada = 0;
    let rendimentoAcumulado = 0;

    const dados: DadosGrafico[] = [];

    // Ponto inicial
    dados.push({
      idade: idadeAtual,
      patrimonio: patrimonio,
      contribuicaoAcumulada: 0,
      rendimentoAcumulado: 0,
      metaPatrimonio: patrimonioMeta
    });

    // Calcular evolução ano a ano
    for (let ano = 1; ano <= anosInvestimento; ano++) {
      for (let mes = 1; mes <= 12; mes++) {
        const rendimentoMensal = patrimonio * taxaMensal;
        patrimonio += contribuicaoMensal + rendimentoMensal;
        contribuicaoAcumulada += contribuicaoMensal;
        rendimentoAcumulado += rendimentoMensal;
      }

      dados.push({
        idade: idadeAtual + ano,
        patrimonio: Math.round(patrimonio),
        contribuicaoAcumulada: Math.round(contribuicaoAcumulada),
        rendimentoAcumulado: Math.round(rendimentoAcumulado),
        metaPatrimonio: patrimonioMeta
      });
    }

    return dados;
  };

  // Função para gerar cenários comparativos
  const gerarCenarios = () => {
    const contribuicaoBase = contribuicaoMensal;
    const cenarios: Cenario[] = [];

    [0.5, 1, 1.5, 2].forEach((multiplicador, index) => {
      const contrib = contribuicaoBase * multiplicador;
      const anosInvestimento = idadeAposentadoria - idadeAtual;
      const taxaAnual = perfisInvestimento[perfilInvestimento as keyof typeof perfisInvestimento].retorno / 100;
      const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
      const meses = anosInvestimento * 12;

      let patrimonio = patrimonioAtual;
      for (let mes = 1; mes <= meses; mes++) {
        patrimonio = patrimonio * (1 + taxaMensal) + contrib;
      }

      const cores = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];

      cenarios.push({
        nome: `${multiplicador === 1 ? 'Atual' : multiplicador < 1 ? 'Reduzido' : 'Aumentado'} (${(multiplicador * 100).toFixed(0)}%)`,
        contribuicao: contrib,
        patrimonio: patrimonio,
        tempo: anosInvestimento,
        cor: cores[index]
      });
    });

    return cenarios;
  };

  // Função para gerar dicas personalizadas
  const gerarDicasPersonalizadas = (): DicaPersonalizada[] => {
    const dicas: DicaPersonalizada[] = [];
    const anosInvestimento = idadeAposentadoria - idadeAtual;
    const contribuicaoNecessaria = calcularContribuicaoNecessaria();
    const percentualRenda = rendaMensal > 0 ? (contribuicaoMensal / rendaMensal) * 100 : 0;

    // Dica sobre tempo
    if (anosInvestimento < 15) {
      dicas.push({
        tipo: 'alerta',
        titulo: 'Tempo Limitado',
        descricao: `Com apenas ${anosInvestimento} anos para investir, você precisará de contribuições maiores.`,
        acao: 'Considere adiar a aposentadoria ou aumentar as contribuições.'
      });
    } else if (anosInvestimento > 30) {
      dicas.push({
        tipo: 'sucesso',
        titulo: 'Tempo a Seu Favor',
        descricao: `Com ${anosInvestimento} anos de investimento, os juros compostos trabalharão muito a seu favor.`,
        acao: 'Mantenha a disciplina e seja consistente com os aportes.'
      });
    }

    // Dica sobre percentual da renda
    if (percentualRenda < 10) {
      dicas.push({
        tipo: 'alerta',
        titulo: 'Contribuição Baixa',
        descricao: `Você está poupando apenas ${percentualRenda.toFixed(1)}% da sua renda.`,
        acao: 'Especialistas recomendam poupar pelo menos 10-20% da renda.'
      });
    } else if (percentualRenda >= 20) {
      dicas.push({
        tipo: 'sucesso',
        titulo: 'Excelente Disciplina',
        descricao: `Parabéns! Você está poupando ${percentualRenda.toFixed(1)}% da sua renda.`,
        acao: 'Continue assim e considere diversificar seus investimentos.'
      });
    }

    // Dica sobre contribuição necessária vs atual
    if (contribuicaoMensal > 0 && contribuicaoNecessaria > 0) {
      const diferenca = contribuicaoNecessaria - contribuicaoMensal;
      if (diferenca > contribuicaoMensal * 0.5) {
        dicas.push({
          tipo: 'alerta',
          titulo: 'Meta Ambiciosa',
          descricao: `Para atingir sua meta, você precisaria contribuir ${formatarMoeda(diferenca)} a mais por mês.`,
          acao: 'Considere ajustar sua meta ou aumentar gradualmente as contribuições.'
        });
      } else if (diferenca < 0) {
        dicas.push({
          tipo: 'sucesso',
          titulo: 'Meta Alcançável',
          descricao: 'Suas contribuições atuais são suficientes para atingir sua meta!',
          acao: 'Considere aumentar sua meta ou aposentar-se mais cedo.'
        });
      }
    }

    // Dica sobre perfil de investimento
    if (anosInvestimento > 20 && perfilInvestimento === 'conservador') {
      dicas.push({
        tipo: 'info',
        titulo: 'Considere Mais Risco',
        descricao: 'Com muito tempo até a aposentadoria, você pode considerar um perfil mais agressivo.',
        acao: 'Avalie aumentar a exposição à renda variável gradualmente.'
      });
    }

    return dicas;
  };

  // Função para calcular progresso da meta
  const calcularProgressoMeta = () => {
    const patrimonioNecessario = calcularPatrimonioNecessario();
    if (patrimonioNecessario <= 0) return 0;

    const patrimonioProjetado = dadosGrafico[dadosGrafico.length - 1]?.patrimonio || 0;
    return Math.min(100, (patrimonioProjetado / patrimonioNecessario) * 100);
  };

  // Função para formatar moeda
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  // Função para formatar percentual
  const formatarPercentual = (valor: number) => {
    return `${valor.toFixed(1)}%`;
  };

  // Função principal de cálculo
  const calcular = () => {
    if (!validarCampos()) {
      setMostrarResultados(false);
      return;
    }

    const patrimonio = calcularPatrimonioNecessario();
    const contribuicao = calcularContribuicaoNecessaria();
    const dados = gerarDadosGrafico();
    const rendaProjetada = dados[dados.length - 1]?.patrimonio * 0.04 / 12 || 0;
    const dicas = gerarDicasPersonalizadas();
    const cenariosComparativos = gerarCenarios();
    const progresso = calcularProgressoMeta();

    setPatrimonioNecessario(patrimonio);
    setContribuicaoNecessaria(contribuicao);
    setDadosGrafico(dados);
    setRendaMensalProjetada(rendaProjetada);
    setDicasPersonalizadas(dicas);
    setCenarios(cenariosComparativos);
    setProgressoMeta(progresso);
    setMostrarResultados(true);
  };

  // Effect para recalcular quando inputs mudam
  useEffect(() => {
    if (validarCampos()) {
      calcular();
    } else {
      setMostrarResultados(false);
    }
  }, [idadeAtual, idadeAposentadoria, rendaMensal, rendaDesejada, patrimonioAtual, contribuicaoMensal, perfilInvestimento, inflacao]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Planejador de Aposentadoria Inteligente
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                Descubra exatamente quanto você precisa poupar para realizar o sonho da aposentadoria.
                Nossa calculadora oferece análises detalhadas e dicas personalizadas para seu perfil.
              </p>
              <div className="flex justify-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calculator className="h-4 w-4" />
                  Cálculos Precisos
                </span>
                <span className="flex items-center gap-1">
                  <Lightbulb className="h-4 w-4" />
                  Dicas Personalizadas
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Cenários Comparativos
                </span>
              </div>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Painel de Entrada */}
                <div className="lg:col-span-4">
                  <Card className="sticky top-4">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-finance-green/10 flex items-center justify-center mb-3">
                        <PiggyBank className="h-6 w-6 text-finance-green" />
                      </div>
                      <CardTitle>Seus Dados Financeiros</CardTitle>
                      <CardDescription>
                        Preencha suas informações para receber um plano personalizado
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Idade Atual */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="idade-atual" className="text-sm font-medium">Sua Idade Atual</Label>
                          <Badge variant="outline">{idadeAtual} anos</Badge>
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
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="idade-aposentadoria" className="text-sm font-medium">Idade Desejada para Aposentadoria</Label>
                          <Badge variant="outline">{idadeAposentadoria} anos</Badge>
                        </div>
                        <Slider
                          id="idade-aposentadoria"
                          min={Math.max(idadeAtual + 5, 50)}
                          max={80}
                          step={1}
                          value={[idadeAposentadoria]}
                          onValueChange={(value) => setIdadeAposentadoria(value[0])}
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-gray-500">
                          Tempo para investir: <span className="font-medium">{idadeAposentadoria - idadeAtual} anos</span>
                        </p>
                      </div>

                      {/* Renda Mensal Atual */}
                      <div className="space-y-2">
                        <Label htmlFor="renda-mensal" className="text-sm font-medium">Sua Renda Mensal Atual</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="renda-mensal"
                            type="number"
                            min={0}
                            value={rendaMensal || ''}
                            onChange={(e) => setRendaMensal(Number(e.target.value) || 0)}
                            className="pl-10"
                            placeholder="Ex: 5000"
                          />
                        </div>
                        {rendaMensal > 0 && (
                          <p className="text-xs text-gray-500">
                            Renda anual: {formatarMoeda(rendaMensal * 12)}
                          </p>
                        )}
                      </div>

                      {/* Renda Desejada na Aposentadoria */}
                      <div className="space-y-2">
                        <Label htmlFor="renda-desejada" className="text-sm font-medium">Renda Mensal Desejada na Aposentadoria</Label>
                        <div className="relative">
                          <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="renda-desejada"
                            type="number"
                            min={0}
                            value={rendaDesejada || ''}
                            onChange={(e) => setRendaDesejada(Number(e.target.value) || 0)}
                            className="pl-10"
                            placeholder="Ex: 8000"
                          />
                        </div>
                        {rendaDesejada > 0 && rendaMensal > 0 && (
                          <p className="text-xs text-gray-500">
                            {((rendaDesejada / rendaMensal) * 100).toFixed(0)}% da sua renda atual
                          </p>
                        )}
                      </div>

                      {/* Patrimônio Atual */}
                      <div className="space-y-2">
                        <Label htmlFor="patrimonio-atual" className="text-sm font-medium">Patrimônio Atual (Investimentos)</Label>
                        <div className="relative">
                          <PiggyBank className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="patrimonio-atual"
                            type="number"
                            min={0}
                            value={patrimonioAtual || ''}
                            onChange={(e) => setPatrimonioAtual(Number(e.target.value) || 0)}
                            className="pl-10"
                            placeholder="Ex: 50000"
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          Valor que você já tem investido para aposentadoria
                        </p>
                      </div>

                      {/* Contribuição Mensal */}
                      <div className="space-y-2">
                        <Label htmlFor="contribuicao-mensal" className="text-sm font-medium">Quanto Pode Investir por Mês</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="contribuicao-mensal"
                            type="number"
                            min={0}
                            value={contribuicaoMensal || ''}
                            onChange={(e) => setContribuicaoMensal(Number(e.target.value) || 0)}
                            className="pl-10"
                            placeholder="Ex: 1000"
                          />
                        </div>
                        {contribuicaoMensal > 0 && rendaMensal > 0 && (
                          <p className="text-xs text-gray-500">
                            {formatarPercentual((contribuicaoMensal / rendaMensal) * 100)} da sua renda
                          </p>
                        )}
                      </div>

                      {/* Perfil de Investimento */}
                      <div className="space-y-3">
                        <Label htmlFor="perfil-investimento" className="text-sm font-medium">Seu Perfil de Investidor</Label>
                        <Select value={perfilInvestimento} onValueChange={setPerfilInvestimento}>
                          <SelectTrigger id="perfil-investimento">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(perfisInvestimento).map(([key, perfil]) => (
                              <SelectItem key={key} value={key}>
                                <div className="flex flex-col">
                                  <span>{perfil.nome} - {perfil.retorno}% a.a.</span>
                                  <span className="text-xs text-gray-500">Risco {perfil.risco}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">
                            <span className="font-medium">{perfisInvestimento[perfilInvestimento as keyof typeof perfisInvestimento].descricao}</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            Exemplos: {perfisInvestimento[perfilInvestimento as keyof typeof perfisInvestimento].exemplos}
                          </p>
                        </div>
                      </div>

                      {/* Botão de Calcular */}
                      <Button
                        onClick={calcular}
                        className="w-full bg-finance-green hover:bg-finance-green-dark text-white h-12"
                        disabled={!validarCampos()}
                      >
                        <Calculator className="h-4 w-4 mr-2" />
                        {validarCampos() ? 'Calcular Meu Plano' : 'Preencha os Campos Obrigatórios'}
                      </Button>

                      {!validarCampos() && (
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            Preencha sua renda atual, renda desejada e contribuição mensal para ver os resultados.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Painel de Resultados */}
                <div className="lg:col-span-8">
                  {!mostrarResultados ? (
                    <Card className="h-96 flex items-center justify-center">
                      <CardContent className="text-center">
                        <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Pronto para Planejar sua Aposentadoria?</h3>
                        <p className="text-gray-500 max-w-md">
                          Preencha seus dados no painel ao lado e descubra exatamente quanto você precisa investir para realizar seus sonhos de aposentadoria.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <Tabs value={tabAtiva} onValueChange={setTabAtiva} className="space-y-6">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="basico">Resultados</TabsTrigger>
                        <TabsTrigger value="grafico">Evolução</TabsTrigger>
                        <TabsTrigger value="cenarios">Cenários</TabsTrigger>
                        <TabsTrigger value="dicas">Dicas</TabsTrigger>
                      </TabsList>

                      {/* Tab: Resultados Básicos */}
                      <TabsContent value="basico" className="space-y-6">
                        {/* Resumo Principal */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Target className="h-5 w-5 text-finance-green" />
                              Seu Plano de Aposentadoria
                            </CardTitle>
                            <CardDescription>
                              Análise completa baseada nos seus dados
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <p className="text-sm text-gray-500">Patrimônio Necessário</p>
                                <p className="text-3xl font-bold text-finance-blue">
                                  {formatarMoeda(patrimonioNecessario)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Para gerar {formatarMoeda(rendaDesejada)}/mês
                                </p>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm text-gray-500">Contribuição Ideal</p>
                                <p className="text-3xl font-bold text-finance-green">
                                  {formatarMoeda(contribuicaoNecessaria)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {contribuicaoNecessaria > contribuicaoMensal ?
                                    `${formatarMoeda(contribuicaoNecessaria - contribuicaoMensal)} a mais que o atual` :
                                    'Sua contribuição atual é suficiente!'
                                  }
                                </p>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm text-gray-500">Patrimônio Projetado</p>
                                <p className="text-3xl font-bold text-finance-blue">
                                  {formatarMoeda(dadosGrafico[dadosGrafico.length - 1]?.patrimonio || 0)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Com sua contribuição atual
                                </p>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm text-gray-500">Renda Mensal Projetada</p>
                                <p className="text-3xl font-bold text-finance-green">
                                  {formatarMoeda(rendaMensalProjetada)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Baseado na regra dos 4%
                                </p>
                              </div>
                            </div>

                            {/* Progresso da Meta */}
                            <div className="mt-6 space-y-3">
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-medium">Progresso da Meta</p>
                                <p className="text-sm text-gray-500">{formatarPercentual(progressoMeta)}</p>
                              </div>
                              <Progress value={progressoMeta} className="h-3" />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Atual</span>
                                <span>Meta: {formatarMoeda(patrimonioNecessario)}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Status da Meta */}
                        <Card>
                          <CardContent className="pt-6">
                            {progressoMeta >= 100 ? (
                              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                                <div>
                                  <h3 className="font-semibold text-green-800">Parabéns! Meta Alcançada</h3>
                                  <p className="text-sm text-green-600">
                                    Suas contribuições atuais são suficientes para atingir sua meta de aposentadoria.
                                  </p>
                                </div>
                              </div>
                            ) : progressoMeta >= 80 ? (
                              <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                                <AlertCircle className="h-8 w-8 text-yellow-600" />
                                <div>
                                  <h3 className="font-semibold text-yellow-800">Quase Lá!</h3>
                                  <p className="text-sm text-yellow-600">
                                    Você está no caminho certo. Considere aumentar um pouco as contribuições.
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                                <XCircle className="h-8 w-8 text-red-600" />
                                <div>
                                  <h3 className="font-semibold text-red-800">Ajustes Necessários</h3>
                                  <p className="text-sm text-red-600">
                                    Para atingir sua meta, você precisará aumentar as contribuições ou ajustar suas expectativas.
                                  </p>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Tab: Gráfico de Evolução */}
                      <TabsContent value="grafico" className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Evolução do Patrimônio</CardTitle>
                            <CardDescription>
                              Projeção da evolução do seu patrimônio até a aposentadoria
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-96">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dadosGrafico}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis
                                    dataKey="idade"
                                    label={{ value: 'Idade', position: 'insideBottom', offset: -10 }}
                                  />
                                  <YAxis
                                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                                    label={{ value: 'Patrimônio (R$)', angle: -90, position: 'insideLeft' }}
                                  />
                                  <Tooltip
                                    formatter={(value, name) => [
                                      formatarMoeda(Number(value)),
                                      name === 'patrimonio' ? 'Patrimônio Total' :
                                        name === 'contribuicaoAcumulada' ? 'Contribuições' :
                                          name === 'rendimentoAcumulado' ? 'Rendimentos' : 'Meta'
                                    ]}
                                    labelFormatter={(label) => `Idade: ${label} anos`}
                                  />
                                  <Legend />
                                  <Area
                                    type="monotone"
                                    dataKey="contribuicaoAcumulada"
                                    stackId="1"
                                    stroke="#3b82f6"
                                    fill="#3b82f6"
                                    fillOpacity={0.6}
                                    name="Contribuições"
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="rendimentoAcumulado"
                                    stackId="1"
                                    stroke="#10b981"
                                    fill="#10b981"
                                    fillOpacity={0.6}
                                    name="Rendimentos"
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="metaPatrimonio"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={false}
                                    name="Meta"
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Breakdown do Patrimônio Final */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Composição do Patrimônio Final</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <p className="text-2xl font-bold text-blue-600">
                                  {formatarMoeda(dadosGrafico[dadosGrafico.length - 1]?.contribuicaoAcumulada || 0)}
                                </p>
                                <p className="text-sm text-blue-600">Suas Contribuições</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {((dadosGrafico[dadosGrafico.length - 1]?.contribuicaoAcumulada || 0) /
                                    (dadosGrafico[dadosGrafico.length - 1]?.patrimonio || 1) * 100).toFixed(0)}% do total
                                </p>
                              </div>
                              <div className="text-center p-4 bg-green-50 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">
                                  {formatarMoeda(dadosGrafico[dadosGrafico.length - 1]?.rendimentoAcumulado || 0)}
                                </p>
                                <p className="text-sm text-green-600">Rendimentos</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {((dadosGrafico[dadosGrafico.length - 1]?.rendimentoAcumulado || 0) /
                                    (dadosGrafico[dadosGrafico.length - 1]?.patrimonio || 1) * 100).toFixed(0)}% do total
                                </p>
                              </div>
                              <div className="text-center p-4 bg-purple-50 rounded-lg">
                                <p className="text-2xl font-bold text-purple-600">
                                  {formatarMoeda(patrimonioAtual)}
                                </p>
                                <p className="text-sm text-purple-600">Patrimônio Inicial</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Valor que você já possui
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      {/* Tab: Cenários Comparativos */}
                      <TabsContent value="cenarios" className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Cenários de Contribuição</CardTitle>
                            <CardDescription>
                              Veja como diferentes valores de contribuição afetam seu patrimônio final
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-80">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={cenarios}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="nome" />
                                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                  <Tooltip formatter={(value) => [formatarMoeda(Number(value)), 'Patrimônio Final']} />
                                  <Bar dataKey="patrimonio" fill="#10b981" />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {cenarios.map((cenario, index) => (
                            <Card key={index} className={cenario.nome.includes('Atual') ? 'ring-2 ring-finance-green' : ''}>
                              <CardContent className="pt-6">
                                <div className="flex justify-between items-start mb-3">
                                  <h3 className="font-semibold">{cenario.nome}</h3>
                                  {cenario.nome.includes('Atual') && (
                                    <Badge className="bg-finance-green text-white">Atual</Badge>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Contribuição Mensal:</span>
                                    <span className="font-medium">{formatarMoeda(cenario.contribuicao)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Patrimônio Final:</span>
                                    <span className="font-bold text-finance-blue">{formatarMoeda(cenario.patrimonio)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Renda Mensal:</span>
                                    <span className="font-medium">{formatarMoeda(cenario.patrimonio * 0.04 / 12)}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      {/* Tab: Dicas Personalizadas */}
                      <TabsContent value="dicas" className="space-y-6">
                        {/* Dicas Personalizadas */}
                        <div className="space-y-4">
                          {dicasPersonalizadas.map((dica, index) => (
                            <Alert key={index} className={
                              dica.tipo === 'sucesso' ? 'border-green-200 bg-green-50' :
                                dica.tipo === 'alerta' ? 'border-yellow-200 bg-yellow-50' :
                                  'border-blue-200 bg-blue-50'
                            }>
                              {dica.tipo === 'sucesso' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                                dica.tipo === 'alerta' ? <AlertCircle className="h-4 w-4 text-yellow-600" /> :
                                  <Info className="h-4 w-4 text-blue-600" />}
                              <div>
                                <h4 className="font-semibold mb-1">{dica.titulo}</h4>
                                <p className="text-sm mb-2">{dica.descricao}</p>
                                {dica.acao && (
                                  <p className="text-sm font-medium">{dica.acao}</p>
                                )}
                              </div>
                            </Alert>
                          ))}
                        </div>

                        {/* Dicas Gerais */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Lightbulb className="h-5 w-5 text-finance-green" />
                              Dicas para Maximizar sua Aposentadoria
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <h4 className="font-semibold text-finance-blue">Estratégias de Investimento</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Diversifique entre renda fixa e variável</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Aproveite benefícios fiscais (PGBL/VGBL)</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Reinvista dividendos e rendimentos</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Revise periodicamente sua carteira</span>
                                  </li>
                                </ul>
                              </div>

                              <div className="space-y-4">
                                <h4 className="font-semibold text-finance-blue">Disciplina Financeira</h4>
                                <ul className="space-y-2 text-sm">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Automatize seus investimentos</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Aumente contribuições com aumentos salariais</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Evite resgates desnecessários</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Mantenha uma reserva de emergência</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Simulador de Impacto */}
                        <Card>
                          <CardHeader>
                            <CardTitle>O Poder do Tempo</CardTitle>
                            <CardDescription>
                              Veja como começar mais cedo faz diferença
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {[5, 10, 15].map((anosAtraso) => {
                                const idadeInicio = idadeAtual + anosAtraso;
                                const anosInvestimento = Math.max(0, idadeAposentadoria - idadeInicio);
                                const taxaAnual = perfisInvestimento[perfilInvestimento as keyof typeof perfisInvestimento].retorno / 100;
                                const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
                                const meses = anosInvestimento * 12;

                                let patrimonio = 0;
                                for (let mes = 1; mes <= meses; mes++) {
                                  patrimonio = patrimonio * (1 + taxaMensal) + contribuicaoMensal;
                                }

                                return (
                                  <div key={anosAtraso} className="text-center p-4 bg-gray-50 rounded-lg">
                                    <p className="text-lg font-bold text-gray-800">
                                      {formatarMoeda(patrimonio)}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Começando aos {idadeInicio} anos
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      ({anosInvestimento} anos investindo)
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                            <p className="text-sm text-gray-600 mt-4 text-center">
                              Cada ano de atraso pode custar milhares de reais no futuro!
                            </p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  )}
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