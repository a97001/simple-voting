import { Module } from '@nestjs/common';
import { CampaignsController } from './controllers/campaigns.controller';
import { CampaignsService } from './services/campaigns.service';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
  ],
  controllers: [CampaignsController],
  providers: [
    {
      provide: 'CAMPAIGN_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('ENV_CAMPAIGN_SERVICE_HOST'),
            port: parseInt(configService.get('ENV_CAMPAIGN_SERVICE_PORT'))
          }
        });
      },
      inject: [ConfigService]
    },
    CampaignsService
  ],
  exports: [
    CampaignsService
  ]
})
export class CampaignsModule { }
