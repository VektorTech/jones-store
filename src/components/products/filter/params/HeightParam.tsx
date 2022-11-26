import { Category } from "@prisma/client";

import RadioList from "@Components/formControls/RadioList";
import FilterHeaderParam from "../FilterHeaderParam";

import { useProductsState } from "@Lib/contexts/ProductsContext";

export default function HeightParam() {
  const { filterListings, filterState } = useProductsState();

  return (
    <FilterHeaderParam type="Height">
      <RadioList
        name="height"
        values={Category}
        checkbox
        checkedItems={filterState.height}
        key={`height-param-${filterState.height.length}`}
        onChecked={(items) => filterListings({ height: items })}
        render={({ label, checked }) => (
          <span
            className={
              "filter-param__option" +
              (checked ? " filter-param__option--checked" : "")
            }
          >
            {label} TOP
          </span>
        )}
      />
    </FilterHeaderParam>
  );
}
