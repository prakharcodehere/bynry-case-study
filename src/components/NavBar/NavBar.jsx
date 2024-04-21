// Navbar.js
import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { RiAdminFill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";

const Navbar = ({ onAddProfile,isAdminMode, onToggleAdminMode }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleAdminMode = () => {
    onToggleAdminMode(!isAdminMode);
    setNotificationOpen(true);
    console.log("Clicked")
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

  return (
    <div className={`navbar ${isAdminMode ? 'admin-mode' : ''}`}>
      <div className="navbar-brand">B-PD</div>
      <div className="navbar-menu">
        <button className={`admin-mode-btn ${isAdminMode ? 'admin-mode-color' : ''}`} onClick={toggleAdminMode}>
        {isAdminMode ? 'Exit Admin Mode' : 'Enter Admin Mode'}
        </button>
        {isAdminMode && (
          <button className="add-user-btn" onClick={onAddProfile}>
            <IoPersonAddSharp className='user-icon'/>
          </button>
        )}
      </div>
      {notificationOpen && (
  <div className={`admin-mode-notification ${notificationOpen ? 'open' : ''}`}>
    <span> {isAdminMode ? 'You have entered admin mode' : 'you have closed admin mode'}</span>
    <IoIosCloseCircle onClick={closeNotification} className='close-icon'/>

  </div>
)}

    </div>
  );
};

export default Navbar;
