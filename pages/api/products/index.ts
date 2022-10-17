import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { productSchema } from "@Lib/validations";
import { Product } from "@prisma/client";
import { DefaultResponse } from "src/types/shared";
import { Role } from "@prisma/client";
import { RouteHandler } from "@Lib/RouteHandler";
import { authorizeRole, isAuthenticated } from "@Lib/apiMiddleware";

async function getProductRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { offset = 0, limit = 10 } = req.query;

  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      mediaURLs: true,
      price: true,
      ratings: true,
      gender: true,
    },
    skip: Number(offset),
    take: Number(limit),
  });

  res.json({ message: "Successfully Retrieved Products", data: products });
}

async function postProductRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  let data = {
    ...req.body,
    mediaURLs: req.body?.mediaURLs.split(/[\r\n\s]/g).filter(Boolean),
  };
  data = productSchema.cast(data) as unknown as Product;

  await prisma.product.create({ data });

  res.status(201).json({ message: `Successfully Added ${data.title}` });
}

export default new RouteHandler()
  .get(getProductRoute)
  .post(isAuthenticated, authorizeRole(Role.ADMIN), postProductRoute)
  .init();
