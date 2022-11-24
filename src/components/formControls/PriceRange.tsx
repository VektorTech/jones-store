import { useState, useRef, useEffect, forwardRef } from "react";

const HIGHEST_PRICE = 1000;

export default forwardRef<HTMLDivElement, PropTypes>(function PriceRange(
  { minPrice = 0, maxPrice = HIGHEST_PRICE, onMinUpdate, onMaxUpdate },
  forwardRef
) {
  const [minValue, setMinValue] = useState<number>(minPrice);
  const [maxValue, setMaxValue] = useState<number>(maxPrice);

  const [activeHandle, setActiveHandle] = useState<"MIN" | "MAX" | "">("");
  const minHandleRef = useRef<HTMLSpanElement>(null);
  const maxHandleRef = useRef<HTMLSpanElement>(null);
  const rangeRef = useRef<HTMLSpanElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const calculatePercentage = (num: number) =>
    (num / (controlRef.current?.offsetWidth || 1)) * 100;

  useEffect(() => {
    const control = controlRef.current;
    setMinValue(minPrice);
    setMaxValue(maxPrice);

    const updateControlUI = () => {
      const minHandle = minHandleRef.current;
      const maxHandle = maxHandleRef.current;
      const rangeTrack = rangeRef.current;

      if (!(minHandle && maxHandle && control && rangeTrack)) {
        return;
      }

      const limit = control.offsetWidth - maxHandle.offsetWidth * 2;
      const minHandleLeft =
        (Number(minPrice) / HIGHEST_PRICE) *
        calculatePercentage(limit + minHandle.offsetWidth);
      const maxHandleLeft =
        (Number(maxPrice) / HIGHEST_PRICE) *
          calculatePercentage(limit + minHandle.offsetWidth) -
        calculatePercentage(minHandle.offsetWidth);

      minHandle.style.left = minHandleLeft + "%";
      maxHandle.style.left = maxHandleLeft + "%";

      minHandle.classList.toggle(
        "price-range__thumb--above",
        minHandleLeft >= calculatePercentage(limit)
      );

      rangeTrack.style.left = calculatePercentage(minHandle.offsetLeft) + "%";
      rangeTrack.style.width =
        calculatePercentage(maxHandle.offsetLeft - minHandle.offsetLeft) + "%";
    };

    if (control) {
      const resizeObserver = new ResizeObserver(() => {
        updateControlUI();
      });
      resizeObserver.observe(control);
      return () => resizeObserver.disconnect();
    }
  }, [maxPrice, minPrice]);

  useEffect(() => {
    const minHandle = minHandleRef.current;
    const maxHandle = maxHandleRef.current;
    const rangeTrack = rangeRef.current;
    const control = controlRef.current;

    if (!(minHandle && maxHandle && control && rangeTrack)) {
      return;
    }

    const limit = control.offsetWidth - maxHandle.offsetWidth * 2;
    const controlBounds = control.getBoundingClientRect();
    let newMinValue = 0;
    let newMaxValue = 0;

    const moveHandler = (event: TouchEvent | PointerEvent) => {
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
            Math.min(pageX - minHandle.offsetWidth / 2, maxHandle.offsetLeft)
          )
        );
        minHandle.style.left = thumbLeft + "%";
        minHandle.classList.toggle(
          "price-range__thumb--above",
          thumbLeft >= calculatePercentage(limit)
        );

        const pricePercentage =
          thumbLeft / calculatePercentage(limit + maxHandle.offsetWidth);

        newMinValue = Math.round(pricePercentage * HIGHEST_PRICE);
        setMinValue(newMinValue);
      } else if (activeHandle == "MAX") {
        const thumbLeft = calculatePercentage(
          Math.min(
            Math.max(
              minHandle.offsetLeft - minHandle.offsetWidth,
              pageX - maxHandle.offsetWidth * 1.5
            ),
            limit
          )
        );
        maxHandle.style.left = thumbLeft + "%";

        const pricePercentage =
          (thumbLeft + calculatePercentage(minHandle.offsetWidth)) /
          calculatePercentage(limit + minHandle.offsetWidth);

        newMaxValue = Math.round(Number(pricePercentage * HIGHEST_PRICE));
        setMaxValue(newMaxValue);
      }

      rangeTrack.style.left = calculatePercentage(minHandle.offsetLeft) + "%";
      rangeTrack.style.width =
        calculatePercentage(maxHandle.offsetLeft - minHandle.offsetLeft) + "%";
    };

    const upHandler = (e: PointerEvent | TouchEvent) => {
      if (activeHandle == "MIN") {
        onMinUpdate?.(newMinValue);
      } else if (activeHandle == "MAX") {
        onMaxUpdate?.(newMaxValue);
      }
      setActiveHandle("");
      document.body.classList.remove("grabbing");
    };

    if (activeHandle) {
      document.addEventListener("pointerup", upHandler);
      document.addEventListener("pointermove", moveHandler);

      document.addEventListener("touchend", upHandler);
      document.addEventListener("touchmove", moveHandler);
    }

    return () => {
      document.removeEventListener("pointerup", upHandler);
      document.removeEventListener("pointermove", moveHandler);

      document.removeEventListener("touchend", upHandler);
      document.removeEventListener("touchmove", moveHandler);
    };
  }, [activeHandle, onMaxUpdate, onMinUpdate]);

  return (
    <div ref={forwardRef} className="price-range">
      <input
        defaultValue={`Price: $${minValue} — ${
          maxValue == HIGHEST_PRICE ? "Over $" + maxValue : "$" + maxValue
        }`}
        key={`Price: $${minValue} — $${maxValue}`}
        aria-label="price range"
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
});

interface PropTypes {
  minPrice?: number;
  maxPrice?: number;
  onMinUpdate?: (minPrice: number) => void;
  onMaxUpdate?: (maxPrice: number) => void;
}
