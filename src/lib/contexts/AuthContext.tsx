import { createContext, ReactElement, useContext } from "react";
import useUser from "@Lib/hooks/useUser";
import { UserType } from "src/types/shared";

const authState: {
  userSessionId?: string;
  user?: UserType;
  isLoading?: boolean;
  isError?: boolean;
  addToWishlist: (id: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  addToCart: (id: string, quantity: number, size: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  useSelector: (callback: (user: UserType) => void) => void;
} = {
  userSessionId: undefined,
  user: undefined,
  isLoading: undefined,
  isError: undefined,

  addToWishlist: (id) => Promise.resolve(),
  removeFromWishlist: (id) => Promise.resolve(),
  addToCart: (id, quanity, size) => Promise.resolve(),
  removeFromCart: (id) => Promise.resolve(),
  useSelector: () => null,
};

const AuthContext = createContext(authState);

export const useAuthState = () => useContext(AuthContext);

export const AuthProvider = ({
  children,
  userId,
}: {
  children: ReactElement;
  userId?: string;
}) => {
  const { user, isError, addWishlistItem, removeWishlistItem, addCartItem, removeCartItem, useSelector } =
    useUser(userId);

  return (
    <AuthContext.Provider
      value={{
        useSelector,
        addToWishlist: addWishlistItem,
        removeFromWishlist: removeWishlistItem,
        addToCart: addCartItem,
        removeFromCart: removeCartItem,
        userSessionId: userId,
        user,
        isLoading: !user,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
