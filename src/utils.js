export function convertCurrency(amount, from, to, rates) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) return 0;
  if (from === to) return numericAmount;

  if (
    !rates ||
    typeof rates[from] !== "number" ||
    typeof rates[to] !== "number"
  ) {
    return null;
  }

  return numericAmount * (rates[to] / rates[from]);
}

export function calculateTotal(expenses, homeCurrency, rates) {
  if (!Array.isArray(expenses) || expenses.length === 0) return 0;

  return expenses.reduce((total, expense) => {
    const converted = convertCurrency(
      expense.amount,
      expense.currency,
      homeCurrency,
      rates
    );

    if (converted === null) return total;

    return total + converted;
  }, 0);
}

export function filterExpenses(expenses, category) {
  if (!Array.isArray(expenses)) return [];
  if (!category || category === "All") return expenses;

  return expenses.filter((expense) => expense.category === category);
}

export function formatCurrency(amount, currency) {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return "—";
  }

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(amount);
}