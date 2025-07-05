import { Form, Typography } from "antd";
import type { TForm } from "../types/TForm";
import { calculateExchangeAmount } from "../utils/calculateExchangeAmount";

const ExchangeAmountPreview = () => {
  const form = Form.useFormInstance<TForm>();
  const currency = Form.useWatch("currency", form);
  const currencyExchange = Form.useWatch("currencyExchange", form);
  const amount = Form.useWatch("amount", form);

  const calculatedExchange = calculateExchangeAmount(
    amount,
    currency?.price as number,
    currencyExchange?.price as number
  );

  return (
    <Typography.Text className="!text-white ">
      <b>Exchange Preview: </b> {calculatedExchange} {currencyExchange?.currency}
    </Typography.Text>
  );
};

export default ExchangeAmountPreview;
