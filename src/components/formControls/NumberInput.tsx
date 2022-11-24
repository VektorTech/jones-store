import { useRef, forwardRef } from "react";

export default forwardRef<HTMLDivElement, PropTypes>(function NumberInput(
  { value = 0, min = 0, max = Infinity, className = "", name, onChange },
  forwardRef
) {
  const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = (num: number) => {
    if (inputRef.current) {
      inputRef.current.value = num.toString();
    }
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
        ref={inputRef}
        value={Math.min(Math.max(value, min), max)}
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
}
