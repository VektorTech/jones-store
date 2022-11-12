import Button from "@Components/common/formControls/Button";
import RadioList from "@Components/common/formControls/RadioList";
import { IoIosArrowUp, IoIosArrowBack } from "react-icons/io";
import { useState, useRef, useEffect, useMemo, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Category } from "@prisma/client";
import { listToEnum } from "@Lib/utils";
import SizeOptions from "@Components/common/SizeOptions";
import PriceRange from "@Components/common/formControls/PriceRange";
import FilterHeaderParam from "./FilterHeaderParam";
import GenderParam from "./params/GenderParam";
import MainColorParam from "./params/MainColorParam";
import SizesParam from "./params/SizesParam";
import HeightParam from "./params/HeightParam";
import PriceFilterParam from "./params/PriceFilterParam";
import YearParam from "./params/YearParam";
import { useProductsState } from "@Lib/contexts/ProductsContext";

const removeEmpty = (obj: { [key: string]: any }) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (!newObj[key]) {
      delete newObj[key];
    }
  });
  return newObj;
};

export default function FilterAccordion({
  active,
  setState,
}: {
  active: boolean;
  setState: (state: boolean) => void;
}) {
  const router = useRouter();
  const { categoryId, colorways, sizes, height, price, year } = router.query;
  const { clearFilters } = useProductsState();

  const [filterState, setFilterState] = useState({
    colorways,
    sizes,
    height,
    price,
    year,
  });

  return (
    <div className={"filter" + (active ? " filter--active" : "")}>
      <div className="filter__head">
        <span>Filter</span>
        <button onClick={() => setState(false)} className="filter__hide">
          <IoIosArrowBack />
        </button>
      </div>

      <GenderParam />
      <MainColorParam />
      <SizesParam />
      <HeightParam />
      <PriceFilterParam />
      <YearParam />

      <div className="filter__confirm">
        <Button
          onClick={clearFilters}
          type="submit"
          className="filter__clear-all"
        >
          clear filters
        </Button>
      </div>
    </div>
  );
}
