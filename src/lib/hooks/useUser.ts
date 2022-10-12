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
};

const actions = {
  SET_USER: "SET_USER",
  ADD_WISHLIST_ITEMS: "ADD_WISHLIST_ITEMS",
  REMOVE_WISHLIST_ITEMS: "REMOVE_WISHLIST_ITEMS",
};

type ActionsType = keyof typeof actions;

const userReducer = (user: UserType, action: { type: ActionsType, payload: any }) => {
  switch (action.type) {
    case actions.SET_USER:
      return action.payload;
    case actions.ADD_WISHLIST_ITEMS:
      return { ...user, wishlist: [...user.wishlist, action.payload] };
    case actions.REMOVE_WISHLIST_ITEMS:
      return { ...user, wishlist: user.wishlist.filter(({productId = ""}) => productId != action.payload) };
    default:
      throw new Error();
  }
};

const fetcher = (...args: [any, any]) =>
  fetch(...args).then((res) => res.json());

export default function useUser(id?: string) {
  const { data, error } = useSWR(id ? `/api/auth/user/${id}` : "", fetcher);

  const [userState, updateUser] = useReducer(userReducer, initUser)

  const addWishlistItem = async (id: string) => {
    const r = await _addWishlistItem(id);
    if (!r.error) {
      updateUser({ type: actions.ADD_WISHLIST_ITEMS as ActionsType, payload: r.data })
    }
  }

  const removeWishlistItem = async (id: string) => {
    const r = await _removeWishlistItem(id);
    if (!r.error) {
      updateUser({ type: actions.REMOVE_WISHLIST_ITEMS as ActionsType, payload: id })
    }
  };

  useEffect(() => {
    updateUser({ type: actions.SET_USER as ActionsType, payload: data?.data || {} });
  }, [data])


  return {
    user: userState,
    isError: error,
    addWishlistItem,
    removeWishlistItem
  };
}

function _addWishlistItem (id: string) {
  return fetch("/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ productId: id }),
  }).then(res => res.json())
    .catch(console.log);
}

function _removeWishlistItem (id: string) {
  return fetch("/api/wishlist", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ productId: id }),
  }).then(res => res.json())
    .catch(console.log);
}