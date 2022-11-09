import { BsSliders } from "react-icons/bs";

import Button from "@Components/common/formControls/Button";
import Dropdown from "@Components/common/formControls/Dropdown";
import { useRouter } from "next/router";

export default function FilterSortSection({
  toggleFilter,
}: {
  toggleFilter?: () => void;
}) {
  const router = useRouter();

  return (
    <div className="filter-sort">
      <div className="filter-sort__container">
        <Button onClick={toggleFilter} className="filter-sort__toggle">
          <BsSliders className="filter-sort__toggle-icon" />
          <span>filter</span>
        </Button>

        <div className="filter-sort__sort-by">
          <Dropdown
            label="Sort By"
            className="filter-sort__sort-select"
            options={{
              relevance: "Relevance",
              asc_price: "Price: Low - High",
              price: "Price: High - Low",
              asc_ratings: "Ratings: Low - High",
              ratings: "Ratings: High - Low",
            }}
            onOptionSelect={(order) => {
              if (order) {
                const newQuery = { ...router.query, order };
                router.replace({
                  pathname: location.pathname,
                  query: newQuery,
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
