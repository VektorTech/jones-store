export default function TextField({
  label,
  className = "",
  multiline = false,
  ...inputProps
}: {
  label: string;
  multiline?: boolean;
} & (JSX.IntrinsicElements["input"] & JSX.IntrinsicElements["textarea"])) {
  return (
    <div className={"text-field" + (className ? ` ${className}` : "")}>
      <label className="text-field__label">
        <span className="text-field__label-text">{label}</span>
        {multiline ? (
          <textarea
            {...inputProps}
            className="text-field__control text-field__control--multiline"
          ></textarea>
        ) : (
          <input {...inputProps} className="text-field__control" />
        )}
      </label>
    </div>
  );
}
