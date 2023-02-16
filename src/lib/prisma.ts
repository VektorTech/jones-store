import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient =
  global.prisma || (typeof window == "undefined" && new PrismaClient());

if (process.env.NODE_ENV === "production") {
  global.prisma = prisma;
}

export default prisma;
