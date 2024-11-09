import { Router } from 'express';
import { registerUserSchema } from '../validation/user.js';
import { validateBody } from '../utils/validateBody.js';
import {
  //   loginUserController,
  //   logoutUserController,
  //   refreshSessionController,
  registerUserController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/signup',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
// router.post(
//   '/login',
//   validateBody(loginUserSchema),
//   ctrlWrapper(loginUserController),
// );
// router.post('/logout', ctrlWrapper(logoutUserController));
// router.post('/refresh', ctrlWrapper(refreshSessionController));
export default router;
