import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { withSessionRoute } from "@Lib/withSession";
import { Role } from "@prisma/client";
import { DefaultResponse } from "src/types/shared";

async function deactivateUserRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "DELETE") {
	const { userId } = req.query;
	const { user } = req.session;

	const isAuthorized = userId && user && (userId == user?.id || user?.role == Role.ADMIN);

    if (isAuthorized) {
      prisma.user.update({
		where: { id: userId as string },
		data: { deactivated: false }
	  })
	  .then(() => res.json({ message: "User Deactivation Successful" }))
	  .catch((error) =>
		res.status(500).json({ error: true, message: error.message })
	  );
    } else
      res.status(401).json({ error: true, message: "Unauthorized Request" });
  } else res.status(404).json({ error: true, message: "Not Found" });
}

export default withSessionRoute(deactivateUserRoute);
