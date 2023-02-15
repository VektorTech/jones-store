import type { UserTypeNormalized, UserType } from "src/types/shared";

import { createContext, ReactElement, useContext } from "react";

import useUser, { initUser } from "./authState";

interface AuthStateType {
  user: UserTypeNormalized;
  addToWishlist: (id: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  addToCart: (id: string, quantity: number, size: number) => Promise<void>;
  emptyCart: () => void;
  removeFromCart: (id: string) => Promise<void>;
  useSelector: (callback: (user: UserTypeNormalized) => void) => void;
  setAuthUser: (user: UserTypeNormalized) => void;
}

const authState: AuthStateType = {
  user: initUser,
  addToWishlist: (id) => Promise.resolve(),
  removeFromWishlist: (id) => Promise.resolve(),
  addToCart: (id, quantity, size) => Promise.resolve(),
  removeFromCart: (id) => Promise.resolve(),
  emptyCart: () => null,
  useSelector: () => null,
  setAuthUser: () => null,
};

const AuthContext = createContext<AuthStateType>(authState);

export const useAuthState = () => useContext(AuthContext);

export const AuthProvider = ({
  children,
  currentUser,
}: {
  children: ReactElement;
  currentUser: UserType;
}) => {
  const {
    user,
    addWishlistItem,
    removeWishlistItem,
    addCartItem,
    removeCartItem,
    emptyCart,
    useSelector,
    setAuthUser,
  } = useUser(currentUser);

  return (
    <AuthContext.Provider
      value={{
        useSelector,
        setAuthUser,
        addToWishlist: addWishlistItem,
        removeFromWishlist: removeWishlistItem,
        addToCart: addCartItem,
        removeFromCart: removeCartItem,
        emptyCart,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
