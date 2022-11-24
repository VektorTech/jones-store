import { ReactElement, useState, useEffect, useMemo, forwardRef } from "react";

export default forwardRef<
  HTMLDivElement,
  PropTypes & JSX.IntrinsicElements["input"]
>(function RadioList(
  {
    label,
    values,
    checkbox,
    required,
    render: RenderComponent,
    grid,
    checkedItems,
    reverse,
    onChecked,
    name = "",
    className = "",
    ...inputProps
  },
  forwardRef
) {
  const initState = useMemo<{ [value: string]: boolean }>(
    () =>
      (reverse ? Object.keys(values).reverse() : Object.keys(values)).reduce(
        (obj: any, value: string) => {
          obj[value] = !!checkedItems?.includes(value);
          return obj;
        },
        {}
      ),
    [values, checkedItems, reverse]
  );
  const valuesArr = reverse
    ? Object.keys(values).reverse()
    : Object.keys(values);

  const [groupState, setGroupState] = useState(initState);
  const [all, setAll] = useState(valuesArr.length < 10);

  useEffect(() => {
    setGroupState(initState);
  }, [checkedItems, initState]);

  const radioHandler = (value: string) => {
    const cloned = Object.assign({}, groupState);
    Object.keys(cloned).forEach((key) => {
      cloned[key] = false;
    });
    cloned[value] = true;
    setGroupState(cloned);
    onChecked?.(value);
  };

  const checkboxHandler = (value: string, checked: boolean) => {
    const newGroupState = { ...groupState, [value]: checked };
    setGroupState(newGroupState);
    onChecked?.(
      Object.keys(newGroupState).filter((key) => newGroupState[key]),
      value
    );
  };

  return (
    <div
      ref={forwardRef}
      className={"radio-list" + (className ? ` ${className}` : "")}
    >
      <fieldset>
        {label ? (
          <legend className="radio-list__legend">
            {label}{" "}
            {required && <span className="radio-list__legend-asterisk">*</span>}
          </legend>
        ) : null}

        <ul
          className={
            "radio-list__list" + (grid ? " radio-list__list--grid" : "")
          }
        >
          {valuesArr.slice(0, all ? valuesArr.length : 10).map((value) => (
            <li key={value}>
              <label className="radio-list__label">
                <input
                  {...inputProps}
                  className="radio-list__control"
                  type={checkbox ? "checkbox" : "radio"}
                  name={name}
                  required={required}
                  checked={groupState[value]}
                  value={value}
                  style={{ display: RenderComponent ? "none" : "inline-block" }}
                  onChange={(e) =>
                    checkbox
                      ? checkboxHandler(value, e.currentTarget.checked)
                      : radioHandler(value)
                  }
                />
                {RenderComponent ? (
                  <>
                    <RenderComponent
                      checked={groupState[value]}
                      label={values[value]}
                      value={value}
                    />
                  </>
                ) : (
                  <>
                    <span
                      className={
                        `radio-list__button radio-list__button--` +
                        (checkbox ? "checkbox" : "radio")
                      }
                    ></span>
                    <span className="radio-list__text">{values[value]}</span>
                  </>
                )}
              </label>
            </li>
          ))}
        </ul>
        {!all ? (
          <button className="radio-list__see-all" onClick={() => setAll(true)}>
            See All
          </button>
        ) : null}
      </fieldset>
    </div>
  );
});

interface PropTypes {
  render?: ({
    label,
    value,
    checked,
  }: {
    label: string | number;
    value: string;
    checked: boolean;
  }) => ReactElement;
  label?: string;
  checkbox?: boolean;
  grid?: boolean;
  reverse?: boolean;
  onChecked?: (items: string[] | string, value?: string) => void;
  checkedItems?: (string | number)[];
  values: { [value: string | number]: string | number };
}
