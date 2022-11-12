import PriceRange from "@Components/common/formControls/PriceRange";
import { useProductsState } from "@Lib/contexts/ProductsContext";
import FilterHeaderParam from "../FilterHeaderParam";

export default function PriceFilterParam() {
  const { filterListings, filterState } = useProductsState();

  return (
    <FilterHeaderParam type="Filter By Price">
      <PriceRange
        onUpdate={(min, max) => filterListings({ price: [min, max] })}
        minPrice={filterState.price[0]}
        maxPrice={filterState.price[1]}
      />
    </FilterHeaderParam>
  );
}
