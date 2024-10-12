import createHttpError from 'http-errors';
import {
  createProduct,
  deleteProduct,
  getProducts,
} from '../services/products.js';

export const getProductsController = async (req, res) => {
  const products = await getProducts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const createProductController = async (req, res) => {
  const newProduct = await createProduct(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: newProduct,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const result = await deleteProduct(productId);
  if (!result) {
    throw createHttpError(404, 'Product not found');
  }
    res.sendStatus(204);
};
