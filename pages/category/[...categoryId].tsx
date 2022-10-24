// import Link from "next/link";
// import { useRouter } from "next/router";

import { VscChromeClose } from "react-icons/vsc";
import { BsSliders } from "react-icons/bs";

import Filter from "@Components/productList/Filter";
import BreadCrumbs from "@Components/productList/BreadCrumbs";
import Pagination from "@Components/productList/Pagination";

import prisma from "@Lib/prisma";
import { withSessionSsr } from "@Lib/withSession";
import { Gender, Product, Category } from "@prisma/client";
import SEO from "@Components/common/SEO";
import Button from "@Components/common/formControls/Button";
import Dropdown from "@Components/common/formControls/Dropdown";

import { useState } from "react";

export default function CategoryPage({
  categoryId,
  products,
}: {
  categoryId: string;
  products: Product[];
}) {
  const [active, setActive] = useState(true);
  // const router = useRouter();
  // const { categoryId } = router.query;
  // console.log(products);

  return (
    <>
      <SEO title={categoryId.toUpperCase()} />
      <div className="constraints">
        <div className="constraints__container">
          <BreadCrumbs />
          <hr className="constraints__hr" />
          <h1 className="constraints__title">{categoryId}</h1>
          <p className="constraints__summary">
            Showing <strong>1</strong> &mdash; <strong>48</strong> of{" "}
            <strong>375</strong> results
          </p>
          <div className="constraints__filters">
            <button className="constraints__filter">
              <strong>Brand</strong> <span>Jordan</span>
              <span role="button" className="constraints__filter-close">
                <VscChromeClose />
              </span>
            </button>
            <button className="constraints__filter">
              <strong>Gender</strong> <span>Women</span>
              <span role="button" className="constraints__filter-close">
                <VscChromeClose />
              </span>
            </button>
            <button className="constraints__filter constraints__filter--clear">
              Clear All
              <span role="button" className="constraints__filter-close">
                <VscChromeClose />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="filter-sort">
        <div className="filter-sort__container">
          <Button onClick={() => setActive(!active)} className="filter-sort__toggle">
            <BsSliders className="filter-sort__toggle-icon" />
            <span>filter</span>
          </Button>

          <div className="filter-sort__sort-by">
            <Dropdown
              label="Sort By"
              className="filter-sort__sort-select"
              options={{
                price: "Price",
                asc_price: "Ascending: Price",
                relevance: "Relevance",
                asc_relevance: "Ascending: Relevance",
                ratings: "Ratings",
                asc_ratings: "Ascending: Ratings",
              }}
            />
          </div>
        </div>
      </div>

      <div className="results">
        <Filter active={active} setState={(state: boolean) => setActive(state)} />

        <div className={"results__container" + (active ? " results__container--filter" : "")}>
          <div className="results__grid"></div>
          <Pagination />
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
  const [category, type] = params?.categoryId as string[];
  const { offset = 0, limit = 20 } = query;

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
  let gender = category.toUpperCase() as Gender;
  if (gender in Gender) {
    if (typeof type == "string") {
      products = await prisma.product.findMany({
        select,
        where: { gender, title: { contains: type, mode: "insensitive" } },
        skip: Number(offset),
        take: Number(limit),
      });
    } else {
      products = await prisma.product.findMany({
        select,
        where: { gender },
        skip: Number(offset),
        take: Number(limit),
      });
    }
  } else if (category == "colorways" && typeof type == "string") {
    products = await prisma.product.findMany({
      select,
      where: { color: { equals: type, mode: "insensitive" } },
      skip: Number(offset),
      take: Number(limit),
    });
  } else if (category == "new") {
    products = await prisma.product.findMany({
      select,
      orderBy: { year: "desc", dateAdded: "desc" },
      skip: Number(offset),
      take: Number(limit),
    });
  } else if (category == "best") {
    products = await prisma.product.findMany({
      select,
      orderBy: { salesCount: "desc" },
      skip: Number(offset),
      take: Number(limit),
    });
  } else if (category == "type" && typeof type == "string") {
    const cType = type.toUpperCase() as Category;
    products = await prisma.product.findMany({
      select,
      where: { type: cType },
      skip: Number(offset),
      take: Number(limit),
    });
  } else {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products,
      categoryId: category || "",
    },
  };
});
