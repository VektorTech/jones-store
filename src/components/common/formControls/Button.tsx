export default function Button({
  children,
  className = "",
  large,
  invert,
  ...buttonProps
}: PropTypes & JSX.IntrinsicElements["button"]) {
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

interface PropTypes {
  children: React.ReactNode;
  large?: boolean;
  invert?: boolean;
}
