import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  telephones: [{ number: number, ddd: number }];
}

export const UserSchema = new mongoose.Schema({
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

UserSchema.set('timestamps', true);
