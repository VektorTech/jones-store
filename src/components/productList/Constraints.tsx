import { VscChromeClose } from "react-icons/vsc";

export default function Constraint() {
  return (
    <>
      <button className="constraints__filter">
        <strong>Colorway</strong> <span>{}</span>
        <span role="button" className="constraints__filter-close">
          <VscChromeClose />
        </span>
      </button>
      <button className="constraints__filter">
        <strong>Gender</strong> <span>{}</span>
        <span role="button" className="constraints__filter-close">
          <VscChromeClose />
        </span>
      </button>
      <button className="constraints__filter constraints__filter--clear">
        Clear All
        <span role="button" className="constraints__filter-close">
          <VscChromeClose />
        </span>
      </button>
    </>
  );
}
