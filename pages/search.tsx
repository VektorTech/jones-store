import { NextPage } from "next";

import prisma from "@Lib/prisma";
import { withSessionSsr } from "@Lib/withSession";
import SEO from "@Components/common/SEO";

const SearchPage: NextPage<{ query: string }> = ({ query }) => {
  return <div>
    <SEO title={`"${query}"`} />
  </div>;
};

export const getServerSideProps = withSessionSsr(async function ({
  params,
  req,
  query,
}) {
  const { q, offset = 0, limit = 10 } = query;

  const results = await prisma.product.findMany({
    where: { title: { contains: q as string } },
    skip: Number(offset),
    take: Number(limit),
  });

  return {
    props: {
      query: q,
      products: results,
    },
  };
});

export default SearchPage;
