import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import GitPage from "./components/GitPage";
import Linkedin from "./components/Linkedin";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/git",
        element: <GitPage />,
      },
      {
        path: "/linkedin",
        element: <Linkedin />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
