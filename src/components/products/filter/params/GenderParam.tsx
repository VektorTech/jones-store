import Link from "next/link";

import FilterHeaderParam from "../FilterHeaderParam";

import { useProductsState } from "@Lib/contexts/ProductsContext";

export default function GenderParam() {
  const { filterListings, filterState } = useProductsState();

  return (
    <FilterHeaderParam type="Gender">
      {["men", "women", "kids", "baby", "unisex"].map((gender) => (
        <p
          className={
            "filter-param__link" +
            (gender == filterState.gender.toLowerCase()
              ? " filter-param__link--active"
              : "")
          }
          key={gender}
        >
          <Link href={`/category/${gender}`}>
            <a
              onClick={(e) => {
                e.preventDefault();
                filterListings({ gender: gender.toUpperCase() });
              }}
            >
              {gender.toUpperCase()}
            </a>
          </Link>
        </p>
      ))}
    </FilterHeaderParam>
  );
}
