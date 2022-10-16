import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { withSessionRoute } from "@Lib/withSession";
import { productSchema } from "@Lib/validations";
import { Product } from "@prisma/client";
import { DefaultResponse } from "src/types/shared";
import { Role } from "@prisma/client";

async function productRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "POST") {
    const { user } = req.session;

    if (user && user.role == Role.ADMIN) {
      try {
        let data = {
          ...req.body,
          mediaURLs: req.body?.mediaURLs.split(/[\r\n\s]/g).filter(Boolean),
        };
        data = productSchema.cast(data) as unknown as Product;

        await prisma.product
          .create({ data })
          .then(() => {
            res
              .status(201)
              .json({ message: `Successfully Added ${data.title}` });
          })
          .catch((error) => {
            if (error.meta?.target?.length) {
              res.status(409).json({ error: true, message: error.message });
            } else
              res.status(500).json({ error: true, message: error.message });
          });
      } catch (error) {
        res
          .status(500)
          .json({ error: true, message: (error as TypeError).message });
      }
    }
  } else if (req.method == "GET") {
    const { offset = 0, limit = 10 } = req.query;

    await prisma.product
      .findMany({
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
      })
      .then((products) =>
        res.json({ message: "Successfully Retrieved Products", data: products })
      )
      .catch((error) =>
        res.status(500).json({ error: true, message: error.message })
      );
  } else {
    res.status(404).json({ error: true, message: "Not Found" });
  }
}

export default withSessionRoute(productRoute);
