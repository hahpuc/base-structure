import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/auth.slice';
import permissionsSlice from './slices/permissions.slice';
import uiSlice from './slices/ui.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    permissions: permissionsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
