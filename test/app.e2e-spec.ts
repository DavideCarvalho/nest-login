import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        nome: 'teste',
        email: 'teste@email.com',
        senha: 'teste',
        telephones: [{
          numero: '123456789',
          ddd: '11',
        }],
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
