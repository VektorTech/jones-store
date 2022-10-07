import { NextPage } from "next";

import prisma from '@Lib/prisma';
import { withSessionSsr } from "@Lib/withSession";

const SearchPage: NextPage = () => {
	return (
		<div></div>
	);
}

export const getServerSideProps = withSessionSsr(
	async function ({ params, req, query }) {
		const { q, offset = 0, limit = 10 } = query;

		const results = await prisma.product.findMany({
			where: { title: { contains: q as string } },
			skip: offset as number,
			take: limit as number
		});

		return {
			props: {
				products: results
			}
		}
	}
  );

export default SearchPage;