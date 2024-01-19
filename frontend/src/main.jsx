/* eslint-disable import/no-named-as-default */
import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

import ThemeChangeProvider from "./Context/ThemeContext";
import AvatarProvider from "./Context/AvatarContext";

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
      <AvatarProvider>
        <RouterProvider router={router} />
      </AvatarProvider>
    </ThemeChangeProvider>
  </React.StrictMode>
);
