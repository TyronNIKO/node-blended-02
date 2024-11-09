import createHttpError from 'http-errors';
import { findUserById } from '../services/users.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

export const checkToken = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  const [bearer, token] = authHeader.split(' ', 2);

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }
  try {
    const { id } = jwt.verify(token, env('JWT_SECRET'));
    const user = await findUserById(id);
    if (!user || !user.token) {
      next(createHttpError(401, 'User not found'));
      return;
    }
    req.user = user;
    next();
  } catch {
    next(createHttpError(401, 'Unauthorized'));
  }
};
