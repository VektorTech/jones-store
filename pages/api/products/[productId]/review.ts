import type { NextApiRequest, NextApiResponse } from "next";
import type { DefaultResponse } from "src/types/shared";

import RouteHandler from "@Lib/RouteHandler";
import prisma from "@Lib/prisma";
import { isAuthenticated } from "@Lib/apiMiddleware";
import { ServerError } from "@Lib/utils";

async function postReviewRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId } = req.query;
  const { user } = req.session;
  const { rating = 0, body = "" } = req.body;

  if (typeof productId == "string") {
    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment: body,
        productId,
        userId: user?.id as string,
      },
    });

    return res.status(201).json({ message: "Review Created", data: review });
  }
  next(new ServerError("Malformed Request", 400));
}

async function getReviewsRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId } = req.query;

  if (typeof productId == "string") {
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: { user: { select: { username: true, avatarURL: true } } },
    });
    return res.json({
      message: reviews.length + " Reviews Found",
      data: reviews,
    });
  }
  next(new ServerError("Malformed Request", 400));
}

export default RouteHandler()
  .post(isAuthenticated, postReviewRoute)
  .get(getReviewsRoute);
