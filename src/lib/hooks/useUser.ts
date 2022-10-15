import { deleteWishlistItem, postWishlistItem, postCartItem, deleteCartItem } from "@Lib/helpers";
import { useEffect, useReducer } from "react";
import { UserType } from "src/types/shared";
import useSWR from "swr";

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
};

const actions = {
  SET_USER: "SET_USER",
  ADD_WISHLIST_ITEM: "ADD_WISHLIST_ITEM",
  REMOVE_WISHLIST_ITEM: "REMOVE_WISHLIST_ITEM",
  ADD_CART_ITEM: "ADD_CART_ITEM",
  REMOVE_CART_ITEM: "REMOVE_CART_ITEM"
};

type ActionsType = keyof typeof actions;

const authReducer = (
  user: UserType,
  action: { type: ActionsType; payload: any }
) => {
  switch (action.type) {
    case actions.SET_USER:
      return action.payload;
    case actions.ADD_WISHLIST_ITEM:
      return { ...user, wishlist: [...user.wishlist, action.payload] };
    case actions.ADD_CART_ITEM:
      return { ...user, cart: [...user.cart, action.payload] };
    case actions.REMOVE_WISHLIST_ITEM:
      return {
        ...user,
        wishlist: user.wishlist.filter(
          ({ productId = "" }) => productId != action.payload
        ),
      };
    case actions.REMOVE_CART_ITEM:
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

const fetcher = (...args: [any, any]) =>
  fetch(...args).then((res) => res.json());

export default function useUser(id?: string) {
  const { data, error } = useSWR(id ? `/api/auth/user/${id}` : "", fetcher);
  const [userState, updateUser] = useReducer(authReducer, initUser);

  useEffect(() => {
    updateUser({
      type: actions.SET_USER as ActionsType,
      payload: data?.data || {},
    });
  }, [data]);

  const addWishlistItem = async (id: string) => {
    const r = await postWishlistItem(id);
    if (!r.error) {
      updateUser({
        type: actions.ADD_WISHLIST_ITEM as ActionsType,
        payload: r.data,
      });
    }
  };

  const removeWishlistItem = async (id: string) => {
    const r = await deleteWishlistItem(id);
    if (!r.error) {
      updateUser({
        type: actions.REMOVE_WISHLIST_ITEM as ActionsType,
        payload: id,
      });
    }
  };

  const addCartItem = async (id: string, quantity: number, size: number) => {
    const r = await postCartItem(id, quantity, size);
    if (!r.error) {
      updateUser({
        type: actions.ADD_CART_ITEM as ActionsType,
        payload: r.data,
      });
    }
  };

  const removeCartItem = async (id: string) => {
    const r = await deleteCartItem(id);
    if (!r.error) {
      updateUser({
        type: actions.REMOVE_CART_ITEM as ActionsType,
        payload: id,
      });
    }
  };

  const useSelector = (callback: (user: UserType) => void) =>
    callback(userState);

  return {
    user: userState,
    isError: error,
    addWishlistItem,
    removeWishlistItem,
    addCartItem,
    removeCartItem,
    useSelector,
  };
}
