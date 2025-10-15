import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth.slice";
import localeSlice from "./slices/locale.slice";
import permissionsSlice from "./slices/permissions.slice";
import uiSlice from "./slices/ui.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    permissions: permissionsSlice,
    ui: uiSlice,
    locale: localeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
