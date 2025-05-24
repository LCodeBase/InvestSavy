// Espera até que o DOM esteja totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa a funcionalidade das abas
  initTabs();

  // Inicializa a funcionalidade das dicas
  initTips();

  // Inicializa a funcionalidade das FAQs
  initFAQs();

  // Adiciona o manipulador de eventos para o botão de cálculo
  document.getElementById('calculate-btn').addEventListener('click', calculateLoan);

  // Pré-calcular o empréstimo com valores padrão
  calculateLoan();
});

// Função para inicializar as abas principais
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove a classe 'active' de todos os botões
      tabButtons.forEach(btn => btn.classList.remove('active'));

      // Adiciona a classe 'active' ao botão clicado
      button.classList.add('active');

      // Mostra o conteúdo correspondente e esconde os outros
      const tabId = button.getAttribute('data-tab');
      tabContents.forEach(content => {
        if (content.id === tabId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
}

// Função para inicializar as abas de dicas
function initTips() {
  const tipNavButtons = document.querySelectorAll('.tip-nav-btn');
  const tipContents = document.querySelectorAll('.tips-content');

  tipNavButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove a classe 'active' de todos os botões
      tipNavButtons.forEach(btn => btn.classList.remove('active'));

      // Adiciona a classe 'active' ao botão clicado
      button.classList.add('active');

      // Mostra o conteúdo correspondente e esconde os outros
      const tipId = button.getAttribute('data-tip');
      tipContents.forEach(content => {
        if (content.id === tipId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
}

// Função para inicializar as perguntas frequentes (FAQs)
function initFAQs() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      // Toggle (alternar) a classe 'active' no item atual
      item.classList.toggle('active');

      // Opcionalmente, fechar outros itens abertos
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
    });
  });
}

// Função para calcular o empréstimo
function calculateLoan() {
  // Captura os valores do formulário
  const loanAmount = parseFloat(document.getElementById('loan-amount').value);
  const loanTerm = parseInt(document.getElementById('loan-term').value);
  const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100; // Converte para decimal

  // Valida a entrada
  if (isNaN(loanAmount) || isNaN(loanTerm) || isNaN(interestRate) || loanAmount <= 0 || loanTerm <= 0 || interestRate <= 0) {
    alert('Por favor, insira valores válidos em todos os campos.');
    return;
  }

  // Calcula o empréstimo usando a fórmula de amortização
  // Fórmula: M = P * [r(1+r)^n] / [(1+r)^n-1]
  // M = pagamento mensal, P = principal, r = taxa de juros mensal, n = número de parcelas

  const monthlyRate = interestRate;
  const totalPayments = loanTerm;

  // Calcula o pagamento mensal
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                         (Math.pow(1 + monthlyRate, totalPayments) - 1);

  // Calcula o total a ser pago
  const totalPaid = monthlyPayment * totalPayments;

  // Calcula o total de juros
  const totalInterest = totalPaid - loanAmount;

  // Exibe os resultados
  displayResults(monthlyPayment, totalPaid, totalInterest);

  // Gera e exibe a tabela de amortização
  generateAmortizationTable(loanAmount, monthlyRate, monthlyPayment, totalPayments);

  // Exibe o resumo visualmente
  createLoanSummaryVisualization(loanAmount, totalInterest);
}

// Função para exibir os resultados
function displayResults(monthlyPayment, totalPaid, totalInterest) {
  // Obtém os valores do formulário para exibir no resumo
  const loanAmount = parseFloat(document.getElementById('loan-amount').value);
  const loanTerm = parseInt(document.getElementById('loan-term').value);
  const interestRate = parseFloat(document.getElementById('interest-rate').value);
  const loanType = document.getElementById('loan-type');
  const selectedLoanType = loanType.options[loanType.selectedIndex].text;

  // Cria ou atualiza o elemento de resultados
  let resultsContainer = document.getElementById('results-container');

  if (!resultsContainer) {
    // Se o contêiner de resultados não existir, cria-o
    resultsContainer = document.createElement('div');
    resultsContainer.id = 'results-container';
    resultsContainer.className = 'results-container';

    // Adiciona o contêiner após o botão de cálculo
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.parentNode.insertBefore(resultsContainer, calculateBtn.nextSibling);
  }

  // Formata os valores para exibição
  const formattedMonthlyPayment = formatCurrency(monthlyPayment);
  const formattedTotalPaid = formatCurrency(totalPaid);
  const formattedTotalInterest = formatCurrency(totalInterest);
  const formattedLoanAmount = formatCurrency(loanAmount);

  // Calcula a porcentagem de juros em relação ao valor do empréstimo
  const interestPercentage = (totalInterest / loanAmount * 100).toFixed(2);

  // Determina a classificação da taxa (baixa, média, alta)
  let rateCategory = 'medium';
  if (interestRate <= 1.0) {
    rateCategory = 'low';
  } else if (interestRate >= 2.0) {
    rateCategory = 'high';
  }

  // Calcula a posição da taxa na escala (0-100%)
  const ratePosition = Math.min(Math.max((interestRate - 0.5) / 2.5 * 100, 0), 100);

  // Atualiza o conteúdo do contêiner de resultados
  resultsContainer.innerHTML = `
    <h3>Resultado da Simulação</h3>

    <div class="loan-info">
      <h4><i class="fas fa-info-circle"></i> Resumo do Empréstimo</h4>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">Tipo de Empréstimo</span>
          <span class="info-value">${selectedLoanType}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Valor Solicitado</span>
          <span class="info-value">${formattedLoanAmount}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Prazo</span>
          <span class="info-value">${loanTerm} meses</span>
        </div>
        <div class="info-item">
          <span class="info-label">Taxa de Juros</span>
          <span class="info-value">${interestRate}% ao mês</span>
        </div>
      </div>

      <div class="rate-indicator rate-${rateCategory}">
        <span class="rate-label">Taxa:</span>
        <div class="rate-scale">
          <div class="rate-value" style="width: ${ratePosition}%"></div>
        </div>
        <span class="rate-text">${interestRate}%</span>
      </div>
    </div>

    <div class="result-item">
      <span class="result-label">Valor da Parcela:</span>
      <span class="result-value">${formattedMonthlyPayment}</span>
    </div>
    <div class="result-item">
      <span class="result-label">Total a Pagar:</span>
      <span class="result-value">${formattedTotalPaid}</span>
    </div>
    <div class="result-item">
      <span class="result-label">Total de Juros:</span>
      <span class="result-value">${formattedTotalInterest} <small>(${interestPercentage}% do valor)</small></span>
    </div>

    <div id="chart-container" class="chart-container">
      <!-- O gráfico será inserido aqui -->
    </div>

    <div class="table-explanation">
      <p><strong>Entendendo a tabela:</strong> A tabela abaixo mostra como o seu empréstimo será pago ao longo do tempo. A cada mês, parte do valor da parcela vai para pagar os juros e parte para diminuir o valor principal (amortização).</p>
    </div>

    <div id="amortization-container" class="amortization-container">
      <h4>Tabela de Amortização</h4>
      <div class="table-wrapper">
        <table id="amortization-table">
          <thead>
            <tr>
              <th>Mês</th>
              <th>Prestação</th>
              <th>Amortização</th>
              <th>Juros</th>
              <th>Saldo Devedor</th>
            </tr>
          </thead>
          <tbody id="amortization-body">
            <!-- A tabela de amortização será inserida aqui -->
          </tbody>
        </table>
      </div>
    </div>

    <div class="action-buttons">
      <button class="action-btn primary" onclick="compareRates()">
        <i class="fas fa-exchange-alt"></i> Comparar Taxas
      </button>
      <button class="action-btn secondary" onclick="showTips()">
        <i class="fas fa-lightbulb"></i> Ver Dicas
      </button>
    </div>

    <button class="print-btn" onclick="printResults()">
      <i class="fas fa-print"></i> Imprimir Resultados
    </button>
  `;
}

// Função para gerar a tabela de amortização
function generateAmortizationTable(principal, rate, payment, periods) {
  const tableBody = document.getElementById('amortization-body');
  tableBody.innerHTML = '';

  // Limita a exibição a 12 meses (1 ano) para não sobrecarregar a página
  const displayPeriods = Math.min(periods, 12);
  let balance = principal;

  for (let i = 1; i <= displayPeriods; i++) {
    // Calcula o juro para este período
    const interest = balance * rate;

    // Calcula a amortização (parte do pagamento que reduz o principal)
    const amortization = payment - interest;

    // Atualiza o saldo devedor
    balance -= amortization;
    if (balance < 0) balance = 0;

    // Cria a linha da tabela
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${i}</td>
      <td>${formatCurrency(payment)}</td>
      <td>${formatCurrency(amortization)}</td>
      <td>${formatCurrency(interest)}</td>
      <td>${formatCurrency(balance)}</td>
    `;

    tableBody.appendChild(row);
  }

  // Se houver mais períodos do que estamos exibindo, adiciona uma mensagem
  if (periods > displayPeriods) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td colspan="5" class="more-periods">
        <em>... mais ${periods - displayPeriods} meses não exibidos ...</em>
      </td>
    `;
    tableBody.appendChild(row);
  }
}

// Função para criar a visualização do resumo do empréstimo
function createLoanSummaryVisualization(principal, totalInterest) {
  const chartContainer = document.getElementById('chart-container');

  // Limpa o contêiner antes de adicionar o novo gráfico
  chartContainer.innerHTML = '';

  // Cria o elemento canvas para o gráfico
  const canvas = document.createElement('canvas');
  canvas.id = 'loan-chart';
  chartContainer.appendChild(canvas);

  // Cria o gráfico usando Chart.js
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Principal', 'Juros'],
      datasets: [{
        data: [principal, totalInterest],
        backgroundColor: ['#4361ee', '#ef476f'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 14
            },
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
              const percentage = Math.round((value / total) * 100);
              return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// Função para comparar taxas (navega para a aba de comparação)
function compareRates() {
  // Encontra o botão da aba de comparação e clica nele
  const comparisonTabBtn = document.querySelector('.tab-btn[data-tab="comparacao"]');
  if (comparisonTabBtn) {
    comparisonTabBtn.click();

    // Rola suavemente até a tabela de comparação
    setTimeout(() => {
      const comparisonTable = document.querySelector('.comparison-table');
      if (comparisonTable) {
        comparisonTable.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }
}

// Função para mostrar dicas (navega para a aba de dicas)
function showTips() {
  // Encontra o botão da aba de dicas e clica nele
  const tipsTabBtn = document.querySelector('.tab-btn[data-tab="dicas"]');
  if (tipsTabBtn) {
    tipsTabBtn.click();

    // Rola suavemente até o conteúdo de dicas
    setTimeout(() => {
      const tipsContent = document.querySelector('.tips-content.active');
      if (tipsContent) {
        tipsContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }
}

// Função para imprimir os resultados
function printResults() {
  // Prepara a página para impressão
  const printContents = document.getElementById('results-container').innerHTML;
  const originalContents = document.body.innerHTML;

  // Cria um estilo de impressão
  const printStyles = `
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        color: #333;
      }
      h3 {
        font-size: 18px;
        margin-bottom: 20px;
        text-align: center;
      }
      .loan-info {
        margin-bottom: 25px;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
      .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
      }
      .info-label {
        font-size: 12px;
        color: #666;
      }
      .info-value {
        font-size: 14px;
        font-weight: bold;
      }
      .result-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
      .chart-container {
        height: 250px;
        margin: 20px 0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: right;
      }
      th {
        background-color: #f5f5f5;
      }
      .print-note {
        font-size: 12px;
        color: #777;
        text-align: center;
        margin-top: 30px;
        font-style: italic;
      }
      .action-buttons, .print-btn, .rate-indicator, .table-explanation {
        display: none;
      }
    </style>
  `;

  // Substitui o conteúdo da página e imprime
  document.body.innerHTML = `
    <div class="print-container">
      ${printStyles}
      <h2 style="text-align: center; margin-bottom: 30px;">Simulação de Empréstimo - Invest Savy</h2>
      ${printContents}
      <div class="print-note">
        <p>Simulação gerada em ${new Date().toLocaleDateString('pt-BR')} por Invest Savy.</p>
        <p>Esta simulação é informativa e não constitui uma oferta de crédito.</p>
      </div>
    </div>
  `;

  window.print();

  // Restaura o conteúdo original
  document.body.innerHTML = originalContents;

  // Reinicializa os eventos após restaurar o conteúdo
  document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initTips();
    initFAQs();
    document.getElementById('calculate-btn').addEventListener('click', calculateLoan);
  });
}