import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./pages/home/Home";
import routesNames from "./customRoutes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: routesNames.home,
    element: <App />,
    children: [{ path: routesNames.home, element: <Home /> }],
  },
]);

root.render(<RouterProvider router={router} />);
