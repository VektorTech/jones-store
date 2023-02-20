import RadioList from "../formControls/RadioList";

import { listToEnum } from "src/utils";

const sizeListObj = listToEnum([...Array(37)].map((_, i) => String(2 + i / 2)));

export default function SizeOptions({
  values,
  checkedItems,
  label,
  checkbox = false,
  id = "",
  onChecked,
}: PropTypes) {
  return (
    <RadioList
      key={`size-options-${checkedItems?.length || 0}`}
      name="sizes"
      checkbox={checkbox}
      label={label}
      grid
      className="size-options"
      id={id}
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
  id?: string;
  checkbox?: boolean;
  onChecked?: (items: string | string[], value: string | undefined) => void;
}
