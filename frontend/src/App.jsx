import Footer from "./components/Footer";
import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

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
