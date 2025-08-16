import React, { useState } from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import CustomSearch from "../customSearch/customSearch";
import LogoutModal from "../ModalComponents/LogOutModal";

export default function Sidebar() {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [active, setActive] = useState("/");
  const navigate = useNavigate();
  const menuItems = [
    {
      section: "Recruitment",
      items: [
        {
          key: "/",
          label: "Candidates",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 9.16634H6.66667M4.58333 11.2497V7.08301M12.0833 11.6663C15.0903 11.6663 16.6951 12.673 17.2609 14.6864C17.5598 15.7498 16.6046 16.6663 15.5 16.6663H8.66666C7.56209 16.6663 6.60687 15.7498 6.90573 14.6864C7.47159 12.673 9.07637 11.6663 12.0833 11.6663ZM12.0833 8.33301C13.4722 8.33301 14.1667 7.61872 14.1667 5.83301C14.1667 4.04729 13.4722 3.33301 12.0833 3.33301C10.6944 3.33301 10 4.04729 10 5.83301C10 7.61872 10.6944 8.33301 12.0833 8.33301Z"
                stroke="#121212"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
          activeIcon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 9.16634H6.66667M4.58333 11.2497V7.08301M12.0833 11.6663C15.0903 11.6663 16.6951 12.673 17.2609 14.6864C17.5598 15.7498 16.6046 16.6663 15.5 16.6663H8.66666C7.56209 16.6663 6.60687 15.7498 6.90573 14.6864C7.47159 12.673 9.07637 11.6663 12.0833 11.6663ZM12.0833 8.33301C13.4722 8.33301 14.1667 7.61872 14.1667 5.83301C14.1667 4.04729 13.4722 3.33301 12.0833 3.33301C10.6944 3.33301 10 4.04729 10 5.83301C10 7.61872 10.6944 8.33301 12.0833 8.33301Z"
                stroke="#4D007D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
      ],
    },
    {
      section: "Organization",
      items: [
        {
          key: "employee",
          label: "Employees",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4209 15.8337H16.6667C17.5871 15.8337 18.3891 15.0636 18.0967 14.1908C17.651 12.8607 16.5546 12.0564 14.6273 11.7777M12.0834 9.05406C12.3259 9.13071 12.6037 9.16699 12.9167 9.16699C14.3056 9.16699 15 8.45271 15 6.66699C15 4.88128 14.3056 4.16699 12.9167 4.16699C12.6037 4.16699 12.3259 4.20327 12.0834 4.27992M7.91667 11.667C10.7363 11.667 12.323 12.4046 12.9763 13.8799C13.4236 14.8898 12.4379 15.8337 11.3333 15.8337H4.5C3.39543 15.8337 2.40976 14.8898 2.85702 13.8799C3.51034 12.4046 5.09706 11.667 7.91667 11.667ZM7.91667 9.16699C9.30556 9.16699 10 8.45271 10 6.66699C10 4.88128 9.30556 4.16699 7.91667 4.16699C6.52778 4.16699 5.83333 4.88128 5.83333 6.66699C5.83333 8.45271 6.52778 9.16699 7.91667 9.16699Z"
                stroke="#121212"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
          activeIcon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4209 15.8337H16.6667C17.5871 15.8337 18.3891 15.0636 18.0967 14.1908C17.651 12.8607 16.5546 12.0564 14.6273 11.7777M12.0834 9.05406C12.3259 9.13071 12.6037 9.16699 12.9167 9.16699C14.3056 9.16699 15 8.45271 15 6.66699C15 4.88128 14.3056 4.16699 12.9167 4.16699C12.6037 4.16699 12.3259 4.20327 12.0834 4.27992M7.91667 11.667C10.7363 11.667 12.323 12.4046 12.9763 13.8799C13.4236 14.8898 12.4379 15.8337 11.3333 15.8337H4.5C3.39543 15.8337 2.40976 14.8898 2.85702 13.8799C3.51034 12.4046 5.09706 11.667 7.91667 11.667ZM7.91667 9.16699C9.30556 9.16699 10 8.45271 10 6.66699C10 4.88128 9.30556 4.16699 7.91667 4.16699C6.52778 4.16699 5.83333 4.88128 5.83333 6.66699C5.83333 8.45271 6.52778 9.16699 7.91667 9.16699Z"
                stroke="#4D007D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
        {
          key: "attendance",
          label: "Attendance",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.33325 9.33333C8.33325 8.78105 8.78097 8.33333 9.33325 8.33333H10.6666C11.2189 8.33333 11.6666 8.78105 11.6666 9.33333V15.6667C11.6666 16.219 11.2189 16.6667 10.6666 16.6667H9.33325C8.78097 16.6667 8.33325 16.219 8.33325 15.6667V9.33333Z"
                stroke="#121212"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.33325 12.6667C3.33325 12.1144 3.78097 11.6667 4.33325 11.6667H5.66659C6.21887 11.6667 6.66659 12.1144 6.66659 12.6667V15.6667C6.66659 16.219 6.21887 16.6667 5.66659 16.6667H4.33325C3.78097 16.6667 3.33325 16.219 3.33325 15.6667V12.6667Z"
                stroke="#121212"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.3333 6C13.3333 5.44772 13.781 5 14.3333 5H15.6666C16.2189 5 16.6666 5.44772 16.6666 6V15.6667C16.6666 16.219 16.2189 16.6667 15.6666 16.6667H14.3333C13.781 16.6667 13.3333 16.219 13.3333 15.6667V6Z"
                stroke="#121212"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
          activeIcon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.33325 9.33333C8.33325 8.78105 8.78097 8.33333 9.33325 8.33333H10.6666C11.2189 8.33333 11.6666 8.78105 11.6666 9.33333V15.6667C11.6666 16.219 11.2189 16.6667 10.6666 16.6667H9.33325C8.78097 16.6667 8.33325 16.219 8.33325 15.6667V9.33333Z"
                stroke="#121212"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.33325 12.6667C3.33325 12.1144 3.78097 11.6667 4.33325 11.6667H5.66659C6.21887 11.6667 6.66659 12.1144 6.66659 12.6667V15.6667C6.66659 16.219 6.21887 16.6667 5.66659 16.6667H4.33325C3.78097 16.6667 3.33325 16.219 3.33325 15.6667V12.6667Z"
                stroke="#121212"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.3333 6C13.3333 5.44772 13.781 5 14.3333 5H15.6666C16.2189 5 16.6666 5.44772 16.6666 6V15.6667C16.6666 16.219 16.2189 16.6667 15.6666 16.6667H14.3333C13.781 16.6667 13.3333 16.219 13.3333 15.6667V6Z"
                stroke="#4D007D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
        {
          key: "leaves",
          label: "Leaves",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.33325 3.33301C8.33325 6.09443 6.09468 8.33301 3.33325 8.33301C6.09468 8.33301 8.33325 10.5716 8.33325 13.333C8.33325 10.5716 10.5718 8.33301 13.3333 8.33301C10.5718 8.33301 8.33325 6.09443 8.33325 3.33301Z"
                stroke="#121212"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.5833 12.4997C14.5833 13.6503 13.6505 14.583 12.4999 14.583C13.6505 14.583 14.5833 15.5157 14.5833 16.6663C14.5833 15.5157 15.516 14.583 16.6666 14.583C15.516 14.583 14.5833 13.6503 14.5833 12.4997Z"
                stroke="#121212"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
          activeIcon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.33325 3.33301C8.33325 6.09443 6.09468 8.33301 3.33325 8.33301C6.09468 8.33301 8.33325 10.5716 8.33325 13.333C8.33325 10.5716 10.5718 8.33301 13.3333 8.33301C10.5718 8.33301 8.33325 6.09443 8.33325 3.33301Z"
                stroke="#4D007D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.5833 12.4997C14.5833 13.6503 13.6505 14.583 12.4999 14.583C13.6505 14.583 14.5833 15.5157 14.5833 16.6663C14.5833 15.5157 15.516 14.583 16.6666 14.583C15.516 14.583 14.5833 13.6503 14.5833 12.4997Z"
                stroke="#121212"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
      ],
    },
    {
      section: "Others",
      items: [
        {
          key: "logout",
          label: "Logout",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6666 16.667H5.33325C4.22868 16.667 3.33325 15.7716 3.33325 14.667L3.33325 5.33366C3.33325 4.22909 4.22868 3.33366 5.33325 3.33366H11.6666M8.33325 10.0003H17.4999M17.4999 10.0003L14.9999 12.5003M17.4999 10.0003L14.9999 7.50033"
                stroke="#121212"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
          activeIcon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6666 16.667H5.33325C4.22868 16.667 3.33325 15.7716 3.33325 14.667L3.33325 5.33366C3.33325 4.22909 4.22868 3.33366 5.33325 3.33366H11.6666M8.33325 10.0003H17.4999M17.4999 10.0003L14.9999 12.5003M17.4999 10.0003L14.9999 7.50033"
                stroke="#4D007D"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="logo-icon">▢</span>
        <span className="logo-text">LOGO</span>
      </div>
      {/* Search */}
      <div className="sidebar-search">
        <CustomSearch />
      </div>
      {/* Menu Sections */}
      {menuItems.map((section) => (
        <div className="sidebar-section" key={section.section}>
          <p className="section-title">{section.section}</p>
          {section.items.map((item) => (
            <div
              key={item.key}
              className={`sidebar-item ${active === item.key ? "active" : ""}`}
              onClick={() => {
                if (item.key === "logout") {
                  setOpenLogoutModal(true)
                } else {
                  setActive(item.key);
                  navigate(item.key);
                }
              }}
            >
              {active === item.key && <span className="activeClass"></span>}
              <span className="icon">
                {active === item.key ? item.activeIcon : item.icon}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      ))}
      <LogoutModal
        open={openLogoutModal}
        onClose={() => {
          setOpenLogoutModal(false);
        }}
      />
    </div>
  );
}
