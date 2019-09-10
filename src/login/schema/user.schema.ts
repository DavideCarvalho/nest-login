import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  telephones: [{ number: number, ddd: number }];
}

export const User = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  telephones: [
    {
      number: Number,
      ddd: Number,
    },
  ],
});

User.set('timestamps', true);
