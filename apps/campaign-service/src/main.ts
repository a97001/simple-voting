import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { port: 3001 }
    },
  );

  // app.use(helmet());

  // app.setGlobalPrefix('api/v1');

  // app.use(
  //   rateLimit({
  //     windowMs: 60 * 1000,
  //     max: 100
  //   })
  // );

  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true
  }));

  // const options = new DocumentBuilder()
  //   .setTitle('Campaign Service')
  //   .setDescription('The campaign service API documentation')
  //   .setVersion('1.0.0')
  //   .addTag('campaigns')
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);

  app.listen(() => console.log('Campaign service is listening'));
}
bootstrap();
