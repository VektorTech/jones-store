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

  const [filterState, setFilterState] = useState({
    colorways,
    sizes,
    height,
    price,
    year
  });

  const [minPrice, maxPrice] =
    typeof filterState.price == "string"
      ? filterState.price.split("-")
      : [0, 1000];

  const onSubmit = () => {
    const newQuery = removeEmpty({
      ...router.query,
      ...filterState,
      categoryId: null,
    });
    router.replace({ pathname: location.pathname, query: newQuery });
  };

  const onClear = () => {
    setFilterState({
      colorways: [""],
      sizes: [""],
      height: "",
      price: "0-1000",
      year: "2022"
    });
  };

  const sizesObj = useMemo(
    () => listToEnum([...Array(37)].map((_, i) => String(2 + i / 2))),
    []
  );

  return (
    <div className={"filter" + (active ? " filter--active" : "")}>
      <div className="filter__head">
        <span>Filter</span>
        <button onClick={() => setState(false)} className="filter__hide">
          <IoIosArrowBack />
        </button>
      </div>

      <GenderParam current={categoryId?.[0]} />
      <MainColorParam
        colorways={filterState.colorways}
        setFilterState={(colors) =>
          setFilterState({
            ...filterState,
            colorways: colors,
          })
        }
      />
      <SizesParam
        sizes={filterState.sizes}
        setFilterState={(checkedSizes) =>
          setFilterState({
            ...filterState,
            sizes: checkedSizes,
          })
        }
      />
      <HeightParam
        heights={filterState.height}
        setFilterState={(checkedHeights) =>
          setFilterState({
            ...filterState,
            sizes: checkedHeights,
          })
        }
      />
      <PriceFilterParam
        minPrice={Number(minPrice)}
        maxPrice={Number(maxPrice)}
        setFilterState={(minPrice, maxPrice) =>
          setFilterState({
            ...filterState,
            price: `${minPrice}-${maxPrice}`,
          })
        }
      />
      <YearParam
        setFilterState={(year) =>
          setFilterState({
            ...filterState,
            year,
          })
        }
      />

      <div className="filter__confirm">
        <Button onClick={onSubmit} type="submit" className="filter__done">
          See Results
        </Button>
        <Button onClick={onClear} type="submit" className="filter__clear-all">
          clear filters
        </Button>
      </div>
    </div>
  );
}
