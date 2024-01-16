import React from "react";
import { NavLink } from "react-router-dom";
import image from "../assets/Group 33.png";
import "../styles/Navbar1.css";

function Navbar1() {
  return (
    <nav className="app-nav">
      <div className="links-container">
        <NavLink
          to="/create-account"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          Create account
        </NavLink>
        <NavLink
          to="/connexion"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          Connexion
        </NavLink>
      </div>
      <img src={image} alt="logo" className="navbar-image" />
    </nav>
  );
}

export default Navbar1;
