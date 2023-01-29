import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import GeneralContext from "../../context/GeneralContext";
import routesNames from "../../customRoutes";
import { GlobalContextType } from "../../models/Context";
import Tooltip from "../Tooltip/Tooltip";

const Sidebar = () => {
  const { GlobalContext } = useContext(GeneralContext) as GlobalContextType;
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 z-10 flex flex-shrink-0 bg-white w-24 md:static focus:outline-none">
      <nav className="flex flex-col flex-shrink-0 h-full py-10 w-full">
        <div className="flex-shrink-0 mx-auto">
          <img src={logo} alt="Logo" className="icon-hover" />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 space-y-14">
          <div className="relative w-full flex justify-center items-center py-2">
            <Tooltip text="Items">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="w-8 h-8 icon-hover text-greybg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </Link>
            </Tooltip>
            {location.pathname === routesNames.home && (
              <div className="bg-cartbg absolute left-0 w-2 h-full rounded-tr-md rounded-br-md" />
            )}
          </div>
          <div className="relative w-full flex justify-center items-center py-2">
            <Tooltip text="history">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="w-8 h-8 icon-hover text-greybg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </Link>
            </Tooltip>
            {location.pathname === routesNames.history && (
              <div className="bg-cartbg absolute left-0 w-2 h-full rounded-tr-md rounded-br-md" />
            )}
          </div>
          <div className="relative w-full flex justify-center items-center py-2">
            <Tooltip text="Statistics">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  data-tooltip-target="tooltip-default"
                  className="w-8 h-8 icon-hover text-greybg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                  />
                </svg>
              </Link>
            </Tooltip>
            {location.pathname === routesNames.statistics && (
              <div className="bg-cartbg absolute left-0 w-2 h-full rounded-tr-md rounded-br-md" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center relative">
          <div className="bg-cartbg p-3 rounded-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
          <div className="absolute bottom-9 right-5 bg-redbox px-2 rounded-md">
            {GlobalContext.items > 0 && (
              <span className="text-sm font-semibold text-white">
                {GlobalContext.items}
              </span>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
