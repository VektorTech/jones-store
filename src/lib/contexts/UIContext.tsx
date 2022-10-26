import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

export const Dialogs = {
  SIDEBAR_DIALOG: "SIDEBAR_DIALOG",
  MODAL_POPUP: "MODAL_POPUP",
  SEARCH_BOX: "SEARCH_BOX",
  PRODUCTS_FILTER: "PRODUCTS_FILTER",
};

export type DialogStates = keyof typeof Dialogs | null;

const uiState: {
  announcementVisible?: boolean;
  currentDialog?: DialogStates;
  setDialog: Dispatch<SetStateAction<DialogStates>>;
  setAnnouncementVisible: Dispatch<SetStateAction<boolean>>;
} = {
  announcementVisible: true,
  currentDialog: undefined,
  setDialog: () => {},
  setAnnouncementVisible: () => {},
};

const UIContext = createContext(uiState);

export function useDialog(
  observer?: (isVisible: boolean, currentState?: DialogStates) => void,
  dialogDeps?: DialogStates[]
) {
  const _uiState = useContext(UIContext);

  useEffect(() => {
    const isVisible = dialogDeps?.includes(
      _uiState.currentDialog as DialogStates
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
  const [currentDialog, setDialog] = useState<DialogStates>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(
    !announcementHidden
  );
  const router = useRouter();

  useEffect(() => {
    const clearDialogState = () => setDialog(null);
    router.events.on("routeChangeStart", clearDialogState);
    return () => router.events.off("routeChangeStart", clearDialogState);
  }, [router]);

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
