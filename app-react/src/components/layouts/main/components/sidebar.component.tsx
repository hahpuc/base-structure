import { Layout } from 'antd';
import React from 'react';

import SidebarMenu from './sidebar-menu.component';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <Sider
      collapsed={collapsed}
      className="fixed left-0 top-0 bottom-0 z-10"
      theme="light"
      width={256}
    >
      <div className="p-4 text-center">
        {collapsed ? (
          <h2 className="text-lg font-bold text-primary-600">A</h2>
        ) : (
          <h2 className="text-xl font-bold text-primary-600">Admin</h2>
        )}
      </div>
      <SidebarMenu />
    </Sider>
  );
};

export default Sidebar;
