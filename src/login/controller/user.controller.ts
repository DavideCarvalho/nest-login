import { Body, Controller, Get, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { Constants, LoginIncorrectExceptionFilter, UserAlreadyExistsExceptionFilter, UserNotFoundExceptionFilter } from '../../commons';
import { UserSigninVO, UserSignupVO, UserVO } from '../vo';
import { UserService } from '../service';
import { deserialize, serialize } from 'class-transformer';
import { UserDTO } from '../dto';
import { AuthGuard } from '../guard';

@Controller(`${Constants.API_PREFIX}/${Constants.API_VERSION_1}/user`)
@UseFilters(UserAlreadyExistsExceptionFilter, UserNotFoundExceptionFilter, LoginIncorrectExceptionFilter)
export class UserController {

  constructor(private readonly service: UserService) {
  }

  @Post('signup')
  async signUpUser(@Body() userSignup: UserSignupVO): Promise<UserVO> {
    const userSignupDTO: UserDTO = deserialize<UserDTO>(
      UserDTO,
      serialize<UserSignupVO>(userSignup),
    );
    return UserController.dtoToVo(await this.service.signUpUser(userSignupDTO));
  }

  @Post('signin')
  async signInUser(@Body() userSignin: UserSigninVO): Promise<UserVO> {
    return UserController.dtoToVo(
      await this.service.signInUser(userSignin.email, userSignin.senha),
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id') id: string): Promise<UserVO> {
    return UserController.dtoToVo(
      await this.service.findUserById(id),
    );
  }

  private static dtoToVo(userDto: UserDTO): UserVO {
    return deserialize<UserVO>(
      UserVO,
      serialize<UserDTO>(userDto),
      { strategy: 'excludeAll' },
    );
  }
}
