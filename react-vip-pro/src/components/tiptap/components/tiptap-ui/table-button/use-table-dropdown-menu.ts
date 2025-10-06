import * as React from "react";
import type { Editor } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "@/components/tiptap/hooks/use-tiptap-editor";

// --- Icons ---
import { AddTableIcon } from "@/components/tiptap/components/tiptap-icons/add-table-icon";

// --- Lib ---
import { isExtensionAvailable } from "@/components/tiptap/lib/tiptap-utils";

// --- Tiptap UI ---
import {
  canPerformTableAction,
  tableActionIcons,
  type TableAction,
} from "./use-table";

/**
 * Configuration for the table dropdown menu functionality
 */
export interface UseTableDropdownMenuConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null;
  /**
   * The table actions to display in the dropdown.
   * @default all actions
   */
  actions?: TableAction[];
  /**
   * Whether the dropdown should be hidden when no table actions are available
   * @default false
   */
  hideWhenUnavailable?: boolean;
}

export interface TableOption {
  label: string;
  action: TableAction;
  icon: React.ElementType;
}

export const tableOptions: TableOption[] = [
  {
    label: "Add table",
    action: "addTable",
    icon: AddTableIcon,
  },
  {
    label: "Insert row above",
    action: "insertRowTop",
    icon: tableActionIcons.insertRowTop,
  },
  {
    label: "Insert row below",
    action: "insertRowBottom",
    icon: tableActionIcons.insertRowBottom,
  },
  {
    label: "Insert column left",
    action: "insertColumnLeft",
    icon: tableActionIcons.insertColumnLeft,
  },
  {
    label: "Insert column right",
    action: "insertColumnRight",
    icon: tableActionIcons.insertColumnRight,
  },
  {
    label: "Merge cells horizontally",
    action: "mergeCellHorizontal",
    icon: tableActionIcons.mergeCellHorizontal,
  },
  {
    label: "Merge cells vertically",
    action: "mergeCellVertical",
    icon: tableActionIcons.mergeCellVertical,
  },
  {
    label: "Split cell horizontally",
    action: "splitCellHorizontal",
    icon: tableActionIcons.splitCellHorizontal,
  },
  {
    label: "Split cell vertically",
    action: "splitCellVertical",
    icon: tableActionIcons.splitCellVertical,
  },
  {
    label: "Delete row",
    action: "deleteRow",
    icon: tableActionIcons.deleteRow,
  },
  {
    label: "Delete column",
    action: "deleteColumn",
    icon: tableActionIcons.deleteColumn,
  },
  {
    label: "Delete table",
    action: "deleteTable",
    icon: tableActionIcons.deleteTable,
  },
];

export function canPerformAnyTableAction(
  editor: Editor | null,
  actions: TableAction[]
): boolean {
  if (!editor || !editor.isEditable) return false;
  return actions.some((action) => canPerformTableAction(editor, action));
}

export function getFilteredTableOptions(
  availableActions: TableAction[]
): typeof tableOptions {
  return tableOptions.filter((option) =>
    availableActions.includes(option.action)
  );
}

export function shouldShowTableDropdown(params: {
  editor: Editor | null;
  actions: TableAction[];
  hideWhenUnavailable: boolean;
  tableAvailable: boolean;
  canPerformAny: boolean;
}): boolean {
  const { editor, hideWhenUnavailable, tableAvailable, canPerformAny } = params;

  if (!editor || !editor.isEditable) return false;
  if (!tableAvailable) return false;

  if (hideWhenUnavailable) {
    return canPerformAny;
  }

  return true;
}

/**
 * Custom hook that provides table dropdown menu functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * function MyTableDropdownMenu() {
 *   const { filteredActions, canPerformAny, isVisible } = useTableDropdownMenu({
 *     editor: myEditor,
 *     actions: ["addTable", "insertRowTop", "deleteRow"],
 *     hideWhenUnavailable: true
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <DropdownMenu>
 *       {filteredActions.map(option => (
 *         <MenuItem key={option.action}>{option.label}</MenuItem>
 *       ))}
 *     </DropdownMenu>
 *   )
 * }
 * ```
 */
export function useTableDropdownMenu(config: UseTableDropdownMenuConfig) {
  const {
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
  } = config;

  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = React.useState<boolean>(true);

  const tableAvailable = isExtensionAvailable(editor, "table");
  const filteredActions = React.useMemo(
    () => getFilteredTableOptions(actions),
    [actions]
  );

  const canPerformAny = canPerformAnyTableAction(editor, actions);

  React.useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      setIsVisible(
        shouldShowTableDropdown({
          editor,
          actions,
          hideWhenUnavailable,
          tableAvailable,
          canPerformAny: canPerformAnyTableAction(editor, actions),
        })
      );
    };

    handleSelectionUpdate();

    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, actions, hideWhenUnavailable, tableAvailable]);

  return {
    isVisible,
    filteredActions,
    canPerformAny,
    Icon: AddTableIcon,
  };
}
