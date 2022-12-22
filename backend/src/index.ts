import express from "express";
import cors from "cors";
import connectMongo from "./db/mongoose";
import categoryRouter from "./routers/category";
import itemRouter from "./routers/item";
import cartRouter from "./routers/cart";

void connectMongo();

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(express.json());
app.use(cors());
app.use([categoryRouter, itemRouter, cartRouter]);

app.listen(PORT, () => console.log(`App Running on port ${PORT}`));
