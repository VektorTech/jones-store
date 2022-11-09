import { useState, useRef, useEffect, useMemo, ReactNode } from "react";

export default function PriceRange({
	preset,
	onUpdate,
  }: {
	preset?: [min: string | number, max: string | number];
	onUpdate?: (minPrice: number, maxPrice: number) => void;
  }) {
	const HIGHEST_PRICE = 1000;
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
	  if (preset) {
		const pMin = preset[0];
		const pMax = preset[1];

		const pMinPercentage = (Number(pMin) / HIGHEST_PRICE) * 100;
		const pMaxPercentage = (Number(pMax) / HIGHEST_PRICE) * 100;

		if (minRef.current && maxRef.current && rangeRef.current) {
		  minRef.current.style.left = pMinPercentage + "%";
		  maxRef.current.style.left = `calc(${pMaxPercentage}% - ${
			maxRef.current.offsetWidth * 1.5
		  }px)`;

		  rangeRef.current.style.left = pMinPercentage + "%";
		  rangeRef.current.style.width = pMaxPercentage - pMinPercentage + "%";
		}

		setValMin(pMin);
		setValMax(pMax);
	  }
	}, [preset]);

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

		  let minPrice = Number(
			(minThumb.offsetLeft / (control.offsetWidth - minThumb.offsetWidth)) *
			  HIGHEST_PRICE
		  ).toFixed(0);
		  setValMin(minPrice);
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
		  let maxPrice = Number(
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
		  defaultValue={`Price: $${valueMin} — ${
			valueMax == HIGHEST_PRICE ? "Over $" + valueMax : "$" + valueMax
		  }`}
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