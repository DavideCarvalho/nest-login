import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../schema';
import 'reflect-metadata';
import { UserDTO } from '../dto';
import { classToPlain, deserialize, plainToClass, serialize } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserAlreadyExistsException, UserNotFoundException } from '../../commons/exception-filter';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>,
              private readonly jwtService: JwtService) {
  }

  async signUpUser(user: UserDTO) {
    const foundUser: IUser = await this.findByEmail(user.email);
    if (foundUser) {
      throw new UserAlreadyExistsException();
    }
    const salt: string = UserService.createSalt();
    const hashPassword: string = UserService.createHashedPassword(user.senha, salt);
    const userCreated: IUser = await this.userModel.create({
      ...user,
      salt,
      senha: hashPassword,
    });
    const userCreatedDto: UserDTO = plainToClass<UserDTO, IUser>(
      UserDTO,
      classToPlain<IUser>(userCreated.toJSON({ virtuals: true }), { excludePrefixes: ['_'] }) as IUser,
    );
    return this.createToken(userCreatedDto);
  }

  async signInUser(email: string, password: string): Promise<UserDTO> {
    const foundUser: IUser = await this.findByEmail(email);
    if (!foundUser) {
      throw new UserNotFoundException();
    }
    if (!(foundUser as any).validPassword(password)) {
      throw new Error('mail or password incorrect');
    }
    return this.createToken(deserialize<UserDTO>(
      UserDTO,
      serialize(foundUser.toJSON({ virtuals: true }), { excludePrefixes: ['_'] }),
    ));
  }

  async findUserById(id: string): Promise<UserDTO> {
    return this.findById(id);
  }

  private async findByEmail(email: string): Promise<IUser | null> {
    const foundUsers: IUser[] = await this.userModel.find({ email });
    return !foundUsers.length
      ? null
      : foundUsers[0];
  }

  private async findById(id: string): Promise<UserDTO | null> {
    const foundUser: IUser = await this.userModel.findById(id);
    if (!foundUser) {
      return null;
    }
    return deserialize<UserDTO>(
      UserDTO,
      serialize(foundUser.toJSON({ virtuals: true }), { excludePrefixes: ['_'] }),
    );
  }

  private createToken(user: UserDTO): UserDTO {
    return {
      ...user,
      token: this.jwtService.sign(classToPlain<UserDTO>(user)),
    };
  }

  private static createSalt(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  private static createHashedPassword(password: string, salt: string) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  }
}
