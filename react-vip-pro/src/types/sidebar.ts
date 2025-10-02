export type MenuItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  permissions?: string | string[];
  permissionMode?: "all" | "any";
  pro?: boolean;
  new?: boolean;
};

export type MenuSection = {
  title: string;
  key: string;
  items: MenuItem[];
  permissions?: string | string[];
  permissionMode?: "all" | "any";
};
