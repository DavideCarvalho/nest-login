import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserSigninVO {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  senha: string;
}
