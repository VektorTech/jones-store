import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import { RouteHandler } from "@Lib/RouteHandler";
import { isAuthorizedUser } from "@Lib/apiMiddleware";

async function deactivateUserRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { userId } = req.query;

  await prisma.user
    .update({
      where: { id: userId as string },
      data: { deactivated: false },
    });

  res.json({ message: "User Deactivation Successful" });
}

export default new RouteHandler()
 .delete(isAuthorizedUser, deactivateUserRoute)
 .init();
