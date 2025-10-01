import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import { useAntdThemeConfig } from "../hooks/user-antd-theme.hook";

interface ThemeAntDConfigProviderProps {
  children: React.ReactNode;
}

export const ThemeAntDConfigProvider: React.FC<
  ThemeAntDConfigProviderProps
> = ({ children }) => {
  const themeConfig = useAntdThemeConfig();

  return (
    <ConfigProvider theme={themeConfig} locale={enUS}>
      {children}
    </ConfigProvider>
  );
};
