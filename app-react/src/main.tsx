import { StyleProvider } from '@ant-design/cssinjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './i18n';
import { store } from './store';
import './styles/antd-custom.css'; // Import Ant Design customizations first
import './styles/index.css'; // Import Tailwind last so it can override

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StyleProvider layer>
          <ConfigProvider theme={{ cssVar: true, hashed: false }} locale={enUS}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ConfigProvider>
        </StyleProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
