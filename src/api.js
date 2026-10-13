 //The API  Base
const API_BASE = "https://open.er-api.com/v6/latest";

// async function declared with default parameter value of "USD" for the base currency.
export async function fetchRates(base = "USD") {
  const response = await fetch(`${API_BASE}/${base}`);

  // fetch the API data and check if the response is ok. If not, throw an error with the status code.
  if (!response.ok) {
    throw new Error(`Exchange rate request failed: ${response.status}`);
  }

  //await the response and parse it as JSON. Check if the result is "success" and if rates are present. If not, throw an error with the error type or a default message.
  const data = await response.json();

  if (data.result !== "success" || !data.rates) {
    throw new Error(
      data["error-type"] || "Exchange rate API returned an invalid response."
    );
  }
//retun the rates object with the base currency included, defaulting to 1 if not present in the rates.
  return {
    ...data.rates,
    [base]: data.rates[base] ?? 1,
  };
}