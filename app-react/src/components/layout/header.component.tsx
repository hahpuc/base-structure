import {
  ArrowLeftOutlined,
  BellOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  ImportOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Layout, Space } from 'antd';
import { ButtonColorType, ButtonType, ButtonVariantType } from 'antd/es/button';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/store';
import { logoutAsync } from '@/store/slices/auth.slice';
import { toggleSidebar } from '@/store/slices/ui.slice';

const { Header: AntHeader } = Layout;

export const iconNames = [
  'edit',
  'plus',
  'import',
  'export',
  'delete',
  'bell',
  'logout',
  'menuFold',
  'menuUnfold',
  'setting',
  'user',
  'back',
] as const;
export type IconName = (typeof iconNames)[number];

export type HeaderButton = {
  id: string;
  title: string | (() => string);
  icon?: IconName | (() => IconName);
  type?: ButtonType | (() => ButtonType);
  color?: ButtonColorType | (() => ButtonColorType);
  variant?: ButtonVariantType | (() => ButtonVariantType);
  visible?: boolean | (() => boolean);
  disable?: boolean | (() => boolean);
  permission?: string;
};

export type HeaderButtonHandler = {
  id: string;
  handler: () => Promise<void> | void;
};

// Icon mapping
const iconMap: Record<IconName, React.ReactNode> = {
  edit: <EditOutlined />,
  plus: <PlusOutlined />,
  import: <ImportOutlined />,
  export: <ExportOutlined />,
  delete: <DeleteOutlined />,
  bell: <BellOutlined />,
  logout: <LogoutOutlined />,
  menuFold: <MenuFoldOutlined />,
  menuUnfold: <MenuUnfoldOutlined />,
  setting: <SettingOutlined />,
  user: <UserOutlined />,
  back: <ArrowLeftOutlined />,
};

// Button handler registry
const buttonHandlers = new Map<string, () => Promise<void> | void>();
export const registerButtonHandler = (id: string, handler: () => Promise<void> | void) =>
  buttonHandlers.set(id, handler);
export const unregisterButtonHandler = (id: string) => buttonHandlers.delete(id);

// Utility to resolve value or function
function resolve<T>(value: T | (() => T)): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

// Header action buttons
const HeaderButtons: React.FC<{
  buttons: HeaderButton[];
  onButtonClick: (id: string) => void;
}> = React.memo(({ buttons, onButtonClick }) => (
  <>
    {buttons.map((button, idx) => {
      if (resolve(button.visible) === false) return null;
      const iconName = resolve(button.icon);
      return (
        <Button
          key={button.id || idx}
          type={resolve(button.type) ?? 'default'}
          icon={iconName ? iconMap[iconName] : undefined}
          color={resolve(button.color)}
          variant={resolve(button.variant)}
          onClick={() => onButtonClick(button.id)}
          disabled={resolve(button.disable)}
        >
          {resolve(button.title)}
        </Button>
      );
    })}
  </>
));

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
        <Button
          type="text"
          icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(toggleSidebar())}
          className="mr-4"
        />
        <h1 className="text-lg font-semibold text-gray-800">{headerTitle ?? 'Admin Dashboard'}</h1>
        <div className="buttons-view ms-3 flex space-x-2">
          <HeaderButtons buttons={buttons} onButtonClick={handleButtonClick} />
        </div>
      </div>
      <Space>
        <Button type="text" icon={<BellOutlined />} className="flex items-center justify-center" />
        <Dropdown
          menu={{ items: getUserMenuItems(handleLogout) }}
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="flex items-center cursor-pointer px-2 py-1 rounded hover:bg-gray-100">
            <Avatar size="small" icon={<UserOutlined />} src={''} className="mr-2" />
            <span className="text-sm font-medium text-gray-700">{user?.username || 'Admin'}</span>
          </div>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;
