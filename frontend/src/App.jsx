import React from "react";
import { Outlet } from "react-router-dom";
import "./styles/App.css";

function App() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
