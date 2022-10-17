import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import { RouteHandler } from "@Lib/RouteHandler";
import { isAuthenticated } from "@Lib/apiMiddleware";
import { ServerError } from "@Lib/utils";

async function postWishlistRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId } = req.body;
  const { user } = req.session;

  if (productId) {
    const wishlist = await prisma.wishlist.create({
      data: {
        userId: user?.id as string,
        productId: productId as string,
      },
    });

    return res.json({
      message: "Product Successfully Added To Favorites",
      data: wishlist,
    });
  }

  next(new ServerError("Malformed Request", 400));
}

async function deleteWishlistRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId } = req.body;
  const { user } = req.session;

  if (productId) {
    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId: user?.id as string,
          productId: productId,
        },
      },
    });

    return res.json({ message: "Product Successfully Removed From Favorites" });
  }

  next(new ServerError("Malformed Request", 400));
}

async function getWishlistRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { user } = req.session;

  const wishlistCount = await prisma.wishlist.count({
    where: { userId: user?.id as string },
  });

  res.json({
    message: "Favorites: " + wishlistCount,
    data: wishlistCount,
  });
}

export default new RouteHandler()
  .post(isAuthenticated, postWishlistRoute)
  .delete(isAuthenticated, deleteWishlistRoute)
  .get(isAuthenticated, getWishlistRoute)
  .init();
