import { Form, InputNumber, Typography } from "antd";
import type { TForm } from "../types/TForm";
import { getWalletCurrency } from "../utils/getWalletCurrency";

const FormInputAmount = () => {
  const form = Form.useFormInstance<TForm>();
  const currency = Form.useWatch("currency", form);
  const yourWallet = form.getFieldValue("yourWallet");
  const yourCurrency = getWalletCurrency(yourWallet, currency?.currency);

  return (
    <Form.Item<TForm>
      label={
        <Typography.Text className="!text-white">
          Amount: {yourCurrency ? `(${yourCurrency?.price} ${yourCurrency?.currency})` : ``}
        </Typography.Text>
      }
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
            if ((yourCurrency?.price ?? 0) >= value) {
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          },
        },
      ]}
    >
      <InputNumber className="!w-full" min={0} />
    </Form.Item>
  );
};

export default FormInputAmount;
