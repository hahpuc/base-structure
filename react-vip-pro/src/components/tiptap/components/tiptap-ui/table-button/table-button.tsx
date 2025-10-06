"use client";

import * as React from "react";

// --- Lib ---
import { parseShortcutKeys } from "@/components/tiptap/lib/tiptap-utils";

// --- Hooks ---
import { useTiptapEditor } from "@/components/tiptap/hooks/use-tiptap-editor";

// --- Tiptap UI ---
import type { TableAction, UseTableConfig } from "./use-table";
import { useTable } from "./use-table";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap/components/tiptap-ui-primitive/button";
import { Button } from "@/components/tiptap/components/tiptap-ui-primitive/button";
import { Badge } from "@/components/tiptap/components/tiptap-ui-primitive/badge";

type IconProps = React.SVGProps<SVGSVGElement>;
type IconComponent = ({ className, ...props }: IconProps) => React.ReactElement;

export interface TableButtonProps
  extends Omit<ButtonProps, "type">,
    UseTableConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string;
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean;
  /**
   * Optional custom icon component to render instead of the default.
   */
  icon?: React.MemoExoticComponent<IconComponent> | React.FC<IconProps>;
}

export function TableShortcutBadge({
  shortcutKeys,
}: {
  action?: TableAction;
  shortcutKeys?: string;
}) {
  if (!shortcutKeys) return null;
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Button component for performing table actions in a Tiptap editor.
 *
 * For custom button implementations, use the `useTable` hook instead.
 */
export const TableButton = React.forwardRef<
  HTMLButtonElement,
  TableButtonProps
>(
  (
    {
      editor: providedEditor,
      action,
      text,
      hideWhenUnavailable = false,
      onActionPerformed,
      showShortcut = false,
      onClick,
      icon: CustomIcon,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, handleTableAction, label, canPerform, Icon, inTable } =
      useTable({
        editor,
        action,
        hideWhenUnavailable,
        onActionPerformed,
      });

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleTableAction();
      },
      [handleTableAction, onClick]
    );

    if (!isVisible) {
      return null;
    }

    const RenderIcon = CustomIcon ?? Icon;

    return (
      <Button
        type="button"
        disabled={!canPerform}
        data-style="ghost"
        data-active-state={inTable && action !== "addTable" ? "on" : "off"}
        data-disabled={!canPerform}
        role="button"
        tabIndex={-1}
        aria-label={label}
        tooltip={label}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <RenderIcon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
            {showShortcut && (
              <TableShortcutBadge action={action} shortcutKeys={undefined} />
            )}
          </>
        )}
      </Button>
    );
  }
);

TableButton.displayName = "TableButton";
