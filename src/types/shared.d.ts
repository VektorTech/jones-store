import { User, Wishlist, Product, CartItem, Review } from "@prisma/client";

export type HTTPMethods = "GET" | "POST" | "PUT" | "DELETE";

export interface DefaultResponse {
  error?: boolean;
  success?: boolean;
  message: string | string[];
  data?: unknown;
}

export type WishlistType = Wishlist & { product: Product };
export type CartType = CartItem & { product: Product };

export interface UserProducts<T extends WishlistType | CartType> {
  productIds: string[];
  items: { [productId: string]: T };
  count: number;
  total: number;
  shippingTotal: number;
}

export type UserTypeNormalized = Partial<User> & {
  wishlist: UserProducts<WishlistType>;
  cart: UserProducts<CartType>;
  isAuth: boolean;
  processing: boolean;
};

export type UserType = Partial<User> & {
  wishlist: WishlistType[];
  cart: CartType[];
  isAuth: boolean;
};

export interface ProductComponentType extends Product {
  small?: boolean;
  blurDataUrl?: string;
  ratings: number;
  dateAdded: string;
}

export type AsyncAPIHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => Promise<void>;
