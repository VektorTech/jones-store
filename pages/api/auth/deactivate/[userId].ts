import type { NextApiRequest, NextApiResponse } from "next";
import type { DefaultResponse } from "src/types/shared";

import prisma from "@Lib/prisma";
import RouteHandler from "@Lib/RouteHandler";
import { isAuthorizedUser } from "@Lib/apiMiddleware";

async function deactivateUserRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  const { userId } = req.query;

  await prisma.user.update({
    where: { id: userId as string },
    data: { deactivated: false },
  });

  res.json({ message: "User Deactivation Successful" });
}

export default RouteHandler().delete(isAuthorizedUser, deactivateUserRoute);
