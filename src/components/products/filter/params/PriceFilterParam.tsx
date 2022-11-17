import PriceRange from "@Components/common/formControls/PriceRange";
import FilterHeaderParam from "../FilterHeaderParam";

import { useProductsState } from "@Lib/contexts/ProductsContext";

export default function PriceFilterParam() {
  const { filterListings, filterState } = useProductsState();

  return (
    <FilterHeaderParam type="Filter By Price">
      <PriceRange
        onUpdate={(min, max) => filterListings({ price: [min, max] })}
        minPrice={Math.floor(filterState.price[0])}
        maxPrice={Math.floor(filterState.price[1])}
      />
    </FilterHeaderParam>
  );
}
