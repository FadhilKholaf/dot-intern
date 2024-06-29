import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from '@prisma/client';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let tempUserDto: User;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should be create a new user', async () => {
    const userDto = {
      username: 'fadhil',
      password: 'Q2er5@936',
    };

    const newUserDto = {
      username: 'dummy',
      password: 'Q2er5@936',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userDto)
      .expect(201);

    const createdUser = await request(app.getHttpServer())
      .post('/user')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(newUserDto)
      .expect(201);

    tempUserDto = createdUser.body;

    return createdUser;
  });

  it('Should be get all user', async () => {
    const userDto = {
      username: 'fadhil',
      password: 'Q2er5@936',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userDto)
      .expect(201);

    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(200);
  });

  it('Should be get a user', async () => {
    const userDto = {
      username: 'fadhil',
      password: 'Q2er5@936',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userDto)
      .expect(201);

    return request(app.getHttpServer())
      .get(`/user/${response.body.id}`)
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(200);
  });

  it('Should be update a user', async () => {
    const userDto = {
      username: 'fadhil',
      password: 'Q2er5@936',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userDto)
      .expect(201);

    return await request(app.getHttpServer())
      .patch(`/user/${tempUserDto.id}`)
      .set('Authorization', `Bearer ${response.body.token}`)
      .send({ username: 'Example', password: 'Q2er5@936' })
      .expect(200);
  });

  it('Should be delete a user', async () => {
    const userDto = {
      username: 'fadhil',
      password: 'Q2er5@936',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userDto)
      .expect(201);

    return await request(app.getHttpServer())
      .delete(`/user/${tempUserDto.id}`)
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
