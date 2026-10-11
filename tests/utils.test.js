import {
  convertCurrency,
  calculateTotal,
  filterExpenses,
  formatCurrency,
} from "../src/utils.js";

describe("convertCurrency", () => {
  const rates = { USD: 1, EUR: 0.9, GBP: 0.8, KES: 130 };

  test("returns the same amount when currencies match", () => {
    expect(convertCurrency(10, "USD", "USD", rates)).toBe(10);
  });

  test("converts EUR to USD correctly", () => {
    expect(convertCurrency(10, "EUR", "USD", rates)).toBeCloseTo(11.11, 2);
  });

  test("converts USD to EUR correctly", () => {
    expect(convertCurrency(10, "USD", "EUR", rates)).toBeCloseTo(9, 2);
  });

  test("converts KES to USD correctly", () => {
    expect(convertCurrency(130, "KES", "USD", rates)).toBeCloseTo(1, 2);
  });

  test("returns null when a rate is missing", () => {
    expect(convertCurrency(10, "USD", "JPY", rates)).toBeNull();
  });

  test("returns 0 for an invalid amount", () => {
    expect(convertCurrency("not-a-number", "USD", "EUR", rates)).toBe(0);
  });
});

describe("calculateTotal", () => {
  const rates = { USD: 1, EUR: 0.9, KES: 130 };

  const expenses = [
    { amount: 10, currency: "USD", category: "Food" },
    { amount: 9, currency: "EUR", category: "Food" },
    { amount: 130, currency: "KES", category: "Transport" },
  ];

  test("returns 0 for an empty list", () => {
    expect(calculateTotal([], "USD", rates)).toBe(0);
  });

  test("sums converted expenses into USD", () => {
    expect(calculateTotal(expenses, "USD", rates)).toBeCloseTo(30, 2);
  });

  test("skips expenses with missing rates", () => {
    const partial = [
      { amount: 10, currency: "USD", category: "Food" },
      { amount: 10, currency: "JPY", category: "Food" },
    ];
    expect(calculateTotal(partial, "USD", rates)).toBeCloseTo(10, 2);
  });
});

describe("filterExpenses", () => {
  const expenses = [
    { category: "Food" },
    { category: "Transport" },
    { category: "Food" },
  ];

  test("returns all when category is All", () => {
    expect(filterExpenses(expenses, "All")).toHaveLength(3);
  });

  test("filters by category", () => {
    expect(filterExpenses(expenses, "Food")).toHaveLength(2);
  });

  test("returns an empty array when nothing matches", () => {
    expect(filterExpenses(expenses, "Shopping")).toEqual([]);
  });

  test("returns an empty array for invalid input", () => {
    expect(filterExpenses(null, "Food")).toEqual([]);
  });
});

describe("formatCurrency", () => {
  test("returns an em dash for null", () => {
    expect(formatCurrency(null, "USD")).toBe("—");
  });

  test("returns an em dash for NaN", () => {
    expect(formatCurrency(NaN, "USD")).toBe("—");
  });

  test("formats a number as currency", () => {
    expect(formatCurrency(10, "USD")).toMatch(/\$10/);
  });
});