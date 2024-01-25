/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import defaultAvatar from "../assets/defaultAvatar";

const initialImage = defaultAvatar[0];

export const AvatarContext = createContext({
  profileImage: null,
  updateProfileImage: () => {},
  pseudo: "",
  updatePseudo: () => {},
});

export default function AvatarProvider({ children }) {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || initialImage
  );
  const [PseudoPlayer, setPlayerPseudo] = useState(
    localStorage.getItem("userPseudo") || ""
  );

  useEffect(() => {
    localStorage.setItem("profileImage", profileImage);
  }, [profileImage]);

  useEffect(() => {
    localStorage.setItem("userPseudo", PseudoPlayer);
  }, [PseudoPlayer]);

  const updateProfileImage = (NouvelleImage) => {
    setProfileImage(NouvelleImage);
  };
  const updatePseudo = (NewPseudo) => {
    setPlayerPseudo(NewPseudo);
  };

  return (
    <AvatarContext.Provider
      value={{ profileImage, updateProfileImage, PseudoPlayer, updatePseudo }}
    >
      {children}
    </AvatarContext.Provider>
  );
}

export const useAvatar = () => {
  return useContext(AvatarContext);
};
