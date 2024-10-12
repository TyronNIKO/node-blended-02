import {
  getProductsController,
  createProductController,
  deleteProductController,
  updateProductController,
  getProductByIdController,
} from '../controllers/products.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';

const router = Router();

router.get('/products', ctrlWrapper(getProductsController));
router.get(
  '/products/:productId',
  isValidId,
  ctrlWrapper(getProductByIdController),
);
router.post('/products', ctrlWrapper(createProductController));
router.delete(
  '/products/:productId',
  isValidId,
  ctrlWrapper(deleteProductController),
);
router.patch(
  '/products/:productId',
  isValidId,
  ctrlWrapper(updateProductController),
);

export default router;
