import type { TModelPrice } from "../types/TModelPrice";

export const getWalletCurrency = (yourWallet?: TModelPrice[], currency?: string) => {
  return yourWallet?.find((item: TModelPrice) => item.currency === currency) as TModelPrice;
};
