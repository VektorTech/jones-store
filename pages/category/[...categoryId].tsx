import { BsSliders } from "react-icons/bs";

import Filter from "@Components/productList/Filter";
import BreadCrumbs from "@Components/productList/BreadCrumbs";
import Pagination from "@Components/productList/Pagination";

import prisma from "@Lib/prisma";
import { withSessionSsr } from "@Lib/withSession";
import { Gender, Product as ProductType, Category } from "@prisma/client";
import SEO from "@Components/common/SEO";
import Button from "@Components/common/formControls/Button";
import Dropdown from "@Components/common/formControls/Dropdown";

import { useEffect, useState } from "react";

import Product from "@Components/common/Product";
import { DialogType, useDialog } from "@Lib/contexts/UIContext";
import { useRouter } from "next/router";

const RESULTS_PER_PAGE = 20;

export default function CategoryPage({
  categoryId,
  products,
  count,
}: {
  categoryId: string;
  products: ProductType[];
  count: number;
}) {
  const router = useRouter();
  const {
    offset = 0,
    limit = RESULTS_PER_PAGE,
    colorway,
    sizes,
    height,
    price,
    categoryId: category,
  } = router.query;

  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    if (innerWidth > 992) setFilterActive(true);
  }, []);

  useEffect(() => {
    const hideFilter = () => {
      if (innerWidth <= 992) setFilterActive(false);
    };
    addEventListener("resize", hideFilter);
    return () => removeEventListener("resize", hideFilter);
  }, []);

  return (
    <>
      <SEO title={categoryId.toUpperCase()} />
      <div className="constraints">
        <div className="constraints__container">
          <BreadCrumbs
            items={[{ url: router.asPath, text: categoryId.toUpperCase() }]}
          />
          <hr className="constraints__hr" />
          <h1 className="constraints__title">{categoryId}</h1>
          {products.length ? (
            <p className="constraints__summary">
              Showing <strong>{Number(offset) + 1}</strong> &mdash;{" "}
              <strong>{Number(offset) + products.length}</strong> of{" "}
              <strong>{count}</strong> results
            </p>
          ) : (
            <p>
              <strong>Nothing Found!</strong>
            </p>
          )}
          <div className="constraints__filters"></div>
        </div>
      </div>

      <div className="filter-sort">
        <div className="filter-sort__container">
          <Button
            onClick={() => setFilterActive(!filterActive)}
            className="filter-sort__toggle"
          >
            <BsSliders className="filter-sort__toggle-icon" />
            <span>filter</span>
          </Button>

          <div className="filter-sort__sort-by">
            <Dropdown
              label="Sort By"
              className="filter-sort__sort-select"
              options={{
                relevance: "Relevance",
                asc_price: "Price: Low - High",
                price: "Price: High - Low",
                asc_ratings: "Ratings: Low - High",
                ratings: "Ratings: High - Low",
              }}
              onOptionSelect={(order) => {
                if (order) {
                  const newQuery = { ...router.query, order };
                  router.replace({
                    pathname: location.pathname,
                    query: newQuery,
                  });
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="results">
        <Filter
          active={filterActive}
          current={categoryId}
          urlPath={router.asPath.split("?")[0]}
          currentSizes={sizes}
          currentColor={typeof colorway == "string" ? colorway : ""}
          currentHeight={typeof height == "string" ? height : ""}
          currentPrice={typeof price == "string" ? price : ""}
          setState={() => setFilterActive(false)}
        />

        <div
          className={
            "results__container" +
            (filterActive ? " results__container--filter" : "")
          }
        >
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
    </>
  );
}

export const getServerSideProps = withSessionSsr(async function ({
  params,
  req,
  query,
}) {
  const [category = "men", type] = params?.categoryId as string[];
  const {
    offset = 0,
    limit = RESULTS_PER_PAGE,
    colorways,
    sizes,
    height,
    price,
    order,
  } = query;

  let filters: { [filter: string]: any } = {};
  if (colorways) {
    if (typeof colorways == "string") {
      filters["color"] = { equals: colorways };
    } else {
      filters["color"] = { in: colorways };
    }
  }
  if (sizes && sizes.length) {
    if (sizes instanceof Array) {
      filters["sizes"] = { hasSome: sizes.map((size) => Number(size)) };
    } else {
      filters["sizes"] = { has: Number(sizes) };
    }
  }
  if (height && typeof height == "string") {
    filters["type"] = { equals: height };
  }
  if (price && typeof price == "string") {
    const [priceMin, priceMax] = price?.replaceAll(/[\s$]/g, "").split("-");
    if (Number(priceMax) > 999) {
      filters["price"] = { gte: Number(priceMin) };
    } else {
      filters["price"] = { gte: Number(priceMin), lte: Number(priceMax) };
    }
  }

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

  const select = {
    title: true,
    price: true,
    discount: true,
    mediaURLs: true,
    gender: true,
    ratings: true,
    sku: true,
    id: true,
  };

  let products = [];
  let count = 0;
  let gender = category.toUpperCase() as Gender;
  if (gender in Gender) {
    if (typeof type == "string") {
      products = await prisma.product.findMany({
        select,
        where: {
          ...filters,
          gender,
          title: { contains: type, mode: "insensitive" },
        },
        skip: Number(offset),
        take: Number(limit),
        ...orderBy,
      });
      count = await prisma.product.count({
        where: {
          ...filters,
          gender,
          title: { contains: type, mode: "insensitive" },
        },
      });
    } else {
      products = await prisma.product.findMany({
        select,
        where: { ...filters, gender },
        skip: Number(offset),
        take: Number(limit),
        ...orderBy,
      });
      count = await prisma.product.count({ where: { ...filters, gender } });
    }
  } else if (category == "colorways" && typeof colorways == "string") {
    products = await prisma.product.findMany({
      select,
      where: {
        ...filters,
        color: { contains: colorways, mode: "insensitive" },
      },
      skip: Number(offset),
      take: Number(limit),
      ...orderBy,
    });
    count = await prisma.product.count({
      where: {
        ...filters,
        color: { contains: colorways, mode: "insensitive" },
      },
    });
  } else if (category == "new") {
    products = await prisma.product.findMany({
      select,
      where: { ...filters },
      orderBy: { year: "desc", dateAdded: "desc" },
      skip: Number(offset),
      take: Number(limit),
    });
    count = await prisma.product.count({ where: { ...filters } });
  } else if (category == "best") {
    products = await prisma.product.findMany({
      select,
      where: { ...filters },
      orderBy: { salesCount: "desc" },
      skip: Number(offset),
      take: Number(limit),
    });
    count = await prisma.product.count({ where: { ...filters } });
  } else if (category == "type" && typeof type == "string") {
    const cType = type.toUpperCase() as Category;
    products = await prisma.product.findMany({
      select,
      where: { ...filters, type: cType },
      skip: Number(offset),
      take: Number(limit),
      ...orderBy,
    });
    count = await prisma.product.count({ where: { ...filters, type: cType } });
  } else {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products,
      count,
      categoryId: category || "",
    },
  };
});
