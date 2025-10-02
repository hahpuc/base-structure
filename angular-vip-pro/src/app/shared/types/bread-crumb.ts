export type BreadCrumb = {
  label: string;
  url: string;
};
export type BreadCrumbButtonType = 'create' | 'export' | 'import' | 'back' | 'custom';

export type BreadCrumbButton = {
  title?: string | (() => string);
  type: BreadCrumbButtonType | (() => BreadCrumbButtonType);
  icon?: string | (() => string);
  visible?: boolean | (() => boolean);
  disable?: boolean | (() => boolean);
  click?: () => Promise<void> | void;
  permission?: string;
};
