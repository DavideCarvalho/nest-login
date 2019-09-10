import { Body, Controller, Post } from '@nestjs/common';
import { Constants } from '../../commons';
import { UserSignupVO, UserVO } from '../vo';
import { LoginService } from '../service/login.service';
import { deserialize, serialize } from 'class-transformer';
import { UserDTO, UserSignupDTO } from '../dto';

@Controller(`${Constants.API_PREFIX}/${Constants.API_VERSION_1}/login`)
export class LoginController {

  constructor(private readonly service: LoginService) {

  }

  @Post()
  async signUpUser(@Body() newUser: UserSignupVO): Promise<UserVO> {
    const newUserDto: UserSignupDTO = deserialize<UserSignupDTO>(
      UserSignupDTO,
      serialize<UserSignupVO>(newUser),
    );
    return deserialize<UserVO>(
      UserVO,
      serialize<UserDTO>(await this.service.signUpUser(newUserDto)),
    );
  }

  @Post()
  async signInUser(): Promise<any> {
    // const user: UserSignupDTO = deserialize<UserSignupDTO>(
    //   UserSignupDTO,
    //   serialize<UserSignupVO>(newUser),
    // );
    // return deserialize<UserVO>(
    //   UserVO,
    //   serialize<UserDTO>(await this.service.signInUser(user.email, user.password)),
    // );
  }
}
