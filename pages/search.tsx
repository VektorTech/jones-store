import { NextPage } from "next";

import prisma from "@Lib/prisma";
import { withSessionSsr } from "@Lib/withSession";
import SEO from "@Components/common/SEO";

import { Product as ProductType } from "@prisma/client";
import Product from "@Components/common/Product";
import Pagination from "@Components/products/Pagination";
import { useRouter } from "next/router";
import Dropdown from "@Components/common/formControls/Dropdown";
import { RESULTS_PER_PAGE } from "@Lib/constants";
import Constraints from "@Components/products/constraints";
import FilterSortSection from "@Components/products/FilterSortSection";
import ProductsGrid from "@Components/products/ProductsGrid";

const SearchPage: NextPage<{
  query: string;
  products: ProductType[];
  count: number;
}> = ({ query, products, count }) => {
  const router = useRouter();
  const { offset = 0 } = router.query;

  return (
    <div>
      <SEO title={`"${query}"`} />
      <Constraints
        isSearch
        allProductsCount={count}
        currentProductsCount={products.length}
      />
      <FilterSortSection />

      <div className="results">
        <div className={"results__container"}>
          <ProductsGrid products={products} />
          <Pagination
            resultsCount={count}
            limit={RESULTS_PER_PAGE}
            offset={Number(offset)}
          />
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
  const { search = "", offset = 0, limit = RESULTS_PER_PAGE, order } = query;

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

  const orderBy: { orderBy: any } = { orderBy: {} };
  if (order && typeof order == "string") {
    const orderings: { [order: string]: any } = {
      asc_price: { price: "asc" },
      price: { price: "desc" },
      asc_ratings: { ratings: "asc" },
      ratings: { ratings: "desc" },
    };
    orderBy["orderBy"] = { ...orderings[order] };
  }

  const results =
    (await prisma.product.findMany({
      select: productColumns,
      where: { title: { contains: search as string, mode: "insensitive" } },
      skip: Number(offset),
      take: Number(limit),
      ...orderBy,
    })) || null;

  let count = await prisma.product.count({
    where: { title: { contains: search as string, mode: "insensitive" } },
  });

  return {
    props: {
      query: search,
      products: results,
      count,
    },
  };
});

export default SearchPage;
