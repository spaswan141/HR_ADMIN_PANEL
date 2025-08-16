import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import "./searchInput.css";

const SearchInput = ({
  label = "Search",
  placeholder = "Type to search...",
  data = [], // Array of items to search through
  searchKey = "name", // Key to search in if data contains objects
  onSelect = () => {}, // Callback when item is selected
  onSearch = () => {}, // Callback for search term changes
  maxResults = 10, // Maximum number of results to show
  required = false,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter data based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData([]);
      setIsOpen(false);
      return;
    }

    const filtered = data
      .filter((item) => {
        const searchValue = typeof item === "string" ? item : item[searchKey];
        return searchValue?.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .slice(0, maxResults);

    setFilteredData(filtered);
    setIsOpen(filtered.length > 0);
  }, [searchTerm, data, searchKey, maxResults]);

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    const selectedValue = typeof item === "string" ? item : item[searchKey];
    setSearchTerm(selectedValue);
    setIsOpen(false);
    onSelect(item);
  };

  // Clear search
  const handleClear = () => {
    setSearchTerm("");
    setIsOpen(false);
    onSearch("");
    searchRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !searchRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="search-input-container">
      <div className="search-input-wrapper">
        <Search className="search-icon-left" size={18} />
        
        <input
          ref={searchRef}
          type="text"
          className="search-input-field"
          placeholder={placeholder || " "}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        
        <label className="search-input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>

        {searchTerm && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {isOpen && filteredData.length > 0 && (
        <div ref={dropdownRef} className="search-dropdown">
          <ul className="search-results">
            {filteredData.map((item, index) => {
              const displayValue = typeof item === "string" ? item : item[searchKey];
              return (
                <li
                  key={index}
                  className="search-result-item"
                  onClick={() => handleItemSelect(item)}
                >
                  {displayValue}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;