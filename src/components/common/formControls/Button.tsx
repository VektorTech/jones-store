export default function Button({
  children,
  className = "",
  large,
  invert,
  ...buttonProps
}: {
  children: React.ReactNode;
  large?: boolean;
  invert?: boolean;
} & JSX.IntrinsicElements["button"]) {
  return (
    <button
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
}
