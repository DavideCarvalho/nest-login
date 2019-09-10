import { TelephoneDTO } from './telephone.dto';
import { Type } from 'class-transformer';

export class UserSignupDTO {
  name: string;
  email: string;
  password: string;
  @Type(() => TelephoneDTO)
  telephones: TelephoneDTO[];
}
