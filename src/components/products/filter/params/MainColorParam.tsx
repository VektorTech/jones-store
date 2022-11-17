import RadioList from "@Components/common/formControls/RadioList";
import FilterHeaderParam from "../FilterHeaderParam";

import { useProductsState } from "@Lib/contexts/ProductsContext";

export default function MainColorParam() {
  const { filterListings, filterState } = useProductsState();

  return (
    <FilterHeaderParam type="Main Color">
      <RadioList
        name="colorways"
        checkbox
        values={colorsHex}
        checkedItems={filterState.color}
        onChecked={(items) => filterListings({ color: items })}
        render={({ label, checked, value }) => (
          <span
            className={
              "filter-param__option" +
              (checked ? " filter-param__option--checked" : "")
            }
          >
            <span
              style={{ background: label }}
              className="filter-param__option-color"
            ></span>
            {value}
          </span>
        )}
      />
    </FilterHeaderParam>
  );
}

const colorsHex: { [color: string]: string } = {
  Black: "#000",
  White: "#fff",
  "Twist W Panda": "linear-gradient(to right, #000 50%, #fff 50%)",
  "Dark Mocha": "#3e2f35",
  Brown: "#563d2d",
  "University Blue": "#99badd",
  "University Blue Black": "linear-gradient(to right, #99badd 50%, #000 50%)",
  Denim: "#acc5da",
  Blue: "#316fb4",
  "Court Purple": "#6a0dad",
  "Midnight Navy": "#333356",
  Chicago: "#d22030",
  Bred: "linear-gradient(to right, #000 50%, #ce2029 50%)",
  "Varsity Red": "#b01317",
  "Fire Red": "#eb3a1e",
  "Pink Glaze": "#f7c4d6",
  Pinksicle: "#f8b0bc",
  "Lucky Green": "#0c9e5a",
  "Clay Green": "#778a5f",
  "Yellow Toe":
    "linear-gradient(to right, #000 33%, #fff 33%, #fff 66%, #ffcc00 66%)",
  Shadow: "linear-gradient(to right, #949494 50%, #000 50%)",
  "Wolf Grey": "#919494",
  Grey: "#ccc",
  "Multi Color":
    "radial-gradient(circle, #003049 25%, #d62828 30%, #d62828 50%, #fcbf49 55%)",
};
