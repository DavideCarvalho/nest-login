import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserVO } from '../vo';
import { Request } from 'express';
import { ExpiredTokenException, NotAuthorizedException } from '../../commons/exception-filter';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const routeId = request.params.id;
    const headerAuthentication: string | string[] = request.headers.authentication;
    if (!headerAuthentication) {
      throw new NotAuthorizedException();
    }
    const [_, jwt] = Array.isArray(headerAuthentication)
      ? headerAuthentication[0].split(' ')
      : headerAuthentication.split(' ');
    let user: UserVO;
    try {
      user = this.jwtService.verify<UserVO>(jwt);
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new ExpiredTokenException();
      }
    }
    if (user.id !== routeId) {
      throw new NotAuthorizedException();
    }
    return user.id === routeId;
  }
}
