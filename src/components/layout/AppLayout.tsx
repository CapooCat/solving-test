import { ConfigProvider, Flex } from "antd";
import AppHeader from "./AppHeader";
import AppBody from "./AppBody";
import { configAntd } from "@/config/configAntd";

const AppLayout = () => {
  return (
    <ConfigProvider theme={configAntd.theme}>
      <Flex vertical className="gap-6">
        <AppHeader />
        <AppBody />
      </Flex>
    </ConfigProvider>
  );
};

export default AppLayout;
