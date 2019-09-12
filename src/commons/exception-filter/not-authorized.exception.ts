import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class NotAuthorizedException extends HttpException {
  constructor() {
    super('Não autorizado', HttpStatus.UNAUTHORIZED);
  }
}

@Catch(NotAuthorizedException)
export class NotAuthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response
      .status(status)
      .json({
        mensagem: exception.getResponse(),
      });
  }
}
