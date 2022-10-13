import mongoose from "mongoose";

void mongoose.connect(process.env.MONGODB_URL ?? "mongodb://127.0.0.1:27017/shoppingify-api");
