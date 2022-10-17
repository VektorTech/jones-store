import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import sanitizeHtml from "sanitize-html";
import { RouteHandler } from "@Lib/RouteHandler";
import { authorizeRole, isAuthenticated } from "@Lib/apiMiddleware";
import { Role } from "@prisma/client";

export default new RouteHandler()
  .post(
    isAuthenticated,
    authorizeRole(Role.ADMIN),
    async function postAnnouncementRoute(
      req: NextApiRequest,
      res: NextApiResponse<DefaultResponse>,
      next: Function
    ) {
      const { headline, details } = req.body;

      const allowedTags = ["b", "i", "em", "strong", "span", "sub", "sup", "a"];

      await prisma.announcement.create({
        data: {
          headline: sanitizeHtml(headline, { allowedTags }),
          details: sanitizeHtml(details, { allowedTags }),
        },
      });

      res.status(201).json({
        message: "Successfully Created Announcement",
      });
    }
  )
  .get(async function getAnnouncementRoute(
    req: NextApiRequest,
    res: NextApiResponse<DefaultResponse>,
    next: Function
  ) {
    const announcement = await prisma.announcement.findMany({
      orderBy: { addedAt: "desc" },
    });

    res.json({
      message: "Successfully Retrieved Announcement(s)",
      data: announcement,
    });
  })
  .init();
