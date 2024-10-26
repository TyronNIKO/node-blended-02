import { Router } from 'express';
import { registerUserSchema, loginUserSchema } from '../validation/user.js';
import { validateBody } from '../utils/validateBody.js';
import {
  loginUserController,
  registerUserController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

export default router;
