import { Flex, Form, InputNumber, Typography } from "antd";
import type { TForm } from "../types/TForm";
import { getWalletCurrency } from "../utils/getWalletCurrency";
import useExchangeCalculator from "../hooks/useExchangeCalculator";

const FormInputAmount = () => {
  const form = Form.useFormInstance<TForm>();
  const currency = Form.useWatch("currency", form);
  const yourWallet = form.getFieldValue("yourWallet");
  const yourCurrency = getWalletCurrency(yourWallet, currency?.currency);
  const { calculateAmountExchange } = useExchangeCalculator();

  return (
    <Flex vertical className="gap-2">
      <Form.Item<TForm>
        validateFirst
        name="amount"
        className="!w-full"
        rules={[
          {
            required: true,
            message: "Please input the amount you want to exchange",
          },
          {
            message: "You don't have enough amount in your wallet",
            validator: (_, value) => {
              if (yourCurrency?.price && yourCurrency.price >= value) return Promise.resolve();
              else return Promise.reject();
            },
          },
        ]}
      >
        <InputNumber
          className="!w-full"
          min={0}
          placeholder="Enter amount"
          suffix={currency?.currency}
          onChange={calculateAmountExchange}
        />
      </Form.Item>

      <Typography className="!text-gray-400">
        <b>Available:</b> {`${yourCurrency?.price ?? 0} ${yourCurrency?.currency ?? ""}`}
      </Typography>
    </Flex>
  );
};

export default FormInputAmount;
