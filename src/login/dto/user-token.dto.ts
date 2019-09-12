import { Type } from 'class-transformer';
import { TelephoneDTO } from './telephone.dto';

export class UserTokenDTO {
  id: string;
  nome: string;
  email: string;
  senha: string;
  salt: string;
  ultimo_login: string;
  @Type(() => TelephoneDTO)
  telefones: TelephoneDTO[];
  data_atualizacao: string;
  data_criacao: string;
  token: any;
}
