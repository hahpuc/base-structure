import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  HeaderButton,
  registerButtonHandler,
  unregisterButtonHandler,
} from '@/components/layouts/main/components/header-buttons.component';
import { AppDispatch } from '@/store';
import { setButtons, setHeaderTitle } from '@/store/slices/ui.slice';

export interface HeaderButtonWithHandler extends Omit<HeaderButton, 'id'> {
  id: string;
  handler: () => Promise<void> | void;
}

export const useHeader = (title: string, buttons: HeaderButtonWithHandler[] = []) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Set header title
    dispatch(setHeaderTitle(title));

    // Register button handlers
    buttons.forEach(button => {
      registerButtonHandler(button.id, button.handler);
    });

    // Set buttons in Redux (without handlers)
    const buttonsForRedux: HeaderButton[] = buttons.map(
      ({ handler: _handler, ...button }) => button
    );
    dispatch(setButtons(buttonsForRedux));

    // Cleanup on unmount
    return () => {
      buttons.forEach(button => {
        unregisterButtonHandler(button.id);
      });
    };
  }, [dispatch, title, buttons]);
};

export default useHeader;
