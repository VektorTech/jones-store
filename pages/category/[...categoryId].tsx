import { BsSliders } from "react-icons/bs";

import FilterAccordion from "@Components/products/filter/FilterAccordion";
import BreadCrumbs from "@Components/products/BreadCrumbs";
import Pagination from "@Components/products/Pagination";

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
import Constraints from "@Components/products/constraints";
import FilterSortSection from "@Components/products/FilterSortSection";
import { RESULTS_PER_PAGE } from "@Lib/constants";
import ProductsGrid from "@Components/products/ProductsGrid";

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
    colorways,
    sizes,
    height,
    price,
    categoryId: category,
  } = router.query;

  const [filterActive, setFilterActive] = useState(false);
  const { currentDialog } = useDialog();

  useEffect(() => {
    if (innerWidth <= 992)
      document.body.style.overflow = filterActive ? "hidden" : "auto";
  }, [filterActive, currentDialog]);

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
      <Constraints allProductsCount={count} currentProductsCount={count} />
      <FilterSortSection toggleFilter={() => setFilterActive(!filterActive)} />

      <div className="results">
        <FilterAccordion active={filterActive} setState={() => setFilterActive(false)} />

        <div
          className={
            "results__container" +
            (filterActive ? " results__container--filter" : "")
          }
        >
          <ProductsGrid products={products} />
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
          title: { contains: type.replaceAll("-", " "), mode: "insensitive" },
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
