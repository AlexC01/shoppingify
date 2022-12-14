import express from "express";
import cors from "cors";
import connectMongo from "./db/mongoose";
import categoryRouter from "./routers/category";

void connectMongo();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(categoryRouter);

app.listen(PORT, () => console.log(`App Running on port ${PORT}`));
