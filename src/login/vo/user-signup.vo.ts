import { TelephoneVO } from './telephone.vo';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSignupVO {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  nome: string;

  @IsEmail()
  @ApiModelProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({ required: true })
  senha: string;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => TelephoneVO)
  @ApiModelProperty({ isArray: true, type: TelephoneVO })
  telefones: TelephoneVO[];
}
