import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import { withSessionRoute } from "@Lib/withSession";

async function wishlistRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "POST") {
    const { productId } = req.body;
    const { user } = req.session;

    if (user && productId) {
      prisma.wishlist
        .create({
          data: {
            userId: user.id,
            productId: productId as string,
          },
        })
        .then((wishlist) =>
          res.json({ message: "Product Successfully Added To Favorites" })
        )
        .catch((error) =>
          res.status(500).json({ error: true, message: error.message })
        );
    } else
      res.status(401).json({ error: true, message: "Unauthorized Request" });
  } else if (req.method == "DELETE") {
    const { productId } = req.body;
    const { user } = req.session;

    if (user && productId) {
      prisma.wishlist
        .delete({
          where: {
            userId_productId: {
              userId: user.id,
              productId: productId,
            },
          },
        })
        .then((wishlist) =>
          res.json({ message: "Product Successfully Removed From Favorites" })
        )
        .catch((error) =>
          res.status(500).json({ error: true, message: error.message })
        );
    }
  } else if (req.method == "GET") {
    const { user } = req.session;

    if (user) {
      prisma.wishlist
        .count({
          where: { userId: user.id },
        })
        .then((wishlistCount) =>
          res.json({
            message: "Favorites: " + wishlistCount,
            data: wishlistCount,
          })
        )
        .catch((error) =>
          res.status(500).json({ error: true, message: error.message })
        );
    }
  } else {
    res.status(404).json({ error: true, message: "Not Found" });
  }
}

export default withSessionRoute(wishlistRoute);
