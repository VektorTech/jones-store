import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import { newsletterRecipientSchema } from "@Lib/validations";
import { validateInput } from "@Lib/helpers";

export default async function NewsletterRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  const { email } = req.query;

  const error = validateInput({ email }, newsletterRecipientSchema);
  if (error) {
    return res.status(400).json({ error: true, message: error });
  }

  if (req.method == "GET") {
    await prisma.newsletterRecipient
      .create({
        data: { email: email as string },
      })
      .then(() =>
        res.json({
          message: "Successfully Added Recipient, " + email,
        })
      )
      .catch((error) =>
        res.status(500).json({ error: true, message: error.message })
      );
  } else {
    res.status(404).json({ error: true, message: "Not Found" });
  }
}
