import { theme as antTheme } from "antd";
import { useTheme } from "./ui.hooks";

export const useAntdThemeConfig = () => {
  const { theme } = useTheme();

  return {
    // Use Ant Design's built-in dark algorithm for dark theme
    algorithm:
      theme === "dark" ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    cssVar: true,
    hashed: true,
    token: {
      // Custom tokens that work with both themes
      colorPrimary: theme === "dark" ? "#597ef7" : "#2f54eb",
      colorSuccess: theme === "dark" ? "#73d13d" : "#52c41a",
      colorWarning: theme === "dark" ? "#ffc53d" : "#faad14",
      colorError: theme === "dark" ? "#ff4d4f" : "#f5222d",
      colorInfo: theme === "dark" ? "#597ef7" : "#2f54eb",

      // Typography
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      fontSize: 14,

      // Border radius
      borderRadius: 6,
      borderRadiusSM: 4,
      borderRadiusLG: 8,

      // Spacing
      marginXS: 8,
      marginSM: 12,
      margin: 16,
      marginMD: 20,
      marginLG: 24,
      marginXL: 32,

      // Component specific tokens
      controlHeight: 32,
      controlHeightSM: 24,
      controlHeightLG: 40,

      // Motion
      motionDurationFast: "0.1s",
      motionDurationMid: "0.2s",
      motionDurationSlow: "0.3s",
    },
    components: {
      // Component-specific theme overrides
      Button: {
        borderRadius: 6,
        controlHeight: 32,
        fontWeight: 400,
      },
      Input: {
        borderRadius: 6,
        controlHeight: 32,
      },
      Select: {
        borderRadius: 6,
        controlHeight: 32,
      },
      Modal: {
        borderRadius: 8,
        paddingContentHorizontal: 24,
        paddingMD: 24,
      },
      Drawer: {
        paddingLG: 24,
      },
      Form: {
        itemMarginBottom: 24,
        verticalLabelPadding: "0 0 8px",
      },
      Message: {
        contentPadding: "10px 16px",
      },
      Notification: {
        paddingMD: 16,
        paddingContentHorizontal: 24,
      },
      Alert: {
        borderRadius: 6,
        paddingContentHorizontal: 16,
      },
    },
  };
};
