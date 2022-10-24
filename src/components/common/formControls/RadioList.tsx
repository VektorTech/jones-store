import { ReactElement, useState } from "react";

export default function RadioList({
  label,
  values,
  checkbox,
  required,
  render: RenderComponent,
  name = "",
  className = "",
  ...inputProps
}: {
  render?: ({
    label,
    checked,
  }: {
    label: string;
    checked: boolean;
  }) => ReactElement;
  label?: string;
  checkbox?: boolean;
  values: string[];
} & JSX.IntrinsicElements["input"]) {
  const initState = values.reduce((obj: any, value: string) => {
    obj[value] = false;
    return obj;
  }, {});
  const [groupState, setGroupState] = useState(initState);
  const [all, setAll] = useState(values.length < 10);

  const radioHandler = (value: string) => {
    const cloned = Object.assign({}, groupState);
    Object.keys(cloned).forEach((key) => {
      cloned[key] = false;
    });
    cloned[value] = true;
    setGroupState(cloned);
  };

  const checkboxHandler = (value: string, checked: boolean) => {
    setGroupState({ ...groupState, [value]: checked });
  };

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
          {values.slice(0, all ? values.length : 10).map((value) => (
            <li key={value}>
              <label className="radio-list__label">
                <input
                  className="radio-list__control"
                  {...inputProps}
                  type={checkbox ? "checkbox" : "radio"}
                  name={name}
                  required={required}
                  value={value}
                  style={{ display: RenderComponent ? "none" : "inline-block" }}
                  onChange={(e) => checkbox ? checkboxHandler(value, e.currentTarget.checked) : radioHandler(value)}
                />
                {RenderComponent ? (
                  <>
                    <RenderComponent checked={!!groupState[value]} label={value} />
                  </>
                ) : (
                  <>
                    <span
                      className={
                        `radio-list__button radio-list__button--` +
                        (checkbox ? "checkbox" : "radio")
                      }
                    ></span>
                    <span className="radio-list__text">{value}</span>
                  </>
                )}
              </label>
            </li>
          ))}
        </ul>
        { !all ? <button className="radio-list__see-all" onClick={() => setAll(true)}>See All</button> : null }
      </fieldset>
    </div>
  );
}
