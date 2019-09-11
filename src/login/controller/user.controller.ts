import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Constants } from '../../commons';
import { UserSigninVO, UserSignupVO, UserVO } from '../vo';
import { UserService } from '../service';
import { deserialize, serialize } from 'class-transformer';
import { UserDTO } from '../dto';
import { AuthGuard } from '../guard';

@Controller(`${Constants.API_PREFIX}/${Constants.API_VERSION_1}/user`)
export class UserController {

  constructor(private readonly service: UserService) {

  }

  @Post('signup')
  async signUpUser(@Body() userSignup: UserSignupVO): Promise<UserVO> {
    const userSignupDTO: UserDTO = deserialize<UserDTO>(
      UserDTO,
      serialize<UserSignupVO>(userSignup),
    );
    return deserialize<UserVO>(
      UserVO,
      serialize<UserDTO>(await this.service.signUpUser(userSignupDTO)),
      { strategy: 'excludeAll' },
    );
  }

  @Post('signin')
  async signInUser(@Body() userSignin: UserSigninVO): Promise<UserVO> {
    return deserialize<UserVO>(
      UserVO,
      serialize<UserDTO>(await this.service.signInUser(userSignin.email, userSignin.senha)),
      { strategy: 'excludeAll' },
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id') id: string) {
    return deserialize<UserVO>(
      UserVO,
      serialize<UserDTO>(await this.service.findUserById(id)),
    );
  }
}
