import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../schema';
import 'reflect-metadata';
import { UserDTO, UserSignupDTO } from '../dto';
import { classToPlain, deserialize, plainToClass, serialize } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>,
              private readonly jwtService: JwtService) {
  }

  async findUserByEmailAndPassword(email: string, password: string): Promise<UserDTO | null> {
    const foundUser: IUser = await this.userModel.findOne({ email, password });
    if (!foundUser) {
      return null;
    }
    return deserialize<UserDTO>(
      UserDTO,
      serialize(foundUser.toJSON({ virtuals: true })),
    );
  }

  async signUpUser(user: UserSignupDTO) {
    const foundUser: UserDTO = await this.findUserByEmailAndPassword(user.email, user.password);
    if (foundUser) {
      throw new Error('user already exists');
    }
    const userCreated: IUser = await this.userModel.create(user);
    const userCreatedDto: UserDTO = plainToClass<UserDTO, IUser>(
      UserDTO,
      classToPlain<IUser>(userCreated.toJSON({ virtuals: true }), { excludePrefixes: ['_'] }) as IUser,
    );
    userCreatedDto.token = this.jwtService.sign(serialize<UserDTO>(foundUser));
    return userCreatedDto;
  }

  async signInUser(email: string, password: string) {
    const foundUser: UserDTO = await this.findUserByEmailAndPassword(email, password);
    if (!foundUser) {
      throw new Error('user not found');
    }
    foundUser.token = this.jwtService.sign(foundUser);
    return foundUser;
  }
}
