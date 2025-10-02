import { ButtonColorType, ButtonType, ButtonVariantType } from "antd/es/button";

export const iconNames = [
  "edit",
  "plus",
  "import",
  "export",
  "delete",
  "back",
] as const;
export type IconName = (typeof iconNames)[number];

export type HeaderButton = {
  id: string;
  title: string | (() => string);
  icon?: IconName | (() => IconName);
  type?: ButtonType | (() => ButtonType);
  color?: ButtonColorType | (() => ButtonColorType);
  variant?: ButtonVariantType | (() => ButtonVariantType);
  visible?: boolean | (() => boolean);
  disable?: boolean | (() => boolean);
  permission?: string;
};

export type HeaderButtonHandler = {
  id: string;
  handler: () => Promise<void> | void;
};
