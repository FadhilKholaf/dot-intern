import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should be signed in a user', async () => {
    const userDto = {
      username: 'fadhil',
      password: 'Q2er5@936',
    };

    return await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userDto)
      .expect(201);
  });

  it('Should be signed up a new user', async () => {
    const userDto = {
      username: 'admin',
      password: 'Q2er5@936',
    };

    const signedUpUser = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(userDto)
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
