import { isSelectKey } from "@Lib/utils";
import { useEffect } from "react";

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
      firstFocusableElement.focus();
    }

    function Tabhandler(event: KeyboardEvent) {
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

    let focusIndex = 0;
    function arrowHandler(event: KeyboardEvent) {
      event.preventDefault();
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
        event.stopPropagation();
        allFocusableElements[focusIndex].click();
      }
    }

    container.addEventListener("keydown", arrow ? arrowHandler : Tabhandler);

    const cleanup = () =>
      container.removeEventListener(
        "keydown",
        arrow ? arrowHandler : Tabhandler
      );

    if (!active) {
      cleanup();
    }

    return cleanup;
  }, [container, active, arrow]);
}
