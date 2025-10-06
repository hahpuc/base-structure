import { Button } from "antd";
import React, { useRef } from "react";
import { resolve } from "./top-buttons.utils";
import { iconMap } from "./top-buttons.icon";
import { HeaderButton } from "./types/top-button.type";
import { usePermission } from "@/hooks/use-permission.hook";

export interface HeaderButtonsProps {
  buttons: HeaderButton[];
  onButtonClick: (id: string) => Promise<void> | void;
  isMobile?: boolean;
}

const HeaderButtons: React.FC<HeaderButtonsProps> = React.memo(
  ({ buttons, onButtonClick, isMobile = false }) => {
    const { hasPermission } = usePermission();

    // Prevent spam clicks
    const lockedRef = useRef<Record<string, boolean>>({});

    const handleClick = async (id: string) => {
      if (lockedRef.current[id]) return;

      lockedRef.current[id] = true;

      try {
        await onButtonClick(id);
      } finally {
        // release after done
        lockedRef.current[id] = false;
      }
    };

    const visibleButtons = buttons.filter((button) => {
      if (!button.permission) return true;

      return hasPermission(button.permission);
    });

    if (isMobile) {
      return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-50">
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {visibleButtons.map((button, idx) => {
              if (resolve(button.visible) === false) return null;
              const iconName = resolve(button.icon);

              return (
                <Button
                  key={button.id || idx}
                  type={resolve(button.type) ?? "default"}
                  icon={iconName ? iconMap[iconName] : undefined}
                  color={resolve(button.color)}
                  variant={resolve(button.variant)}
                  onClick={() => handleClick(button.id)}
                  disabled={
                    resolve(button.disable) || lockedRef.current[button.id]
                  }
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
        {visibleButtons.map((button, idx) => {
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
              onClick={() => handleClick(button.id)}
              disabled={resolve(button.disable) || lockedRef.current[button.id]}
            >
              {isMobile ? "" : title}
            </Button>
          );
        })}
      </>
    );
  }
);

export default HeaderButtons;
