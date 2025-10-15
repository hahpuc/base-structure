import { StyleProvider } from "@ant-design/cssinjs";
import "@ant-design/v5-patch-for-react-19";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "flatpickr/dist/flatpickr.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "swiper/swiper-bundle.css";
import App from "./App.tsx";
import { ThemeAntDConfigProvider } from "./providers/theme-antd-config.provider.tsx";

import axios from "axios";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import "./index.css";
import { setUpAxios } from "./services/client/axios-setup.ts";
import { store } from "./store";
import { appInitializationService } from "./services/app-initialization.service";
import { initializeLocaleData } from "./store/slices/locale.slice";

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

// Initialize localization data on app startup
// The Redux store will automatically load cached data from localStorage during initialization
// This will also fetch fresh data from API if needed
store.dispatch(initializeLocaleData());

// Alternative: Initialize using the app initialization service directly
// This approach provides more control over the initialization process
appInitializationService
  .initializeApp()
  .then(() => {
    console.log("App initialization completed");
  })
  .catch((error) => {
    console.error("App initialization failed:", error);
  });

createRoot(document.getElementById("root")!).render(
  <StyleProvider layer>
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeAntDConfigProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeAntDConfigProvider>
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  </StyleProvider>
);
