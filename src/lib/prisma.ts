import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production" && typeof window == "undefined") {
  if (global.prisma) {
    prisma = global.prisma;
  } else {
    prisma = new PrismaClient();
    global.prisma = prisma;
  }
} else {
  if (!global.prisma && typeof window == "undefined") {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
