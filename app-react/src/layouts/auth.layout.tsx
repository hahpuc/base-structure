import { Card, Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const AuthLayout: React.FC = () => {
  return (
    <Layout className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Content className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 p-2">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your admin account</p>
            </div>
            <Outlet />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
