/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from "react";
import defaultAvatar from "../assets/defaultAvatar";

const initialImage = defaultAvatar[0];

export const AvatarContext = createContext({
  profileImage: [],
  updateProfileImage: () => {},
});

export default function AvatarProvider({ children }) {
  const [profileImage, setProfileImage] = useState(initialImage);

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    } else {
      setProfileImage(initialImage);
    }
  }, []);
  const updateProfileImage = (NouvelleImage) => {
    localStorage.setItem("profileImage", NouvelleImage);
    setProfileImage(NouvelleImage);
  };
  return (
    <AvatarContext.Provider value={{ profileImage, updateProfileImage }}>
      {children}
    </AvatarContext.Provider>
  );
}
