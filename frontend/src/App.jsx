import React from "react";

import "./App.css";
import { Outlet } from "react-router-dom";

import Navbar3 from "./components/Navbar3";

function App() {
  return (
    <div>
      <Navbar3 />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;
