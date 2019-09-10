import { Controller, Get, Query } from '@nestjs/common';
import { Constants } from '../../commons';

@Controller(`${Constants.API_PREFIX}/${Constants.API_VERSION_1}/login`)
export class LoginController {

  @Get()
  async getGithubUsers(@Query('since') since: number): Promise<any> {
    return null;
  }
}
