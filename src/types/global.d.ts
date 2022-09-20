declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      username?: string;
      role: string;
    };
  }
}

export declare global {
  var prisma: PrismaClient;
}
