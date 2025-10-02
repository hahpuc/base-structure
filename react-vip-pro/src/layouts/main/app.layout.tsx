import PageTopActions from "@/components/top-actions/top-actions.component";
import { Outlet } from "react-router";
import { useSidebar } from "../../hooks/ui.hooks";
import AppHeader from "./components/app-header.layout";
import AppSidebar from "./components/app-sidebar.layout";
import Backdrop from "./components/backdrop.component";

const AppLayout: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <PageTopActions />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
