/* eslint-disable import/no-named-as-default */
import { createContext, useState, useContext } from "react";
import themes from "../images/theme";

const ThemeChangeContext = createContext();

// eslint-disable-next-line react/prop-types
export default function ThemeChangeProvider({ children }) {
  const [theme, setTheme] = useState(themes[0]);
  // const contextValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };
  return (
    <ThemeChangeContext.Provider value={(theme, changeTheme)}>
      {children}
    </ThemeChangeContext.Provider>
  );
}
export const useTheme = () => {
  return useContext(ThemeChangeContext);
};
