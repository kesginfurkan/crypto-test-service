import {ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {GlobalExceptionFilter} from './shared/presentation/http/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalFilters(
    new GlobalExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
      whitelist:true,
      forbidNonWhitelisted: true,
    })
  );


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
