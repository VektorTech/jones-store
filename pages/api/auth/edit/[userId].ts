import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { withSessionRoute } from "@Lib/withSession";
import { userSchema } from "@Lib/validations";
import { Role, User } from "@prisma/client";
import { validateInput } from "@Lib/helpers";
import { DefaultResponse } from "src/types/shared";

async function editUserRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  if (req.method == "PUT") {
    const error = validateInput(req.body, userSchema);
    if (error) {
      return res.status(400).json({ error: true, message: error });
    }

    const { username, email, firstName, lastName, phoneNumber, avatarURL } =
      userSchema.cast(req.body) as unknown as User;

    const { userId } = req.query;
    const { user } = req.session;

    const isAuthorized =
      userId && user && (userId == user?.id || user?.role == Role.ADMIN);

    if (isAuthorized) {
      await prisma.user
        .update({
          where: { id: userId as string },
          data: {
            username,
            email,
            firstName,
            lastName,
            phoneNumber,
            avatarURL,
          },
        })
        .then(() => res.json({ message: "User Update Successful" }))
        .catch((error) =>
          res.status(500).json({ error: true, message: error.message })
        );
    } else {
      res.status(401).json({ error: true, message: "Unauthorized Request" });
    }
  } else {
    res.status(404).json({ error: true, message: "Not Found" });
  }
}

export default withSessionRoute(editUserRoute);
