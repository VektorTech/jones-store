import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { withSessionRoute } from "@Lib/withSession";
import { DefaultResponse } from "src/types/shared";

async function profileRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "GET") {
	const { user } = req.session;

	if (user) {
		const currentUser = await prisma.user.findUnique({ where: { id: user?.id } })
			.catch(error => res.status(500).json({ message: error.message }));
		if (currentUser) {
			return res.json({ message: "Successfully Retrieved User Record", data: currentUser });
		}
	} else
		res.status(401).json({ error: true, message: "Unauthorized Request" });
  } else res.status(404).json({ error: true, message: "Not Found" });
}

export default withSessionRoute(profileRoute);
