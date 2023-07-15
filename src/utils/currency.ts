const defaultOptions = {
  significantDigits: 2,
  thousandsSeparator: ".",
  decimalSeparator: ",",
  symbol: "R$",
  showNegativeSignal: false,
};

type CurrencyFormatter = (
  value: number | string,
  options?: typeof defaultOptions
) => string;

export const currencyFormatter: CurrencyFormatter = (value, options) => {
  if (typeof value !== "number") value = 0.0;
  options = { ...defaultOptions, ...options };
  value = value.toFixed(options.significantDigits);

  if (!options.showNegativeSignal) {
    value = value.replace("-", "");
  }

  const [currency, decimal] = value.split(".");
  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}${options.decimalSeparator}${decimal}`;
};
