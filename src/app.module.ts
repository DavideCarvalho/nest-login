import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './login';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.APPSETTING_DATA_DB_HOST || 'nest:nestlogin1@ds045077.mlab.com'}:${process.env.APPSETTING_DATA_DB_PORT || 45077}/${process.env.APPSETTING_DATA_DB_NAME || 'nest-login'}`,
      { useNewUrlParser: true },
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
