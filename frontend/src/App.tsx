import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div className="flex h-screen antialiased bg-bgmain">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default App;
