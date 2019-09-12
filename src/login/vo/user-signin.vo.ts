import { ApiModelProperty } from '@nestjs/swagger';

export class UserSigninVO {
  @ApiModelProperty({ required: true })
  email: string;

  @ApiModelProperty({ required: true })
  senha: string;
}
