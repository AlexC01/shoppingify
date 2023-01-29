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
      setGlobalContext({ ...GlobalContext, items: resp[0].cart_items.length });
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
    <section className="fixed inset-y-0  right-0 z-10 flex-shrink-0 w-96">
      <div className="bg-creambg h-full w-full pt-10">
        <div className="px-10 flex flex-col h-full">
          <div className="flex-1">
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
