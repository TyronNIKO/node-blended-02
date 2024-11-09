import { Router } from 'express';
import { registerUserSchema, loginUserSchema } from '../validation/user.js';
import { validateBody } from '../utils/validateBody.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { checkToken } from '../middlewares/checkToken.js';

const router = Router();

router.post(
  '/signup',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/logout', checkToken, ctrlWrapper(logoutUserController));
router.get('/current', checkToken, ctrlWrapper(refreshUserController));
export default router;
