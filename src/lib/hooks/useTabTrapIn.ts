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
	"[tabindex=\"0\"]",
	"[contenteditable]"
].join();

export default function useTabTrapIn(container: HTMLElement | null, active: boolean) {
	useEffect(() => {
		if (container == null) {  return () => null;  }
		const allFocusableElements: NodeListOf<HTMLElement> = container.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS);
		if (allFocusableElements.length < 1) { return () => null; }

		const firstFocusableElement = allFocusableElements[0];
		const lastFocusableElement = allFocusableElements[allFocusableElements.length - 1];

		setTimeout(() => firstFocusableElement.focus(), 0);

		function handler(event: KeyboardEvent) {
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
		container.addEventListener("keydown", handler);

		const cleanup = () => container.removeEventListener("keydown", handler);

		if (!active) { cleanup(); }

		return cleanup;
	}, [container, active]);
}