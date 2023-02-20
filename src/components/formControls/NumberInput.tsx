import { useState, forwardRef } from "react";

export default forwardRef<HTMLDivElement, PropTypes>(function NumberInput(
  {
    value = 0,
    min = 0,
    max = Infinity,
    className = "",
    id = "",
    name,
    onChange,
  },
  forwardRef
) {
  const [_value, setValue] = useState(Math.min(Math.max(value, min), max));

  const changeHandler = (num: number) => {
    setValue(num);
    onChange?.(num);
  };

  return (
    <div
      ref={forwardRef}
      className={"number-input" + (className ? ` ${className}` : "")}
    >
      <button
        className="number-input__button"
        onClick={() => changeHandler(Math.max(value - 1, min))}
        type="button"
        aria-label="reduce by one"
      >
        {" - "}
      </button>
      <input
        className="number-input__control"
        readOnly
        name={name}
        id={id}
        value={_value}
      />
      <button
        className="number-input__button"
        onClick={() => changeHandler(Math.min(value + 1, max))}
        type="button"
        aria-label="increase by one"
      >
        {" + "}
      </button>
    </div>
  );
});

interface PropTypes {
  value: number;
  min: number;
  max: number;
  className?: string;
  name?: string;
  onChange?: (value: number) => void;
  id?: string;
}
