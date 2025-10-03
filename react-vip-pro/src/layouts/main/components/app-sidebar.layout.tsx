import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import { useAppSelector } from "@/hooks/redux.hooks";
import { MenuItem, MenuSection } from "@/types/sidebar";
import { useSidebar } from "../../../hooks/ui.hooks";
import {
  BoxCubeIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  UserCircleIcon,
} from "../../../icons";
import { RootState } from "../../../store";
import { filterSections } from "../utils/app-sidebar.utils";

const menuItems: MenuItem[] = [
  {
    icon: <GridIcon />,
    name: "Home",
    path: "/home",
  },

  {
    name: "User Management",
    icon: <UserCircleIcon />,
    permissions: ["user_manage_read", "role_manage_read"],
    permissionMode: "any",
    children: [
      {
        name: "Role",
        path: "/role",
        icon: <UserCircleIcon />,
        permissions: "role_manage_read",
      },
      {
        name: "User",
        path: "/user",
        icon: <UserCircleIcon />,
        permissions: "user_manage_read",
      },
    ],
  },
  {
    name: "Location Management",
    icon: <ListIcon />,
    permissions: ["province_manage_read", "ward_manage_read"],
    permissionMode: "any",
    children: [
      {
        name: "Province",
        path: "/province",
        permissions: ["province_manage_read"],
      },
      {
        name: "Ward",
        path: "/ward",
        permissions: ["ward_manage_read"],
      },
    ],
  },
];

const otherItems: MenuItem[] = [
  {
    name: "Ant Design",
    icon: <ListIcon />,
    children: [
      { name: "Form AntD", path: "/form-antd", pro: true },
      {
        name: "Table AntD",
        path: "/table-antd",
        pro: true,
      },
      {
        name: "Buttons Antd",
        path: "/buttons-antd",
        pro: true,
      },
      {
        name: "Dialogs Antd",
        path: "/dialogs-antd",
        pro: true,
      },
      {
        name: "Dynamic Form",
        path: "/dynamic-form",
        new: true,
      },
    ],
  },
  {
    name: "Forms",
    icon: <ListIcon />,
    children: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },

  {
    name: "Pages",
    icon: <PageIcon />,
    children: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
  {
    icon: <PieChartIcon />,
    name: "Charts",
    children: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    children: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
];

const menuSections: MenuSection[] = [
  {
    title: "Menu",
    key: "main",
    items: menuItems,
  },
  {
    title: "Others",
    key: "others",
    items: otherItems,
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const { permissions: userPermissions, loading } = useAppSelector(
    (state: RootState) => state.permissions
  );

  const filteredSections = filterSections(menuSections, userPermissions);

  const [openSubmenu, setOpenSubmenu] = useState<{
    sectionKey: string;
    itemIndex: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isManualToggleRef = useRef(false);

  // Enhanced isActive function to handle sub-routes and query parameters
  const isActive = useCallback(
    (path: string) => {
      if (!path) return false;

      // For exact home route, only match exactly
      if (path === "/home" || path === "/") {
        return location.pathname === path;
      }

      return (
        location.pathname.startsWith(path) &&
        (location.pathname === path ||
          location.pathname.startsWith(path + "/") ||
          location.pathname.startsWith(path + "?"))
      );
    },
    [location.pathname]
  );

  // Auto-open submenus based on active route - only run on route navigation, not on component re-renders
  useEffect(() => {
    // Skip auto-open if user is manually toggling
    if (isManualToggleRef.current) {
      isManualToggleRef.current = false; // Reset flag
      return;
    }

    // Only auto-open on actual navigation (when pathname changes)
    let foundActiveSubmenu = false;

    // Use original menuSections instead of filteredSections to avoid permissions dependency
    outerLoop: for (const section of menuSections) {
      for (let index = 0; index < section.items.length; index++) {
        const nav = section.items[index];

        if (nav.children && !foundActiveSubmenu) {
          for (const subItem of nav.children) {
            // Use the enhanced isActive function instead of exact path matching
            if (subItem.path && isActive(subItem.path)) {
              console.log("Current active route menu: ", {
                path: location.pathname,
                menuPath: subItem.path,
                sectionKey: section.key,
                itemIndex: index,
                parentName: nav.name,
                childName: subItem.name,
              });

              setOpenSubmenu({
                sectionKey: section.key,
                itemIndex: index,
              });

              foundActiveSubmenu = true;

              break outerLoop; // Break out of all loops
            }
          }
        }
      }
    }
  }, [location.pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.sectionKey}-${openSubmenu.itemIndex}`;

      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    event: React.MouseEvent,
    index: number,
    sectionKey: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    // Set flag to prevent useEffect interference
    isManualToggleRef.current = true;

    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.sectionKey === sectionKey &&
        prevOpenSubmenu.itemIndex === index
      ) {
        return null;
      }

      return { sectionKey, itemIndex: index };
    });
  };

  // Show loading state if permissions are still loading
  if (loading) {
    return (
      <aside
        className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
          ${
            isExpanded || isMobileOpen
              ? "w-[290px]"
              : isHovered
              ? "w-[290px]"
              : "w-[90px]"
          }
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </aside>
    );
  }

  const renderMenuItems = (items: MenuItem[], sectionKey: string) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.children ? (
            <button
              type="button"
              onClick={(event) => handleSubmenuToggle(event, index, sectionKey)}
              className={`menu-item group ${
                openSubmenu?.sectionKey === sectionKey &&
                openSubmenu?.itemIndex === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.sectionKey === sectionKey &&
                  openSubmenu?.itemIndex === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.sectionKey === sectionKey &&
                    openSubmenu?.itemIndex === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.children && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${sectionKey}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.sectionKey === sectionKey &&
                  openSubmenu?.itemIndex === index
                    ? `${subMenuHeight[`${sectionKey}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.children.map((subItem) => (
                  <li key={subItem.name}>
                    {subItem.path ? (
                      <Link
                        to={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.name}
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              pro
                            </span>
                          )}
                        </span>
                      </Link>
                    ) : (
                      <span className="menu-dropdown-item menu-dropdown-item-inactive">
                        {subItem.name}
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span className="ml-auto menu-dropdown-badge-inactive menu-dropdown-badge">
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span className="ml-auto menu-dropdown-badge-inactive menu-dropdown-badge">
                              pro
                            </span>
                          )}
                        </span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {filteredSections.map((section) => (
              <div key={section.key}>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    section.title
                  ) : (
                    <HorizontaLDots className="size-6" />
                  )}
                </h2>
                {renderMenuItems(section.items, section.key)}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
