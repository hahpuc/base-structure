import * as React from "react";
import { type Editor } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "@/components/tiptap/hooks/use-tiptap-editor";

// --- Icons ---
import { ChevronDownIcon } from "@/components/tiptap/components/tiptap-icons/chevron-down-icon";

// --- Tiptap UI ---
import { TableButton } from "./table-button";
import type { TableAction } from "./use-table";
import { useTableDropdownMenu } from "./use-table-dropdown-menu";

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap/components/tiptap-ui-primitive/button";
import {
  Button,
  ButtonGroup,
} from "@/components/tiptap/components/tiptap-ui-primitive/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/tiptap/components/tiptap-ui-primitive/dropdown-menu";
import {
  Card,
  CardBody,
} from "@/components/tiptap/components/tiptap-ui-primitive/card";

export interface TableDropdownMenuProps extends Omit<ButtonProps, "type"> {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor;
  /**
   * The table actions to display in the dropdown.
   */
  actions?: TableAction[];
  /**
   * Whether the dropdown should be hidden when no table actions are available
   * @default false
   */
  hideWhenUnavailable?: boolean;
  /**
   * Callback for when the dropdown opens or closes
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Whether to render the dropdown menu in a portal
   * @default false
   */
  portal?: boolean;
}

export function TableDropdownMenu({
  editor: providedEditor,
  actions = [
    "addTable",
    "insertRowTop",
    "insertRowBottom",
    "insertColumnLeft",
    "insertColumnRight",
    "mergeCellHorizontal",
    "mergeCellVertical",
    "splitCellHorizontal",
    "splitCellVertical",
    "deleteRow",
    "deleteColumn",
    "deleteTable",
  ],
  hideWhenUnavailable = false,
  onOpenChange,
  portal = false,
  ...props
}: TableDropdownMenuProps) {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = React.useState(false);

  const { filteredActions, canPerformAny, isVisible, Icon } =
    useTableDropdownMenu({
      editor,
      actions,
      hideWhenUnavailable,
    });

  const handleOnOpenChange = React.useCallback(
    (open: boolean) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange]
  );

  if (!isVisible || !editor || !editor.isEditable) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOnOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          data-active-state="off"
          role="button"
          tabIndex={-1}
          disabled={!canPerformAny}
          data-disabled={!canPerformAny}
          aria-label="Table options"
          tooltip="Table"
          {...props}
        >
          <Icon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" portal={portal}>
        <Card>
          <CardBody>
            <ButtonGroup>
              {filteredActions.map(
                (option: { action: TableAction; label: string }) => (
                  <DropdownMenuItem key={option.action} asChild>
                    <TableButton
                      editor={editor}
                      action={option.action}
                      text={option.label}
                      showTooltip={false}
                    />
                  </DropdownMenuItem>
                )
              )}
            </ButtonGroup>
          </CardBody>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TableDropdownMenu;
