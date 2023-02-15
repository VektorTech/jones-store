import type { NextApiRequest, NextApiResponse } from "next";
import { Role } from "@prisma/client";

import { ServerError } from "../utils";

export const authorizeRole =
  (role: Role) =>
  async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    const { user } = req.session;

    if (user?.role == role) {
      return next();
    }

    throw new ServerError(
      `${user?.role} Is Not Allowed To Access This Resources`,
      401
    );
  };

export const isAuthenticated = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const { user } = req.session;

  if (user) {
    return next();
  }

  throw new ServerError("Unauthorized Request", 401);
};

export const isAuthorizedUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const { userId } = req.query;
  const { user } = req.session;

  const isAuthorized =
    userId && user && (userId == user?.id || user?.role == Role.ADMIN);

  if (isAuthorized) {
    return next();
  }

  throw new ServerError("Unauthorized Request", 401);
};

export const checkGuest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  const { user, guest } = req.session;

  if (!user && !guest) {
    req.session.guest = {
      id: "guest",
      cart: [],
      wishlist: [],
    };
    await req.session.save();
  }
  return next();
};
