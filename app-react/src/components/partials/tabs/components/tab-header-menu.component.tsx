import { Dropdown, MenuProps } from 'antd';
import React from 'react';

import { DropdownMenuItem } from '../custom-tabs.component';

interface TabHeaderMenuProps {
  items: DropdownMenuItem[];
  tabKey: string;
  onMenuItemClick: (menuItem: DropdownMenuItem, tabKey: string) => void;
  children: React.ReactNode;
}

const TabHeaderMenu: React.FunctionComponent<TabHeaderMenuProps> = ({
  items,
  tabKey,
  onMenuItemClick,
  children,
}) => {
  // Convert DropdownMenuItem[] to Ant Design MenuProps items
  const convertToAntMenuItems = (menuItems: DropdownMenuItem[]): MenuProps['items'] => {
    return menuItems.map(item => {
      if (item.divider) {
        return {
          type: 'divider',
          key: `divider-${item.key}`,
        };
      }

      const baseItem = {
        key: item.key,
        label: (
          <div className="flex items-center space-x-2">
            {item.icon && <span className="text-gray-400">{item.icon}</span>}
            <span>{item.label}</span>
          </div>
        ),
        onClick: () => {
          if (!item.submenu) {
            onMenuItemClick(item, tabKey);
          }
        },
      };

      // Handle submenu
      if (item.submenu) {
        return {
          ...baseItem,
          children: convertToAntMenuItems(item.submenu),
        };
      }

      return baseItem;
    });
  };

  const menuProps: MenuProps = {
    items: convertToAntMenuItems(items),
    style: { minWidth: 200 },
  };

  return (
    <Dropdown
      menu={menuProps}
      trigger={['click']}
      placement="bottomLeft"
      overlayClassName="custom-tab-dropdown"
    >
      <span style={{ cursor: 'pointer' }}>{children}</span>
    </Dropdown>
  );
};

export default TabHeaderMenu;
