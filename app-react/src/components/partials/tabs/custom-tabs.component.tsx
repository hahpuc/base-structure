import classNames from 'classnames';
import React, { useState } from 'react';

import TabHeader from './components/tab-header.component';

import './tabs.css';

export interface DropdownMenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  onClick?: () => void;
  submenu?: DropdownMenuItem[];
  divider?: boolean; // Add divider after this item
}

export interface TabItem {
  key: string;
  label: string;
  content?: React.ReactNode; // Make content optional for tabs with dropdowns
  // Optional dropdown configuration
  dropdown?: {
    items: DropdownMenuItem[];
  };
  // Optional badge/count
  badge?: string | number;
  // Optional icon
  icon?: React.ReactNode;
  // Optional disabled state
  disabled?: boolean;
}

interface CustomTabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  onChange?: (activeKey: string) => void;
  className?: string;
  tabHeaderClassName?: string;
  tabContentClassName?: string;
  // Animation options
  animated?: boolean;
  // Tab position
  tabPosition?: 'top' | 'bottom';
  // Size variant
  size?: 'small' | 'default' | 'large';
}

const CustomTabs: React.FunctionComponent<CustomTabsProps> = ({
  items,
  defaultActiveKey,
  onChange,
  className = '',
  tabHeaderClassName = '',
  tabContentClassName = '',
  animated = true,
  tabPosition = 'top',
  size = 'default',
}) => {
  const [activeKey, setActiveKey] = useState<string>(defaultActiveKey || items[0]?.key || '');
  const [selectedDropdownContent, setSelectedDropdownContent] = useState<{
    [key: string]: React.ReactNode;
  }>({});

  const handleTabClick = (key: string) => {
    if (items.find(item => item.key === key)?.disabled) return;

    // Clear any selected dropdown content when switching tabs
    setSelectedDropdownContent(prev => ({
      ...prev,
      [key]: undefined,
    }));

    setActiveKey(key);
    onChange?.(key);
  };

  const handleMenuItemClick = (menuItem: DropdownMenuItem, tabKey: string) => {
    // Switch to the tab first
    setActiveKey(tabKey);

    if (menuItem.content) {
      // If the menu item has content, use it for the tab
      setSelectedDropdownContent(prev => ({
        ...prev,
        [tabKey]: menuItem.content,
      }));
    }

    if (menuItem.onClick) {
      menuItem.onClick();
    }
    onChange?.(tabKey);
  };

  const activeTab = items.find(item => item.key === activeKey);

  const TabContent = () => {
    // Check if there's a selected dropdown content for the active tab
    const dropdownContent = selectedDropdownContent[activeKey];

    // If the active tab has a dropdown, only show dropdown content (no default content)
    // Otherwise, show the tab's default content
    let contentToShow: React.ReactNode;

    if (activeTab?.dropdown) {
      // Tab with dropdown - only show content if a dropdown item was selected
      contentToShow = dropdownContent || null;
    } else {
      // Regular tab - show default content (dropdown content takes priority if exists)
      contentToShow = dropdownContent || activeTab?.content;
    }

    return (
      <div
        className={classNames('tab-content mt-4', tabContentClassName, {
          'transition-opacity duration-300 ease-in-out': animated,
          'opacity-100': contentToShow,
          'opacity-0': !contentToShow,
        })}
      >
        {contentToShow}
      </div>
    );
  };
  return (
    <div className={classNames('custom-tabs', className)}>
      {tabPosition === 'top' && (
        <TabHeader
          items={items}
          activeKey={activeKey}
          onTabClick={handleTabClick}
          onMenuItemClick={handleMenuItemClick}
          size={size}
          animated={animated}
          tabHeaderClassName={tabHeaderClassName}
        />
      )}
      <TabContent />
      {tabPosition === 'bottom' && (
        <TabHeader
          items={items}
          activeKey={activeKey}
          onTabClick={handleTabClick}
          onMenuItemClick={handleMenuItemClick}
          size={size}
          animated={animated}
          tabHeaderClassName={tabHeaderClassName}
        />
      )}
    </div>
  );
};

export default CustomTabs;
