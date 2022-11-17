import type { NextApiRequest, NextApiResponse } from "next";
import type { DefaultResponse } from "src/types/shared";

import RouteHandler from "@Lib/RouteHandler";
import prisma from "@Lib/prisma";
import { isAuthorizedUser } from "@Lib/apiMiddleware";
import { ServerError } from "@Lib/utils";

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { userId } = req.query;

  const userData = await prisma.user.findUnique({
    select: {
      id: true,
      avatarURL: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      deactivated: true,
      wishlist: true,
      cart: true,
    },
    where: { id: userId as string },
  });

  if (userData == null) {
    return next(new ServerError("No User Found!", 404));
  }

  const cartItems = await prisma.cartItem.findMany({
    where: { cartId: userData.cart?.id },
  });

  res.json({
    success: true,
    message: "Successfully Retrieved User Record",
    data: { ...userData, cart: cartItems },
  });
}

export default RouteHandler().get(isAuthorizedUser, userRoute);
