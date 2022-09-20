// see https://nextjs.org/docs/advanced-features/middleware for more information.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";

import { sessionOptions } from "@lib/config";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;

  if (req.nextUrl.pathname.startsWith("/signin")) {
    if (user) {
      return NextResponse.redirect(new URL(req.url).origin);
    }
  }

  return res;
}

export const config = {
  matcher: ["/signin"],
};
