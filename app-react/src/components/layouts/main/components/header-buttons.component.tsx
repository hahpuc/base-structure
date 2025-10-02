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
import { Button } from 'antd';
import { ButtonColorType, ButtonType, ButtonVariantType } from 'antd/es/button';
import React from 'react';

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

// Header action buttons component
interface HeaderButtonsProps {
  buttons: HeaderButton[];
  onButtonClick: (id: string) => void;
  isMobile?: boolean;
}

const HeaderButtons: React.FC<HeaderButtonsProps> = React.memo(
  ({ buttons, onButtonClick, isMobile = false }) => (
    <>
      {buttons.map((button, idx) => {
        if (resolve(button.visible) === false) return null;
        const iconName = resolve(button.icon);
        const title = resolve(button.title);
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
            {isMobile ? '' : title}
          </Button>
        );
      })}
    </>
  )
);

export { buttonHandlers };
export default HeaderButtons;
