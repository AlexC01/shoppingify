import React from "react";

const Home = () => {
  return (
    <>
      <div className="flex justify-between items-center space-x-7">
        <h2 className="text-xl font-semibold text-textbrown tracking-wide leading-8 xl:w-96">
          <span className="text-cartbg">Shoppingify</span> allows you take your
          shopping list wherever you go
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Item"
            className="px-10 xl:px-14 py-3 shadow-md rounded-xl focus:outline-cartbg font-semibold"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.4}
            stroke="currentColor"
            className="w-6 h-6 absolute top-3 font-bold left-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Home;
