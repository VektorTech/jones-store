import { useRef } from "react";

import RadioList from "@Components/formControls/RadioList";
import FilterHeaderParam from "../FilterHeaderParam";

import { useProductsState } from "@Lib/contexts/ProductsContext";
import { listToEnum, range } from "src/utils";

export default function YearParam() {
  const values = useRef(listToEnum(range(1985, new Date().getFullYear())));
  const { filterListings, filterState } = useProductsState();

  return (
    <FilterHeaderParam type="Year">
      <RadioList
        name="year"
        values={values.current}
        checkbox
        reverse
        checkedItems={filterState.year.map((y) => y.toString())}
        key={`year-param-${filterState.year.length}`}
        onChecked={(items) =>
          filterListings({ year: (items as string[]).map((y) => +y) })
        }
        render={({ label, checked }) => (
          <span
            className={
              "filter-param__option" +
              (checked ? " filter-param__option--checked" : "")
            }
          >
            {label}
          </span>
        )}
      />
    </FilterHeaderParam>
  );
}
