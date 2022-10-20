import { useState } from "react";

export default function AutoComplete({
  label,
  className,
  options,
  name,
  ...inputProps
}: { options: string[]; label?: string } & JSX.IntrinsicElements["input"]) {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(value);
  const filtered = options.filter((option) =>
    new RegExp(search, "i").test(option)
  );

  return (
    <div className={"auto-complete" + (className ? ` ${className}` : "")}>
      <label className="auto-complete__label">
        <span className="auto-complete__label-text">{label}</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          className="auto-complete__control"
          {...inputProps}
        />
        <input name={name} defaultValue={value} type="hidden" />
      </label>

      <div className="auto-complete__dropdown">
        <ul className="auto-complete__dropdown-list">
          {filtered.map((option) => (
            <li
              onClick={() => setValue(option)}
              key={option}
              className="auto-complete__dropdown-item"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
