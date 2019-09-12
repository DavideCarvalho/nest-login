import { TelephoneVO } from './telephone.vo';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserTokenVO {
  @Expose()
  @ApiModelProperty()
  id: string;

  @Expose()
  @ApiModelProperty()
  nome: string;

  @Expose()
  @ApiModelProperty()
  email: string;

  @Expose()
  @ApiModelProperty()
  senha: string;

  @Exclude()
  salt: string;

  @Expose()
  @ApiModelProperty()
  ultimo_login: string;

  @Expose()
  @Type(() => TelephoneVO)
  @ApiModelProperty({ isArray: true, type: TelephoneVO })
  telefones: TelephoneVO[];

  @Expose()
  @ApiModelProperty()
  data_atualizacao​: string;

  @Expose()
  @ApiModelProperty()
  data_criacao​: string;

  @Expose()
  @ApiModelProperty()
  token: any;
}
