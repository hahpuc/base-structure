import { StyleProvider } from "@ant-design/cssinjs";
import "@ant-design/v5-patch-for-react-19";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "flatpickr/dist/flatpickr.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "swiper/swiper-bundle.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/theme.context.tsx";
import { ThemeAntDConfigProvider } from "./providers/theme-antd-config.provider.tsx";

import axios from "axios";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import "./index.css";
import { setUpAxios } from "./services/client/axios-setup.ts";
import { store } from "./store";
import "./styles/antd-theme.less";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

setUpAxios(axios);

createRoot(document.getElementById("root")!).render(
  <StyleProvider layer>
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ThemeAntDConfigProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ThemeAntDConfigProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  </StyleProvider>
);
