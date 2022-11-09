import SizeOptions from "@Components/common/SizeOptions";
import FilterHeaderParam from "../FilterHeaderParam";

export default function SizesParam({
  sizes,
  setFilterState,
}: {
  sizes?: string[] | string;
  setFilterState: (checkedSizes: string | string[]) => void;
}) {
  return (
    <FilterHeaderParam type="US Sizes">
      <SizeOptions
        checkedItems={sizes instanceof Array ? sizes : []}
        onChecked={(items) => setFilterState(items)}
      />
    </FilterHeaderParam>
  );
}
