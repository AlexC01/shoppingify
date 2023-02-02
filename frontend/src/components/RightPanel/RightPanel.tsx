/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from "react";
import bottle from "../../assets/source.svg";
import shop from "../../assets/shop.svg";
import GeneralContext from "../../context/GeneralContext";
import { createCart, getCart } from "../../helpers/Cart";
import { CartItemsArr, CartResponse, CreateCartObj } from "../../models/Cart";
import { GlobalContextType } from "../../models/Context";
import Spinner from "../Spinner/Spinner";

interface Props {
  token: string;
}

const RightPanel = ({ token }: Props) => {
  const { GlobalContext, setGlobalContext } = useContext(
    GeneralContext,
  ) as GlobalContextType;
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
    if (cartItems.length === 0) setLoading(true);
    try {
      const resp = await getCart(token, "active");
      if (resp.length === 0) {
        postCart();
        return;
      }
      setCart(resp[0]);
      setCartItems(resp[0].cart_items);
      setGlobalContext({
        ...GlobalContext,
        items: resp[0].cart_items.length,
        cartId: resp[0].id,
      });
      setLoading(false);
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

  return (
    <section className=" inset-y-0  right-0 z-10 flex-shrink-0 w-96">
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
                  <div key={category.id}>
                    <h5 className="text-md tracking-wide text-greycolor font-semibold">
                      {category.category_name}
                    </h5>
                    {category.items.map(item => (
                      <div
                        key={item.cart_item_id}
                        className="mt-5 flex justify-between items-center"
                      >
                        <h5 className="text-black text-lg font-medium">
                          {item.name}
                        </h5>
                        <div>
                          <div className="text-cartbg font-semibold border-2 border-cartbg px-3 rounded-3xl">
                            <span>{item.quant} pcs</span>
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
