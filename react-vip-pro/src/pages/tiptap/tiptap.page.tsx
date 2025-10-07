import useHeader from "@/hooks/use-header.hook";
import { SimpleEditor } from "@/tiptap/components/tiptap-templates/simple/simple-editor";

export const TipTapPage: React.FC = () => {
  useHeader("TipTap Editor", []);

  return (
    <div className="p-4 w-full">
      {/* <EditorComponent /> */}

      <SimpleEditor />
    </div>
  );
};
