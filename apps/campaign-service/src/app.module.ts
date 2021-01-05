import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CampaignsModule } from './campaigns/campaigns.module';
import { readdirSync, readFileSync } from 'fs';
import { parse as envParse } from 'dotenv';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => envParse(readdirSync('env').map(path => readFileSync(`env/${path}`, 'utf8')).join('\n'))]
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>('ENV_MONGODB_HOST')}/${configService.get<string>('ENV_MONGODB_DB')}`,
        user: configService.get<string>('ENV_MONGODB_USERNAME'),
        pass: configService.get<string>('ENV_MONGODB_PASSWORD'),
        authSource: configService.get<string>('ENV_MONGODB_AUTH_SOURCE'),
        replicaSet: configService.get<string>('ENV_MONGODB_REPLICASET'),
        ssl: configService.get<boolean>('ENV_MONGODB_SSL') === true || configService.get<string>('ENV_MONGODB_SSL') === 'true' ? true : false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService],
    }),
    CampaignsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
