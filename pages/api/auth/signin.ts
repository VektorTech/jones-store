import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import prisma from "@Lib/prisma";
import { userLoginSchema } from "@Lib/validations";
import { User } from "@prisma/client";
import { validateInput } from "@Lib/helpers";
import { DefaultResponse } from "src/types/shared";
import { RouteHandler } from "@Lib/RouteHandler";
import { ServerError } from "@Lib/utils";

const signinRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) => {
  const error = validateInput(req.body, userLoginSchema);
  if (error) {
    return next(new ServerError(error, 400));
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
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    await req.session.save();

    return res.json({ message: `${user.username}, Sign In Successful` });
  }

  next(new ServerError("Authentication Failed", 401));
};

export default new RouteHandler()
  .post(signinRoute)
  .init();

