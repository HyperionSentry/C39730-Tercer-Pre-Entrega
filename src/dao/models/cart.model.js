import mongoose from 'mongoose';
//import mongoosePaginate from 'mongoose-paginate-v2';

const cartCollection = 'carts';
const cartSchema= new mongoose.Schema({
    products: {
        type: [
          {
            product:
            {
              type: mongoose.Types.ObjectId,
              ref: "products"
            },
            quantity: Number
          }
        ],
        default: []
      }
  }
)
const cartModel = mongoose.model(cartCollection , cartSchema);

export default cartModel;