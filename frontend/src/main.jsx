/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import ThemeChangeProvider from "./Context/ThemeContext";
import AvatarProvider from "./Context/AvatarContext";
import GitPage from "./components/GitPage";
import Linkedin from "./components/Linkedin";
import QuizCreation from "./pages/QuizCreation";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/quizCreation", element: <QuizCreation /> },
      { path: "/quiz", element: <Quiz /> },
      { path: "/quiz/results", element: <Results /> },
      { path: "/git", element: <GitPage /> },
      { path: "/linkedin", element: <Linkedin /> },
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
