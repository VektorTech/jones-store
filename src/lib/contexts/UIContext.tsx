import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react";

export const Dialogs = {
	SIDEBAR_DIALOG: "SIDEBAR_DIALOG",
	MODAL_POPUP: "MODAL_POPUP"
};

export type DialogStates = keyof typeof Dialogs | null;

const uiState: {
	announcementVisible?: boolean;
	currentDialog?: DialogStates;
	setDialog: Dispatch<SetStateAction<DialogStates>>;
} = {
	announcementVisible: true,
	currentDialog: undefined,
	setDialog: () => {}
};

const UIContext = createContext(uiState);

export function useDialog(observer?: (isVisible: boolean) => void, dialog?: DialogStates) {
	const _uiState = useContext(UIContext);

	useEffect(() => {
	  observer?.(_uiState.currentDialog == (dialog || Dialogs.SIDEBAR_DIALOG));
	}, [_uiState, observer, dialog]);

	return _uiState;
}

export function useAnnouncementState() {
	const { announcementVisible } = useContext(UIContext);
	return announcementVisible;
}

export const UIProvider = ({ children, announcementHidden = true }: { children: ReactElement, announcementHidden: boolean }) => {
	const [currentDialog, setDialog] = useState<DialogStates>(null);

	return (
	  <UIContext.Provider value={{ announcementVisible: !announcementHidden, currentDialog, setDialog }}>
		{children}
	  </UIContext.Provider>
	);
};