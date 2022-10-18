import { NextPage } from "next";

import prisma from "@Lib/prisma";
import { withSessionSsr } from "@Lib/withSession";
import SEO from "@Components/common/SEO";

const SearchPage: NextPage<{ query: string; products?: any }> = ({ query }) => {
  return (
    <div>
      <SEO title={`"${query}"`} />
    </div>
  );
};

export const getServerSideProps = withSessionSsr(async function ({
  params,
  req,
  query,
}) {
  const { q = "", offset = 0, limit = 10 } = query;

  const productColumns = {
    title: true,
    price: true,
    discount: true,
    mediaURLs: true,
    gender: true,
    ratings: true,
    sku: true,
    id: true,
  };

  const results =
    (await prisma.product.findMany({
      select: productColumns,
      where: { title: { contains: q as string } },
      skip: Number(offset),
      take: Number(limit),
    })) || null;

  return {
    props: {
      query: q,
      products: results,
    },
  };
});

export default SearchPage;
