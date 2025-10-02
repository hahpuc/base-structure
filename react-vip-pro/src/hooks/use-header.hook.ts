import {
  registerButtonHandler,
  unregisterButtonHandler,
} from "@/components/top-actions/top-buttons.utils";
import { useAppDispatch } from "./redux.hooks";
import { setButtons, setHeaderTitle } from "@/store/slices/ui.slice";
import { useEffect } from "react";
import { HeaderButton } from "@/components/top-actions/types/top-button.type";

export interface HeaderButtonWithHandler extends Omit<HeaderButton, "id"> {
  id: string;
  handler: () => Promise<void> | void;
}

export const useHeader = (
  title: string,
  buttons: HeaderButtonWithHandler[] = []
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Set header title
    dispatch(setHeaderTitle(title));

    // Register button handlers
    buttons.forEach((button) => {
      registerButtonHandler(button.id, button.handler);
    });

    // Set buttons in Redux (without handlers)
    const buttonsForRedux: HeaderButton[] = buttons.map(
      ({ handler: _handler, ...button }) => button
    );
    dispatch(setButtons(buttonsForRedux));

    // Cleanup on unmount
    return () => {
      buttons.forEach((button) => {
        unregisterButtonHandler(button.id);
      });
    };
  }, [dispatch, title, buttons]);
};

export default useHeader;
