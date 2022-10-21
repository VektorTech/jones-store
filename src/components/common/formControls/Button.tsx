import { ReactElement } from "react";

export default function Button({
  children,
  className = "",
  ...buttonProps
}: { children: React.ReactNode } & JSX.IntrinsicElements["button"]) {
  return (
    <button
      {...buttonProps}
      className={"button" + (className ? ` ${className}` : "")}
    >
      {children}
    </button>
  );
}
