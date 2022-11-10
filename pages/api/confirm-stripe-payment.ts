import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@Lib/prisma";
import Stripe from "stripe";
import { buffer } from "micro";

import { OrderStatus } from "@prisma/client";
import RouteHandler from "@Lib/RouteHandler";
import { DefaultResponse } from "src/types/shared";

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
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const sig = req.headers["stripe-signature"];
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      sig || "",
      endpointSecret || ""
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
    const { paymentId, orderId, userId } = session.metadata;
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
          where: { orderId },
        });

        orderLineItems.forEach((item) =>
          prisma.cartItem.delete({
            where: {
              cartId_productId: { cartId: cart.id, productId: item.productId },
            },
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }

  res.json({ success: true, message: "Success" });
}

export default RouteHandler().post(ConfirmPayment);
