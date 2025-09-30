import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import { useAntdThemeConfig } from '../hooks/useAntdThemeConfig';

interface ThemeAwareConfigProviderProps {
  children: React.ReactNode;
}

export const ThemeAwareConfigProvider: React.FC<ThemeAwareConfigProviderProps> = ({ children }) => {
  const themeConfig = useAntdThemeConfig();
  
  return (
    <ConfigProvider theme={themeConfig} locale={enUS}>
      {children}
    </ConfigProvider>
  );
};