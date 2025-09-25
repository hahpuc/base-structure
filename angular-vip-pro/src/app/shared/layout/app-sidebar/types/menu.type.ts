export type MenuItem = {
  label: string;
  path?: string;
  icon: string;
  children?: MenuItem[];
  isAccordion?: boolean;
  permissions?: string | string[]; // Single permission string or array of permission slugs required to access this menu item
  permissionMode?: 'all' | 'any'; // 'all' means user needs ALL permissions, 'any' means user needs at least ONE permission (default: 'all' for single items, 'any' for parent items)
  new?: boolean;
  pro?: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  titleIcon?: string; // Optional icon for collapsed state
  items: MenuItem[];
  visible?: boolean; // Optional visibility control
  order?: number; // Optional ordering
};
