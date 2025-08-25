import { Layout } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from '@/components/layout/header.component';
import Sidebar from '@/components/layout/sidebar.component';
import { RootState } from '@/store';

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
