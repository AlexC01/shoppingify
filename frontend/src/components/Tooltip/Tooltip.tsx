import React from "react";

interface Props {
  text: string;
  children: React.ReactElement;
}

const Tooltip = ({ text, children }: Props) => {
  return (
    <span className=" group relative">
      <span className="capitalize pointer-events-none absolute -top-1 left-12 font-semibold whitespace-nowrap rounded bg-greybg px-2 py-1 text-white opacity-0 transition before:absolute before:-left-1 before:top-4 before:-translate-y-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-r-greybg before:content-[''] group-hover:opacity-100">
        {text}
      </span>
      {children}
    </span>
  );
};

export default Tooltip;
