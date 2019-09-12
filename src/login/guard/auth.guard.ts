import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserVO } from '../vo';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const routeId = request.params.id;
    const [bearer, jwt] = (request.headers.authentication as string).split(' ');
    const user: UserVO = this.jwtService.verify<UserVO>(jwt);
    return user.id === routeId;
  }
}
