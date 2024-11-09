import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    token: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export const UsersCollection = model('user', userSchema);
