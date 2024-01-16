/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import "./Modal.css";
import { images } from "../images/images";
import { themes } from "../images/theme";
// eslint-disable-next-line import/named
import { useTheme } from "../Context/ThemeContext";

// eslint-disable-next-line react/prop-types
function Modal({
  showModal,
  setShowModal,
  changeAvatarProfile,
  setUser,
  updateUserInformation,
}) {
  // const {showModal, setShowModal, changeAvatarProfile, setUser, updateUserInformation, setSelectedTheme } = props

  const [pseudo, setPseudo] = useState("");
  // const [arriere, setArriere] = useState("");
  const [sound, setSound] = useState("25");
  const [sonorEffect, setSonorEffect] = useState("25");
  const [addChange, setAddChange] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(undefined);
  const [newSelectedImageIndex, setNewSelectedImageIndex] = useState(undefined);
  const {theme} = useTheme();
  // change le pseudo
  function handleInputChange(e) {
    setPseudo(e.target.value);
    setAddChange(true);
  }

  // changement de theme prend la valeur que j'écris + montre le bouton pour changement
  function handleThemeChange() {
    // setArriere(e.target.value);
    setAddChange(true);
  }

  // bouton pour enregistrer les modifs
  function handdleAddChange() {
    setAddChange(true);
    setSelectedImageIndex(newSelectedImageIndex);
    changeAvatarProfile(newSelectedImageIndex);
    updateUserInformation(pseudo, theme, selectedImageIndex);
    localStorage.setItem("selectedAvatarIndex", newSelectedImageIndex);
    localStorage.setItem("userPseudo", pseudo);
    localStorage.setItem("SelectedTheme", theme);
    setShowModal(false);
    console.info("Modal closed")
  }

  // changement pour volume
  const changeVolume = (newVolume) => {
    setSound(newVolume);
  };

  // idem mais effets
  const changeSoundEffect = (newEffect) => {
    setSonorEffect(newEffect);
  };

  // changement de l'image de profil + affiche le bouton pour changement
  const handleChangeAvatar = (index) => {
    setNewSelectedImageIndex(index);
    setSelectedImageIndex(index);

    setAddChange(true);
  };

  return (
    <div className="container-Modal">
      {showModal ? (
        <div className="modal-content">
          <span
            className="close"
            onClick={() => setShowModal(false)}
            aria-hidden="true"
          >
            &times;
          </span>
          <div className="information-setup">
            <div className="pseudo">
              <label htmlFor="pseudoInput">Pseudo: </label>
              <input
                type="text"
                placeholder={setUser}
                value={pseudo}
                onChange={handleInputChange}
              />
            </div>
            <div className="theme">
              <label htmlFor="themeInput">Thème: </label>
              <div className="select-container">
                <select
                  
                  onChange={handleThemeChange}
                  className="custom-select"
                >
                  <option value="">Sélectionnez un thème</option>
                  {themes.map((themeOption) => (
                    <option key={themeOption} value={themeOption}>
                      Thème {themes.indexOf(themeOption) + 1}
                    </option>
                  ))}
                </select>
              </div>
              {theme && (
                <img
                  className="image-preview"
                  src={theme}
                  alt="visualisation thème"
                />
              )}
            </div>

            <div className="music">
              <label htmlFor="SoundInput">Musique: </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sound}
                onChange={(e) => changeVolume(e.target.value)}
              />
              <span>{sound}</span>
            </div>
            <div className="sonoreEffect">
              <label htmlFor="SonoreEffect">Effet Sonore: </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sonorEffect}
                onChange={(e) => changeSoundEffect(e.target.value)}
              />
              <span>{sonorEffect}</span>
            </div>
          </div>
          <div className="personnage-Selection">
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

          {/* <div className="Facturation"> 
      <label htmlFor="facturation">Facturation:</label>
              <div className="Historique"> 
              <label htmlFor="historique">Montant € date </label>
              {/* <ul><li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li></ul> */}

          <div className="button-add-changment">
            <button
              type="submit"
              onClick={handdleAddChange}
              style={{ display: addChange ? "block" : "none" }}
            >
              Enregistrer les changements
            </button>
          </div>
        </div>
      ) : // </div> */}

      // </div>
      null}
    </div>
  );
}

export default Modal;
