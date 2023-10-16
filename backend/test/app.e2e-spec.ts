import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/modules/app/app.module';
import { config } from 'dotenv';
config();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/(GET) employees', () => {
    return request(app.getHttpServer())
      .get('/employee')
      .expect(200, (_err, res) => {
        const data = res.body
        expect(Array.isArray(data)).toBe(true)
      })
  })
});
