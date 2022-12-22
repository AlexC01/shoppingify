import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  cart: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Cart" },
  item: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Item" },
  quant: { type: Number, required: true, default: 1 }
});

const CartItems = mongoose.model("CartItem", cartItemSchema);

export default CartItems;
