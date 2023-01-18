import React from "react";
import { Outlet } from "react-router-dom";
import RightPanel from "./components/RightPanel/RightPanel";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div className="flex h-screen antialiased bg-bgmain font-quicksand">
      <Sidebar />
      <div className="flex flex-1 h-screen overflow-y-scroll">
        <div className="flex-1">
          <Outlet />
        </div>
        <RightPanel />
      </div>
    </div>
  );
};

export default App;
