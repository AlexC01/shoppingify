import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import RightPanel from "./components/RightPanel/RightPanel";
import Sidebar from "./components/Sidebar/Sidebar";
import GeneralContext from "./context/GeneralContext";
import getToken from "./helpers/HelperFunctions";
import { GlobalContextInterface, GlobalContextObj } from "./models/Context";

const App = () => {
  const [GlobalContext, setGlobalContext] =
    useState<GlobalContextInterface>(GlobalContextObj);

  const GlobalContextMemo = React.useMemo(
    () => ({ GlobalContext, setGlobalContext }),
    [GlobalContext],
  );

  useEffect(() => {
    const token = localStorage.getItem("user.token");
    if (token) {
      setGlobalContext({ token: JSON.parse(token) });
    } else {
      const generateToken = getToken();
      localStorage.setItem("user.token", JSON.stringify(generateToken));
      setGlobalContext({ token: generateToken });
    }
  }, []);

  return (
    <GeneralContext.Provider value={GlobalContextMemo}>
      <div className="flex h-screen antialiased bg-bgmain font-quicksand">
        <Sidebar />
        <div className="flex flex-1 h-screen overflow-y-scroll">
          <div className="flex-1">
            <Outlet />
          </div>
          <RightPanel />
        </div>
      </div>
    </GeneralContext.Provider>
  );
};

export default App;
