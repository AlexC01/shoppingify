/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from "react";
import bottle from "../../assets/source.svg";
import shop from "../../assets/shop.svg";
import GeneralContext from "../../context/GeneralContext";
import {
  createCart,
  deleteItemCart,
  getCart,
  updateQuantItemCart,
} from "../../helpers/Cart";
import { CartItemsArr, CartResponse, CreateCartObj } from "../../models/Cart";
import { FunctionsContextType, GlobalContextType } from "../../models/Context";
import Spinner from "../Spinner/Spinner";
import FunctionsContext from "../../context/FunctionsContext";

interface Props {
  token: string;
}

const RightPanel = ({ token }: Props) => {
  const [optionDrawer, setOptionDrawer] = useState(0);
  const { GlobalContext, setGlobalContext } = useContext(
    GeneralContext,
  ) as GlobalContextType;
  const { HelpersContext, setHelpersContext } = useContext(
    FunctionsContext,
  ) as FunctionsContextType;
  const [loading, setLoading] = useState(false);
  const [currentCartId, setCurrentCartId] = useState("");
  const [cart, setCart] = useState<CartResponse>();
  const [cartItems, setCartItems] = useState<CartItemsArr[]>([]);

  const postCart = async () => {
    const obj: CreateCartObj = {
      status: "active",
      token,
      name: "Shopping List",
    };
    try {
      const resp = await createCart(token, obj);
      setCurrentCartId(resp.id);
    } catch (err) {
      console.log(err);
    }
  };

  const getCartForUser = async () => {
    try {
      const resp = await getCart(token, "active");
      if (resp.length === 0) {
        postCart();
        return;
      }
      const totalItems =
        resp[0].cart_items.length === 0
          ? 0
          : resp[0].cart_items
              .map(item => item.items.length)
              .reduce((acc, curr) => acc + curr, 0);
      setCart(resp[0]);
      setCartItems(resp[0].cart_items);
      setGlobalContext({
        ...GlobalContext,
        items: totalItems,
        cartId: resp[0].id,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCartItem = async (id: string) => {
    try {
      await deleteItemCart(id);
      getCartForUser();
    } catch (err) {
      console.log(err);
    }
  };

  const updateCartItem = async (id: string, quant: number) => {
    if (quant === 0) deleteCartItem(id);
    try {
      await updateQuantItemCart({ quant }, id);
      getCartForUser();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentCartId !== "") getCartForUser();
  }, [currentCartId]);

  useEffect(() => {
    if (token !== "") getCartForUser();
  }, [token]);

  useEffect(() => {
    setLoading(true);
    setHelpersContext({ ...HelpersContext, updateCartItems: getCartForUser });
  }, []);

  return (
    <section className=" inset-y-0  right-0 z-10 flex-shrink-0 w-96 relative">
      <div className="bg-creambg h-full w-full pt-10">
        <div className="px-10 flex flex-col h-full">
          <div
            className={
              loading ? "flex-2" : cartItems.length === 0 ? "flex-1" : ""
            }
          >
            <div className="bg-redwine mx-auto h-32 gap-10 rounded-2xl px-5 relative grid grid-cols-3">
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
          {loading && (
            <div className="flex items-center justify-center flex-1">
              <Spinner />
            </div>
          )}
          {!loading && cart && cartItems.length > 0 && (
            <div className="mt-12">
              <div className="flex justify-between items-center">
                <h3 className="text-textbrown text-2xl font-semibold">
                  {cart.name}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.4}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500 hover:text-textbrown cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </div>
              <div className="mt-10">
                {cartItems.map(category => (
                  <div key={category.id} className="mt-10">
                    <h5 className="text-md tracking-wide text-greycolor font-semibold">
                      {category.category_name}
                    </h5>
                    {category.items.map(item => (
                      <div
                        key={item.cart_item_id}
                        className="mt-5 flex justify-between items-start space-x-1"
                      >
                        <div className="flex-1">
                          <h5 className="text-black text-lg font-medium">
                            {item.name}
                          </h5>
                        </div>
                        <div className="text-center flex-2">
                          <div className="bg-white w-full pr-2 rounded-xl flex justify-between items-center">
                            <div
                              className="bg-cartbg p-2 mr-2 rounded-xl cursor-pointer"
                              onClick={() => deleteCartItem(item.cart_item_id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.4}
                                stroke="currentColor"
                                className="w-5 h-5 text-white icon-hover"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  onClick={() =>
                                    updateCartItem(
                                      item.cart_item_id,
                                      item.quant - 1,
                                    )
                                  }
                                  className="w-5 h-5 text-cartbg cursor-pointer icon-hover"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 12h-15"
                                  />
                                </svg>
                              </div>
                              <div className="text-cartbg font-semibold border-2 border-cartbg px-3 rounded-3xl">
                                <span>{item.quant} pcs</span>
                              </div>
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  onClick={() =>
                                    updateCartItem(
                                      item.cart_item_id,
                                      item.quant + 1,
                                    )
                                  }
                                  stroke="currentColor"
                                  className="w-5 h-5 text-cartbg cursor-pointer icon-hover"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          {!loading && cartItems.length === 0 && (
            <>
              <div className="flex items-center justify-center flex-1">
                <h3 className="text-textbrown font-bold tracking-wider text-lg">
                  No Items
                </h3>
              </div>
              <div className="flex items-center justify-center flex-1">
                <img src={shop} alt="Botella" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default RightPanel;
