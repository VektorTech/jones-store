import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import prisma from "@Lib/prisma";
import { withSessionRoute } from "@Lib/withSession";
import { userLoginSchema } from "@Lib/validations";
import { User } from "@prisma/client";
import { validateInput } from "@Lib/helpers";
import { DefaultResponse } from "src/types/shared";

async function signinRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "POST") {
    const error = validateInput(req.body, userLoginSchema);
    if (error) {
      return res.status(400).json({ error: true, message: error });
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

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      await req.session.save();

      return res.json({ message: `${user.username}, Sign In Successful` });
    }
    res.status(401).json({ error: true, message: "Authentication Failed" });
  } else res.status(404).json({ error: true, message: "Not Found" });
}

export default withSessionRoute(signinRoute);
