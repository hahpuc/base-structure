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
import { Menu } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { RootState } from '@/store';

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

interface SidebarMenuProps {}

const SidebarMenu: React.FC<SidebarMenuProps> = () => {
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

  // Find the best matching menu key for the current path (for selectedKeys)
  const findSelectedKey = (items: MenuItem[], pathname: string): string | undefined => {
    let matchedKey: string | undefined;
    let maxLength = 0;
    const check = (itemList: MenuItem[], parentKey = '') => {
      for (const item of itemList) {
        const key = item.path || `${parentKey}/${item.label}`;
        if (item.path && pathname.startsWith(item.path) && item.path.length > maxLength) {
          matchedKey = item.path;
          maxLength = item.path.length;
        }
        if (item.children) {
          check(item.children, key);
        }
      }
    };
    check(items);
    return matchedKey;
  };

  const selectedKey = findSelectedKey(filteredMenu, location.pathname) || location.pathname;
  const openKeys = getOpenKeys(filteredMenu, selectedKey);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[selectedKey]}
      defaultOpenKeys={openKeys}
      className="h-full border-r-0"
      items={buildMenuItems(filteredMenu)}
    />
  );
};

export default SidebarMenu;
