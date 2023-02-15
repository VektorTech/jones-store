import { VscChromeClose } from "react-icons/vsc";

import {
  filterStateType,
  useProductsState,
} from "@Contexts/ProductsContext";

export default function ConstraintButtons({ paramName, items }: PropTypes) {
  const { filterState, filterListings } = useProductsState();

  const handleRemove = (value: string | number) => {
    const values = filterState[paramName as keyof filterStateType];

    if (Array.isArray(values)) {
      filterListings({
        [paramName]: [...values].filter(
          (_value: string | number) => _value != value
        ),
      });
    }
  };

  return (
    <>
      {items.map((item) =>
        item ? (
          <button key={item} className="constraints__filter">
            <strong>{paramName}</strong> <span>{item}</span>
            <span
              onClick={() => handleRemove(item)}
              role="button"
              className="constraints__filter-close"
            >
              <VscChromeClose />
            </span>
          </button>
        ) : null
      )}
    </>
  );
}

interface PropTypes {
  paramName: string;
  items: string[] | number[];
}
