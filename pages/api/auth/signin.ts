import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import prisma from "@Lib/prisma";
import { userLoginSchema } from "@Lib/validations";
import { User } from "@prisma/client";
import { normalizeUserProductItems, validateInputs } from "@Lib/helpers";
import { DefaultResponse } from "src/types/shared";
import RouteHandler from "@Lib/RouteHandler";
import { ServerError } from "@Lib/utils";

const signinRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) => {
  const error = validateInputs(req.body, userLoginSchema);
  if (error) {
    return next(new ServerError(error.errors.join("\n"), 400));
  }

  const { email, password } = userLoginSchema.cast(req.body) as User;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.findUnique({
      where: { username: email },
    });
  }

  if (
    user &&
    !user.deactivated &&
    bcrypt.compareSync(password, user.password)
  ) {
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (req.session.guest) {
      try {
        req.session.guest.wishlist.forEach(async (item) => {
          await prisma.wishlist.create({
            data: {
              userId: user?.id as string,
              productId: item.productId as string,
            },
          });
        });

        if (cart) {
          req.session.guest.cart.forEach(async (item) => {
            await prisma.cartItem.create({
              data: {
                cartId: cart?.id,
                productId: item.productId as string,
                quantity: Number(item.quantity),
                size: Number(item.size),
                total: Number(item.total),
              },
            });
          });
        }

        req.session.guest = { id: "guest", wishlist: [], cart: [] };
      } catch (e) {}
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    await req.session.save();

    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart?.id },
      include: { product: true },
    });
    const wishlistItems = await prisma.wishlist.findMany({
      where: { userId: user.id },
      include: { product: true },
    });
    return res.json({
      success: true,
      message: `${user.username}, Sign In Successful`,
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

  next(new ServerError("Authentication Failed", 401));
};

export default RouteHandler().post(signinRoute);
