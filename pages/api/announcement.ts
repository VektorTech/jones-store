import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import { withSessionRoute } from "@Lib/withSession";
import { Role } from "@prisma/client";
import sanitizeHtml from 'sanitize-html';

async function AnnouncementRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "POST") {
	const { headline, details } = req.body;
	const { user } = req.session;

	if (user && user.role == Role.ADMIN) {
		const allowedTags = [ 'b', 'i', 'em', 'strong', 'span', 'sub', 'sup', 'a'];

		await prisma.announcement.create({
			data: {
				headline: sanitizeHtml(headline, { allowedTags }),
				details: sanitizeHtml(details, { allowedTags })
			}
		})
		.then(() =>
			res.status(201).json({
				message: "Successfully Created Announcement",
			})
		)
		.catch((error) =>
			res.status(500).json({ error: true, message: error.message })
		);
	}
  } else if (req.method == "GET") {
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

export default withSessionRoute(AnnouncementRoute);