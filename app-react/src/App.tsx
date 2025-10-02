import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthLayout from '@/components/layouts/auth/auth.layout';
import MainLayout from '@/components/layouts/main/main.layout';
import LoginPage from '@/pages/auth/login.page';
import BlogPostPage from '@/pages/blog-post/blog-post.page';
import CreateEditBlogPostPage from '@/pages/blog-post/create-edit/create-edit-blog-post.page';
import CategoryPage from '@/pages/category/category.page';
import CreateEditCategoryPage from '@/pages/category/create-edit/create-edit-category.page';
import DashboardPage from '@/pages/dashboard/dashboard.page';
import ProfilePage from '@/pages/profile/profile.page';
import ProvincePage from '@/pages/province/province.page';
import RolePage from '@/pages/role/role.page';
import AuthProvider from '@/providers/auth.provider';
import { AppDispatch, RootState } from '@/store';
import { fetchPermissions } from '@/store/slices/permissions.slice';

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
          <AuthProvider>
            <MainLayout />
          </AuthProvider>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="role" element={<RolePage />} />
        <Route path="province" element={<ProvincePage />} />

        <Route path="profile" element={<ProfilePage />} />

        <Route path="category" element={<CategoryPage />} />
        <Route path="category/create" element={<CreateEditCategoryPage />} />
        <Route path="category/edit/:id" element={<CreateEditCategoryPage />} />

        <Route path="blog-post" element={<BlogPostPage />} />
        <Route path="blog-post/create" element={<CreateEditBlogPostPage />} />
        <Route path="blog-post/edit/:id" element={<CreateEditBlogPostPage />} />

        <Route path="" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Redirect unauthenticated users to login */}
      {!isAuthenticated && <Route path="*" element={<Navigate to="/auth/login" replace />} />}
    </Routes>
  );
};

export default App;
