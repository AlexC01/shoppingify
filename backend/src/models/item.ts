import mongoose from "mongoose";
import CartItems from "./cartItems";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    note: { type: String, required: false, trim: true },
    image: { type: Buffer, required: false },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" }
  },
  { timestamps: true }
);

itemSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const item = this;
  const itemObject = item.toObject();
  itemObject.id = this.id;

  delete itemObject.__v;
  delete itemObject.updatedAt;
  delete itemObject.createdAt;
  delete itemObject.category.createdAt;
  delete itemObject.category.updatedAt;
  delete itemObject.category.__v;

  return itemObject;
};

itemSchema.pre("remove", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const item = this;
  await CartItems.deleteMany({ item: { _id: item._id } });
  next();
});

const Items = mongoose.model("Item", itemSchema);

export default Items;
