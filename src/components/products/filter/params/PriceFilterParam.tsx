import PriceRange from "@Components/formControls/PriceRange";
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
        onMinUpdate={(min) => updateHandler(min, filterState.price[1])}
        onMaxUpdate={(max) => updateHandler(filterState.price[0], max)}
        minPrice={Math.round(filterState.price[0])}
        maxPrice={Math.round(filterState.price[1])}
      />
    </FilterHeaderParam>
  );
}
