// Navbar.js
import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { RiAdminFill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ onAddProfile, isAdminMode, onToggleAdminMode, onSearch }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleAdminMode = () => {
    onToggleAdminMode(!isAdminMode);
    setNotificationOpen(true);
    console.log("Clicked");
  };

  const closeNotification = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    let timer;
    if (notificationOpen) {
      timer = setTimeout(() => {
        setNotificationOpen(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [notificationOpen]);








  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };







  return (
    <div className={`navbar ${isAdminMode ? "admin-mode" : ""}`}>
      <div className="navbar-brand">B-PD</div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearchSubmit}>
          <FaSearch className="search-icon" />
        </button>
      </div>
      <div className="navbar-menu">
        <button
          className={`admin-mode-btn ${isAdminMode ? "admin-mode-color" : ""}`}
          onClick={toggleAdminMode}
        >
          {isAdminMode ? "Exit Admin Mode" : "Enter Admin Mode"}
        </button>
        {isAdminMode && (
          <button className="add-user-btn" onClick={onAddProfile}>
            <IoPersonAddSharp className="user-icon" />
          </button>
        )}
      </div>
      {notificationOpen && (
        <div
          className={`admin-mode-notification ${
            notificationOpen ? "open" : ""
          }`}
        >
          <span>
            {" "}
            {isAdminMode
              ? "You have entered admin mode"
              : "you have closed admin mode"}
          </span>
          <IoIosCloseCircle
            onClick={closeNotification}
            className="close-icon"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
