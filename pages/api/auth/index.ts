import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import RouteHandler from "@Lib/RouteHandler";
import { authorizeRole, isAuthenticated } from "@Lib/apiMiddleware";
import { Role } from "@prisma/client";

async function usersRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { offset = 0, limit = 10 } = req.query;

  const users = await prisma.user.findMany({
    skip: Number(offset),
    take: Number(limit),
    select: {
      id: true,
      avatarURL: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      deactivated: true,
    },
  });

  res.json({ message: "Successfully Retrieved Users", data: users });
}

export default RouteHandler()
  .get(isAuthenticated, authorizeRole(Role.ADMIN), usersRoute);
