// import { SessionsCollection } from '../db/models/Session.js';
import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
// import { createSession } from '../utils/createSession.js';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const updateUserWithToken = async (userId) => {
  const token = jwt.sign({ id: userId }, env('JWT_SECRET'));

  const user = await UsersCollection.findByIdAndUpdate(
    userId,
    { token },
    { new: true },
  );
  return user;
};

export const createUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  const user = await UsersCollection.create({
    ...userData,
    password: encryptedPassword,
  });
  console.log('services-user', user);

  return updateUserWithToken(user._id);
};

export const findUserById = (userId) => UsersCollection.findById(userId);

export const logoutUser = (id) => {
  UsersCollection.findByIdAndUpdate(id, { token: '' });
};
