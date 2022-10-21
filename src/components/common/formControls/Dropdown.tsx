import { useState, useRef, KeyboardEventHandler } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import useArrowKeyTrap from "@Lib/hooks/useKeyTrap";
import { isSelectKey } from "@Lib/utils";

export default function Dropdown({
  label = "Select Option",
  options,
  className,
  ...inputProps
}: { options: string[]; label?: string } & JSX.IntrinsicElements["input"]) {
  const [value, setValue] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const MenuListRef = useRef<HTMLUListElement>(null);
  // const dropdownRef = useRef<HTMLDivElement>(null);

  useArrowKeyTrap(MenuListRef.current, !collapsed, true);

  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (isSelectKey(e)) {
      e.preventDefault();
      setCollapsed(false);
    } else if (e.key == "Escape") {
      setCollapsed(true);
    }
  };

  return (
    <div
      tabIndex={0}
      // ref={dropdownRef}
      onClick={() => setCollapsed(false)}
      onKeyDown={handleKeyUp}
      onBlur={(e) => {
        if (!MenuListRef.current?.contains(e.relatedTarget)) {
          setCollapsed(true);
        }
      }}
      className={"dropdown" + (className ? ` ${className}` : "")}
    >
      <span className="dropdown__button">
        <input
          {...inputProps}
          className="dropdown__value"
          type="text"
          readOnly
          tabIndex={-1}
          defaultValue={value}
          placeholder={label}
        />
        <span className="dropdown__toggle-icon">
          {collapsed ? <BiChevronDown /> : <BiChevronUp />}
        </span>
      </span>

      <div
        className={`dropdown__menu${
          collapsed ? " dropdown__menu--collapsed" : ""
        }`}
      >
        <ul ref={MenuListRef} className="dropdown__list">
          {options.map((option) => (
            <li
              tabIndex={-1}
              key={option}
              role="option"
              aria-selected={value == option}
              onClick={(e) => {
                e.stopPropagation();
                setValue(option);
                setCollapsed(true);
              }}
              className="dropdown__option"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
