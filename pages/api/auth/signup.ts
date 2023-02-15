import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@prisma/client";
import type { DefaultResponse } from "src/types/shared";

import bcrypt from "bcryptjs";

import RouteHandler from "@Lib/RouteHandler";
import prisma from "@Lib/prisma";
import { userSchema } from "@Lib/validations";
import { normalizeUserProductItems, validateInputs } from "src/helpers";
import { ServerError } from "src/utils";

async function signupRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const error = validateInputs(req.body, userSchema);
  if (error) {
    return next(new ServerError(error.errors.join("\n"), 400));
  }

  const { username, email, password } = userSchema.cast(
    req.body
  ) as unknown as User;
  const passwordHashed = bcrypt.hashSync(password);

  const user = await prisma.user.create({
    data: {
      username,
      email: email,
      password: passwordHashed,
    },
  });

  const { id, role } = user;

  const cart = await prisma.cart.create({
    data: {
      userId: id,
      total: 0,
    },
  });

  if (req.session.guest) {
    try {
      req.session.guest.wishlist.forEach(async (item) => {
        await prisma.wishlist.create({
          data: {
            userId: id as string,
            productId: item.productId as string,
          },
        });
      });

      req.session.guest.cart.forEach(async (item) => {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.productId as string,
            quantity: Number(item.quantity),
            size: Number(item.size),
            total: Number(item.total),
          },
        });
      });

      req.session.guest = { id: "guest", wishlist: [], cart: [] };
    } catch (e) {}
  }

  req.session.user = {
    id,
    username,
    role,
  };
  await req.session.save();

  const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    }),
    wishlistItems = await prisma.wishlist.findMany({
      where: { userId: user.id },
      include: { product: true },
    });

  res.status(201).json({
    success: true,
    error: false,
    message: `Successfully Created User Account, ${username}`,
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      avatarURL: user.avatarURL,
      deactivated: user.deactivated,
      cart: normalizeUserProductItems(cartItems),
      wishlist: normalizeUserProductItems(wishlistItems),
      isAuth: true,
    },
  });
}

export default RouteHandler().post(signupRoute);
