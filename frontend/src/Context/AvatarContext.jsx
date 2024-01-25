/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import defaultAvatar from "../assets/defaultAvatar";

const initialImage = defaultAvatar[0];

export const AvatarContext = createContext({
  profileImage: null,
  updateProfileImage: () => {},
});

export default function AvatarProvider({ children }) {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || initialImage
  );

  useEffect(() => {}, [profileImage]);

  const updateProfileImage = (NouvelleImage) => {
    localStorage.setItem("profileImage", NouvelleImage);
    setProfileImage(NouvelleImage);
  };
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AvatarContext.Provider value={{ profileImage, updateProfileImage }}>
      {children}
    </AvatarContext.Provider>
  );
}

export const useAvatar = () => {
  return useContext(AvatarContext);
};
