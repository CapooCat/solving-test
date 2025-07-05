import { Flex, Typography } from "antd";
import { IconExchange } from "@tabler/icons-react";

const CardTitle = () => {
  return (
    <Flex className="items-center gap-2">
      <IconExchange />
      <Typography.Text className="!text-lg font-semibold text-white">Currency Exchanger</Typography.Text>
    </Flex>
  );
};

export default CardTitle;
