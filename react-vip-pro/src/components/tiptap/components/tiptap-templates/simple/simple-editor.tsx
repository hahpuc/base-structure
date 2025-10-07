"use client";

import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { Form } from "antd";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

// --- UI Primitives ---
import { Button } from "@/tiptap/components/tiptap-ui-primitive/button";
import { Spacer } from "@/tiptap/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/tiptap/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/tiptap/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/tiptap/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";

import "@/tiptap/components/tiptap-node/blockquote-node/blockquote-node.less";
import "@/tiptap/components/tiptap-node/blockquote-node/blockquote-node.less";
import "@/tiptap/components/tiptap-node/code-block-node/code-block-node.less";
import "@/tiptap/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.less";
import "@/tiptap/components/tiptap-node/list-node/list-node.less";
import "@/tiptap/components/tiptap-node/image-node/image-node.less";
import "@/tiptap/components/tiptap-node/heading-node/heading-node.less";
import "@/tiptap/components/tiptap-node/paragraph-node/paragraph-node.less";
import "@/tiptap/components/tiptap-node/table-node/table-node.less";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/tiptap/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/tiptap/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/tiptap/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/tiptap/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/tiptap/components/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/tiptap/components/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/tiptap/components/tiptap-ui/link-popover";
import { MarkButton } from "@/tiptap/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/tiptap/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/tiptap/components/tiptap-ui/undo-redo-button";
import { TableDropdownMenu } from "@/tiptap/components/tiptap-ui/table-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/tiptap/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/tiptap/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/tiptap/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsMobile } from "@/tiptap/hooks/use-mobile";
import { useWindowSize } from "@/tiptap/hooks/use-window-size";
import { useCursorVisibility } from "@/tiptap/hooks/use-cursor-visibility";

// --- Components ---
import content from "./data/content.json";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/tiptap/lib/tiptap-utils";

// --- Styles ---
import "@/tiptap/components/tiptap-templates/simple/simple-editor.less";

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
  forcePortal = false,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
  forcePortal?: boolean;
}) => {
  // Use portal for dropdowns when: mobile, or explicitly forced (for bottom toolbar)
  const usePortal = isMobile || forcePortal;

  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={usePortal} />
        <ListDropdownMenu
          types={["bulletList", "orderedList", "taskList"]}
          portal={usePortal}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover
            editor={undefined}
            hideWhenUnavailable={undefined}
            onApplied={undefined}
          />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TableDropdownMenu portal={usePortal} />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      <ToolbarGroup>{/* <ThemeToggle /> */}</ToolbarGroup>
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

interface SimpleEditorProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export function SimpleEditor({
  className,
  value,
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
}: SimpleEditorProps) {
  const isMobile = useIsMobile();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const [showBottomToolbar, setShowBottomToolbar] = React.useState(false);
  const editorWrapperRef = React.useRef<HTMLDivElement>(null);
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label":
          placeholder || "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content: content || value || "", // TODO: Remove content and use value only
    editable: !disabled && !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Only trigger onChange if the content actually changed
      if (onChange && html !== value) {
        onChange(html);
      }
    },
  });

  // Update editor content when value prop changes externally
  React.useEffect(() => {
    if (editor && value !== undefined) {
      const currentContent = editor.getHTML();
      if (currentContent !== value) {
        editor.commands.setContent(value, { emitUpdate: false });
      }
    }
  }, [editor, value]);

  // Update editable state when disabled/readOnly props change
  React.useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled && !readOnly);
    }
  }, [editor, disabled, readOnly]);

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  // Scroll detection for dual toolbar
  React.useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const wrapper = editorWrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const toolbarHeight =
        toolbarRef.current?.getBoundingClientRect().height ?? 0;

      // Show bottom toolbar if top toolbar is out of view or user scrolled down significantly
      const topToolbarHidden = rect.top + toolbarHeight < 0;
      const scrolledPastThreshold = window.scrollY > 200;

      setShowBottomToolbar(topToolbarHidden && scrolledPastThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Get validation status from Form.Item if within a form context
  const formItemStatus = Form.Item?.useStatus?.();
  const hasError = formItemStatus?.status === "error";

  return (
    <div
      ref={editorWrapperRef}
      className={`simple-editor-wrapper ${className} ${
        hasError ? "simple-editor-error" : ""
      }`}
    >
      <EditorContext.Provider value={{ editor }}>
        {/* Top Toolbar */}
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        {/* Bottom Floating Toolbar (Desktop only) */}
        {!isMobile && showBottomToolbar && (
          <Toolbar
            className="bottom-floating-toolbar"
            style={{
              position: "fixed",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 50,
              maxWidth: "90vw",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            }}
            data-variant="floating"
          >
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={false}
              forcePortal={true}
            />
          </Toolbar>
        )}

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}
