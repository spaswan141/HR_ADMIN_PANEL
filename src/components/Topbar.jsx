import { FaSearch, FaBell } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import "./topbar.css";
import { useState } from "react";
import Avatar from "../assets/profile.png"

export default function Topbar({ title }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>{title}</h2>
      </div>

      <div className="topbar-right">
        {/* Search Input */}

        {/* Icons */}
        <IoMdMail className="topbar-icon" />
        <FaBell className="topbar-icon" />

        {/* Profile */}
        <div className="profile">
        </div><div className="profile" onClick={toggleDropdown}>
          <img
            src={Avatar}
            alt="Profile"
            className="profile-img"
          />
          <IoChevronDown className="dropdown-icon" />
          {isDropdownOpen && (
            <div className="dropdown-content">
              <a href="#">Edit Profile</a>
              <a href="#">Change Password</a>
              <a href="#">Manage Notification</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
