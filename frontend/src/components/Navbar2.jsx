import React from "react";
import image from "../assets/Group 33.png";
import picture from "../assets/canard.png";
import "./Navbar2.css";

function Navbar2() {
  return (
    <nav className="profile-nav">
      <div className="right-section">
        <img src={image} alt="logo" className="navbar-logo" />
        <img src={picture} alt="profile" className="profile-pic" />
      </div>
    </nav>
  );
}

export default Navbar2;
