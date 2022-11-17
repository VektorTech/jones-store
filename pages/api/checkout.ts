import type { NextApiRequest, NextApiResponse } from "next";
import type { DefaultResponse } from "src/types/shared";

import Stripe from "stripe";
import { OrderStatus, PaymentType } from "@prisma/client";

import RouteHandler from "@Lib/RouteHandler";
import prisma from "@Lib/prisma";
import { isAuthenticated } from "@Lib/apiMiddleware";
import { ServerError } from "@Lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-08-01",
  typescript: true,
});

async function PostCheckoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const {
    items,
    provider,
    info = "",
  } = req.body as {
    items: { id: string; qty: number; size: string }[];
    provider: PaymentType;
    info: string;
  };
  const { user } = req.session;

  if (!user) {
    return;
  }

  try {
    if (Array.isArray(items)) {
      const products = await Promise.all(
        items.map((item) =>
          prisma.product.findUnique({ where: { id: item.id } })
        )
      );

      const total = items.reduce((_total, { qty }, index) => {
        const product = products[index];
        if (product) {
          return _total + (product.price - (product.discount ?? 0)) * qty;
        }
        return _total;
      }, 0);

      const shippingTotal = items.reduce((_total, _, index) => {
        const product = products[index];
        if (product) {
          return _total + product.shippingCost;
        }
        return _total;
      }, 0);

      let { address } = (await prisma.userAddress.findFirst({
        select: { address: true },
        where: { userId: user.id, isDefault: true },
      })) ?? { address: { id: "" } };

      if (!address.id) {
        address = await prisma.address.upsert({
          where: { id: "1" },
          create: {
            id: "1",
            addressLine1: "",
            city: "",
            country: "",
            postalCode: "",
            region: "",
            unitNumber: 0,
          },
          update: {
            addressLine1: "",
            city: "",
            country: "",
            postalCode: "",
            region: "",
            unitNumber: 0,
          },
        });
      }

      const order = await prisma.order.create({
        data: {
          userId: user.id,
          status: OrderStatus.AWAITING_PAYMENT,
          total: total + shippingTotal,
          shippingAddressId: address.id,
          additionalInfo: info,
        },
      });

      const payment = await prisma.userPayment.create({
        data: {
          currency: "USD",
          paymentMethod: PaymentType.STRIPE,
          amount: total + shippingTotal,
          orderId: order.id,
          billingAddressId: address.id,
        },
      });

      if (provider == PaymentType.STRIPE) {
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
          items.map(({ qty, size }, index) => {
            prisma.orderLine.create({
              data: {
                quantity: qty,
                total: qty * (products[index]?.price ?? 0),
                orderId: order.id,
                productId: products[index]?.id ?? "",
                size: Number(size),
              },
            });

            return {
              price_data: {
                currency: payment.currency,
                product_data: {
                  name: products[index]?.title ?? "",
                  description: products[index]?.details ?? "",
                  images: products[index]?.mediaURLs,
                },
                unit_amount: total * 100,
              },
              quantity: qty,
            };
          });

        const session = await stripe.checkout.sessions.create({
          line_items,
          shipping_address_collection: {
            allowed_countries: ["JM", "US", "CA", "GB"],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                display_name: "Standard Shipping",
                type: "fixed_amount",
                fixed_amount: { amount: shippingTotal * 100, currency: "USD" },
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 2 },
                  maximum: { unit: "business_day", value: 3 },
                },
              },
            },
          ],
          payment_method_types: ["card"],
          mode: "payment",
          metadata: {
            paymentId: payment.id,
            orderId: order.id,
            userId: user.id,
          },
          success_url: process.env.DOMAIN + "/payment-success",
          cancel_url: process.env.DOMAIN + "/payment-cancel",
        });
        res.json({ message: "Started Payment Session", data: session.url });
      }
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      next(new ServerError(e.message, 500));
    }
  }
}

export default RouteHandler().post(isAuthenticated, PostCheckoutRoute);
