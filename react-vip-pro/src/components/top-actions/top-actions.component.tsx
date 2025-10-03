import { useAppSelector } from "@/hooks/redux.hooks";
import HeaderButtons from "./header-buttons.component";
import { RootState } from "@/store";
import { useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { buttonHandlers } from "./top-buttons.utils";

const PageTopActions: React.FC = () => {
  const { headerTitle, buttons } = useAppSelector(
    (state: RootState) => state.ui
  );

  const isMobile = useIsMobile();

  const handleButtonClick = useCallback(async (buttonId: string) => {
    const handler = buttonHandlers.get(buttonId);
    if (handler) await handler();
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {headerTitle}
      </h2>

      <div className="flex items-center gap-2">
        <HeaderButtons
          buttons={buttons}
          onButtonClick={handleButtonClick}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default PageTopActions;
