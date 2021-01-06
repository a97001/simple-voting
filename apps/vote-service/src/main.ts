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
  //   .setTitle('Vote Service')
  //   .setDescription('The vote service API documentation')
  //   .setVersion('1.0.0')
  //   .addTag('votes')
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);

  app.listen(() => console.log('Vote service is listening'));
}
bootstrap();
