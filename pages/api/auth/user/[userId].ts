import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { withSessionRoute } from "@Lib/withSession";
import { Role } from "@prisma/client";
import { DefaultResponse } from "src/types/shared";

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "GET") {
	const { userId } = req.query;
	const { user } = req.session;

	const isAuthorized = userId && user && (userId == user?.id || user?.role == Role.ADMIN);

    if (isAuthorized) {
	  prisma.user.findUnique({
		select: {
			id: true,
			avatarURL: true,
			username: true,
			email: true,
			firstName: true,
			lastName: true,
			phoneNumber: true,
			deactivated: true
		},
		where: { id: userId as string },
	  })
	  .then(userData => {
		if (userData == null) {
			return res.json({ message: "No User Found!", data: {} });
		}
		res.json({ message: "Successfully Retrieved User Record", data: userData });
	  })
	  .catch(error =>
		res.status(500).json({ message: error.message })
	  );
    } else {
		res.status(401).json({ error: true, message: "Unauthorized Request" });
	}
  } else {
	res.status(404).json({ error: true, message: "Not Found" });
  }
}

export default withSessionRoute(userRoute);
