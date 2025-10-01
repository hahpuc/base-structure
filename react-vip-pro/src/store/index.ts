import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/auth.slice";
import permissionsSlice from "./slices/permissions.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    permissions: permissionsSlice,
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
