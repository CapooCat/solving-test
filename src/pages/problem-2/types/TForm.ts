import type { TModelPrice } from "./TModelPrice";

export type TForm = {
  yourWallet?: TModelPrice[];
  currency?: TModelPrice;
  currencyExchange?: TModelPrice;
  amount?: number;
};
