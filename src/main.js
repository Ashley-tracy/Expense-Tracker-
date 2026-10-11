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