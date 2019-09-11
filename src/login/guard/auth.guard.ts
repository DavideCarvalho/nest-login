import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserVO } from '../vo';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const routeId = request.params.id;
    const [bearer, jwt] = request.headers.authentication.split(' ');
    const user: UserVO = this.jwtService.verify<UserVO>(jwt);
    return user.id === routeId;
  }
}
