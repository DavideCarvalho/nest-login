import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as jsonwebtoken from 'jsonwebtoken';
import { AppModule } from '../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app;
  const jwtService = { sign: jest.fn() };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtService)
      .useValue(jwtService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should signup user', () => {
    jwtService.sign.mockImplementationOnce(() => '123');
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

  it('show throw 409 error if already exists a user with the same email', () => {
    jwtService.sign.mockImplementationOnce(() => '123');
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        nome: 'teste',
        email: 'teste1@email.com',
        senha: 'teste',
        telephones: [{
          numero: '123456789',
          ddd: '11',
        }],
      })
      .then(() => {
        request(app.getHttpServer())
          .post('/api/v1/user/signup')
          .send({
            nome: 'teste',
            email: 'teste1@email.com',
            senha: 'teste',
            telephones: [{
              numero: '123456789',
              ddd: '11',
            }],
          })
          .expect(409)
          .expect(res => {
            expect(res.body.messagem).toBe('E-mail já existente');
          });
      });
  });

  it('should signin user', () => {
    jwtService.sign.mockImplementationOnce(() => '123');
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        nome: 'teste',
        email: 'teste2@email.com',
        senha: 'teste',
        telephones: [{
          numero: '123456789',
          ddd: '11',
        }],
      })
      .then(() => {
        request(app.getHttpServer())
          .post('/api/v1/user/signin')
          .send({
            email: 'teste2@email.com',
            senha: 'teste',
          })
          .expect(200);
      });
  });

  it('should throw 400 error if email is wrong', () => {
    jwtService.sign.mockImplementationOnce(() => '123');
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        nome: 'teste',
        email: 'teste3@email.com',
        senha: 'teste',
        telephones: [{
          numero: '123456789',
          ddd: '11',
        }],
      })
      .then(() => {
        request(app.getHttpServer())
          .post('/api/v1/user/signin')
          .send({
            email: 'testee3@email.com',
            senha: 'teste',
          })
          .expect(400);
      });
  });

  it('should throw 400 error if password is wrong', () => {
    jwtService.sign.mockImplementationOnce(() => '123');
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        nome: 'teste',
        email: 'teste4@email.com',
        senha: 'teste',
        telephones: [{
          numero: '123456789',
          ddd: '11',
        }],
      })
      .then(() => {
        request(app.getHttpServer())
          .post('/api/v1/user/signin')
          .send({
            email: 'testee4@email.com',
            senha: 'teste',
          })
          .expect(400);
      });
  });

  it('should find user by id', () => {
    jwtService.sign.mockImplementationOnce(() => '123');
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        nome: 'teste',
        email: 'teste5@email.com',
        senha: 'teste',
        telephones: [{
          numero: '123456789',
          ddd: '11',
        }],
      })
      .then((res) => {
        request(app.getHttpServer())
          .get(`/api/v1/user/signin/${res.body.id}`)
          .set({ Authentication: res.body.token })
          .expect(200)
          .expect((foundUserRes) => {
            expect(foundUserRes.body.id).toBe(res.body.id);
          });
      });
  });

  it('should return 401 401 Não Autorizado if authentication is not passed', () => {
    jwtService.sign.mockImplementationOnce(
      () => jsonwebtoken.sign(
        ({ id: '000000' }),
        'secret',
        { expiresIn: '30m' },
      ),
    );
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        nome: 'teste',
        email: 'teste6@email.com',
        senha: 'teste',
        telephones: [{
          numero: '123456789',
          ddd: '11',
        }],
      })
      .then((res) => {
        request(app.getHttpServer())
          .get(`/api/v1/user/signin/${res.body.id}`)
          .expect(401)
          .expect((foundUserRes) => {
            expect(foundUserRes.body.mensagem).toBe('Não autorizado');
          });
      });
  });

  it('should return 401 Não Autorizado if authentication id is different from path id', () => {
    jwtService.sign.mockImplementationOnce(
      () => jsonwebtoken.sign(
        ({ id: '000000' }),
        'secret',
        { expiresIn: '30m' },
      ),
    );
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        nome: 'teste',
        email: 'teste7@email.com',
        senha: 'teste',
        telephones: [{
          numero: '123456789',
          ddd: '11',
        }],
      })
      .then((res) => {
        request(app.getHttpServer())
          .get(`/api/v1/user/signin/1231432241312`)
          .set({ Authentication: res.body.token })
          .expect(401)
          .expect((foundUserRes) => {
            expect(foundUserRes.body.mensagem).toBe('Não autorizado');
          });
      });
  });

  it('should return 401 Não Autorizado if authentication id is different from path id', () => {
    jwtService.sign.mockImplementationOnce(
      () => jsonwebtoken.sign(
        ({ id: '000000' }),
        'secret',
        { expiresIn: '30m' },
      ),
    );
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        nome: 'teste',
        email: 'teste7@email.com',
        senha: 'teste',
        telephones: [{
          numero: '123456789',
          ddd: '11',
        }],
      })
      .then((res) => {
        request(app.getHttpServer())
          .get(`/api/v1/user/signin/1231432241312`)
          .set({ Authentication: res.body.token })
          .expect(401)
          .expect((foundUserRes) => {
            expect(foundUserRes.body.mensagem).toBe('Não autorizado');
          });
      });
  });

  it('should return 401 Sessão Inválida if token is expired', () => {
    jwtService.sign.mockImplementationOnce(
      () => jsonwebtoken.sign(
        ({ id: '000000' }),
        'secret',
        { expiresIn: '1s' },
      ),
    );
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        nome: 'teste',
        email: 'teste7@email.com',
        senha: 'teste',
        telephones: [{
          numero: '123456789',
          ddd: '11',
        }],
      })
      .then((res) => {
        request(app.getHttpServer())
          .get(`/api/v1/user/signin/1231432241312`)
          .set({ Authentication: res.body.token })
          .expect(401)
          .expect((foundUserRes) => {
            expect(foundUserRes.body.mensagem).toBe('Sessão Inválida');
          });
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
