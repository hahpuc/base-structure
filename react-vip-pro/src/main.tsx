import { StyleProvider } from "@ant-design/cssinjs";
import "@ant-design/v5-patch-for-react-19";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "flatpickr/dist/flatpickr.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "swiper/swiper-bundle.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { ThemeAwareConfigProvider } from "./providers/ThemeAwareConfigProvider.tsx";

import "./index.css";
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

createRoot(document.getElementById("root")!).render(
  <StyleProvider layer>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ThemeAwareConfigProvider>
            <AppWrapper>
              <App />
            </AppWrapper>
          </ThemeAwareConfigProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  </StyleProvider>
);
