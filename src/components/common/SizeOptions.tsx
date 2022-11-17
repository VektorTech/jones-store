import RadioList from "./formControls/RadioList";

import { listToEnum } from "@Lib/utils";

const sizeListObj = listToEnum([...Array(37)].map((_, i) => String(2 + i / 2)));

export default function SizeOptions({
  checkedItems,
  onChecked,
  label,
  checkbox = false,
}: PropTypes) {
  return (
    <RadioList
      name="sizes"
      checkbox={checkbox}
      label={label}
      grid
      values={sizeListObj}
      checkedItems={checkedItems}
      onChecked={onChecked}
      render={({ label, checked }) => (
        <span
          className={
            "filter-param__box" + (checked ? " filter-param__box--checked" : "")
          }
        >
          {label}
        </span>
      )}
    />
  );
}

interface PropTypes {
  checkedItems?: string[];
  onChecked?: (items: string | string[], value?: string | undefined) => void;
  label?: string;
  checkbox?: boolean;
}
