import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Layout, Space } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { logoutAsync } from '@/store/slices/auth.slice';
import { toggleSidebar } from '@/store/slices/ui.slice';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sidebarCollapsed } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAsync());
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader className="bg-white px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <Button
          type="text"
          icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(toggleSidebar())}
          className="mr-4"
        />
        <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      <Space>
        <Button type="text" icon={<BellOutlined />} className="flex items-center justify-center" />

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
          <div className="flex items-center cursor-pointer px-2 py-1 rounded hover:bg-gray-100">
            <Avatar size="small" icon={<UserOutlined />} src={user?.avatar} className="mr-2" />
            <span className="text-sm font-medium text-gray-700">{user?.username || 'Admin'}</span>
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;
