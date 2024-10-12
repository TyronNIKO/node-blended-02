import {
  getProductsController,
  createProductController,
  deleteProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';

const router = Router();

router.get('/products', ctrlWrapper(getProductsController));
router.post('/products', ctrlWrapper(createProductController));
router.delete('/products/:productId', ctrlWrapper(deleteProductController));

export default router;
