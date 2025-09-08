import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from '@/components/layouts/main/components/header.component';
import Sidebar from '@/components/layouts/main/components/sidebar.component';
import { useIsMobile } from '@/hooks/use-mobile';
import { AppDispatch, RootState } from '@/store';
import { setMobileView } from '@/store/slices/ui.slice';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sidebarCollapsed } = useSelector((state: RootState) => state.ui);

  const isMobile = useIsMobile();

  // Handle responsive behavior
  useEffect(() => {
    dispatch(setMobileView(isMobile));
  }, [dispatch, isMobile]);

  // Calculate margin based on mobile state and sidebar collapsed state
  const getMainContentMargin = () => {
    if (isMobile) {
      return 'ml-0'; // No margin on mobile, sidebar is overlay
    }
    return sidebarCollapsed ? 'ml-20' : 'ml-64';
  };

  return (
    <Layout className="min-h-screen">
      {!isMobile && <Sidebar collapsed={sidebarCollapsed} />}

      <Layout className={`transition-all duration-300 ${getMainContentMargin()}`}>
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
