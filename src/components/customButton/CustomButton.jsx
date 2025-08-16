import React from "react";
import "./CustomButton.css"; // same style file

const CustomButton = ({ label, onClick, type = "primary" }) => {
  return (
    <button className={`custom-btn ${type}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;
