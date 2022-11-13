import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import RouteHandler from "@Lib/RouteHandler";
import { checkGuest } from "@Lib/apiMiddleware";
import { ServerError } from "@Lib/utils";

async function postWishlistRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId } = req.body;
  const { user, guest } = req.session;

  if (productId) {
    if (user) {
      const wishlist = await prisma.wishlist.create({
        data: {
          userId: user?.id as string,
          productId: productId as string,
        },
        select: { product: true, productId: true, userId: true }
      });

      return res.json({
        message: "Product Successfully Added To Wishlist",
        data: wishlist,
      });
    } else if (guest) {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (product) {
        guest.wishlist = [
          ...(guest.wishlist.filter((item) => item.productId != productId) ||
            []),
          { userId: "guest", productId, product: {} },
        ];
        await req.session.save();

        return res.json({
          message: "Product Successfully Added To Wishlist",
          data: { productId, product, userId: "guest" },
        });
      }
    }
  }

  next(new ServerError("Malformed Request", 400));
}

async function deleteWishlistRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId } = req.body;
  const { user, guest } = req.session;

  if (productId) {
    if (user) {
      await prisma.wishlist.delete({
        where: {
          userId_productId: {
            userId: user?.id as string,
            productId: productId,
          },
        },
      });
    } else if (guest) {
      guest.wishlist = guest.wishlist.filter(
        (wishlistItem) => productId != wishlistItem.productId
      );
      await req.session.save();
    }

    return res.json({ message: "Product Successfully Removed From Favorites" });
  }

  next(new ServerError("Malformed Request", 400));
}

async function getWishlistRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { user, guest } = req.session;

  if (user) {
    const wishlist = await prisma.wishlist.findMany({
      where: { userId: user?.id as string },
    });

    res.json({
      message: "Favorites: " + wishlist,
      data: wishlist,
    });
  } else {
    res.json({
      message: "Favorites: " + guest?.wishlist.length,
      data: guest?.wishlist,
    });
  }
}

export default RouteHandler()
  .post(checkGuest, postWishlistRoute)
  .delete(checkGuest, deleteWishlistRoute)
  .get(checkGuest, getWishlistRoute);
