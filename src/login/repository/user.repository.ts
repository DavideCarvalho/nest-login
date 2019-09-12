import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../schema';
import { UserDTO } from '../dto';

@Injectable()
export class UserRepository {

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
  }

  public async createNewUser(user: UserDTO) {
    return await this.userModel.create(user);
  }

  public async updateUser(id: string, user: UserDTO) {
    return this.userModel.findByIdAndUpdate(id, user);
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const foundUsers: IUser[] = await this.userModel.find({ email });
    return foundUsers[0];
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.userModel.findById(id);
  }
}
