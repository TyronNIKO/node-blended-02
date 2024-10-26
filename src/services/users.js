import { SessionsCollection } from '../db/models/Session.js';
import { UsersCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { createSession } from '../utils/createSession.js';
import createHttpError from 'http-errors';

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

export const findSessionByToken = (token) =>
  SessionsCollection.findOne({ accessToken: token });

export const findUserById = (userId) => UsersCollection.findById(userId);

export const logoutUser = (sessionId, refreshToken) =>
  SessionsCollection.findOneAndDelete({ _id: sessionId, refreshToken });

export const refreshSession = async (sessionId, refreshToken) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isExpiredToken = new Date() > session.refreshTokenValidUntil;
  if (isExpiredToken) {
    throw createHttpError(401, 'Token is expired');
  }
  const user = await findUserById(session.userId);
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  await SessionsCollection.findOneAndDelete({ _id: sessionId });
  const newSession = createSession();
  return await SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });
};
