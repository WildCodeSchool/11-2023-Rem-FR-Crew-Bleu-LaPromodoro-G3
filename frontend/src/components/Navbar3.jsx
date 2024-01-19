import { useAvatar } from "../Context/AvatarContext";
import image from "../assets/Quiz1.png";
import "../styles/Navbar3.css";

function Navbar3() {
  const { profileImage } = useAvatar();
  return (
    <nav className="top-nav">
      <div className="nav-bar">
        <img src={image} alt="logo" className="nav-logo" />
        {profileImage ? (
          <img src={profileImage} alt="profile" className="profile-picture" />
        ) : (
          <img src={profileImage} alt="profile" className="profile-picture" />
        )}
      </div>
    </nav>
  );
}

export default Navbar3;
