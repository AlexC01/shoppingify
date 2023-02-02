/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express, { RequestHandler } from "express";
import Cart from "../models/cart";
import CartItems from "../models/cartItems";

const router = express.Router();

router.get("/cart", (async (_req, res) => {
  try {
    const cart = await Cart.find().populate({ path: "cart_items", populate: { path: "item" } });
    res.send(cart);
  } catch (err) {
    res.status(500).send();
  }
}) as RequestHandler);

router.get("/cart/:token", (async (req, res) => {
  const findQuery: { token: string; status?: any } = { token: req.params.token };
  try {
    if (req.query.status) {
      findQuery.status = req.query.status;
    }
    const cart = await Cart.find(findQuery).populate({
      path: "cart_items",
      populate: { path: "item", populate: { path: "category" } }
    });
    res.send(cart);
  } catch (err) {
    res.status(404).send();
  }
}) as RequestHandler);

router.post("/cart", (async (req, res) => {
  try {
    const cart = new Cart({ ...req.body });
    await cart.save();
    res.status(201).send(cart);
  } catch (err) {
    res.status(400).send(err);
  }
}) as RequestHandler);

router.patch("/cart/:id", (async (req, res) => {
  try {
    const cartObj = await Cart.findById(req.params.id).populate({
      path: "cart_items",
      populate: { path: "item", populate: { path: "category" } }
    });
    if (cartObj == null) return res.status(404).send();

    if (req.body.name) cartObj.name = req.body.name;
    if (req.body.status) cartObj.status = req.body.status;

    await cartObj.save();
    return res.status(202).send(cartObj);
  } catch (err) {
    return res.status(404).send();
  }
}) as RequestHandler);

router.get("/cart-item", (async (_req, res) => {
  try {
    const cartItem = await CartItems.find().populate("item");
    res.send(cartItem);
  } catch (err) {
    res.status(500).send(err);
  }
}) as RequestHandler);

router.post("/cart-item", (async (req, res) => {
  try {
    const check = await CartItems.findOne({ item: req.body.item, cart: req.body.cart });
    if (check) {
      const cant = check.quant as number;
      check.quant = cant + 1;
      await check.save();
      return res.send(check);
    }
    const cartItem = new CartItems({ ...req.body });
    await cartItem.save();
    return res.status(201).send(cartItem);
  } catch (err) {
    return res.status(400).send(err);
  }
}) as RequestHandler);

router.patch("/cart-item/:id", (async (req, res) => {
  try {
    const cartItem = await CartItems.findOne({ _id: req.params.id });
    if (cartItem == null) return res.status(404).send();
    cartItem.quant = req.body.quant;
    await cartItem.save();
    return res.send(cartItem);
  } catch (err) {
    return res.status(404).send();
  }
}) as RequestHandler);

router.delete("/cart-item/:id", (async (req, res) => {
  try {
    const cartItem = await CartItems.findOneAndDelete({ _id: req.params.id });
    if (cartItem == null) return res.status(404).send();
    return res.send(cartItem);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

router.delete("/cart", (async (_req, res) => {
  try {
    await CartItems.deleteMany();
    await Cart.deleteMany();
    return res.send({});
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

export default router;
