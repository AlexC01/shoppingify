import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false }
  },
  { timestamps: true }
);

const Categories = mongoose.model("Category", categorySchema);

export default Categories;
