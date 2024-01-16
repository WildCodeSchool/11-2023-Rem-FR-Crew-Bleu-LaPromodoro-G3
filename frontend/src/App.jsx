import "./App.css";
import { Outlet } from "react-router-dom";
import ThemeChangeProvider from "./Context/ThemeContext";

function App() {
  // const selectedTheme = localStorage.getItem("selectedTheme");
  // const backgroundImageUrl = `url(${selectedTheme})`;
  //
  return (
    <ThemeChangeProvider>
      <div
      // style={{ backgroundImage: `url(${selectedTheme})` }}
      // style={{ backgroundImage: backgroundImageUrl, backgroundSize: "cover" }}
      >
        <main>
          <Outlet />
        </main>
      </div>
    </ThemeChangeProvider>
  );
}
export default App;
