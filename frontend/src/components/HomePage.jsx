import React, { useState } from "react";
import Modal from "./Modal";
import { images } from "../images/images";
import avatarDefaut from "../images/avatarDefaut.jpg";

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [avatarProfile, setAvatarProfile] = useState(avatarDefaut);
  const [user, setUser] = useState("invité");
  const [selectedTheme, setSelectedTheme] = useState(null);

  const changeAvatarProfile = (index) => {
    setAvatarProfile(images[index]);
  };
  const updateUserInformation = (newPseudo) => {
    setUser(newPseudo);
  };

  return (
    <div>
      <div
        className="Profile-user"
        style={{ backgroundImage: `url(${selectedTheme})` }}
      >
        <img
          src={avatarProfile}
          alt="Profile"
          onClick={() => setShowModal(true)}
          aria-hidden="true"
        />
        <label htmlFor="PseudoInput">{user} </label>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        changeAvatarProfile={changeAvatarProfile}
        updateUserInformation={updateUserInformation}
        setSelectedTheme={setSelectedTheme}
        user={user}
      />
    </div>
  );
}

export default HomePage;
