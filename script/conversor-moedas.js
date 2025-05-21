// Elementos DOM
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
const resultElement = document.getElementById('result');
const exchangeRateElement = document.getElementById('exchange-rate');
const conversionDetailsElement = document.getElementById('conversion-details');
const ratesTableBody = document.getElementById('rates-table-body');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Dados de configuração
// Free API key da ExchangeRate-API (limite de 1500 requisições por mês)
const API_KEY = '07ca32210dd3ff348cb14e27';
const BASE_URL = 'https://v6.exchangerate-api.com/v6/' + API_KEY;
const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutos em milissegundos

// Mapeamento de códigos de moeda para facilitar o uso
const currencyMapping = {
    'US': 'USD', // Dólar Americano
    'BR': 'BRL', // Real Brasileiro
    'EU': 'EUR', // Euro
    'GB': 'GBP', // Libra Esterlina
    'JP': 'JPY', // Iene Japonês
    'CA': 'CAD', // Dólar Canadense
    'AU': 'AUD', // Dólar Australiano
    'CH': 'CHF'  // Franco Suíço
};

// Moedas principais a serem exibidas na tabela
const mainCurrencies = ['USD', 'EUR', 'BRL', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF'];

// Taxas de câmbio em cache
let exchangeRates = {};
let lastUpdated = null;

// Inicializa as abas
function initTabs() {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove a classe 'active' de todos os botões e conteúdos
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Adiciona a classe 'active' ao botão clicado e ao conteúdo correspondente
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');

      // Se for a aba de tabela, atualiza os dados
      if (tabId === 'tabela') {
        updateExchangeTable();
      }
    });
  });
}

// Função para converter moeda
async function convertCurrency() {
  try {
    // Adiciona loader para indicar processamento
    resultElement.innerHTML = '<div class="loader"></div>';

    const amount = parseFloat(amountInput.value) || 1;

    // Obtém o código real da moeda do mapeamento
    const from = currencyMapping[fromCurrency.value];
    const to = currencyMapping[toCurrency.value];

    // Obtém a taxa de câmbio
    const rate = await getExchangeRate(from, to);

    // Calcula o valor convertido
    const convertedAmount = amount * rate;

    // Atualiza a exibição
    updateResult(amount, from, to, rate, convertedAmount);
  } catch (error) {
    resultElement.textContent = 'Erro na conversão. Tente novamente.';
    console.error('Erro ao converter:', error);
  }
}

// Função para obter a taxa de câmbio usando a API V6 do ExchangeRate-API
async function getExchangeRate(from, to) {
  // Verifica se é a mesma moeda
  if (from === to) return 1;

  // Cria a chave de par de moedas
  const pair = `${from}_${to}`;

  // Verifica se a taxa está em cache e se ainda é válida (menos de 5 minutos)
  const cacheIsValid = lastUpdated && (Date.now() - lastUpdated < UPDATE_INTERVAL);

  if (exchangeRates[pair] && cacheIsValid) {
    return exchangeRates[pair];
  }

  try {
    // Faz a requisição para a API (nesta API, obtemos taxas para todas as moedas de uma vez)
    const response = await fetch(`${BASE_URL}/latest/${from}`);
    const data = await response.json();

    if (data.result === "success") {
      // Armazena todas as taxas em cache
      for (const currency in data.conversion_rates) {
        exchangeRates[`${from}_${currency}`] = data.conversion_rates[currency];
      }

      lastUpdated = Date.now();

      // Atualiza o horário da última atualização
      updateLastUpdateTime();

      return data.conversion_rates[to];
    } else {
      throw new Error('Erro ao obter taxa de câmbio: ' + data.error);
    }
  } catch (error) {
    console.error('Erro ao obter taxa de câmbio:', error);

    // Fallback: se a API falhar, usa valores pré-definidos
    const fallbackRates = {
      'USD_BRL': 5.05,
      'BRL_USD': 0.20,
      'EUR_USD': 1.09,
      'USD_EUR': 0.92,
      'GBP_USD': 1.26,
      'USD_GBP': 0.79,
      'JPY_USD': 0.0067,
      'USD_JPY': 149.8
    };

    return fallbackRates[pair] || 1;
  }
}

// Função para atualizar o resultado na interface
function updateResult(amount, from, to, rate, convertedAmount) {
  // Formata os valores para exibição
  const formattedRate = rate.toFixed(4);
  const formattedAmount = formatCurrency(convertedAmount, to);

  // Atualiza os elementos na interface
  exchangeRateElement.textContent = `1 ${from} = ${formattedRate} ${to}`;
  resultElement.textContent = formattedAmount;
  conversionDetailsElement.textContent = `${amount} ${from} = ${formattedAmount}`;
}

// Função para inverter as moedas
function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  // Converte automaticamente após a troca
  convertCurrency();
}

// Função para atualizar a tabela de câmbio
async function updateExchangeTable() {
  try {
    // Para cada moeda base
    for (let i = 0; i < mainCurrencies.length; i++) {
      const baseCurrency = mainCurrencies[i];
      const row = ratesTableBody.rows[i];

      // Para cada moeda alvo (começando do índice 1 para pular a célula do código da moeda)
      for (let j = 1; j < row.cells.length; j++) {
        const targetCurrency = mainCurrencies[j-1];
        const cell = row.cells[j];

        if (baseCurrency === targetCurrency) {
          // Se for a mesma moeda, o valor é 1
          cell.textContent = '1.0000';
        } else {
          // Adiciona um loader enquanto obtém a taxa
          cell.innerHTML = '<div class="loader"></div>';

          // Obtém e exibe a taxa
          getExchangeRate(baseCurrency, targetCurrency)
            .then(rate => {
              cell.textContent = rate.toFixed(4);
            })
            .catch(() => {
              cell.textContent = 'N/A';
            });
        }
      }
    }

    // Atualiza o horário da última atualização
    updateLastUpdateTime();
  } catch (error) {
    console.error('Erro ao atualizar tabela:', error);
  }
}

// Função para atualizar o horário da última atualização
function updateLastUpdateTime() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('pt-BR');
  const formattedTime = now.toLocaleTimeString('pt-BR');

  // Atualiza todos os elementos que mostram horário de atualização
  document.querySelectorAll('.update-time').forEach(element => {
    element.innerHTML = `<i class="fas fa-sync-alt"></i> Última atualização: ${formattedDate}, ${formattedTime}`;
  });
}

// Função para formatar valores monetários
function formatCurrency(value, currency) {
  // Use Intl.NumberFormat para formatar o valor de acordo com a moeda
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(value);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa as abas
  initTabs();

  // Faz a conversão inicial
  convertCurrency();

  // Adiciona os event listeners para os elementos interativos
  convertBtn.addEventListener('click', convertCurrency);
  swapBtn.addEventListener('click', swapCurrencies);

  // Também converte quando mudar as moedas ou o valor
  amountInput.addEventListener('input', convertCurrency);
  fromCurrency.addEventListener('change', convertCurrency);
  toCurrency.addEventListener('change', convertCurrency);
});

// Atualiza as taxas a cada 5 minutos
setInterval(() => {
  // Limpa o cache para forçar uma nova requisição
  exchangeRates = {};
  lastUpdated = null;

  // Atualiza os dados
  convertCurrency();

  // Atualiza a tabela se estiver visível
  if (document.getElementById('tabela').classList.contains('active')) {
    updateExchangeTable();
  }
}, UPDATE_INTERVAL);

// Inicializa as abas
function initTabs() {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove a classe 'active' de todos os botões e conteúdos
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Adiciona a classe 'active' ao botão clicado e ao conteúdo correspondente
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');

      // Se for a aba de tabela, atualiza os dados
      if (tabId === 'tabela') {
        updateExchangeTable();
      }
    });
  });
}

// Função para converter moeda
async function convertCurrency() {
  try {
    // Adiciona loader para indicar processamento
    resultElement.innerHTML = '<div class="loader"></div>';

    const amount = parseFloat(amountInput.value) || 1;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Obtém a taxa de câmbio
    const rate = await getExchangeRate(from, to);

    // Calcula o valor convertido
    const convertedAmount = amount * rate;

    // Atualiza a exibição
    updateResult(amount, from, to, rate, convertedAmount);
  } catch (error) {
    resultElement.textContent = 'Erro na conversão. Tente novamente.';
    console.error('Erro ao converter:', error);
  }
}

// Função para obter a taxa de câmbio
async function getExchangeRate(from, to) {
  // Verifica se é a mesma moeda
  if (from === to) return 1;

  // Cria a chave de par de moedas
  const pair = `${from}_${to}`;

  // Verifica se a taxa está em cache e se ainda é válida (menos de 5 minutos)
  const cacheIsValid = lastUpdated && (Date.now() - lastUpdated < UPDATE_INTERVAL);

  if (exchangeRates[pair] && cacheIsValid) {
    return exchangeRates[pair];
  }

  try {
    // Faz a requisição para a API
    const response = await fetch(`${BASE_URL}/convert?q=${pair}&compact=ultra&apiKey=${API_KEY}`);
    const data = await response.json();

    if (data[pair]) {
      // Armazena a taxa em cache
      exchangeRates[pair] = data[pair];
      lastUpdated = Date.now();

      // Atualiza o horário da última atualização
      updateLastUpdateTime();

      return data[pair];
    } else {
      throw new Error('Taxa de câmbio não encontrada');
    }
  } catch (error) {
    console.error('Erro ao obter taxa de câmbio:', error);

    // Fallback: se a API falhar, tenta obter a taxa de outra forma
    // Para este exemplo, vamos usar a conversão via USD como intermediário
    if (from !== 'USD' && to !== 'USD') {
      const fromToUSD = await getExchangeRate(from, 'USD');
      const USDToTo = await getExchangeRate('USD', to);
      return fromToUSD * USDToTo;
    }

    // Se tudo falhar, lança o erro novamente
    throw error;
  }
}

// Função para atualizar o resultado na interface
function updateResult(amount, from, to, rate, convertedAmount) {
  // Formata os valores para exibição
  const formattedRate = rate.toFixed(4);
  const formattedAmount = formatCurrency(convertedAmount, to);

  // Atualiza os elementos na interface
  exchangeRateElement.textContent = `1 ${from} = ${formattedRate} ${to}`;
  resultElement.textContent = formattedAmount;
  conversionDetailsElement.textContent = `${amount} ${from} = ${formattedAmount}`;
}

// Função para inverter as moedas
function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  // Converte automaticamente após a troca
  convertCurrency();
}

// Função para atualizar a tabela de câmbio
async function updateExchangeTable() {
  try {
    // Limpa a tabela
    ratesTableBody.innerHTML = '';

    // Para cada moeda base
    for (const baseCurrency of mainCurrencies) {
      const row = document.createElement('tr');

      // Adiciona a célula com o código da moeda
      const codeCell = document.createElement('td');
      codeCell.className = 'currency-code';
      codeCell.innerHTML = `<span class="flag-icon ${baseCurrency.toLowerCase()}"></span> ${baseCurrency}`;
      row.appendChild(codeCell);

      // Para cada moeda alvo
      for (const targetCurrency of mainCurrencies) {
        const cell = document.createElement('td');

        if (baseCurrency === targetCurrency) {
          // Se for a mesma moeda, o valor é 1
          cell.textContent = '1.0000';
        } else {
          // Adiciona um loader enquanto obtém a taxa
          cell.innerHTML = '<div class="loader"></div>';

          // Obtém e exibe a taxa
          getExchangeRate(baseCurrency, targetCurrency)
            .then(rate => {
              cell.textContent = rate.toFixed(4);
            })
            .catch(() => {
              cell.textContent = 'N/A';
            });
        }

        row.appendChild(cell);
      }

      ratesTableBody.appendChild(row);
    }

    // Atualiza o horário da última atualização
    updateLastUpdateTime();
  } catch (error) {
    console.error('Erro ao atualizar tabela:', error);
  }
}

// Função para atualizar o horário da última atualização
function updateLastUpdateTime() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('pt-BR');
  const formattedTime = now.toLocaleTimeString('pt-BR');

  // Atualiza todos os elementos que mostram horário de atualização
  document.querySelectorAll('.update-time').forEach(element => {
    element.innerHTML = `<i class="fas fa-sync-alt"></i> Última atualização: ${formattedDate}, ${formattedTime}`;
  });
}

// Função para formatar valores monetários
function formatCurrency(value, currency) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(value);
}

// Função para inicializar moedas de acordo com a geolocalização
async function initCurrenciesByLocation() {
  try {
    // Tenta obter a localização do usuário via API de geolocalização
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    // Define as moedas com base na localização
    if (data && data.currency) {
      // Se o usuário estiver no Brasil, configura BRL como moeda de origem
      if (data.country_code === 'BR') {
        fromCurrency.value = 'BRL';
        toCurrency.value = 'USD';
      } else {
        // Senão, configura a moeda local como origem e USD como destino
        fromCurrency.value = data.currency;
        toCurrency.value = 'USD';
      }
    }
  } catch (error) {
    console.log('Não foi possível obter a localização. Usando valores padrão.');
    // Fallback para valores padrão
    fromCurrency.value = 'BRL';
    toCurrency.value = 'USD';
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa as abas
  initTabs();

  // Inicializa as moedas com base na localização
  initCurrenciesByLocation().then(() => {
    // Faz a conversão inicial
    convertCurrency();
  });

  // Adiciona os event listeners para os elementos interativos
  convertBtn.addEventListener('click', convertCurrency);
  swapBtn.addEventListener('click', swapCurrencies);

  // Também converte quando mudar as moedas ou o valor
  amountInput.addEventListener('input', convertCurrency);
  fromCurrency.addEventListener('change', convertCurrency);
  toCurrency.addEventListener('change', convertCurrency);
});

// Atualiza as taxas a cada 5 minutos
setInterval(() => {
  // Limpa o cache para forçar uma nova requisição
  exchangeRates = {};
  lastUpdated = null;

  // Atualiza os dados
  convertCurrency();

  // Atualiza a tabela se estiver visível
  if (document.getElementById('tabela').classList.contains('active')) {
    updateExchangeTable();
  }
}, UPDATE_INTERVAL);
