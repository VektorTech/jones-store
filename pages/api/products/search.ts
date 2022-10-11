import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";

export default async function productSearchRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "GET") {
    const { q, offset = 0, limit = 10 } = req.query;

    prisma.product
      .findMany({
        select: {
          id: true,
          title: true,
          mediaURLs: true,
          price: true,
          ratings: true,
          gender: true,
        },
        where: {
          title: {
            contains: q as string,
          },
        },
        orderBy: {
          salesCount: "asc",
        },
        skip: offset as number,
        take: limit as number,
      })
      .then((products) =>
        res.json({ message: "Products Found", data: products })
      )
      .catch((error) =>
        res.status(500).json({ error: true, message: error.message })
      );
  } else {
    res.status(404).json({ error: true, message: "Not Found" });
  }
}
