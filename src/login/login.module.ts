import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './schema';
import { LoginController } from './controller';
import { LoginService } from './service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: User }]),
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {
}
