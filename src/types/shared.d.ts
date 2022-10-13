import { User, Wishlist, Product } from "@prisma/client";

/* Shared */
export interface DefaultResponse {
  error?: boolean;
  message: string | string[];
  data?: unknown;
}

export type UserType = Partial<User> & {
  wishlist: Wishlist[] | never[];
};

export interface ProductComponentType extends Product {
  small?: boolean;
}
