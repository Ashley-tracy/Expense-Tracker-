# Expense Tracker

A single-page expense tracker for people who travel, freelance internationally, or shop from foreign stores. Every purchase can be logged in the currency it was paid in, and the app instantly converts everything into one chosen home currency using live exchange rates. This solves the real-world problem of losing track of spending when every transaction is in a different currency.

## Live Demo

https://your-username.github.io/Expense-Tracker-/

## Features

- Add expenses with description, amount, currency, and category
- Live conversion using the open.er-api.com REST API
- Running total in your chosen home currency, updated automatically
- Delete individual expenses
- Filter expenses by category
- Change the home currency at any time
- Loading and error states so the UI never silently breaks

## Tech Used

- **HTML, CSS, vanilla JavaScript**
- **ES Modules** — code split across `api.js`, `state.js`, `utils.js`, `ui.js`, `main.js`
- **REST API** — [https://open.er-api.com/v6/latest/USD](https://open.er-api.com/v6/latest/USD) (free, no API key required)
- **Jest** -for unit tests
- **ESLint** -for static analysis


### How to run Locally including test and lint

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/Expense-Tracker-.git
cd Expense-Tracker-
npm install
```

## What I'd improve with more time

* ** Add lightweight charts using libraries like Chart.js to display visual breakdowns of spending by category and currency over time.
* ** Integrate localStorage or IndexedDB so users don't lose their logged expenses upon refreshing the browser.
** Allow users to define custom spending categories with personalized tags and color coding.
** Cache the latest fetched conversion rates so users traveling in low-connectivity areas can continue logging expenses offline.
** Allow users to pick the actual date of purchase and convert amounts based on the historical exchange rate on that specific day rather than today's rate.






