import { useEffect } from "react";
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import image from "../assets/Group 33.png";
import { useAvatar } from "../Context/AvatarContext";
import backgroundMusicFile from "../assets/8-bit-arcade-138828.mp3";
import BackgroundMusic from "./BackgroundMusic";

import "../styles/Navbar2.css";

function Navbar2({ openModal }) {
  const { profileImage, PseudoPlayer } = useAvatar();

  const handleProfileClick = () => {
    openModal();
  };
  useEffect(() => {}, [PseudoPlayer]);
  return (
    <nav className="profile-nav">
      <div className="right-section">
        <div className="navbar-logo">
          <Link to="/">
            <img src={image} alt="logo" className="navbar-logo" />
          </Link>
        </div>
        <div className="profileContainer">
          <BackgroundMusic
            className="buttonMusicQuiz"
            musicUrl={backgroundMusicFile}
            volume={0.02}
          />
          <div className="containerUserProfile">
            <img
              src={profileImage}
              alt="profile"
              className="profile-pic"
              onClick={handleProfileClick}
            />
            <span>{PseudoPlayer}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar2;
