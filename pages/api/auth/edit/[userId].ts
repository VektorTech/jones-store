import type { NextApiRequest, NextApiResponse } from "next";
import type { DefaultResponse } from "src/types/shared";
import type { User } from "@prisma/client";

import RouteHandler from "@Lib/RouteHandler";
import prisma from "@Lib/prisma";
import { userSchema } from "@Lib/validations";
import { validateInputs } from "@Lib/helpers";
import { isAuthorizedUser } from "@Lib/apiMiddleware";
import { ServerError } from "@Lib/utils";

async function editUserRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const error = validateInputs(req.body, userSchema);
  if (error) {
    return next(new ServerError(error.errors.join("\n"), 400));
  }

  const { username, email, firstName, lastName, phoneNumber, avatarURL } =
    userSchema.cast(req.body) as unknown as User;

  const { userId } = req.query;

  await prisma.user.update({
    where: { id: userId as string },
    data: {
      username,
      email,
      firstName,
      lastName,
      phoneNumber,
      avatarURL,
    },
  });

  res.json({ message: "User Update Successful" });
}

export default RouteHandler().put(isAuthorizedUser, editUserRoute);
