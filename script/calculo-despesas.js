document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const incomeInput = document.getElementById('income');
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const categorySelect = document.getElementById('category');
  const addExpenseBtn = document.getElementById('add-expense');
  const saveDataBtn = document.getElementById('save-data');
  const expensesList = document.getElementById('expenses-list');
  const expensesListEmpty = document.getElementById('expenses-list-empty');

  // Summary elements
  const incomeValue = document.getElementById('income-value');
  const expensesValue = document.getElementById('expenses-value');
  const balanceValue = document.getElementById('balance-value');
  const balanceHint = document.querySelector('.card-hint');

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Data storage
  let income = 0;
  let expenses = [];

  // Load data from localStorage
  function loadData() {
    const savedIncome = localStorage.getItem('income');
    const savedExpenses = localStorage.getItem('expenses');

    if (savedIncome) {
      income = parseFloat(savedIncome);
      incomeInput.value = income;
      updateSummary();
    }

    if (savedExpenses) {
      expenses = JSON.parse(savedExpenses);
      renderExpensesList();
    }
  }

  // Save data to localStorage
  function saveData() {
    localStorage.setItem('income', income.toString());
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Show notification
    showNotification('Dados salvos com sucesso!');
  }

  // Show notification
  function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4caf50';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    notification.style.zIndex = '1000';
    notification.textContent = message;

    // Add to body
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }

  // Update financial summary
  function updateSummary() {
    // Format income
    incomeValue.textContent = `R$ ${income.toFixed(2)}`;

    // Calculate total expenses
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    expensesValue.textContent = `R$ ${totalExpenses.toFixed(2)}`;

    // Calculate balance
    const balance = income - totalExpenses;
    balanceValue.textContent = `R$ ${balance.toFixed(2)}`;

    // Update balance hint
    if (income > 0) {
      const percentage = ((balance / income) * 100).toFixed(1);
      balanceHint.textContent = `${percentage}% da sua renda está disponível`;
    } else {
      balanceHint.textContent = 'Adicione sua renda para ver a porcentagem disponível';
    }
  }

  // Render expenses list
  function renderExpensesList() {
    // Clear current list
    expensesList.innerHTML = '';

    // Show/hide empty state
    if (expenses.length === 0) {
      expensesListEmpty.style.display = 'block';
      expensesList.style.display = 'none';
    } else {
      expensesListEmpty.style.display = 'none';
      expensesList.style.display = 'block';

      // Add expenses to list
      expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.className = 'expense-item';
        li.innerHTML = `
          <div class="expense-details">
            <span class="expense-description">${expense.description}</span>
            <span class="expense-category">${expense.category}</span>
          </div>
          <span class="expense-amount">R$ ${expense.amount.toFixed(2)}</span>
          <div class="expense-actions">
            <button class="btn-action btn-edit" data-index="${index}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn-action btn-delete" data-index="${index}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;

        expensesList.appendChild(li);
      });

      // Add event listeners to edit and delete buttons
      document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', editExpense);
      });

      document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', deleteExpense);
      });
    }

    // Update summary
    updateSummary();
  }

  // Add new expense
  function addExpense() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    // Validate inputs
    if (!description) {
      alert('Por favor, insira uma descrição para a despesa.');
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      alert('Por favor, insira um valor válido para a despesa.');
      return;
    }

    // Add expense to array
    expenses.push({
      description,
      amount,
      category,
      date: new Date().toISOString()
    });

    // Clear form
    descriptionInput.value = '';
    amountInput.value = '';

    // Update UI
    renderExpensesList();
    showNotification(`Despesa "${description}" adicionada com sucesso!`);
  }

  // Edit expense
  function editExpense() {
    const index = parseInt(this.dataset.index);
    const expense = expenses[index];

    // Fill form with expense data
    descriptionInput.value = expense.description;
    amountInput.value = expense.amount;
    categorySelect.value = expense.category;

    // Remove expense (will be re-added on submit)
    expenses.splice(index, 1);

    // Update UI
    renderExpensesList();
    showNotification(`Editando despesa "${expense.description}"`);

    // Focus on description input
    descriptionInput.focus();
  }

  // Delete expense
  function deleteExpense() {
    const index = parseInt(this.dataset.index);
    const expense = expenses[index];

    if (confirm(`Tem certeza que deseja excluir a despesa "${expense.description}"?`)) {
      expenses.splice(index, 1);
      renderExpensesList();
      showNotification(`Despesa "${expense.description}" removida com sucesso!`);
    }
  }

  // Update income value
  function updateIncome() {
    const newIncome = parseFloat(incomeInput.value);

    if (!isNaN(newIncome) && newIncome >= 0) {
      income = newIncome;
      updateSummary();
    }
  }

  // Event listeners
  addExpenseBtn.addEventListener('click', addExpense);
  saveDataBtn.addEventListener('click', saveData);
  incomeInput.addEventListener('change', updateIncome);

  // Load data on page load
  loadData();
});