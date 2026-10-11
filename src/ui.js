import { convertCurrency, formatCurrency } from "./utils.js";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Other"];

const els = {
  form: document.querySelector("#expense-form"),
  description: document.querySelector("#description"),
  amount: document.querySelector("#amount"),
  currency: document.querySelector("#currency"),
  category: document.querySelector("#category"),
  homeCurrency: document.querySelector("#home-currency"),
  filterCategory: document.querySelector("#filter-category"),
  expenseList: document.querySelector("#expense-list"),
  total: document.querySelector("#total"),
  emptyMessage: document.querySelector("#empty-message"),
  status: document.querySelector("#status"),
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return map[char];
  });
}

export function initUI({
  onAddExpense,
  onDeleteExpense,
  onUpdateCategory,
  onHomeCurrencyChange,
  onFilterChange,
}) {
  els.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(els.form);

    onAddExpense({
      description: formData.get("description").trim(),
      amount: Number(formData.get("amount")),
      currency: formData.get("currency"),
      category: formData.get("category"),
    });

    els.form.reset();
    els.description.focus();
  });

  els.expenseList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-delete-id]");
    if (button) onDeleteExpense(button.dataset.deleteId);
  });

  els.expenseList.addEventListener("change", (event) => {
    const select = event.target.closest("select[data-category-id]");
    if (select) onUpdateCategory(select.dataset.categoryId, select.value);
  });

  els.homeCurrency.addEventListener("change", (event) => {
    onHomeCurrencyChange(event.target.value);
  });

  els.filterCategory.addEventListener("change", (event) => {
    onFilterChange(event.target.value);
  });
}

export function render(state, visibleExpenses, total) {
  if (state.loading) {
    els.status.textContent = "Loading exchange rates...";
  } else if (state.error) {
    els.status.textContent = `Error: ${state.error}`;
  } else {
    els.status.textContent = "";
  }

  els.homeCurrency.value = state.homeCurrency;
  els.filterCategory.value = state.filterCategory;

  els.expenseList.innerHTML = visibleExpenses
    .map((expense) => {
      const converted = convertCurrency(
        expense.amount,
        expense.currency,
        state.homeCurrency,
        state.rates
      );

      const convertedText =
        converted === null
          ? "Rate missing"
          : formatCurrency(converted, state.homeCurrency);

      return `
        <li class="expense-item">
          <div class="expense-main">
            <strong>${escapeHtml(expense.description)}</strong>
            <span class="expense-meta">
              ${formatCurrency(expense.amount, expense.currency)}
              · ${escapeHtml(expense.category)}
            </span>
          </div>

          <div class="expense-actions">
            <select data-category-id="${expense.id}" aria-label="Category for ${escapeHtml(expense.description)}">
              ${CATEGORIES.map(
                (category) => `
                  <option value="${category}" ${
                    expense.category === category ? "selected" : ""
                  }>
                    ${category}
                  </option>
                `
              ).join("")}
            </select>

            <span>${convertedText}</span>

            <button data-delete-id="${expense.id}" aria-label="Delete ${escapeHtml(expense.description)}">
              Delete
            </button>
          </div>
        </li>
      `;
    })
    .join("");

  els.emptyMessage.style.display =
    visibleExpenses.length === 0 ? "block" : "none";

  els.total.textContent = formatCurrency(total, state.homeCurrency);
}