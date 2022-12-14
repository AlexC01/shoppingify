/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express, { RequestHandler } from "express";
import Items from "../models/item";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  limits: { fileSize: 100000 },
  storage
});

router.get("/item", (async (req, res) => {
  try {
    if (req.query.search) {
      const items = await Items.find({ name: { $regex: req.query.search, $options: "i" } }).populate("category");
      return res.send(items);
    }
    const items = await Items.find().populate("category");
    return res.send(items);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

router.get("/item/:id", (async (req, res) => {
  try {
    const item = await Items.findById(req.params.id).populate("category");
    if (!item) throw new Error();
    res.send(item);
  } catch (err) {
    res.status(404).send();
  }
}) as RequestHandler);

router.post("/item", upload.single("image"), (async (req, res) => {
  try {
    const item = { ...req.body };
    if (req.file) {
      item.image = req.file.buffer;
    }
    const newItem = new Items(item);
    await newItem.save();
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send(err);
  }
}) as RequestHandler);

router.delete("/item/:id", (async (req, res) => {
  try {
    const item = await Items.findOneAndDelete({ _id: req.params.id });
    if (item == null) return res.status(404).send();
    return res.send(item);
  } catch (err) {
    return res.status(500).send();
  }
}) as RequestHandler);

export default router;
