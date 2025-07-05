import { useQuery } from "@tanstack/react-query";
import { getPrice } from "../api/getPrice";
import { Select, type SelectProps } from "antd";

const FormSelectExchangeCurrency = (props: SelectProps) => {
  const query = useQuery({ queryKey: ["GetPrice"], queryFn: getPrice });

  const options = query.data?.map((item, index) => {
    return {
      key: index,
      label: `${item.currency} - ${item.price}`,
      value: JSON.stringify(item),
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

export default FormSelectExchangeCurrency;
