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
  const { provider, info = "" } = req.body as {
    provider: PaymentType;
    info: string;
  };
  const { user } = req.session;

  if (!user) {
    return;
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      return next(new ServerError("Cannot Find User/Cart", 404));
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
    });

    const products = await Promise.all(
      cartItems.map((item) =>
        prisma.product.findUnique({ where: { id: item.productId } })
      )
    );

    const total = cartItems.reduce((_total, { quantity }, index) => {
      const product = products[index];
      if (product) {
        return _total + (product.price - product.discount) * quantity;
      }
      return _total;
    }, 0);

    const shippingTotal = cartItems.reduce((_total, _, index) => {
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
        cartItems.map(({ quantity, size }, index) => {
          prisma.orderLine.create({
            data: {
              quantity: quantity,
              total: quantity * (products[index]?.price ?? 0),
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
            quantity: quantity,
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
  } catch (e: unknown) {
    if (e instanceof Error) {
      next(new ServerError(e.message, 500));
    }
  }
}

export default RouteHandler().post(isAuthenticated, PostCheckoutRoute);
