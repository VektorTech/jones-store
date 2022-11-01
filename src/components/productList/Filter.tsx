import Button from "@Components/common/formControls/Button";
import RadioList from "@Components/common/formControls/RadioList";
import { IoIosArrowUp, IoIosArrowBack } from "react-icons/io";
import { useState, useRef, useEffect, useMemo, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Category } from "@prisma/client";

export default function Filter({
  active,
  current,
  urlPath,
  currentSizes,
  currentHeight,
  currentPrice,
  currentColor,
  setState,
}: {
  active: boolean;
  current: string;
  urlPath: string;
  currentSizes?: string[] | string;
  currentHeight?: string;
  currentPrice?: string;
  currentColor?: string;
  setState: (state: boolean) => void;
}) {
  const [minPrice, maxPrice] = currentPrice?.split("-") || [0, 10000];

  const router = useRouter();
  const { categoryId, colorways, sizes, height, price } = router.query;

  const [filterState, setFilterState] = useState({
    colorways,
    sizes,
    height,
    price,
  });

  const onSubmit = () => {
    const newQuery = { ...router.query, ...filterState };
    router.replace({ pathname: location.pathname, query: newQuery });
  };

  const onClear = () => {
    setFilterState({
      colorways: [""],
      sizes: [""],
      height: "",
      price: "0-10000",
    });
  };

  const listToEnum = <T extends string | number>(list: T[]) => {
    return list.reduce<{ [K in T]: K }>((enumAccumulated, enumKey) => {
      enumAccumulated[enumKey] = enumKey;
      return enumAccumulated;
    }, Object.create({}));
  };

  const sizesObj = useMemo(() => listToEnum([...Array(37)].map((_, i) => String(2 + i / 2))), []);

  return (
    <div className={"filter" + (active ? " filter--active" : "")}>
      <div className="filter__head">
        <span>Filter</span>
        <button onClick={() => setState(false)} className="filter__hide">
          <IoIosArrowBack />
        </button>
      </div>

      <FilterParam type="Gender">
        {["men", "women", "kids", "baby", "unisex"].map((gender) => (
          <p
            className={
              "filter__param-link" +
              (gender == categoryId?.[0] ? " filter__param-link--active" : "")
            }
            key={gender}
          >
            <Link href={`/category/${gender}`}>
              <a>{gender.toUpperCase()}</a>
            </Link>
          </p>
        ))}
      </FilterParam>

      <FilterParam type="Main Color">
        <RadioList
          name="colorways"
          checkbox
          values={colorsHex}
          checkedItems={filterState.colorways instanceof Array ? filterState.colorways : []}
          onChecked={(items) =>
            setFilterState({
              ...filterState,
              colorways: items,
            })
          }
          render={({ label, checked, value }) => (
            <span
              className={
                "filter__param-option" +
                (checked ? " filter__param-option--checked" : "")
                // (currentColor == label ? " filter__param-option--active" : "")
              }
            >
              <span
                style={{ background: label }}
                className="filter__param-option-color"
              ></span>
              {value}
            </span>
          )}
        />
      </FilterParam>

      <FilterParam type="US Sizes">
        <RadioList
          name="sizes"
          checkbox
          grid
          values={sizesObj}
          checkedItems={filterState.sizes instanceof Array ? filterState.sizes : []}
          onChecked={(items) =>
            setFilterState({
              ...filterState,
              sizes: items,
            })
          }
          render={({ label, checked }) => (
            <span
              className={
                "filter__param-box" +
                (checked ? " filter__param-box--checked" : "") +
                (currentSizes == label ||
                (currentSizes instanceof Array &&
                  currentSizes?.includes(label.toString()))
                  ? " filter__param-box--active"
                  : "")
              }
            >
              {label}
            </span>
          )}
        />
      </FilterParam>

      <FilterParam type="Height">
        <RadioList
          name="height"
          values={Category}
          checkedItems={typeof filterState.height == "string" ? [filterState.height] : []}
          onChecked={(items) =>
            setFilterState({
              ...filterState,
              height: items,
            })
          }
          render={({ label, checked }) => (
            <span
              className={
                "filter__param-option" +
                (checked ? " filter__param-option--checked" : "") +
                (currentHeight == label ? " filter__param-option--active" : "")
              }
            >
              {label} TOP
            </span>
          )}
        />
      </FilterParam>

      <FilterParam type="Filter By Price">
        <PriceRange
          onUpdate={(minPrice, maxPrice) =>
            setFilterState({
              ...filterState,
              price: `${minPrice}-${maxPrice}`,
            })
          }
          preset={[minPrice, maxPrice]}
        />
      </FilterParam>

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

const PriceRange = ({
  preset,
  onUpdate,
}: {
  preset?: [min: string | number, max: string | number];
  onUpdate?: (minPrice: number, maxPrice: number) => void;
}) => {
  const HIGHEST_PRICE = 10000;
  const [valueMin, setValMin] = useState<string | number>(preset?.[0] || 0);
  const [valueMax, setValMax] = useState<string | number>(
    preset?.[1] || HIGHEST_PRICE.toString()
  );

  const [activeThumb, setActiveThumb] = useState("");
  const minRef = useRef<HTMLSpanElement>(null);
  const maxRef = useRef<HTMLSpanElement>(null);
  const rangeRef = useRef<HTMLSpanElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeThumb == "") {
      onUpdate?.(Number(valueMin), Number(valueMax));
    }
  }, [activeThumb, valueMin, valueMax]);

  useEffect(() => {
    const mouseUpHandler = (e: PointerEvent | TouchEvent) => {
      setActiveThumb("");
    };

    const asPercentage = (num: number) =>
      (num / Number(controlRef.current?.offsetWidth)) * 100;

    const mouseMoveHandler = (event: TouchEvent | PointerEvent) => {
      const minThumb = minRef.current;
      const maxThumb = maxRef.current;
      const rangeTrack = rangeRef.current;
      const control = controlRef.current;

      if (!(minThumb && maxThumb && control && rangeTrack)) {
        return;
      }

      let clientX = 0;
      if (event instanceof PointerEvent) {
        clientX = event.clientX;
      } else if (event instanceof TouchEvent) {
        clientX = event.touches[0].clientX;
      }

      const pageX = clientX - control.offsetLeft;
      const limit = control.offsetWidth - maxThumb.offsetWidth * 2;

      if (activeThumb == "min") {
        let minPrice = valueMin;
        const thumbLeft = asPercentage(
          Math.max(
            0,
            Math.min(pageX - minThumb.offsetWidth / 2, maxThumb.offsetLeft)
          )
        );
        minThumb.style.left = thumbLeft + "%";
        minThumb.classList.toggle(
          "price-range__thumb--above",
          thumbLeft >= asPercentage(limit)
        );

        minPrice = Number(
          (minThumb.offsetLeft / (control.offsetWidth - minThumb.offsetWidth)) *
            HIGHEST_PRICE
        ).toFixed(0);
        setValMin(minPrice);
      } else if (activeThumb == "max") {
        let maxPrice = valueMax;
        const thumbLeft = asPercentage(
          Math.min(
            Math.max(
              minThumb.offsetLeft - minThumb.offsetWidth,
              pageX - maxThumb.offsetWidth * 1.5
            ),
            limit
          )
        );
        maxThumb.style.left = thumbLeft + "%";
        maxPrice = Number(
          (maxThumb.offsetLeft / (control.offsetWidth - maxThumb.offsetWidth)) *
            HIGHEST_PRICE
        ).toFixed(0);
        setValMax(maxPrice);
      }

      rangeTrack.style.left = asPercentage(minThumb.offsetLeft) + "%";
      rangeTrack.style.width =
        asPercentage(maxThumb.offsetLeft - minThumb.offsetLeft) + "%";
    };

    const resizeObserver = new ResizeObserver((entries) => {
      if (rangeRef.current && minRef.current && maxRef.current) {
        rangeRef.current.style.left =
          asPercentage(minRef.current.offsetLeft) + "%";
        rangeRef.current.style.width =
          asPercentage(maxRef.current.offsetLeft - minRef.current.offsetLeft) +
          "%";
      }
    });

    if (controlRef.current) {
      resizeObserver.observe(controlRef.current);
    }

    if (activeThumb) {
      document.addEventListener("pointerup", mouseUpHandler);
      document.addEventListener("pointermove", mouseMoveHandler);

      document.addEventListener("touchend", mouseUpHandler);
      document.addEventListener("touchmove", mouseMoveHandler);
    }

    return () => {
      document.removeEventListener("pointerup", mouseUpHandler);
      document.removeEventListener("pointermove", mouseMoveHandler);

      document.removeEventListener("touchend", mouseUpHandler);
      document.removeEventListener("touchmove", mouseMoveHandler);
      resizeObserver.disconnect();
    };
  }, [activeThumb]);

  return (
    <div className="price-range">
      <input
        defaultValue={`Price: $${valueMin} — $${valueMax}`}
        key={`Price: $${valueMin} — $${valueMax}`}
        readOnly
        className="price-range__input"
      />
      <input
        type="hidden"
        name="price"
        defaultValue={`${valueMin}-${valueMax}`}
        key={`${valueMin}-${valueMax}`}
      />
      <div ref={controlRef} className="price-range__control">
        <span className="price-range__range"></span>
        <span ref={rangeRef} className="price-range__bar"></span>
        <span
          ref={minRef}
          onPointerDown={(e) => {
            e.preventDefault();
            setActiveThumb("min");
          }}
          onTouchStart={(e) => {
            setActiveThumb("min");
          }}
          className="price-range__min"
        ></span>
        <span
          ref={maxRef}
          onPointerDown={(e) => {
            e.preventDefault();
            setActiveThumb("max");
          }}
          onTouchStart={(e) => {
            setActiveThumb("max");
          }}
          className="price-range__max"
        ></span>
      </div>
    </div>
  );
};

const FilterParam = ({
  type,
  children,
}: {
  type: string;
  children: ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="filter__param">
      <div
        className={
          "filter__param-section" +
          (collapsed ? " filter__param-section--collapsed" : "")
        }
      >
        <span
          onClick={() => setCollapsed(!collapsed)}
          className="filter__param-type"
        >
          <span>{type}</span>
          <IoIosArrowUp />
        </span>
        <div className="filter__param-body">{children}</div>
      </div>
    </div>
  );
};

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
