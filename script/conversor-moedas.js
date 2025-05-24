/**
 * Conversor de Moedas - Invest Savy
 * Utiliza a API Exchange Rate para conversão de moedas em tempo real
 */

// Configurações da API
const API_KEY = '07ca32210dd3ff348cb14e27';
const API_URL = 'https://v6.exchangerate-api.com/v6/';

// Elementos do DOM
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
const resultElement = document.getElementById('result');
const exchangeRateElement = document.getElementById('exchange-rate');
const rateInfoElement = document.getElementById('rate-info');
const lastUpdateTimeElement = document.getElementById('last-update-time');
const exchangeTableBody = document.getElementById('exchange-table-body');

// Elementos das abas
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Moedas disponíveis para a tabela
const currencies = ['USD', 'EUR', 'BRL', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF'];
const currencyNames = {
  'USD': 'US Dólar Americano',
  'EUR': 'Euro',
  'BRL': 'BR Real Brasileiro',
  'GBP': 'GB Libra Esterlina',
  'JPY': 'JP Iene Japonês',
  'CAD': 'CA Dólar Canadense',
  'AUD': 'AU Dólar Australiano',
  'CHF': 'CH Franco Suíço'
};

// Armazenar as taxas para uso posterior
let ratesCache = {};
// Flag para controlar se a tabela já foi preenchida
let tableInitialized = false;

/**
 * Inicializa o aplicativo quando o DOM estiver carregado
 */
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar com moedas populares
  initializePopularCurrencies();

  // Inicializar conversor com valores padrão
  convertCurrency();

  // Adicionar event listeners
  convertBtn.addEventListener('click', convertCurrency);
  swapBtn.addEventListener('click', swapCurrencies);
  amountInput.addEventListener('input', convertCurrency);
  fromCurrency.addEventListener('change', convertCurrency);
  toCurrency.addEventListener('change', convertCurrency);

  // Inicializar abas
  initializeTabs();

  // Agendar atualização periódica das taxas
  scheduleRatesRefresh();
});

/**
 * Inicializa as abas do conversor
 */
function initializeTabs() {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover classe ativa de todos os botões e conteúdos
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Adicionar classe ativa ao botão clicado
      button.classList.add('active');

      // Mostrar o conteúdo correspondente
      const tabId = button.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');

      // Se for a aba da tabela e ela ainda não foi inicializada, inicializar
      if (tabId === 'tabela' && !tableInitialized) {
        generateExchangeTable();
        tableInitialized = true;
      }
    });
  });
}

/**
 * Inicializa os selects com moedas populares e configura as bandeiras
 */
function initializePopularCurrencies() {
  // Definir valores default (BRL -> USD)
  fromCurrency.value = 'BRL';
  toCurrency.value = 'USD';

  // Adicionar classes de bandeiras nos selects
  updateCurrencyFlags();

  // Adicionar event listeners para atualizar bandeiras
  fromCurrency.addEventListener('change', updateCurrencyFlags);
  toCurrency.addEventListener('change', updateCurrencyFlags);
}

/**
 * Atualiza as classes de bandeiras nos selects
 */
function updateCurrencyFlags() {
  const fromFlag = fromCurrency.parentElement.querySelector('.currency-flag');
  const toFlag = toCurrency.parentElement.querySelector('.currency-flag');

  if (fromFlag) {
    fromFlag.className = 'currency-flag';
    fromFlag.classList.add(`flag-${fromCurrency.value}`);
  }

  if (toFlag) {
    toFlag.className = 'currency-flag';
    toFlag.classList.add(`flag-${toCurrency.value}`);
  }
}

/**
 * Realiza a conversão de moeda usando a API
 */
async function convertCurrency() {
  const amount = parseFloat(amountInput.value) || 1;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  try {
    // Exibir um estado de carregamento
    resultElement.textContent = 'Calculando...';

    // Verificar se já temos as taxas em cache para a moeda de origem
    if (!ratesCache[from] || isRateCacheExpired(from)) {
      // Buscar taxas da API
      const response = await fetch(`${API_URL}${API_KEY}/latest/${from}`);
      const data = await response.json();

      if (data.result === 'success') {
        // Armazenar as taxas em cache com timestamp
        ratesCache[from] = {
          rates: data.conversion_rates,
          timestamp: new Date().getTime()
        };

        // Atualizar o horário da última atualização
        updateLastUpdateTime();
      } else {
        throw new Error('Erro ao obter taxas de conversão');
      }
    }

    // Calcular a conversão usando o cache
    const rate = ratesCache[from].rates[to];
    const result = amount * rate;

    // Atualizar a interface com o resultado
    updateConversionResult(amount, from, to, rate, result);
  } catch (error) {
    console.error('Erro na conversão:', error);
    resultElement.textContent = 'Erro na conversão. Tente novamente.';
  }
}

/**
 * Verifica se o cache de taxas está expirado (5 minutos)
 */
function isRateCacheExpired(currency) {
  if (!ratesCache[currency]) return true;

  const now = new Date().getTime();
  const cacheTime = ratesCache[currency].timestamp;
  const fiveMinutes = 5 * 60 * 1000;

  return (now - cacheTime) > fiveMinutes;
}

/**
 * Atualiza o resultado da conversão na interface
 */
function updateConversionResult(amount, from, to, rate, result) {
  // Formatar o resultado usando a função de formatação de moeda
  resultElement.textContent = formatCurrency(result, to);

  // Formatar o valor de origem
  const formattedAmount = formatCurrency(amount, from);

  // Atualizar a informação de taxa
  exchangeRateElement.innerHTML = `${formattedAmount} <i class="fas fa-long-arrow-alt-down"></i>`;
  rateInfoElement.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
}

/**
 * Troca as moedas de origem e destino
 */
function swapCurrencies() {
  const fromValue = fromCurrency.value;
  const toValue = toCurrency.value;

  // Atualizar os selects
  fromCurrency.value = toValue;
  toCurrency.value = fromValue;

  // Atualizar as bandeiras
  updateCurrencyFlags();

  // Realizar a conversão com os novos valores
  convertCurrency();
}

/**
 * Gera a tabela de câmbio entre todas as moedas
 */
async function generateExchangeTable() {
  try {
    // Limpar a tabela existente
    exchangeTableBody.innerHTML = '<tr><td colspan="9">Carregando taxas de câmbio...</td></tr>';

    // Array para armazenar as promessas de busca das taxas
    const promises = [];

    // Buscar taxas para cada moeda base
    for (const baseCurrency of currencies) {
      // Verificar se já temos as taxas em cache para a moeda base
      if (!ratesCache[baseCurrency] || isRateCacheExpired(baseCurrency)) {
        // Criar e armazenar a promessa
        const promise = fetch(`${API_URL}${API_KEY}/latest/${baseCurrency}`)
          .then(response => response.json())
          .then(data => {
            if (data.result === 'success') {
              // Armazenar as taxas em cache com timestamp
              ratesCache[baseCurrency] = {
                rates: data.conversion_rates,
                timestamp: new Date().getTime()
              };
            } else {
              throw new Error(`Erro ao obter taxas para ${baseCurrency}`);
            }
          });

        promises.push(promise);
      }
    }

    // Aguardar todas as solicitações de API
    await Promise.all(promises);

    // Limpar a tabela após carregar os dados
    exchangeTableBody.innerHTML = '';

    // Criar as linhas da tabela
    for (const baseCurrency of currencies) {
      // Criar linha da tabela
      const row = document.createElement('tr');

      // Adicionar célula de moeda base
      const currencyCell = document.createElement('td');
      currencyCell.innerHTML = `<span class="flag-icon flag-${baseCurrency.toLowerCase()}"></span> ${currencyNames[baseCurrency] || baseCurrency}`;
      row.appendChild(currencyCell);

      // Adicionar células para cada moeda de destino
      for (const targetCurrency of currencies) {
        const cell = document.createElement('td');
        if (baseCurrency === targetCurrency) {
          cell.textContent = '1.0000';
          cell.classList.add('same-currency');
        } else {
          const rate = ratesCache[baseCurrency].rates[targetCurrency];
          cell.textContent = rate.toFixed(4);
        }
        row.appendChild(cell);
      }

      // Adicionar a linha à tabela
      exchangeTableBody.appendChild(row);
    }

    // Atualizar o horário da última atualização
    updateLastUpdateTime();
  } catch (error) {
    console.error('Erro ao gerar tabela de câmbio:', error);
    exchangeTableBody.innerHTML = '<tr><td colspan="9">Erro ao carregar taxas de câmbio. Tente novamente mais tarde.</td></tr>';
  }
}

/**
 * Atualiza o horário da última atualização
 */
function updateLastUpdateTime() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('pt-BR');
  const formattedTime = now.toLocaleTimeString('pt-BR');
  lastUpdateTimeElement.textContent = `Última atualização: ${formattedDate}, ${formattedTime}`;
}

/**
 * Formata valores monetários
 */
function formatCurrency(value, currency) {
  const options = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  return new Intl.NumberFormat('pt-BR', options).format(value);
}

/**
 * Agenda atualização periódica das taxas
 */
function scheduleRatesRefresh() {
  setInterval(() => {
    // Limpar cache de taxas para forçar atualização
    ratesCache = {};

    // Atualizar conversão atual
    convertCurrency();

    // Atualizar tabela se estiver visível
    if (tableInitialized) {
      generateExchangeTable();
    }

    console.log('Taxas atualizadas: ' + new Date().toLocaleTimeString());
  }, 5 * 60 * 1000); // 5 minutos
}

// Exportar funções para uso global
window.convertCurrency = convertCurrency;
window.swapCurrencies = swapCurrencies;