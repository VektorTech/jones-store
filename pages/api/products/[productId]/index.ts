import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@Lib/prisma";
import { DefaultResponse } from "src/types/shared";

export default async function productRoute(
  req: NextApiRequest,
  res: NextApiResponse<DefaultResponse>
) {
  	if (req.method == "GET") {
		const { productId } = req.query;

		prisma.product.findUnique({
			where: {
				id: productId as string
			}
		})
		.then(product => res.json({ message: "Product Found", data: product }))
		.catch(error => res.status(500).json({ error: true, message: error.message }));
	} else {
		res.status(404).json({ error: true, message: "Not Found" });
	}
}
