import { Button, Form } from "antd";
import type { TForm } from "../types/TForm";
import type { TModelPrice } from "../types/TModelPrice";
import { getWalletCurrency } from "../utils/getWalletCurrency";

const ButtonMax = () => {
  const form = Form.useFormInstance<TForm>();
  const currency = Form.useWatch("currency", form);
  const yourWallet: TModelPrice[] = form.getFieldValue("yourWallet");
  const yourCurrency = getWalletCurrency(yourWallet, currency?.currency);

  const handleMaxClick = () => {
    if (yourCurrency) {
      form.setFieldValue("amount", yourCurrency?.price);
    }
  };

  return (
    <Button onClick={handleMaxClick} disabled={!yourCurrency} className="!w-full">
      Max
    </Button>
  );
};

export default ButtonMax;
