import express, { RequestHandler } from "express";
import Items from "../models/item";

const router = express.Router();

router.get("/item", (async (_req, res) => {
  try {
    const items = await Items.find().populate("category");
    res.send(items);
  } catch (err) {
    res.status(500).send();
  }
}) as RequestHandler);

router.post("/item", (async (req, res) => {
  try {
    const item = new Items({ ...req.body });
    await item.save();
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send(err);
  }
}) as RequestHandler);

export default router;
