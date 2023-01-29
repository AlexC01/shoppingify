import { CreateCartObj } from "../models/Cart";
import clientAPI from "../services/APIClient";

export const getCart = async (
  token: string,
  status?: "active" | "canceled",
) => {
  const cartResponse = await clientAPI.client.get(
    `/cart/${token}${status ? `?status=${status}` : ""}`,
  );
  return cartResponse.data;
};

export const createCart = async (token: string, obj: CreateCartObj) => {
  const cartResponse = await clientAPI.client.post(`/cart/${token}/`, obj);
  return cartResponse.data;
};
