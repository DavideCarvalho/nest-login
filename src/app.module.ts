import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './login';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://nest:nestlogin1@ds045077.mlab.com:45077/nest-login'),
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
