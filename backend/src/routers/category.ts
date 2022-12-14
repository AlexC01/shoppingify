import express, { RequestHandler } from "express";
import Categories from "../models/category";

const router = express.Router();

router.get("/category", (async (_req, res) => {
  try {
    const cat = await Categories.find();
    res.send(cat);
  } catch (err) {
    res.status(500).send();
  }
}) as RequestHandler);

router.post("/category", (async (req, res) => {
  try {
    const category = new Categories({ ...req.body });
    await category.save();
    res.status(201).send(category);
  } catch (err) {
    res.status(400).send(err);
  }
}) as RequestHandler);

export default router;
