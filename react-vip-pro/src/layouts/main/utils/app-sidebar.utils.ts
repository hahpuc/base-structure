import { MenuItem, MenuSection } from "@/types/sidebar";

const filterMenuItems = (
  items: MenuItem[],
  userPermissions: string[]
): MenuItem[] => {
  const filtered: MenuItem[] = [];
  for (const item of items) {
    let hasPermission = true;
    if (item.permissions) {
      const permsArr = Array.isArray(item.permissions)
        ? item.permissions
        : [item.permissions];
      const mode =
        item.permissionMode ||
        (item.children && item.children.length > 0 ? "any" : "all");
      if (mode === "any") {
        hasPermission = permsArr.some((p) => userPermissions.includes(p));
      } else {
        hasPermission = permsArr.every((p) => userPermissions.includes(p));
      }
    }
    if (hasPermission) {
      const filteredItem: MenuItem = { ...item };
      if (item.children && item.children.length > 0) {
        filteredItem.children = filterMenuItems(item.children, userPermissions);
        if (filteredItem.children.length > 0 || item.path) {
          filtered.push(filteredItem);
        }
      } else {
        filtered.push(filteredItem);
      }
    }
  }
  return filtered;
};

// Filter sections by permissions
const filterSections = (
  sections: MenuSection[],
  userPermissions: string[]
): MenuSection[] => {
  const filtered: MenuSection[] = [];
  for (const section of sections) {
    let hasPermission = true;
    if (section.permissions) {
      const permsArr = Array.isArray(section.permissions)
        ? section.permissions
        : [section.permissions];
      const mode = section.permissionMode || "all";
      if (mode === "any") {
        hasPermission = permsArr.some((p) => userPermissions.includes(p));
      } else {
        hasPermission = permsArr.every((p) => userPermissions.includes(p));
      }
    }
    if (hasPermission) {
      const filteredItems = filterMenuItems(section.items, userPermissions);
      if (filteredItems.length > 0) {
        filtered.push({
          ...section,
          items: filteredItems,
        });
      }
    }
  }
  return filtered;
};

export { filterMenuItems, filterSections };
