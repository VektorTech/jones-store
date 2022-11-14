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
import { ProductComponentType } from "src/types/shared";

const SearchPage: NextPage<{
  query: string;
  products: ProductComponentType[];
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
      {/* <FilterSortSection /> */}

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
  const { search = "", offset = 0, limit = RESULTS_PER_PAGE, order } = query;

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
