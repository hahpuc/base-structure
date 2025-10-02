import {
  ArrowRightIcon,
  ExportIcon,
  ImportIcon,
  PencilIcon,
  PlusIcon,
  TrashBinIcon,
} from "@/icons";
import { Button } from "antd";
import { ButtonColorType, ButtonType, ButtonVariantType } from "antd/es/button";
import React from "react";

export const iconNames = [
  "edit",
  "plus",
  "import",
  "export",
  "delete",
  "back",
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
  edit: <PencilIcon />,
  plus: <PlusIcon />,
  import: <ImportIcon />,
  export: <ExportIcon />,
  delete: <TrashBinIcon />,
  back: <ArrowRightIcon />,
};

// Button handler registry
const buttonHandlers = new Map<string, () => Promise<void> | void>();
export const registerButtonHandler = (
  id: string,
  handler: () => Promise<void> | void
) => buttonHandlers.set(id, handler);
export const unregisterButtonHandler = (id: string) =>
  buttonHandlers.delete(id);

// Utility to resolve value or function
function resolve<T>(value: T | (() => T)): T {
  return typeof value === "function" ? (value as () => T)() : value;
}

// Header action buttons component
interface HeaderButtonsProps {
  buttons: HeaderButton[];
  onButtonClick: (id: string) => void;
  isMobile?: boolean;
}

const HeaderButtons: React.FC<HeaderButtonsProps> = React.memo(
  ({ buttons, onButtonClick, isMobile = false }) => {
    if (isMobile) {
      return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-50">
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {buttons.map((button, idx) => {
              if (resolve(button.visible) === false) return null;
              const iconName = resolve(button.icon);

              return (
                <Button
                  key={button.id || idx}
                  type={resolve(button.type) ?? "default"}
                  icon={iconName ? iconMap[iconName] : undefined}
                  color={resolve(button.color)}
                  variant={resolve(button.variant)}
                  onClick={() => onButtonClick(button.id)}
                  disabled={resolve(button.disable)}
                  size="large"
                ></Button>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <>
        {buttons.map((button, idx) => {
          if (resolve(button.visible) === false) return null;
          const iconName = resolve(button.icon);
          const title = resolve(button.title);
          return (
            <Button
              key={button.id || idx}
              type={resolve(button.type) ?? "default"}
              icon={iconName ? iconMap[iconName] : undefined}
              color={resolve(button.color)}
              variant={resolve(button.variant)}
              onClick={() => onButtonClick(button.id)}
              disabled={resolve(button.disable)}
            >
              {isMobile ? "" : title}
            </Button>
          );
        })}
      </>
    );
  }
);

export { buttonHandlers };
export default HeaderButtons;
