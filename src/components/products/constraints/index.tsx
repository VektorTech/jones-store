import { useRouter } from "next/router";

import ConstraintButtons from "./ConstraintButtons";

import { useProductsState } from "@Lib/contexts/ProductsContext";

export default function Constraints({
  allProductsCount,
  currentProductsCount,
  isSearch,
}: PropTypes) {
  const router = useRouter();
  const { search } = router.query;
  const { filterState } = useProductsState();

  return (
    <div className="constraints">
      <div className="constraints__container">
        <hr className="constraints__hr" />
        <h1 className="constraints__title">
          {isSearch ? (
            <>&ldquo;{search}&rdquo;</>
          ) : (
            filterState.gender.toLowerCase()
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
            <ConstraintButtons paramName="color" items={filterState.color} />
            <ConstraintButtons paramName="Size" items={filterState.size} />
            <ConstraintButtons paramName="height" items={filterState.height} />
            <ConstraintButtons paramName="year" items={filterState.year} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface PropTypes {
  allProductsCount: number;
  currentProductsCount: number;
  isSearch?: boolean;
}
