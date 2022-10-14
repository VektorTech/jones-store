import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";

export default async function AnnouncementRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "GET") {
	await prisma.announcement
		.findMany({
			orderBy: { addedAt: "desc" }
		})
		.then((announcement) =>
			res.json({
				message: "Successfully Retrieved Announcement(s)",
				data: announcement,
			})
		)
		.catch((error) =>
			res.status(500).json({ error: true, message: error.message })
		);
  } else {
    res.status(404).json({ error: true, message: "Not Found" });
  }
}