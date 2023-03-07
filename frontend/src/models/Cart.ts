export interface CartResponse {
  id: string;
  name: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  cart_items: CartItemsArr[];
}

export type CartStatus = "active" | "canceled";

export interface CreateCartObj {
  name: string;
  status: CartStatus;
  token: string;
}

export interface CartItemsArr {
  _id: string;
  category_name: string;
  id: string;
  items: SingleCartItem[];
}

export interface SingleCartItem {
  _id: string;
  name: string;
  note: string;
  quant: number;
  cart_item_id: string;
}

export interface CreateCartResponse {
  name: string;
  status: string;
  token: string;
  id: string;
  createdAt: Date;
  updateAt: Date;
}

export interface AddCartItem {
  cart: string;
  item: string;
  quant: number;
}

export interface UpdateCartItem {
  quant: number;
}
