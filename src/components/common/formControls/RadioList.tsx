export default function RadioList({
  label,
  values,
  checkbox,
  name = "",
  className = "",
  ...inputProps
}: {
  label?: string;
  checkbox?: boolean;
  values: string[];
} & JSX.IntrinsicElements["input"]) {
  return (
    <div className={"radio-list" + (className ? ` ${className}` : "")}>
      <fieldset>
        {label ? <legend>{label}</legend> : null}

        {values.map((value) => (
          <label className="radio-list__label" key={value}>
            <input
              className="radio-list__control"
              {...inputProps}
              type={checkbox ? "checkbox" : "radio"}
              name={name}
              value={value}
            />
            <span
              className={
                `radio-list__btn radio-list__btn--` +
                (checkbox ? "checkbox" : "radio")
              }
            ></span>
            <span className="radio-list__text">{value}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}
