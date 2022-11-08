import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import { newsletterRecipientSchema } from "@Lib/validations";
import { validateInputs } from "@Lib/helpers";
import RouteHandler from "@Lib/RouteHandler";
import { ServerError } from "@Lib/utils";

async function NewsletterRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>,
  next: Function
) {
  const { email } = req.query;
  const error = validateInputs({ email }, newsletterRecipientSchema);
  if (error) {
    return next(new ServerError(error.errors.join("\n"), 400));
  }

  await prisma.newsletterRecipient.create({
    data: { email: email as string },
  });

  res.json({
    message: "Successfully Added Recipient, " + email,
  });
}

export default RouteHandler().get(NewsletterRoute);
