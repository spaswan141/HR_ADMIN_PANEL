import React from "react";
import { FiSearch } from "react-icons/fi";
import  "./CustomSearch.css"; // same style rules as select for consistency

const CustomSearch = ({ value, onChange, placeholder = "Search" }) => {
  return (
    <div className="custom-search">
      <FiSearch className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomSearch;
