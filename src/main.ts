import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['content-type'],
    credentials: true
  }) 
 
  app.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
