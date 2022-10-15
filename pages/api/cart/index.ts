import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import { withSessionRoute } from "@Lib/withSession";

async function cartRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  const { productId, qty, size } = req.body;
  const { user } = req.session;

  let cart = null,
    product = null;

  if (user) {
    cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: user.id,
          total: 0,
        },
      });
    }

    product = await prisma.product.findUnique({
      where: { id: productId },
    });
  } else {
    return res
      .status(401)
      .json({ error: true, message: "Unauthorized Request" });
  }

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: user.id,
        total: 0,
      },
    });
  }

  try {
    if (req.method == "POST") {
      if (product) {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: product.id,
            size: Number(size),
            quantity: Number(qty),
            total: product.price * Number(qty),
          },
        });
        res.json({ message: "Product Successfully Added To Cart" });
      }
    } else if (req.method == "DELETE") {
      await prisma.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
      });
      res.json({ message: "Product Successfully Removed From Cart" });
    } else if (req.method == "GET") {
      const cartItems = await prisma.cartItem.findMany({
        where: { cartId: cart.id },
        include: { product: true },
      });
      res.json({
        message: "Successfully Retrieved Cart Items",
        data: cartItems,
      });
    } else {
      res.status(404).json({ error: true, message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: (error as Error)?.message });
  }
}

export default withSessionRoute(cartRoute);
