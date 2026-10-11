const API_BASE = "https://open.er-api.com/v6/latest";

export async function fetchRates(base = "USD") {
  const response = await fetch(`${API_BASE}/${base}`);

  if (!response.ok) {
    throw new Error(`Exchange rate request failed: ${response.status}`);
  }

  const data = await response.json();

  if (data.result !== "success" || !data.rates) {
    throw new Error(
      data["error-type"] || "Exchange rate API returned an invalid response."
    );
  }

  return {
    ...data.rates,
    [base]: data.rates[base] ?? 1,
  };
}