import type { ProductComponentType } from "src/types/shared";

import { NextPage } from "next";

import SEO from "@Components/common/SEO";
import Constraints from "@Components/products/constraints";
import ProductsGrid from "@Components/products/ProductsGrid";

import prisma from "@Lib/prisma";
import { withSessionSsr } from "@Lib/withSession";

const SearchPage: NextPage<SearchPageType> = ({ query, products, count }) => {
  return (
    <div>
      <SEO title={`"${query}"`} />
      <Constraints
        isSearch
        allProductsCount={count}
        currentProductsCount={products.length}
      />

      <div className="results">
        <div className={"results__container"}>
          <ProductsGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withSessionSsr(async function ({
  params,
  req,
  query,
}) {
  const { search = "" } = query;

  const select = {
    title: true,
    price: true,
    discount: true,
    mediaURLs: true,
    gender: true,
    sku: true,
    id: true,
    type: true,
    color: true,
    year: true,
    sizes: true,
    dateAdded: true,
  };

  const results = await Promise.all(
    (
      await prisma.product.findMany({
        select,
        where: { title: { contains: search as string, mode: "insensitive" } },
        orderBy: { dateAdded: "desc" },
      })
    ).map(async (p) => ({
      ...p,
      dateAdded: p.dateAdded.toJSON(),
      ratings: await prisma.review
        .aggregate({
          where: { productId: p.id },
          _avg: { rating: true },
        })
        .then((r) => r._avg.rating),
    }))
  );

  return {
    props: {
      query: search,
      products: results,
      count: results.length,
    },
  };
});

export default SearchPage;

interface SearchPageType {
  query: string;
  products: ProductComponentType[];
  count: number;
}
