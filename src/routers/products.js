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

router.get('/', ctrlWrapper(getProductsController));
router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));
router.post('/', ctrlWrapper(createProductController));
router.delete('/:productId', isValidId, ctrlWrapper(deleteProductController));
router.patch('/:productId', isValidId, ctrlWrapper(updateProductController));

export default router;
