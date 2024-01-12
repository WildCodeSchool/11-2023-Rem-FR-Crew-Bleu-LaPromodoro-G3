import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import backgroundMusicFile from "./assets/8-bit-arcade-138828.mp3";
import BackgroundMusic from "./components/BackgroundMusic";

function App() {
  return (
    <div>
      <BackgroundMusic musicUrl={backgroundMusicFile} volume={0.009} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
