import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Router } from "next/router";

export enum DialogType {
  SIDEBAR_DIALOG,
  CART,
  SEARCH_BOX,
  MODAL_ANNOUNCEMENT,
  MODAL_LANG_CURRENCY,
  MODAL_PRODUCT_VIEW,
  MODAL_SHARE,
}

const uiState: {
  announcementVisible?: boolean;
  currentDialog?: DialogType | null;
  setDialog: Dispatch<SetStateAction<DialogType | null>>;
  setAnnouncementVisible: Dispatch<SetStateAction<boolean>>;
} = {
  announcementVisible: true,
  currentDialog: undefined,
  setDialog: () => {},
  setAnnouncementVisible: () => {},
};

const UIContext = createContext(uiState);

export function useDialog(
  observer?: (isVisible: boolean, currentState?: DialogType | null) => void,
  dialogDeps?: DialogType[]
) {
  const _uiState = useContext(UIContext);

  useEffect(() => {
    const isVisible = dialogDeps?.includes(
      _uiState.currentDialog as DialogType
    );
    observer?.(!!isVisible, _uiState.currentDialog);
  }, [_uiState, observer, dialogDeps]);

  return _uiState;
}

export function useAnnouncementState(): [
  announcementVisible: boolean,
  setAnnouncementVisible: Dispatch<SetStateAction<boolean>>
] {
  const { announcementVisible = false, setAnnouncementVisible } =
    useContext(UIContext);
  return [announcementVisible, setAnnouncementVisible];
}

export const UIProvider = ({
  children,
  announcementHidden = true,
}: {
  children: ReactElement;
  announcementHidden: boolean;
}) => {
  const [currentDialog, setDialog] = useState<DialogType | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(
    !announcementHidden
  );

  useEffect(() => {
    const clearDialogState = () => setDialog(null);
    Router.events.on("routeChangeStart", clearDialogState);
    return () => Router.events.off("routeChangeStart", clearDialogState);
  }, [currentDialog]);

  return (
    <UIContext.Provider
      value={{
        announcementVisible,
        currentDialog,
        setDialog,
        setAnnouncementVisible,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
