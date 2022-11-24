import { useEffect, useState, forwardRef } from "react";

export default forwardRef<HTMLDivElement, PropTypes>(function NumberInput(
  { value = 0, min = 0, max = Infinity, className = "", name, onChange },
  forwardRef
) {
  const [_value, setValue] = useState(Math.min(Math.max(value, min), max));

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    if (value != _value) {
      onChange?.(_value);
    }
  }, [_value]);

  return (
    <div
      ref={forwardRef}
      className={"number-input" + (className ? ` ${className}` : "")}
    >
      <button
        className="number-input__button"
        onClick={() => setValue(Math.max(_value - 1, min))}
        type="button"
        aria-label="reduce by one"
      >
        {" - "}
      </button>
      <input
        className="number-input__control"
        readOnly
        name={name}
        key={_value}
        defaultValue={_value}
      />
      <button
        className="number-input__button"
        onClick={() => setValue(Math.min(_value + 1, max))}
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
  onChange?: (value: number) => void;
}
