/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/no-named-as-default */
import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "../assets/images/theme";

const ThemeChangeContext = createContext();

// eslint-disable-next-line react/prop-types
export default function ThemeChangeProvider({ children }) {
  const [theme, setTheme] = useState("");
  const [previousTheme, setPreviousTheme] = useState(themes[0]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("SelectedTheme");
    if (savedTheme) {
      setTheme(savedTheme);
      setPreviousTheme(savedTheme);
    } else {
      localStorage.setItem("SelectedTheme", themes[0]);
    }
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("SelectedTheme", newTheme);
  };

  const restorePreviousTheme = () => {
    setTheme(previousTheme);
  };

  return (
    <ThemeChangeContext.Provider
      value={{ theme, changeTheme, restorePreviousTheme }}
    >
      {children}
    </ThemeChangeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeChangeContext);
};
