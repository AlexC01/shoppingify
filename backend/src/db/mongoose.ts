import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/shoppingify-api");
  } catch (err) {
    console.error(err);
  }
};

export default connectMongo;
