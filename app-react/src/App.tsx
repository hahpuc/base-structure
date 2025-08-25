import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from './store';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './guards/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import './styles/antd-custom.css';

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
