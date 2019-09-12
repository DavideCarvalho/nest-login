import { Body, Controller, Get, HttpCode, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import {
  Constants,
  ExpiredTokenExceptionFilter,
  LoginIncorrectExceptionFilter,
  UserAlreadyExistsExceptionFilter,
  UserNotFoundExceptionFilter,
} from '../../commons';
import { ErrorVO, UserSigninVO, UserSignupVO, UserTokenVO, UserVO } from '../vo';
import { UserService } from '../service';
import { deserialize, serialize } from 'class-transformer';
import { UserDTO, UserTokenDTO } from '../dto';
import { AuthGuard } from '../guard';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';

@Controller(`${Constants.API_PREFIX}/${Constants.API_VERSION_1}/user`)
@UseFilters(
  UserAlreadyExistsExceptionFilter,
  UserNotFoundExceptionFilter,
  LoginIncorrectExceptionFilter,
  ExpiredTokenExceptionFilter,
)
@ApiUseTags('User')
export class UserController {

  constructor(private readonly service: UserService) {
  }

  @Post('signup')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'O usuário foi criado com sucesso.', type: UserTokenVO })
  @ApiResponse({ status: 409, description: 'Já existe um usuário com o mesmo email na base.', type: ErrorVO })
  async signUpUser(@Body() userSignup: UserSignupVO): Promise<UserTokenVO> {
    const userSignupDTO: UserTokenVO = deserialize<UserTokenVO>(
      UserTokenVO,
      serialize<UserSignupVO>(userSignup),
    );
    return UserController.userTokenDtoToVo(await this.service.signUpUser(userSignupDTO));
  }

  @Post('signin')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'A sessão do usuário foi criada com sucesso.', type: UserTokenVO })
  @ApiResponse({ status: 400, description: 'Usuário e/ou senha inválidos.', type: ErrorVO })
  async signInUser(@Body() userSignin: UserSigninVO): Promise<UserTokenVO> {
    return UserController.userTokenDtoToVo(
      await this.service.signInUser(userSignin.email, userSignin.senha),
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Usuário encontrado.', type: UserVO })
  @ApiResponse({ status: 404, description: 'Usuário não foi encontrado.', type: ErrorVO })
  @ApiResponse({ status: 401, description: 'Token expirado ou id do usuário que está no path não corresponde ao id do token.', type: ErrorVO })
  async findUserById(@Param('id') id: string): Promise<UserVO> {
    return UserController.userDtoToVo(
      await this.service.findUserById(id),
    );
  }

  private static userDtoToVo(userDto: UserDTO): UserVO {
    return deserialize<UserVO>(
      UserVO,
      serialize<UserDTO>(userDto),
      { strategy: 'excludeAll' },
    );
  }

  private static userTokenDtoToVo(userTokenDto: UserTokenDTO): UserTokenVO {
    return deserialize<UserTokenVO>(
      UserTokenVO,
      serialize<UserTokenDTO>(userTokenDto),
      { strategy: 'excludeAll' },
    );
  }
}
