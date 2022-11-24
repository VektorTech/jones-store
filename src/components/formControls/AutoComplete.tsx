import { useState, useEffect, forwardRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default forwardRef<
  HTMLDivElement,
  PropTypes & JSX.IntrinsicElements["input"]
>(function AutoComplete(
  { label, className, options, name, ...inputProps },
  ref
) {
  const [collapsed, setCollapsed] = useState(true);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  const filtered = Object.keys(options).filter((_value) =>
    new RegExp(search, "i").test(options[_value].toString())
  );

  useEffect(() => {
    setSearch(options[value]?.toString() ?? "");
  }, [options, value]);

  return (
    <div
      ref={ref}
      className={"autocomplete" + (className ? ` ${className}` : "")}
    >
      <label className="autocomplete__label">
        <span className="autocomplete__label-text">{label}</span>
        <span className="autocomplete__input">
          <input
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            onFocus={() => setCollapsed(false)}
            onBlur={() => {
              if (!collapsed) {
                setCollapsed(true);
              }
            }}
            className="autocomplete__control"
            {...inputProps}
          />
          <span className="autocomplete__toggle-icon">
            {collapsed ? <BiChevronDown /> : <BiChevronUp />}
          </span>
        </span>

        <input name={name} defaultValue={value} type="hidden" />
      </label>

      <div
        className={`autocomplete__menu${
          collapsed ? " autocomplete__menu--collapsed" : ""
        }`}
      >
        <ul role="listbox" className="autocomplete__list">
          {filtered.map((option) => (
            <li
              role="option"
              aria-selected={value == option}
              onMouseDown={(e) => {
                setValue(option);
                setCollapsed(true);
              }}
              key={option}
              className="autocomplete__option"
            >
              {options[option]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

interface PropTypes {
  options: { [value: string | number]: string | number };
  label?: string;
}
