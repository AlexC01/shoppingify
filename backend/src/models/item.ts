import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    note: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" }
  },
  { timestamps: true }
);

itemSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const item = this;
  const itemObject = item.toObject();

  delete itemObject.__v;
  delete itemObject.updatedAt;
  delete itemObject.createdAt;
  delete itemObject.category.createdAt;
  delete itemObject.category.updatedAt;
  delete itemObject.category.__v;

  return itemObject;
};

const Items = mongoose.model("Item", itemSchema);

export default Items;
