import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

export default function TextField({
  label,
  required,
  className = "",
  type = "text",
  multiline = false,
  defaultValue,
  value="",
  ...inputProps
}: {
  label: string;
  multiline?: boolean;
} & (JSX.IntrinsicElements["input"] & JSX.IntrinsicElements["textarea"])) {
  const [_type, setType] = useState(type);
  const [_value, setValue] = useState(value);

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
    <div className={"text-field" + (className ? ` ${className}` : "")}>
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
              onChange={(e) => setValue(e.currentTarget.value)}
              className="text-field__control text-field__control--multiline"
            >{_value}</textarea>
          ) : (
            <>
              <input
                {...inputProps}
                type={_type}
                required={required}
                value={_value}
                onChange={(e) => setValue(e.currentTarget.value)}
                className="text-field__control"
              />
              {Icon}
            </>
          )}
        </span>
      </label>
    </div>
  );
}
