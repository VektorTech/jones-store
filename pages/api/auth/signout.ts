import type { NextApiRequest, NextApiResponse } from "next";

import { withSessionRoute } from "@Lib/withSession";
import { DefaultResponse } from "src/types/shared";

async function signoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "GET") {
	const { user } = req.session;
	if (user) {
		req.session.destroy();
		return res.json({ message: `User, ${user.username} Sign Out Successful` });
	}
	res.json({ message: "No User Found" });
  } else res.status(404).json({ error: true, message: "Not Found" });
}

export default withSessionRoute(signoutRoute);
