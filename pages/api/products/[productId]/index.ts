import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import { RouteHandler } from "@Lib/RouteHandler";

async function productRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId } = req.query;

  const product = await prisma.product.findUnique({
    where: {
      id: productId as string,
    },
  });

  res.json({ message: "Product Found", data: product });
}

export default new RouteHandler().get(productRoute).init();
