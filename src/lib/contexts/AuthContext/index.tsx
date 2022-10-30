import { createContext, ReactElement, useContext } from "react";
import useUser from "./useUser";
import { UserType } from "src/types/shared";

const authState: {
  user?: UserType;
  addToWishlist: (id: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  addToCart: (id: string, quantity: number, size: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  useSelector: (callback: (user: UserType) => void) => void;
} = {
  user: undefined,

  addToWishlist: (id) => Promise.resolve(),
  removeFromWishlist: (id) => Promise.resolve(),
  addToCart: (id, quantity, size) => Promise.resolve(),
  removeFromCart: (id) => Promise.resolve(),
  useSelector: () => null,
};

const AuthContext = createContext(authState);

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
    useSelector,
  } = useUser(currentUser);

  return (
    <AuthContext.Provider
      value={{
        useSelector,
        addToWishlist: addWishlistItem,
        removeFromWishlist: removeWishlistItem,
        addToCart: addCartItem,
        removeFromCart: removeCartItem,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
