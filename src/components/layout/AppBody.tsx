import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";

const AppBody = () => {
  return (
    <Content className="container self-center">
      <Outlet />
    </Content>
  );
};

export default AppBody;
