import { map, throttle } from "src/utils";
import { useState, useEffect } from "react";

export default function useMouseCoords<T extends HTMLElement>(
  element: T | null,
  limit?: number,
  throttleTimer = 0
) {
  const [coords, setCoords] = useState([0, 0]);

  useEffect(() => {
    if (!element) {
      return;
    }
    const handlePointerEvent = throttle(function _handlePointerEvent(
      this: HTMLElement,
      { clientX, clientY }: PointerEvent
    ) {
      const elementBounds = element.getBoundingClientRect();
      const halfWidth = elementBounds.width / 2;
      const halfHeight = elementBounds.height / 2;
      const centerX = elementBounds.left + halfWidth;
      const centerY = elementBounds.top + halfHeight;
      let shiftX = 0;
      let shiftY = 0;
      if (limit) {
        shiftX = map(
          centerX - halfHeight,
          centerX + halfHeight,
          -limit,
          limit,
          clientX
        );
        shiftY = map(
          centerY - halfHeight,
          centerY + halfHeight,
          -limit,
          limit,
          clientY
        );
      } else {
        shiftX = clientX - centerX;
        shiftY = clientY - centerY;
      }
      setCoords([shiftX, shiftY]);
    },
    throttleTimer);

    element.addEventListener("pointermove", handlePointerEvent);
    return () => element.removeEventListener("pointermove", handlePointerEvent);
  }, [element, limit, throttleTimer]);

  return coords;
}
