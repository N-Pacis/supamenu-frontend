import React, { createRef } from "react";
import "../styles/input.css";

const Input = ({
  type,
  name,
  placeholder,
  labelName,
  inputHandler,
  styles = [],
  required = false,
  pattern,
  defaultInputValue = "",
  disabled = false,
  value
}) => {
  const textInput = createRef();
  return (
    <div className="input-container mt-1">
      <label htmlFor={name} id={`${name}Label`} className="block">
        {labelName}
      </label>
      <input
        type={type}
        name={name}
        onChange={inputHandler}
        required={required}
        className={`input-field`}
        placeholder={placeholder}
        ref={textInput}
        style={{ styles }}
        defaultValue={defaultInputValue}
        pattern={pattern}
        disabled={disabled}
        value={value}
        step={type === "number" ? "any" : ""}
        autoComplete="off"
      />
      <span className="error" id={`${name}Error`} />
    </div>
  );
};

export default Input;
