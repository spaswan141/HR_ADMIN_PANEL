import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import "./actionmenu.css"

const ActionMenu = ({ actions, onActionClick }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="action-menu" ref={menuRef}>
      <button
        className="action-btn"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FiMoreVertical />
      </button>

      {open && (
        <div className="action-dropdown">
          {actions.map((action, idx) => (
            <div
              key={idx}
              className="action-item"
              onClick={() => {
                onActionClick(action);
                setOpen(false);
              }}
            >
              {action}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
