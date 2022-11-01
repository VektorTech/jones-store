import {
  deleteWishlistItem,
  postWishlistItem,
  postCartItem,
  deleteCartItem,
} from "@Lib/helpers";
import { useEffect, useReducer } from "react";
import { UserType } from "src/types/shared";

const initUser: UserType = {
  id: "",
  avatarURL: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  deactivated: false,
  wishlist: [],
  cart: [],
  isAuth: false
};

enum UserActions {
  SET_USER,
  ADD_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM
}

const authReducer = (
  user: UserType,
  action: { type: UserActions; payload: any }
) => {
  switch (action.type) {
    case UserActions.SET_USER:
      return { ...user, ...action.payload };
    case UserActions.ADD_WISHLIST_ITEM:
      return {
        ...user,
        wishlist: [
          ...user.wishlist.filter(
            (item) => item.productId != action.payload.productId
          ),
          action.payload,
        ],
      };
    case UserActions.ADD_CART_ITEM:
      return {
        ...user,
        cart: [
          ...user.cart.filter(
            (item) => item.productId != action.payload.productId
          ),
          action.payload,
        ],
      };
    case UserActions.REMOVE_WISHLIST_ITEM:
      return {
        ...user,
        wishlist: user.wishlist.filter(
          ({ productId = "" }) => productId != action.payload
        ),
      };
    case UserActions.REMOVE_CART_ITEM:
      return {
        ...user,
        cart: user.cart.filter(
          ({ productId = "" }) => productId != action.payload
        ),
      };
    default:
      return user;
  }
};

export default function useUser(currentUser?: UserType) {
  const [userState, updateUser] = useReducer(authReducer, initUser);

  useEffect(() => {
    let payload = null;

    if (currentUser?.id) {
      updateUser({
        type: UserActions.SET_USER,
        payload: { ...currentUser, isAuth: true },
      });
    } else {
      Promise.all([
        fetch("/api/wishlist").then((res) => res.json()),
        fetch("/api/cart").then((res) => res.json()),
      ]).then((res) => {
        const [wishlistData, cartData] = res;
        payload = {
          wishlist: wishlistData.data,
          cart: cartData.data,
        };

        updateUser({
          type: UserActions.SET_USER,
          payload,
        });
      });
    }
  }, [currentUser]);

  const addWishlistItem = async (id: string) => {
    const r = await postWishlistItem(id);
    if (!r.error) {
      updateUser({
        type: UserActions.ADD_WISHLIST_ITEM,
        payload: r.data,
      });
    }
  };

  const removeWishlistItem = async (id: string) => {
    const r = await deleteWishlistItem(id);
    if (!r.error) {
      updateUser({
        type: UserActions.REMOVE_WISHLIST_ITEM,
        payload: id,
      });
    }
  };

  const addCartItem = async (id: string, quantity: number, size: number) => {
    const r = await postCartItem(id, quantity, size);
    if (!r.error) {
      updateUser({
        type: UserActions.ADD_CART_ITEM,
        payload: r.data,
      });
    }
  };

  const removeCartItem = async (id: string) => {
    const r = await deleteCartItem(id);
    if (!r.error) {
      updateUser({
        type: UserActions.REMOVE_CART_ITEM,
        payload: id,
      });
    }
  };

  const useSelector = (callback: (user: UserType) => void) =>
    callback(userState);

  return {
    user: userState,
    addWishlistItem,
    removeWishlistItem,
    addCartItem,
    removeCartItem,
    useSelector,
  };
}
