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

router.get("/item", (async (_req, res) => {
  try {
    const items = await Items.find().populate("category");
    res.send(items);
  } catch (err) {
    res.status(500).send();
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

export default router;
