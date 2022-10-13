// import Link from "next/link";
import { useRouter } from "next/router";

import { VscChromeClose } from "react-icons/vsc";
import { BsSliders } from "react-icons/bs";
import { ImArrowDown } from "react-icons/im";

import Filter from "@Components/productList/Filter";
import BreadCrumbs from "@Components/productList/BreadCrumbs";
import Pagination from "@Components/productList/Pagination";

export default function Category({
  categoryId,
  products,
}: {
  categoryId: Gender;
  products: Product[];
}) {
  // const router = useRouter();
  // const { categoryId } = router.query;

  return (
    <div>
      <SEO title={categoryId} />
      <BreadCrumbs />
      <div className="constraints">
        <div className="constraints__container">
          <h1 className="constraints__title">{categoryId}</h1>
          <p className="constraints__summary">
            Showing <span>1</span> &mdash; <span>48</span> of <span>375</span>{" "}
            results
          </p>
          <div className="constraints__filters">
            <button className="constraints__filter">
              <span>Brand</span> <span>Jordan</span>
              <span role="button" className="constraints__filter-close">
                <VscChromeClose />
              </span>
            </button>
            <button className="constraints__filter">
              <span>Gender</span> <span>Women</span>
              <span role="button" className="constraints__filter-close">
                <VscChromeClose />
              </span>
            </button>
            <button className="constraints__clear-all">
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
          <button className="filter-sort__toggle">
            <BsSliders className="filter-sort__toggle-icon" />
            <span>filter</span>
          </button>

          <div className="filter-sort__sort-by">
            <span>Sort By</span>

            <select className="filter-sort__sort-select" name="" id="">
              <option value="">Relevance</option>
              <option value="">Price</option>
              <option value="">Ratings</option>
            </select>

            <button className="filter-sort__order">
              <ImArrowDown className="filter-sort__order-icon" />
            </button>
          </div>
        </div>
      </div>

      <div className="results">
        <div className="results__filter">
          <Filter />
        </div>

        <div className="results__grid"></div>
        <Pagination />
      </div>
    </div>
  );
}

import prisma from "@Lib/prisma";
import { withSessionSsr } from "@Lib/withSession";
import { Gender, Product } from "@prisma/client";
import SEO from "@Components/common/SEO";

export const getServerSideProps = withSessionSsr(async function ({
  params,
  req,
  query,
}) {
  const [category, type] = params?.categoryId as string[];
  const { offset = 0, limit = 10 } = query;

  // women, men, kids, baby, unisex women/*, men/*, colorways/*, new, best, type - low, mid, high

  // const results = await prisma.product
  //   .findMany({
  //     where: { gender: categoryId },
  //     skip: offset as number,
  //     take: limit as number,
  //   })
  //   .catch(console.log);

  return {
    props: {
      // products: results,
      categoryId: type?.toUpperCase() as Gender,
    },
  };
});
