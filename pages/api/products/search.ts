import type { NextApiRequest, NextApiResponse } from "next";
import type { DefaultResponse } from "src/types/shared";

import RouteHandler from "@Lib/RouteHandler";
import prisma from "@Lib/prisma";

async function productSearchRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  const { q, offset = 0, limit = 10 } = req.query;

  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      mediaURLs: true,
      price: true,
      gender: true,
      sku: true,
    },
    where: {
      title: {
        contains: q as string,
        mode: "insensitive",
      },
    },
    orderBy: {
      salesCount: "desc",
    },
    skip: Number(offset),
    take: Number(limit),
  });

  res.json({ message: "Products Found", data: products });
}

export default RouteHandler().get(productSearchRoute);
