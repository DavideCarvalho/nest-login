import { ApiModelProperty } from '@nestjs/swagger';

export class ErrorVO {
  @ApiModelProperty()
  messagem: string;
}
