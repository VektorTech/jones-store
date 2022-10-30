import { User, Wishlist, Product, CartItem } from "@prisma/client";

/* Shared */
export interface DefaultResponse {
  error?: boolean;
  success?: boolean;
  message: string | string[];
  data?: unknown;
}

export type UserType = Partial<User> & {
  wishlist: Wishlist[] | never[];
  cart: CartItem[] | never[];
  isAuth: boolean;
};

export interface ProductComponentType extends Product {
  small?: boolean;
}

export type AsyncAPIHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => Promise<void>;
