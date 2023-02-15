import { BsSliders } from "react-icons/bs";

import Button from "@Components/formControls/Button";
import Dropdown from "@Components/formControls/Dropdown";

import { useProductsState } from "@Contexts/ProductsContext";

export default function FilterSortSection({ toggleFilter }: PropTypes) {
  const { sortListings, sortBy } = useProductsState();

  return (
    <div className="filter-sort">
      <div className="filter-sort__container">
        <Button onClick={toggleFilter} className="filter-sort__toggle">
          <BsSliders className="filter-sort__toggle-icon" />
          <span>filter</span>
        </Button>

        <div className="filter-sort__sort-by">
          <Dropdown
            key={sortBy}
            label="Sort By"
            className="filter-sort__sort-select"
            value={sortBy}
            options={{
              default: "Default",
              best: "Highest Sales",
              asc_price: "Price: Low - High",
              price: "Price: High - Low",
              asc_ratings: "Ratings: Low - High",
              ratings: "Ratings: High - Low",
              year_new: "Year: Newest",
              year_old: "Year: Oldest",
            }}
            onOptionSelect={(order) => {
              if (order) {
                sortListings(order);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface PropTypes {
  toggleFilter?: () => void;
}
