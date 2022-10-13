export default function AutoComplete({
  label,
  className,
  ...inputProps
}: { label?: string } & JSX.IntrinsicElements["input"]) {
  return (
    <div className={`auto-complete${className ? " " + className : ""}`}>
      <label className="text-input__label">
        <span className="text-input__label-text">{label}</span>
        <input className="text-input__control" {...inputProps} />
      </label>
    </div>
  );
}
