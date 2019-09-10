import { TelephoneVO } from './telephone.vo';
import { Type } from 'class-transformer';

export class UserSignupVO {
  name: string;
  email: string;
  password: string;
  @Type(() => TelephoneVO)
  telephones: TelephoneVO[];
}
