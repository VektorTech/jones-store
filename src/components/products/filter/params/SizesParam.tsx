import SizeOptions from "@Components/common/SizeOptions";
import FilterHeaderParam from "../FilterHeaderParam";

import { useProductsState } from "@Contexts/ProductsContext";

export default function SizesParam() {
  const { filterListings, filterState } = useProductsState();

  return (
    <FilterHeaderParam type="US Sizes">
      <SizeOptions
        checkbox
        checkedItems={filterState.size.map((s) => s.toString())}
        onChecked={(items) => filterListings({ size: items })}
      />
    </FilterHeaderParam>
  );
}
