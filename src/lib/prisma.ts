import { PrismaClient } from "@prisma/client";

/*
const prisma: PrismaClient =
  global.prisma || (typeof window == "undefined" && new PrismaClient());

if (process.env.NODE_ENV === "production") {
  global.prisma = prisma;
}
*/

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production" && typeof window == "undefined") {
  prisma = global.prisma || new PrismaClient();
} else {
  if (!global.prisma && typeof window == "undefined") {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
