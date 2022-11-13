declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      username?: string;
      role: string;
    };
    guest?: {
      id: "guest";
      wishlist: { userId: "guest"; productId: string; product: Product }[];
      cart: {
        cartId: "guest-cart";
        productId: string;
        product: Product;
        size: number;
        quantity: number;
        total: number;
      }[];
    };
  }
}

export declare global {
  var prisma: PrismaClient;
}
