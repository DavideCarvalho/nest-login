import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './login';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://nest:nestlogin1@ds045077.mlab.com:45077/nest-login'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
