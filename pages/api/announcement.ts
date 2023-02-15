import type { NextApiRequest, NextApiResponse } from "next";
import type { DefaultResponse } from "src/types/shared";

import sanitizeHtml from "sanitize-html";

import RouteHandler from "@Lib/RouteHandler";
import prisma from "@Lib/prisma";
import { authorizeRole, isAuthenticated } from "@Lib/apiMiddleware";
import { Role } from "@prisma/client";
import { allowedTags } from "src/constants";

export default RouteHandler()
  .post(
    isAuthenticated,
    authorizeRole(Role.ADMIN),
    async function postAnnouncementRoute(
      req: NextApiRequest,
      res: NextApiResponse<DefaultResponse>,
      next: Function
    ) {
      const { headline, details } = req.body;

      await prisma.announcement.create({
        data: {
          headline: sanitizeHtml(headline, { allowedTags: [...allowedTags] }),
          details: sanitizeHtml(details, {
            allowedTags: [...allowedTags, "a"],
          }),
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
    const { take = 3 } = req.body;

    const announcement = await prisma.announcement.findMany({
      orderBy: { addedAt: "desc" },
      take: Number(take),
    });

    res.json({
      message: "Successfully Retrieved Announcement(s)",
      data: announcement,
    });
  });
