import React from "react";
import { Outlet } from "react-router-dom";
import backgroundMusicFile from "./assets/8-bit-arcade-138828.mp3";
import BackgroundMusic from "./components/BackgroundMusic";
import "./styles/App.css";

function App() {
  return (
    <div>
      <BackgroundMusic musicUrl={backgroundMusicFile} volume={0.5} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
