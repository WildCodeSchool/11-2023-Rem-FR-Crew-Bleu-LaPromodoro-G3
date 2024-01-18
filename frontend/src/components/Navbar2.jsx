/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import image from "../assets/Group 33.png";
import { AvatarContext } from "../Context/AvatarContext";

import "../styles/Navbar2.css";

function Navbar2({ openModal }) {
  const { profileImage } = useContext(AvatarContext);
  useEffect(() => {
    console.info("profileImage a changé :", profileImage);
  }, [profileImage]);

  const handleProfileClick = () => {
    openModal();
  };

  return (
    <nav className="profile-nav">
      <div className="right-section">
        <img src={image} alt="logo" className="navbar-logo" />
        <img
          src={profileImage}
          alt="profile"
          className="profile-pic"
          onClick={handleProfileClick}
        />
      </div>
    </nav>
  );
}

export default Navbar2;
