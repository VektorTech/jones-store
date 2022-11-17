import { useState, useRef, useEffect } from "react";

const HIGHEST_PRICE = 1000;

export default function PriceRange({
  minPrice = 0,
  maxPrice = HIGHEST_PRICE,
  onUpdate,
}: PropTypes) {
  const [minValue, setMinValue] = useState<number>(minPrice);
  const [maxValue, setMaxValue] = useState<number>(maxPrice);

  const [activeHandle, setActiveHandle] = useState<"MIN" | "MAX" | "">("");
  const minHandleRef = useRef<HTMLSpanElement>(null);
  const maxHandleRef = useRef<HTMLSpanElement>(null);
  const rangeRef = useRef<HTMLSpanElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const calculatePercentage = (num: number) =>
    (num / (controlRef.current?.offsetWidth || 1)) * 100;

  const updateControlUI = (min: number, max: number) => {
    const minThumb = minHandleRef.current;
    const maxThumb = maxHandleRef.current;
    const rangeTrack = rangeRef.current;
    const control = controlRef.current;

    if (!(minThumb && maxThumb && control && rangeTrack)) {
      return;
    }

    const limit = control.offsetWidth - maxThumb.offsetWidth * 2;
    const minThumbLeft =
      (Number(min) / HIGHEST_PRICE) *
      calculatePercentage(limit + minThumb.offsetWidth);
    const maxThumbLeft =
      (Number(max) / HIGHEST_PRICE) *
        calculatePercentage(limit + minThumb.offsetWidth) -
      calculatePercentage(minThumb.offsetWidth);

    minThumb.style.left = minThumbLeft + "%";
    maxThumb.style.left = maxThumbLeft + "%";

    minThumb.classList.toggle(
      "price-range__thumb--above",
      minThumbLeft >= calculatePercentage(limit)
    );

    rangeTrack.style.left = calculatePercentage(minThumb.offsetLeft) + "%";
    rangeTrack.style.width =
      calculatePercentage(maxThumb.offsetLeft - minThumb.offsetLeft) + "%";
  };

  useEffect(() => {
    if (activeHandle == "") {
      onUpdate?.(minValue, maxValue);
    }
  }, [activeHandle, minValue, maxValue]);

  useEffect(() => {
    setMinValue(minPrice);
    setMaxValue(maxPrice);
    updateControlUI(minPrice, maxPrice);
  }, [maxPrice, minPrice]);

  useEffect(() => {
    const minThumb = minHandleRef.current;
    const maxThumb = maxHandleRef.current;
    const rangeTrack = rangeRef.current;
    const control = controlRef.current;

    if (!(minThumb && maxThumb && control && rangeTrack)) {
      return;
    }

    const mouseUpHandler = (e: PointerEvent | TouchEvent) => {
      setActiveHandle("");
      document.body.classList.remove("grabbing");
    };

    const limit = control.offsetWidth - maxThumb.offsetWidth * 2;
    const controlBounds = control.getBoundingClientRect();
    const mouseMoveHandler = (event: TouchEvent | PointerEvent) => {
      let clientX = 0;
      if (event instanceof PointerEvent) {
        clientX = event.clientX;
      } else if (event instanceof TouchEvent) {
        clientX = event.touches[0].clientX;
      }

      const pageX = clientX - controlBounds.left;

      if (activeHandle == "MIN") {
        const thumbLeft = calculatePercentage(
          Math.max(
            0,
            Math.min(pageX - minThumb.offsetWidth / 2, maxThumb.offsetLeft)
          )
        );
        minThumb.style.left = thumbLeft + "%";
        minThumb.classList.toggle(
          "price-range__thumb--above",
          thumbLeft >= calculatePercentage(limit)
        );

        const pricePercentage =
          thumbLeft / calculatePercentage(limit + maxThumb.offsetWidth);

        const newMinValue = pricePercentage * HIGHEST_PRICE;
        setMinValue(newMinValue);
      } else if (activeHandle == "MAX") {
        const thumbLeft = calculatePercentage(
          Math.min(
            Math.max(
              minThumb.offsetLeft - minThumb.offsetWidth,
              pageX - maxThumb.offsetWidth * 1.5
            ),
            limit
          )
        );
        maxThumb.style.left = thumbLeft + "%";

        const pricePercentage =
          (thumbLeft + calculatePercentage(minThumb.offsetWidth)) /
          calculatePercentage(limit + minThumb.offsetWidth);

        const newMaxValue = Number(pricePercentage * HIGHEST_PRICE);
        setMaxValue(newMaxValue);
      }

      rangeTrack.style.left = calculatePercentage(minThumb.offsetLeft) + "%";
      rangeTrack.style.width =
        calculatePercentage(maxThumb.offsetLeft - minThumb.offsetLeft) + "%";
    };

    const resizeObserver = new ResizeObserver((entries) => {
      updateControlUI(Number(minValue), Number(maxValue));
    });

    if (control) {
      resizeObserver.observe(control);
    }

    if (activeHandle) {
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
  }, [activeHandle]);

  return (
    <div className="price-range">
      <input
        defaultValue={`Price: $${minValue.toFixed(0)} — ${
          maxValue == HIGHEST_PRICE
            ? "Over $" + maxValue.toFixed(0)
            : "$" + maxValue.toFixed(0)
        }`}
        key={`Price: $${minValue} — $${maxValue}`}
        readOnly
        className="price-range__input"
      />
      <input
        type="hidden"
        name="price"
        defaultValue={`${minValue}-${maxValue}`}
        key={`${minValue}-${maxValue}`}
      />
      <div ref={controlRef} className="price-range__control">
        <span className="price-range__range"></span>
        <span ref={rangeRef} className="price-range__bar"></span>
        <span
          ref={minHandleRef}
          onPointerDown={(e) => {
            e.preventDefault();
            document.body.classList.add("grabbing");
            setActiveHandle("MIN");
          }}
          onTouchStart={(e) => {
            setActiveHandle("MIN");
          }}
          className="price-range__thumb price-range__min"
        ></span>
        <span
          ref={maxHandleRef}
          onPointerDown={(e) => {
            e.preventDefault();
            document.body.classList.add("grabbing");
            setActiveHandle("MAX");
          }}
          onTouchStart={(e) => {
            setActiveHandle("MAX");
          }}
          className="price-range__thumb price-range__max"
        ></span>
      </div>
    </div>
  );
}

interface PropTypes {
  minPrice?: number;
  maxPrice?: number;
  onUpdate?: (minPrice: number, maxPrice: number) => void;
}
