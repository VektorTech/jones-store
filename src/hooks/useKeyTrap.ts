import { useEffect } from "react";

import { isSelectKey } from "src/utils";

let focusIndex = 0;

const FOCUSABLE_ELEMENT_SELECTORS = [
  "a[href]",
  "area[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "iframe",
  "object",
  '[tabindex="0"]',
  "[contenteditable]",
].join();

export default function useKeyTrap(
  container: HTMLElement | null,
  active: boolean,
  arrow?: boolean
) {
  useEffect(() => {
    if (container == null) {
      return () => null;
    }
    const allFocusableElements: NodeListOf<HTMLElement> =
      container.querySelectorAll(
        arrow ? "[tabindex]" : FOCUSABLE_ELEMENT_SELECTORS
      );
    if (allFocusableElements.length < 1) {
      return () => null;
    }

    const firstFocusableElement = allFocusableElements[0];
    const lastFocusableElement =
      allFocusableElements[allFocusableElements.length - 1];

    if (active) {
      allFocusableElements[focusIndex].focus();
    }

    function TabHandler(event: KeyboardEvent) {
      if (event.key == "Tab" || event.keyCode == 9) {
        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            event.preventDefault();
          }
          return;
        }
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    }

    function arrowHandler(event: KeyboardEvent) {
      if (event.key == "ArrowUp" || event.keyCode == 38) {
        focusIndex =
          (focusIndex - 1 + allFocusableElements.length) %
          allFocusableElements.length;
      } else if (event.key == "ArrowDown" || event.keyCode == 40) {
        focusIndex = (focusIndex + 1) % allFocusableElements.length;
      }

      allFocusableElements.forEach((element, i) =>
        element.classList.toggle("focused", focusIndex == i)
      );

      if (isSelectKey(event)) {
        allFocusableElements[focusIndex].click();
      }

      event.preventDefault();
    }

    container.addEventListener("keydown", arrow ? arrowHandler : TabHandler);

    const cleanup = () => {
      container.removeEventListener(
        "keydown",
        arrow ? arrowHandler : TabHandler
      );

      allFocusableElements.forEach((element, i) =>
        element.classList.remove("focused")
      );
    };

    if (!active) {
      cleanup();
    }

    return cleanup;
  }, [container, active, arrow]);
}
