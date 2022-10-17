import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import prisma from "@Lib/prisma";
import { userSchema } from "@Lib/validations";
import { User } from "@prisma/client";
import { validateInput } from "@Lib/helpers";
import { DefaultResponse } from "src/types/shared";
import { RouteHandler } from "@Lib/RouteHandler";
import { ServerError } from "@Lib/utils";

async function signupRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const error = validateInput(req.body, userSchema);
  if (error) {
    return next(new ServerError(error, 400));
  }

  const { username, email, password } = userSchema.cast(
    req.body
  ) as unknown as User;
  const passwordHashed = bcrypt.hashSync(password);

  const { id, role } = await prisma.user.create({
    data: {
      username,
      email: email,
      password: passwordHashed,
    },
  });

  req.session.user = {
    id,
    username,
    role,
  };

  await prisma.cart.create({
    data: {
      userId: id,
      total: 0,
    },
  });

  await req.session.save();

  res
    .status(201)
    .json({ message: `Successfully Created User Account, ${username}` });
}

export default new RouteHandler().post(signupRoute).init();
