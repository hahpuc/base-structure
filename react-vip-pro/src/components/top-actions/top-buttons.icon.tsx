import {
  ArrowRightIcon,
  ExportIcon,
  ImportIcon,
  PencilIcon,
  PlusIcon,
  TrashBinIcon,
} from "@/icons";
import { IconName } from "./types/top-button.type";

export const iconMap: Record<IconName, React.ReactNode> = {
  edit: <PencilIcon />,
  plus: <PlusIcon />,
  import: <ImportIcon />,
  export: <ExportIcon />,
  delete: <TrashBinIcon />,
  back: <ArrowRightIcon />,
};
