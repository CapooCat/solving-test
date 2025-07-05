export const calculateExchangeAmount = (amount: number = 0, currencyPrice: number = 0, exchangePrice: number = 0) => {
  try {
    if (amount <= 0 || currencyPrice <= 0 || exchangePrice <= 0) throw new Error();
    return (amount * currencyPrice) / exchangePrice;
  } catch {
    return 0;
  }
};
