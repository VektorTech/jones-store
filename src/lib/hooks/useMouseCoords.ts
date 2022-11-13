import { map, throttle } from "@Lib/utils";
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
      if (!element) {
        return;
      }
      const elementBounds = element.getBoundingClientRect();
      const halfW = elementBounds.width / 2;
      const halfH = elementBounds.height / 2;
      const centerX = elementBounds.left + halfW;
      const centerY = elementBounds.top + halfH;
      let shiftX = 0;
      let shiftY = 0;
      if (limit) {
        shiftX = map(centerX - halfH, centerX + halfH, -limit, limit, clientX);
        shiftY = map(centerY - halfH, centerY + halfH, -limit, limit, clientY);
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
