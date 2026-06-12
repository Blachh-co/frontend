import "server-only";

import {
  getFallbackConversionRates,
  type CurrencyRates,
  type SupportedCurrencyCode,
  supportedCurrencyOptions,
} from "@/lib/currency";

interface ExchangeRatesResponse {
  base?: string;
  rates?: Partial<Record<string, number>>;
}

const defaultExchangeRateApiUrl = "https://api.frankfurter.app/latest";

export async function getExchangeRates(
  baseCurrencyCode: SupportedCurrencyCode,
): Promise<CurrencyRates> {
  const targetCurrencyCodes = supportedCurrencyOptions
    .map((option) => option.currencyCode)
    .filter((currencyCode) => currencyCode !== baseCurrencyCode);

  if (targetCurrencyCodes.length === 0) {
    return { [baseCurrencyCode]: 1 };
  }

  const requestUrl = new URL(
    process.env.EXCHANGE_RATE_API_URL ?? defaultExchangeRateApiUrl,
  );
  requestUrl.searchParams.set("from", baseCurrencyCode);
  requestUrl.searchParams.set("to", targetCurrencyCodes.join(","));

  try {
    const response = await fetch(requestUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Exchange rate request failed with status ${response.status}.`,
      );
    }

    const payload = (await response.json()) as ExchangeRatesResponse;

    if (!payload.rates) {
      throw new Error("Exchange rate response did not include rates.");
    }

    return {
      [baseCurrencyCode]: 1,
      ...targetCurrencyCodes.reduce<CurrencyRates>((accumulator, currencyCode) => {
        const rate = payload.rates?.[currencyCode];

        if (typeof rate === "number" && Number.isFinite(rate)) {
          accumulator[currencyCode] = rate;
        }

        return accumulator;
      }, {}),
    };
  } catch {
    return {
      [baseCurrencyCode]: 1,
      ...getFallbackConversionRates(baseCurrencyCode),
    };
  }
}
