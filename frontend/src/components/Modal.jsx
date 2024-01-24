/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useTheme } from "../Context/ThemeContext";
import { images } from "../assets/images/images";
import { themes } from "../assets/images/theme";
import { useAvatar } from "../Context/AvatarContext";
import defaultAvatar from "../assets/defaultAvatar";
import "../styles/Modal.css";
// import Bonus from "./Bonus";

function Modal({ showModal, setShowModal, setUser }) {
  // const {showModal, setShowModal, changeAvatarProfile, setUser, updateUserInformation, setSelectedTheme } = props
  const [arriere, setArriere] = useState("");
  const [pseudo, setPseudo] = useState("");
  // const [sound, setSound] = useState("25");
  // const [sonorEffect, setSonorEffect] = useState("25");
  const [addChange, setAddChange] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState("");
  const [newSelectedImageIndex, setNewSelectedImageIndex] = useState(undefined);
  const { theme, changeTheme } = useTheme();
  const { updateProfileImage } = useAvatar();

  // change le pseudo
  function handleInputChange(e) {
    setPseudo(e.target.value);
    setAddChange(true);
  }

  // changement de theme prend la valeur que j'écris + montre le bouton pour changement
  function handleThemeChange(e) {
    const newTheme = e.target.value;
    setArriere(newTheme);
    setAddChange(true);
  }
  // changement de l'image de profil + affiche le bouton pour changement
  const handleChangeAvatar = (index) => {
    if (index === selectedImageIndex) {
      setNewSelectedImageIndex(undefined);
      setSelectedImageIndex(undefined);
    } else {
      setNewSelectedImageIndex(index);
      setSelectedImageIndex(index);
    }
    setAddChange(true);
  };

  // bouton pour enregistrer les modifs
  function handdleAddChange() {
    const newImage =
      newSelectedImageIndex !== undefined
        ? images[newSelectedImageIndex]
        : defaultAvatar;

    updateProfileImage(newImage);
    setAddChange(true);
    setSelectedImageIndex(newSelectedImageIndex);
    changeTheme(arriere);

    localStorage.setItem("profileImage", newImage);
    localStorage.setItem("userPseudo", pseudo);
    localStorage.setItem("SelectedTheme", arriere);

    setShowModal(false);
  }

  // // changement pour volume
  // const changeVolume = (newVolume) => {
  //   setSound(newVolume);
  // };

  // // idem mais effets
  // const changeSoundEffect = (newEffect) => {
  //   setSonorEffect(newEffect);
  // };

  useEffect(() => {
    if (arriere === "") {
      setArriere(theme);
    }
  }, [theme, arriere]);

  return (
    <div className="container-Modal">
      {showModal ? (
        <div className="modal-content">
          <div className="closeWindow">
            {" "}
            <button
              type="button"
              className="close"
              onClick={() => setShowModal(false)}
              aria-hidden="true"
            >
              &times;
            </button>
          </div>

          <div className="information-setup">
            <div className="pseudo">
              <label htmlFor="pseudoInput"> Modifie ton pseudo: </label>
              <input
                className="userInput"
                type="text"
                placeholder={setUser}
                value={pseudo}
                onChange={handleInputChange}
              />
            </div>
            <div className="theme">
              <div className="select-container">
                <label htmlFor="themeInput"> Choisis ton thème: </label>
                <select
                  onChange={(e) => handleThemeChange(e)}
                  value={arriere}
                  className="custom-select"
                >
                  {themes.map((themeOption, index) => (
                    <option key={themeOption} value={themeOption}>
                      {index === 0 ? "Thème par défaut" : `Thème ${index}`}
                    </option>
                  ))}
                </select>
                {arriere && (
                  <img
                    className="image-preview"
                    src={arriere}
                    alt="visualisation thème"
                  />
                )}
              </div>
              {/* <div className="image-previewContainer">
                {arriere && (
                  <img
                    className="image-preview"
                    src={arriere}
                    alt="visualisation thème"
                  />
                )}
              </div> */}
            </div>

            {/* <div className="music">
              <label htmlFor="SoundInput">Musique: </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sound}
                onChange={(e) => changeVolume(e.target.value)}
              />
              <span>{sound}</span>
            </div> */}
            {/* <div className="sonoreEffect">
              <label htmlFor="SonoreEffect">Effet Sonore: </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sonorEffect}
                onChange={(e) => changeSoundEffect(e.target.value)}
              />
              <span>{sonorEffect}</span>
            </div> */}
          </div>
          <div className="personnage-Selection">
            <span className="messageChoseAvatar">Choisis ton avatar: </span>
            <div className="avatars-container">
              {images.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`Image ${index}`}
                  onClick={() => handleChangeAvatar(index)}
                  className={index === selectedImageIndex ? "selected" : ""}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className="button-add-changment">
            <button
              type="submit"
              onClick={handdleAddChange}
              style={{ display: addChange ? "flex" : "none" }}
            >
              Enregistrer les changements
            </button>
          </div>
          {/* <Bonus /> */}
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
