import { ProductModel } from '../db/models/Product.js';

export const getProducts = () => ProductModel.find();

// export const getProductById = (productId) => ProductModel.findById(productId);
export const getProductById = (productId) =>
  ProductModel.findOne({ _id: productId });

export const createProduct = (productData) => ProductModel.create(productData);

// export const deleteProduct = (productId) => ProductModel.findByIdAndDelete(productId);
export const deleteProduct = (productId) =>
  ProductModel.findOneAndDelete({ _id: productId });

// export const updateProduct = (productId, productData) =>
//   ProductModel.findByIdAndUpdate(productId, productData, { new: true });

export const updateProduct = (productId, productData) =>
  ProductModel.findOneAndUpdate({ _id: productId }, productData, { new: true });
