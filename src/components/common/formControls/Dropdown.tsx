import {
  useState,
  useEffect,
  useRef,
  KeyboardEventHandler,
  MouseEventHandler,
  FocusEventHandler,
} from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import useArrowKeyTrap from "@Lib/hooks/useKeyTrap";
import { isSelectKey } from "@Lib/utils";

export default function Dropdown({
  label = "Select Option",
  options,
  value: _value,
  className,
  name = "",
  onOptionSelect,
  ...inputProps
}: PropTypes & JSX.IntrinsicElements["input"]) {
  const [value, setValue] = useState(_value?.toString() ?? "");
  const [collapsed, setCollapsed] = useState(true);
  const MenuListRef = useRef<HTMLUListElement>(null);
  const DropdownRef = useRef<HTMLDivElement>(null);

  useArrowKeyTrap(MenuListRef.current, !collapsed, true);

  useEffect(() => {
    if (collapsed) {
      DropdownRef.current?.focus();
    }
  }, [collapsed]);

  useEffect(() => {
    if (_value != value) {
      setValue?.(_value?.toString() ?? "");
    }
  }, [_value]);

  useEffect(() => {
    onOptionSelect?.(value);
  }, [value]);

  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (isSelectKey(e) && e.target == DropdownRef.current) {
      e.preventDefault();
      setCollapsed(!collapsed);
    } else if (e.key == "Escape") {
      setCollapsed(true);
    }
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = ({ target }) => {
    if (MenuListRef.current?.contains(target as Node)) {
      setCollapsed(true);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleBlur: FocusEventHandler<HTMLDivElement> = (e) => {
    if (
      !MenuListRef.current?.contains(e.relatedTarget) &&
      e.relatedTarget !== DropdownRef.current
    ) {
      setCollapsed(true);
    }
  };

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      ref={DropdownRef}
      onKeyDown={handleKeyUp}
      onBlur={handleBlur}
      className={"dropdown" + (className ? ` ${className}` : "")}
    >
      <span className="dropdown__button" style={{ pointerEvents: "none" }}>
        <input
          {...inputProps}
          className="dropdown__value"
          type="text"
          readOnly
          tabIndex={-1}
          defaultValue={options[value]}
          placeholder={label}
        />
        <input name={name} defaultValue={value} type="hidden" />
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
          {Object.keys(options).map((option) => (
            <li
              tabIndex={-1}
              key={option}
              role="option"
              aria-selected={value == option}
              onClick={(e) => setValue(option)}
              data-value={option}
              className="dropdown__option"
            >
              {options[option]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface PropTypes {
  onOptionSelect?: (value: string) => void;
  options: { [value: string]: string };
  label?: string;
}
