import type { NextApiRequest, NextApiResponse } from "next";

import { DefaultResponse } from "src/types/shared";
import { RouteHandler } from "@Lib/RouteHandler";
import { isAuthenticated } from "@Lib/apiMiddleware";

async function signoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { user } = req.session;

  req.session.destroy();

  res.json({
    success: true,
    message: `User, ${user?.username} Sign Out Successful`,
  });
}

export default new RouteHandler()
  .get(isAuthenticated, signoutRoute)
  .init();
