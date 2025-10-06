import { SimpleEditor } from "@/components/tiptap/components/tiptap-templates/simple/simple-editor";
import useHeader from "@/hooks/use-header.hook";

export const TipTapPage: React.FC = () => {
  useHeader("TipTap Editor", []);

  return (
    <div className="p-4 w-full">
      <SimpleEditor className="my-6 bg-white dark:bg-white/[0.03] rounded-lg border dark:border-gray-700" />
    </div>
  );
};
