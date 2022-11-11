import PriceRange from "@Components/common/formControls/PriceRange";
import FilterHeaderParam from "../FilterHeaderParam";

export default function PriceFilterParam({
  minPrice,
  maxPrice,
  setFilterState,
}: {
  minPrice: number;
  maxPrice: number;
  setFilterState: (minPrice: number, maxPrice: number) => void;
}) {
  return (
    <FilterHeaderParam type="Filter By Price">
      <PriceRange
        onUpdate={setFilterState}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </FilterHeaderParam>
  );
}
