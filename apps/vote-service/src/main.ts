import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { VoteServiceModule } from './vote-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    VoteServiceModule,
    {
      transport: Transport.TCP,
      options: { port: 3002 }
    },
  );

  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true
  }));

  app.listen(() => console.log('Vote service is listening'));
}
bootstrap();
