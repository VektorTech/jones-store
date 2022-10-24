import Button from "@Components/common/formControls/Button";
import RadioList from "@Components/common/formControls/RadioList";
import { IoIosArrowUp, IoIosArrowBack } from "react-icons/io";
import { useState, useRef, useEffect, ReactNode } from "react";

export default function Filter({
  active,
  setState,
}: {
  active: boolean;
  setState: (state: boolean) => void;
}) {
  return (
    <div className={"filter" + (active ? " filter--active" : "")}>
      <div className="filter__head">
        <span>Filter</span>
        <button onClick={() => setState(false)} className="filter__hide">
          <IoIosArrowBack />
        </button>
      </div>

      <FilterParam type="Gender">
        <RadioList
          name="gender"
          values={["MEN", "WOMEN", "KIDS", "BABIES", "UNISEX"]}
          render={({ label, checked }) => (
            <span
              className={
                "filter__param-option" +
                (checked ? " filter__param-option--checked" : "")
              }
            >
              {label}
            </span>
          )}
        />
      </FilterParam>

      <FilterParam type="Main Color">
        <RadioList
          name="color"
          values={Object.keys(colorsHex)}
          render={({ label, checked }) => (
            <span
              className={
                "filter__param-option" +
                (checked ? " filter__param-option--checked" : "")
              }
            >
              <span
                style={{ background: colorsHex[label] }}
                className="filter__param-option-color"
              ></span>
              {label}
            </span>
          )}
        />
      </FilterParam>

      <FilterParam type="US Sizes">
        <RadioList
          name="size"
          checkbox
          grid
          values={[...Array(37)].map((_, i) => String(2 + i / 2))}
          render={({ label, checked }) => (
            <span
              className={
                "filter__param-box" +
                (checked ? " filter__param-box--checked" : "")
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
          values={["LOW TOP", "MID TOP", "HIGH TOP"]}
          render={({ label, checked }) => (
            <span
              className={
                "filter__param-option" +
                (checked ? " filter__param-option--checked" : "")
              }
            >
              {label}
            </span>
          )}
        />
      </FilterParam>

      <FilterParam type="Price Range">
        <PriceRange />
      </FilterParam>

      <div className="filter__confirm">
        <Button type="submit" className="filter__done">
          done
        </Button>
        <Button type="reset" className="filter__clear-all">
          clear all
        </Button>
      </div>
    </div>
  );
}

const PriceRange = () => {
  const HIGHEST_PRICE = 1000;
  const [valueMin, setValMin] = useState("0");
  const [valueMax, setValMax] = useState(HIGHEST_PRICE.toString());

  const [activeThumb, setActiveThumb] = useState("");
  const minRef = useRef<HTMLSpanElement>(null);
  const maxRef = useRef<HTMLSpanElement>(null);
  const rangeRef = useRef<HTMLSpanElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

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
        setValMin(
          Number(
            (minThumb.offsetLeft /
              (control.offsetWidth - minThumb.offsetWidth)) *
              HIGHEST_PRICE
          ).toFixed(0)
        );
      } else if (activeThumb == "max") {
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
        setValMax(
          Number(
            (maxThumb.offsetLeft /
              (control.offsetWidth - maxThumb.offsetWidth)) *
              HIGHEST_PRICE
          ).toFixed(0)
        );
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
      // document.addEventListener("touchend", mouseUpHandler);

      document.addEventListener("pointermove", mouseMoveHandler);
      // document.addEventListener("touchmove", mouseMoveHandler);
    }

    return () => {
      document.removeEventListener("pointerup", mouseUpHandler);
      // document.removeEventListener("touchend", mouseUpHandler);

      document.removeEventListener("pointermove", mouseMoveHandler);
      // document.removeEventListener("touchmove", mouseMoveHandler);
      resizeObserver.disconnect();
    };
  }, [activeThumb]);

  return (
    <div className="price-range">
      <input
        defaultValue={`$${valueMin} - $${valueMax}`}
        key={`$${valueMin} - $${valueMax}`}
        readOnly
        name="price-range"
        className="price-range__input"
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
          // onTouchStart={(e) => {
          //   setActiveThumb("min");
          // }}
          className="price-range__min"
        ></span>
        <span
          ref={maxRef}
          onPointerDown={(e) => {
            e.preventDefault();
            setActiveThumb("max");
          }}
          // onTouchStart={(e) => {
          //   setActiveThumb("max");
          // }}
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
