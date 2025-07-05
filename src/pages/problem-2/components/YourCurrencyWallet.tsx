import { Flex, Form, List, Typography } from "antd";
import type { TForm } from "../types/TForm";
import type { TModelPrice } from "../types/TModelPrice";

const YourCurrencyWallet = () => {
  const form = Form.useFormInstance<TForm>();
  const yourWallet = Form.useWatch<TModelPrice[]>("yourWallet", { form, preserve: true });

  return (
    <List
      className="gap-4"
      itemLayout="horizontal"
      dataSource={yourWallet}
      renderItem={(item, index) => (
        <List.Item key={index} className="!pt-2 !pb-1">
          <List.Item.Meta
            title={
              <Flex className="!justify-between !items-center gap-2">
                <Typography.Text className="!text-white">{item.currency}</Typography.Text>
                <Typography.Text className="!text-white">{item.price}</Typography.Text>
              </Flex>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default YourCurrencyWallet;
