import { NextPage } from "next";

import prisma from "@Lib/prisma";
import { withSessionSsr } from "@Lib/withSession";
import SEO from "@Components/common/SEO";

import { Product as ProductType } from "@prisma/client";
import Product from "@Components/common/Product";
import Pagination from "@Components/productList/Pagination";
import { useRouter } from "next/router";
import Dropdown from "@Components/common/formControls/Dropdown";

const RESULTS_PER_PAGE = 20;

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

      <div className="filter-sort">
        <div className="filter-sort__container">
          <div className="filter-sort__sort-by">
            <Dropdown
              label="Sort By"
              className="filter-sort__sort-select"
              options={{
                relevance: "Relevance",
                asc_price: "Asc: Price",
                price: "Desc: Price",
                asc_ratings: "Asc: Ratings",
                ratings: "Desc: Ratings",
              }}
              onOptionSelect={(order) => {
                if (order) {
                  router.query.order = order;
                  router.push(router);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="results">
        <div className={"results__container"}>
          <div className="results__grid">
            {products.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
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
  const { search = "", offset = 0, limit = RESULTS_PER_PAGE, order, } = query;

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
      ...orderBy
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
