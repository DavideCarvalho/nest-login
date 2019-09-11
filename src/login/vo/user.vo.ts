import { TelephoneVO } from './telephone.vo';
import { Exclude, Expose, Type } from 'class-transformer';

export class UserVO {
  @Expose()
  id: string;
  @Expose()
  nome: string;
  @Expose()
  email: string;
  @Expose()
  senha: string;
  @Exclude()
  salt: string;
  @Expose()
  @Type(() => TelephoneVO)
  telefones: TelephoneVO[];
  @Expose()
  data_atualizacao​: Date;
  @Expose()
  data_criacao​: Date;
  @Expose()
  token: any;
}
