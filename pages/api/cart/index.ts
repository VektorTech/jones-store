import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import { RouteHandler } from "@Lib/RouteHandler";
import { checkGuest } from "@Lib/apiMiddleware";
import { ServerError } from "@Lib/utils";

async function getCartRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { user, guest } = req.session;

  if (user) {
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
  } else if (guest) {
    res.json({
      message: "Cart Items: " + guest.cart.length,
      data: guest.cart,
    });
  }
}

async function postCartRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId, qty, size } = req.body;
  const { user, guest } = req.session;

  if (productId && qty && size) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (user) {
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

      if (cart && product && product.stockQty) {
        const item = await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: product.id,
            size: Number(size),
            quantity: Math.min(Number(qty), product.stockQty),
            total: (product.price - (product.discount || 0)) * Number(qty),
          },
        });

        return res.json({
          message: "Product Successfully Added To Cart",
          data: item,
        });
      }
    } else if (guest && product && product.stockQty) {
      const item = {
        productId,
        size,
        quantity: Math.min(Number(qty), product.stockQty),
        total: (product.price - (product.discount || 0)) * Number(qty),
      };
      guest.cart = [
        ...(guest.cart.filter((item) => item.productId != productId) || []),
        item,
      ];
      await req.session.save();

      return res.json({
        message: "Product Successfully Added To Cart",
        data: item,
      });
    }
  }

  next(new ServerError("Malformed Request", 400));
}

async function deleteCartRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { productId } = req.body;
  const { user, guest } = req.session;

  if (user) {
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
    } else {
      return next(new ServerError("Cannot Find User/Cart", 404));
    }
  } else if (guest) {
    guest.cart = guest.cart.filter(
      (cartItem) => productId != cartItem.productId
    );
    await req.session.save();
  }

  res.json({ message: "Product Successfully Removed From Cart" });
}

export default new RouteHandler()
  .get(checkGuest, getCartRoute)
  .post(checkGuest, postCartRoute)
  .delete(checkGuest, deleteCartRoute)
  .init();
