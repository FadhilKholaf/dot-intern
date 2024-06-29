import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should be return hello world!', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        username: 'fadhil',
        password: 'Q2er5@936',
      })
      .expect(201);

    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
