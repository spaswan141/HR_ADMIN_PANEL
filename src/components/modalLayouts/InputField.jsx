import React, { useState } from "react";
import { useController } from "react-hook-form";
import { ChevronDown, ChevronUp, Eye, EyeOff, Upload } from "lucide-react";
import "./input.css";

const Input = ({
  label,
  type = "text",
  name,
  control,
  defaultValue = "",
  required = false,
  options = [],
  placeholder,
  rules = {}, // Add rules prop
  accept, // For file input
  multiple = false, // For file input
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form controller with rules
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    rules: required ? { required: `${label} is required`, ...rules } : rules, // Auto-add required rule
  });

  // Determine actual input type for password fields
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  // File input handlers
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (multiple) {
      field.onChange(Array.from(files));
    } else {
      field.onChange(files[0] || null);
    }
  };

  // Number input handler - only allows numeric characters
  const handleNumberChange = (event) => {
    const value = event.target.value;
    // Remove all non-numeric characters (except decimal point and minus sign)
    const numericValue = value.replace(/[^0-9.-]/g, "");
    // Update the field with filtered value
    field.onChange(numericValue);
    // Update the input display
    event.target.value = numericValue;
  };

  // Get file display text
  const getFileDisplayText = () => {
    if (!field.value)
      return placeholder || `Choose ${multiple ? "files" : "file"}`;

    if (multiple && Array.isArray(field.value)) {
      return field.value.length > 1
        ? `${field.value.length} files selected`
        : field.value[0]?.name || "File selected";
    }

    return field.value?.name || "File selected";
  };

  const renderInput = () => {
    if (type === "file") {
      const hasFile =
        field.value &&
        (Array.isArray(field.value) ? field.value.length > 0 : true);

      return (
        <div className={`file-container ${hasFile ? "has-file" : ""}`}>
          <input
            type="file"
            onChange={handleFileChange}
            accept={accept}
            multiple={multiple}
            {...props}
          />
          <div className={`file-input-display ${error ? "error" : ""}`}>
            <span className={`file-input-text ${hasFile ? "has-file" : ""}`}>
              {getFileDisplayText()}
            </span>
            <Upload className="file-input-icon" size={20} />
          </div>
          <label className="input-label">
            {label}
            {required && <span className="required">*</span>}
          </label>
        </div>
      );
    }

    if (type === "select") {
      const handleSelect = (val) => {
        field.onChange(val);
        setOpen(false);
      };

      return (
        <div className="custom-select-wrapper">
          <div
            className={`input-field input-select ${error ? "error" : ""}`}
            onClick={() => setOpen(!open)}
          >
            {field.value ? (
              options.find((o) => o.value === field.value)?.label
            ) : (
              <span className="placeholder">
                {placeholder || label}
                {required && <span className="required">*</span>}
              </span>
            )}

            {/* Arrow icon */}
            <span className="custom-select-arrow">
              {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </div>

          {open && (
            <ul className="custom-select-options">
              {options.map((option, index) => (
                <li
                  key={index}
                  className={option.value === field.value ? "selected" : ""}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}

          {/* floating label */}
          {field.value && (
            <label className="input-label">
              {label}
              {required && <span className="required">*</span>}
            </label>
          )}
        </div>
      );
    }

    // date input
    if (type === "date") {
      return (
        <div className="date-container">
          <input
            type="date"
            className={`input-field ${error ? "error" : ""}`}
            placeholder=" "
            {...field}
            {...props}
          />
          <label className="input-label">
            {label}
            {required && <span className="required">*</span>}
          </label>
        </div>
      );
    }

    // password input with toggle
    if (type === "password") {
      return (
        <div className="password-container">
          <input
            type={inputType}
            className={`input-field ${error ? "error" : ""}`}
            placeholder={placeholder || " "}
            {...field}
            {...props}
          />
          <label className="input-label">
            {label}
            {required && <span className="required">*</span>}
          </label>
          <span
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
      );
    }

    // default text/email/number etc
    return (
      <>
        <input
          type={type === "number" ? "text" : inputType} // Use text for number type
          className={`input-field ${error ? "error" : ""}`}
          placeholder={placeholder || " "}
          {...field}
          onChange={type === "number" ? handleNumberChange : field.onChange} // Use number handler for number type
          {...props}
        />
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      </>
    );
  };

  return (
    <div className="input-container">
      {renderInput()}
      {/* Error message */}
      {error && (
        <span
          className="error-message"
          style={{
            color: "red",
            fontSize: "12px",
            marginTop: "4px",
            display: "block",
          }}
        >
          {error.message || "This field is required"}
        </span>
      )}
    </div>
  );
};

export default Input;
