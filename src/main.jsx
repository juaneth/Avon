import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import FilePicker from "./pages/FilePicker";
import Home from "./pages/Home";
import Project from "./pages/Project";

const router = createHashRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/project",
        element: <Project />,
      },
    ],
  },
  {
    path: "/filepicker",
    element: <FilePicker />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
