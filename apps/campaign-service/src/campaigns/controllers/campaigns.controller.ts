import { Controller } from '@nestjs/common';
import { CampaignDto } from '../dtos/campaign-dto';
import { CampaignListDto } from '../dtos/campaign-list-dto';
import { CreateCampaignDto } from '../dtos/create-campaign-dto';
import { CampaignsService } from '../services/campaigns.service';
import { ObjectId } from 'mongodb';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CampaignsController {
    constructor(
        private readonly campaignsService: CampaignsService
    ) { }

    @MessagePattern({ cmd: 'createCampaign' })
    async createCampaign(createCampaignDto: CreateCampaignDto): Promise<CampaignDto> {
        return this.campaignsService.createCampaign(createCampaignDto);
    }

    @MessagePattern({ cmd: 'deleteCampaign' })
    async deleteCampaign(id: string): Promise<CampaignDto> {
        return this.campaignsService.deleteCampaign(new ObjectId(id));;
    }

    @MessagePattern({ cmd: 'getCampaign' })
    async getCampaign(id: string): Promise<CampaignDto> {
        return this.campaignsService.getCampaign(new ObjectId(id));;
    }

    @MessagePattern({ cmd: 'getCampaignList' })
    async getCampaignList(): Promise<CampaignListDto> {
        return this.campaignsService.getCampaignList();
    }
}
