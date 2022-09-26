import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import prisma from "@Lib/prisma";
import { withSessionRoute } from "@Lib/withSession";
import { userSchema } from "@Lib/validations";
import { User } from "@prisma/client";
import { validateInput } from "@Lib/helpers";
import { DefaultResponse } from "src/types/shared";

async function editUserRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "POST") {
    const error = validateInput(req.body, userSchema);
    if (error) {
      return res.status(400).json({ error: true, message: error });
    }

    const { username, email, firstName, lastName, phoneNumber, avatar } =
      userSchema.cast(req.body) as unknown as User;

    const { user } = req.session;

    if (user) {
      prisma.user
        .update({
          where: { id: user.id },
          data: {
            username,
            email,
            firstName,
            lastName,
            phoneNumber,
            avatar,
          },
        })
        .then(() => res.json({ message: "User Update Successful" }))
        .catch((error) =>
          res.status(500).json({ error: true, message: error.message })
        );
    } else
      res.status(401).json({ error: true, message: "Authentication Required" });
  } else res.status(404).json({ error: true, message: "Not Found" });
}

export default withSessionRoute(editUserRoute);
