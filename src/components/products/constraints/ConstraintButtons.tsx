import {
  filterStateType,
  useProductsState,
} from "@Lib/contexts/ProductsContext";
import { VscChromeClose } from "react-icons/vsc";

export default function ConstraintButtons({
  paramName,
  items,
}: {
  paramName: string;
  items: string[] | number[];
}) {
  const { filterState, filterListings } = useProductsState();

  const handleRemove = (val: string | number) => {
    const values = filterState[paramName as keyof filterStateType];

    if (Array.isArray(values)) {
      filterListings({
        [paramName]: [...values].filter((v: string | number) => v != val),
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
