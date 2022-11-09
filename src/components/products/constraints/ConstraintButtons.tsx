import { VscChromeClose } from "react-icons/vsc";

export default function ConstraintButtons({
  paramName,
  items,
}: {
  paramName: string;
  items: string[] | number[];
}) {
  return (
    <>
      {items.map((item) =>
        item ? (
          <button key={item} className="constraints__filter">
            <strong>{paramName}</strong> <span>{item}</span>
            <span role="button" className="constraints__filter-close">
              <VscChromeClose />
            </span>
          </button>
        ) : null
      )}
    </>
  );
}

// <button className="constraints__filter constraints__filter--clear">
// Clear All
// <span role="button" className="constraints__filter-close">
//   <VscChromeClose />
// </span>
// </button>
