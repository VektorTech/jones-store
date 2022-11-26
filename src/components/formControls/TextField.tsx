import { useState, forwardRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default forwardRef<
  HTMLDivElement,
  PropTypes &
    (JSX.IntrinsicElements["input"] & JSX.IntrinsicElements["textarea"])
>(function TextField(
  {
    label,
    required,
    className = "",
    type = "text",
    multiline = false,
    error,
    onChange = () => null,
    ...inputProps
  },
  forwardRef
) {
  const [_type, setType] = useState(type);

  let Icon;

  if (type == "password") {
    if (_type == "password") {
      Icon = (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setType(type.replace("password", "text"))}
          className="text-field__control-btn"
        >
          <AiOutlineEye />
        </button>
      );
    } else {
      Icon = (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setType("password")}
          className="text-field__control-btn"
        >
          <AiOutlineEyeInvisible />
        </button>
      );
    }
  }

  return (
    <div
      ref={forwardRef}
      className={"text-field" + (className ? ` ${className}` : "")}
    >
      <label className="text-field__label">
        <span className="text-field__label-text">
          {label}{" "}
          {required && <span className="text-field__label-asterisk">*</span>}
        </span>
        <span
          className={
            "text-field__input" +
            (multiline ? " text-field__input--multiline" : "")
          }
        >
          {multiline ? (
            <textarea
              {...inputProps}
              rows={5}
              required={required}
              onChange={onChange}
              className={
                "text-field__control text-field__control--multiline" +
                (error ? " text-field__control--error" : "")
              }
            ></textarea>
          ) : (
            <>
              <input
                {...inputProps}
                type={_type}
                required={required}
                onChange={onChange}
                className={
                  "text-field__control" +
                  (error ? " text-field__control--error" : "")
                }
              />
              {Icon}
            </>
          )}
        </span>
        <span className="text-field__error">{error}</span>
      </label>
    </div>
  );
});

interface PropTypes {
  label?: string;
  multiline?: boolean;
  error?: string;
}
