import {
  AddCartItem,
  CartResponse,
  CreateCartObj,
  CreateCartResponse,
} from "../models/Cart";
import clientAPI from "../services/APIClient";

export const getCart = async (
  token: string,
  status?: "active" | "canceled",
) => {
  const cartResponse = await clientAPI.client.get<CartResponse[]>(
    `/cart/${token}${status ? `?status=${status}` : ""}`,
  );
  return cartResponse.data;
};

export const createCart = async (token: string, obj: CreateCartObj) => {
  const cartResponse = await clientAPI.client.post<CreateCartResponse>(
    `/cart/`,
    obj,
  );
  return cartResponse.data;
};

export const addItemCart = async (obj: AddCartItem) => {
  const cartItemResponse = await clientAPI.client.post("/cart-item/", obj);
  return cartItemResponse.data;
};
