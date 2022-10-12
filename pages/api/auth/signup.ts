import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import prisma from "@Lib/prisma";
import { withSessionRoute } from "@Lib/withSession";
import { userSchema } from "@Lib/validations";
import { User } from "@prisma/client";
import { validateInput } from "@Lib/helpers";
import { DefaultResponse } from "src/types/shared";

async function signupRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "POST") {
    const error = validateInput(req.body, userSchema);
    if (error) {
      return res.status(400).json({ error: true, message: error });
    }

    const { username, email, password } = userSchema.cast(
      req.body
    ) as unknown as User;
    const passwordHashed = bcrypt.hashSync(password);

    await prisma.user
      .create({
        data: {
          username,
          email: email,
          password: passwordHashed,
        },
      })
      .then(async ({ id, role }) => {
        req.session.user = {
          id,
          username,
          role,
        };

        prisma.cart.create({
          data: {
            userId: id,
            total: 0,
          },
        });

        await req.session.save();

        res.json({ message: `Successfully Created User Account, ${username}` });
      })
      .catch((error) => {
        if (error.meta?.target?.[0] == "username") {
          res
            .status(409)
            .json({ error: true, message: "Username Already Exists" });
        } else if (error.meta?.target?.[0] == "email") {
          res
            .status(409)
            .json({ error: true, message: "Email Already Exists" });
        } else res.status(500).json({ error: true, message: error.message });
      });
  } else res.status(404).json({ error: true, message: "Not Found" });
}

export default withSessionRoute(signupRoute);
