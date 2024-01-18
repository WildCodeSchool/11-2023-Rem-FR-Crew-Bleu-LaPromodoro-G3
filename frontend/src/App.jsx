import { Outlet } from "react-router-dom";
import { useTheme } from "./Context/ThemeContext";
import "./styles/App.css";

function App() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundImage: `url(${theme})`,
        backgroundSize: "100% 100%",
        height: "100vh",
      }}
    >
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;
