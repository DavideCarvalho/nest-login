import { TelephoneDTO } from './telephone.dto';
import { Type } from 'class-transformer';

export class UserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  @Type(() => TelephoneDTO)
  telephones: TelephoneDTO[];
  updatedAt: Date;
  createdAt: Date;
  token: any;
}
