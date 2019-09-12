import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class LoginIncorrectException extends HttpException {
  constructor() {
    super('Invalid email or password', HttpStatus.NOT_FOUND);
  }
}

@Catch(LoginIncorrectException)
export class LoginIncorrectExceptionFilter implements ExceptionFilter {
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
