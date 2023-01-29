import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import RightPanel from "./components/RightPanel/RightPanel";
import Sidebar from "./components/Sidebar/Sidebar";
import FunctionsContext from "./context/FunctionsContext";
import GeneralContext from "./context/GeneralContext";
import getToken from "./helpers/HelperFunctions";
import {
  FunctionsContextInterface,
  GlobalContextInterface,
  GlobalContextObj,
  HelpersContextObj,
} from "./models/Context";

const App = () => {
  const [tokenUser, setTokenUser] = useState("");
  const [GlobalContext, setGlobalContext] =
    useState<GlobalContextInterface>(GlobalContextObj);

  const [HelpersContext, setHelpersContext] =
    useState<FunctionsContextInterface>(HelpersContextObj);

  const GlobalContextMemo = React.useMemo(
    () => ({ GlobalContext, setGlobalContext }),
    [GlobalContext],
  );

  const HelpersContextMemo = React.useMemo(
    () => ({ HelpersContext, setHelpersContext }),
    [HelpersContext],
  );

  useEffect(() => {
    const token = localStorage.getItem("user.token");
    if (token) {
      setGlobalContext({ ...GlobalContext, token: JSON.parse(token) });
      setTokenUser(JSON.parse(token));
    } else {
      const generateToken = getToken();
      setTokenUser(generateToken);
      localStorage.setItem("user.token", JSON.stringify(generateToken));
      setGlobalContext({ ...GlobalContext, token: generateToken });
    }
  }, []);

  return (
    <GeneralContext.Provider value={GlobalContextMemo}>
      <FunctionsContext.Provider value={HelpersContextMemo}>
        <div className="flex h-screen antialiased bg-bgmain font-quicksand">
          <Sidebar />
          <div className="flex flex-1 h-screen overflow-y-scroll">
            <div className="flex-1">
              <Outlet />
            </div>
            <RightPanel token={tokenUser} />
          </div>
        </div>
      </FunctionsContext.Provider>
    </GeneralContext.Provider>
  );
};

export default App;
