import AutoComplete from "@Components/common/formControls/AutoComplete";
import RadioList from "@Components/common/formControls/RadioList";
import { listToEnum, range } from "@Lib/utils";
import { Category } from "@prisma/client";
import { useRef } from "react";
import FilterHeaderParam from "../FilterHeaderParam";

export default function YearParam({
  setFilterState,
}: {
  setFilterState: (checkedHeights: string | string[]) => void;
}) {
  const values = useRef(listToEnum(range(1985, 2022)));

  return (
    <FilterHeaderParam type="Year">
      <RadioList
        name="year"
        values={values.current}
        checkbox
        // checkedItems={typeof heights == "string" ? [heights] : []}
        onChecked={(items) => setFilterState(items)}
        render={({ label, checked }) => (
          <span
            className={
              "filter__param-option" +
              (checked ? " filter__param-option--checked" : "")
            }
          >
            {label}
          </span>
        )}
      />
    </FilterHeaderParam>
  );
}
