import { ProductModel } from '../db/models/Product.js';

export const getProducts = () => ProductModel.find();

export const createProduct = (productData) => ProductModel.create(productData);

// export const deleteProduct = (productId) => ProductModel.findByIdAndDelete(productId);
export const deleteProduct = (productId) =>
  ProductModel.findOneAndDelete({ _id: productId });
