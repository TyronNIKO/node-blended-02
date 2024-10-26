import { SessionsCollection } from '../db/models/Session.js';
import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { createSession } from '../utils/createSession.js';

export const findUserByEmail = (email) => UsersCollection.findOne({ email });

export const createUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);
  return UsersCollection.create({
    ...userData,
    password: encryptedPassword,
  });
};

export const createActiveSession = async (userId) => {
  await SessionsCollection.deleteOne({ userId });
  const session = createSession();
  return SessionsCollection.create({ ...session, userId });
};
