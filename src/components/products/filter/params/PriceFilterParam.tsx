import PriceRange from "@Components/common/formControls/PriceRange";
import FilterHeaderParam from "../FilterHeaderParam";

import { useProductsState } from "@Lib/contexts/ProductsContext";
import { useCallback } from "react";

export default function PriceFilterParam() {
  const { filterListings, filterState } = useProductsState();
  const updateHandler = useCallback(
    (min: number, max: number) => filterListings({ price: [min, max] }),
    []
  );

  return (
    <FilterHeaderParam type="Filter By Price">
      <PriceRange
        onUpdate={updateHandler}
        minPrice={Math.floor(filterState.price[0])}
        maxPrice={Math.floor(filterState.price[1])}
      />
    </FilterHeaderParam>
  );
}
