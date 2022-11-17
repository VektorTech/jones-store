import type { NextApiRequest, NextApiResponse } from "next";

import { DefaultResponse } from "src/types/shared";
import RouteHandler from "@Lib/RouteHandler";
import { isAuthenticated } from "@Lib/apiMiddleware";
import { ServerError } from "@Lib/utils";

async function signoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { user } = req.session;

  if (user) {
    req.session.destroy();

    return res.json({
      success: true,
      message: `User, ${user?.username} Sign Out Successful`,
    });
  }
  next(new ServerError("Unauthorized", 401));
}

export default RouteHandler().get(isAuthenticated, signoutRoute);
