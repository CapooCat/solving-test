import { Segmented } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import { Header } from "antd/es/layout/layout";

// Root layout component
const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSelect = (value: string) => {
    navigate(value);
  };

  return (
    <Header className="flex justify-center items-center !bg-transparent">
      <Segmented
        value={location.pathname == "/" ? ROUTE.PROBLEM_1.route : location.pathname}
        onChange={handleSelect}
        options={[
          {
            label: ROUTE.PROBLEM_1.label,
            value: ROUTE.PROBLEM_1.route,
          },
          {
            label: ROUTE.PROBLEM_2.label,
            value: ROUTE.PROBLEM_2.route,
          },
          {
            label: ROUTE.PROBLEM_3.label,
            value: ROUTE.PROBLEM_3.route,
          },
        ]}
      />
    </Header>
  );
};

export default AppHeader;
