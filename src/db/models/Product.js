import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['books', 'electronics', 'clothing', 'other'],
      required: true,
      default: 'other',
    },
    description: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductModel = model('product', productSchema);
