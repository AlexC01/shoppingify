import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false }
  },
  { toJSON: { virtuals: true } }
);

categorySchema.virtual("items", { ref: "Item", localField: "_id", foreignField: "category" });

// categorySchema.methods.toJSON = function () {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const category = this;
//   const categoryObject = category.toObject();

//   delete categoryObject.__v;
//   delete categoryObject.updatedAt;
//   delete categoryObject.createdAt;

//   return categoryObject;
// };

const Categories = mongoose.model("Category", categorySchema);

export default Categories;
