import type { NextApiRequest, NextApiResponse } from "next";
import type { DefaultResponse } from "src/types/shared";

import Stripe from "stripe";
import { OrderStatus } from "@prisma/client";
import { buffer } from "micro";

import RouteHandler from "@Lib/RouteHandler";
import prisma from "@Lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-08-01",
  typescript: true,
});

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function ConfirmPayment(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  const sig = req.headers["stripe-signature"];
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      sig ?? "",
      endpointSecret ?? ""
    );
  } catch (err) {
    if (err instanceof Error)
      res
        .status(400)
        .json({ error: true, message: `Webhook Error: ${err.message}` });
    return;
  }

  if (event.type == "checkout.session.completed") {
    const session = event.data.object;
    // @ts-ignore
    const { orderId, userId } = session.metadata;
    const { payment_status } = session as any;

    try {
      if (payment_status == "paid") {
        await prisma.order.update({
          where: { id: Number(orderId) },
          data: { status: OrderStatus.PAYMENT_RECEIVED },
        });

        const cart = await prisma.cart.findUnique({
          where: { userId: userId },
        });

        if (!cart) {
          return;
        }

        const orderLineItems = await prisma.orderLine.findMany({
          where: { orderId: Number(orderId) },
        });

        for await (const item of orderLineItems) {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              salesCount: { increment: 1 },
              stockQty: { decrement: item.quantity },
            },
          });
          await prisma.cartItem.delete({
            where: {
              cartId_productId: { cartId: cart.id, productId: item.productId },
            },
          });
        }

        return res.json({ success: true, message: "Success" });
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ success: false, message: "Error" });
    }
  }
}

export default RouteHandler().post(ConfirmPayment);
