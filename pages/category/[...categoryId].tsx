import type { ProductComponentType } from "src/types/shared";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Gender } from "@prisma/client";

import FilterAccordion from "@Components/products/filter/FilterAccordion";
import SEO from "@Components/common/SEO";
import Constraints from "@Components/products/constraints";
import FilterSortSection from "@Components/products/FilterSortSection";
import ProductsGrid from "@Components/products/ProductsGrid";

import prisma from "@Lib/prisma";
import { withSessionSsr } from "@Lib/withSession";
import { HIGHEST_PRICE } from "@Lib/constants";

import { useDialog } from "@Lib/contexts/UIContext";
import ProductsProvider, {
  filterStateType,
  useProductsState,
} from "@Lib/contexts/ProductsContext";
import { getBase64UrlCloudinary, getProductRatings } from "@Lib/helpers";

function CategoryPage({ categoryId }: { categoryId: string }) {
  const { products } = useProductsState();
  const count = products.length;

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
  productImagePlaceholders,
}: {
  categoryId: string;
  products: ProductComponentType[];
  productImagePlaceholders: Record<string, string>;
}) {
  const router = useRouter();
  const ref = useRef<{ updateFilterState: Function }>(null);

  const getQueryAsFilter = () => {
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
        if (value[1]) queryAsFilter["search"] = value[1];
      } else if (
        param == "categoryId" &&
        (value == "colorways" || value == "new")
      ) {
        queryAsFilter["page"] = value;
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
        queryAsFilter[param] = Array.isArray(value) ? value : [value ?? ""];
      }
      if (param == "sort" && typeof value == "string") {
        queryAsFilter[param] = value;
      }
    });

    return queryAsFilter;
  };

  useEffect(() => {
    const routeChangeHandler = () => {
      if (ref.current) ref.current.updateFilterState?.(getQueryAsFilter());
    };
    router.events.on("routeChangeComplete", routeChangeHandler);
    return () => router.events.off("routeChangeComplete", routeChangeHandler);
  });

  return (
    <ProductsProvider
      productImagePlaceholders={productImagePlaceholders}
      ref={ref}
      preFilter={getQueryAsFilter()}
      products={products}
    >
      <CategoryPage categoryId={categoryId} />
    </ProductsProvider>
  );
}

export const getServerSideProps = withSessionSsr(async function ({ params }) {
  const [category = "men"] = params?.categoryId as string[];

  const allProducts = await Promise.all(
    (
      await prisma.product.findMany({
        orderBy: { dateAdded: "desc" },
      })
    ).map(async (product) => ({
      ...product,
      dateAdded: product.dateAdded.toJSON(),
      ratings: await getProductRatings(product.id),
    }))
  );
  const productImagePlaceholders: Record<string, string> = {};

  for await (const _product of allProducts) {
    const imageUrl = _product.mediaURLs[0];
    const imageId = imageUrl.match(/upload\/(.+)/)?.[1] ?? "";

    productImagePlaceholders[_product.id] = await getBase64UrlCloudinary(
      imageId
    );
  }

  return {
    props: {
      products: allProducts,
      count: allProducts.length,
      categoryId: category ?? "",
      productImagePlaceholders,
    },
  };
});
