import type { TModelPrice } from "../types/TModelPrice";
import { calculateExchangeAmount } from "./calculateExchangeAmount";

export const exchangeFromWallet = (
  yourWallet?: TModelPrice[],
  yourCurrency?: TModelPrice,
  currencyToExchange?: TModelPrice,
  amount?: number
) => {
  let isRemoved = false;
  let isAdded = false;
  const amountToRemove = amount || 0;
  const amountToAdd = calculateExchangeAmount(amount, yourCurrency?.price, currencyToExchange?.price);

  let result = yourWallet?.map((item) => {
    if (isRemoved && isAdded) return item;

    //remove currency from your wallet
    if (item.currency === yourCurrency?.currency) {
      const yourAmount = item.price || 0;
      item = { ...item, price: yourAmount - amountToRemove };
      isRemoved = true;
    }

    //add currency to your wallet
    if (item.currency === currencyToExchange?.currency) {
      const yourAmount = item.price || 0;
      item = { ...item, price: yourAmount + amountToAdd };
      isAdded = true;
    }

    return item;
  });

  // if the currency is not yet in the wallet, add it
  if (isAdded === false) {
    result?.push({
      price: amountToAdd,
      currency: currencyToExchange?.currency,
    });
  }

  // Remove empty currency from the wallet
  result = result?.filter((item) => item.price && item.price > 0);
  return result;
};
