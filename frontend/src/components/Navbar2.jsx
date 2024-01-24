/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import image from "../assets/Group 33.png";
import { useAvatar } from "../Context/AvatarContext";

import "../styles/Navbar2.css";

function Navbar2({ openModal }) {
  const { profileImage } = useAvatar();

  const handleProfileClick = () => {
    openModal();
  };

  return (
    <nav className="profile-nav">
      <div className="right-section">
        <div className="navbar-logo">
          <Link to="/">
            <img src={image} alt="logo" className="navbar-logo" />
          </Link>
        </div>
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
