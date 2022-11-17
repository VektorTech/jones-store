import RadioList from "./formControls/RadioList";

import { listToEnum } from "@Lib/utils";

const sizeListObj = listToEnum([...Array(37)].map((_, i) => String(2 + i / 2)));

export default function SizeOptions({
  values,
  checkedItems,
  label,
  checkbox = false,
  onChecked,
}: PropTypes) {
  return (
    <RadioList
      name="sizes"
      checkbox={checkbox}
      label={label}
      grid
      values={values ?? sizeListObj}
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
  values?: {
    [value: string]: string | number;
    [value: number]: string | number;
  };
  checkedItems?: string[];
  label?: string;
  checkbox?: boolean;
  onChecked?: (items: string | string[], value?: string | undefined) => void;
}
