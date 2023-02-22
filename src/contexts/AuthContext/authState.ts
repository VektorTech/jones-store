import type {
  CartType,
  UserProducts,
  UserTypeNormalized,
  UserType,
  WishlistType,
  ProductComponentType,
} from "src/types/shared";

import { useEffect, useReducer } from "react";
import {
  deleteWishlistItem,
  postWishlistItem,
  postCartItem,
  deleteCartItem,
  emptyUserCart,
} from "./api";

import { normalizeUserProductItems } from "src/helpers";

export const initUser: UserTypeNormalized = {
  id: "",
  avatarURL: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  deactivated: false,
  wishlist: {
    productIds: [],
    items: {},
    count: 0,
    total: 0,
    shippingTotal: 0,
  },
  cart: {
    productIds: [],
    items: {},
    count: 0,
    total: 0,
    shippingTotal: 0,
  },
  isAuth: false,
  processing: false,
};

enum UserActions {
  SET_USER,
  ADD_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  EMPTY_CART,
  START_PROCESSING,
  STOP_PROCESSING,
}

const authReducer = (
  user: UserTypeNormalized,
  action: { type: UserActions; payload: any }
) => {
  switch (action.type) {
    case UserActions.SET_USER: {
      return { ...user, ...action.payload };
    }
    case UserActions.ADD_WISHLIST_ITEM: {
      const newProductIds = [
        ...user.wishlist.productIds.filter(
          (id) => id != action.payload.productId
        ),
        action.payload.productId,
      ];
      const newItems: UserProducts<WishlistType>["items"] = {
        ...user.wishlist.items,
        [action.payload.productId]: {
          ...user.wishlist.items[action.payload.productId],
          ...action.payload,
        },
      };
      const newTotal = newProductIds.reduce(
        (_total, id) => newItems[id].product.price + _total,
        0
      );
      const newShippingTotal = newProductIds.reduce(
        (_total, id) => newItems[id].product.shippingCost + _total,
        0
      );

      return {
        ...user,
        wishlist: {
          productIds: newProductIds,
          items: newItems,
          count: newProductIds.length,
          total: newTotal,
          shippingTotal: newShippingTotal,
        },
      };
    }
    case UserActions.ADD_CART_ITEM: {
      const newProductIds = [
        ...user.cart.productIds.filter((id) => id != action.payload.productId),
        action.payload.productId,
      ];
      const newItems: UserProducts<CartType>["items"] = {
        ...user.cart.items,
        [action.payload.productId]: {
          ...user.cart.items[action.payload.productId],
          ...action.payload,
        },
      };
      const newTotal = newProductIds.reduce(
        (_total, id) => newItems[id].total + _total,
        0
      );
      const newShippingTotal = newProductIds.reduce(
        (_total, id) => newItems[id]?.product.shippingCost + _total,
        0
      );

      return {
        ...user,
        cart: {
          productIds: newProductIds,
          items: newItems,
          count: newProductIds.length,
          total: newTotal,
          shippingTotal: newShippingTotal,
        },
      };
    }
    case UserActions.REMOVE_WISHLIST_ITEM: {
      const newProductIds = user.wishlist.productIds.filter(
        (id) => id != action.payload
      );
      const newItems: UserProducts<WishlistType>["items"] = {
        ...user.wishlist.items,
        [action.payload]: null,
      };
      const newTotal = newProductIds.reduce(
        (_total, id) => newItems[id].product.price + _total,
        0
      );
      const newShippingTotal = newProductIds.reduce(
        (_total, id) => newItems[id].product.shippingCost + _total,
        0
      );

      return {
        ...user,
        wishlist: {
          productIds: newProductIds,
          items: newItems,
          count: newProductIds.length,
          total: newTotal,
          shippingTotal: newShippingTotal,
        },
      };
    }
    case UserActions.REMOVE_CART_ITEM: {
      const newProductIds = user.cart.productIds.filter(
        (id) => id != action.payload
      );
      const newItems: UserProducts<CartType>["items"] = {
        ...user.cart.items,
        [action.payload]: null,
      };
      const newTotal = newProductIds.reduce(
        (_total, id) => newItems[id].total + _total,
        0
      );
      const newShippingTotal = newProductIds.reduce(
        (_total, id) => newItems[id].product.shippingCost + _total,
        0
      );

      return {
        ...user,
        cart: {
          productIds: newProductIds,
          items: newItems,
          count: newProductIds.length,
          total: newTotal,
          shippingTotal: newShippingTotal,
        },
      };
    }
    case UserActions.EMPTY_CART:
      return { ...user, ...action.payload };
    case UserActions.START_PROCESSING:
      return { ...user, processing: true };
    case UserActions.STOP_PROCESSING:
      return { ...user, processing: false };
    default:
      return user;
  }
};

export default function useUser(currentUser: UserType) {
  const [userState, updateUser] = useReducer<
    (
      state: UserTypeNormalized,
      action: { type: UserActions; payload: any }
    ) => UserTypeNormalized
  >(authReducer, initUser);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const user = {
      ...currentUser,
      cart: normalizeUserProductItems(currentUser.cart),
      wishlist: normalizeUserProductItems(currentUser.wishlist),
    };

    if (currentUser.id != "guest") {
      updateUser({
        type: UserActions.SET_USER,
        payload: { ...user, isAuth: true },
      });
    } else {
      updateUser({
        type: UserActions.SET_USER,
        payload: { ...user },
      });
    }
  }, [currentUser]);

  const addWishlistItem = async (product: ProductComponentType) => {
    try {
      updateUser({
        type: UserActions.START_PROCESSING,
        payload: null,
      });
      updateUser({
        type: UserActions.ADD_WISHLIST_ITEM,
        payload: { product, productId: product.id, userId: userState.id },
      });
      const res = await postWishlistItem(product.id);
      if (res.error) throw new Error(res.message);
    } catch (err) {
      updateUser({
        type: UserActions.REMOVE_WISHLIST_ITEM,
        payload: product.id,
      });
    } finally {
      updateUser({
        type: UserActions.STOP_PROCESSING,
        payload: null,
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

  const emptyCart = () => {
    emptyUserCart();
    updateUser({
      type: UserActions.EMPTY_CART,
      payload: { cart: initUser.cart },
    });
  };

  const useSelector = (callback: (user: UserTypeNormalized) => void) =>
    callback(userState);

  return {
    user: userState,
    addWishlistItem,
    removeWishlistItem,
    addCartItem,
    removeCartItem,
    emptyCart,
    setAuthUser: (user: UserTypeNormalized) => {
      updateUser({
        type: UserActions.SET_USER,
        payload: { ...user },
      });
    },
    useSelector,
  };
}
