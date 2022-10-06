import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";
import { withSessionRoute } from "@Lib/withSession";

async function cartRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  	if (req.method == "POST") {
		const { productId, qty } = req.body;
		const { user } = req.session;

		if (user && productId) {
			try {
				const cart = await prisma.cart.findUnique({
					where: { userId: user.id }
				});

				const product = await prisma.product.findUnique({
					where: { id: productId }
				});

				if (cart && product) {
					const cartItem = await prisma.cartItem.create({
						data: {
							cartId: cart.id,
							productId: product.id,
							quantity: qty as number,
							total: product.price * (qty as number)
						}
					});

					if (cartItem) {
						res.json({ message: "Product Successfully Added To Cart" });
					}
				}
			} catch(error) {
				res.status(500).json({ error: true, message: (error as Error)?.message })
			}
		} else
			res.status(401).json({ error: true, message: "Unauthorized Request" });
	} else res.status(404).json({ error: true, message: "Not Found" });
}

export default withSessionRoute(cartRoute);