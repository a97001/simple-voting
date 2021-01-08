import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { VotesController } from './controllers/votes.controller';
import { VotesService } from './services/votes.service';

@Module({
  imports: [
    CampaignsModule
  ],
  controllers: [VotesController],
  providers: [
    {
      provide: 'VOTE_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('ENV_VOTE_SERVICE_HOST'),
            port: parseInt(configService.get('ENV_VOTE_SERVICE_PORT'))
          }
        });
      },
      inject: [ConfigService],
    },
    VotesService
  ]
})
export class VotesModule { }
