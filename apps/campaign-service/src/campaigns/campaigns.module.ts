import { Module } from '@nestjs/common';
import { CampaignsController } from './controllers/campaigns.controller';
import { CampaignsService } from './services/campaigns.service';
import { CampaignsRepository } from './repositories/campaigns.repository';
import { Campaign } from './models/campaign';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Campaign,
        schemaOptions: { collection: 'campaigns', timestamps: true, ...{ autoCreate: true } }
      }
    ]),
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignsRepository]
})
export class CampaignsModule { }
