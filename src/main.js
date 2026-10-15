import { fetchRates } from "./api.js";
import {
  addExpense,
  deleteExpense,
  getState,
  getTotal,
  getVisibleExpenses,
  setError,
  setFilterCategory,
  setHomeCurrency,
  setLoading,
  setRates,
  subscribe,
  updateExpenseCategory,
} from "./state.js";
import { initUI, render } from "./ui.js";

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setupDateInputRestriction() {
  const dateInput = document.getElementById("expense-date");
  if (dateInput) {
    const today = getTodayString();
    dateInput.max = today;
    if (!dateInput.value) {
      dateInput.value = today;
    }
  }
}


function validateExpenseDate(dateString) {
  const today = getTodayString();
  if (!dateString || dateString > today) {
    return today;
  }
  return dateString;
}

async function loadRates(homeCurrency) {
  setLoading(true);
  setError(null);

  try {
    const rates = await fetchRates(homeCurrency);
    setRates(rates);
  } catch (error) {
    setError(error.message || "Failed to load exchange rates.");
    setRates({});
  } finally {
    setLoading(false);
  }
}

function renderApp() {
  const state = getState();
  render(state, getVisibleExpenses(), getTotal());
}

initUI({
  onAddExpense(expense) {
    addExpense(expense);
  },

  onDeleteExpense(id) {
    deleteExpense(id);
  },

  onUpdateCategory(id, category) {
    updateExpenseCategory(id, category);
  },

  onHomeCurrencyChange(currency) {
    setRates({});
    setHomeCurrency(currency);
    loadRates(currency);
  },

  onFilterChange(category) {
    setFilterCategory(category);
  },
});

subscribe(renderApp);
renderApp();
loadRates(getState().homeCurrency);