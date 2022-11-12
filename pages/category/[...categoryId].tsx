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
import { HIGHEST_PRICE, RESULTS_PER_PAGE } from "@Lib/constants";
import ProductsGrid from "@Components/products/ProductsGrid";
import ProductsProvider, {
  filterStateType,
  useProductsState,
} from "@Lib/contexts/ProductsContext";

function CategoryPage({ categoryId }: { categoryId: string }) {
  const { products } = useProductsState();
  const count = products.length;

  const router = useRouter();
  const { offset = 0 } = router.query;

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
        <FilterAccordion
          active={filterActive}
          setState={() => setFilterActive(false)}
        />

        <div
          className={
            "results__container" +
            (filterActive ? " results__container--filter" : "")
          }
        >
          <ProductsGrid products={products} />
        </div>
      </div>
    </>
  );
}

export default function CategoryPageWithContext({
  categoryId,
  products,
  count,
}: {
  categoryId: string;
  products: ProductType[];
  count: number;
}) {
  const router = useRouter();
  const queryAsFilter: Partial<filterStateType> = {
    price: [0, HIGHEST_PRICE],
  };
  Object.keys(router.query).forEach((param) => {
    const value = router.query[param];
    if (
      param == "categoryId" &&
      value &&
      value[0] &&
      Gender[value[0].toUpperCase() as Gender]
    ) {
      queryAsFilter["gender"] = value[0].toUpperCase();
    }
    if (param == "size" || param == "year") {
      queryAsFilter[param] = Array.isArray(value)
        ? value.map((v) => Number(v))
        : [Number(value)];
    }
    if (param == "min_price" && queryAsFilter["price"]) {
      queryAsFilter["price"][0] = Number(value);
    }
    if (param == "max_price" && queryAsFilter["price"]) {
      queryAsFilter["price"][1] = Number(value);
    }
    if (param == "color" || param == "height") {
      queryAsFilter[param] = Array.isArray(value) ? value : [value || ""];
    }
  });

  return (
    <ProductsProvider preFilter={queryAsFilter} products={products}>
      <CategoryPage categoryId={categoryId} />
    </ProductsProvider>
  );
}

export const getServerSideProps = withSessionSsr(async function ({
  params,
  req,
  query,
}) {
  const [category = "men", type] = params?.categoryId as string[];

  const select = {
    title: true,
    price: true,
    discount: true,
    mediaURLs: true,
    gender: true,
    ratings: true,
    sku: true,
    id: true,
    type: true,
    color: true,
    year: true,
    sizes: true,
  };

  const allProducts = await prisma.product.findMany({
    select,
  });

  return {
    props: {
      products: allProducts,
      count: allProducts.length,
      categoryId: category || "",
    },
  };
});
