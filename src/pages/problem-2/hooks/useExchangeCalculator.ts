import { Form } from "antd";
import type { TForm } from "../types/TForm";
import { calculateExchangeAmount } from "../utils/calculateExchangeAmount";

const useExchangeCalculator = () => {
  const form = Form.useFormInstance<TForm>();

  return {
    calculateAmount: (amountExchange?: number | null) => {
      const currency = form.getFieldValue("currency");
      const currencyExchange = form.getFieldValue("currencyExchange");

      const calculatedExchange = calculateExchangeAmount(
        amountExchange || form.getFieldValue("amountExchange"),
        currencyExchange?.price as number,
        currency?.price as number
      );

      form.setFieldValue("amount", calculatedExchange);
      form.validateFields(["amount"]);
    },

    calculateAmountExchange: (amount?: number | null) => {
      const currency = form.getFieldValue("currency");
      const currencyExchange = form.getFieldValue("currencyExchange");

      const calculatedExchange = calculateExchangeAmount(
        amount || form.getFieldValue("amount"),
        currency?.price as number,
        currencyExchange?.price as number
      );

      form.setFieldValue("amountExchange", calculatedExchange);
    },
  };
};

export default useExchangeCalculator;
