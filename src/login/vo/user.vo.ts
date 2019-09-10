import { TelephoneVO } from './telephone.vo';
import { Type } from 'class-transformer';

export class UserVO {
  name: string;
  email: string;
  password: string;
  @Type(() => TelephoneVO)
  telephones: TelephoneVO[];
  token: any;
}
