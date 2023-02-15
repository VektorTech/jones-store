import type { NextApiRequest, NextApiResponse } from "next";
import type { DefaultResponse } from "src/types/shared";

import RouteHandler from "@Lib/RouteHandler";
import prisma from "@Lib/prisma";
import { ServerError } from "src/utils";

async function productRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId } = req.query;

  if (typeof productId == "string") {
    const product = await prisma.product.findUnique({
      where: {
        id: productId as string,
      },
    });

    return res.json({ message: "Product Found", data: product });
  }

  next(new ServerError("Malformed Request", 400));
}

export default RouteHandler().get(productRoute);
