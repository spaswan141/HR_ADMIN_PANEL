import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./CustomSelect.css";

const CustomSelect = ({ label, value, options, onChange, condition='none' }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="custom-select">
      <button
        className="select-trigger"
        style={{
          color:
            condition === "Ongoing" || condition === "Present" || condition === "Approve"
              ? "#008413"
              :  condition === "Rejected" || condition === "Absent" || condition === "Reject" ? "#B70000":
              condition === "Schedule" || condition === "Pending" ? "#E8B000" : condition === "Selected" ? "#4D007D":"#121212"
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* Show label when no value is selected — otherwise show the value */}
        {value ? value : <span className="placeholder">{label}</span>}

        <FiChevronDown className={`arrow ${open ? "open" : ""}`} />
      </button>

      {open && (
        <div className="select-options">
          {options.map((opt) => (
            <div
              key={opt}
              className={`option ${opt === value ? "selected" : ""}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
