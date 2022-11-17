import type { NextApiRequest, NextApiResponse } from "next";
import type { DefaultResponse } from "src/types/shared";
import { Role } from "@prisma/client";

import RouteHandler from "@Lib/RouteHandler";
import prisma from "@Lib/prisma";
import { authorizeRole, isAuthenticated } from "@Lib/apiMiddleware";

async function usersRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
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

export default RouteHandler().get(
  isAuthenticated,
  authorizeRole(Role.ADMIN),
  usersRoute
);
