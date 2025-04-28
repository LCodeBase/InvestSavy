const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const result = document.getElementById("result");
const exchangeRate = document.getElementById("exchange-rate");
const swapBtn = document.getElementById("swap-btn");
const ratesList = document.getElementById("rates-list");
const cryptoList = document.getElementById("crypto-list");
const lastUpdateTime = document.getElementById("last-update-time");

// API Keys
const EXCHANGE_API_KEY = "07ca32210dd3ff348cb14e27";
const CRYPTO_API_KEY = "coinranking8f2f5f5e8e0a4c9c9e9c9e9c9e9c9e9c9e9c9e9c"; // Exemplo de API key

// Mapping of currency codes to country names and descriptions
const currencyDescriptions = {
  USD: "Dólar Americano",
  EUR: "Euro",
  GBP: "Libra Esterlina",
  JPY: "Iene Japonês",
  CNY: "Yuan Chinês",
  AUD: "Dólar Australiano",
  CAD: "Dólar Canadense",
  CHF: "Franco Suíço",
  RUB: "Rublo Russo",
  BRL: "Real Brasileiro",
  INR: "Rupia Indiana",
  MXN: "Peso Mexicano",
  ZAR: "Rand Sul-Africano",
  SGD: "Dólar de Singapura",
  NZD: "Dólar Neozelandês",
};

// Top cryptocurrencies to track
const topCryptos = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "binancecoin", symbol: "BNB", name: "Binance Coin" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
  { id: "cardano", symbol: "ADA", name: "Cardano" },
  { id: "solana", symbol: "SOL", name: "Solana" },
];

// Função para formatar valores monetários
function formatCurrency(value, currency = "BRL") {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 4,
    minimumFractionDigits: 2
  }).format(value);
}

async function convertCurrency() {
  const amountValue = amount.value || 1;
  const fromValue = fromCurrency.value;
  const toValue = toCurrency.value;

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${fromValue}`
    );
    const data = await response.json();

    if (data.result === "success") {
      const rate = data.conversion_rates[toValue];
      const convertedAmount = amountValue * rate;

      // Atualiza a taxa de câmbio com 6 casas decimais para maior precisão
      exchangeRate.innerText = `1 ${fromValue} = ${rate.toFixed(6)} ${toValue}`;

      // Formata o resultado com o símbolo da moeda
      result.innerText = formatCurrency(convertedAmount, toValue);

      // Salva a conversão no histórico
      saveConversionToHistory(amountValue, fromValue, toValue, convertedAmount);

      // Atualiza o horário da última atualização
      updateLastUpdateTime();
    } else {
      result.innerText = "Erro na API de conversão";
      console.error("Erro na API:", data);
    }
  } catch (error) {
    console.error("Erro na conversão:", error);
    result.innerText = "Erro na conversão. Tente novamente.";
  }
}

function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  convertCurrency();
}

async function updateRates() {
  const baseCurrency = "BRL"; // Moeda base para comparação
  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CNY",
    "AUD",
    "CAD",
    "CHF",
    "RUB",
    "INR",
    "MXN",
    "ZAR",
    "SGD",
    "NZD"
  ];

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${baseCurrency}`
    );
    const data = await response.json();

    if (data.result === "success") {
      ratesList.innerHTML = "";
      currencies.forEach((currency) => {
        if (currency !== baseCurrency) {
          const rate = data.conversion_rates[currency];
          const listItem = document.createElement("li");

          // Calcula o valor inverso para mostrar quanto vale 1 unidade da moeda estrangeira em BRL
          const valueInBRL = 1 / rate;

          listItem.innerHTML = `
            <span>${currencyDescriptions[currency] || currency}</span>
            <br>
            <span>1 ${currency} = ${formatCurrency(valueInBRL, "BRL").replace('R$', 'BRL')}</span>
          `;
          ratesList.appendChild(listItem);
        }
      });

      // Atualiza as criptomoedas após atualizar as moedas tradicionais
      updateCryptocurrencies();
    } else {
      console.error("Erro na API:", data);
    }
  } catch (error) {
    console.error("Erro ao atualizar cotações:", error);
  }
}

// Função para buscar e exibir os valores das principais criptomoedas
async function updateCryptocurrencies() {
  if (!cryptoList) return;

  try {
    // Usando a API CoinGecko que não requer chave de API para uso básico
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=${topCryptos.map(c => c.id).join(',')}&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=pt`
    );

    const data = await response.json();

    cryptoList.innerHTML = "";

    data.forEach((crypto) => {
      const cryptoInfo = topCryptos.find(c => c.id === crypto.id);
      if (cryptoInfo) {
        const listItem = document.createElement("li");

        // Calcula a variação percentual nas últimas 24h
        const priceChangeClass = crypto.price_change_percentage_24h >= 0 ? 'positive-change' : 'negative-change';

        listItem.innerHTML = `
          <div class="crypto-item">
            <img src="${crypto.image}" alt="${crypto.name}" class="crypto-icon">
            <div class="crypto-info">
              <span class="crypto-name">${crypto.name} (${crypto.symbol.toUpperCase()})</span>
              <span class="crypto-price">${formatCurrency(crypto.current_price, 'BRL')}</span>
              <span class="crypto-change ${priceChangeClass}">
                ${crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'} ${Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          </div>
        `;

        cryptoList.appendChild(listItem);
      }
    });
  } catch (error) {
    console.error("Erro ao atualizar criptomoedas:", error);
    cryptoList.innerHTML = "<p class='error-message'>Não foi possível carregar os dados de criptomoedas. Tente novamente mais tarde.</p>";
  }
}

// Função para salvar conversões no histórico (usando localStorage)
function saveConversionToHistory(amount, fromCurrency, toCurrency, result) {
  // Obtém o histórico existente ou cria um novo array
  const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');

  // Adiciona a nova conversão no início do array
  history.unshift({
    amount,
    fromCurrency,
    toCurrency,
    result,
    timestamp: new Date().toISOString()
  });

  // Limita o histórico a 10 itens
  const limitedHistory = history.slice(0, 10);

  // Salva o histórico atualizado
  localStorage.setItem('conversionHistory', JSON.stringify(limitedHistory));
}

// Função para atualizar o horário da última atualização
function updateLastUpdateTime() {
  if (lastUpdateTime) {
    const now = new Date();
    lastUpdateTime.textContent = `Última atualização: ${now.toLocaleTimeString('pt-BR')}`;
  }
}

// Event Listeners
amount.addEventListener("input", convertCurrency);
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);
swapBtn.addEventListener("click", swapCurrencies);

// Atualiza as taxas a cada 5 minutos (300000 ms)
setInterval(updateRates, 300000);

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Conversão inicial e atualização de taxas
  convertCurrency();
  updateRates();
});

// Inicialização imediata se o DOM já estiver carregado
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  convertCurrency();
  updateRates();
}
