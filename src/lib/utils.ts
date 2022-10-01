export function trapTabbingIn(container: HTMLElement) {
	const FOCUSABLE_ELEMENT_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]';

	const allFocusableElements: NodeListOf<HTMLElement> = container.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS);
	if (allFocusableElements.length < 1) { return () => null; }

	const firstFocusableElement = allFocusableElements[0];
	const lastFocusableElement = allFocusableElements[allFocusableElements.length - 1];

	firstFocusableElement.focus();

	function handler(event: KeyboardEvent) {
		if (event.key == "Tab") {
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

	return () => container.removeEventListener("keydown", handler);
}