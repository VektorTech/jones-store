export default function RadioList({
  label,
  values,
  checkbox,
  required,
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
        {label ? (
          <legend className="radio-list__legend">
            {label}{" "}
            {required && <span className="radio-list__legend-asterisk">*</span>}
          </legend>
        ) : null}

        <ul className="radio-list__list">
          {values.map((value) => (
            <li key={value}>
              <label className="radio-list__label">
                <input
                  className="radio-list__control"
                  {...inputProps}
                  type={checkbox ? "checkbox" : "radio"}
                  name={name}
                  required={required}
                  value={value}
                />
                <span
                  className={
                    `radio-list__button radio-list__button--` +
                    (checkbox ? "checkbox" : "radio")
                  }
                ></span>
                <span className="radio-list__text">{value}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
}
