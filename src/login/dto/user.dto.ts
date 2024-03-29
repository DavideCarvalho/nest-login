import { TelephoneDTO } from './telephone.dto';
import { Type } from 'class-transformer';

export class UserDTO {
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
}
