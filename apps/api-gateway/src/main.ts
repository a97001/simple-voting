import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.use(helmet());

  app.setGlobalPrefix('api/v1');

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 100
    })
  );

  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true
  }));

  const options = new DocumentBuilder()
    .setTitle('Simple Voting API')
    .setDescription('The simple voting API documentation')
    .setVersion('1.0.0')
    .addTag('campaigns')
    .addTag('votes')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
