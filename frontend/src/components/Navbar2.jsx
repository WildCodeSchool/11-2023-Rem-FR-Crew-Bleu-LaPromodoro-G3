/* eslint-disable react/prop-types */
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
