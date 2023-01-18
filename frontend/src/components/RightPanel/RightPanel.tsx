import React from "react";
import bottle from "../../assets/source.svg";

const RightPanel = () => {
  return (
    <section className="fixed inset-y-0  right-0 z-10 flex-shrink-0 w-96">
      <div className="bg-creambg h-full w-full pt-10">
        <div className="px-10">
          <div className="bg-redwine mx-auto h-32 gap-5 rounded-2xl px-5 relative grid grid-cols-3">
            <div className="-mt-5 w-20">
              <img src={bottle} alt="Botella" />
            </div>
            <div className="col-span-2 my-auto">
              <p className="text-sm font-semibold mb-3 text-white">
                Didn&apos;t find what you need?
              </p>
              <button
                type="button"
                className="bg-white px-4 py-2 text-sm rounded-lg font-semibold"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightPanel;
