// see https://nextjs.org/docs/advanced-features/middleware for more information.

import type { NextRequest } from "next/server";

import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session/edge";

import { sessionOptions } from "@Lib/config";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);
  const { user, guest } = session;

  if (!guest) {
    session.guest = {
      id: "guest",
      cart: [],
      wishlist: [],
    };
    await session.save();
  }

  if (req.nextUrl.pathname.startsWith("/signin")) {
    if (user) {
      return NextResponse.redirect(new URL(req.url).origin);
    }
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!user || user.role != Role.ADMIN) {
      return NextResponse.redirect(new URL(req.url).origin);
    }
  }

  return res;
}

export const config = {
  matcher: ["/signin", "/admin/:path*", "/(.*)"],
};
