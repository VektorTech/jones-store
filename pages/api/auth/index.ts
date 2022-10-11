import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { withSessionRoute } from "@Lib/withSession";
import { Role } from "@prisma/client";
import { DefaultResponse } from "src/types/shared";

async function usersRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "GET") {
    const { user } = req.session;
    const { offset = 0, limit = 10 } = req.query;
    const isAuthorized = user?.role == Role.ADMIN;

    if (isAuthorized) {
      prisma.user
        .findMany({
          skip: offset as number,
          take: limit as number,
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
        })
        .then((users) =>
          res.json({ message: "Successfully Retrieved Users", data: users })
        )
        .catch((error) =>
          res.status(500).json({ error: true, message: error.message })
        );
    } else {
      res.status(401).json({ error: true, message: "Unauthorized Request" });
    }
  } else {
    res.status(404).json({ error: true, message: "Not Found" });
  }
}

export default withSessionRoute(usersRoute);
