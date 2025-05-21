// Script para obter dados de mercado em tempo real e renderizar gráficos

// Configuração das APIs
const API_KEYS = {
  alphavantage: 'GC92XI3SZ1UGCG4Z ', // Substitua com sua chave da Alpha Vantage
  financialmodelingprep: 'cU64fzH1ZZ4Y1w0sj68CFXIM8qjbF9sH' // Substitua com sua chave da Financial Modeling Prep
};

// URLs base das APIs
const API_URLS = {
  alphavantage: 'https://www.alphavantage.co/query',
  financialmodelingprep: 'https://financialmodelingprep.com/api/v3'
};

// Elementos do DOM
const indexElements = {
  ibovespa: document.querySelector('.index-item:nth-child(1)'),
  sp500: document.querySelector('.index-item:nth-child(2)'),
  nasdaq: document.querySelector('.index-item:nth-child(3)'),
  dowjones: document.querySelector('.index-item:nth-child(4)'),
  dax: document.querySelector('.index-item:nth-child(5)'),
  nikkei: document.querySelector('.index-item:nth-child(6)')
};

/**
 * Função para buscar dados de índices de mercado
 * Usando a API Financial Modeling Prep para obter dados em tempo real
 */
async function fetchMarketIndices() {
  try {
    // Buscar vários índices de uma só vez (o plano gratuito pode ter limites)
    const response = await fetch(
      `${API_URLS.financialmodelingprep}/quote/%5EBVSP,%5EGSPC,%5EIXIC,%5EDJI,%5EGDAXI,%5EN225?apikey=${API_KEYS.financialmodelingprep}`
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar dados de índices');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar índices de mercado:', error);
    // Em caso de erro, use dados simulados para demonstração da UI
    return getSimulatedMarketData();
  }
}

/**
 * Função para atualizar a UI com os dados de mercado
 */
function updateMarketIndicesUI(indicesData) {
  // Mapeamento entre os símbolos da API e os IDs do nosso HTML
  const symbolMapping = {
    '^BVSP': 'ibovespa',
    '^GSPC': 'sp500',
    '^IXIC': 'nasdaq',
    '^DJI': 'dowjones',
    '^GDAXI': 'dax',
    '^N225': 'nikkei'
  };

  indicesData.forEach(index => {
    const elementKey = symbolMapping[index.symbol];
    if (elementKey && indexElements[elementKey]) {
      const element = indexElements[elementKey];

      // Atualizar o valor
      const valueElement = element.querySelector('.index-value');
      if (valueElement) {
        valueElement.textContent = Math.round(index.price).toLocaleString();
      }

      // Atualizar a variação percentual
      const changeElement = element.querySelector('.index-change');
      if (changeElement) {
        const changeValue = index.changesPercentage;
        changeElement.textContent = `${changeValue >= 0 ? '+' : ''}${changeValue.toFixed(2)}%`;

        // Atualizar a classe CSS baseada na direção do movimento
        if (changeValue >= 0) {
          element.classList.add('up');
          element.classList.remove('down');
        } else {
          element.classList.add('down');
          element.classList.remove('up');
        }
      }
    }
  });
}

/**
 * Função para buscar dados históricos para um gráfico
 */
async function fetchHistoricalData(symbol, interval = 'daily', outputsize = 'compact') {
  try {
    const response = await fetch(
      `${API_URLS.alphavantage}?function=TIME_SERIES_${interval.toUpperCase()}&symbol=${symbol}&outputsize=${outputsize}&apikey=${API_KEYS.alphavantage}`
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar dados históricos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados históricos:', error);
    return null;
  }
}

/**
 * Função para renderizar um gráfico de um índice ou ação
 * Usando a biblioteca Chart.js (você precisará incluí-la no seu HTML)
 */
function renderChart(containerId, historicalData, symbol) {
  const container = document.getElementById(containerId);
  if (!container || !historicalData) return;

  // Extrair os dados do JSON retornado pela Alpha Vantage
  const timeSeriesKey = Object.keys(historicalData).find(key => key.includes('Time Series'));
  if (!timeSeriesKey) return;

  const timeSeries = historicalData[timeSeriesKey];
  const dates = Object.keys(timeSeries).reverse().slice(0, 30); // Últimos 30 dias

  const values = dates.map(date => {
    const dayData = timeSeries[date];
    // Usar o preço de fechamento ("4. close")
    return parseFloat(dayData['4. close']);
  });

  // Configurar o canvas para o gráfico
  const canvas = document.createElement('canvas');
  canvas.width = container.clientWidth;
  canvas.height = 300;
  container.innerHTML = '';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // Criar o gráfico usando Chart.js
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates.map(date => formatDate(date)),
      datasets: [{
        label: symbol,
        data: values,
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        borderWidth: 2,
        tension: 0.1,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Data'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Preço de Fechamento'
          }
        }
      }
    }
  });
}

/**
 * Função auxiliar para formatar datas
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  });
}

/**
 * Função para gerar dados simulados para testes e demonstração
 * Isso é útil quando não se tem uma API key ou quando está apenas desenvolvendo a UI
 */
function getSimulatedMarketData() {
  return [
    {
      symbol: '^BVSP',
      name: 'IBOVESPA',
      price: 152743,
      changesPercentage: 1.45,
      change: 2183.3
    },
    {
      symbol: '^GSPC',
      name: 'S&P 500',
      price: 5267,
      changesPercentage: -0.82,
      change: -43.5
    },
    {
      symbol: '^IXIC',
      name: 'NASDAQ Composite',
      price: 16843,
      changesPercentage: 1.25,
      change: 208.3
    },
    {
      symbol: '^DJI',
      name: 'Dow Jones Industrial Average',
      price: 38973,
      changesPercentage: -0.45,
      change: -176.6
    },
    {
      symbol: '^GDAXI',
      name: 'DAX',
      price: 18456,
      changesPercentage: -0.23,
      change: -42.7
    },
    {
      symbol: '^N225',
      name: 'Nikkei 225',
      price: 38654,
      changesPercentage: -0.37,
      change: -143.2
    }
  ];
}

/**
 * Inicialização do script quando o DOM estiver carregado
 */
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Buscar e atualizar índices de mercado
  try {
    const marketIndices = await fetchMarketIndices();
    updateMarketIndicesUI(marketIndices);
  } catch (error) {
    console.error('Erro ao inicializar dados de mercado:', error);
    // Em caso de erro, usar dados simulados para manter a UI funcionando
    updateMarketIndicesUI(getSimulatedMarketData());
  }

  // 2. Adicionar evento de clique nos botões de filtro de categoria
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      // Remover a classe 'active' de todos os botões
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      // Adicionar a classe 'active' ao botão clicado
      button.classList.add('active');

      // Aqui você poderia implementar a lógica de filtro de notícias
      // com base na categoria selecionada
    });
  });

  // 3. Caso você queira implementar gráficos para algum índice específico
  // Descomente o código abaixo e substitua 'chart-container' pelo ID do seu container de gráfico
  /*
  try {
    const ibovespaData = await fetchHistoricalData('^BVSP');
    if (ibovespaData) {
      renderChart('chart-container', ibovespaData, 'IBOVESPA');
    }
  } catch (error) {
    console.error('Erro ao carregar gráfico:', error);
  }
  */
});

// Função para atualizar os dados a cada minuto (60000 ms)
setInterval(async () => {
  try {
    const marketIndices = await fetchMarketIndices();
    updateMarketIndicesUI(marketIndices);
    console.log('Dados de mercado atualizados:', new Date().toLocaleTimeString());
  } catch (error) {
    console.error('Erro na atualização automática:', error);
  }
}, 60000);