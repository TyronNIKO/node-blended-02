import createHttpError from 'http-errors';
import {
  //   createActiveSession,
  createUser,
  findUserByEmail,
  //   logoutUser,
  //   refreshSession,
} from '../services/users.js';
// import bcrypt from 'bcrypt';
// import { setupCookies } from '../utils/setupCookies.js';

export const registerUserController = async (req, res) => {
  const { email, name } = req.body;
  const user = await findUserByEmail(email);
  console.log(user);

  if (user) {
    throw createHttpError(409, 'User with this email is already exists');
  }
  console.log(req.body);

  const newUser = await createUser(req.body);

  res.status(201).json({
    token: newUser.token,
    user: {
      name,
      email,
    },
  });
};

// export const loginUserController = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await findUserByEmail(email);
//   if (!user) {
//     throw createHttpError(404, 'Credentials are wrong');
//   }
//   const isCorrectPassword = await bcrypt.compare(password, user.password);
//   if (!isCorrectPassword) {
//     throw createHttpError(404, 'Credentials are wrong');
//   }
//   const session = await createActiveSession(user._id);
//   setupCookies(res, session);
//   res.status(200).json({
//     status: 200,
//     message: 'User logged in',
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };

// export const logoutUserController = async (req, res) => {
//   await logoutUser(req.cookies.sessionId, req.cookies.refreshToken);
//   res.clearCookie('sessionId');
//   res.clearCookie('refreshToken');
//   res.sendStatus(204);
// };

// export const refreshSessionController = async (req, res) => {
//   const session = await refreshSession(
//     req.cookies.sessionId,
//     req.cookies.refreshToken,
//   );
//   setupCookies(res, session);

//   res.status(200).json({
//     status: 200,
//     message: 'Successfully refreshed a session!',
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };
