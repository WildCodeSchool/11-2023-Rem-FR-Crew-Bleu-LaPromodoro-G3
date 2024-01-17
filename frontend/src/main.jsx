/* eslint-disable import/no-named-as-default */
import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import ThemeChangeProvider from "./Context/ThemeContext";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/quiz", element: <Quiz /> },
      { path: "/quiz/results", element: <Results /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeChangeProvider>
      <RouterProvider router={router} />
    </ThemeChangeProvider>
  </React.StrictMode>
);
