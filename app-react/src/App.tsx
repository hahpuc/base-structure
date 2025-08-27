import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './guards/protected-route';
import AuthLayout from './layouts/auth.layout';
import MainLayout from './layouts/main.layout';
import LoginPage from './pages/auth/login.page';
import DashboardPage from './pages/dashboard/dashboard.page';
import ProvincePage from './pages/province/province.page';
import RolePage from './pages/role/role.page';
import { AppDispatch, RootState } from './store';
import { fetchPermissions } from './store/slices/permissions.slice';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPermissions());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth/*" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="" element={<Navigate to="/auth/login" replace />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="role" element={<RolePage />} />
        <Route path="province" element={<ProvincePage />} />
        <Route path="" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Redirect unauthenticated users to login */}
      {!isAuthenticated && <Route path="*" element={<Navigate to="/auth/login" replace />} />}
    </Routes>
  );
};

export default App;
