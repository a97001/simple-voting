import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ClientProxy } from '@nestjs/microservices';
import { CampaignDto } from 'apps/campaign-service/src/campaigns/dtos/campaign-dto';
import { CampaignListDto } from 'apps/campaign-service/src/campaigns/dtos/campaign-list-dto';
import { CreateCampaignDto } from 'apps/campaign-service/src/campaigns/dtos/create-campaign-dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CampaignsService implements OnApplicationBootstrap {
    constructor(
        @Inject('CAMPAIGN_SERVICE') private client: ClientProxy,
    ) { }

    public async createCampaign(createCampaignDto: CreateCampaignDto): Promise<CampaignDto> {
        return this.client.send<CampaignDto>({ cmd: 'createCampaign' }, createCampaignDto).toPromise();
    }

    public async deleteCampaign(id: ObjectId): Promise<CampaignDto> {
        return this.client.send<CampaignDto>({ cmd: 'deleteCampaign' }, id).toPromise();
    }

    public async getCampaign(id: ObjectId): Promise<CampaignDto> {
        return plainToClass(CampaignDto, await this.client.send<CampaignDto>({ cmd: 'getCampaign' }, id).toPromise());
    }

    public async getCampaignList(): Promise<CampaignListDto> {
        return this.client.send<CampaignListDto>({ cmd: 'getCampaignList' }, {}).toPromise();
    }

    async onApplicationBootstrap() {
        await this.client.connect();
    }
}
