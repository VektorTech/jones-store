import { listToEnum } from "@Lib/utils";
import RadioList from "./formControls/RadioList";

const sizeListObj = listToEnum([...Array(37)].map((_, i) => String(2 + i / 2)));

export default function SizeOptions({
  checkedItems,
  onChecked,
  label,
}: {
  checkedItems?: string[];
  onChecked?: (items: string | string[], value?: string | undefined) => void;
  label?: string;
}) {
  return (
    <RadioList
      name="sizes"
      checkbox
      label={label}
      grid
      values={sizeListObj}
      checkedItems={checkedItems}
      onChecked={onChecked}
      render={({ label, checked }) => (
        <span
          className={
            "filter__param-box" + (checked ? " filter__param-box--checked" : "")
          }
        >
          {label}
        </span>
      )}
    />
  );
}
