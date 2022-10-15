import { User, Wishlist, Product, CartItem } from "@prisma/client";

/* Shared */
export interface DefaultResponse {
  error?: boolean;
  message: string | string[];
  data?: unknown;
}

export type UserType = Partial<User> & {
  wishlist: Wishlist[] | never[];
  cart: CartItem[] | never[]
};

export interface ProductComponentType extends Product {
  small?: boolean;
}
