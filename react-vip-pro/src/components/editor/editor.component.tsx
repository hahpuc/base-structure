import {
  EditorBlockQuote,
  EditorBold,
  EditorClearFormat,
  EditorCode,
  EditorHorizontalLine,
  EditorImage,
  EditorItalic,
  EditorOrderedList,
  EditorPageBreak,
  EditorParagraph,
  EditorRedo,
  EditorStrike,
  EditorTable,
  EditorTableHeader,
  EditorTableMergeColumn,
  EditorTableMergeRow,
  EditorUndo,
  EditorUnorderedList,
} from "@/icons";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
// Custom TableCell with backgroundColor attribute
const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});
import TableHeader from "@tiptap/extension-table-header";
import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "antd";
import { useEffect, useState } from "react";

const extensions = [
  TextStyleKit,
  StarterKit,
  Image,
  Table.configure({ resizable: true }),
  TableRow,
  CustomTableCell,
  TableHeader,
];

function MenuBar({ editor }: { editor: Editor }) {
  // Table actions helper
  const tableActions = [
    {
      icon: <EditorTableHeader />,
      label: "Toggle header row",
      action: () => editor.chain().focus().toggleHeaderRow().run(),
      can: () => editor.can().toggleHeaderRow(),
    },
    {
      icon: <EditorTableMergeRow />,
      label: "Add row before",
      action: () => editor.chain().focus().addRowBefore().run(),
      can: () => editor.can().addRowBefore(),
    },
    {
      icon: <EditorTableMergeRow />,
      label: "Add row after",
      action: () => editor.chain().focus().addRowAfter().run(),
      can: () => editor.can().addRowAfter(),
    },
    {
      icon: <EditorTableMergeRow />,
      label: "Delete row",
      action: () => editor.chain().focus().deleteRow().run(),
      can: () => editor.can().deleteRow(),
    },
    {
      icon: <EditorTableMergeColumn />,
      label: "Add column before",
      action: () => editor.chain().focus().addColumnBefore().run(),
      can: () => editor.can().addColumnBefore(),
    },
    {
      icon: <EditorTableMergeColumn />,
      label: "Add column after",
      action: () => editor.chain().focus().addColumnAfter().run(),
      can: () => editor.can().addColumnAfter(),
    },
    {
      icon: <EditorTableMergeColumn />,
      label: "Delete column",
      action: () => editor.chain().focus().deleteColumn().run(),
      can: () => editor.can().deleteColumn(),
    },
    {
      icon: <EditorTable />,
      label: "Delete table",
      action: () => editor.chain().focus().deleteTable().run(),
      can: () => editor.can().deleteTable(),
    },
    {
      icon: <EditorTableMergeRow />,
      label: "Merge cells",
      action: () => editor.chain().focus().mergeCells().run(),
      can: () => editor.can().mergeCells(),
    },
    {
      icon: <EditorTableMergeRow />,
      label: "Split cell",
      action: () => editor.chain().focus().splitCell().run(),
      can: () => editor.can().splitCell(),
    },
    {
      icon: <EditorTableMergeRow />,
      label: "Set cell bg",
      action: () =>
        editor
          .chain()
          .focus()
          .setCellAttribute("backgroundColor", "#FAF594")
          .run(),
      can: () => editor.can().setCellAttribute("backgroundColor", "#FAF594"),
    },
    {
      icon: <EditorTableMergeRow />,
      label: "Fix tables",
      action: () => editor.chain().focus().fixTables().run(),
      can: () => editor.can().fixTables(),
    },
    {
      icon: <EditorTableMergeRow />,
      label: "Go to next cell",
      action: () => editor.chain().focus().goToNextCell().run(),
      can: () => editor.can().goToNextCell(),
    },
    {
      icon: <EditorTableMergeRow />,
      label: "Go to previous cell",
      action: () => editor.chain().focus().goToPreviousCell().run(),
      can: () => editor.can().goToPreviousCell(),
    },
  ];
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isBold: editor.isActive("bold") ?? false,
        canBold: editor.can().chain().toggleBold().run() ?? false,
        isItalic: editor.isActive("italic") ?? false,
        canItalic: editor.can().chain().toggleItalic().run() ?? false,
        isStrike: editor.isActive("strike") ?? false,
        canStrike: editor.can().chain().toggleStrike().run() ?? false,
        isCode: editor.isActive("code") ?? false,
        canCode: editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: editor.isActive("paragraph") ?? false,
        isHeading1: editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: editor.isActive("bulletList") ?? false,
        isOrderedList: editor.isActive("orderedList") ?? false,
        isCodeBlock: editor.isActive("codeBlock") ?? false,
        isBlockquote: editor.isActive("blockquote") ?? false,
        canUndo: editor.can().chain().undo().run() ?? false,
        canRedo: editor.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <div className="control-group">
      <div className="button-group gap-2 flex flex-wrap mb-4">
        <Button
          icon={<EditorBold />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? "is-active" : ""}
        />
        <Button
          icon={<EditorItalic />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? "is-active" : ""}
        />

        <Button
          icon={<EditorStrike />}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? "is-active" : ""}
        />

        <Button
          icon={<EditorImage />}
          onClick={() => {
            const url = window.prompt("Enter image URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        />

        <Button
          icon={<EditorTable />}
          onClick={() => {
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run();
          }}
        >
          Add Table
        </Button>

        {/* Advanced Table Controls */}
        {tableActions.map((action, idx) => (
          <Button
            key={action.label + idx}
            // icon={action.icon}
            onClick={action.action}
            disabled={!action.can()}
            style={{ minWidth: 32, marginLeft: 2 }}
            title={action.label}
          >
            {action.label}
          </Button>
        ))}

        <Button
          icon={<EditorCode />}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? "is-active" : ""}
        />

        <Button
          icon={<EditorClearFormat />}
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run();
          }}
          disabled={!editorState.canCode}
          className={editorState.isCode ? "is-active" : ""}
        />

        <Button
          icon={<EditorParagraph />}
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? "is-active" : ""}
        />
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState.isHeading1 ? "is-active" : ""}
        >
          H1
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editorState.isHeading2 ? "is-active" : ""}
        >
          H2
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editorState.isHeading3 ? "is-active" : ""}
        >
          H3
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={editorState.isHeading4 ? "is-active" : ""}
        >
          H4
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={editorState.isHeading5 ? "is-active" : ""}
        >
          H5
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={editorState.isHeading6 ? "is-active" : ""}
        >
          H6
        </Button>

        <Button
          icon={<EditorUnorderedList />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? "is-active" : ""}
        />

        <Button
          icon={<EditorOrderedList />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? "is-active" : ""}
        />

        <Button
          icon={<EditorBlockQuote />}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? "is-active" : ""}
        />

        <Button
          icon={<EditorHorizontalLine />}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />

        <Button
          icon={<EditorPageBreak />}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        />

        <Button
          icon={<EditorUndo />}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        />

        <Button
          icon={<EditorRedo />}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        />
      </div>
    </div>
  );
}

export const EditorComponent = () => {
  const [rawHtml, setRawHtml] = useState("");
  const [rawJson, setRawJson] = useState({});

  const editorView = useEditor({
    extensions,
    content: `
            <h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
    `,
    onUpdate: ({ editor }) => {
      setRawHtml(editor?.getHTML());
      setRawJson(editor?.getJSON());
    },
  });

  // Initialize raw value on mount
  useEffect(() => {
    if (editorView) {
      setRawHtml(editorView?.getHTML());
      setRawJson(editorView?.getJSON());
    }
  }, [editorView]);

  return (
    <div className="tiptap-editor">
      <MenuBar editor={editorView} />

      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <EditorContent editor={editorView} />
      </div>

      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <span className="block font-bold mb-2">Raw HTML Value</span>
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto mb-4 min-h-[200px]">
          {rawHtml}
        </pre>
        <span className="block font-bold mb-2">Raw JSON Data</span>
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto ">
          {JSON.stringify(rawJson, null, 2)}
        </pre>
      </div>
    </div>
  );
};
