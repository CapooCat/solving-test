import { Flex, Form, InputNumber } from "antd";
import type { TForm } from "../types/TForm";
import useExchangeCalculator from "../hooks/useExchangeCalculator";

const FormInputExchange = () => {
  const form = Form.useFormInstance<TForm>();
  const currencyExchange = Form.useWatch("currencyExchange", form);
  const { calculateAmount } = useExchangeCalculator();

  return (
    <Flex vertical className="gap-2">
      <Form.Item<TForm> validateFirst name="amountExchange" className="!w-full">
        <InputNumber
          className="!w-full"
          min={0}
          onBlur={() => calculateAmount()}
          placeholder="Enter exchange amount"
          suffix={currencyExchange?.currency}
        />
      </Form.Item>
    </Flex>
  );
};

export default FormInputExchange;
