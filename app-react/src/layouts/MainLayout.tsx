import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const { sidebarCollapsed } = useSelector((state: RootState) => state.ui);

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={sidebarCollapsed} />
      <Layout className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header />
        <Content className="bg-white m-6 p-6 min-h-[280px] rounded-2xl">
          <div className="min-h-full">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
