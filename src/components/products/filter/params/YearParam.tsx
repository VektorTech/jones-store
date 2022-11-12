import AutoComplete from "@Components/common/formControls/AutoComplete";
import RadioList from "@Components/common/formControls/RadioList";
import { useProductsState } from "@Lib/contexts/ProductsContext";
import { listToEnum, range } from "@Lib/utils";
import { Category } from "@prisma/client";
import { useRef } from "react";
import FilterHeaderParam from "../FilterHeaderParam";

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
