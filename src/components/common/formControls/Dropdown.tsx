import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

export default function Dropdown({
  label = "Select Option",
  options,
  className,
  ...inputProps
}: { options: string[]; label?: string } & JSX.IntrinsicElements["input"]) {
  const [value, setValue] = useState("");
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={"dropdown" + (className ? ` ${className}` : "")}>
      <input
        {...inputProps}
        onClick={(e) => {
          e.preventDefault();
          setCollapsed(!collapsed);
        }}
        type="text"
        defaultValue={value}
        placeholder={label}
      />
      <BiChevronDown />

      <div
        className={`dropdown__options${
          collapsed ? " dropdown__options--collapsed" : ""
        }`}
      >
        <ul className="dropdown__list">
          {options.map((option) => (
            <li
              onClick={() => setValue(option)}
              key={option}
              className="dropdown__item"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
