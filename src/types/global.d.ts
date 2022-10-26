declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      username?: string;
      role: string;
    };
    guest?: {
      wishlist: { productId: string }[],
      cart: { productId: string, size: number, quantity: number; total: number; }[]
    };
  }
}

export declare global {
  var prisma: PrismaClient;
}
