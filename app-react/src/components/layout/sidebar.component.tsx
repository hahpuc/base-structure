import {
  ApartmentOutlined,
  DashboardOutlined,
  FileTextOutlined,
  ProfileOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { RootState } from '@/store';

const { Sider } = Layout;

interface MenuItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  permissions?: string | string[];
  permissionMode?: 'all' | 'any';
}

const menuItems: MenuItem[] = [
  {
    label: 'Overview',
    path: '/dashboard',
    icon: <DashboardOutlined />,
  },
  {
    label: 'User Management',
    icon: <TeamOutlined />,
    permissions: ['user_manage_read', 'role_manage_read'],
    permissionMode: 'any',
    children: [
      {
        label: 'Role',
        path: '/role',
        icon: <UserOutlined />,
        permissions: 'role_manage_read',
      },
      {
        label: 'User',
        path: '/user',
        icon: <UserOutlined />,
        permissions: 'user_manage_read',
      },
    ],
  },
  {
    label: 'Account Management',
    icon: <ProfileOutlined />,
    permissions: 'user_manage_read',
    children: [
      {
        label: 'Default',
        path: '/profile',
        icon: <ProfileOutlined />,
        permissions: 'user_manage_read',
      },
    ],
  },
  {
    label: 'Location Management',
    icon: <SettingOutlined />,
    permissions: ['province_manage_read', 'ward_manage_read'],
    permissionMode: 'any',
    children: [
      {
        label: 'Province',
        path: '/province',
        icon: <ApartmentOutlined />,
        permissions: ['province_manage_read'],
      },
      {
        label: 'Ward',
        path: '/ward',
        icon: <ApartmentOutlined />,
        permissions: ['ward_manage_read'],
      },
    ],
  },
  {
    label: 'Article Management',
    icon: <SecurityScanOutlined />,
    permissions: ['category_manage_read', 'blog_post_manage_read'],
    permissionMode: 'all',
    children: [
      {
        label: 'Category',
        path: '/category',
        icon: <FileTextOutlined />,
        permissions: [],
      },
      {
        label: 'Blog Post',
        path: '/blog-post',
        icon: <FileTextOutlined />,
        permissions: [],
      },
    ],
  },
];

// Filter menu items by permissions (sync, using Redux permissions)
const filterMenuItems = (items: MenuItem[], userPermissions: string[]): MenuItem[] => {
  const filtered: MenuItem[] = [];
  for (const item of items) {
    let hasPermission = true;
    if (item.permissions) {
      const permsArr = Array.isArray(item.permissions) ? item.permissions : [item.permissions];
      const mode =
        item.permissionMode || (item.children && item.children.length > 0 ? 'any' : 'all');
      if (mode === 'any') {
        hasPermission = permsArr.some(p => userPermissions.includes(p));
      } else {
        hasPermission = permsArr.every(p => userPermissions.includes(p));
      }
    }
    if (hasPermission) {
      const filteredItem: MenuItem = { ...item };
      if (item.children && item.children.length > 0) {
        filteredItem.children = filterMenuItems(item.children, userPermissions);
        if (filteredItem.children.length > 0 || item.path) {
          filtered.push(filteredItem);
        }
      } else {
        filtered.push(filteredItem);
      }
    }
  }
  return filtered;
};

// Convert MenuItem[] to AntD Menu 'items' format
const buildMenuItems = (items: MenuItem[], parentKey = ''): NonNullable<MenuProps['items']> => {
  return items.map(item => {
    const key = item.path || `${parentKey}/${item.label}`;
    if (item.children && item.children.length > 0) {
      return {
        key,
        icon: item.icon,
        label: item.label, // label must be string for submenu
        children: buildMenuItems(item.children, key),
      };
    }
    return {
      key: item.path ?? key,
      icon: item.icon,
      label: <Link to={item.path!}>{item.label}</Link>,
      children: undefined, // explicitly set children to undefined for leaf
    };
  });
};

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();

  const { permissions: userPermissions, loading } = useSelector(
    (state: RootState) => state.permissions
  );
  const filteredMenu = filterMenuItems(menuItems, userPermissions);

  // Find all open keys for current path (for submenu expansion)
  const getOpenKeys = (items: MenuItem[], pathname: string, parentKey = ''): string[] => {
    for (const item of items) {
      if (item.path === pathname) {
        return parentKey ? [parentKey] : [];
      }
      if (item.children) {
        const childOpenKeys = getOpenKeys(
          item.children,
          pathname,
          item.path || `${parentKey}/${item.label}`
        );
        if (childOpenKeys.length > 0) {
          return parentKey ? [parentKey, ...childOpenKeys] : childOpenKeys;
        }
      }
    }
    return [];
  };

  const openKeys = getOpenKeys(filteredMenu, location.pathname);

  if (loading) {
    return null; // or a loading spinner
  }

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
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={openKeys}
        className="h-full border-r-0"
        items={buildMenuItems(filteredMenu)}
      />
    </Sider>
  );
};

export default Sidebar;
