import { Injectable } from '@nestjs/common';
import { IUser } from '../schema';
import 'reflect-metadata';
import { UserDTO, UserTokenDTO } from '../dto';
import { classToPlain, deserialize, plainToClass, serialize } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { LoginIncorrectException, UserAlreadyExistsException, UserNotFoundException } from '../../commons/exception-filter';
import { UserRepository } from '../repository';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService) {
  }

  async signUpUser(user: UserDTO): Promise<UserTokenDTO> {
    const foundUser: IUser = await this.repository.findByEmail(user.email);
    if (foundUser) {
      throw new UserAlreadyExistsException();
    }
    const salt: string = UserService.createSalt();
    const hashPassword: string = UserService.createHashedPassword(user.senha, salt);
    const userCreated: IUser = await this.repository.createNewUser({
      ...user,
      salt,
      senha: hashPassword,
      ultimo_login: new Date().toISOString(),
    });
    const userCreatedDto: UserDTO = plainToClass<UserDTO, IUser>(
      UserDTO,
      classToPlain<IUser>(userCreated.toJSON({ virtuals: true }), { excludePrefixes: ['_'] }) as IUser,
    );
    return this.createToken(userCreatedDto);
  }

  async signInUser(email: string, password: string): Promise<UserTokenDTO> {
    const foundUser: IUser = await this.repository.findByEmail(email);
    if (!(foundUser as any).validPassword(password)) {
      throw new LoginIncorrectException();
    }
    const foundUserDto: UserDTO = plainToClass<UserDTO, IUser>(
      UserDTO,
      classToPlain<IUser>(foundUser.toJSON({ virtuals: true }), { excludePrefixes: ['_'] }) as IUser,
    );
    this.repository.updateUser(foundUserDto.id, { ...foundUserDto, ultimo_login: new Date().toISOString() });
    return this.createToken(foundUserDto);
  }

  async findUserById(id: string): Promise<UserDTO> {
    const foundUser: IUser = await this.repository.findById(id);
    if (!foundUser) {
      throw new UserNotFoundException();
    }
    return deserialize<UserDTO>(
      UserDTO,
      serialize(foundUser.toJSON({ virtuals: true }), { excludePrefixes: ['_'] }),
    );
  }

  private createToken(user: UserDTO): UserTokenDTO {
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
