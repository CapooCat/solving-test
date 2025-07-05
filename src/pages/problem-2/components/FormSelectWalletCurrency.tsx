import { useQuery } from "@tanstack/react-query";
import { getPrice } from "../api/getPrice";
import { Form, Select, type SelectProps } from "antd";
import type { TForm } from "../types/TForm";

const FormSelectWalletCurrency = (props: SelectProps) => {
  const form = Form.useFormInstance<TForm>();
  const yourWallet = Form.useWatch("yourWallet", { form, preserve: true });
  const query = useQuery({ queryKey: ["GetPrice"], queryFn: getPrice });

  const options = query.data?.map((item, index) => {
    return {
      key: index,
      label: `${item.currency} - ${item.price}`,
      value: JSON.stringify(item),
      disabled: !yourWallet?.some((walletItem) => walletItem.currency === item.currency),
    };
  });

  const handleOnChange = (_value: string) => {
    const parsedValue = JSON.parse(_value);
    props.onChange?.(parsedValue);
  };

  return (
    <Select
      {...props}
      value={JSON.stringify(props.value)}
      onChange={handleOnChange}
      loading={query.isFetching}
      options={options}
      virtual={false}
    />
  );
};

export default FormSelectWalletCurrency;
