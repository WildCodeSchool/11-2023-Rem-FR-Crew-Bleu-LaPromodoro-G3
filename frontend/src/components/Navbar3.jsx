import React, { useEffect, useState } from "react";
import image from "../assets/Quiz1.png";
import defaultAvatar from "../assets/defaultAvatar";
import "../styles/Navbar3.css";

function Navbar3() {
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  return (
    <nav className="top-nav">
      <div className="nav-bar">
        <img src={image} alt="logo" className="nav-logo" />
        {profileImage ? (
          <img src={profileImage} alt="profile" className="profile-picture" />
        ) : (
          <img src={defaultAvatar} alt="profile" className="profile-picture" />
        )}
      </div>
    </nav>
  );
}

export default Navbar3;
