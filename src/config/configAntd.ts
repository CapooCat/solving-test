import { theme, type ThemeConfig } from "antd";

type TAntdConfig = {
  theme: ThemeConfig;
};

export const configAntd: TAntdConfig = {
  theme: {
    algorithm: theme.darkAlgorithm,
    token: {
      fontFamily: "Roboto",
      fontSize: 14,
      colorPrimary: "#0388fc",
      borderRadius: 4,
      lineWidthFocus: 0,
    },
    components: {
      Form: {
        itemMarginBottom: 0,
      },
    },
  },
};
