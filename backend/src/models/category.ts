import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false }
  },
  { toJSON: { virtuals: true } }
);

categorySchema.virtual("items", { ref: "Item", localField: "_id", foreignField: "category" });

const Categories = mongoose.model("Category", categorySchema);

export default Categories;
