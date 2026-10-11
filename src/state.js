import { calculateTotal, filterExpenses } from "./utils.js";

let state = {
  expenses: [],
  homeCurrency: "USD",
  rates: {},
  filterCategory: "All",
  loading: false,
  error: null,
};

const listeners = new Set();

export function getState() {
  return state;
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener(state));
}

function setState(patch) {
  state = { ...state, ...patch };
  notify();
}

export function setLoading(loading) {
  setState({ loading });
}

export function setError(error) {
  setState({ error });
}

export function setRates(rates) {
  setState({ rates });
}

export function setHomeCurrency(homeCurrency) {
  setState({ homeCurrency });
}

export function setFilterCategory(filterCategory) {
  setState({ filterCategory });
}

export function addExpense(expense) {
  const newExpense = {
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now() + Math.random()),
    ...expense,
  };

  state = {
    ...state,
    expenses: [...state.expenses, newExpense],
  };

  notify();
}

export function deleteExpense(id) {
  state = {
    ...state,
    expenses: state.expenses.filter((expense) => expense.id !== id),
  };

  notify();
}

export function updateExpenseCategory(id, category) {
  state = {
    ...state,
    expenses: state.expenses.map((expense) =>
      expense.id === id ? { ...expense, category } : expense
    ),
  };

  notify();
}

export function getVisibleExpenses() {
  return filterExpenses(state.expenses, state.filterCategory);
}

export function getTotal() {
  return calculateTotal(state.expenses, state.homeCurrency, state.rates);
}