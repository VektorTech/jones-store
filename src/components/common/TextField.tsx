export default function TextField({
  label,
  className,
  multiline = false,
  name = "",
  ...inputProps
}: { label: string; multiline?:boolean; name?: string; className?: string; } & JSX.IntrinsicElements["input"]) {
  return (
    <div className={`text-input${className ? " " + className : ""}`}>
      <label className="text-input__label">
        <span className="text-input__label-text">{label}</span>
        {
          multiline ?
          <textarea name={name} className="text-input__control"></textarea>
          :
          <input className="text-input__control" {...inputProps} />
        }
      </label>
    </div>
  );
}
