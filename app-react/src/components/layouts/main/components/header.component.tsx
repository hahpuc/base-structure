import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Drawer, Dropdown, Layout, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useIsMobile } from '@/hooks/use-mobile';
import { AppDispatch, RootState } from '@/store';
import { logoutAsync } from '@/store/slices/auth.slice';
import { toggleSidebar } from '@/store/slices/ui.slice';

import HeaderButtons, { buttonHandlers } from './header-buttons.component';
import SidebarMenu from './sidebar-menu.component';

const { Header: AntHeader } = Layout;

// User dropdown menu
const getUserMenuItems = (handleLogout: () => void): MenuProps['items'] => [
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
  { type: 'divider' },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Logout',
    onClick: handleLogout,
  },
];

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sidebarCollapsed, headerTitle, buttons } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);

  const isMobile = useIsMobile();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(logoutAsync());
  }, [dispatch]);

  const handleButtonClick = useCallback((buttonId: string) => {
    const handler = buttonHandlers.get(buttonId);
    if (handler) handler();
  }, []);

  return (
    <AntHeader className="bg-white px-6 sticky top-0 z-10 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        {isMobile ? (
          <Button
            type="text"
            icon={<MenuUnfoldOutlined />}
            onClick={() => {
              setDrawerVisible(true);
            }}
            className="mr-4"
          />
        ) : (
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => dispatch(toggleSidebar())}
            className="mr-4"
          />
        )}

        <h1 className="text-lg font-semibold text-gray-800">{headerTitle ?? 'Admin Dashboard'}</h1>
        <div className="buttons-view ms-3 flex space-x-2">
          <HeaderButtons buttons={buttons} onButtonClick={handleButtonClick} isMobile={isMobile} />
        </div>
      </div>

      <Space>
        <Dropdown
          menu={{ items: getUserMenuItems(handleLogout) }}
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="flex items-center cursor-pointer px-2 py-1 rounded hover:bg-gray-100">
            <Avatar size="small" icon={<UserOutlined />} src={''} className="mr-2" />

            {!isMobile && (
              <span className="text-sm font-medium text-gray-700">{user?.username || 'Admin'}</span>
            )}
          </div>
        </Dropdown>
      </Space>

      {isMobile && (
        <Drawer
          title="Admin"
          placement="left"
          width={256}
          closeIcon={null}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          <SidebarMenu />
        </Drawer>
      )}
    </AntHeader>
  );
};

export default Header;
