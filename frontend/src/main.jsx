import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Home from "./pages/Home";
import QuizCreation from "./pages/QuizCreation";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/quizCreation", element: <QuizCreation /> },
      { path: "/quiz", element: <Quiz /> },
      { path: "/quiz/results", element: <Results /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
