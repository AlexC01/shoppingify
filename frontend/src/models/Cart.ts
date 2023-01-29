export interface CartResponse {
  id: string;
  name: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  cart_items: [];
}

export type CartStatus = "active" | "canceled";

export interface CreateCartObj {
  name: string;
  status: CartStatus;
  token: string;
}
