import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import { RouteHandler } from "@Lib/RouteHandler";
import { isAuthenticated } from "@Lib/apiMiddleware";
import { ServerError } from "@Lib/utils";

async function getCartRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { user } = req.session;

  const cart = await prisma.cart.findUnique({
    where: { userId: user?.id },
  });

  const cartItems = await prisma.cartItem.findMany({
    where: { cartId: cart?.id },
    include: { product: true },
  });

  res.json({
    message: "Successfully Retrieved Cart Items",
    data: cartItems,
  });
}

async function postCartRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId, qty, size } = req.body;
  const { user } = req.session;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  let cart = await prisma.cart.findUnique({
    where: { userId: user?.id },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: user?.id || "",
        total: 0,
      },
    });
  }

  if (cart && product) {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        size: Number(size),
        quantity: Number(qty),
        total: product.price * Number(qty),
      },
    });

    return res.json({ message: "Product Successfully Added To Cart" });
  }

  next(new ServerError("Cannot Find User/Cart", 404));
}

async function deleteCartRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId } = req.body;
  const { user } = req.session;

  const cart = await prisma.cart.findUnique({
    where: { userId: user?.id },
  });

  if (cart) {
    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    return res.json({ message: "Product Successfully Removed From Cart" });
  }

  next(new ServerError("Cannot Find User/Cart", 404));
}

export default new RouteHandler()
  .get(isAuthenticated, getCartRoute)
  .post(isAuthenticated, postCartRoute)
  .delete(isAuthenticated, deleteCartRoute)
  .init();
