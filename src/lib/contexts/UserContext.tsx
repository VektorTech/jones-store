import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import useUser from "@Lib/hooks/useUser";
import useSWR from "swr";

const userState: {
  userSessionId?: string;
  user?: {
    id: string;
    avatarURL: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    deactivated: boolean;
    wishlist: any[];
  };
  isLoading?: boolean;
  isError?: boolean;
  addToWishlist: (id: string) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
} = {
  userSessionId: undefined,
  user: undefined,
  isLoading: undefined,
  isError: undefined,

  addToWishlist: (id) => Promise.resolve(),
  removeFromWishlist: (id) => Promise.resolve(),
};

const UserContext = createContext(userState);

export const useUserState = () => useContext(UserContext);

export const UserProvider = ({
  children,
  userId,
}: {
  children: ReactElement;
  userId?: string;
}) => {
  const { user, isError, addWishlistItem, removeWishlistItem } = useUser(userId);

  return (
    <UserContext.Provider
      value={{ addToWishlist: addWishlistItem, removeFromWishlist: removeWishlistItem, userSessionId: userId, user, isLoading: !user, isError }}
    >
      {children}
    </UserContext.Provider>
  );
};
