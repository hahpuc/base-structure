import { EditorComponent } from "@/components/editor/editor.component";
import "@/styles/tiptap.less";

export const TipTapPage: React.FC = () => {
  return (
    <div className="p-4 w-full">
      <EditorComponent />
    </div>
  );
};
