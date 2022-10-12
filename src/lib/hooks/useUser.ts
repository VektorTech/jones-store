import { useEffect, useState } from "react";
import useSWR from "swr";

const _addWishlistItem = (id: string) => {
  return fetch("/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ productId: id }),
  }).then(res => res.json())
    .catch(console.log);
};

const _removeWishlistItem = (id: string) => {
  return fetch("/api/wishlist", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ productId: id }),
  }).then(res => res.json())
    .catch(console.log);
};


const fetcher = (...args: [any, any]) =>
  fetch(...args).then((res) => res.json());

export default function useUser(id?: string) {
  const { data, error } = useSWR(id ? `/api/auth/user/${id}` : "", fetcher);
  const [ user, setUser ] = useState(data?.data || {});

  const addWishlistItem = async (id: string) => {
    const r = await _addWishlistItem(id);

    if (!r.error) {
      setUser({ ...user, wishlist: [...user.wishlist, r.data] })
    }
  }

  const removeWishlistItem = async (id: string) => {
    const r = await _removeWishlistItem(id);

    if (!r.error) {
      setUser({ ...user, wishlist: user.wishlist.filter(({productId = ""}) => productId != id) })
    }
  };

  useEffect(() => {
    setUser(data?.data || {});
  }, [data])


  return {
    user,
    isError: error,
    addWishlistItem,
    removeWishlistItem
  };
}
