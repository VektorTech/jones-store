import RadioList from "@Components/common/formControls/RadioList";
import { useProductsState } from "@Lib/contexts/ProductsContext";
import { Category } from "@prisma/client";
import FilterHeaderParam from "../FilterHeaderParam";

export default function HeightParam() {
  const { filterListings, filterState } = useProductsState();

  return (
    <FilterHeaderParam type="Height">
      <RadioList
        name="height"
        values={Category}
        checkbox
        checkedItems={filterState.height}
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
