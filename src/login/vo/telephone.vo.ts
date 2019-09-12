import { ApiModelProperty } from '@nestjs/swagger';

export class TelephoneVO {
  @ApiModelProperty()
  number: number;
  @ApiModelProperty()
  ddd: number;
}
