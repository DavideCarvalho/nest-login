import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.CONFLICT);
  }
}

@Catch(UserAlreadyExistsException)
export class UserAlreadyExistsExceptionFilter implements ExceptionFilter {
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
