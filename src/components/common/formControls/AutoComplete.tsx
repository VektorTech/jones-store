import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useState, useEffect } from "react";

export default function AutoComplete({
  label,
  className,
  options,
  name,
  ...inputProps
}: {
  options: { [value: string]: string };
  label?: string;
} & JSX.IntrinsicElements["input"]) {
  const [collapsed, setCollapsed] = useState(true);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  const filtered = Object.keys(options).filter((_value) =>
    new RegExp(search, "i").test(options[_value])
  );

  useEffect(() => {
    setSearch(options[value]);
  }, [options, value]);

  return (
    <div className={"autocomplete" + (className ? ` ${className}` : "")}>
      <label className="autocomplete__label">
        <span className="autocomplete__label-text">{label}</span>
        <span className="autocomplete__input">
          <input
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            onFocus={(e) => setCollapsed(false)}
            onBlur={(e) => {
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
        <ul className="autocomplete__list">
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
}
