import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { PermissionsService } from '@/services/permissions.service';

export interface PermissionsState {
  permissions: string[];
  loading: boolean;
  error: string | null;
}

const initialState: PermissionsState = {
  permissions: [],
  loading: false,
  error: null,
};

export const fetchPermissions = createAsyncThunk(
  'permissions/fetchPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const service = PermissionsService.getInstance();
      const perms = await service.getMyPermissions();
      return perms;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch permissions');
    }
  }
);

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions(state, action: PayloadAction<string[]>) {
      state.permissions = action.payload;
    },
    clearPermissions(state) {
      state.permissions = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPermissions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPermissions, clearPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;
