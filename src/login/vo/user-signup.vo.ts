import { TelephoneVO } from './telephone.vo';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserSignupVO {
  @ApiModelProperty({ required: true })
  nome: string;

  @ApiModelProperty({ required: true })
  email: string;

  @ApiModelProperty({ required: true })
  senha: string;

  @Type(() => TelephoneVO)
  @ApiModelProperty({ isArray: true, type: TelephoneVO })
  telefones: TelephoneVO[];
}
