import type { CartType, UserProducts, WishlistType } from "src/types/shared";
import type { PrismaClient } from "@prisma/client";

import { ObjectSchema, ValidationError } from "yup";

import { CLOUDINARY_CLOUD_NAME } from "./config";

export function validateInputs(
  input: any,
  schema: ObjectSchema<any>
): ValidationError | void {
  try {
    schema.validateSync(input, {
      strict: true,
      stripUnknown: true,
      abortEarly: false,
    });
  } catch (err: unknown) {
    if (err instanceof ValidationError) {
      return err;
    }
  }
}

export const validateInput =
  (schema: ObjectSchema<any>) => (param: string, value: string) => {
    try {
      schema.fields[param].validateSync(value);
      return "";
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        return err.message;
      }
      return "";
    }
  };

export function postWishlistItem(id: string) {
  return fetch("/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ productId: id }),
  })
    .then((res) => res.json())
    .catch(console.log);
}

export function deleteWishlistItem(id: string) {
  return fetch("/api/wishlist", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ productId: id }),
  })
    .then((res) => res.json())
    .catch(console.log);
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
  })
    .then((res) => res.json())
    .catch(console.log);
}

export function deleteCartItem(id: string) {
  return fetch("/api/cart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ productId: id }),
  })
    .then((res) => res.json())
    .catch(console.log);
}

export function emptyUserCart() {
  return fetch("/api/cart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ empty: "true" }),
  })
    .then((res) => res.json())
    .catch(console.log);
}

function isCartType(obj: any): obj is CartType {
  return "cartId" in obj;
}

export const normalizeUserProductItems = (
  items: (CartType | WishlistType)[]
) => {
  return items.reduce(
    (userProducts: UserProducts<CartType | WishlistType>, item) => {
      userProducts.productIds.push(item.productId);
      userProducts.items[item.productId] = item;
      userProducts.count++;
      if (isCartType(item)) {
        userProducts.total += item.total;
      } else {
        userProducts.total += item.product.price - item.product.discount;
      }
      userProducts.shippingTotal += item.product.shippingCost;
      return userProducts;
    },
    {
      productIds: [],
      items: {},
      count: 0,
      total: 0,
      shippingTotal: 0,
    }
  );
};

export const getProductRatings = async (client: PrismaClient, productId: string) => {
  if (typeof window == "undefined") {
    const avgAggregated = await client.review.aggregate({
      where: { productId },
      _avg: { rating: true },
    });

    return avgAggregated._avg.rating ?? 0;
  }
  return 0;
};

export const getBase64UrlCloudinary = async (imageId: string) => {
  try {
    const response = await fetch(
      `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_256/e_blur:20,q_1,f_webp/${imageId}`
    );
    const buffer = await response.arrayBuffer();
    const data = Buffer.from(buffer).toString("base64");
    return `data:image/webp;base64,${data}`;
  } catch (e) {
    console.log(e);
    return "";
  }
};
