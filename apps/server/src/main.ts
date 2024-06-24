import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api'); // 서버로 들어오는 모든 요청 URL 맨 앞에 'api'를 붙임
  await app.listen(4000);
}
bootstrap();
