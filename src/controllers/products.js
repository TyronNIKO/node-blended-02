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
  const products = await getProducts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const product = await getProductById(productId);
  res.status(200).json({
    status: 200,
    message: `Successfully found product ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    throw createHttpError(400, error.message);
  }
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

export const updateProductController = async (req, res) => {
  const { productId } = req.params;
  const { error } = updateProductSchema.validate(req.body);
  if (error) {
    throw createHttpError(400, error.message);
  }
  const result = await updateProduct(productId, req.body);
  if (!result) throw createHttpError(404, 'Product not found');
  res.status(200).json({
    status: 200,
    message: `Successfully patched product ${productId}!`,
    data: result,
  });
};
