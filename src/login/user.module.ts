import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './schema';
import { UserController } from './controller';
import { UserService } from './service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: User }]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {
}
