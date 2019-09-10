import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserSchema } from '../schema';

@Injectable()
export class LoginService {
  constructor(@InjectModel('User') private readonly user: Model<IUserSchema>) {
  }

  async findUserByEmailAndPassword(email: string, password: string) {
    const foundUser: IUserSchema = await this.user.findOne({ email, password });
    if (!foundUser) {
      throw new Error('User not found');
    }
    return foundUser;
  }
}
