import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './guards/protected-route';
import AuthLayout from './layouts/auth.layout';
import MainLayout from './layouts/main.layout';
import LoginPage from './pages/auth/login.page';
import DashboardPage from './pages/dashboard/dashboard.page';
import { RootState } from './store';

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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
        <Route path="" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Redirect unauthenticated users to login */}
      {!isAuthenticated && <Route path="*" element={<Navigate to="/auth/login" replace />} />}
    </Routes>
  );
};

export default App;
