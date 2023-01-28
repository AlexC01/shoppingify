import mongoose from "mongoose";

interface CategInt {
  _id: string;
  name: string;
  description: string;
  __v: number;
}

interface ItemInt {
  _id: string;
  name: string;
  note: string | null;
  category: CategInt;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ItemIntTest {
  _id: string;
  name: string;
  note: string | null;
  quant: number;
  cart_item_id: string;
}

interface CatNewInt {
  _id: string;
  category_name: string;
  items: ItemIntTest[];
}

interface ItemBaseInt {
  _id: string;
  cart: string;
  item: ItemInt;
  quant: number;
  __v: 0;
}

const cartSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    status: { type: String, required: true },
    token: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

cartSchema.virtual("cart_items", { ref: "CartItem", localField: "_id", foreignField: "cart" });

cartSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const cart = this;
  const cartObject = cart.toObject();
  if (cartObject.cart_items !== undefined && cartObject.cart_items.length > 0) {
    const newItemsArr = cartObject.cart_items.reduce((acc: CatNewInt[], el: ItemBaseInt) => {
      const idCat = acc.map(e => e._id).indexOf(el.item.category._id);
      if (idCat !== -1) {
        const copyArr = acc[idCat];
        const newObj = {
          _id: el.item._id,
          name: el.item.name,
          note: el.item.note,
          quant: el.quant,
          cart_item_id: el._id
        };
        copyArr.items.push(newObj);
        acc.splice(idCat, 1, copyArr);
      } else {
        const newObj: CatNewInt = {
          _id: el.item.category._id,
          category_name: el.item.category.name,
          items: [
            {
              _id: el.item._id,
              name: el.item.name,
              note: el.item.note,
              quant: el.quant,
              cart_item_id: el._id
            }
          ]
        };
        acc.push(newObj);
      }
      return acc;
    }, []);
    cartObject.cart_items = newItemsArr.sort((a: { category_name: number }, b: { category_name: number }) =>
      a.category_name < b.category_name ? -1 : 1
    );
  }

  return cartObject;
};

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
