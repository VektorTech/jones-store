export function postWishlistItem(id: string) {
  return fetch("/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ productId: id }),
  }).then((res) => res.json());
}

export function deleteWishlistItem(id: string) {
  return fetch("/api/wishlist", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ productId: id }),
  }).then((res) => res.json());
}

export function postCartItem(id: string, quantity: number, size: number) {
  return fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      productId: id,
      qty: quantity.toString(),
      size: size.toString(),
    }),
  }).then((res) => res.json());
}

export function deleteCartItem(id: string) {
  return fetch("/api/cart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ productId: id }),
  }).then((res) => res.json());
}

export function emptyUserCart() {
  return fetch("/api/cart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ empty: "true" }),
  }).then((res) => res.json());
}
