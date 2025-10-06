import * as React from "react";
import type { ChainedCommands } from "@tiptap/react";
import { type Editor } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "@/components/tiptap/hooks/use-tiptap-editor";

// --- Lib ---
import { isExtensionAvailable } from "@/components/tiptap/lib/tiptap-utils";

// --- Icons ---
import { AddTableIcon } from "@/components/tiptap/components/tiptap-icons/add-table-icon";
import { InsertRowTopIcon } from "@/components/tiptap/components/tiptap-icons/insert-row-top-icon";
import { InsertRowBottomIcon } from "@/components/tiptap/components/tiptap-icons/insert-row-bottom-icon";
import { InsertColumnLeft } from "@/components/tiptap/components/tiptap-icons/insert-column-left-icon";
import { InsertColumnRight } from "@/components/tiptap/components/tiptap-icons/insert-column-right-icon";
import { MergeCellHorizontalIcon } from "@/components/tiptap/components/tiptap-icons/merge-cell-horizontal-icon";
import { MergeCellVerticalIcon } from "@/components/tiptap/components/tiptap-icons/merge-cell-vertical-icon";
import { SplitCellHorizontalIcon } from "@/components/tiptap/components/tiptap-icons/split-cell-horizontal-icon";
import { SplitCellVerticalIcon } from "@/components/tiptap/components/tiptap-icons/split-cell-vertical-icon";
import { DeleteRowIcon } from "@/components/tiptap/components/tiptap-icons/delete-row-icon";
import { DeleteColumnIcon } from "@/components/tiptap/components/tiptap-icons/delete-column-icon";
import { TrashIcon } from "@/components/tiptap/components/tiptap-icons/trash-icon";

export type TableAction =
  | "addTable"
  | "insertRowTop"
  | "insertRowBottom"
  | "insertColumnLeft"
  | "insertColumnRight"
  | "mergeCellHorizontal"
  | "mergeCellVertical"
  | "splitCellHorizontal"
  | "splitCellVertical"
  | "deleteRow"
  | "deleteColumn"
  | "deleteTable";

/**
 * Configuration for the table functionality
 */
export interface UseTableConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null;
  /**
   * The table action to perform.
   */
  action: TableAction;
  /**
   * Whether the button should hide when action is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean;
  /**
   * Callback function called after a successful table action.
   */
  onActionPerformed?: () => void;
}

export const tableActionIcons = {
  addTable: AddTableIcon,
  insertRowTop: InsertRowTopIcon,
  insertRowBottom: InsertRowBottomIcon,
  insertColumnLeft: InsertColumnLeft,
  insertColumnRight: InsertColumnRight,
  mergeCellHorizontal: MergeCellHorizontalIcon,
  mergeCellVertical: MergeCellVerticalIcon,
  splitCellHorizontal: SplitCellHorizontalIcon,
  splitCellVertical: SplitCellVerticalIcon,
  deleteRow: DeleteRowIcon,
  deleteColumn: DeleteColumnIcon,
  deleteTable: TrashIcon,
};

export const tableActionLabels: Record<TableAction, string> = {
  addTable: "Add table",
  insertRowTop: "Insert row above",
  insertRowBottom: "Insert row below",
  insertColumnLeft: "Insert column left",
  insertColumnRight: "Insert column right",
  mergeCellHorizontal: "Merge cells horizontally",
  mergeCellVertical: "Merge cells vertically",
  splitCellHorizontal: "Split cell horizontally",
  splitCellVertical: "Split cell vertically",
  deleteRow: "Delete row",
  deleteColumn: "Delete column",
  deleteTable: "Delete table",
};

/**
 * Checks if a table action can be performed in the current editor state
 */
export function canPerformTableAction(
  editor: Editor | null,
  action: TableAction
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!isExtensionAvailable(editor, "table")) return false;

  switch (action) {
    case "addTable":
      return editor
        .can()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true });
    case "insertRowTop":
      return editor.can().addRowBefore();
    case "insertRowBottom":
      return editor.can().addRowAfter();
    case "insertColumnLeft":
      return editor.can().addColumnBefore();
    case "insertColumnRight":
      return editor.can().addColumnAfter();
    case "mergeCellHorizontal":
      return editor.can().mergeCells();
    case "mergeCellVertical":
      return editor.can().mergeCells();
    case "splitCellHorizontal":
      return editor.can().splitCell();
    case "splitCellVertical":
      return editor.can().splitCell();
    case "deleteRow":
      return editor.can().deleteRow();
    case "deleteColumn":
      return editor.can().deleteColumn();
    case "deleteTable":
      return editor.can().deleteTable();
    default:
      return false;
  }
}

export function hasTableCommands(
  commands: ChainedCommands
): commands is ChainedCommands & {
  insertTable: (options: {
    rows: number;
    cols: number;
    withHeaderRow: boolean;
  }) => ChainedCommands;
  addRowBefore: () => ChainedCommands;
  addRowAfter: () => ChainedCommands;
  addColumnBefore: () => ChainedCommands;
  addColumnAfter: () => ChainedCommands;
  mergeCells: () => ChainedCommands;
  splitCell: () => ChainedCommands;
  deleteRow: () => ChainedCommands;
  deleteColumn: () => ChainedCommands;
  deleteTable: () => ChainedCommands;
} {
  return "insertTable" in commands;
}

/**
 * Checks if the editor is currently in a table
 */
export function isInTable(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false;
  return editor.isActive("table");
}

/**
 * Performs a table action in the editor
 */
export function performTableAction(
  editor: Editor | null,
  action: TableAction
): boolean {
  if (!editor || !editor.isEditable) return false;
  if (!canPerformTableAction(editor, action)) return false;

  const chain = editor.chain().focus();
  if (!hasTableCommands(chain)) return false;

  switch (action) {
    case "addTable":
      return chain.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    case "insertRowTop":
      return chain.addRowBefore().run();
    case "insertRowBottom":
      return chain.addRowAfter().run();
    case "insertColumnLeft":
      return chain.addColumnBefore().run();
    case "insertColumnRight":
      return chain.addColumnAfter().run();
    case "mergeCellHorizontal":
    case "mergeCellVertical":
      return chain.mergeCells().run();
    case "splitCellHorizontal":
    case "splitCellVertical":
      return chain.splitCell().run();
    case "deleteRow":
      return chain.deleteRow().run();
    case "deleteColumn":
      return chain.deleteColumn().run();
    case "deleteTable":
      return chain.deleteTable().run();
    default:
      return false;
  }
}

/**
 * Determines if the table button should be shown
 */
export function shouldShowTableButton(props: {
  editor: Editor | null;
  hideWhenUnavailable: boolean;
  action: TableAction;
}): boolean {
  const { editor, hideWhenUnavailable, action } = props;

  if (!editor || !editor.isEditable) return false;
  if (!isExtensionAvailable(editor, "table")) return false;

  // For addTable, show when not in a table
  if (action === "addTable") {
    if (hideWhenUnavailable) {
      return !isInTable(editor) && canPerformTableAction(editor, action);
    }
    return true;
  }

  // For other actions, show only when in a table
  if (hideWhenUnavailable) {
    return isInTable(editor) && canPerformTableAction(editor, action);
  }

  return isInTable(editor);
}

/**
 * Custom hook that provides table functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MySimpleTableButton() {
 *   const { isVisible, handleTableAction } = useTable({ action: "addTable" })
 *
 *   if (!isVisible) return null
 *
 *   return <button onClick={handleTableAction}>Add Table</button>
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedTableButton() {
 *   const { isVisible, handleTableAction, label, canPerform } = useTable({
 *     editor: myEditor,
 *     action: "insertRowTop",
 *     hideWhenUnavailable: true,
 *     onActionPerformed: () => console.log('Row inserted!')
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <MyButton
 *       onClick={handleTableAction}
 *       disabled={!canPerform}
 *       aria-label={label}
 *     >
 *       Insert Row Above
 *     </MyButton>
 *   )
 * }
 * ```
 */
export function useTable(config: UseTableConfig) {
  const {
    editor: providedEditor,
    action,
    hideWhenUnavailable = false,
    onActionPerformed,
  } = config;

  const { editor } = useTiptapEditor(providedEditor);
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const canPerform = canPerformTableAction(editor, action);
  const inTable = isInTable(editor);

  React.useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      setIsVisible(
        shouldShowTableButton({ editor, action, hideWhenUnavailable })
      );
    };

    handleSelectionUpdate();

    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor, hideWhenUnavailable, action]);

  const handleTableAction = React.useCallback(() => {
    if (!editor) return false;

    const success = performTableAction(editor, action);
    if (success) {
      onActionPerformed?.();
    }
    return success;
  }, [editor, action, onActionPerformed]);

  return {
    isVisible,
    inTable,
    handleTableAction,
    canPerform,
    label: tableActionLabels[action],
    Icon: tableActionIcons[action],
  };
}
