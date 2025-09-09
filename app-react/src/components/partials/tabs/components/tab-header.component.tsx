import classNames from 'classnames';
import React from 'react';

import { DropdownMenuItem, TabItem } from '../custom-tabs.component';

import TabHeaderMenu from './tab-header-menu.component';

interface TabHeaderProps {
  items: TabItem[];
  activeKey: string;
  onTabClick: (key: string) => void;
  onMenuItemClick: (menuItem: DropdownMenuItem, tabKey: string) => void;
  size: 'small' | 'default' | 'large';
  animated: boolean;
  tabHeaderClassName: string;
}

const TabHeader: React.FunctionComponent<TabHeaderProps> = ({
  items,
  activeKey,
  onTabClick,
  onMenuItemClick,
  size,
  animated,
  tabHeaderClassName,
}) => {
  const sizeClasses = {
    small: 'px-2 py-2 text-xs sm:px-3',
    default: 'px-3 py-3 text-sm sm:px-4',
    large: 'px-4 py-4 text-base sm:px-6',
  };

  return (
    <div className={classNames('tab-headers', tabHeaderClassName)}>
      {/* Scrollable container for mobile */}
      <div className="relative">
        <div className="flex items-center space-x-1 border-b border-gray-200 bg-white overflow-x-auto scrollbar-hide">
          {/* Inner container with min-width to prevent compression */}
          <div className="flex items-center space-x-1 min-w-max px-2 sm:px-0">
            {items.map((item, index) => {
              const tabButton = (
                <button
                  onClick={item.dropdown ? undefined : () => onTabClick(item.key)}
                  disabled={item.disabled}
                  className={classNames(
                    'relative font-medium transition-all duration-200 focus:outline-none',
                    'border-b-2 hover:bg-gray-50 rounded-t-lg whitespace-nowrap',
                    sizeClasses[size],
                    {
                      'border-blue-500 text-blue-600 bg-blue-50': activeKey === item.key,
                      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
                        activeKey !== item.key && !item.disabled,
                      'border-transparent text-gray-300 cursor-not-allowed': item.disabled,
                      'transform scale-105': activeKey === item.key && animated,
                    }
                  )}
                >
                  <div className="flex items-center space-x-2">
                    {/* Icon */}
                    {item.icon && <span className="text-current flex-shrink-0">{item.icon}</span>}

                    {/* Label */}
                    <span className="flex-shrink-0">{item.label}</span>

                    {/* Dropdown Arrow */}
                    {item.dropdown && (
                      <svg
                        className="w-4 h-4 transition-transform duration-200 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}

                    {/* Badge */}
                    {item.badge && (
                      <span
                        className={classNames(
                          'inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full flex-shrink-0',
                          {
                            'bg-blue-100 text-blue-800': activeKey === item.key,
                            'bg-gray-100 text-gray-800': activeKey !== item.key,
                          }
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Active indicator */}
                  {activeKey === item.key && (
                    <div
                      className={classNames(
                        'absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full',
                        { 'transition-all duration-300 ease-in-out': animated }
                      )}
                    />
                  )}
                </button>
              );

              return (
                <div key={item.key} className="flex items-center flex-shrink-0">
                  {/* Tab Button with optional dropdown */}
                  {item.dropdown ? (
                    <TabHeaderMenu
                      items={item.dropdown.items}
                      tabKey={item.key}
                      onMenuItemClick={onMenuItemClick}
                    >
                      {tabButton}
                    </TabHeaderMenu>
                  ) : (
                    <div onClick={() => onTabClick(item.key)}>{tabButton}</div>
                  )}

                  {/* Divider between tabs */}
                  {index !== items.length - 1 && (
                    <div className="h-6 w-px bg-gray-200 mx-2 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabHeader;
