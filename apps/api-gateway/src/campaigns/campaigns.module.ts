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
      useFactory: () => {
        // const mathSvcOptions = configService.get();
        return ClientProxyFactory.create({ transport: Transport.TCP, options: { port: 3001 } });
      },
      inject: [ConfigService],
    },
    CampaignsService
  ]
})
export class CampaignsModule { }
