import { useRouter } from "next/router";

import ConstraintButtons from "./ConstraintButtons";

import { useProductsState } from "@Contexts/ProductsContext";

export default function Constraints({
  allProductsCount,
  currentProductsCount,
  isSearch,
}: PropTypes) {
  const router = useRouter();
  const { search, q, categoryId } = router.query;
  const { filterState, clearFilters } = useProductsState();
  const { color, size, height, year } = filterState;
  const clearAllVisible = !!(
    color.length +
    size.length +
    height.length +
    year.length
  );
  const title = {
    new: "New Arrivals",
    best: "Best Sellers",
  }[Array.isArray(categoryId) ? categoryId[0] : categoryId ?? ""];

  return (
    <section className="constraints">
      <div className="constraints__container">
        <hr className="constraints__hr" />
        <h1 className="constraints__title">
          {isSearch ? (
            <>&ldquo;{search || q}&rdquo;</>
          ) : (
            title ?? filterState.gender.toLowerCase()
          )}
        </h1>
        {currentProductsCount ? (
          <p className="constraints__summary">
            <strong>{allProductsCount}</strong> results
          </p>
        ) : (
          <p>
            <strong>Nothing Found!</strong>
          </p>
        )}
        {!isSearch ? (
          <div className="constraints__filters">
            <ConstraintButtons paramName="color" items={color} />
            <ConstraintButtons paramName="size" items={size} />
            <ConstraintButtons paramName="height" items={height} />
            <ConstraintButtons paramName="year" items={year} />
          </div>
        ) : null}

        {clearAllVisible ? (
          <button
            onClick={clearFilters}
            className="constraints__filter constraints__filter--clear"
          >
            clear all
          </button>
        ) : null}
      </div>
    </section>
  );
}

interface PropTypes {
  allProductsCount: number;
  currentProductsCount: number;
  isSearch?: boolean;
}
