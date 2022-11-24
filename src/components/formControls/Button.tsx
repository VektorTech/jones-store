import { forwardRef, LegacyRef } from "react";

export default forwardRef<
  HTMLButtonElement,
  PropTypes & JSX.IntrinsicElements["button"]
>(function Button(
  { children, className = "", large, invert, ...buttonProps },
  forwardRef
) {
  return (
    <button
      ref={forwardRef}
      {...buttonProps}
      className={
        "button" +
        (className ? ` ${className}` : "") +
        (large ? " button--lg" : "") +
        (invert ? " button--invert" : "")
      }
    >
      {children}
    </button>
  );
});

interface PropTypes {
  children: React.ReactNode;
  large?: boolean;
  invert?: boolean;
}
