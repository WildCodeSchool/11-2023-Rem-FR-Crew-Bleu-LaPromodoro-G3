import React from "react";
import image from "../assets/Quiz1.png";
import picture from "../assets/canard.png";
import "../styles/Navbar3.css";

function Navbar3() {
  return (
    <nav className="top-nav">
      <div className="nav-bar">
        <img src={image} alt="logo" className="nav-logo" />
        <img src={picture} alt="profile" className="profile-picture" />
      </div>
    </nav>
  );
}

export default Navbar3;
