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
import { CurrencyRate } from "@prisma/client";
import { formatCurrency } from "src/i18n";
import useLocalStorage from "@Hooks/useLocalStorage";

export enum DialogType {
  SIDEBAR_DIALOG,
  CART,
  SEARCH_BOX,
  MODAL_ANNOUNCEMENT,
  MODAL_LANG_CURRENCY,
  MODAL_PRODUCT_VIEW,
  MODAL_SHARE,
}

export enum CurrencyType {
  USD = "USD",
  CAD = "CAD",
  GBP = "GBP",
  EUR = "EUR",
  JMD = "JMD",
}
type CurrencyTypes = keyof typeof CurrencyType;

interface UIStateType {
  announcementVisible?: boolean;
  currentDialog?: DialogType | null;
  currencyRates?: Record<CurrencyTypes, number>;
  currency: CurrencyType;
  setDialog: Dispatch<SetStateAction<DialogType | null>>;
  setAnnouncementVisible: Dispatch<SetStateAction<boolean>>;
  setCurrency: (value: CurrencyType) => void;
}

const uiState = {
  announcementVisible: true,
  currentDialog: undefined,
  currency: CurrencyType.USD,
  setDialog: () => {},
  setAnnouncementVisible: () => {},
  setCurrency: () => {},
};

const UIContext = createContext<UIStateType>(uiState);

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

export function useCurrencyState(): {
  currency: CurrencyType;
  setCurrency: (value: CurrencyType) => void;
  currencyRates: UIStateType["currencyRates"];
} {
  const { currency, setCurrency, currencyRates } = useContext(UIContext);
  return { currency, setCurrency, currencyRates };
}

export const useCurrencyFormatter = () => {
  const { currency, currencyRates } = useContext(UIContext);
  return function format(amount: number) {
    return formatCurrency(currency, (currencyRates?.[currency] || 1) * amount);
  };
};

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
  currencyRates,
}: {
  children: ReactElement;
  announcementHidden: boolean;
  currencyRates: CurrencyRate[];
}) => {
  const [currentDialog, setDialog] = useState<DialogType | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(
    !announcementHidden
  );
  const [currency, setCurrency] = useLocalStorage<CurrencyType>(
    "currency",
    CurrencyType.USD
  );
  useEffect(() => {
    const clearDialogState = () => setDialog(null);
    Router.events.on("routeChangeStart", clearDialogState);
    return () => Router.events.off("routeChangeStart", clearDialogState);
  }, [currentDialog]);

  const currencyRatesObj = currencyRates.reduce<UIStateType["currencyRates"]>(
    (obj, current) => {
      if (obj) obj[current.symbol as CurrencyTypes] = current.rate;
      return obj;
    },
    Object.create({})
  );

  return (
    <UIContext.Provider
      value={{
        announcementVisible,
        currentDialog,
        currency,
        currencyRates: currencyRatesObj,
        setDialog,
        setAnnouncementVisible,
        setCurrency,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
