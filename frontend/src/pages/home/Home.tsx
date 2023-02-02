import React, { useState, useEffect, useContext } from "react";
import Spinner from "../../components/Spinner/Spinner";
import FunctionsContext from "../../context/FunctionsContext";
import GeneralContext from "../../context/GeneralContext";
import { addItemCart } from "../../helpers/Cart";
import getAllItems from "../../helpers/Items";
import { AddCartItem } from "../../models/Cart";
import { FunctionsContextType, GlobalContextType } from "../../models/Context";
import { CategoriesResponse } from "../../models/Item";

const Home = () => {
  const { GlobalContext } = useContext(GeneralContext) as GlobalContextType;
  const { HelpersContext } = useContext(
    FunctionsContext,
  ) as FunctionsContextType;
  const [allItems, setAllItems] = useState<CategoriesResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchItems = async () => {
    try {
      const resp = await getAllItems();
      setAllItems(resp.filter(item => item.items.length > 0));
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };

  const addItem = async (itemId: string) => {
    const obj: AddCartItem = {
      cart: GlobalContext.cartId,
      item: itemId,
      quant: 1,
    };
    try {
      const resp = await addItemCart(obj);
      if (resp) HelpersContext.updateCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchItems();
  }, []);

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
            className="px-12 xl:px-14 py-3 shadow-md rounded-xl focus:outline-cartbg font-semibold"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.4}
            stroke="currentColor"
            className="w-6 h-6 absolute top-3 font-bold left-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
      <div className="pt-4">
        {loading && (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!loading && error && (
          <h4 className="mt-12 text-xl font-bold tracking-wider">
            There was an error please reload the page
          </h4>
        )}
        {!loading && !error && allItems.length > 0 && (
          <div>
            {allItems.map(category => (
              <div className="mt-10" key={category.id}>
                <h4 className="font-bold text-lg">{category.name}</h4>
                <div
                  className="mt-4 grid grid-cols-3 2xl:grid-cols-6 w-full gap-6"
                  key={category.id}
                >
                  {category.items.map(item => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-shadow py-3 px-4 w-full text-left flex space-x-5 items-start justify-between"
                    >
                      <p className="font-semibold text-ellipsis overflow-hidden w-3/4">
                        {item.name}
                      </p>
                      <button type="button" onClick={() => addItem(item.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.4}
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
