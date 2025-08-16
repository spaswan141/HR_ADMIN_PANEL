import React, { useState } from "react";
import { useController } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./input.css";

export default function InputField({
  label,
  placeholder,
  type = "text",
  required = false,
  name,
  control,
  defaultValue = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  // react-hook-form controller
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  // Determine actual input type
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="input-group">
      {label && (
        <label>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        <input
          type={inputType}
          placeholder={placeholder}
          {...field}
          required={required}
        />

        {type === "password" && (
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ cursor: "pointer", color: "#5c0fc5" }}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        )}
      </div>

      {error && (
        <span className="error-message" style={{ color: "red", fontSize: "0.8rem" }}>
          {error.message}
        </span>
      )}
    </div>
  );
}