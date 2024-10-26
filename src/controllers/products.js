import createHttpError from 'http-errors';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../services/products.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/products.js';

export const getProductsController = async (req, res) => {
  const { _id: userId } = req.user;
  const products = await getProducts(userId);
  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.params;
  const product = await getProductById(productId, userId);
  if (!product) {
    throw createHttpError(404, 'product not find');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found product ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const { _id: userId } = req.user;
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    throw createHttpError(400, error.message);
  }
  const newProduct = await createProduct(req.body, userId);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: newProduct,
  });
};

export const deleteProductController = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.params;
  const result = await deleteProduct(productId, userId);
  if (!result) {
    throw createHttpError(404, 'Product not found');
  }
  res.sendStatus(204);
};

export const updateProductController = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.params;
  const { error } = updateProductSchema.validate(req.body);
  if (error) {
    throw createHttpError(400, error.message);
  }
  const result = await updateProduct(productId, req.body, userId);
  if (!result) throw createHttpError(404, 'Product not found');
  res.status(200).json({
    status: 200,
    message: `Successfully patched product ${productId}!`,
    data: result,
  });
};
