import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Post } from '@prisma/client';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let tempPostDto: Post;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should be create a new post', async () => {
    const userDto = {
      username: 'fadhil',
      password: 'Q2er5@936',
    };

    const newPostDto = {
      title: 'post 1',
      content: 'this is post 1',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userDto)
      .expect(201);

    const createdPost = await request(app.getHttpServer())
      .post('/post')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(newPostDto)
      .expect(201);

    tempPostDto = createdPost.body;

    return createdPost;
  });

  it('Should be get all post', async () => {
    const userDto = {
      username: 'fadhil',
      password: 'Q2er5@936',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userDto)
      .expect(201);

    return request(app.getHttpServer())
      .get('/post')
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(200);
  });

  it('Should be get a post', async () => {
    const userDto = {
      username: 'fadhil',
      password: 'Q2er5@936',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userDto)
      .expect(201);

    return request(app.getHttpServer())
      .get(`/post/${tempPostDto.id}`)
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(200);
  });

  it('Should be update a post', async () => {
    const userDto = {
      username: 'fadhil',
      password: 'Q2er5@936',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userDto)
      .expect(201);

    return await request(app.getHttpServer())
      .patch(`/post/${tempPostDto.id}`)
      .set('Authorization', `Bearer ${response.body.token}`)
      .send({ title: 'Post 1 Updated', content: 'Updated post 1' })
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
      .delete(`/post/${tempPostDto.id}`)
      .set('Authorization', `Bearer ${response.body.token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
