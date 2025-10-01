import React from "react";
import { Skeleton } from "antd";

interface SidebarSkeletonProps {
  isExpanded: boolean;
  isHovered: boolean;
  isMobileOpen: boolean;
}

export const SidebarSkeleton: React.FC<SidebarSkeletonProps> = ({
  isExpanded,
  isHovered,
  isMobileOpen,
}) => {
  const showFullContent = isExpanded || isHovered || isMobileOpen;

  return (
    <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
      <nav className="mb-6">
        <div className="flex flex-col gap-4">
          {/* First Section - Menu */}
          <div>
            {/* Section Header */}
            <div className="mb-4 flex">
              {showFullContent ? (
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: 60, height: 16 }}
                />
              ) : (
                <Skeleton.Avatar
                  active
                  size="small"
                  shape="square"
                  style={{ width: 24, height: 24 }}
                />
              )}
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={`menu-${item}`} className="flex items-center gap-3">
                  {/* Icon */}
                  <Skeleton.Avatar
                    active
                    size="small"
                    shape="square"
                    style={{ width: 20, height: 20 }}
                  />
                  {/* Menu Text */}
                  {showFullContent && (
                    <Skeleton.Input
                      active
                      size="small"
                      style={{
                        width: Math.random() * 60 + 80, // Random width between 80-140px
                        height: 16,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Submenu Items (showing under some menu items) */}
            {showFullContent && (
              <div className="mt-2 ml-8 flex flex-col gap-2">
                {[1, 2].map((subItem) => (
                  <Skeleton.Input
                    key={`submenu-${subItem}`}
                    active
                    size="small"
                    style={{
                      width: Math.random() * 40 + 60, // Random width between 60-100px
                      height: 14,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Second Section - Others */}
          <div>
            {/* Section Header */}
            <div className="mb-4 flex">
              {showFullContent ? (
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: 70, height: 16 }}
                />
              ) : (
                <Skeleton.Avatar
                  active
                  size="small"
                  shape="square"
                  style={{ width: 24, height: 24 }}
                />
              )}
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={`others-${item}`} className="flex items-center gap-3">
                  {/* Icon */}
                  <Skeleton.Avatar
                    active
                    size="small"
                    shape="square"
                    style={{ width: 20, height: 20 }}
                  />
                  {/* Menu Text */}
                  {showFullContent && (
                    <Skeleton.Input
                      active
                      size="small"
                      style={{
                        width: Math.random() * 80 + 70, // Random width between 70-150px
                        height: 16,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Submenu Items */}
            {showFullContent && (
              <div className="mt-2 ml-8 flex flex-col gap-2">
                {[1, 2, 3].map((subItem) => (
                  <Skeleton.Input
                    key={`others-submenu-${subItem}`}
                    active
                    size="small"
                    style={{
                      width: Math.random() * 50 + 50, // Random width between 50-100px
                      height: 14,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
