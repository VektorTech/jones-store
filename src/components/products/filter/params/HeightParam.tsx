import RadioList from "@Components/common/formControls/RadioList";
import { Category } from "@prisma/client";
import FilterHeaderParam from "../FilterHeaderParam";

export default function HeightParam({
  heights,
  setFilterState,
}: {
  heights?: string[] | string;
  setFilterState: (checkedHeights: string | string[]) => void;
}) {
  return (
    <FilterHeaderParam type="Height">
      <RadioList
        name="height"
        values={Category}
        checkedItems={typeof heights == "string" ? [heights] : []}
        onChecked={(items) => setFilterState(items)}
        render={({ label, checked }) => (
          <span
            className={
              "filter__param-option" +
              (checked ? " filter__param-option--checked" : "")
            }
          >
            {label} TOP
          </span>
        )}
      />
    </FilterHeaderParam>
  );
}
