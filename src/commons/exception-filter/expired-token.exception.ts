import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class ExpiredTokenException extends HttpException {
  constructor() {
    super('Sessão Inválida', HttpStatus.UNAUTHORIZED);
  }
}

@Catch(ExpiredTokenException)
export class ExpiredTokenExceptionFilter implements ExceptionFilter {
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
