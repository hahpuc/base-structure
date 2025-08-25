import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: '/roles',
      icon: <UserOutlined />,
      label: <Link to="/roles">Roles</Link>,
    },
    {
      key: '/posts',
      icon: <FileTextOutlined />,
      label: <Link to="/posts">Posts</Link>,
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
    },
  ];

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

      <Menu theme="light" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
    </Sider>
  );
};

export default Sidebar;
