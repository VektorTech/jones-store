import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

if (process.env.NODE_ENV != "production" && !global.prisma) {
  global.prisma = prisma;
}

export default prisma;
